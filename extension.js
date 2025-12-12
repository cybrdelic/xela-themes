// XELA Themes - Theme extension with pack-aware picker
import fs from 'node:fs';
import path from 'node:path';
import * as vscode from 'vscode';

let cachedPacks = null;

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

/**
 * Extension activation
 * @param {import('vscode').ExtensionContext} context
 */
export async function activate(context) {
  console.log('XELA Themes activated');

  // Register theme picker command
  const disposable = vscode.commands.registerCommand('xelaThemes.selectTheme', () => runPackPicker(context));
  context.subscriptions.push(disposable);

  // Try to load and register fuzzer commands
  try {
    // Use the refactored modular fuzzer extension
    const fuzzerModule = await import('./src/theme-fuzzer/fuzzer-extension-refactored.js');
    if (fuzzerModule.registerFuzzerCommands) {
      fuzzerModule.registerFuzzerCommands(context);
      console.log('XELA Themes: Fuzzer commands registered successfully');
    }
  } catch (e) {
    console.error('XELA Themes: Failed to load fuzzer module:', e.message);
    // Register a placeholder command that shows an error
    context.subscriptions.push(
      vscode.commands.registerCommand('xelaThemes.fuzzTheme', () => {
        vscode.window.showErrorMessage(`Fuzzer not available: ${e.message}`);
      })
    );
  }
}/**
 * Extension deactivation
 */
export function deactivate() {
  console.log('XELA Themes deactivated');
  cachedPacks = null;
}
