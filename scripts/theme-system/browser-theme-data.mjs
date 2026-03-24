import fs from 'fs';
import path from 'path';
import { buildCompleteColors } from './color-mapping.js';
import { getLuminance } from './roles.js';
import { themes } from './theme-config.mjs';
import { loadThemePacks, parseJsonc } from './windows-terminal-utils.mjs';

const themePacks = loadThemePacks();

function toCssColor(value, fallback = '#000000') {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return fallback.toUpperCase();
  if (/^(rgb|rgba|hsl|hsla)\(/i.test(raw)) return raw;

  const clean = raw.replace(/^#/, '').replace(/[^0-9a-fA-F]/g, '');
  if (clean.length === 3 || clean.length === 4) {
    return `#${clean.split('').map((char) => char + char).join('').toUpperCase()}`;
  }
  if (clean.length === 6 || clean.length === 8) {
    return `#${clean.toUpperCase()}`;
  }

  return fallback.toUpperCase();
}

function inferModeFromBackground(background) {
  return getLuminance(toCssColor(background, '#000000').slice(0, 7)) > 0.45 ? 'light' : 'dark';
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
        path: theme.path || null
      });
      membership.set(theme.id, entries);
    }
  }
  return membership;
}

function buildSourceThemeRecord(theme, packs) {
  const colors = buildCompleteColors(theme.roles, theme.colorOverrides || {});
  const buttonBg = toCssColor(colors['button.background'], theme.roles.accentPrimary);
  const background = toCssColor(theme.roles.surface0);
  const bgAlt = toCssColor(theme.roles.surface1 || background);
  const bgElevated = toCssColor(theme.roles.surface2 || bgAlt);
  const bgFloating = toCssColor(theme.roles.surface3 || bgElevated);

  return {
    id: theme.id,
    name: theme.name,
    type: theme.type || inferModeFromBackground(background),
    source: 'source',
    packIds: packs.map((pack) => pack.id),
    packLabels: packs.map((pack) => pack.label),
    palette: {
      bg: background,
      bgAlt,
      bgElevated,
      bgFloating,
      panel: toCssColor(theme.roles.panel || bgAlt, bgAlt),
      overlay: toCssColor(theme.roles.overlay || bgFloating, bgFloating),
      text: toCssColor(theme.roles.textPrimary, theme.roles.textSecondary || '#FFFFFF'),
      textSoft: toCssColor(theme.roles.textSecondary || theme.roles.textPrimary, theme.roles.textPrimary),
      textMuted: toCssColor(theme.roles.textMuted || theme.roles.textSecondary, theme.roles.textSecondary || theme.roles.textPrimary),
      textInverse: toCssColor(theme.roles.textInverted || '#000000', '#000000'),
      border: toCssColor(theme.roles.border || colors['input.border'], colors['input.border'] || bgElevated),
      focus: toCssColor(theme.roles.focus || colors.focusBorder, theme.roles.accentPrimary),
      accent: toCssColor(theme.roles.accentPrimary, buttonBg),
      accentAlt: toCssColor(theme.roles.accentPrimaryAlt || theme.roles.accentPrimary, theme.roles.accentPrimary),
      link: toCssColor(theme.roles.accentLink || theme.roles.accentPrimary, theme.roles.accentPrimary),
      selection: toCssColor(theme.roles.accentSelection || colors['editor.selectionBackground'], colors['editor.selectionBackground'] || theme.roles.accentPrimary),
      buttonBg,
      buttonFg: toCssColor(colors['button.foreground'], theme.roles.textInverted || theme.roles.textPrimary),
      inputBg: toCssColor(colors['input.background'], bgElevated),
      inputFg: toCssColor(colors['input.foreground'], theme.roles.textPrimary),
      inputBorder: toCssColor(colors['input.border'], theme.roles.border || bgFloating),
      codeBg: toCssColor(colors['textCodeBlock.background'], bgElevated),
      success: toCssColor(theme.roles.accentSuccess, colors['gitDecoration.addedResourceForeground'] || theme.roles.accentSuccess),
      warning: toCssColor(theme.roles.accentWarn, colors['editorWarning.foreground'] || theme.roles.accentWarn),
      error: toCssColor(theme.roles.accentError, colors['editorError.foreground'] || theme.roles.accentError),
      info: toCssColor(theme.roles.accentInfo, theme.roles.accentPrimaryAlt || theme.roles.accentPrimary)
    }
  };
}

