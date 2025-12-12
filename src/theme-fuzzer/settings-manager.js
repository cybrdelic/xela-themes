/**
 * XELA Live Theme Fuzzer - VS Code Settings Manager
 *
 * Handles applying and restoring VS Code color customizations.
 *
 * @module theme-fuzzer/settings-manager
 */

import * as vscode from 'vscode';

// Store original settings for restoration
let originalSettings = {
  colorCustomizations: {},
  tokenColorCustomizations: {},
  semanticTokenColorCustomizations: {}
};

/**
 * Save current VS Code settings as original (for restore on cancel)
 */
export function saveOriginalSettings() {
  const workbenchConfig = vscode.workspace.getConfiguration('workbench');
  const editorConfig = vscode.workspace.getConfiguration('editor');

  originalSettings = {
    colorCustomizations: workbenchConfig.get('colorCustomizations') || {},
    tokenColorCustomizations: editorConfig.get('tokenColorCustomizations') || {},
    semanticTokenColorCustomizations: editorConfig.get('semanticTokenColorCustomizations') || {}
  };
}

/**
 * Restore original VS Code settings
 */
export async function restoreOriginalSettings() {
  const workbenchConfig = vscode.workspace.getConfiguration('workbench');
  const editorConfig = vscode.workspace.getConfiguration('editor');

  await workbenchConfig.update('colorCustomizations', originalSettings.colorCustomizations, vscode.ConfigurationTarget.Global);
  await editorConfig.update('tokenColorCustomizations', originalSettings.tokenColorCustomizations, vscode.ConfigurationTarget.Global);
  await editorConfig.update('semanticTokenColorCustomizations', originalSettings.semanticTokenColorCustomizations, vscode.ConfigurationTarget.Global);
}

/**
 * Clear all theme customizations
 */
export async function clearAllCustomizations() {
  const workbenchConfig = vscode.workspace.getConfiguration('workbench');
  const editorConfig = vscode.workspace.getConfiguration('editor');

  await workbenchConfig.update('colorCustomizations', {}, vscode.ConfigurationTarget.Global);
  await editorConfig.update('tokenColorCustomizations', {}, vscode.ConfigurationTarget.Global);
  await editorConfig.update('semanticTokenColorCustomizations', {}, vscode.ConfigurationTarget.Global);
}

/**
 * Apply complete theme - UI colors, syntax highlighting, and semantic tokens
 * @param {Object} colors - Workbench color customizations
 * @param {Array} tokenColors - TextMate token color rules
 * @param {Object} palette - Full theme palette
 */
export async function applyCompleteTheme(colors, tokenColors, palette) {
  const workbenchConfig = vscode.workspace.getConfiguration('workbench');
  const editorConfig = vscode.workspace.getConfiguration('editor');

  // 1. Apply UI colors
  await workbenchConfig.update('colorCustomizations', colors, vscode.ConfigurationTarget.Global);

  // 2. Convert tokenColors to the format VS Code expects for customizations
  const tokenColorRules = tokenColors.map(tc => ({
    scope: tc.scope,
    settings: tc.settings
  }));

  await editorConfig.update('tokenColorCustomizations', {
    textMateRules: tokenColorRules
  }, vscode.ConfigurationTarget.Global);

  // 3. Apply semantic token colors for richer highlighting
  const semanticColors = buildSemanticTokenColors(palette);
  await editorConfig.update('semanticTokenColorCustomizations', {
    enabled: true,
    rules: semanticColors
  }, vscode.ConfigurationTarget.Global);
}

/**
 * Build semantic token colors from palette
 * @param {Object} palette - Theme palette
 * @returns {Object} Semantic token color rules
 */
function buildSemanticTokenColors(palette) {
  const s = palette.syntax;
  const c = palette.colors;

  return {
    // Variables
    "variable": s.variable,
    "variable.declaration": s.variable,
    "variable.readonly": { foreground: s.constant, fontStyle: "" },
    "variable.defaultLibrary": { foreground: s.type, fontStyle: "italic" },

    // Parameters
    "parameter": { foreground: c.accentAlt, fontStyle: "italic" },
    "parameter.declaration": { foreground: c.accentAlt, fontStyle: "italic" },

    // Functions
    "function": s.function,
    "function.declaration": { foreground: s.function, fontStyle: "bold" },
    "function.defaultLibrary": { foreground: s.function, fontStyle: "italic" },
    "method": s.function,
    "method.declaration": { foreground: s.function, fontStyle: "bold" },

    // Types & Classes
    "type": s.type,
    "type.declaration": { foreground: s.type, fontStyle: "bold" },
    "type.defaultLibrary": { foreground: s.type, fontStyle: "italic" },
    "class": s.type,
    "class.declaration": { foreground: s.type, fontStyle: "bold" },
    "interface": { foreground: s.type, fontStyle: "italic" },
    "interface.declaration": { foreground: s.type, fontStyle: "bold italic" },
    "enum": s.type,
    "enumMember": s.constant,
    "struct": s.type,
    "typeParameter": { foreground: s.type, fontStyle: "italic" },

    // Properties
    "property": s.variable,
    "property.declaration": s.variable,
    "property.readonly": { foreground: s.constant, fontStyle: "" },

    // Keywords & Modifiers
    "keyword": { foreground: s.keyword, fontStyle: "bold" },
    "modifier": { foreground: s.storage, fontStyle: "italic" },

    // Strings & Numbers
    "string": s.string,
    "number": s.number,
    "regexp": { foreground: s.string, fontStyle: "italic" },

    // Comments
    "comment": { foreground: s.comment, fontStyle: "italic" },
    "comment.documentation": { foreground: s.comment, fontStyle: "italic" },

    // Namespaces & Modules
    "namespace": { foreground: s.type, fontStyle: "" },
    "module": { foreground: s.type, fontStyle: "" },

    // Decorators & Annotations
    "decorator": { foreground: c.accent, fontStyle: "italic" },
    "annotation": { foreground: c.accent, fontStyle: "italic" },

    // Macros
    "macro": { foreground: s.function, fontStyle: "bold" },

    // Labels
    "label": { foreground: c.accentAlt, fontStyle: "" }
  };
}
