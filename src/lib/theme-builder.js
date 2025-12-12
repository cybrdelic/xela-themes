/**
 * XELA Theme Builder
 *
 * Generates complete VS Code theme JSON from palettes.
 * Handles all color mappings, token colors, and semantic highlighting.
 *
 * @module lib/theme-builder
 */

/**
 * Add alpha channel to hex color (abbreviated format)
 * @param {string} hex - Hex color (6 characters)
 * @param {string} alphaHex - Alpha as 2-char hex string
 * @returns {string} Color with alpha appended
 */
function addAlpha(hex, alphaHex) {
  return hex.slice(0, 7) + alphaHex;
}

/**
 * Generate a full VS Code theme JSON from a palette
 * @param {Object} palette - Theme palette
 * @param {string} name - Theme display name
 * @returns {Object} Complete VS Code theme JSON object
 */
export function generateThemeJson(palette, name) {
  const { type, colors, syntax, terminal } = palette;
  const c = colors;

  return {
    "$schema": "vscode://schemas/color-theme",
    "name": name,
    "type": type,
    "semanticHighlighting": true,
    "colors": buildWorkbenchColors(c, type),
    "tokenColors": buildTokenColors(syntax)
  };
}

/**
 * Build workbench/UI colors from palette
 * @param {Object} c - Color palette
 * @param {string} type - Theme type ('dark' or 'light')
 * @returns {Object} VS Code workbench colors
 */
