#!/usr/bin/env node
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { themes } from './theme-config.mjs';
import { loadThemePacks } from './windows-terminal-utils.mjs';

const schemesPath = path.resolve('./exports/windows-terminal/xela-windows-terminal-schemes.json');
const indexPath = path.resolve('./exports/windows-terminal/xela-windows-terminal-index.json');
const requiredKeys = [
  'name',
  'background',
  'foreground',
  'cursorColor',
  'selectionBackground',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'purple',
  'cyan',
  'white',
  'brightBlack',
  'brightRed',
  'brightGreen',
  'brightYellow',
  'brightBlue',
  'brightPurple',
  'brightCyan',
  'brightWhite'
];
const nostalgiaIds = [
  'xela-apple-ii',
  'xela-commodore-64',
  'xela-basic-dos',
  'xela-basic-dos-light',
  'xela-macos-classic',
  'xela-macos-classic-dark',
  'xela-macos-aqua',
  'xela-macos-aqua-dark',
  'xela-classic-ps2',
  'xela-classic-ps2-light',
  'xela-windows-xp',
  'xela-windows-xp-dark',
  'xela-winamp-classic',
  'xela-myspace-raw-html',
  'xela-myspace-dark',
  'xela-hal-9000'
];

assert(fs.existsSync(schemesPath), 'Windows Terminal schemes file not found. Run build:windows-terminal first.');
assert(fs.existsSync(indexPath), 'Windows Terminal theme index file not found. Run build:windows-terminal first.');

const schemes = JSON.parse(fs.readFileSync(schemesPath, 'utf8'));
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const sourceIds = new Set(themes.map((theme) => theme.id));
const legacyPackThemeIds = new Set(
  loadThemePacks()
    .flatMap((pack) => pack.themes || [])
    .map((theme) => theme.id)
    .filter((id) => !sourceIds.has(id))
);

assert(Array.isArray(schemes), 'Windows Terminal schemes output must be an array.');
assert.strictEqual(
  schemes.length,
  themes.length + legacyPackThemeIds.size,
  `Expected ${themes.length + legacyPackThemeIds.size} schemes, got ${schemes.length}.`
);
assert(Array.isArray(index.themes), 'Windows Terminal theme index must include a themes array.');
assert(Array.isArray(index.packs), 'Windows Terminal theme index must include a packs array.');
assert.strictEqual(index.themes.length, schemes.length, 'Theme index size must match scheme output size.');

for (const scheme of schemes) {
  for (const key of requiredKeys) {
    assert(key in scheme, `Missing ${key} in scheme ${scheme.name || '(unnamed)'}`);
    if (key !== 'name') {
      assert(/^#[0-9A-F]{6}$/i.test(scheme[key]), `Invalid ${key} color in scheme ${scheme.name}: ${scheme[key]}`);
    }
  }
}

for (const id of nostalgiaIds) {
  assert(index.themes.some((theme) => theme.id === id), `Missing nostalgia theme in Windows Terminal index: ${id}`);
}

const nostalgiaPack = index.packs.find((pack) => pack.id === 'xela-tech-nostalgia');
assert(nostalgiaPack, 'Expected nostalgia pack in Windows Terminal theme index.');
for (const id of nostalgiaIds) {
  assert(
    nostalgiaPack.availableThemeIds.includes(id),
    `Expected nostalgia pack to expose ${id} in the Windows Terminal theme index.`
  );
}

console.log(`All Windows Terminal scheme tests passed (${schemes.length} schemes).`);
