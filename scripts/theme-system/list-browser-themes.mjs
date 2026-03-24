#!/usr/bin/env node
import { buildBrowserThemePackList, loadBrowserThemeIndex } from './browser-theme-utils.mjs';

const index = loadBrowserThemeIndex();
const mode = process.argv[2] || 'themes';

if (mode === 'packs') {
  for (const pack of buildBrowserThemePackList(index)) {
    console.log(`${pack.label} (${pack.themeIds.length})`);
  }
  process.exit(0);
}

for (const theme of index.themes || []) {
  if (mode === 'verbose') {
    console.log(`${theme.name} [${(theme.packLabels || []).join(', ') || theme.type}]`);
  } else {
    console.log(theme.name);
  }
}
