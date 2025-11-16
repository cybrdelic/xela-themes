#!/usr/bin/env node
// Capture real VS Code window screenshots per theme using remote debugging + Playwright (Chromium CDP)
// NOTE: This launches your locally installed `code` (VS Code) – ensure it is on PATH.
// Install deps: npm i -D playwright
// Usage: node scripts/theme-system/capture-theme-vscode.mjs [--filter=substr] [--outDir=./screenshots-vscode] [--width=1400] [--height=900] [--timeout=30000]
// You can also pass --codeBin="C:/Path/To/Code.exe" if 'code' is not in PATH.
// Limitation: Captures editor content region (Chromium page) not OS window frame.

import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { chromium } from 'playwright';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');

const args = process.argv.slice(2);
function getArg(name, def) { const p = `--${name}=`; const a = args.find(x=>x.startsWith(p)); return a? a.slice(p.length): def; }
const filter = getArg('filter','');
const outDir = path.resolve(getArg('outDir', path.join(repoRoot, 'screenshots-vscode')));
const width = parseInt(getArg('width','1400'),10);
const height = parseInt(getArg('height','900'),10);
const timeout = parseInt(getArg('timeout','30000'),10);
const rawCodeBinArg = getArg('codeBin', '');
const multi = /^(1|true|yes)$/i.test(getArg('multi','false'));

// Resolve VS Code binary path
function resolveCodeBin() {
  if (rawCodeBinArg) return rawCodeBinArg;
  if (process.platform === 'win32') {
    const candidates = [
      path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Microsoft VS Code', 'Code.exe'),
      path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Microsoft VS Code Insiders', 'Code - Insiders.exe'),
      'code.exe', 'Code.exe', 'code.cmd'
    ];
    for (const c of candidates) { if (c && fs.existsSync(c)) return c; }
    return 'code';
  }
  return 'code';
}
const codeBin = resolveCodeBin();

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Pre-flight check
function canSpawn(bin) {
  try {
    const test = spawn(bin, ['--version'], { stdio: 'ignore', shell: /\.cmd$/.test(bin) });
    return new Promise(res => { test.on('error', () => res(false)); test.on('exit', () => res(true)); });
  } catch { return Promise.resolve(false); }
}

// Read themes from extension package.json so we get the human labels exactly as VS Code expects
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const themes = (pkg.contributes?.themes || []).filter(t => !filter || t.label.toLowerCase().includes(filter.toLowerCase()));
if (!themes.length) { console.error('No themes matched filter'); process.exit(1); }

// Sample code file content
const SAMPLE_CODE = `// Showcase sample across languages\n\n// TypeScript\ninterface Thing { id: number; name: string; tags?: string[] }\nexport async function compute(x: number): Promise<Thing> {\n  const data: Thing = { id: x ?? 0, name: 'XELA', tags: ['theme','demo'] };\n  if (!data.tags?.length) throw new Error('Missing tags');\n  return data;\n}\n\n// JSON\n// {\"hello\": true, \"array\": [1,2,3] }\n\n# Python\n# def fib(n):\n#     a,b = 0,1\n#     out=[]\n#     while a<n: out.append(a); a,b=b,a+b\n#     return out\n\n// Markdown (see sample.md)\n`;

(async () => {
  if (!(await canSpawn(codeBin))) {
    console.error('Cannot launch VS Code binary:', codeBin);
    console.error('Pass explicit --codeBin="C:/Path/To/Code.exe"');
    process.exit(1);
  }
  console.log('Using VS Code binary:', codeBin);
  console.log('Capturing real VS Code screenshots for', themes.length, 'themes');
  for (const theme of themes) {
    await captureTheme(theme);
  }
  console.log('Done. Output dir:', outDir);
})();

