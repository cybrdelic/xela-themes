#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import {
  applyWindowsAccent,
  applyWindowsPersonalizationMode,
  applyWindowsShell,
  launchWindowsThemeFile,
  loadWindowsPersonalizationIndex,
  resolveWindowsPersonalizationTargetRoot,
  resolveWindowsPersonalizationTheme,
  writeWindowsThemeFile
} from './windows-personalization-utils.mjs';
import { loadWindowsTerminalSchemes } from './windows-terminal-utils.mjs';

function parseArgs(argv) {
  const args = {
    theme: null,
    target: null,
    dryRun: false,
    noLaunch: false,
    noModeSync: false,
    noAccentSync: false
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--theme') args.theme = argv[++i];
    else if (arg === '--target') args.target = argv[++i];
    else if (arg === '--dry-run') args.dryRun = true;
    else if (arg === '--no-launch') args.noLaunch = true;
    else if (arg === '--no-mode-sync') args.noModeSync = true;
    else if (arg === '--no-accent-sync') args.noAccentSync = true;
    else if (!arg.startsWith('--') && !args.theme) args.theme = arg;
  }

  return args;
}

const args = parseArgs(process.argv.slice(2));
const index = loadWindowsPersonalizationIndex();
const theme = resolveWindowsPersonalizationTheme(args.theme, index);
const targetRoot = resolveWindowsPersonalizationTargetRoot(args.target);
const themeDir = path.join(targetRoot, 'themes');
const wallpaperDir = path.join(targetRoot, 'wallpapers');
const themePath = path.join(themeDir, 'xela-active.theme');
const wallpaperPath = path.join(wallpaperDir, path.basename(theme.wallpaperFile));
const schemes = loadWindowsTerminalSchemes();
const scheme = schemes.find((entry) => entry.name === theme.name);

if (!scheme) {
  console.error(`Scheme not found for Windows personalization theme: ${theme.name}`);
  process.exit(1);
}

if (args.dryRun) {
  console.log(JSON.stringify({
    targetRoot,
    themeName: theme.name,
    vscodeName: theme.vscodeName,
    mode: theme.mode,
    themePath,
    wallpaperPath,
    launch: !args.noLaunch,
    syncMode: !args.noModeSync,
    syncAccent: !args.noAccentSync
  }, null, 2));
  process.exit(0);
}

fs.mkdirSync(themeDir, { recursive: true });
fs.mkdirSync(wallpaperDir, { recursive: true });
const appliedTheme = { ...theme, scheme };
fs.copyFileSync(theme.wallpaperFile, wallpaperPath);
writeWindowsThemeFile(themePath, appliedTheme, wallpaperPath);

if (!args.noLaunch) {
  launchWindowsThemeFile(themePath);
  await new Promise((resolve) => setTimeout(resolve, 1500));
}

if (!args.noModeSync) {
  applyWindowsPersonalizationMode(appliedTheme);
}

if (!args.noAccentSync) {
  applyWindowsAccent(appliedTheme);
}

applyWindowsShell(appliedTheme);

console.log(`Installed Windows personalization theme at ${themePath}`);
console.log(`Wallpaper copied to ${wallpaperPath}`);
console.log(`Mode preference: ${theme.mode}`);

// Auto-apply icons if a generated set exists for this theme
const _themeIconId = theme.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const _iconManifestPath = path.resolve(`./exports/windows-icons/${_themeIconId}/icons-manifest.json`);
if (fs.existsSync(_iconManifestPath)) {
  console.log('Applying matching icon set...');
  const _applyIconsScript = new URL('./apply-icons.mjs', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
  const _iconProc = spawn(process.execPath, [_applyIconsScript, '--theme', theme.name], {
    stdio: 'inherit',
    cwd: path.resolve('.')
  });
  await new Promise((resolve) => _iconProc.on('exit', resolve));
}
