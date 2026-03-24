#!/usr/bin/env node
import { loadWindowsPersonalizationIndex } from './windows-personalization-utils.mjs';

const index = loadWindowsPersonalizationIndex();
const mode = process.argv[2] || 'themes';

if (mode === 'packs') {
  const packMap = new Map();
  for (const theme of index.themes || []) {
    for (let i = 0; i < (theme.packIds || []).length; i++) {
      const id = theme.packIds[i];
      const label = theme.packLabels?.[i] || id;
      const entry = packMap.get(id) || { label, count: 0 };
      entry.count += 1;
      packMap.set(id, entry);
    }
  }
  for (const [id, entry] of packMap) {
    console.log(`${entry.label} (${entry.count}) [${id}]`);
  }
  process.exit(0);
}

for (const theme of index.themes || []) {
  if (mode === 'verbose') {
    const origin = theme.vscodeName && theme.vscodeName !== theme.name ? ` <- ${theme.vscodeName}` : '';
    console.log(`${theme.name} [${theme.mode}]${origin}`);
  } else {
    console.log(theme.name);
  }
}
