#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import {
  applyWindowsTerminalTheme,
  loadWindowsTerminalSchemes,
  loadWindowsTerminalThemeIndex,
  readWindowsTerminalSettings,
  resolveSchemeName,
  resolveWindowsTerminalSettingsPath,
  writeWindowsTerminalSettings
} from './windows-terminal-utils.mjs';

function parseArgs(argv) {
  const args = {
    settings: null,
    scheme: null,
    profile: null,
    allProfiles: false,
    dryRun: false,
    backup: true
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--settings') args.settings = argv[++i];
    else if (arg === '--scheme') args.scheme = argv[++i];
    else if (arg === '--profile') args.profile = argv[++i];
    else if (arg === '--all-profiles') args.allProfiles = true;
    else if (arg === '--dry-run') args.dryRun = true;
    else if (arg === '--no-backup') args.backup = false;
    else if (!arg.startsWith('--') && !args.scheme) args.scheme = arg;
  }

  return args;
}

const args = parseArgs(process.argv.slice(2));
const settingsPath = resolveWindowsTerminalSettingsPath(args.settings);

if (!settingsPath) {
  console.error('Windows Terminal settings.json was not found. Pass --settings <path> to target a specific file.');
  process.exit(1);
}

if (!fs.existsSync(settingsPath)) {
  console.error(`Settings file does not exist: ${settingsPath}`);
  process.exit(1);
}

const schemes = loadWindowsTerminalSchemes();
const settings = readWindowsTerminalSettings(settingsPath);
const themeIndex = loadWindowsTerminalThemeIndex();
const schemeName = args.scheme
  ? resolveSchemeName(args.scheme, schemes, themeIndex)
  : null;

applyWindowsTerminalTheme(settings, {
  xelaSchemes: schemes,
  schemeName,
  profile: args.profile,
  allProfiles: args.allProfiles
});

if (args.dryRun) {
  console.log(JSON.stringify({
    settingsPath: path.resolve(settingsPath),
    schemeName,
    profile: args.profile,
    allProfiles: args.allProfiles,
    schemesInstalled: schemes.length
  }, null, 2));
  process.exit(0);
}

const backupPath = writeWindowsTerminalSettings(settingsPath, settings, { backup: args.backup });
console.log(`Updated Windows Terminal settings at ${settingsPath}`);
if (backupPath) {
  console.log(`Backup created at ${backupPath}`);
}
if (schemeName) {
  console.log(`Applied scheme: ${schemeName}`);
}
console.log(`Installed ${schemes.length} XELA schemes.`);