function buildWorkbenchColors(c, type) {
  const invertedText = type === 'dark' ? c.bg : '#FFFFFF';

  return {
    // Title bar
    "titleBar.activeBackground": c.bg,
    "titleBar.inactiveBackground": c.bg,
    "titleBar.activeForeground": c.fgMuted,
    "titleBar.inactiveForeground": c.fgSubtle,

    // Activity bar
    "activityBar.background": c.bg,
    "activityBar.foreground": c.fgMuted,
    "activityBar.inactiveForeground": c.fgSubtle,
    "activityBar.activeBorder": c.accent,
    "activityBarBadge.background": c.accent,
    "activityBarBadge.foreground": invertedText,

    // Sidebar
    "sideBar.background": c.bg,
    "sideBar.foreground": c.fgMuted,
    "sideBar.border": c.borderSubtle,
    "sideBarTitle.foreground": c.fg,
    "sideBarSectionHeader.foreground": c.accent,

    // Status bar
    "statusBar.background": c.bg,
    "statusBar.foreground": c.fgMuted,
    "statusBar.border": c.border,
    "statusBar.debuggingBackground": c.accent,
    "statusBar.debuggingForeground": invertedText,
    "statusBarItem.remoteBackground": c.remote,
    "statusBarItem.remoteForeground": '#FFFFFF',
    "statusBarItem.errorBackground": c.error,
    "statusBarItem.errorForeground": '#FFFFFF',
    "statusBarItem.warningBackground": c.warning,
    "statusBarItem.warningForeground": '#FFFFFF',

    // Editor
    "editor.background": c.bg,
    "editor.foreground": c.fg,
    "editor.lineHighlightBackground": addAlpha(c.bgAlt, '80'),
    "editor.selectionBackground": addAlpha(c.accent, '30'),
    "editor.inactiveSelectionBackground": addAlpha(c.accent, '15'),
    "editorCursor.foreground": c.accent,
    "editorLineNumber.foreground": c.fgSubtle,
    "editorLineNumber.activeForeground": c.fgMuted,

    // Editor widgets
    "editorWidget.background": c.bgElevated,
    "editorWidget.border": c.border,
    "editorHoverWidget.background": c.bgElevated,
    "editorHoverWidget.border": c.border,

    // Find/replace
    "editor.findMatchBackground": addAlpha(c.accentAlt, '60'),
    "editor.findMatchBorder": c.accentAlt,
    "editor.findMatchHighlightBackground": addAlpha(c.accentAlt, '30'),

    // Brackets
    "editorBracketMatch.background": addAlpha(c.accent, '28'),
    "editorBracketMatch.border": addAlpha(c.accent, '80'),
    "editorBracketHighlight.foreground1": c.accent,
    "editorBracketHighlight.foreground2": c.accentAlt,
    "editorBracketHighlight.foreground3": c.error,
    "editorBracketHighlight.foreground4": c.info,
    "editorBracketHighlight.foreground5": c.success,

    // Tabs
    "tab.activeBackground": c.bg,
    "tab.inactiveBackground": c.bg,
    "tab.activeForeground": c.fg,
    "tab.inactiveForeground": c.fgSubtle,
    "tab.activeBorderTop": c.accent,
    "tab.hoverBackground": c.bgElevated,
    "editorGroupHeader.tabsBackground": c.bg,
    "editorGroupHeader.tabsBorder": c.border,

    // Panel
    "panel.background": c.bg,
    "panel.border": c.border,
    "panelTitle.activeForeground": c.fg,
    "panelTitle.activeBorder": c.accent,
    "panelTitle.inactiveForeground": c.fgSubtle,

    // Lists
    "list.activeSelectionBackground": c.bgElevated,
    "list.activeSelectionForeground": c.fg,
    "list.inactiveSelectionBackground": c.bgAlt,
    "list.hoverBackground": addAlpha(c.bgAlt, 'C0'),
    "list.highlightForeground": c.accent,
    "list.errorForeground": c.error,
    "list.warningForeground": c.warning,

    // Input
    "input.background": c.bgAlt,
    "input.foreground": c.fg,
    "input.border": c.border,
    "input.placeholderForeground": c.fgSubtle,
    "inputValidation.errorBorder": c.error,
    "inputValidation.warningBorder": c.warning,
    "inputValidation.infoBorder": c.info,

    // Button
    "button.background": c.accent,
    "button.foreground": invertedText,
    "button.hoverBackground": c.accentAlt,

    // Scrollbar
    "scrollbarSlider.background": addAlpha(c.fgSubtle, '25'),
    "scrollbarSlider.hoverBackground": addAlpha(c.fgSubtle, '40'),
    "scrollbarSlider.activeBackground": addAlpha(c.fgSubtle, '60'),

    // Git decorations
    "gitDecoration.addedResourceForeground": c.success,
    "gitDecoration.modifiedResourceForeground": c.info,
    "gitDecoration.deletedResourceForeground": c.error,
    "gitDecoration.untrackedResourceForeground": c.success,
    "gitDecoration.conflictingResourceForeground": c.error,

    // Diff editor
    "diffEditor.insertedTextBackground": addAlpha(c.success, '21'),
    "diffEditor.removedTextBackground": addAlpha(c.error, '21'),

    // Minimap
    "minimap.background": c.bg,
    "minimap.selectionHighlight": addAlpha(c.accent, '50'),
    "minimap.errorHighlight": addAlpha(c.error, '99'),
    "minimap.warningHighlight": addAlpha(c.warning, '99'),

    // Terminal
    "terminal.background": c.bg,
    "terminal.foreground": c.fgMuted,
    "terminalCursor.foreground": c.accent,
    ...buildTerminalColors(c),

    // Notifications
    "notifications.background": c.bgElevated,
    "notifications.border": c.border,

    // Quick input
    "quickInput.background": addAlpha(c.bg, 'F8'),
    "quickInput.foreground": c.fg,
    "pickerGroup.foreground": c.accent,

    // Breadcrumbs
    "breadcrumb.foreground": c.fgSubtle,
    "breadcrumb.focusForeground": c.fg,
    "breadcrumb.activeSelectionForeground": c.accent,

    // Problems
    "editorError.foreground": c.error,
    "editorWarning.foreground": c.warning,
    "editorInfo.foreground": c.info,
    "problemsErrorIcon.foreground": c.error,
    "problemsWarningIcon.foreground": c.warning,
    "problemsInfoIcon.foreground": c.info,

    // Focus/selection
    "focusBorder": addAlpha(c.accent, '99'),
    "selection.background": addAlpha(c.accent, '38'),
  };
}

/**
 * Build terminal ANSI colors
 * @param {Object} c - Color palette (with terminal colors)
 * @returns {Object} Terminal color mappings
 */
function buildTerminalColors(c) {
  if (!c.terminal) return {};

  return {
    "terminal.ansiBlack": c.terminal?.black || c.bg,
    "terminal.ansiRed": c.terminal?.red || c.error,
    "terminal.ansiGreen": c.terminal?.green || c.success,
    "terminal.ansiYellow": c.terminal?.yellow || c.warning,
    "terminal.ansiBlue": c.terminal?.blue || c.info,
    "terminal.ansiMagenta": c.terminal?.magenta || c.accent,
    "terminal.ansiCyan": c.terminal?.cyan || c.accentAlt,
    "terminal.ansiWhite": c.terminal?.white || c.fg,
  };
}

/**
 * Build token colors for syntax highlighting
 * @param {Object} syntax - Syntax color definitions
 * @returns {Array} TextMate token color rules
 */