async function captureTheme(theme) {
  const themeLabel = theme.label;
  const safe = themeLabel.replace(/[^a-z0-9-_]+/gi,'_').toLowerCase();
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), `xela-shot-${safe}-`));
  const userDataDir = path.join(workDir, 'user-data');
  const workspaceDir = path.join(workDir, 'ws');
  fs.mkdirSync(userDataDir, { recursive: true });
  fs.mkdirSync(workspaceDir, { recursive: true });
  const sampleFile = path.join(workspaceDir, 'sample.ts');
  fs.writeFileSync(sampleFile, SAMPLE_CODE, 'utf8');
  // settings.json with theme
  const settingsDir = path.join(userDataDir, 'User');
  fs.mkdirSync(settingsDir, { recursive: true });
  fs.writeFileSync(path.join(settingsDir, 'settings.json'), JSON.stringify({ 'workbench.colorTheme': themeLabel, 'editor.fontLigatures': true, 'workbench.startupEditor': 'none' }, null, 2));

  const port = 9222 + Math.floor(Math.random()*1000);
  const launchArgs = [
    '--disable-telemetry', '--skip-release-notes', '--skip-welcome', '--disable-gpu', '--disable-updates', '--no-sandbox', '--disable-workspace-trust', '--force-color-profile=srgb',
    `--remote-debugging-port=${port}`, '--enable-blink-features=IdleDetection', '--disable-features=Translate', '--no-proxy-server', '--disable-dev-shm-usage',
    '--crash-reporter-directory=' + path.join(workDir,'crash'),
    '--user-data-dir=' + userDataDir,
    sampleFile
  ];

  console.log('Launching VS Code for', themeLabel, '->', codeBin);
  const child = spawn(codeBin, launchArgs, { stdio: 'ignore', env: { ...process.env }, shell: /\.cmd$/.test(codeBin) });

  const started = Date.now();
  const endpoint = `http://localhost:${port}`;
  let connected = false; let browser; let page;
  while (!connected && Date.now() - started < timeout) {
    await new Promise(r => setTimeout(r, 500));
    try {
      browser = await chromium.connectOverCDP(endpoint);
      connected = true;
    } catch { /* retry */ }
  }
  if (!connected) {
    console.warn('⚠ Timeout connecting to Code CDP for', themeLabel);
    try { child.kill(); } catch {}
    return false;
  }
  const contexts = browser.contexts();
  // Find page with our sample file name in title
  for (const ctx of contexts) {
    for (const p of ctx.pages()) {
      const t = await p.title().catch(()=> '');
      if (t.toLowerCase().includes('sample')) { page = p; break; }
    }
    if (page) break;
  }
  if (!page) { page = contexts[0]?.pages()[0]; }
  if (!page) {
    console.warn('No page found for', themeLabel);
    await browser.close();
    child.kill();
    return false;
  }
  // Resize viewport via DevTools
  try { await page.setViewportSize({ width, height }); } catch {}
  // Wait for workbench root
  try { await page.waitForSelector('.monaco-workbench', { timeout: 10000 }); } catch {}
  // Small delay to ensure theme applied
  await new Promise(r => setTimeout(r, 600));
  const shotBaseDir = multi ? path.join(outDir, safe) : outDir;
  if (multi && !fs.existsSync(shotBaseDir)) fs.mkdirSync(shotBaseDir, { recursive: true });
  const makePath = (suffix) => path.join(shotBaseDir, safe + (multi ? `-${suffix}` : '') + '.png');
  try {
    await page.screenshot({ path: makePath('1-code') });
    console.log('✓', makePath('1-code'));
  } catch (e) { console.warn('Screenshot failed (code view)', themeLabel, e.message); }
  if (multi) {
    const k = page.keyboard;
    async function pause(ms=500){ await new Promise(r=>setTimeout(r,ms)); }
    // 2: HTML file view
    try {
      await k.press('Control+P'); await pause(200); await k.type('sample.html'); await pause(200); await k.press('Enter'); await pause(700);
      await page.screenshot({ path: makePath('2-html') }); console.log('✓', makePath('2-html'));
    } catch(e){ console.warn('HTML shot failed', e.message); }
    // 3: Markdown preview
    try {
      await k.press('Control+P'); await pause(200); await k.type('sample.md'); await pause(200); await k.press('Enter'); await pause(500);
      await k.press('Control+Shift+V'); await pause(1200);
      await page.screenshot({ path: makePath('3-markdown') }); console.log('✓', makePath('3-markdown'));
    } catch(e){ console.warn('Markdown shot failed', e.message); }
    // 4: Search panel with gibberish
    try {
      await k.press('Control+Shift+F'); await pause(400);
      const gibberish = 'xela_qwerty_' + Math.random().toString(36).slice(2,8);
      // Focus search input (Ctrl+Shift+F already does, but ensure by typing) then type query
      await k.type(gibberish); await pause(300); await k.press('Enter'); await pause(800);
      await page.screenshot({ path: makePath('4-search') }); console.log('✓', makePath('4-search'));
    } catch(e){ console.warn('Search shot failed', e.message); }
    // 5: Suggestions dropdown in TS file
    try {
      await k.press('Control+P'); await pause(200); await k.type('sample.ts'); await pause(150); await k.press('Enter'); await pause(600);
      await k.press('End'); await pause(100); await k.press('Enter'); await pause(100);
      await k.type('const demoVal = Math.'); await pause(400); // trigger auto suggest
      await k.press('Control+Space'); await pause(900);
      await page.screenshot({ path: makePath('5-suggest') }); console.log('✓', makePath('5-suggest'));
    } catch(e){ console.warn('Suggest shot failed', e.message); }
    // 6: Terminal shot
    try { await k.press('Control+`'); await pause(900); await page.screenshot({ path: makePath('6-terminal') }); console.log('✓', makePath('6-terminal')); } catch(e){ console.warn('Terminal shot failed', e.message); }
    // 7: Settings view
    try { await k.press('Control+,'); await pause(1200); await page.screenshot({ path: makePath('7-settings') }); console.log('✓', makePath('7-settings')); } catch(e){ console.warn('Settings shot failed', e.message); }
    // 8: Command Palette
    try { await k.press('F1'); await pause(400); await k.type('Preferences:'); await pause(700); await page.screenshot({ path: makePath('8-command') }); console.log('✓', makePath('8-command')); } catch(e){ console.warn('Command palette shot failed', e.message); }
  }
  try {
    if(!multi) {
      await page.screenshot({ path: makePath('single') });
      console.log('✓', makePath('single'));
    }
  } catch (e) { /* already logged earlier */ }
  await browser.close();
  child.kill();
  return true;
}
