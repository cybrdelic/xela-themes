import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const rootDir = path.resolve('.');
const browserThemesDir = path.join(rootDir, 'exports', 'browser-themes');
const browserThemesIndexPath = path.join(browserThemesDir, 'index.json');
const browserThemesBuildScript = path.join(rootDir, 'scripts', 'theme-system', 'build-browser-themes.mjs');

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function ensureBrowserThemesBuilt() {
  if (fs.existsSync(browserThemesIndexPath)) {
    return;
  }

  const result = spawnSync(process.execPath, [browserThemesBuildScript], {
    cwd: rootDir,
    stdio: 'inherit'
  });

  if (result.status !== 0) {
    throw new Error('Failed to build browser themes.');
  }
}

export function loadBrowserThemeIndex() {
  ensureBrowserThemesBuilt();
  return JSON.parse(fs.readFileSync(browserThemesIndexPath, 'utf8'));
}

export function resolveBrowserTheme(query, index = loadBrowserThemeIndex()) {
  const themes = Array.isArray(index?.themes) ? index.themes : [];
  const raw = String(query || '').trim();
  if (!raw) {
    return null;
  }

  const exact = themes.find((theme) =>
    theme.id === raw ||
    theme.name === raw ||
    theme.path === raw
  );
  if (exact) {
    return exact;
  }

  const normalized = normalize(raw);
  return themes.find((theme) => {
    const candidates = [
      theme.id,
      theme.name,
      ...(theme.packIds || []),
      ...(theme.packLabels || [])
    ];
    return candidates.some((candidate) => normalize(candidate) === normalized);
  }) || themes.find((theme) => {
    const candidates = [
      theme.id,
      theme.name,
      ...(theme.packIds || []),
      ...(theme.packLabels || [])
    ];
    return candidates.some((candidate) => normalize(candidate).includes(normalized));
  }) || null;
}

export function getBrowserThemeDir(theme) {
  return path.resolve(rootDir, path.dirname(theme.path));
}

export function buildBrowserThemePackList(index = loadBrowserThemeIndex()) {
  const themes = Array.isArray(index?.themes) ? index.themes : [];
  const listedPacks = Array.isArray(index?.packs) ? index.packs : [];
  const packMap = new Map();

  packMap.set('all', {
    id: 'all',
    label: 'All Themes',
    description: 'Browse every generated browser-chrome theme.',
    themeIds: themes.map((theme) => theme.id)
  });

  for (const pack of listedPacks) {
    const themeIds = themes
      .filter((theme) => (theme.packIds || []).includes(pack.id))
      .map((theme) => theme.id);
    if (themeIds.length > 0) {
      packMap.set(pack.id, {
        id: pack.id,
        label: pack.label,
        description: pack.description || '',
        themeIds
      });
    }
  }

  const packedThemeIds = new Set(
    Array.from(packMap.values())
      .filter((pack) => pack.id !== 'all')
      .flatMap((pack) => pack.themeIds)
  );
  const standaloneIds = themes
    .filter((theme) => !packedThemeIds.has(theme.id))
    .map((theme) => theme.id);

  if (standaloneIds.length > 0) {
    packMap.set('standalone', {
      id: 'standalone',
      label: 'Standalone',
      description: 'Themes without named pack membership.',
      themeIds: standaloneIds
    });
  }

  return Array.from(packMap.values());
}
