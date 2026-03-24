#!/usr/bin/env node
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);

const help = `xela-themes

Usage:
  xela-themes
  xela-themes terminal
  xela-themes browser
  xela-themes browser list
  xela-themes browser apply <theme-id-or-name>
  xela-themes list
  xela-themes list packs
  xela-themes apply <scheme-id-or-name>
  xela-themes install <scheme-id-or-name>
  xela-themes windows
  xela-themes windows list
  xela-themes windows apply <theme-id-or-name>

Defaults to the interactive launcher TUI.
`;

function run(script, extraArgs = []) {
  const child = spawn(process.execPath, [path.join(root, script), ...extraArgs], {
    cwd: root,
    stdio: 'inherit'
  });
  child.on('exit', (code) => process.exit(code ?? 0));
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(help);
  process.exit(0);
}

if (args[0] === 'browser') {
  if (!args[1]) {
    run('scripts/theme-system/select-browser-theme.mjs');
  } else if (args[1] === 'list') {
    run('scripts/theme-system/list-browser-themes.mjs', args.slice(2));
  } else if (args[1] === 'apply' || args[1] === 'install') {
    const theme = args[2];
    if (!theme) {
      console.error('Missing browser theme id or name.');
      process.exit(1);
    }
    run('scripts/theme-system/install-browser-theme.mjs', ['--theme', theme, ...args.slice(3)]);
  } else if (args[1] === 'build') {
    run('scripts/theme-system/build-browser-themes.mjs', args.slice(2));
  } else {
    console.error('Usage: xela-themes browser <list|apply|install|build> ...');
    process.exit(1);
  }
} else if (args[0] === 'windows') {
  if (!args[1]) {
    run('scripts/theme-system/select-windows-personalization-theme.mjs');
  } else if (args[1] === 'list') {
    run('scripts/theme-system/list-windows-personalization-themes.mjs', args.slice(2));
  } else if (args[1] === 'apply' || args[1] === 'install') {
    const theme = args[2];
    if (!theme) {
      console.error('Missing Windows personalization theme id or name.');
      process.exit(1);
    }
    run('scripts/theme-system/install-windows-personalization.mjs', ['--theme', theme, ...args.slice(3)]);
  } else if (args[1] === 'build') {
    run('scripts/theme-system/build-windows-personalization.mjs', args.slice(2));
  } else {
    console.error('Usage: xela-themes windows <list|apply|install|build> ...');
    process.exit(1);
  }
} else if (args[0] === 'terminal') {
  run('scripts/theme-system/select-windows-terminal-theme.mjs', args.slice(1));
} else if (args[0] === 'list') {
  run('scripts/theme-system/list-windows-terminal-themes.mjs', args.slice(1));
} else if (args[0] === 'apply' || args[0] === 'install') {
  const scheme = args[1];
  if (!scheme) {
    console.error('Missing scheme id or name.');
    process.exit(1);
  }
  run('scripts/theme-system/install-windows-terminal.mjs', ['--scheme', scheme, ...args.slice(2)]);
} else {
  run('scripts/theme-system/select-xela-theme.mjs', args);
}
