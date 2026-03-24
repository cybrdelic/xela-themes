/**
 * XELA Theme Builder
 *
 * Generates complete VS Code theme JSON from palettes.
 * Handles all color mappings, token colors, and semantic highlighting.
 * Includes architectural contrast enforcement to ensure all UI elements
 * meet WCAG accessibility requirements.
 *
 * @module lib/theme-builder
 */

import { adjustColorForContrast, getContrastRatio } from './color-utils.js';

/**
 * WCAG contrast requirements for different element types
 */
const CONTRAST_REQUIREMENTS = {
  AA: 4.5,       // Normal text
  AA_LARGE: 3.0, // Large text (18pt+) and UI components
  UI: 3.0,       // Non-text UI elements
  AAA: 7.0       // Enhanced contrast
};

const FINAL_CONTRAST_PAIRS = [
  ["titleBar.activeBackground", "titleBar.activeForeground"],
  ["activityBar.background", "activityBar.foreground"],
  ["sideBar.background", "sideBar.foreground"],
  ["sideBarSectionHeader.background", "sideBarSectionHeader.foreground"],
  ["statusBar.background", "statusBar.foreground"],
  ["statusBar.debuggingBackground", "statusBar.debuggingForeground"],
  ["panel.background", "panelTitle.activeForeground"],
  ["tab.activeBackground", "tab.activeForeground"],
  ["tab.inactiveBackground", "tab.inactiveForeground"],
  ["editor.background", "editor.foreground"],
  ["editor.background", "editorLineNumber.activeForeground"],
  ["editorWidget.background", "editorWidget.foreground"],
  ["editorHoverWidget.background", "editorWidget.foreground"],
  ["list.activeSelectionBackground", "list.activeSelectionForeground"],
  ["list.inactiveSelectionBackground", "list.inactiveSelectionForeground"],
  ["button.background", "button.foreground"],
  ["button.secondaryBackground", "button.secondaryForeground"],
  ["input.background", "input.foreground"],
  ["badge.background", "badge.foreground"],
  ["activityBarBadge.background", "activityBarBadge.foreground"],
  ["terminal.background", "terminal.foreground"],
  ["notifications.background", "notifications.foreground"],
  ["notificationCenterHeader.background", "notificationCenterHeader.foreground"],
  ["menu.background", "menu.foreground"],
  ["menu.selectionBackground", "menu.selectionForeground"],
  ["quickInput.background", "quickInput.foreground"]
];

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
 * Ensure a foreground color meets contrast requirements against a background
 * @param {string} fg - Foreground color
 * @param {string} bg - Background color
 * @param {number} minContrast - Minimum required contrast ratio
 * @returns {string} Adjusted foreground color that meets contrast
 */
function enforceContrast(fg, bg, minContrast) {
  if (!fg || !bg) return fg;
  const ratio = getContrastRatio(fg, bg);
  if (ratio >= minContrast) return fg;
  return adjustColorForContrast(fg, bg, minContrast);
}

function normalizeFinalContrast(colors) {
  for (const [bgKey, fgKey] of FINAL_CONTRAST_PAIRS) {
    const bg = colors[bgKey];
    const fg = colors[fgKey];
    if (!bg || !fg || bg.length > 7 || fg.length > 7) {
      continue;
    }
    colors[fgKey] = enforceContrast(fg, bg, CONTRAST_REQUIREMENTS.AA);
  }
  return colors;
}

/**
 * Generate a full VS Code theme JSON from a palette
 * @param {Object} palette - Theme palette
 * @param {string} name - Theme display name
 * @returns {Object} Complete VS Code theme JSON object
 */
export function generateThemeJson(palette, name) {
  const { type, colors, syntax, ui } = palette;
  const c = colors;
  // Use UI-specific colors if available, fallback to general colors
  const uiColors = ui || {};

  return normalizeFinalContrast({
    "$schema": "vscode://schemas/color-theme",
    "name": name,
    "type": type,
    "semanticHighlighting": true,
    "colors": buildWorkbenchColors(c, type, uiColors),
    "tokenColors": buildExtendedTokenColors(syntax),
    "semanticTokenColors": buildSemanticTokenColors(palette)
  });
}

/**
 * Build workbench/UI colors from palette
 * All colors are contrast-enforced to meet WCAG requirements
 * @param {Object} c - Color palette
 * @param {string} type - Theme type ('dark' or 'light')
 * @param {Object} ui - UI-specific colors with pre-validated contrast
 * @returns {Object} VS Code workbench colors
 */
