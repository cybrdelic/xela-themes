#!/usr/bin/env node
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  applyWindowsTerminalTheme,
  loadWindowsTerminalSchemes,
  parseJsonc,
  readWindowsTerminalSettings,
  resolveEffectiveWindowsTerminalSchemeName,
  writeWindowsTerminalSettings
} from './windows-terminal-utils.mjs';

const fixturePath = path.resolve('./test-workspace/windows-terminal-settings.fixture.jsonc');
const tempPath = path.resolve('./test-workspace/windows-terminal-settings.generated.json');

fs.mkdirSync(path.dirname(fixturePath), { recursive: true });

const fixture = `{
  // Existing user settings
  "defaultProfile": "{11111111-1111-1111-1111-111111111111}",
  "schemes": [
    {
      "name": "Campbell",
      "background": "#0C0C0C",
      "foreground": "#CCCCCC"
    }
  ],
  "profiles": {
    "defaults": {},
    "list": [
      {
        "guid": "{11111111-1111-1111-1111-111111111111}",
        "name": "PowerShell"
      },
      {
        "guid": "{22222222-2222-2222-2222-222222222222}",
        "name": "Ubuntu"
      }
    ]
  }
}
`;

fs.writeFileSync(fixturePath, fixture, 'utf8');

const schemes = loadWindowsTerminalSchemes();
const settings = parseJsonc(fixture);
applyWindowsTerminalTheme(settings, {
  xelaSchemes: schemes,
  schemeName: schemes[0].name
});

assert.strictEqual(settings.profiles.defaults.colorScheme, schemes[0].name);
assert(settings.schemes.some((scheme) => scheme.name === 'Campbell'));
assert(settings.schemes.some((scheme) => scheme.name === schemes[0].name));

const backupPath = writeWindowsTerminalSettings(tempPath, settings, { backup: false });
assert.strictEqual(backupPath, null);

const written = readWindowsTerminalSettings(tempPath);
assert.strictEqual(written.profiles.defaults.colorScheme, schemes[0].name);
assert(written.schemes.some((scheme) => scheme.name === 'Campbell'));

const overrideSettings = parseJsonc(`{
  "defaultProfile": "{11111111-1111-1111-1111-111111111111}",
  "profiles": {
    "defaults": {
      "colorScheme": "Old Default"
    },
    "list": [
      {
        "guid": "{11111111-1111-1111-1111-111111111111}",
        "name": "PowerShell",
        "colorScheme": "Pinned A"
      },
      {
        "guid": "{22222222-2222-2222-2222-222222222222}",
        "name": "Ubuntu",
        "colorScheme": "Pinned B"
      }
    ]
  }
}`);

applyWindowsTerminalTheme(overrideSettings, {
  xelaSchemes: schemes,
  schemeName: schemes[1].name,
  allProfiles: true
});

assert.strictEqual(overrideSettings.profiles.list[0].colorScheme, schemes[1].name);
assert.strictEqual(overrideSettings.profiles.list[1].colorScheme, schemes[1].name);
assert.strictEqual(overrideSettings.profiles.defaults.colorScheme, 'Old Default');
assert.strictEqual(resolveEffectiveWindowsTerminalSchemeName(overrideSettings), schemes[1].name);

fs.unlinkSync(tempPath);

console.log('Windows Terminal installer tests passed.');
