#!/usr/bin/env node
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline';
import path from 'node:path';
import {
  resolveEffectiveWindowsTerminalSchemeName,
  resolveWindowsTerminalSettingsPath,
  readWindowsTerminalSettingsFile
} from './windows-terminal-utils.mjs';

if (!process.stdin.isTTY || !process.stdout.isTTY) {
  console.error('The xela-themes TUI requires an interactive terminal.');
  process.exit(1);
}

const options = [
  {
    label: 'Browser Themes',
    description: 'Select a standalone Chrome/Edge browser-chrome theme package.',
    script: path.resolve('./scripts/theme-system/select-browser-theme.mjs')
  },
  {
    label: 'Windows Terminal',
    description: 'Live-preview terminal themes with ANSI palette samples.',
    script: path.resolve('./scripts/theme-system/select-windows-terminal-theme.mjs')
  },
  {
    label: 'Windows Personalization',
    description: 'Apply wallpaper, mode, and shell accent themes to Windows.',
    script: path.resolve('./scripts/theme-system/select-windows-personalization-theme.mjs')
  },
  {
    label: 'Both',
    description: 'Pick a theme once — applies to Windows Terminal and Personalization.',
    both: true
  }
];

let selectedIndex = 0;

function render() {
  output.write('\x1Bc');
  output.write('XELA Themes\n');
  output.write('Choose a target\n\n');
  options.forEach((option, index) => {
    const marker = index === selectedIndex ? '> ' : '  ';
    output.write(`${marker}${option.label}\n`);
    output.write(`  ${option.description}\n`);
  });
  output.write('\nUp/Down = select, Enter = open, Esc/Ctrl+C = cancel\n');
}

function cleanup() {
  input.removeListener('keypress', onKeypress);
  if (input.isTTY) {
    input.setRawMode(false);
  }
  input.pause();
}

function runScript(scriptPath, args = []) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [scriptPath, ...args], {
      cwd: path.resolve('.'),
      stdio: 'inherit'
    });
    child.on('exit', (code) => resolve(code ?? 0));
  });
}

function askYesNo(question) {
  return new Promise((resolve) => {
    output.write(`\n${question} [y/n] `);
    readline.emitKeypressEvents(input);
    if (input.isTTY) input.setRawMode(true);
    input.resume();
    function onKey(_, key = {}) {
      if (!key) return;
      if (key.ctrl && key.name === 'c') {
        input.removeListener('keypress', onKey);
        if (input.isTTY) input.setRawMode(false);
        input.pause();
        output.write('\n');
        resolve(false);
        return;
      }
      if (key.name === 'y') {
        input.removeListener('keypress', onKey);
        if (input.isTTY) input.setRawMode(false);
        input.pause();
        output.write('y\n');
        resolve(true);
      } else if (key.name === 'n' || key.name === 'escape' || key.name === 'return') {
        input.removeListener('keypress', onKey);
        if (input.isTTY) input.setRawMode(false);
        input.pause();
        output.write('n\n');
        resolve(false);
      }
    }
    input.on('keypress', onKey);
  });
}

function iconManifestPath(schemeName) {
  const id = schemeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return path.resolve(`./exports/windows-icons/${id}/icons-manifest.json`);
}

async function launchSelection() {
  cleanup();
  const selected = options[selectedIndex];
  if (selected.both) {
    const terminalScript = path.resolve('./scripts/theme-system/select-windows-terminal-theme.mjs');
    const code = await runScript(terminalScript);
    if (code !== 0) process.exit(code);

    const settingsPath = resolveWindowsTerminalSettingsPath(null);
    const _wtSettings = settingsPath ? readWindowsTerminalSettingsFile(settingsPath)?.settings : null;
    const schemeName = _wtSettings
      ? (resolveEffectiveWindowsTerminalSchemeName(_wtSettings) ||
         (_wtSettings?.profiles?.list || []).find((p) => p?.colorScheme)?.colorScheme ||
         null)
      : null;

    if (schemeName) {
      const installScript = path.resolve('./scripts/theme-system/install-windows-personalization.mjs');
      const installCode = await runScript(installScript, ['--theme', schemeName]);
      if (installCode !== 0) process.exit(installCode);

      // Icon prompt
      const manifestPath = iconManifestPath(schemeName);
      const hasIcons = fs.existsSync(manifestPath);
      const doIcons = await askYesNo(
        hasIcons
          ? `Apply cached icons for "${schemeName}"?`
          : `Generate & apply icons for "${schemeName}"? (~30s, uses OpenAI)`
      );

      if (doIcons) {
        if (!hasIcons) {
          output.write('Generating icons...\n');
          const genScript = path.resolve('./scripts/theme-system/generate-icons.mjs');
          const genCode = await runScript(genScript, ['--theme', schemeName]);
          if (genCode !== 0) {
            output.write('Icon generation failed. Skipping.\n');
            process.exit(0);
          }
        }
        const applyScript = path.resolve('./scripts/theme-system/apply-icons.mjs');
        await runScript(applyScript, ['--theme', schemeName]);
      }

      process.exit(0);
    } else {
      output.write('Could not determine applied theme name; skipping Windows Personalization.\n');
      process.exit(0);
    }
  } else {
    const code = await runScript(selected.script);
    process.exit(code);
  }
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
  if (key.name === 'return') {
    launchSelection();
    return;
  }
  if (key.name === 'up') {
    selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : options.length - 1;
    render();
    return;
  }
  if (key.name === 'down') {
    selectedIndex = selectedIndex < options.length - 1 ? selectedIndex + 1 : 0;
    render();
  }
}

readline.emitKeypressEvents(input);
input.setRawMode(true);
input.resume();
input.on('keypress', onKeypress);
render();
