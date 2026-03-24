#!/usr/bin/env node
import fs from 'fs';
import path from 'node:path';
import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline';
import {
  applyWindowsAccent,
  applyWindowsShell,
  applyWindowsPersonalizationMode,
  launchWindowsThemeFile,
  loadWindowsPersonalizationIndex,
  resolveWindowsPersonalizationTargetRoot
  ,
  writeWindowsThemeFile
} from './windows-personalization-utils.mjs';
import { loadWindowsTerminalSchemes } from './windows-terminal-utils.mjs';

if (!process.stdin.isTTY || !process.stdout.isTTY) {
  console.error('The xela-themes TUI requires an interactive terminal.');
  process.exit(1);
}

const index = loadWindowsPersonalizationIndex();
const themes = Array.isArray(index?.themes) ? index.themes : [];
const schemes = loadWindowsTerminalSchemes();
const schemesByName = new Map(schemes.map((scheme) => [scheme.name, scheme]));
const themesById = new Map(themes.map((theme) => [theme.id, theme]));
const targetRoot = resolveWindowsPersonalizationTargetRoot(null);
const targetThemeDir = path.join(targetRoot, 'themes');
const targetWallpaperDir = path.join(targetRoot, 'wallpapers');

const ANSI_PATTERN = /\x1b\[[0-9;]*m/g;
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const UNDERLINE = '\x1b[4m';

function buildPacks() {
  const labeled = new Map();
  for (const theme of themes) {
    const ids = theme.packIds || [];
    const labels = theme.packLabels || [];
    for (let i = 0; i < ids.length; i++) {
      if (!labeled.has(ids[i])) {
        labeled.set(ids[i], { id: ids[i], label: labels[i] || ids[i], description: '', availableThemeIds: [] });
      }
      labeled.get(ids[i]).availableThemeIds.push(theme.id);
    }
  }

  const packs = [{
    id: 'all',
    label: 'All Themes',
    description: 'Browse every installable XELA Windows personalization theme.',
    availableThemeIds: themes.map((theme) => theme.id)
  }];

  packs.push(...[...labeled.values()].filter((pack) => pack.availableThemeIds.length > 0));

  const packedIds = new Set(packs.filter((pack) => pack.id !== 'all').flatMap((pack) => pack.availableThemeIds));
  const standaloneThemeIds = themes.filter((theme) => !packedIds.has(theme.id)).map((theme) => theme.id);
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
let mode = 'packs';
let packFilter = '';
let themeFilter = '';
let selectedPackIndex = 0;
let selectedThemeIndex = 0;
const selectedThemeIndexByPack = new Map();
let renderPending = false;
let statusMessage = 'Enter opens a pack. Enter on a theme applies it to Windows.';

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
  return `#${[
    [ca.r, cb.r],
    [ca.g, cb.g],
    [ca.b, cb.b]
  ].map(([av, bv]) => Math.max(0, Math.min(255, Math.round(av + (bv - av) * amount))).toString(16).padStart(2, '0')).join('')}`;
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

function renderPreviewPanel(previewTheme, previewScheme, width) {
  if (!previewTheme || !previewScheme) {
    return ['No Windows personalization theme selected.'];
  }

  const w = Math.max(52, width);
  const isDark = luminance(previewScheme.background) <= 0.45;

  // Skeuomorphic / neumorphic color derivation
  const accent      = previewScheme.blue || previewScheme.purple || previewScheme.foreground;
  const accentDim   = mixHex(accent, previewScheme.background, 0.32);
  const accentFade  = mixHex(accent, isDark ? previewScheme.brightWhite : '#FFFFFF', 0.46);
  const frameColor  = mixHex(previewScheme.background, previewScheme.black, isDark ? 0.56 : 0.28);
  const innerBorder = mixHex(accent, previewScheme.background, 0.16);
  const nmSurface   = mixHex(previewScheme.background, isDark ? (previewScheme.white || '#888888') : '#FFFFFF', isDark ? 0.11 : 0.14);
  const frameFg     = mixHex(frameColor, isDark ? '#FFFFFF' : '#000000', 0.45);
  const innerBorderFg = mixHex(innerBorder, isDark ? '#FFFFFF' : '#000000', 0.45);
  const titleFg     = bestTextOn(accent, previewScheme.brightWhite || '#FFFFFF', previewScheme.black);
  const selText     = bestTextOn(previewScheme.selectionBackground, previewScheme.brightWhite, previewScheme.black);

  // Neumorphic raised button: bright left edge ▐ + surface + dark right edge ▌
  function nmBtn(label, bg, textFg) {
    const hi = mixHex(bg, isDark ? (previewScheme.brightWhite || '#FFFFFF') : '#FFFFFF', isDark ? 0.44 : 0.58);
    const sh = mixHex(bg, previewScheme.black, isDark ? 0.40 : 0.22);
    return `${ansiFg(hi)}${ansiBg(bg)}▐${RESET}${ansiBg(bg)}${ansiFg(textFg)}${BOLD} ${label} ${RESET}${ansiFg(sh)}${ansiBg(bg)}▌${RESET}`;
  }

  // Full-width frame line (no panelLine — we control the BG fully)
  function frameLine(leftCh, midCh, rightCh) {
    return `${ansiBg(frameColor)}${ansiFg(frameFg)}${leftCh}${midCh.repeat(w - 2)}${rightCh}${RESET}`;
  }

  // Inner border separator line
  function sepLine() {
    return `${ansiBg(innerBorder)}${ansiFg(innerBorderFg)}${'─'.repeat(w)}${RESET}`;
  }

  // Content row: starts with a frame-colored │ marker, then panelLine fills the rest
  function framedRow(content, bg, fg) {
    const marker = `${ansiBg(frameColor)}${ansiFg(frameFg)}│${RESET}`;
    return marker + panelLine(content, w - 1, previewScheme, fg, bg);
  }

  // Title bar: accentDim sliver → accent (name + mode) → accentFade (spacer + controls)
  const name     = previewTheme.name;
  const badge    = ` ${previewTheme.mode.toUpperCase()} `;
  const controls = ' _ □ × ';
  const fixedLen  = 1 + 2 + 1 + name.length + 1 + badge.length + controls.length;
  const spacerLen = Math.max(1, w - fixedLen);
  const titleBar =
    `${ansiBg(frameColor)}${ansiFg(frameFg)}│${RESET}` +
    `${ansiBg(accentDim)}${ansiFg(titleFg)}  ${RESET}` +
    `${ansiBg(accent)}${ansiFg(titleFg)}${BOLD} ${name} ${RESET}` +
    `${ansiBg(accent)}${ansiFg(mixHex(accent, isDark ? previewScheme.brightWhite : '#FFFFFF', 0.55))}${badge}${RESET}` +
    `${ansiBg(accentFade)}${' '.repeat(spacerLen)}` +
    `${ansiFg(bestTextOn(accentFade, previewScheme.brightWhite || '#FFFFFF', previewScheme.black))}${controls}${RESET}`;

  return [
    // Outer frame top — skeuomorphic double border (dark outer + accent inner via ActiveBorder)
    frameLine('╔', '═', '╗'),
    // Title bar with left→right gradient (accent dim → accent → accent fade)
    titleBar,
    // Inner separator — double border effect
    sepLine(),
    // Wallpaper + mode info
    framedRow(
      token('WALLPAPER', previewScheme.black, previewScheme.blue, BOLD) + ' ' +
      token(path.basename(previewTheme.wallpaperFile), previewScheme.cyan, null, UNDERLINE) + '  ' +
      token(badge.trim(), selText, previewScheme.selectionBackground, BOLD),
      previewScheme.background, previewScheme.foreground
    ),
    // Normal palette
    renderPaletteRow(['blk', 'red', 'grn', 'ylw', 'blu', 'mag', 'cyn', 'wht'], {
      blk: previewScheme.black, red: previewScheme.red,    grn: previewScheme.green,  ylw: previewScheme.yellow,
      blu: previewScheme.blue,  mag: previewScheme.purple, cyn: previewScheme.cyan,   wht: previewScheme.white
    }, w, previewScheme),
    // Bright palette
    renderPaletteRow(['BRK', 'RED', 'GRN', 'YLW', 'BLU', 'MAG', 'CYN', 'WHT'], {
      BRK: previewScheme.brightBlack, RED: previewScheme.brightRed,    GRN: previewScheme.brightGreen,  YLW: previewScheme.brightYellow,
      BLU: previewScheme.brightBlue,  MAG: previewScheme.brightPurple, CYN: previewScheme.brightCyan,   WHT: previewScheme.brightWhite
    }, w, previewScheme),
    // Neumorphic button row — simulated taskbar chrome
    panelLine(
      nmBtn('Taskbar', nmSurface, previewScheme.foreground) + '  ' +
      nmBtn('Start', mixHex(accent, nmSurface, 0.30), titleFg) + '  ' +
      nmBtn('Accent', nmSurface, accent) + '    ' +
      token('AppsUseLightTheme', previewScheme.yellow) + '=' +
      token(previewTheme.mode === 'light' ? '1' : '0', previewScheme.green, null, BOLD),
      w, previewScheme, previewScheme.foreground, nmSurface
    ),
    // Outer frame bottom
    frameLine('╚', '═', '╝'),
  ];
}

function filteredPacks() {
  const query = packFilter.trim().toLowerCase();
  if (!query) return packs;
  return packs.filter((pack) => {
    const haystacks = [pack.label, pack.description, ...pack.availableThemeIds.map((id) => themesById.get(id)?.name || '')];
    return haystacks.some((value) => String(value).toLowerCase().includes(query));
  });
}

function themesForPack(pack, queryOverride = themeFilter) {
  if (!pack) return [];
  const query = queryOverride.trim().toLowerCase();
  const packThemes = pack.availableThemeIds.map((id) => themesById.get(id)).filter(Boolean);
  if (!query) return packThemes;
  return packThemes.filter((theme) => [theme.name, theme.vscodeName, theme.description].some((value) => String(value || '').toLowerCase().includes(query)));
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
  const activeThemes = mode === 'packs' ? themesForPack(currentPack, '') : themesForPack(currentPack, themeFilter);
  const storedIndex = selectedThemeIndexByPack.get(currentPack.id) ?? selectedThemeIndex;
  selectedThemeIndex = activeThemes.length === 0 ? 0 : Math.max(0, Math.min(storedIndex, activeThemes.length - 1));
  selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
  return { activePacks, currentPack, activeThemes };
}

function currentPreviewTheme() {
  const { currentPack, activeThemes } = syncSelections();
  if (!currentPack || activeThemes.length === 0) return null;
  return activeThemes[selectedThemeIndex] || activeThemes[0] || null;
}

function render() {
  renderPending = false;
  const { activePacks, currentPack, activeThemes } = syncSelections();
  const previewTheme = (currentPack && activeThemes.length > 0) ? (activeThemes[selectedThemeIndex] || activeThemes[0] || null) : null;
  const previewScheme = previewTheme ? schemesByName.get(previewTheme.name) : null;
  const previewLines = renderPreviewPanel(previewTheme, previewScheme, Math.max(48, (output.columns || 100) - 2));
  const height = typeof output.rows === 'number' ? output.rows : 24;
  const headerLines = 9;
  const reservedPreviewLines = Math.min(previewLines.length + 2, Math.max(9, Math.floor(height * 0.45)));
  const listHeight = Math.max(6, height - headerLines - reservedPreviewLines);
  const activeList = mode === 'packs' ? activePacks : activeThemes;
  const selectedIndex = mode === 'packs' ? selectedPackIndex : selectedThemeIndex;
  const start = Math.max(0, Math.min(selectedIndex - Math.floor(listHeight / 2), Math.max(0, activeList.length - listHeight)));
  const visible = activeList.slice(start, start + listHeight);
  const activeFilter = mode === 'packs' ? packFilter : themeFilter;

  const out = [
    '\x1B[2J\x1B[H',
    'XELA Themes\n',
    `Target: Windows Personalization\n`,
    `Install Root: ${targetRoot}\n`,
    `View: ${mode === 'packs' ? 'Packs' : 'Themes'}\n`,
    `Pack: ${currentPack?.label || '(none)'}\n`,
    `Preview: ${previewTheme?.name || '(none)'}\n`,
  ];
  if (previewTheme?.description) out.push(`About: ${previewTheme.description}\n`);
  if (previewTheme?.vscodeName && previewTheme.vscodeName !== previewTheme.name) out.push(`Origin: ${previewTheme.vscodeName}\n`);
  out.push(`Filter: ${activeFilter || '(none)'}\n`);
  out.push(
    mode === 'packs'
      ? 'Up/Down = browse packs, Enter/Right/Tab = open pack, Type = filter, Esc/Ctrl+C = cancel\n\n'
      : 'Up/Down = browse themes, Enter = apply to Windows, Left = back to packs, Type = filter, Esc/Ctrl+C = cancel\n\n'
  );

  if (activeList.length === 0) {
    out.push(mode === 'packs' ? 'No packs match the current filter.\n' : 'No themes match the current pack filter.\n');
    output.write(out.join(''));
    return;
  }

  out.push(`Showing ${start + 1}-${start + visible.length} of ${activeList.length}\n\n`);
  for (let i = 0; i < visible.length; i++) {
    const entry = visible[i];
    const absoluteIndex = start + i;
    const marker = absoluteIndex === selectedIndex ? '> ' : '  ';
    out.push(mode === 'packs'
      ? `${marker}${entry.label} (${entry.availableThemeIds.length})\n`
      : `${marker}${entry.name}\n`);
  }

  out.push('\nWindows Preview\n\n');
  for (const line of previewLines) {
    out.push(`${line}\n`);
  }
  out.push(`\nStatus: ${statusMessage}\n`);
  output.write(out.join(''));
}

function scheduleRender() {
  if (!renderPending) {
    renderPending = true;
    setImmediate(render);
  }
}

async function commitSelection() {
  const current = currentPreviewTheme();
  if (!current) {
    statusMessage = 'No theme is selected.';
    scheduleRender();
    return;
  }
  const scheme = schemesByName.get(current.name);
  if (!scheme) {
    statusMessage = `Preview palette not found for ${current.name}.`;
    scheduleRender();
    return;
  }

  try {
    statusMessage = `Applying ${current.name}...`;
    scheduleRender();

    fs.mkdirSync(targetThemeDir, { recursive: true });
    fs.mkdirSync(targetWallpaperDir, { recursive: true });

    const themePath = path.join(targetThemeDir, 'xela-active.theme');
    const wallpaperPath = path.join(targetWallpaperDir, path.basename(current.wallpaperFile));
    const appliedTheme = { ...current, scheme };

    fs.copyFileSync(current.wallpaperFile, wallpaperPath);
    writeWindowsThemeFile(themePath, appliedTheme, wallpaperPath);
    launchWindowsThemeFile(themePath);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    applyWindowsPersonalizationMode(appliedTheme);
    applyWindowsAccent(appliedTheme);
    applyWindowsShell(appliedTheme);

    cleanup();
    output.write(`Applied ${current.name}\n`);
    output.write(`Theme file: ${themePath}\n`);
    process.exit(0);
  } catch (error) {
    statusMessage = `Apply failed: ${error.message}`;
    scheduleRender();
  }
}

function cleanup() {
  input.removeListener('keypress', onKeypress);
  if (input.isTTY) input.setRawMode(false);
  input.pause();
}

function onKeypress(_, key = {}) {
  const { activePacks, currentPack, activeThemes } = syncSelections();
  const activeList = mode === 'packs' ? activePacks : activeThemes;

  if (key.ctrl && key.name === 'c') {
    cleanup();
    process.exit(1);
  }
  if (key.name === 'escape') {
    cleanup();
    process.exit(0);
  }
  if (key.name === 'return') {
    if (mode === 'packs') {
      if (currentPack) {
        mode = 'themes';
        selectedThemeIndex = selectedThemeIndexByPack.get(currentPack.id) ?? 0;
        statusMessage = `Opened ${currentPack.label}.`;
        scheduleRender();
      }
    } else {
      void commitSelection();
    }
    return;
  }
  if (key.name === 'tab' || key.name === 'right') {
    if (mode === 'packs' && currentPack) {
      mode = 'themes';
      selectedThemeIndex = selectedThemeIndexByPack.get(currentPack.id) ?? 0;
      statusMessage = `Opened ${currentPack.label}.`;
      scheduleRender();
    }
    return;
  }
  if (key.name === 'left') {
    if (mode === 'themes') {
      mode = 'packs';
      statusMessage = `Browsing packs.`;
      scheduleRender();
    }
    return;
  }
  if (key.name === 'up') {
    if (activeList.length > 0) {
      if (mode === 'packs') {
        selectedPackIndex = selectedPackIndex > 0 ? selectedPackIndex - 1 : activeList.length - 1;
        statusMessage = `Selected pack: ${activePacks[selectedPackIndex]?.label || '(none)'}`;
      } else {
        selectedThemeIndex = selectedThemeIndex > 0 ? selectedThemeIndex - 1 : activeList.length - 1;
        if (currentPack) selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
        statusMessage = `Selected theme: ${activeThemes[selectedThemeIndex]?.name || '(none)'}`;
      }
      scheduleRender();
    }
    return;
  }
  if (key.name === 'down') {
    if (activeList.length > 0) {
      if (mode === 'packs') {
        selectedPackIndex = selectedPackIndex < activeList.length - 1 ? selectedPackIndex + 1 : 0;
        statusMessage = `Selected pack: ${activePacks[selectedPackIndex]?.label || '(none)'}`;
      } else {
        selectedThemeIndex = selectedThemeIndex < activeList.length - 1 ? selectedThemeIndex + 1 : 0;
        if (currentPack) selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
        statusMessage = `Selected theme: ${activeThemes[selectedThemeIndex]?.name || '(none)'}`;
      }
      scheduleRender();
    }
    return;
  }
  if (key.name === 'backspace') {
    if (mode === 'packs' && packFilter.length > 0) {
      packFilter = packFilter.slice(0, -1);
      selectedPackIndex = 0;
      statusMessage = packFilter ? `Pack filter: ${packFilter}` : 'Pack filter cleared.';
      scheduleRender();
    } else if (mode === 'themes' && themeFilter.length > 0) {
      themeFilter = themeFilter.slice(0, -1);
      selectedThemeIndex = 0;
      if (currentPack) selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
      statusMessage = themeFilter ? `Theme filter: ${themeFilter}` : 'Theme filter cleared.';
      scheduleRender();
    }
    return;
  }
  if (key.ctrl && key.name === 'u') {
    if (mode === 'packs') {
      packFilter = '';
      selectedPackIndex = 0;
      statusMessage = 'Pack filter cleared.';
    } else {
      themeFilter = '';
      selectedThemeIndex = 0;
      if (currentPack) selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
      statusMessage = 'Theme filter cleared.';
    }
    scheduleRender();
    return;
  }
  if (typeof key.sequence === 'string' && key.sequence.length === 1 && !key.ctrl && !key.meta) {
    const code = key.sequence.charCodeAt(0);
    if (code >= 32 && code !== 127) {
      if (mode === 'packs') {
        packFilter += key.sequence;
        selectedPackIndex = 0;
        statusMessage = `Pack filter: ${packFilter}`;
      } else {
        themeFilter += key.sequence;
        selectedThemeIndex = 0;
        if (currentPack) selectedThemeIndexByPack.set(currentPack.id, selectedThemeIndex);
        statusMessage = `Theme filter: ${themeFilter}`;
      }
      scheduleRender();
    }
  }
}

readline.emitKeypressEvents(input);
input.setRawMode(true);
input.resume();
input.on('keypress', onKeypress);
render();
