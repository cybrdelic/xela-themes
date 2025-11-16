#!/usr/bin/env node
// Utility: Capture screenshots for every theme for landing page showcase.
// Requires: npm i -D puppeteer
// Usage: node scripts/theme-system/capture-theme-screenshots.mjs [--themesDir=./themes] [--outDir=./screenshots] [--width=1400] [--height=900]
// Optional: --filter="substr" to only capture themes whose filename includes the substring.

import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// --- CLI args parsing ---
const args = process.argv.slice(2);
function getArg(name, def) {
  const prefix = `--${name}=`;
  const hit = args.find(a => a.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : def;
}

// Determine repo root (two levels up from this file: scripts/theme-system)
const repoRoot = path.resolve(__dirname, '..', '..');
const themesDir = path.resolve(getArg('themesDir', path.join(repoRoot, 'themes')));
const outDir = path.resolve(getArg('outDir', path.join(repoRoot, 'screenshots')));
const filter = getArg('filter', '');
const width = parseInt(getArg('width', '1400'), 10);
const height = parseInt(getArg('height', '900'), 10);
const editorTimeout = parseInt(getArg('editorTimeout', '25000'), 10); // ms to wait for Monaco editor
const delayAfterLoad = parseInt(getArg('delay', '400'), 10); // ms to wait after editor ready before screenshot

if (!fs.existsSync(themesDir)) {
  console.error('Themes directory not found:', themesDir);
  console.error('Run with --themesDir=./themes if needed (relative to repo root).');
  process.exit(1);
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Sample code snippet to show a variety of tokens
const SAMPLE_CODE = `// JavaScript / TypeScript
import { readFile } from 'fs/promises';

interface User { id: number; name: string; active?: boolean }

async function load(id) {
  const raw = await readFile(` + '`${id}.json`' + `, 'utf8');
  /** @type {User} */
  const user = JSON.parse(raw);
  if (!user?.active) throw new Error('Inactive user');
  return user;
}

// Python
# def fib(n):
#     a, b = 0, 1
#     result = []
#     while a < n:
#         result.append(a)
#         a, b = b, a + b
#     return result
# print(fib(50))

// JSON
// {"name": "xela", "themes": [] }
`;

function luminance(hex) {
  if (!hex) return 0;
  const h = hex.replace('#', '');
  if (h.length !== 6) return 0;
  const r = parseInt(h.slice(0,2),16)/255;
  const g = parseInt(h.slice(2,4),16)/255;
  const b = parseInt(h.slice(4,6),16)/255;
  const a = [r,g,b].map(c => c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4));
  return 0.2126*a[0] + 0.7152*a[1] + 0.0722*a[2];
}

function vsCodeToMonaco(themeJson, fallbackBase) {
  const rules = [];
  const tokenColors = themeJson.tokenColors || [];
  for (const entry of tokenColors) {
    const settings = entry.settings || {};
    if (!settings.foreground && !settings.fontStyle) continue;
    let scopes = entry.scope;
    if (!scopes) continue;
    if (!Array.isArray(scopes)) scopes = ('' + scopes).split(/\s*,\s*/g);
    for (const scope of scopes) {
      rules.push({ token: scope, foreground: settings.foreground ? settings.foreground.replace('#','') : undefined, fontStyle: settings.fontStyle });
    }
  }
  return { base: fallbackBase, inherit: true, rules, colors: themeJson.colors || {} };
}

async function buildHtml(themeName, monacoTheme, code) {
  // Escape JSON for embedding
  const monacoThemeJson = JSON.stringify(monacoTheme);
  const escapedCode = code.replace(/`/g, '\\`');
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
<title>${themeName}</title>
<style>
 html,body {margin:0;padding:0;height:100%;}
 body {font-family: system-ui, sans-serif; display:flex; flex-direction:column; }
 header {padding:10px 14px; font-size:14px; letter-spacing:0.5px; display:flex; justify-content:space-between; align-items:center; font-weight:500;}
 #container {flex:1; min-height:0;}
 .badge {font-size:11px; opacity:0.7;}
</style>
</head><body>
<header><div>${themeName}</div><div class="badge">XELA Themes</div></header>
<div id="container"></div>
<script src="https://unpkg.com/monaco-editor@0.52.0/min/vs/loader.js"></script>
<script>
  const THEME_NAME = 'xela-temp';
  const THEME_DEF = ${monacoThemeJson};
  window.require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.52.0/min/vs' } });
  window.require(['vs/editor/editor.main'], function() {
    monaco.editor.defineTheme(THEME_NAME, THEME_DEF);
    monaco.editor.setTheme(THEME_NAME);
    const editor = monaco.editor.create(document.getElementById('container'), {
      value: ` + '`' + '${escapedCode}' + '`' + `,
      language: 'typescript',
      automaticLayout: true,
      fontLigatures: true,
      minimap: { enabled: false },
      lineNumbers: 'on',
      renderWhitespace: 'selection',
      scrollBeyondLastLine: false,
      wordWrap: 'on'
    });
    window._editor = editor;
  });
</script>
</body></html>`;
}

async function capture() {
  const all = fs.readdirSync(themesDir).filter(f => f.endsWith('-color-theme.json') && (!filter || f.includes(filter)));
  if (!all.length) {
    console.error('No theme files found.');
    process.exit(1);
  }
  console.log(`Capturing ${all.length} theme screenshots...`);
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width, height }, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultTimeout(Math.max(20000, editorTimeout + 5000));

  for (const file of all) {
    const filePath = path.join(themesDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    let themeJson;
    try { themeJson = JSON.parse(raw); } catch (e) { console.warn('Skip (invalid JSON):', file); continue; }
    const bg = (themeJson.colors && (themeJson.colors['editor.background'] || themeJson.colors['editorBg'])) || '#000000';
    const base = luminance(bg) > 0.5 ? 'vs' : 'vs-dark';
    const monacoTheme = vsCodeToMonaco(themeJson, base);
    const label = themeJson.name || file.replace(/-color-theme.json$/, '');
    const html = await buildHtml(label, monacoTheme, SAMPLE_CODE);

    try {
      await page.setContent(html, { waitUntil: 'domcontentloaded' });
      // First wait: Monaco loader + editor instance
      await page.waitForFunction(() => window._editor && window._editor.getModel && window._editor.getModel(), { timeout: editorTimeout });
    } catch (err) {
      console.warn('Initial editor wait timed out, attempting manual injection:', file);
      try {
        await page.evaluate(() => {
          if (!window._editor && window.monaco && document.getElementById('container')) {
            window._editor = monaco.editor.create(document.getElementById('container'), {
              value: '/* Fallback editor injection */',
              language: 'typescript'
            });
          }
        });
        await page.waitForFunction(() => window._editor && window._editor.getModel(), { timeout: 5000 });
      } catch (e2) {
        console.warn('Failed to create editor, skipping theme:', file);
        continue;
      }
    }

    // Optionally replace model value after ready to ensure sample code fully applied
    try {
      await page.evaluate(code => { if (window._editor) { window._editor.getModel().setValue(code); } }, SAMPLE_CODE);
    } catch {}

    if (delayAfterLoad > 0) await new Promise(r => setTimeout(r, delayAfterLoad));

    const safeName = file.replace(/-color-theme.json$/, '').replace(/[^a-z0-9-_]+/gi, '_');
    const outFile = path.join(outDir, safeName + '.png');
    try {
      await page.screenshot({ path: outFile });
      console.log('✓', path.basename(outFile));
    } catch (shotErr) {
      console.warn('Screenshot failed for', file, shotErr.message);
    }
  }

  await browser.close();
  console.log('Done. Output dir:', outDir);
  console.log(`Tip: adjust --editorTimeout (current ${editorTimeout}ms) or --delay (current ${delayAfterLoad}ms) if needed.`);
}

capture().catch(err => { console.error(err); process.exit(1); });
