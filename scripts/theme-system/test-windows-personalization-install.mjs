#!/usr/bin/env node
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  buildThemeFileContent,
  loadWindowsPersonalizationIndex,
  resolveWindowsPersonalizationTheme,
  writeWindowsThemeFile
} from './windows-personalization-utils.mjs';
import { loadWindowsTerminalSchemes } from './windows-terminal-utils.mjs';

const index = loadWindowsPersonalizationIndex();
const theme = resolveWindowsPersonalizationTheme('xela-winamp-classic', index);
const schemes = loadWindowsTerminalSchemes();
const scheme = schemes.find((entry) => entry.name === theme.name);
const targetRoot = path.resolve('./test-workspace/windows-personalization-install');
const themeDir = path.join(targetRoot, 'themes');
const wallpaperDir = path.join(targetRoot, 'wallpapers');
const themePath = path.join(themeDir, path.basename(theme.themeFile));
const wallpaperPath = path.join(wallpaperDir, path.basename(theme.wallpaperFile));

assert(scheme, 'Expected matching scheme for windows personalization install test.');

fs.rmSync(targetRoot, { recursive: true, force: true });
fs.mkdirSync(themeDir, { recursive: true });
fs.mkdirSync(wallpaperDir, { recursive: true });
fs.copyFileSync(theme.wallpaperFile, wallpaperPath);
writeWindowsThemeFile(themePath, { ...theme, scheme }, wallpaperPath);

assert(fs.existsSync(themePath), 'Expected installed .theme file.');
assert(fs.existsSync(wallpaperPath), 'Expected installed wallpaper file.');

const installed = fs.readFileSync(themePath, 'utf8');
assert(installed.includes(wallpaperPath), 'Installed theme file should point to the copied wallpaper.');
assert(installed.includes("DisplayName=XELA Winamp Spectrum - Chrome EQ"), 'Installed theme file should include an ASCII-safe display name.');
assert(!installed.includes('—'), 'Installed theme file should not contain Unicode em dashes.');
assert(!installed.includes('•'), 'Installed theme file should not contain Unicode bullet characters.');

const classicTheme = resolveWindowsPersonalizationTheme('XELA Platinum Finder — Classic Mac', index);
const classicScheme = schemes.find((entry) => entry.name === classicTheme.name);
assert(classicScheme, 'Expected matching scheme for macOS Classic personalization test.');
const classicContent = buildThemeFileContent({ ...classicTheme, scheme: classicScheme }, wallpaperPath);
assert(classicContent.includes('ColorizationColor=0XC4DADAD5'), 'Classic Mac shell colorization should stay platinum instead of Windows blue.');
assert(!classicContent.includes('ColorizationColor=0XC40A3B91'), 'Classic Mac shell colorization should not use the generic blue accent.');

fs.rmSync(targetRoot, { recursive: true, force: true });

console.log('Windows personalization install tests passed.');
