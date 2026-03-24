#!/usr/bin/env node
import path from 'node:path';
import { getBrowserThemeDir, loadBrowserThemeIndex, resolveBrowserTheme } from './browser-theme-utils.mjs';

const args = process.argv.slice(2);

function readFlag(flagName) {
  const index = args.findIndex((value) => value === flagName);
  if (index === -1) return null;
  return args[index + 1] || null;
}

const themeQuery = readFlag('--theme') || args[0];
if (!themeQuery) {
  console.error('Missing browser theme id or name.');
  process.exit(1);
}

const index = loadBrowserThemeIndex();
const theme = resolveBrowserTheme(themeQuery, index);
if (!theme) {
  console.error(`Browser theme not found: ${themeQuery}`);
  process.exit(1);
}

const themeDir = getBrowserThemeDir(theme);
const manifestPath = path.join(themeDir, 'manifest.json');

console.log(theme.name);
console.log(`Theme ID: ${theme.id}`);
console.log(`Folder: ${themeDir}`);
console.log(`Manifest: ${manifestPath}`);
console.log('');
console.log('Load it in Chrome/Edge:');
console.log('1. Open edge://extensions or chrome://extensions');
console.log('2. Enable Developer mode');
console.log('3. Click "Load unpacked"');
console.log(`4. Select: ${themeDir}`);