function buildWorkbenchColors(c, type, ui = {}) {
  // Compute contrast-safe colors for badges and buttons
  // Badge foreground must have 4.5:1 against accent (badge background)
  const badgeFg = ui.badgeFg || enforceContrast(type === 'dark' ? c.bg : '#FFFFFF', c.accent, CONTRAST_REQUIREMENTS.AA);
  // Button foreground also needs 4.5:1 against accent
  const buttonFg = ui.buttonFg || badgeFg;
  // Cursor needs 3:1 against editor background
  const cursor = ui.cursor || enforceContrast(c.accent, c.bg, CONTRAST_REQUIREMENTS.UI);
  // Line numbers need 3:1 (AA_LARGE) - use fgMuted for safety (4.5:1)
  const lineNumber = ui.lineNumber || enforceContrast(c.fgMuted, c.bg, CONTRAST_REQUIREMENTS.AA_LARGE);
  const lineNumberActive = ui.lineNumberActive || enforceContrast(c.fg, c.bg, CONTRAST_REQUIREMENTS.AA);
  // Placeholder needs 3:1
  const placeholder = ui.placeholder || enforceContrast(c.fgSubtle, c.bg, CONTRAST_REQUIREMENTS.AA_LARGE);
  // Status bar item foregrounds need 4.5:1 against their backgrounds
  const errorFg = enforceContrast('#FFFFFF', c.error, CONTRAST_REQUIREMENTS.AA);
  const warningFg = enforceContrast('#FFFFFF', c.warning, CONTRAST_REQUIREMENTS.AA);
  const remoteFg = enforceContrast('#FFFFFF', c.remote, CONTRAST_REQUIREMENTS.AA);
  const sidebarSectionBg = c.bgAlt || c.bgElevated || c.bg;
  const sidebarSectionFg = enforceContrast(c.fg, sidebarSectionBg, CONTRAST_REQUIREMENTS.AA);
  const widgetBg = c.bgElevated || c.bgAlt || c.bg;
  const widgetFg = enforceContrast(c.fg, widgetBg, CONTRAST_REQUIREMENTS.AA);
  const listActiveBg = c.bgElevated || c.bgAlt || c.bg;
  const listInactiveBg = c.bgAlt || c.bgElevated || c.bg;
  const listFocusBg = c.bgAlt || c.bgElevated || c.bg;
  const listInactiveFg = enforceContrast(c.fg, listInactiveBg, CONTRAST_REQUIREMENTS.AA);
  const listFocusFg = enforceContrast(c.fg, listFocusBg, CONTRAST_REQUIREMENTS.AA);
  const secondaryButtonBg = c.bgAlt || c.bgElevated || c.bg;
  const secondaryButtonFg = enforceContrast(c.fg, secondaryButtonBg, CONTRAST_REQUIREMENTS.AA);
  const menuBg = c.bgElevated || c.bgAlt || c.bg;
  const menuSelectionBg = c.bgAlt || c.bgElevated || c.bg;
  const notificationsBg = c.bgElevated || c.bgAlt || c.bg;
  const notificationsFg = enforceContrast(c.fg, notificationsBg, CONTRAST_REQUIREMENTS.AA);
  const notificationHeaderBg = c.bgAlt || c.bgElevated || c.bg;
  const notificationHeaderFg = enforceContrast(c.fg, notificationHeaderBg, CONTRAST_REQUIREMENTS.AA);

  return {
    // Title bar
    "titleBar.activeBackground": c.bg,
    "titleBar.inactiveBackground": c.bg,
    "titleBar.activeForeground": enforceContrast(c.fgMuted, c.bg, CONTRAST_REQUIREMENTS.AA),
    "titleBar.inactiveForeground": enforceContrast(c.fgSubtle, c.bg, CONTRAST_REQUIREMENTS.AA_LARGE),

    // Activity bar
    "activityBar.background": c.bg,
    "activityBar.foreground": enforceContrast(c.fgMuted, c.bg, CONTRAST_REQUIREMENTS.UI),
    "activityBar.inactiveForeground": enforceContrast(c.fgSubtle, c.bg, CONTRAST_REQUIREMENTS.UI),
    "activityBar.activeBorder": c.accent,
    "activityBarBadge.background": c.accent,
    "activityBarBadge.foreground": badgeFg,

    // Sidebar
    "sideBar.background": c.bg,
    "sideBar.foreground": enforceContrast(c.fgMuted, c.bg, CONTRAST_REQUIREMENTS.AA),
    "sideBar.border": c.borderSubtle,
    "sideBarTitle.foreground": enforceContrast(c.fg, c.bg, CONTRAST_REQUIREMENTS.AA),
    "sideBarSectionHeader.background": sidebarSectionBg,
    "sideBarSectionHeader.foreground": sidebarSectionFg,

    // Status bar
    "statusBar.background": c.bg,
    "statusBar.foreground": enforceContrast(c.fgMuted, c.bg, CONTRAST_REQUIREMENTS.AA),
    "statusBar.border": c.border,
    "statusBar.debuggingBackground": c.accent,
    "statusBar.debuggingForeground": warningFg,
    "statusBarItem.remoteBackground": c.remote,
    "statusBarItem.remoteForeground": remoteFg,
    "statusBarItem.errorBackground": c.error,
    "statusBarItem.errorForeground": errorFg,
    "statusBarItem.warningBackground": c.warning,
    "statusBarItem.warningForeground": warningFg,

    // Editor
    "editor.background": c.bg,
    "editor.foreground": c.fg,
    "editor.lineHighlightBackground": addAlpha(c.bgAlt, '80'),
    "editor.selectionBackground": addAlpha(c.accent, '30'),
    "editor.inactiveSelectionBackground": addAlpha(c.accent, '15'),
    "editor.selectionHighlightBackground": addAlpha(c.accent, '1F'),
    "editor.wordHighlightBackground": addAlpha(c.accentAlt, '24'),
    "editor.wordHighlightStrongBackground": addAlpha(c.accentAlt, '38'),
    "editorCursor.foreground": cursor,
    "editorLineNumber.foreground": lineNumber,
    "editorLineNumber.activeForeground": lineNumberActive,

    // Editor widgets
    "editorWidget.background": widgetBg,
    "editorWidget.foreground": widgetFg,
    "editorWidget.border": c.border,
    "editorHoverWidget.background": widgetBg,
    "editorHoverWidget.foreground": widgetFg,
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
    "editorGutter.addedBackground": c.success,
    "editorGutter.deletedBackground": c.error,
    "editorGutter.modifiedBackground": c.info,

    // Tabs
    "editorGroup.border": c.border,
    "tab.activeBackground": c.bg,
    "tab.inactiveBackground": c.bg,
    "tab.activeForeground": enforceContrast(c.fg, c.bg, CONTRAST_REQUIREMENTS.AA),
    "tab.inactiveForeground": enforceContrast(c.fgSubtle, c.bg, CONTRAST_REQUIREMENTS.AA_LARGE),
    "tab.activeBorderTop": c.accent,
    "tab.hoverBackground": c.bgElevated,
    "editorGroupHeader.tabsBackground": c.bg,
    "editorGroupHeader.tabsBorder": c.border,

    // Panel
    "panel.background": c.bg,
    "panel.border": c.border,
    "panelTitle.activeForeground": enforceContrast(c.fg, c.bg, CONTRAST_REQUIREMENTS.AA),
    "panelTitle.activeBorder": c.accent,
    "panelTitle.inactiveForeground": enforceContrast(c.fgSubtle, c.bg, CONTRAST_REQUIREMENTS.AA_LARGE),

    // Lists
    "list.activeSelectionBackground": listActiveBg,
    "list.activeSelectionForeground": enforceContrast(c.fg, listActiveBg, CONTRAST_REQUIREMENTS.AA),
    "list.inactiveSelectionBackground": listInactiveBg,
    "list.inactiveSelectionForeground": listInactiveFg,
    "list.hoverBackground": addAlpha(c.bgAlt, 'C0'),
    "list.focusBackground": listFocusBg,
    "list.focusForeground": listFocusFg,
    "list.highlightForeground": enforceContrast(c.accent, c.bgElevated, CONTRAST_REQUIREMENTS.AA),
    "list.errorForeground": c.error,
    "list.warningForeground": c.warning,

    // Input
    "input.background": c.bgAlt,
    "input.foreground": enforceContrast(c.fg, c.bgAlt, CONTRAST_REQUIREMENTS.AA),
    "input.border": c.border,
    "input.placeholderForeground": placeholder,
    "inputValidation.errorBorder": c.error,
    "inputValidation.warningBorder": c.warning,
    "inputValidation.infoBorder": c.info,

    // Button
    "button.background": c.accent,
    "button.foreground": buttonFg,
    "button.hoverBackground": c.accentAlt,
    "button.secondaryBackground": secondaryButtonBg,
    "button.secondaryForeground": secondaryButtonFg,

    // Scrollbar
    "scrollbarSlider.background": addAlpha(c.fgSubtle, '25'),
    "scrollbarSlider.hoverBackground": addAlpha(c.fgSubtle, '40'),
    "scrollbarSlider.activeBackground": addAlpha(c.fgSubtle, '60'),

    // Git decorations
    "gitDecoration.addedResourceForeground": enforceContrast(c.success, c.bg, CONTRAST_REQUIREMENTS.AA),
    "gitDecoration.modifiedResourceForeground": enforceContrast(c.info, c.bg, CONTRAST_REQUIREMENTS.AA),
    "gitDecoration.deletedResourceForeground": enforceContrast(c.error, c.bg, CONTRAST_REQUIREMENTS.AA),
    "gitDecoration.untrackedResourceForeground": enforceContrast(c.success, c.bg, CONTRAST_REQUIREMENTS.AA),
    "gitDecoration.ignoredResourceForeground": enforceContrast(c.fgSubtle, c.bg, CONTRAST_REQUIREMENTS.AA_LARGE),
    "gitDecoration.conflictingResourceForeground": enforceContrast(c.error, c.bg, CONTRAST_REQUIREMENTS.AA),

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
    "terminal.foreground": enforceContrast(c.fgMuted, c.bg, CONTRAST_REQUIREMENTS.AA),
    "terminalCursor.foreground": cursor,
    ...buildTerminalColors(c),

    // Notifications
    "notifications.background": notificationsBg,
    "notifications.border": c.border,
    "notifications.foreground": notificationsFg,
    "notificationCenter.border": c.border,
    "notificationCenterHeader.background": notificationHeaderBg,
    "notificationCenterHeader.foreground": notificationHeaderFg,
    "notificationsErrorIcon.foreground": c.error,
    "notificationsWarningIcon.foreground": c.warning,
    "notificationsInfoIcon.foreground": c.info,

    // Quick input
    "quickInput.background": addAlpha(c.bg, 'F8'),
    "quickInput.foreground": enforceContrast(c.fg, c.bg, CONTRAST_REQUIREMENTS.AA),
    "pickerGroup.foreground": enforceContrast(c.accent, c.bg, CONTRAST_REQUIREMENTS.AA),

    // Breadcrumbs
    "breadcrumb.foreground": enforceContrast(c.fgSubtle, c.bg, CONTRAST_REQUIREMENTS.AA_LARGE),
    "breadcrumb.focusForeground": enforceContrast(c.fg, c.bg, CONTRAST_REQUIREMENTS.AA),
    "breadcrumb.activeSelectionForeground": enforceContrast(c.accent, c.bg, CONTRAST_REQUIREMENTS.AA),

    // Badge (general)
    "badge.background": c.accent,
    "badge.foreground": badgeFg,

    // Problems
    "editorError.foreground": c.error,
    "editorWarning.foreground": c.warning,
    "editorInfo.foreground": c.info,
    "problemsErrorIcon.foreground": c.error,
    "problemsWarningIcon.foreground": c.warning,
    "problemsInfoIcon.foreground": c.info,
    "testing.iconFailed": c.error,
    "testing.iconPassed": c.success,

    // Menu
    "menu.background": menuBg,
    "menu.foreground": enforceContrast(c.fg, menuBg, CONTRAST_REQUIREMENTS.AA),
    "menu.selectionBackground": menuSelectionBg,
    "menu.selectionForeground": enforceContrast(c.fg, menuSelectionBg, CONTRAST_REQUIREMENTS.AA),

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
  const terminal = c.terminal || {};

  return {
    "terminal.ansiBlack": terminal.black || c.bg,
    "terminal.ansiRed": terminal.red || c.error,
    "terminal.ansiGreen": terminal.green || c.success,
    "terminal.ansiYellow": terminal.yellow || c.warning,
    "terminal.ansiBlue": terminal.blue || c.info,
    "terminal.ansiMagenta": terminal.magenta || c.accent,
    "terminal.ansiCyan": terminal.cyan || c.accentAlt,
    "terminal.ansiWhite": terminal.white || c.fg,
    "terminal.ansiBrightBlack": terminal.brightBlack || c.fgSubtle,
    "terminal.ansiBrightRed": terminal.brightRed || c.error,
    "terminal.ansiBrightGreen": terminal.brightGreen || c.success,
    "terminal.ansiBrightYellow": terminal.brightYellow || c.warning,
    "terminal.ansiBrightBlue": terminal.brightBlue || c.info,
    "terminal.ansiBrightMagenta": terminal.brightMagenta || c.accentAlt,
    "terminal.ansiBrightCyan": terminal.brightCyan || c.accent,
    "terminal.ansiBrightWhite": terminal.brightWhite || c.fg,
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
      "scope": ["entity.name.tag", "entity.name.tag.html", "entity.name.tag.xml"],
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