function buildTokenColors(syntax) {
  return [
    {
      "scope": ["comment", "punctuation.definition.comment"],
      "settings": { "foreground": syntax.comment, "fontStyle": "italic" }
    },
    {
      "scope": ["keyword", "keyword.control"],
      "settings": { "foreground": syntax.keyword, "fontStyle": "bold" }
    },
    {
      "scope": ["entity.name.function", "support.function"],
      "settings": { "foreground": syntax.function }
    },
    {
      "scope": ["variable", "meta.definition.variable"],
      "settings": { "foreground": syntax.variable }
    },
    {
      "scope": ["string"],
      "settings": { "foreground": syntax.string }
    },
    {
      "scope": ["constant.numeric"],
      "settings": { "foreground": syntax.number }
    },
    {
      "scope": ["constant.language", "constant.character"],
      "settings": { "foreground": syntax.constant }
    },
    {
      "scope": ["storage.type", "storage.modifier"],
      "settings": { "foreground": syntax.storage }
    },
    {
      "scope": ["entity.name.type", "support.type", "support.class"],
      "settings": { "foreground": syntax.type }
    },
    {
      "scope": ["entity.name.tag"],
      "settings": { "foreground": syntax.keyword }
    },
    {
      "scope": ["entity.other.attribute-name"],
      "settings": { "foreground": syntax.function, "fontStyle": "italic" }
    },
    {
      "scope": ["punctuation", "meta.brace"],
      "settings": { "foreground": syntax.punctuation }
    },
    {
      "scope": ["invalid", "invalid.illegal"],
      "settings": { "foreground": syntax.invalid, "fontStyle": "underline" }
    },
    {
      "scope": ["markup.heading"],
      "settings": { "foreground": syntax.keyword, "fontStyle": "bold" }
    },
    {
      "scope": ["markup.bold"],
      "settings": { "fontStyle": "bold" }
    },
    {
      "scope": ["markup.italic"],
      "settings": { "fontStyle": "italic" }
    },
    {
      "scope": ["markup.underline.link"],
      "settings": { "foreground": syntax.link }
    }
  ];
}

/**
 * Build semantic token colors from palette
 * @param {Object} palette - Full theme palette
 * @returns {Object} Semantic token color rules
 */
export function buildSemanticTokenColors(palette) {
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

/**
 * Build extended token colors with more granular scopes
 * @param {Object} syntax - Syntax colors
 * @param {Object} [options] - Additional options
 * @returns {Array} Extended token color rules
 */
export function buildExtendedTokenColors(syntax, options = {}) {
  const base = buildTokenColors(syntax);

  // Add additional scopes for better highlighting
  const extended = [
    ...base,
    // JavaScript/TypeScript specific
    {
      "scope": ["variable.language.this", "variable.language.super"],
      "settings": { "foreground": syntax.keyword, "fontStyle": "italic" }
    },
    {
      "scope": ["entity.name.class", "entity.name.type.class"],
      "settings": { "foreground": syntax.type }
    },
    {
      "scope": ["entity.name.type.interface"],
      "settings": { "foreground": syntax.type, "fontStyle": "italic" }
    },
    // Import/export
    {
      "scope": ["keyword.control.import", "keyword.control.export"],
      "settings": { "foreground": syntax.keyword }
    },
    // JSON
    {
      "scope": ["support.type.property-name.json"],
      "settings": { "foreground": syntax.variable }
    },
    // CSS
    {
      "scope": ["entity.other.attribute-name.class.css", "entity.other.attribute-name.id.css"],
      "settings": { "foreground": syntax.function }
    },
    {
      "scope": ["support.constant.property-value.css"],
      "settings": { "foreground": syntax.constant }
    },
    // Markdown
    {
      "scope": ["markup.heading.markdown"],
      "settings": { "foreground": syntax.keyword, "fontStyle": "bold" }
    },
    {
      "scope": ["markup.inline.raw.markdown"],
      "settings": { "foreground": syntax.string }
    },
    {
      "scope": ["markup.list.unnumbered.markdown", "markup.list.numbered.markdown"],
      "settings": { "foreground": syntax.punctuation }
    },
    // Regular expressions
    {
      "scope": ["string.regexp"],
      "settings": { "foreground": syntax.string, "fontStyle": "italic" }
    },
    // Documentation
    {
      "scope": ["comment.block.documentation", "comment.block.javadoc"],
      "settings": { "foreground": syntax.comment, "fontStyle": "italic" }
    },
    {
      "scope": ["storage.type.class.jsdoc", "entity.name.type.instance.jsdoc"],
      "settings": { "foreground": syntax.type }
    }
  ];

  return extended;
}
