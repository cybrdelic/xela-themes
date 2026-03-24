#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { buildBrowserThemeData } from './browser-theme-data.mjs';

const outDir = path.resolve('./exports/browser-extension');

const index = buildBrowserThemeData();
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

const manifestPath = path.join(outDir, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
delete manifest.theme;
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

console.log(`\nTo load in Chrome/Edge:`);
console.log(`  1. Open edge://extensions`);
console.log(`  2. Enable "Developer mode"`);
console.log(`  3. Click "Load unpacked" → select: ${outDir}`);
