#!/usr/bin/env node
import assert from 'assert';
import fs from 'fs';
import { loadWindowsPersonalizationIndex } from './windows-personalization-utils.mjs';

const index = loadWindowsPersonalizationIndex();

assert(Array.isArray(index.themes), 'Windows personalization index must include a themes array.');
assert(index.themes.length > 0, 'Windows personalization export should contain themes.');

for (const theme of index.themes) {
  assert(fs.existsSync(theme.themeFile), `Missing .theme file for ${theme.name}`);
  assert(fs.existsSync(theme.wallpaperFile), `Missing wallpaper file for ${theme.name}`);

  const content = fs.readFileSync(theme.themeFile, 'utf8');
  assert(content.includes('[Control Panel\\Desktop]'), `Missing desktop section in ${theme.themeFile}`);
  assert(content.includes('[VisualStyles]'), `Missing visual styles section in ${theme.themeFile}`);
  assert(content.includes('Wallpaper='), `Missing wallpaper entry in ${theme.themeFile}`);
}

console.log(`All Windows personalization theme tests passed (${index.themes.length} themes).`);
