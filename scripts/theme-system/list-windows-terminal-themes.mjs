#!/usr/bin/env node
import { loadWindowsTerminalThemeIndex } from './windows-terminal-utils.mjs';

const mode = process.argv[2] || 'themes';
const index = loadWindowsTerminalThemeIndex();

if (mode === 'packs') {
  for (const pack of index.packs || []) {
    console.log(`${pack.label} (${pack.availableThemeIds.length})`);
  }
  process.exit(0);
}

for (const theme of index.themes || []) {
  if (mode === 'verbose' && Array.isArray(theme.packLabels) && theme.packLabels.length > 0) {
    console.log(`${theme.name} [${theme.packLabels.join(', ')}]`);
  } else {
    console.log(theme.name);
  }
}