function buildLegacyThemeRecord(themeId, themeJson, packs) {
  const colors = themeJson?.colors || {};
  const background = toCssColor(colors['editor.background'] || colors['terminal.background'], '#111111');
  const bgAlt = toCssColor(colors['sideBar.background'] || colors['panel.background'] || colors['activityBar.background'], background);
  const bgElevated = toCssColor(colors['editorWidget.background'] || colors['menu.background'] || colors['quickInput.background'], bgAlt);
  const bgFloating = toCssColor(colors['peekViewEditor.background'] || colors['notifications.background'] || colors['menu.background'], bgElevated);
  const accent = toCssColor(
    colors['button.background'] ||
    colors['activityBarBadge.background'] ||
    colors['badge.background'] ||
    colors['textLink.foreground'],
    colors['terminal.ansiCyan'] || '#4C9AFF'
  );

  return {
    id: themeId,
    name: themeJson?.name || themeId,
    type: themeJson?.type || inferModeFromBackground(background),
    source: 'legacy',
    packIds: packs.map((pack) => pack.id),
    packLabels: packs.map((pack) => pack.label),
    palette: {
      bg: background,
      bgAlt,
      bgElevated,
      bgFloating,
      panel: toCssColor(colors['panel.background'] || colors['sideBar.background'], bgAlt),
      overlay: toCssColor(colors['quickInput.background'] || colors['notifications.background'], bgFloating),
      text: toCssColor(colors['editor.foreground'] || colors.foreground, '#F5F5F5'),
      textSoft: toCssColor(colors['sideBar.foreground'] || colors['list.activeSelectionForeground'] || colors['editor.foreground'], '#DDDDDD'),
      textMuted: toCssColor(colors.descriptionForeground || colors['list.inactiveSelectionForeground'] || colors['editorLineNumber.foreground'], '#A0A0A0'),
      textInverse: toCssColor(colors['button.foreground'] || '#000000', '#000000'),
      border: toCssColor(colors['input.border'] || colors['editorWidget.border'] || colors['panel.border'] || colors.focusBorder, '#3A3A3A'),
      focus: toCssColor(colors.focusBorder || accent, accent),
      accent,
      accentAlt: toCssColor(colors['textLink.activeForeground'] || colors['button.hoverBackground'] || colors['badge.background'], accent),
      link: toCssColor(colors['textLink.foreground'] || accent, accent),
      selection: toCssColor(colors['editor.selectionBackground'] || colors['list.activeSelectionBackground'] || accent, accent),
      buttonBg: toCssColor(colors['button.background'] || accent, accent),
      buttonFg: toCssColor(colors['button.foreground'] || colors['editor.background'] || '#000000', '#000000'),
      inputBg: toCssColor(colors['input.background'] || colors['dropdown.background'] || bgElevated, bgElevated),
      inputFg: toCssColor(colors['input.foreground'] || colors['editor.foreground'], '#F5F5F5'),
      inputBorder: toCssColor(colors['input.border'] || colors['dropdown.border'] || colors.focusBorder, '#3A3A3A'),
      codeBg: toCssColor(colors['textCodeBlock.background'] || colors['editorWidget.background'] || bgElevated, bgElevated),
      success: toCssColor(colors['gitDecoration.addedResourceForeground'] || colors['terminal.ansiGreen'], '#2DA44E'),
      warning: toCssColor(colors['editorWarning.foreground'] || colors['notificationsWarningIcon.foreground'] || colors['terminal.ansiYellow'], '#BF8700'),
      error: toCssColor(colors['editorError.foreground'] || colors['notificationsErrorIcon.foreground'] || colors['terminal.ansiRed'], '#D1242F'),
      info: toCssColor(colors['editorInfo.foreground'] || colors['terminal.ansiBlue'] || accent, '#2F81F7')
    }
  };
}

function loadLegacyTheme(pathFromPack) {
  const raw = fs.readFileSync(path.resolve(pathFromPack), 'utf8');
  return parseJsonc(raw);
}

function buildPackIndex(records) {
  const availableIds = new Set(records.map((record) => record.id));
  return themePacks
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
    .filter((pack) => pack.availableThemeIds.length > 0);
}

export function buildBrowserThemeData() {
  const packMembership = createPackMembership();
  const records = [];
  const sourceIds = new Set(themes.map((theme) => theme.id));

  for (const theme of themes) {
    records.push(buildSourceThemeRecord(theme, packMembership.get(theme.id) || []));
  }

  const seen = new Set(records.map((record) => record.id));
  for (const pack of themePacks) {
    for (const theme of pack.themes || []) {
      if (sourceIds.has(theme.id) || seen.has(theme.id) || !theme.path) {
        continue;
      }

      records.push(buildLegacyThemeRecord(theme.id, loadLegacyTheme(theme.path), packMembership.get(theme.id) || []));
      seen.add(theme.id);
    }
  }

  const themesOut = records.sort((left, right) => left.name.localeCompare(right.name));
  return {
    themes: themesOut,
    packs: buildPackIndex(themesOut)
  };
}
