/**
 * XELA Live Theme Fuzzer - VS Code Extension Integration
 *
 * Generates random accessible themes with COMPLETE live preview:
 * - UI colors (workbench.colorCustomizations)
 * - Syntax highlighting (editor.tokenColorCustomizations)
 * - Semantic tokens (editor.semanticTokenColorCustomizations)
 *
 * This module has been refactored to use smaller, focused sub-modules.
 *
 * @module theme-fuzzer/fuzzer-extension
 */

import * as vscode from 'vscode';

// Import from refactored modules
import {
    applyCompleteTheme,
    clearAllCustomizations,
    restoreOriginalSettings,
    saveOriginalSettings,
} from './settings-manager.js';

import {
    generateThemeBatch,
    getCategories
} from './theme-generator.js';

import {
    exportThemeJson,
    savePalette,
} from './file-operations.js';

// Import from lib for quick fuzz
import {
    generateThemeJson,
    generateValidPalette,
} from '../lib/index.js';

// Current palette state
let currentPalette = null;

/**
 * Run the fuzzer with complete live preview
 * @param {vscode.ExtensionContext} context - Extension context
 */
export async function runFuzzerPicker(context) {
  // Save current settings to restore on cancel
  saveOriginalSettings();

  // Current generation mode
  let currentMode = 'random';
  let currentCategory = null;

  // Generate initial batch
  let themeItems = generateThemeBatch(10);

  // Get available retro categories
  const retroCategories = getCategories();

  const quickPick = vscode.window.createQuickPick();

  function buildMenuItems() {
    const modeIcon = currentMode === 'retro' ? '$(history)' : '$(beaker)';
    const modeLabel = currentMode === 'retro' ? 'Switch to Random' : 'Switch to Retro';

    const menuItems = [
      { label: '$(refresh) Generate 10 More Themes', alwaysShow: true, isAction: true, actionType: 'generate' },
      { label: `${modeIcon} ${modeLabel}`, alwaysShow: true, isAction: true, actionType: 'toggleMode' },
      { label: '$(filter) Dark Only', alwaysShow: true, isAction: true, actionType: 'dark' },
      { label: '$(filter) Light Only', alwaysShow: true, isAction: true, actionType: 'light' },
    ];

    // Add retro category filter if in retro mode
    if (currentMode === 'retro') {
      menuItems.push({
        label: `$(folder) Category: ${currentCategory || 'All'}`,
        alwaysShow: true,
        isAction: true,
        actionType: 'categoryPicker'
      });
    }

    menuItems.push({ label: '', kind: vscode.QuickPickItemKind.Separator });

    return menuItems;
  }

  quickPick.items = [...buildMenuItems(), ...themeItems];
  quickPick.placeholder = '🎲 Arrow keys = live preview, Enter = apply, Esc = cancel';
  quickPick.matchOnDescription = true;
  quickPick.matchOnDetail = true;

  let acceptedItem = null;
  let lastAppliedPalette = null;

  const disposables = [];

  // Live preview as user navigates
  disposables.push(
    quickPick.onDidChangeActive(async (items) => {
      const active = items[0];
      if (active?.colors && active?.tokenColors && active?.palette) {
        // Avoid re-applying the same theme
        if (lastAppliedPalette === active.palette) return;
        lastAppliedPalette = active.palette;

        currentPalette = active.palette;
        // Apply COMPLETE theme - colors + syntax + semantic tokens
        await applyCompleteTheme(active.colors, active.tokenColors, active.palette);
      }
    })
  );

  // User selected a theme
  disposables.push(
    quickPick.onDidChangeSelection(async (items) => {
      const selected = items[0];

      // Handle actions
      if (selected?.isAction) {
        if (selected.actionType === 'toggleMode') {
          currentMode = currentMode === 'random' ? 'retro' : 'random';
          currentCategory = null; // Reset category when switching modes
          themeItems = generateThemeBatch(10, { mode: currentMode });
          quickPick.items = [...buildMenuItems(), ...themeItems];
          return;
        }

        if (selected.actionType === 'categoryPicker') {
          // Show category picker
          const categoryItems = [
            { label: 'All Categories', category: null },
            ...retroCategories.map(cat => ({ label: cat, category: cat }))
          ];

          const picked = await vscode.window.showQuickPick(categoryItems, {
            placeHolder: 'Select a retro palette category'
          });

          if (picked) {
            currentCategory = picked.category;
            themeItems = generateThemeBatch(10, { mode: 'retro', category: currentCategory });
            quickPick.items = [...buildMenuItems(), ...themeItems];
          }
          return;
        }

        if (selected.actionType === 'dark' || selected.actionType === 'light') {
          // Filter by type
          themeItems = generateThemeBatch(10, {
            mode: currentMode,
            category: currentCategory,
            themeType: selected.actionType
          });
          quickPick.items = [...buildMenuItems(), ...themeItems];
          return;
        }

        if (selected.actionType === 'generate') {
          // Generate more
          const newItems = generateThemeBatch(10, { mode: currentMode, category: currentCategory });
          themeItems = [...themeItems, ...newItems];
          quickPick.items = [...buildMenuItems(), ...themeItems];
          return;
        }

        return;
      }

      if (selected?.colors) {
        acceptedItem = selected;
        await applyCompleteTheme(selected.colors, selected.tokenColors, selected.palette);
        quickPick.hide();
      }
    })
  );

  // Handle cancel/close
  disposables.push(
    quickPick.onDidHide(async () => {
      if (!acceptedItem) {
        // Revert to original settings
        await restoreOriginalSettings();
      } else {
        // Show success with options
        const action = await vscode.window.showInformationMessage(
          `✅ Theme applied! Main: ${acceptedItem.validation.scores.mainText.toFixed(1)}:1 · Accent: ${acceptedItem.validation.scores.accent?.toFixed(1) || 'N/A'}:1`,
          'Save as Palette',
          'Export JSON',
          'Clear All'
        );

        if (action === 'Save as Palette') {
          await savePalette(context, acceptedItem.palette);
        } else if (action === 'Export JSON') {
          await exportThemeJson(context, acceptedItem);
        } else if (action === 'Clear All') {
          await clearAllCustomizations();
        }
      }

      disposables.forEach(d => d.dispose());
      quickPick.dispose();
    })
  );

  quickPick.show();
}

