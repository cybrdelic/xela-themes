#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline';
import path from 'node:path';
import {
  buildBrowserThemePackList,
  getBrowserThemeDir,
  loadBrowserThemeIndex
} from './browser-theme-utils.mjs';

if (!process.stdin.isTTY || !process.stdout.isTTY) {
  console.error('The xela-themes TUI requires an interactive terminal.');
  process.exit(1);
}

const index = loadBrowserThemeIndex();
const themes = Array.isArray(index?.themes) ? index.themes : [];
const themesById = new Map(themes.map((theme) => [theme.id, theme]));
const packs = buildBrowserThemePackList(index);
const installScript = path.resolve('./scripts/theme-system/install-browser-theme.mjs');
const ANSI_PATTERN = /\x1b\[[0-9;]*m/g;
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

let mode = 'packs';
let selectedPackIndex = 0;
let selectedThemeIndex = 0;
const selectedThemeIndexByPack = new Map();

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

function bestTextOn(bgHex, lightHex = '#FFFFFF', darkHex = '#000000') {
  const { r, g, b } = hexToRgb(bgHex);
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  return luminance > 0.45 ? darkHex : lightHex;
}

function paintChip(label, color) {
  return `${ansiBg(color)}${ansiFg(bestTextOn(color))} ${label} ${RESET}`;
}

function currentPack() {
  return packs[selectedPackIndex] || packs[0];
}

function currentThemes() {
  const pack = currentPack();
  return (pack?.themeIds || []).map((id) => themesById.get(id)).filter(Boolean);
}

function currentTheme() {
  const list = currentThemes();
  return list[selectedThemeIndex] || list[0] || null;
}

function renderPreview(theme) {
  if (!theme) {
    return ['No browser theme selected.'];
  }

  const p = theme.palette;
  return [
    `${BOLD}${theme.name}${RESET}`,
    `${paintChip(' frame ', p.bg)} ${paintChip(' toolbar ', p.bgElevated)} ${paintChip(' button ', p.buttonBg)} ${paintChip(' link ', p.link)}`,
    `${paintChip(' omnibox ', p.inputBg)} ${paintChip(' accent ', p.accent)} ${paintChip(' text ', p.text)} ${paintChip(' muted ', p.textMuted)}`,
    `Folder: ${getBrowserThemeDir(theme)}`,
    'Enter = show load path, Tab = switch packs/themes'
  ];
}

function clearScreen() {
  output.write('\x1Bc');
}

function render() {
  clearScreen();
  const pack = currentPack();
  const list = currentThemes();
  const theme = currentTheme();

  output.write('XELA Browser Themes\n');
  output.write('Choose a browser-chrome theme package\n\n');
  output.write(`${mode === 'packs' ? '> ' : '  '}Packs\n`);
  output.write(`${mode === 'themes' ? '> ' : '  '}Themes\n\n`);

  output.write('Packs\n');
  for (let index = 0; index < packs.length; index += 1) {
    const marker = mode === 'packs' && index === selectedPackIndex ? '> ' : '  ';
    const item = packs[index];
    output.write(`${marker}${item.label} (${item.themeIds.length})\n`);
  }

  output.write('\nThemes\n');
  if (list.length === 0) {
    output.write('  No themes in this pack.\n');
  } else {
    const start = Math.max(0, selectedThemeIndex - 6);
    const end = Math.min(list.length, start + 12);
    for (let index = start; index < end; index += 1) {
      const marker = mode === 'themes' && index === selectedThemeIndex ? '> ' : '  ';
      output.write(`${marker}${list[index].name}\n`);
    }
  }

  output.write('\nPreview\n');
  for (const line of renderPreview(theme)) {
    output.write(`${line}\n`);
  }

  output.write('\nUp/Down = move, Left/Right/Tab = switch column, Enter = open load path, Esc/Ctrl+C = cancel\n');
  if (pack?.description) {
    output.write(`${stripAnsi(pack.description)}\n`);
  }
}

function cleanup() {
  input.removeListener('keypress', onKeypress);
  if (input.isTTY) {
    input.setRawMode(false);
  }
  input.pause();
}

function runInstall(theme) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [installScript, '--theme', theme.id], {
      cwd: path.resolve('.'),
      stdio: 'inherit'
    });
    child.on('exit', (code) => resolve(code ?? 0));
  });
}

async function selectCurrentTheme() {
  const theme = currentTheme();
  if (!theme) {
    return;
  }
  cleanup();
  const code = await runInstall(theme);
  process.exit(code);
}

function onKeypress(_, key = {}) {
  if (key.ctrl && key.name === 'c') {
    cleanup();
    process.exit(1);
  }
  if (key.name === 'escape') {
    cleanup();
    process.exit(0);
  }
  if (key.name === 'tab' || key.name === 'right') {
    mode = mode === 'packs' ? 'themes' : 'packs';
    render();
    return;
  }
  if (key.name === 'left') {
    mode = 'packs';
    render();
    return;
  }
  if (key.name === 'return') {
    if (mode === 'packs') {
      mode = 'themes';
      selectedThemeIndex = selectedThemeIndexByPack.get(currentPack()?.id) || 0;
      render();
      return;
    }
    selectCurrentTheme();
    return;
  }
  if (key.name === 'up') {
    if (mode === 'packs') {
      selectedPackIndex = selectedPackIndex > 0 ? selectedPackIndex - 1 : packs.length - 1;
      selectedThemeIndex = selectedThemeIndexByPack.get(currentPack()?.id) || 0;
    } else {
      const list = currentThemes();
      selectedThemeIndex = list.length === 0
        ? 0
        : (selectedThemeIndex > 0 ? selectedThemeIndex - 1 : list.length - 1);
      selectedThemeIndexByPack.set(currentPack()?.id, selectedThemeIndex);
    }
    render();
    return;
  }
  if (key.name === 'down') {
    if (mode === 'packs') {
      selectedPackIndex = selectedPackIndex < packs.length - 1 ? selectedPackIndex + 1 : 0;
      selectedThemeIndex = selectedThemeIndexByPack.get(currentPack()?.id) || 0;
    } else {
      const list = currentThemes();
      selectedThemeIndex = list.length === 0
        ? 0
        : (selectedThemeIndex < list.length - 1 ? selectedThemeIndex + 1 : 0);
      selectedThemeIndexByPack.set(currentPack()?.id, selectedThemeIndex);
    }
    render();
  }
}

readline.emitKeypressEvents(input);
input.setRawMode(true);
input.resume();
input.on('keypress', onKeypress);
render();
