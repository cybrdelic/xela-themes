import fs from 'fs';
import path from 'path';

const generatedSchemesPath = path.resolve('./exports/windows-terminal/xela-windows-terminal-schemes.json');
const generatedIndexPath = path.resolve('./exports/windows-terminal/xela-windows-terminal-index.json');
const themePacksPath = path.resolve('./theme-packs.json');

function normalizeKey(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function toThemeId(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseJsonc(text) {
  const stripped = text
    .replace(/("(\\.|[^\\"])*")|(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)/g, (match, str) => (str ? str : ''))
    .replace(/,\s*([}\]])/g, '$1');
  return JSON.parse(stripped);
}

export function loadWindowsTerminalSchemes() {
  if (!fs.existsSync(generatedSchemesPath)) {
    throw new Error('Windows Terminal schemes not found. Run `npm run build:windows-terminal` first.');
  }
  return JSON.parse(fs.readFileSync(generatedSchemesPath, 'utf8'));
}

export function loadWindowsTerminalThemeIndex() {
  if (!fs.existsSync(generatedIndexPath)) {
    throw new Error('Windows Terminal theme index not found. Run `npm run build:windows-terminal` first.');
  }
  return JSON.parse(fs.readFileSync(generatedIndexPath, 'utf8'));
}

export function loadThemePacks() {
  if (!fs.existsSync(themePacksPath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(themePacksPath, 'utf8'));
}

export function getWindowsTerminalSettingsCandidates(env = process.env) {
  const localAppData = env.LOCALAPPDATA;
  if (!localAppData) {
    return [];
  }

  return [
    path.join(localAppData, 'Packages', 'Microsoft.WindowsTerminal_8wekyb3d8bbwe', 'LocalState', 'settings.json'),
    path.join(localAppData, 'Packages', 'Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe', 'LocalState', 'settings.json'),
    path.join(localAppData, 'Microsoft', 'Windows Terminal', 'settings.json'),
    path.join(localAppData, 'Microsoft', 'Windows Terminal Preview', 'settings.json')
  ];
}

export function resolveWindowsTerminalSettingsPath(customPath, env = process.env) {
  if (customPath) {
    return path.resolve(customPath);
  }

  return getWindowsTerminalSettingsCandidates(env).find((candidate) => fs.existsSync(candidate)) || null;
}

export function readWindowsTerminalSettings(settingsPath) {
  const content = fs.readFileSync(settingsPath, 'utf8');
  return parseJsonc(content);
}

export function readWindowsTerminalSettingsFile(settingsPath) {
  const raw = fs.readFileSync(settingsPath, 'utf8');
  return {
    raw,
    settings: parseJsonc(raw)
  };
}

export function resolveEffectiveWindowsTerminalSchemeName(settings) {
  const defaultProfileGuid = settings?.defaultProfile || null;
  const profiles = Array.isArray(settings?.profiles?.list) ? settings.profiles.list : [];
  const defaultProfile = profiles.find((profile) => profile.guid === defaultProfileGuid) || null;
  return defaultProfile?.colorScheme || settings?.profiles?.defaults?.colorScheme || null;
}

export function listProfileTargets(settings) {
  const profiles = Array.isArray(settings?.profiles?.list) ? settings.profiles.list : [];
  return profiles.map((profile) => ({
    guid: profile.guid || null,
    name: profile.name || profile.guid || 'Unnamed profile'
  }));
}

export function resolveSchemeName(input, schemes, themeIndex = null) {
  if (!input) {
    return null;
  }

  const normalizedInput = normalizeKey(input);
  const indexedThemes = Array.isArray(themeIndex?.themes)
    ? themeIndex.themes
    : (Array.isArray(themeIndex) ? themeIndex : []);

  const exactIndexMatch = indexedThemes.find((theme) => {
    const candidates = [
      theme.id,
      theme.name,
      theme.vscodeName,
      toThemeId(theme.name),
      toThemeId(theme.vscodeName)
    ];
    return candidates.some((candidate) => normalizeKey(candidate) === normalizedInput);
  });
  if (exactIndexMatch) {
    return exactIndexMatch.name;
  }

  const exact = schemes.find((scheme) => {
    const candidates = [scheme.name, toThemeId(scheme.name)];
    return candidates.some((candidate) => normalizeKey(candidate) === normalizedInput);
  });

  if (exact) {
    return exact.name;
  }

  const partial = [
    ...indexedThemes.map((theme) => ({
      name: theme.name,
      candidates: [theme.id, theme.name, theme.vscodeName, toThemeId(theme.name), toThemeId(theme.vscodeName)]
    })),
    ...schemes.map((scheme) => ({
      name: scheme.name,
      candidates: [scheme.name, toThemeId(scheme.name)]
    }))
  ].filter((scheme) => {
    const candidates = scheme.candidates;
    return candidates.some((candidate) => normalizeKey(candidate).includes(normalizedInput));
  });

  if (partial.length === 1) {
    return partial[0].name;
  }

  if (partial.length > 1) {
    const uniqueMatches = [...new Set(partial.map((scheme) => scheme.name))];
    throw new Error(`Ambiguous scheme "${input}". Matches: ${uniqueMatches.slice(0, 5).join(', ')}`);
  }

  throw new Error(`Unknown scheme "${input}".`);
}

function isXelaSchemeName(name) {
  return typeof name === 'string' && name.startsWith('XELA ');
}

export function mergeSchemes(existingSchemes, xelaSchemes) {
  const preserved = Array.isArray(existingSchemes)
    ? existingSchemes.filter((scheme) => !isXelaSchemeName(scheme?.name))
    : [];
  return [...preserved, ...xelaSchemes];
}

function ensureProfiles(settings) {
  if (!settings.profiles || typeof settings.profiles !== 'object') {
    settings.profiles = {};
  }
  if (!settings.profiles.defaults || typeof settings.profiles.defaults !== 'object') {
    settings.profiles.defaults = {};
  }
  if (!Array.isArray(settings.profiles.list)) {
    settings.profiles.list = [];
  }
}

function matchesProfile(profile, profileSelector) {
  if (!profileSelector) {
    return false;
  }
  const target = normalizeKey(profileSelector);
  return normalizeKey(profile.guid) === target || normalizeKey(profile.name) === target;
}

export function applyWindowsTerminalTheme(settings, options) {
  const {
    xelaSchemes,
    schemeName = null,
    profile = null,
    allProfiles = false
  } = options;

  settings.schemes = mergeSchemes(settings.schemes, xelaSchemes);
  ensureProfiles(settings);

  if (!schemeName) {
    return settings;
  }

  if (allProfiles) {
    for (const item of settings.profiles.list) {
      item.colorScheme = schemeName;
    }
    return settings;
  }

  if (profile) {
    let matched = false;
    for (const item of settings.profiles.list) {
      if (matchesProfile(item, profile)) {
        item.colorScheme = schemeName;
        matched = true;
      }
    }
    if (!matched) {
      throw new Error(`Profile "${profile}" not found in Windows Terminal settings.`);
    }
    return settings;
  }

  settings.profiles.defaults.colorScheme = schemeName;
  return settings;
}

export function writeWindowsTerminalSettings(settingsPath, settings, { backup = true, backupContent = null } = {}) {
  let backupPath = null;
  if (backup && fs.existsSync(settingsPath)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    backupPath = `${settingsPath}.${timestamp}.bak`;
    if (typeof backupContent === 'string') {
      fs.writeFileSync(backupPath, backupContent, 'utf8');
    } else {
      fs.copyFileSync(settingsPath, backupPath);
    }
  }

  fs.writeFileSync(settingsPath, `${JSON.stringify(settings, null, 2)}\n`, 'utf8');
  return backupPath;
}
