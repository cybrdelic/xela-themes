/**
 * XELA Live Theme Fuzzer - File Operations
 *
 * Handles saving palettes and exporting themes to files.
 *
 * @module theme-fuzzer/file-operations
 */

import * as vscode from 'vscode';

/**
 * Export theme as a complete JSON file
 * @param {vscode.ExtensionContext} context - Extension context
 * @param {Object} themeItem - Theme item with colors, tokenColors, palette
 */
export async function exportThemeJson(context, themeItem) {
  const name = await vscode.window.showInputBox({
    prompt: 'Enter a name for the exported theme',
    placeHolder: 'my-awesome-theme',
    validateInput: (value) => {
      if (!value || value.trim().length < 3) {
        return 'Name must be at least 3 characters';
      }
      return null;
    }
  });

  if (!name) return;

  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const themeName = `XELA ${name}`;

  // Build complete theme
  const fullTheme = {
    "$schema": "vscode://schemas/color-theme",
    name: themeName,
    type: themeItem.palette.type,
    semanticHighlighting: true,
    colors: themeItem.colors,
    tokenColors: themeItem.tokenColors
  };

  const fs = await import('node:fs');
  const path = await import('node:path');

  const exportDir = path.join(context.extensionPath, 'themes-fuzzed');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  const filepath = path.join(exportDir, `xela-${id}-color-theme.json`);
  fs.writeFileSync(filepath, JSON.stringify(fullTheme, null, 2));

  const openAction = await vscode.window.showInformationMessage(
    `✅ Exported to ${filepath}`,
    'Open File'
  );

  if (openAction === 'Open File') {
    const doc = await vscode.workspace.openTextDocument(filepath);
    await vscode.window.showTextDocument(doc);
  }
}

/**
 * Save the current palette to a file
 * @param {vscode.ExtensionContext} context - Extension context
 * @param {Object} palette - Theme palette to save
 */
export async function savePalette(context, palette) {
  if (!palette) {
    vscode.window.showWarningMessage('No theme to save!');
    return;
  }

  const name = await vscode.window.showInputBox({
    prompt: 'Enter a name for this theme',
    placeHolder: 'My Awesome Theme',
    validateInput: (value) => {
      if (!value || value.trim().length < 3) {
        return 'Name must be at least 3 characters';
      }
      return null;
    }
  });

  if (!name) return;

  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const paletteData = {
    id,
    name: `XELA ${name}`,
    type: palette.type,
    colors: palette.colors,
    syntax: palette.syntax,
    terminal: palette.terminal,
    meta: palette.meta
  };

  const fs = await import('node:fs');
  const path = await import('node:path');

  const palettesDir = path.join(context.extensionPath, 'src', 'theme-system', 'palettes');

  try {
    if (!fs.existsSync(palettesDir)) {
      fs.mkdirSync(palettesDir, { recursive: true });
    }

    const filepath = path.join(palettesDir, `${id}.json`);
    fs.writeFileSync(filepath, JSON.stringify(paletteData, null, 2));

    const openAction = await vscode.window.showInformationMessage(
      `✅ Saved "${name}" to palettes!`,
      'Open File',
      'Build Themes'
    );

    if (openAction === 'Open File') {
      const doc = await vscode.workspace.openTextDocument(filepath);
      await vscode.window.showTextDocument(doc);
    } else if (openAction === 'Build Themes') {
      const terminal = vscode.window.createTerminal('XELA Build');
      terminal.show();
      terminal.sendText('node scripts/theme-system/build-themes.mjs');
    }
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to save: ${error.message}`);
  }
}
