#!/usr/bin/env node
import fs from 'fs';
import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline';
import {
  applyWindowsTerminalTheme,
  loadWindowsTerminalSchemes,
  loadWindowsTerminalThemeIndex,
  readWindowsTerminalSettingsFile,
  resolveEffectiveWindowsTerminalSchemeName,
  resolveWindowsTerminalSettingsPath,
  writeWindowsTerminalSettings
} from './windows-terminal-utils.mjs';

const settingsPath = resolveWindowsTerminalSettingsPath(null);
if (!settingsPath) {
  console.error('Windows Terminal settings.json was not found. Use the non-interactive installer with --settings <path>.');
  process.exit(1);
}

if (!process.stdin.isTTY || !process.stdout.isTTY) {
  console.error('The xela-themes TUI requires an interactive terminal.');
  process.exit(1);
}

const { raw: originalRaw, settings: originalSettings } = readWindowsTerminalSettingsFile(settingsPath);
const schemes = loadWindowsTerminalSchemes();
const themeIndex = loadWindowsTerminalThemeIndex();
const themes = Array.isArray(themeIndex?.themes)
  ? themeIndex.themes
  : schemes.map((scheme) => ({ id: scheme.name, name: scheme.name, packIds: [], packLabels: [] }));
const themesById = new Map(themes.map((theme) => [theme.id, theme]));
const schemesByName = new Map(schemes.map((scheme) => [scheme.name, scheme]));
const schemeNames = new Set(schemes.map((scheme) => scheme.name));
const ANSI_PATTERN = /\x1b\[[0-9;]*m/g;
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const UNDERLINE = '\x1b[4m';

function buildPacks() {
  const packs = [{
    id: 'all',
    label: 'All Themes',
    description: 'Browse every installable XELA Windows Terminal theme.',
    availableThemeIds: themes.map((theme) => theme.id)
  }];

  for (const pack of themeIndex?.packs || []) {
    const availableThemeIds = (pack.availableThemeIds || []).filter((id) => themesById.has(id));
    if (availableThemeIds.length > 0) {
      packs.push({
        id: pack.id,
        label: pack.label,
        description: pack.description || '',
        availableThemeIds
      });
    }
  }

  const packedIds = new Set(
    packs
      .filter((pack) => pack.id !== 'all')
      .flatMap((pack) => pack.availableThemeIds)
  );
  const standaloneThemeIds = themes
    .filter((theme) => !packedIds.has(theme.id))
    .map((theme) => theme.id);

  if (standaloneThemeIds.length > 0) {
    packs.push({
      id: 'standalone',
      label: 'Standalone',
      description: 'Themes not assigned to a named pack.',
      availableThemeIds: standaloneThemeIds
    });
  }

  return packs;
}

const packs = buildPacks();
const currentSchemeName = resolveEffectiveWindowsTerminalSchemeName(originalSettings);
const currentTheme = themes.find((theme) => theme.name === currentSchemeName) || themes[0] || null;
const currentPackId = currentTheme?.packIds?.[0] || 'all';
const currentPackIndex = Math.max(0, packs.findIndex((pack) => pack.id === currentPackId));

let mode = 'packs';
let packFilter = '';
let themeFilter = '';
let selectedPackIndex = currentPackIndex;
let selectedThemeIndex = 0;
const selectedThemeIndexByPack = new Map();
let previewedName = null;
let committed = false;
let renderPending = false;
let restoring = false;
let previewDebounceTimer = null;

function hexToRgb(hex) {
  const clean = String(hex || '#000000').replace(/^#/, '');
  const normalized = clean.length === 3
    ? clean.split('').map((value) => value + value).join('')
    : clean.slice(0, 6);
  const int = Number.parseInt(normalized || '000000', 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  };
}

function ansiFg(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `\x1b[38;2;${r};${g};${b}m`;
}

function ansiBg(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `\x1b[48;2;${r};${g};${b}m`;
}

function stripAnsi(value) {
  return String(value || '').replace(ANSI_PATTERN, '');
}

function padPlain(value, width) {
  const plain = stripAnsi(value);
  if (plain.length >= width) {
    return value;
  }
  return value + ' '.repeat(width - plain.length);
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function bestTextOn(bgHex, lightHex, darkHex) {
  return luminance(bgHex) > 0.45 ? darkHex : lightHex;
}

function mixHex(a, b, amount) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return `#${[[ca.r, cb.r], [ca.g, cb.g], [ca.b, cb.b]]
    .map(([av, bv]) => Math.max(0, Math.min(255, Math.round(av + (bv - av) * amount))).toString(16).padStart(2, '0')).join('')}`;
}

function token(text, fgHex, bgHex = null, prefix = '') {
  const fg = fgHex ? ansiFg(fgHex) : '';
  const bg = bgHex ? ansiBg(bgHex) : '';
  return `${prefix}${fg}${bg}${text}${RESET}`;
}

function panelLine(content, width, scheme, fgOverride = scheme.foreground, bgOverride = scheme.background) {
  const safeWidth = Math.max(8, width);
  const plain = stripAnsi(content);
  const padded = plain.length < safeWidth - 2
    ? content + ' '.repeat(safeWidth - 2 - plain.length)
    : content;
  return `${ansiBg(bgOverride)}${ansiFg(fgOverride)} ${padded} ${RESET}`;
}

function renderPaletteRow(labels, colors, width, scheme) {
  const chips = labels.map((label) => {
    const color = colors[label];
    const textColor = bestTextOn(color, scheme.brightWhite, scheme.black);
    return token(` ${label} `, textColor, color, BOLD);
  });
  return panelLine(chips.join(' '), width, scheme);
}

function renderPreviewPanel(previewScheme, width) {
  if (!previewScheme) {
    return ['No scheme selected.'];
  }

  const isDark = luminance(previewScheme.background) <= 0.45;
  const accent = previewScheme.cursorColor || previewScheme.blue || '#5555ff';
  const accentDim  = mixHex(accent, previewScheme.background, isDark ? 0.55 : 0.42);
  const accentFade = mixHex(accent, previewScheme.background, isDark ? 0.80 : 0.76);
  const frameColor = isDark
    ? mixHex(previewScheme.background, '#000000', 0.45)
    : mixHex(previewScheme.background, '#888888', 0.35);
  const sepColor = mixHex(accent, frameColor, isDark ? 0.38 : 0.28);
  const frameFg = isDark ? '#888899' : '#999999';
  const fc = `${ansiBg(frameColor)}${ansiFg(frameFg)}`;

  const widthHint  = Math.max(48, width);
  const innerWidth = widthHint - 2;

  function frameTop()    { return `${fc}╔${'═'.repeat(innerWidth)}╗${RESET}`; }
  function frameBottom() { return `${fc}╚${'═'.repeat(innerWidth)}╝${RESET}`; }
  function sepLine()     {
    return `${fc}│${ansiBg(frameColor)}${ansiFg(sepColor)}${'─'.repeat(innerWidth)}${RESET}${fc}│${RESET}`;
  }
  function framedRow(contentLine) {
    return `${fc}│${RESET}${contentLine}${fc}│${RESET}`;
  }

  // Title bar: accentDim ▸ accent (name + mode badge) ▸ accentFade (controls)
  const titleFg  = bestTextOn(accent,     previewScheme.brightWhite || '#ffffff', previewScheme.black || '#000000');
  const dimFg    = bestTextOn(accentDim,  previewScheme.brightWhite || '#ffffff', previewScheme.black || '#000000');
  const fadeFg   = bestTextOn(accentFade, previewScheme.brightWhite || '#ffffff', previewScheme.black || '#000000');
  const modeBadge   = isDark ? ' ◐ dark ' : ' ◑ light ';
  const leftPlain   = ` XELA `;
  const centerPlain = ` ${previewScheme.name} ${modeBadge}`;
  const ctrlPlain   = ` _ □ × `;
  const fillLen = Math.max(0, innerWidth - leftPlain.length - centerPlain.length - ctrlPlain.length);
  const leftPart   = `${ansiBg(accentDim)}${ansiFg(dimFg)}${BOLD}${leftPlain}${RESET}`;
  const centerPart = `${ansiBg(accent)}${ansiFg(titleFg)}${BOLD}${centerPlain}${RESET}`;
  const rightPart  = `${ansiBg(accentFade)}${ansiFg(fadeFg)}${' '.repeat(fillLen)}${ctrlPlain}${RESET}`;
  const titleLine  = `${fc}│${RESET}${leftPart}${centerPart}${rightPart}${fc}│${RESET}`;

  // Neumorphic status bar
  const btnBg = isDark
    ? mixHex(previewScheme.background, previewScheme.brightBlack || '#333333', 0.4)
    : mixHex(previewScheme.background, '#cccccc', 0.3);
  const btnFg      = bestTextOn(btnBg, previewScheme.brightWhite || '#ffffff', previewScheme.black || '#000000');
  const lightEdge  = isDark ? mixHex(btnBg, previewScheme.brightWhite || '#ffffff', 0.45) : '#ffffff';
  const shadowEdge = isDark ? mixHex(btnBg, previewScheme.black || '#000000', 0.50) : mixHex(btnBg, '#444444', 0.40);
  const statusBg   = isDark
    ? mixHex(previewScheme.background, previewScheme.brightBlack || '#333333', 0.25)
    : mixHex(previewScheme.background, '#cccccc', 0.2);
  const statusFg   = previewScheme.brightBlack || (isDark ? '#888888' : '#666666');

  function nmBtn(label) {
    return `${ansiFg(lightEdge)}${ansiBg(btnBg)}▐${BOLD}${ansiFg(btnFg)} ${label} ${RESET}${ansiFg(shadowEdge)}${ansiBg(btnBg)}▌${RESET}`;
  }

  const statusContent = panelLine(
    `${nmBtn('Terminal')}  ${nmBtn('Cursor')}  ${nmBtn('Selection')}`,
    innerWidth,
    previewScheme,
    statusFg,
    statusBg
  );

  const selectionText = bestTextOn(previewScheme.selectionBackground, previewScheme.brightWhite, previewScheme.black);
  const cursorText    = bestTextOn(previewScheme.cursorColor, previewScheme.brightWhite, previewScheme.black);

  const contentLines = [
    panelLine(
      `${BOLD}${previewScheme.name}${RESET}  ` +
      token(' CURSOR ', cursorText, previewScheme.cursorColor, BOLD) + ' ' +
      token(' SELECT ', selectionText, previewScheme.selectionBackground, BOLD),
      innerWidth,
      previewScheme
    ),
    renderPaletteRow(
      ['blk', 'red', 'grn', 'ylw', 'blu', 'mag', 'cyn', 'wht'],
      {
        blk: previewScheme.black,
        red: previewScheme.red,
        grn: previewScheme.green,
        ylw: previewScheme.yellow,
        blu: previewScheme.blue,
        mag: previewScheme.purple,
        cyn: previewScheme.cyan,
        wht: previewScheme.white
      },
      innerWidth,
      previewScheme
    ),
    renderPaletteRow(
      ['BRK', 'RED', 'GRN', 'YLW', 'BLU', 'MAG', 'CYN', 'WHT'],
      {
        BRK: previewScheme.brightBlack,
        RED: previewScheme.brightRed,
        GRN: previewScheme.brightGreen,
        YLW: previewScheme.brightYellow,
        BLU: previewScheme.brightBlue,
        MAG: previewScheme.brightPurple,
        CYN: previewScheme.brightCyan,
        WHT: previewScheme.brightWhite
      },
      innerWidth,
      previewScheme
    ),
    panelLine(
      token('alexf@xela', previewScheme.green, null, BOLD) + ':' +
      token('~/projects/xela-themes', previewScheme.blue) + ' ' +
      token('main', previewScheme.purple, null, BOLD) + ' ' +
      token('±2', previewScheme.yellow) + ' ' +
      token('>', previewScheme.cyan, null, BOLD) + ' ' +
      token('npm run build:windows-terminal', previewScheme.foreground),
      innerWidth,
      previewScheme
    ),
    panelLine(
      token('Directories', previewScheme.blue, null, BOLD) + '  ' +
      token('Scripts', previewScheme.green, null, BOLD) + '  ' +
      token('Archive.zip', previewScheme.yellow) + '  ' +
      token('README.md', previewScheme.foreground) + '  ' +
      token('error.log', previewScheme.red),
      innerWidth,
      previewScheme
    ),
    panelLine(
      token('git status', previewScheme.brightBlack, null, DIM) + '  ' +
      token('M', previewScheme.yellow, null, BOLD) + ' package.json  ' +
      token('A', previewScheme.green, null, BOLD) + ' exports/windows-terminal/...  ' +
      token('??', previewScheme.cyan, null, BOLD) + ' nostalgia-pack.json',
      innerWidth,
      previewScheme
    ),
    panelLine(
      token('+ added theme metadata', previewScheme.green) + '  ' +
      token('~ updated selector preview', previewScheme.yellow) + '  ' +
      token('- old flat list only', previewScheme.red),
      innerWidth,
      previewScheme
    ),
    panelLine(
      token('INFO', previewScheme.black, previewScheme.cyan, BOLD) + ' schemes regenerated  ' +
      token('WARN', bestTextOn(previewScheme.yellow, previewScheme.black, previewScheme.brightWhite), previewScheme.yellow, BOLD) + ' low contrast alias  ' +
      token('ERR', bestTextOn(previewScheme.red, previewScheme.brightWhite, previewScheme.black), previewScheme.red, BOLD) + ' parse failure',
      innerWidth,
      previewScheme
    ),
    panelLine(
      token('Transfer', previewScheme.brightWhite, null, BOLD) + ' [' +
      token('##########', previewScheme.black, previewScheme.green) +
      token('###', previewScheme.black, previewScheme.yellow) +
      token('.....', previewScheme.brightBlack, previewScheme.black) +
      '] 68%',
      innerWidth,
      previewScheme
    ),
    panelLine(
      token(' PID ', previewScheme.black, previewScheme.brightBlack, BOLD) + ' ' +
      token(' NAME ', previewScheme.black, previewScheme.brightBlue, BOLD) + ' ' +
      token(' STATE ', previewScheme.black, previewScheme.selectionBackground, BOLD) + ' ' +
      token(' RSS ', previewScheme.black, previewScheme.brightPurple, BOLD),
      innerWidth,
      previewScheme
    ),
    panelLine(
      token(' 8421 ', previewScheme.brightBlack) + ' ' +
      token(' xela-themes ', previewScheme.brightWhite, previewScheme.selectionBackground, BOLD) + ' ' +
      token(' selected ', selectionText, previewScheme.selectionBackground, BOLD) + ' ' +
      token(' 48 MB ', previewScheme.purple),
      innerWidth,
      previewScheme
    ),
    panelLine(
      token('themes/xela-monterey-color-theme.json', previewScheme.cyan, null, UNDERLINE) + ':' +
      token('12', previewScheme.yellow, null, BOLD) + ' ' +
      token('"XELA Monterey — Big Sur Evolution"', previewScheme.foreground),
      innerWidth,
      previewScheme
    )
  ];

  return [
    frameTop(),
    titleLine,
    sepLine(),
    ...contentLines.map(framedRow),
    framedRow(statusContent),
    frameBottom()
  ];
}

function filteredPacks() {
  const query = packFilter.trim().toLowerCase();
  if (!query) {
    return packs;
  }
  return packs.filter((pack) => {
    const haystacks = [
      pack.label,
      pack.description,
      ...pack.availableThemeIds.map((id) => themesById.get(id)?.name || '')
    ];
    return haystacks.some((value) => String(value).toLowerCase().includes(query));
  });
}

function themesForPack(pack, queryOverride = themeFilter) {
  if (!pack) {
    return [];
  }
  const query = queryOverride.trim().toLowerCase();
  const packThemes = pack.availableThemeIds
    .map((id) => themesById.get(id))
    .filter((theme) => theme && schemeNames.has(theme.name));

  if (!query) {
    return packThemes;
  }

  return packThemes.filter((theme) => theme.name.toLowerCase().includes(query));
}

function syncSelections() {
  const activePacks = filteredPacks();
  if (activePacks.length === 0) {
    selectedPackIndex = 0;
    selectedThemeIndex = 0;
    return { activePacks, currentPack: null, activeThemes: [] };
  }

  selectedPackIndex = Math.max(0, Math.min(selectedPackIndex, activePacks.length - 1));
  const currentPack = activePacks[selectedPackIndex];
  const activeThemes = mode === 'packs'
    ? themesForPack(currentPack, '')
    : themesForPack(currentPack, themeFilter);
  const storedThemeIndex = selectedThemeIndexByPack.get(currentPack.id) ?? selectedThemeIndex;
  selectedThemeIndex = activeThemes.length === 0
    ? 0
    : Math.max(0, Math.min(storedThemeIndex, activeThemes.length - 1));
  selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);

  return { activePacks, currentPack, activeThemes };
}

function currentPreviewTheme() {
  const { currentPack, activeThemes } = syncSelections();
  if (!currentPack || activeThemes.length === 0) {
    return null;
  }
  return activeThemes[selectedThemeIndex] || activeThemes[0] || null;
}

function initializeSelections() {
  const allThemesPackIndex = Math.max(0, packs.findIndex((pack) => pack.id === 'all'));
  const currentThemeIndexInAll = Math.max(0, themes.findIndex((theme) => theme.name === currentSchemeName));
  selectedThemeIndexByPack.set('all', currentThemeIndexInAll);

  if (currentTheme) {
    for (const packId of currentTheme.packIds || []) {
      const pack = packs.find((entry) => entry.id === packId);
      if (!pack) {
        continue;
      }
      const packThemes = themesForPack(pack);
      const index = Math.max(0, packThemes.findIndex((theme) => theme.id === currentTheme.id));
      selectedThemeIndexByPack.set(pack.id, index);
    }
  }

  if (!selectedThemeIndexByPack.has(currentPackId)) {
    selectedThemeIndexByPack.set(currentPackId, 0);
  }
  if (!selectedThemeIndexByPack.has('all')) {
    selectedThemeIndexByPack.set('all', currentThemeIndexInAll);
  }
  selectedPackIndex = packs[currentPackIndex] ? currentPackIndex : allThemesPackIndex;
  selectedThemeIndex = selectedThemeIndexByPack.get(packs[selectedPackIndex]?.id) ?? 0;
}

function render() {
  renderPending = false;
  const { activePacks, currentPack, activeThemes } = syncSelections();
  const height = typeof output.rows === 'number' ? output.rows : 24;
  const previewTheme = currentPreviewTheme();
  const previewScheme = previewTheme ? schemesByName.get(previewTheme.name) : null;
  const previewLines = renderPreviewPanel(previewScheme, Math.max(48, (output.columns || 100) - 2));
  const headerLines = 8;
  const reservedPreviewLines = Math.min(previewLines.length + 2, Math.max(10, Math.floor(height * 0.5)));
  const listHeight = Math.max(6, height - headerLines - reservedPreviewLines);
  const activeList = mode === 'packs' ? activePacks : activeThemes;
  const selectedListIndex = mode === 'packs' ? selectedPackIndex : selectedThemeIndex;
  const start = Math.max(0, Math.min(selectedListIndex - Math.floor(listHeight / 2), Math.max(0, activeList.length - listHeight)));
  const visible = activeList.slice(start, start + listHeight);
  const activeFilter = mode === 'packs' ? packFilter : themeFilter;

  const out = [
    '\x1B[2J\x1B[H',
    'XELA Themes\n',
    `Windows Terminal: ${settingsPath}\n`,
    `View: ${mode === 'packs' ? 'Packs' : 'Themes'}\n`,
    `Pack: ${currentPack?.label || '(none)'}\n`,
    `Preview: ${previewTheme?.name || '(none)'}\n`,
  ];
  if (previewTheme?.description) {
    out.push(`About: ${previewTheme.description}\n`);
  }
  if (previewTheme?.vscodeName && previewTheme.vscodeName !== previewTheme.name) {
    out.push(`Origin: ${previewTheme.vscodeName}\n`);
  }
  out.push(`Filter: ${activeFilter || '(none)'}\n`);
  out.push('Up/Down = live preview, Tab/Left/Right = switch pack/theme, Type = filter, Enter = apply, Esc/Ctrl+C = cancel\n\n');

  if (activeList.length === 0) {
    out.push(mode === 'packs'
      ? 'No packs match the current filter.\n'
      : 'No themes match the current pack filter.\n');
    output.write(out.join(''));
    return;
  }

  out.push(`Showing ${start + 1}-${start + visible.length} of ${activeList.length}\n\n`);
  for (let i = 0; i < visible.length; i++) {
    const entry = visible[i];
    const absoluteIndex = start + i;
    const marker = absoluteIndex === selectedListIndex ? '> ' : '  ';
    out.push(mode === 'packs'
      ? `${marker}${entry.label} (${entry.availableThemeIds.length})\n`
      : `${marker}${entry.name}\n`);
  }

  out.push('\nTerminal Preview\n\n');
  for (const line of previewLines) {
    out.push(`${line}\n`);
  }
  output.write(out.join(''));
}

function scheduleRender() {
  if (!renderPending) {
    renderPending = true;
    setImmediate(render);
  }
}

function buildPreviewSettings(schemeName) {
  const working = JSON.parse(JSON.stringify(originalSettings));
  applyWindowsTerminalTheme(working, {
    xelaSchemes: schemes,
    schemeName,
    allProfiles: true
  });
  return working;
}

function previewCurrentSelection() {
  if (previewDebounceTimer) clearTimeout(previewDebounceTimer);
  previewDebounceTimer = setTimeout(() => {
    previewDebounceTimer = null;
    const current = currentPreviewTheme();
    if (!current || current.name === previewedName) return;
    previewedName = current.name;
    const working = buildPreviewSettings(current.name);
    writeWindowsTerminalSettings(settingsPath, working, { backup: false });
    scheduleRender();
  }, 80);
}

function restoreOriginal() {
  if (restoring) {
    return;
  }
  restoring = true;
  fs.writeFileSync(settingsPath, originalRaw, 'utf8');
}

async function commitSelection() {
  const current = currentPreviewTheme();
  if (!current) {
    return;
  }
  committed = true;
  const working = buildPreviewSettings(current.name);
  const backupPath = writeWindowsTerminalSettings(settingsPath, working, {
    backup: true,
    backupContent: originalRaw
  });
  cleanup();
  output.write(`Applied ${current.name}\n`);
  if (backupPath) {
    output.write(`Backup created at ${backupPath}\n`);
  }
  process.exit(0);
}

function cancelSelection() {
  restoreOriginal();
  cleanup();
  output.write('Restored original Windows Terminal settings.\n');
  process.exit(0);
}

function cleanup() {
  input.removeListener('keypress', onKeypress);
  if (input.isTTY) {
    input.setRawMode(false);
  }
  input.pause();
}

function onKeypress(_, key = {}) {
  const { activePacks, currentPack, activeThemes } = syncSelections();
  const activeList = mode === 'packs' ? activePacks : activeThemes;

  if (key.ctrl && key.name === 'c') {
    cancelSelection();
    return;
  }

  if (key.name === 'escape') {
    cancelSelection();
    return;
  }

  if (key.name === 'return') {
    void commitSelection();
    return;
  }

  if (key.name === 'tab' || key.name === 'right') {
    if (mode === 'packs' && currentPack) {
      mode = 'themes';
      selectedThemeIndex = selectedThemeIndexByPack.get(currentPack.id) ?? 0;
      scheduleRender();
      void previewCurrentSelection();
    }
    return;
  }

  if (key.name === 'left') {
    if (mode === 'themes') {
      mode = 'packs';
      scheduleRender();
      void previewCurrentSelection();
    }
    return;
  }

  if (key.name === 'up') {
    if (activeList.length > 0) {
      if (mode === 'packs') {
        selectedPackIndex = selectedPackIndex > 0 ? selectedPackIndex - 1 : activeList.length - 1;
      } else {
        selectedThemeIndex = selectedThemeIndex > 0 ? selectedThemeIndex - 1 : activeList.length - 1;
        if (currentPack) {
          selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
        }
      }
      void previewCurrentSelection();
    }
    return;
  }

  if (key.name === 'down') {
    if (activeList.length > 0) {
      if (mode === 'packs') {
        selectedPackIndex = selectedPackIndex < activeList.length - 1 ? selectedPackIndex + 1 : 0;
      } else {
        selectedThemeIndex = selectedThemeIndex < activeList.length - 1 ? selectedThemeIndex + 1 : 0;
        if (currentPack) {
          selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
        }
      }
      void previewCurrentSelection();
    }
    return;
  }

  if (key.name === 'pageup') {
    if (mode === 'packs') {
      selectedPackIndex = Math.max(0, selectedPackIndex - 10);
    } else {
      selectedThemeIndex = Math.max(0, selectedThemeIndex - 10);
      if (currentPack) {
        selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
      }
    }
    void previewCurrentSelection();
    return;
  }

  if (key.name === 'pagedown') {
    if (mode === 'packs') {
      selectedPackIndex = Math.min(Math.max(0, activeList.length - 1), selectedPackIndex + 10);
    } else {
      selectedThemeIndex = Math.min(Math.max(0, activeList.length - 1), selectedThemeIndex + 10);
      if (currentPack) {
        selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
      }
    }
    void previewCurrentSelection();
    return;
  }

  if (key.name === 'home') {
    if (mode === 'packs') {
      selectedPackIndex = 0;
    } else {
      selectedThemeIndex = 0;
      if (currentPack) {
        selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
      }
    }
    void previewCurrentSelection();
    return;
  }

  if (key.name === 'end') {
    if (mode === 'packs') {
      selectedPackIndex = Math.max(0, activeList.length - 1);
    } else {
      selectedThemeIndex = Math.max(0, activeList.length - 1);
      if (currentPack) {
        selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
      }
    }
    void previewCurrentSelection();
    return;
  }

  if (key.name === 'backspace') {
    if (mode === 'packs' && packFilter.length > 0) {
      packFilter = packFilter.slice(0, -1);
      selectedPackIndex = 0;
      previewedName = null;
      scheduleRender();
      void previewCurrentSelection();
    } else if (mode === 'themes' && themeFilter.length > 0) {
      themeFilter = themeFilter.slice(0, -1);
      selectedThemeIndex = 0;
      if (currentPack) {
        selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
      }
      previewedName = null;
      scheduleRender();
      void previewCurrentSelection();
    }
    return;
  }

  if (key.ctrl && key.name === 'u') {
    if (mode === 'packs') {
      packFilter = '';
      selectedPackIndex = 0;
    } else {
      themeFilter = '';
      selectedThemeIndex = 0;
      if (currentPack) {
        selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
      }
    }
    previewedName = null;
    scheduleRender();
    void previewCurrentSelection();
    return;
  }

  if (typeof key.sequence === 'string' && key.sequence.length === 1 && !key.ctrl && !key.meta) {
    const code = key.sequence.charCodeAt(0);
    if (code >= 32 && code !== 127) {
      if (mode === 'packs') {
        packFilter += key.sequence;
        selectedPackIndex = 0;
      } else {
        themeFilter += key.sequence;
        selectedThemeIndex = 0;
        if (currentPack) {
          selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
        }
      }
      previewedName = null;
      scheduleRender();
      void previewCurrentSelection();
    }
  }
}

initializeSelections();
readline.emitKeypressEvents(input);
input.setRawMode(true);
input.resume();
input.on('keypress', onKeypress);

process.on('uncaughtException', (error) => {
  if (!committed) {
    restoreOriginal();
  }
  cleanup();
  console.error(error);
  process.exit(1);
});

process.on('SIGINT', () => {
  if (!committed) {
    restoreOriginal();
  }
  cleanup();
  process.exit(1);
});

render();
void previewCurrentSelection();
