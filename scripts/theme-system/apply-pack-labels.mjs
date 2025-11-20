#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
const packsPath = path.join(rootDir, 'scripts', 'theme-system', 'theme-packs.json');
const themesDir = path.join(rootDir, 'themes');

if (!fs.existsSync(packsPath)) {
  console.error('Missing scripts/theme-system/theme-packs.json. Run generate-pack-plan first.');
  process.exit(1);
}

const packData = JSON.parse(fs.readFileSync(packsPath, 'utf8'));
const deriveId = (fileName) => {
  const match = /xela-(.+)-color-theme\.json$/i.exec(fileName);
  return match ? `xela-${match[1]}` : path.basename(fileName).replace(/-color-theme\.json$/i, '');
};

const themeToPack = new Map();
for (const pack of packData) {
  for (const theme of pack.themes) {
    themeToPack.set(theme.id, pack.label);
  }
}

const files = fs
  .readdirSync(themesDir)
  .filter((file) => file.endsWith('-color-theme.json'))
  .sort();

let updated = 0;
let missingPack = 0;

for (const file of files) {
  const id = deriveId(file);
  const packLabel = themeToPack.get(id);
  if (!packLabel) {
    missingPack += 1;
    continue;
  }

  const themePath = path.join(themesDir, file);
  const content = JSON.parse(fs.readFileSync(themePath, 'utf8'));
  const baseName = content.xBaseName ?? content.name;
  const coreName = baseName.replace(/^XELA\s+/i, '').trim();
  const strippedBase = coreName.length > 0 ? coreName : baseName.trim();
  const finalName = `${packLabel} • ${strippedBase}`;

  let changed = false;
  if (!content.xBaseName) {
    content.xBaseName = baseName;
    changed = true;
  }
  if (content.xPackLabel !== packLabel) {
    content.xPackLabel = packLabel;
    changed = true;
  }
  if (content.name !== finalName) {
    content.name = finalName;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(themePath, JSON.stringify(content, null, 2) + '\n');
    updated += 1;
  }
}

console.log(`Applied pack prefixes to ${updated} theme files.`);
if (missingPack > 0) {
  console.warn(`Warning: ${missingPack} themes did not map to a pack label.`);
}
