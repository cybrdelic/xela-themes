#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const indexPath = path.resolve('./exports/userscripts/xela-userscript-index.json');
const outDir = path.resolve('./exports/browser-extension');

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

// Strip down to just what the extension needs (palette + metadata)
const themes = index.themes.map(({ id, name, type, packIds, packLabels, palette }) => ({
  id, name, type, packIds, packLabels, palette
}));
const packs = index.packs;

fs.mkdirSync(path.join(outDir, 'background'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'content/sites'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'popup'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'icons'), { recursive: true });

const themesOut = path.join(outDir, 'themes.json');
fs.writeFileSync(themesOut, JSON.stringify({ themes, packs }, null, 2) + '\n', 'utf8');
console.log(`Extension themes.json: ${themes.length} themes → ${themesOut}`);
console.log(`\nTo load in Chrome:`);
console.log(`  1. Open chrome://extensions`);
console.log(`  2. Enable "Developer mode"`);
console.log(`  3. Click "Load unpacked" → select: ${outDir}`);
