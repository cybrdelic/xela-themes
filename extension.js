// XELA Themes - Theme extension with pack-aware picker
import fs from 'node:fs';
import path from 'node:path';
import * as vscode from 'vscode';
import { initLogging, debug } from './src/logging.js';

let cachedPacks = null;
let editorModulePromise = null;
let fuzzerModulePromise = null;

function loadThemePacks(context) {
  if (cachedPacks) {
    return cachedPacks;
  }

  const packsPath = context.asAbsolutePath('theme-packs.json');
  try {
    const raw = fs.readFileSync(packsPath, 'utf8');
    cachedPacks = JSON.parse(raw);
    return cachedPacks;
  } catch (error) {
    console.error('Failed to load theme packs', error);
    return null;
  }
}

async function runPackPicker(context) {
  const themePacks = loadThemePacks(context);
  if (!themePacks) {
    vscode.window.showErrorMessage('XELA theme packs are missing from this installation. Reinstall the extension and try again.');
    return;
  }

  const packPickItems = themePacks.map((pack) => ({
    label: pack.label,
    description: `${pack.themeCount} theme${pack.themeCount === 1 ? '' : 's'}`,
    detail: pack.description,
    pack
  }));

  const packSelection = await vscode.window.showQuickPick(packPickItems, {
    placeHolder: 'Select a XELA theme pack'
  });

  if (!packSelection) {
    return;
  }

  const { pack } = packSelection;
  const themePickItems = pack.themes.map((theme) => ({
    label: theme.label,
    description: path.basename(theme.path, '.json').replace(/-/g, ' '),
    theme
  }));
  const workbenchConfig = vscode.workspace.getConfiguration('workbench');
  const originalTheme = workbenchConfig.get('colorTheme');
  const quickPick = vscode.window.createQuickPick();
  quickPick.items = themePickItems;
  quickPick.placeholder = `Select a theme from ${pack.label}`;
  quickPick.matchOnDescription = true;
  quickPick.matchOnDetail = true;

  let acceptedThemeLabel = null;
  let lastPreviewLabel = null;

  const applyTheme = async (themeLabel, { suppressErrors = false } = {}) => {
    if (!themeLabel) {
      return false;
    }
    try {
      await workbenchConfig.update('colorTheme', themeLabel, vscode.ConfigurationTarget.Global);
      return true;
    } catch (error) {
      console.error('Failed to apply theme', error);
      if (!suppressErrors) {
        vscode.window.showErrorMessage('Unable to apply theme. Ensure it is installed and try again.');
      }
      return false;
    }
  };

  const disposables = [];

  // Preview themes as the user arrows through the list.
  disposables.push(
    quickPick.onDidChangeActive((items) => {
      const active = items[0];
      const previewLabel = active?.theme?.label;
      if (!previewLabel || previewLabel === lastPreviewLabel) {
        return;
      }
      lastPreviewLabel = previewLabel;
      void applyTheme(previewLabel, { suppressErrors: true });
    })
  );

  disposables.push(
    quickPick.onDidChangeSelection((items) => {
      const selection = items[0];
      const selectedLabel = selection?.theme?.label;
      if (!selectedLabel) {
        return;
      }
      acceptedThemeLabel = selectedLabel;
      void applyTheme(selectedLabel).then((applied) => {
        if (applied) {
          vscode.window.setStatusBarMessage(`Activated ${selectedLabel}`, 3000);
        }
      });
      quickPick.hide();
    })
  );

  disposables.push(
    quickPick.onDidHide(async () => {
      if (!acceptedThemeLabel && originalTheme) {
        await applyTheme(originalTheme);
      }
      disposables.forEach((d) => d.dispose());
      quickPick.dispose();
    })
  );

  quickPick.show();
}

function loadEditorModule() {
  editorModulePromise ??= import('./src/theme-editor/theme-editor-panel.js');
  return editorModulePromise;
}

function loadFuzzerModule() {
  fuzzerModulePromise ??= import('./src/theme-fuzzer/fuzzer-extension-refactored.js');
  return fuzzerModulePromise;
}

/**
 * Extension activation
 * @param {import('vscode').ExtensionContext} context
 */
export async function activate(context) {
  // Initialize extension logging.
  initLogging();
  debug('XELA Themes activated');

  // Register theme picker command
  const disposable = vscode.commands.registerCommand('xelaThemes.selectTheme', () => runPackPicker(context));
  context.subscriptions.push(disposable);

  // Register Theme Editor command lazily to keep activation memory lower.
  context.subscriptions.push(
    vscode.commands.registerCommand('xelaThemes.openEditor', async () => {
      try {
        const editorModule = await loadEditorModule();
        if (!editorModule.ThemeEditorPanel?.createOrShow) {
          throw new Error('ThemeEditorPanel.createOrShow not found in module');
        }
        editorModule.ThemeEditorPanel.createOrShow(context);
      } catch (e) {
        console.error('XELA Theme Editor failed to load:', e.message, e.stack);
        vscode.window.showErrorMessage(`Theme Editor failed to load: ${e.message}`);
      }
    })
  );

  // Register command to clear any lingering theme customizations
  // This fixes issues where fuzzer overrides persist and affect other themes
  const clearCmd = vscode.commands.registerCommand('xelaThemes.clearCustomizations', async () => {
    const workbenchConfig = vscode.workspace.getConfiguration('workbench');
    const editorConfig = vscode.workspace.getConfiguration('editor');

    await workbenchConfig.update('colorCustomizations', undefined, vscode.ConfigurationTarget.Global);
    await editorConfig.update('tokenColorCustomizations', undefined, vscode.ConfigurationTarget.Global);
    await editorConfig.update('semanticTokenColorCustomizations', undefined, vscode.ConfigurationTarget.Global);

    vscode.window.showInformationMessage('XELA: Theme customizations cleared. Your selected theme should now display correctly.');
  });
  context.subscriptions.push(clearCmd);

  // Register fuzzer commands lazily so activation does not pull in generator code up front.
  context.subscriptions.push(
    vscode.commands.registerCommand('xelaThemes.fuzzTheme', async () => {
      try {
        const fuzzerModule = await loadFuzzerModule();
        await fuzzerModule.runFuzzerPicker(context);
      } catch (e) {
        console.error('XELA Themes: Failed to load fuzzer module:', e.message, e.stack);
        vscode.window.showErrorMessage(`Fuzzer not available: ${e.message}`);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('xelaThemes.quickFuzz', async () => {
      try {
        const fuzzerModule = await loadFuzzerModule();
        await fuzzerModule.quickFuzz(context);
      } catch (e) {
        console.error('XELA Themes: Failed to load quick fuzz:', e.message, e.stack);
        vscode.window.showErrorMessage(`Quick fuzz not available: ${e.message}`);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('xelaThemes.clearFuzz', async () => {
      try {
        const fuzzerModule = await loadFuzzerModule();
        await fuzzerModule.clearFuzzCustomizations();
      } catch (e) {
        console.error('XELA Themes: Failed to clear fuzz customizations:', e.message, e.stack);
        vscode.window.showErrorMessage(`Clear fuzz not available: ${e.message}`);
      }
    })
  );
}

/**
 * Extension deactivation
 */
export function deactivate() {
  debug('XELA Themes deactivated');
  cachedPacks = null;
  editorModulePromise = null;
  fuzzerModulePromise = null;
}
