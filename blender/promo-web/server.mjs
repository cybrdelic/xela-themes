/**
 * Local dev/record server for the XELA promo scene.
 * Serves index.html + /api/themes (reads actual theme JSON files).
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THEMES_DIR = path.join(__dirname, '..', '..', 'themes');

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.json': 'application/json',
  '.css':  'text/css',
  '.png':  'image/png',
};

// ── Extract usable palette from a VS Code theme JSON ───────────────────────
function extractPalette(json) {
  const c = json.colors || {};
  const t = json.tokenColors || [];

  const tok = (scopes) => {
    const arr = Array.isArray(scopes) ? scopes : [scopes];
    for (const sc of arr) {
      const found = t.find(r => {
        const s = Array.isArray(r.scope) ? r.scope : [r.scope || ''];
        return s.some(x => x && x.includes(sc));
      });
      if (found?.settings?.foreground) return found.settings.foreground;
    }
    return null;
  };

  const bg      = c['editor.background']              || '#0d0d16';
  const fg      = c['editor.foreground']              || '#d9e0f2';
  const accent  = c['statusBar.background']           ||
                  c['activityBarBadge.background']    ||
                  c['button.background']               || '#008cff';
  const sidebar = c['sideBar.background']             || bg;
  const border  = c['editorGroup.border']             ||
                  c['panel.border']                    || '#1e1e30';
  const sel     = c['editor.selectionBackground']     || accent + '44';
  const lineHl  = c['editor.lineHighlightBackground'] || '#ffffff08';

  const keyword = tok(['keyword.control','keyword','storage.type'])        || '#008cff';
  const string  = tok(['string.quoted','string'])                          || '#00e573';
  const fn      = tok(['entity.name.function','support.function'])         || '#00d9d9';
  const type    = tok(['entity.name.type','support.type','storage.type.']) || '#8c33ff';
  const num     = tok(['constant.numeric'])                                || '#ffa600';
  const comment = tok(['comment'])                                         || '#3d4466';
  const varCol  = tok(['variable','meta.definition.variable'])             || fg;
  const prop    = tok(['variable.other.property','support.variable'])      || fn;

  return {
    name: json.name || 'Unknown',
    type: json.type || 'dark',
    bg, fg, accent, sidebar, border, sel, lineHl,
    keyword, string, fn, type: type, num, comment, var: varCol, prop,
  };
}

// ── Load all themes once at startup ────────────────────────────────────────
let THEMES = [];
try {
  const files = fs.readdirSync(THEMES_DIR).filter(f => f.endsWith('.json'));
  for (const f of files) {
    try {
      const raw  = fs.readFileSync(path.join(THEMES_DIR, f), 'utf8');
      const json = JSON.parse(raw);
      THEMES.push(extractPalette(json));
    } catch { /* skip malformed */ }
  }
  console.log(`  Loaded ${THEMES.length} themes from ${THEMES_DIR}`);
} catch (e) {
  console.error('  Could not read themes dir:', e.message);
}

// ── HTTP server ─────────────────────────────────────────────────────────────
export function createServer(port = 7421) {
  const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];

    // CORS for Puppeteer
    res.setHeader('Access-Control-Allow-Origin', '*');

    // API
    if (url === '/api/themes') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(THEMES));
      return;
    }

    // Static files in this directory
    let filePath = url === '/' ? '/index.html' : url;
    filePath = path.join(__dirname, filePath);
    const ext  = path.extname(filePath);
    const mime = MIME[ext] || 'text/plain';

    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise(resolve => {
    server.listen(port, '127.0.0.1', () => {
      console.log(`  Promo server → http://127.0.0.1:${port}`);
      resolve({ server, port, url: `http://127.0.0.1:${port}` });
    });
  });
}

// Standalone run
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { url } = await createServer(7421);
  const { exec } = await import('child_process');
  exec(`start "" "${url}"`);
}