/**
 * Quick fuzz - instantly apply a random accessible theme
 * @param {vscode.ExtensionContext} context - Extension context
 */
export async function quickFuzz(context) {
  saveOriginalSettings();

  const { palette, validation } = generateValidPalette();
  const theme = generateThemeJson(palette, 'XELA Quick Fuzz');

  currentPalette = palette;
  await applyCompleteTheme(theme.colors, theme.tokenColors, palette);

  const emoji = palette.type === 'dark' ? '🌙' : '☀️';
  const action = await vscode.window.showInformationMessage(
    `${emoji} ${palette.meta.colorScheme} · ${validation.scores.mainText.toFixed(1)}:1 contrast`,
    'Fuzz Again',
    'Save',
    'Clear'
  );

  if (action === 'Fuzz Again') {
    await quickFuzz(context);
  } else if (action === 'Save') {
    await savePalette(context, palette);
  } else if (action === 'Clear') {
    await clearAllCustomizations();
  }
}

export async function clearFuzzCustomizations() {
  await clearAllCustomizations();
  vscode.window.showInformationMessage('All theme customizations cleared!');
}

/**
 * Register fuzzer commands with VS Code
 * @param {vscode.ExtensionContext} context - Extension context
 */
export function registerFuzzerCommands(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('xelaThemes.fuzzTheme', () => {
      runFuzzerPicker(context);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('xelaThemes.quickFuzz', () => {
      quickFuzz(context);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('xelaThemes.clearFuzz', async () => {
      await clearFuzzCustomizations();
    })
  );
}
