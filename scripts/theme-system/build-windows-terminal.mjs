#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { buildCompleteColors } from './color-mapping.js';
import { themes } from './theme-config.mjs';
import { loadThemePacks, parseJsonc } from './windows-terminal-utils.mjs';
import { getWindowsTerminalPreset } from './windows-terminal-presets.mjs';

const outDir = path.resolve('./exports/windows-terminal');
const requestedIds = process.argv.slice(2);
const requestedSet = new Set(requestedIds);
const themePacks = loadThemePacks();

function toHex6(color, fallback = '#000000') {
  const raw = typeof color === 'string' && color.trim() ? color.trim() : fallback;
  const clean = raw.replace(/^#/, '').replace(/[^0-9a-fA-F]/g, '');

  if (clean.length === 3 || clean.length === 4) {
    return '#' + clean.slice(0, 3).split('').map((char) => char + char).join('').toUpperCase();
  }

  if (clean.length >= 6) {
    return '#' + clean.slice(0, 6).toUpperCase();
  }

  return fallback.toUpperCase();
}

function terminalColor(colors, key, fallback) {
  return toHex6(colors[key], fallback);
}

function applyPreset(themeId, fallbackName, scheme) {
  const preset = getWindowsTerminalPreset(themeId);
  if (!preset) {
    return {
      name: fallbackName,
      vscodeName: fallbackName,
      description: '',
      scheme: {
        name: fallbackName,
        ...scheme
      }
    };
  }

  return {
    name: preset.name,
    vscodeName: fallbackName,
    description: preset.description || '',
    scheme: {
      name: preset.name,
      ...preset.colors
    }
  };
}

function buildWindowsTerminalSchemeFromSource(theme) {
  const colors = buildCompleteColors(theme.roles, theme.colorOverrides || {});
  const foreground = terminalColor(colors, 'terminal.foreground', colors['editor.foreground'] || theme.roles.textPrimary);
  const background = terminalColor(colors, 'terminal.background', colors['editor.background'] || theme.roles.surface0);

  return applyPreset(theme.id, theme.name, {
    cursorColor: terminalColor(colors, 'terminalCursor.foreground', colors['editorCursor.foreground'] || theme.roles.accentPrimary),
    selectionBackground: terminalColor(
      colors,
      'terminal.selectionBackground',
      colors['editor.selectionBackground'] || theme.roles.accentSelection || theme.roles.accentPrimary
    ),
    background,
    foreground,
    black: terminalColor(colors, 'terminal.ansiBlack', background),
    blue: terminalColor(colors, 'terminal.ansiBlue', theme.roles.accentInfo || foreground),
    cyan: terminalColor(colors, 'terminal.ansiCyan', theme.roles.accentPrimary || foreground),
    green: terminalColor(colors, 'terminal.ansiGreen', theme.roles.accentSuccess || foreground),
    purple: terminalColor(colors, 'terminal.ansiMagenta', theme.roles.accentPrimaryAlt || theme.roles.accentPrimary || foreground),
    red: terminalColor(colors, 'terminal.ansiRed', theme.roles.accentError || foreground),
    white: terminalColor(colors, 'terminal.ansiWhite', theme.roles.textSecondary || foreground),
    yellow: terminalColor(colors, 'terminal.ansiYellow', theme.roles.accentWarn || foreground),
    brightBlack: terminalColor(colors, 'terminal.ansiBrightBlack', theme.roles.textMuted || foreground),
    brightBlue: terminalColor(colors, 'terminal.ansiBrightBlue', theme.roles.accentInfo || foreground),
    brightCyan: terminalColor(colors, 'terminal.ansiBrightCyan', theme.roles.accentPrimaryAlt || theme.roles.accentPrimary || foreground),
    brightGreen: terminalColor(colors, 'terminal.ansiBrightGreen', theme.roles.accentSuccess || foreground),
    brightPurple: terminalColor(colors, 'terminal.ansiBrightMagenta', theme.roles.accentPrimaryAlt || theme.roles.accentPrimary || foreground),
    brightRed: terminalColor(colors, 'terminal.ansiBrightRed', theme.roles.accentError || foreground),
    brightWhite: terminalColor(colors, 'terminal.ansiBrightWhite', theme.roles.textPrimary || foreground),
    brightYellow: terminalColor(colors, 'terminal.ansiBrightYellow', theme.roles.accentWarn || foreground)
  });
}

function buildWindowsTerminalSchemeFromLegacy(themeJson, themeId) {
  const colors = themeJson?.colors || {};
  const foreground = terminalColor(colors, 'terminal.foreground', colors['editor.foreground'] || '#F0F0F0');
  const background = terminalColor(colors, 'terminal.background', colors['editor.background'] || '#000000');

  return applyPreset(themeId, themeJson?.name || themeId, {
    cursorColor: terminalColor(colors, 'terminalCursor.foreground', colors['editorCursor.foreground'] || foreground),
    selectionBackground: terminalColor(
      colors,
      'terminal.selectionBackground',
      colors['editor.selectionBackground'] || colors['list.activeSelectionBackground'] || foreground
    ),
    background,
    foreground,
    black: terminalColor(colors, 'terminal.ansiBlack', background),
    blue: terminalColor(colors, 'terminal.ansiBlue', colors['badge.background'] || foreground),
    cyan: terminalColor(colors, 'terminal.ansiCyan', colors['textLink.foreground'] || foreground),
    green: terminalColor(colors, 'terminal.ansiGreen', colors['gitDecoration.addedResourceForeground'] || foreground),
    purple: terminalColor(colors, 'terminal.ansiMagenta', colors['editor.findMatchBackground'] || foreground),
    red: terminalColor(colors, 'terminal.ansiRed', colors['errorForeground'] || colors['editorError.foreground'] || foreground),
    white: terminalColor(colors, 'terminal.ansiWhite', colors['editor.foreground'] || foreground),
    yellow: terminalColor(colors, 'terminal.ansiYellow', colors['editorWarning.foreground'] || foreground),
    brightBlack: terminalColor(colors, 'terminal.ansiBrightBlack', colors['descriptionForeground'] || foreground),
    brightBlue: terminalColor(colors, 'terminal.ansiBrightBlue', colors['button.background'] || foreground),
    brightCyan: terminalColor(colors, 'terminal.ansiBrightCyan', colors['textLink.activeForeground'] || foreground),
    brightGreen: terminalColor(colors, 'terminal.ansiBrightGreen', colors['gitDecoration.untrackedResourceForeground'] || foreground),
    brightPurple: terminalColor(colors, 'terminal.ansiBrightMagenta', colors['focusBorder'] || foreground),
    brightRed: terminalColor(colors, 'terminal.ansiBrightRed', colors['notificationsErrorIcon.foreground'] || foreground),
    brightWhite: terminalColor(colors, 'terminal.ansiBrightWhite', colors['editor.foreground'] || foreground),
    brightYellow: terminalColor(colors, 'terminal.ansiBrightYellow', colors['notificationsWarningIcon.foreground'] || foreground)
  });
}

function loadLegacyTheme(pathFromPack) {
  const filePath = path.resolve(pathFromPack);
  const raw = fs.readFileSync(filePath, 'utf8');
  return parseJsonc(raw);
}

function createPackMembership() {
  const membership = new Map();
  for (const pack of themePacks) {
    for (const theme of pack.themes || []) {
      const entries = membership.get(theme.id) || [];
      entries.push({
        id: pack.id,
        label: pack.label,
        description: pack.description || '',
        path: theme.path
      });
      membership.set(theme.id, entries);
    }
  }
  return membership;
}

function createThemeRecords() {
  const sourceIds = new Set(themes.map((theme) => theme.id));
  const packMembership = createPackMembership();
  const records = [];

  for (const theme of themes) {
    const terminal = buildWindowsTerminalSchemeFromSource(theme);
    records.push({
      id: theme.id,
      name: terminal.name,
      vscodeName: theme.name,
      description: terminal.description || '',
      source: 'source',
      packs: packMembership.get(theme.id) || [],
      scheme: terminal.scheme
    });
  }

  const seenIds = new Set(records.map((record) => record.id));
  for (const pack of themePacks) {
    for (const theme of pack.themes || []) {
      if (sourceIds.has(theme.id) || seenIds.has(theme.id)) {
        continue;
      }
      if (!theme.path) {
        continue;
      }
      const legacyTheme = loadLegacyTheme(theme.path);
      const terminal = buildWindowsTerminalSchemeFromLegacy(legacyTheme, theme.id);
      records.push({
        id: theme.id,
        name: terminal.name,
        vscodeName: legacyTheme?.name || theme.label || theme.id,
        description: terminal.description || '',
        source: 'legacy',
        packs: packMembership.get(theme.id) || [],
        scheme: terminal.scheme
      });
      seenIds.add(theme.id);
    }
  }

  return { records, packMembership };
}

function buildThemeIndex(records, availableIds) {
  return {
    themes: records.map((record) => ({
      id: record.id,
      name: record.name,
      vscodeName: record.vscodeName || record.name,
      description: record.description || '',
      source: record.source,
      packIds: record.packs.map((pack) => pack.id),
      packLabels: record.packs.map((pack) => pack.label)
    })),
    packs: themePacks
      .map((pack) => {
        const themeIds = (pack.themes || []).map((theme) => theme.id);
        const availableThemeIds = themeIds.filter((id) => availableIds.has(id));
        return {
          id: pack.id,
          label: pack.label,
          description: pack.description || '',
          themeIds,
          availableThemeIds
        };
      })
      .filter((pack) => pack.availableThemeIds.length > 0)
  };
}

function build() {
  fs.mkdirSync(outDir, { recursive: true });
  const { records } = createThemeRecords();
  const activeRecords = requestedSet.size
    ? records.filter((record) => requestedSet.has(record.id))
    : records;

  if (requestedSet.size && activeRecords.length === 0) {
    console.error('No matching themes for ids:', [...requestedSet].join(', '));
    process.exit(1);
  }

  const missing = requestedIds.filter((id) => !records.find((record) => record.id === id));
  if (missing.length) {
    console.warn('Missing theme definitions for:', missing.join(', '));
  }

  const schemes = activeRecords.map((record) => record.scheme);
  const index = buildThemeIndex(activeRecords, new Set(activeRecords.map((record) => record.id)));
  const schemesPath = path.join(outDir, 'xela-windows-terminal-schemes.json');
  const fragmentPath = path.join(outDir, 'xela-windows-terminal-settings.fragment.json');
  const indexPath = path.join(outDir, 'xela-windows-terminal-index.json');

  fs.writeFileSync(schemesPath, `${JSON.stringify(schemes, null, 2)}\n`);
  fs.writeFileSync(fragmentPath, `${JSON.stringify({ schemes }, null, 2)}\n`);
  fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);

  console.log(`Generated ${schemes.length} Windows Terminal schemes in ${outDir}`);
}

build();
