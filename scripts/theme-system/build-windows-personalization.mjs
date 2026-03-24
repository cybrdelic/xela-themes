#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { loadWindowsTerminalSchemes, loadWindowsTerminalThemeIndex } from './windows-terminal-utils.mjs';
import {
  inferThemeMode,
  sanitizeThemeFileName,
  windowsPersonalizationPaths,
  writeWallpaperBmp
} from './windows-personalization-utils.mjs';

const outRoot = path.resolve('./exports/windows-personalization');
const schemes = loadWindowsTerminalSchemes();
const themeIndex = loadWindowsTerminalThemeIndex();
const schemesByName = new Map(schemes.map((scheme) => [scheme.name, scheme]));

function build() {
  fs.mkdirSync(windowsPersonalizationPaths.wallpapersDir, { recursive: true });

  const themes = (themeIndex.themes || [])
    .map((theme) => {
      const scheme = schemesByName.get(theme.name);
      if (!scheme) {
        return null;
      }

      const fileBase = sanitizeThemeFileName(theme.id || theme.name);
      const wallpaperPath = path.join(windowsPersonalizationPaths.wallpapersDir, `${fileBase}.bmp`);
      const record = {
        ...theme,
        mode: inferThemeMode(scheme),
        scheme,
        wallpaperFile: wallpaperPath
      };

      writeWallpaperBmp(wallpaperPath, scheme);

      return {
        id: theme.id,
        name: theme.name,
        vscodeName: theme.vscodeName || theme.name,
        description: theme.description || '',
        source: theme.source,
        packIds: theme.packIds || [],
        packLabels: theme.packLabels || [],
        mode: record.mode,
        wallpaperFile: wallpaperPath
      };
    })
    .filter(Boolean);

  const index = {
    generatedAt: new Date().toISOString(),
    root: outRoot,
    themes
  };

  fs.writeFileSync(windowsPersonalizationPaths.indexPath, `${JSON.stringify(index, null, 2)}\n`);
  console.log(`Generated ${themes.length} Windows personalization themes in ${outRoot}`);
}

build();
