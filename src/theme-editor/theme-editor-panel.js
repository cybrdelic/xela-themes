/**
 * XELA Theme Editor - Webview Panel
 * Interactive theme customization with color pickers and grouped parameters
 */

import * as vscode from 'vscode';
import { debug } from '../logging.js';

// ============ Inline Color Utilities ============

/**
 * Normalize hex color to 7 characters (#RRGGBB)
 * @param {string} hex - Color to normalize
 * @param {string} [fallback] - Fallback color if invalid (defaults to null)
 * @returns {string|null} Normalized hex or fallback
 */
function normalizeHex(hex, fallback = null) {
  if (!hex || typeof hex !== 'string') {
    if (fallback) return normalizeHex(fallback);
    console.warn('normalizeHex: Invalid input, no fallback provided:', hex);
    return '#000000';
  }
  let h = hex.trim().replace('#', '');
  // Handle 3-char hex
  if (h.length === 3) {
    h = h.split('').map(c => c + c).join('');
  }
  // Handle 8-char hex (with alpha) - strip alpha
  if (h.length === 8) {
    h = h.slice(0, 6);
  }
  // Ensure valid hex
  if (!/^[0-9A-Fa-f]{6}$/.test(h)) {
    if (fallback) return normalizeHex(fallback);
    console.warn('normalizeHex: Invalid hex color, no fallback provided:', hex);
    return '#000000';
  }
  return '#' + h.toUpperCase();
}

/**
 * Convert hex to RGB
 */
function hexToRgb(hex) {
  const clean = normalizeHex(hex);
  const v = clean.replace('#', '');
  const bigint = parseInt(v, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

/**
 * Convert RGB to hex
 */
function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('').toUpperCase();
}

/**
 * Get relative luminance (WCAG)
 */
function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Get contrast ratio between two colors
 */
function getContrastRatio(fg, bg) {
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/**
 * Enforce minimum contrast
 */
function enforceContrast(fg, bg, minContrast) {
  if (!fg || !bg) return fg;
  let ratio = getContrastRatio(fg, bg);
  if (ratio >= minContrast) return fg;

  const bgLum = getLuminance(bg);
  const { r, g, b } = hexToRgb(fg);
  let step = bgLum > 0.5 ? -10 : 10;
  let newFg = fg;

  for (let i = 0; i < 30 && ratio < minContrast; i++) {
    const nr = Math.max(0, Math.min(255, r + step * i));
    const ng = Math.max(0, Math.min(255, g + step * i));
    const nb = Math.max(0, Math.min(255, b + step * i));
    newFg = rgbToHex({ r: nr, g: ng, b: nb });
    ratio = getContrastRatio(newFg, bg);
  }
  return newFg;
}

/**
 * Add alpha to hex color
 */
function withAlpha(hex, alpha) {
  // Ensure we have a clean 7-char hex first
  const clean = normalizeHex(hex);
  const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return clean + alphaHex;
}

// WCAG contrast requirements
const CONTRAST = {
  AA: 4.5,
  AA_LARGE: 3.0,
  UI: 3.0
};

/**
 * Build complete VS Code color customizations from roles
 */
function buildCompleteColors(roles) {
  const r = roles;

  const badgeFg = enforceContrast(r.textInverted, r.accentPrimary, CONTRAST.AA);
  const errorFg = enforceContrast(r.textInverted, r.accentError, CONTRAST.AA);
  const warnFg = enforceContrast(r.textInverted, r.accentWarn, CONTRAST.AA);
  const infoFg = enforceContrast(r.textInverted, r.accentInfo, CONTRAST.AA);
  const successFg = enforceContrast(r.textInverted, r.accentSuccess, CONTRAST.AA);

  const titleBg = r.titleBarBg || r.surface1;

  return {
    // Title Bar - use override if provided
    'titleBar.activeBackground': titleBg,
    'titleBar.inactiveBackground': titleBg,
    'titleBar.activeForeground': enforceContrast(r.textPrimary, titleBg, CONTRAST.AA),
    'titleBar.inactiveForeground': enforceContrast(r.textMuted, titleBg, CONTRAST.AA_LARGE),
    'titleBar.border': r.border,

    // Activity Bar - use override if provided
    'activityBar.background': r.activityBarBg,
    'activityBar.foreground': enforceContrast(r.textPrimary, r.activityBarBg, CONTRAST.UI),
    'activityBar.inactiveForeground': enforceContrast(r.textMuted, r.activityBarBg, CONTRAST.UI),
    'activityBar.border': r.border,
    'activityBar.activeBorder': r.accentPrimary,
    'activityBarBadge.background': r.accentPrimary,
    'activityBarBadge.foreground': badgeFg,

    // Side Bar - use override if provided
    'sideBar.background': r.sidebarBg,
    'sideBar.foreground': enforceContrast(r.textPrimary, r.sidebarBg, CONTRAST.AA),
    'sideBar.border': r.border,
    'sideBar.dropBackground': withAlpha(r.accentPrimary, 0.3),
    'sideBarTitle.foreground': enforceContrast(r.textSecondary, r.sidebarBg, CONTRAST.AA),
    // Accordion / Section Headers
    'sideBarSectionHeader.background': r.surface2,
    'sideBarSectionHeader.foreground': enforceContrast(r.textPrimary, r.surface2, CONTRAST.AA),
    'sideBarSectionHeader.border': r.border,

    // Status Bar - use override if provided
    'statusBar.background': r.statusBarBg,
    'statusBar.foreground': enforceContrast(r.textPrimary, r.statusBarBg, CONTRAST.AA),
    'statusBar.border': r.border,
    'statusBar.noFolderBackground': r.statusBarBg,
    'statusBar.noFolderForeground': enforceContrast(r.textPrimary, r.statusBarBg, CONTRAST.AA),
    'statusBar.debuggingBackground': r.accentWarn,
    'statusBar.debuggingForeground': warnFg,
    'statusBar.debuggingBorder': r.accentWarn,
    'statusBarItem.activeBackground': withAlpha(r.textPrimary, 0.2),
    'statusBarItem.hoverBackground': withAlpha(r.textPrimary, 0.1),
    'statusBarItem.prominentBackground': r.surface2,
    'statusBarItem.prominentForeground': enforceContrast(r.textPrimary, r.surface2, CONTRAST.AA),
    'statusBarItem.prominentHoverBackground': r.surface3,
    'statusBarItem.errorBackground': r.accentError,
    'statusBarItem.errorForeground': errorFg,
    'statusBarItem.warningBackground': r.accentWarn,
    'statusBarItem.warningForeground': warnFg,

    // Panel
    'panel.background': r.panel,
    'panel.border': r.border,
    'panel.dropBorder': r.accentPrimary,
    'panelTitle.activeForeground': enforceContrast(r.textPrimary, r.panel, CONTRAST.AA),
    'panelTitle.activeBorder': r.accentPrimary,
    'panelTitle.inactiveForeground': enforceContrast(r.textSecondary, r.panel, CONTRAST.AA_LARGE),
    'panelInput.border': r.border,
    'panelSection.border': r.border,
    'panelSectionHeader.background': r.surface2,
    'panelSectionHeader.foreground': enforceContrast(r.textPrimary, r.surface2, CONTRAST.AA),
    'panelSectionHeader.border': r.border,

    // Tabs - comprehensive
    'editorGroupHeader.tabsBackground': r.surface2,
    'editorGroupHeader.tabsBorder': r.border,
    'editorGroupHeader.noTabsBackground': r.surface1,
    'editorGroupHeader.border': r.border,
    'editorGroup.border': r.border,
    'editorGroup.dropBackground': withAlpha(r.accentPrimary, 0.3),
    'tab.activeBackground': r.surface0,
    'tab.unfocusedActiveBackground': r.surface0,
    'tab.inactiveBackground': r.surface2,
    'tab.unfocusedInactiveBackground': r.surface2,
    'tab.border': r.border,
    'tab.activeBorder': r.surface0,
    'tab.unfocusedActiveBorder': r.surface0,
    'tab.activeBorderTop': r.accentPrimary,
    'tab.unfocusedActiveBorderTop': withAlpha(r.accentPrimary, 0.5),
    'tab.activeForeground': enforceContrast(r.textPrimary, r.surface0, CONTRAST.AA),
    'tab.unfocusedActiveForeground': enforceContrast(r.textSecondary, r.surface0, CONTRAST.AA),
    'tab.inactiveForeground': enforceContrast(r.textMuted, r.surface2, CONTRAST.AA_LARGE),
    'tab.unfocusedInactiveForeground': enforceContrast(r.textMuted, r.surface2, CONTRAST.AA_LARGE),
    'tab.hoverBackground': r.surface1,
    'tab.unfocusedHoverBackground': r.surface1,
    'tab.hoverForeground': enforceContrast(r.textPrimary, r.surface1, CONTRAST.AA),
    'tab.hoverBorder': r.border,
    'tab.lastPinnedBorder': r.border,

    // Editor
    'editor.background': r.surface0,
    'editor.foreground': r.textPrimary,
    'editor.lineHighlightBackground': r.lineHighlight,
    'editor.selectionBackground': r.accentSelection,
    'editor.selectionHighlightBackground': withAlpha(r.accentPrimary, 0.15),
    'editor.wordHighlightBackground': withAlpha(r.accentInfo, 0.2),
    'editor.findMatchBackground': withAlpha(r.accentWarn, 0.4),
    'editor.findMatchHighlightBackground': withAlpha(r.accentWarn, 0.2),
    'editorCursor.foreground': r.cursorColor,
    'editorLineNumber.foreground': r.textMuted,
    'editorLineNumber.activeForeground': r.textSecondary,
    'editorIndentGuide.background1': withAlpha(r.border, 0.5),
    'editorIndentGuide.activeBackground1': r.border,
    'editorBracketMatch.background': withAlpha(r.accentPrimary, 0.2),
    'editorBracketMatch.border': r.accentPrimary,

    // Lists & Trees (file explorer, outline, etc)
    'list.activeSelectionBackground': r.surface2,
    'list.activeSelectionForeground': enforceContrast(r.textPrimary, r.surface2, CONTRAST.AA),
    'list.activeSelectionIconForeground': enforceContrast(r.textPrimary, r.surface2, CONTRAST.AA),
    'list.inactiveSelectionBackground': withAlpha(r.surface2, 0.5),
    'list.inactiveSelectionForeground': r.textPrimary,
    'list.inactiveSelectionIconForeground': r.textPrimary,
    'list.hoverBackground': withAlpha(r.surface2, 0.7),
    'list.hoverForeground': r.textPrimary,
    'list.focusBackground': r.surface2,
    'list.focusForeground': enforceContrast(r.textPrimary, r.surface2, CONTRAST.AA),
    'list.focusHighlightForeground': r.accentPrimary,
    'list.focusOutline': r.accentPrimary,
    'list.highlightForeground': r.accentPrimary,
    'list.invalidItemForeground': r.accentError,
    'list.errorForeground': r.accentError,
    'list.warningForeground': r.accentWarn,
    'list.filterMatchBackground': withAlpha(r.accentPrimary, 0.3),
    'list.filterMatchBorder': r.accentPrimary,
    'listFilterWidget.background': r.surface2,
    'listFilterWidget.outline': r.border,
    'listFilterWidget.noMatchesOutline': r.accentError,
    'list.deemphasizedForeground': r.textMuted,
    // Tree
    'tree.indentGuidesStroke': r.border,
    'tree.inactiveIndentGuidesStroke': withAlpha(r.border, 0.5),
    'tree.tableColumnsBorder': r.border,
    'tree.tableOddRowsBackground': withAlpha(r.surface2, 0.3),

    // Input
    'input.background': r.surface2,
    'input.border': r.border,
    'input.foreground': r.textPrimary,
    'input.placeholderForeground': r.textMuted,
    'inputOption.activeBorder': r.accentPrimary,
    'inputOption.activeBackground': withAlpha(r.accentPrimary, 0.2),
    'inputOption.activeForeground': r.textPrimary,
    'inputOption.hoverBackground': withAlpha(r.surface2, 0.5),
    'inputValidation.errorBackground': r.surface2,
    'inputValidation.errorBorder': r.accentError,
    'inputValidation.errorForeground': r.textPrimary,
    'inputValidation.infoBackground': r.surface2,
    'inputValidation.infoBorder': r.accentInfo,
    'inputValidation.infoForeground': r.textPrimary,
    'inputValidation.warningBackground': r.surface2,
    'inputValidation.warningBorder': r.accentWarn,
    'inputValidation.warningForeground': r.textPrimary,

    // Dropdown
    'dropdown.background': r.surface2,
    'dropdown.listBackground': r.surface2,
    'dropdown.border': r.border,
    'dropdown.foreground': r.textPrimary,

    // Button
    'button.background': r.accentPrimary,
    'button.foreground': badgeFg,
    'button.hoverBackground': withAlpha(r.accentPrimary, 0.8),
    'button.secondaryBackground': r.surface2,
    'button.secondaryForeground': r.textPrimary,
    'button.secondaryHoverBackground': r.surface3,

    // Badge
    'badge.background': r.accentPrimary,
    'badge.foreground': badgeFg,

    // Scrollbar
    'scrollbarSlider.background': withAlpha(r.textMuted, 0.2),
    'scrollbarSlider.hoverBackground': withAlpha(r.textMuted, 0.35),
    'scrollbarSlider.activeBackground': withAlpha(r.textMuted, 0.5),

    // Terminal - use overrides if provided
    'terminal.background': r.terminalBg,
    'terminal.foreground': r.terminalFg,
    'terminalCursor.foreground': r.terminalCursor,

    // Git colors
    'gitDecoration.addedResourceForeground': r.accentSuccess,
    'gitDecoration.modifiedResourceForeground': r.accentInfo,
    'gitDecoration.deletedResourceForeground': r.accentError,
    'gitDecoration.untrackedResourceForeground': r.accentWarn,
    'gitDecoration.ignoredResourceForeground': r.textMuted,

    // Minimap
    'minimap.background': r.surface0,
    'minimap.selectionHighlight': withAlpha(r.accentPrimary, 0.4),

    // Notifications
    'notifications.background': r.surface2,
    'notifications.foreground': r.textPrimary,
    'notificationLink.foreground': r.accentLink,

    // Quick input
    'quickInput.background': r.surface1,
    'quickInput.foreground': r.textPrimary,
    'quickInputList.focusBackground': r.surface2,
    'quickInputList.focusForeground': enforceContrast(r.textPrimary, r.surface2, CONTRAST.AA),
    'quickInputList.focusIconForeground': enforceContrast(r.textPrimary, r.surface2, CONTRAST.AA),
    'quickInputTitle.background': r.surface2,

    // Peek view
    'peekView.border': r.accentPrimary,
    'peekViewEditor.background': r.surface1,
    'peekViewEditorGutter.background': r.surface1,
    'peekViewEditor.matchHighlightBackground': withAlpha(r.accentWarn, 0.3),
    'peekViewResult.background': r.surface1,
    'peekViewResult.fileForeground': r.textPrimary,
    'peekViewResult.lineForeground': r.textSecondary,
    'peekViewResult.matchHighlightBackground': withAlpha(r.accentWarn, 0.3),
    'peekViewResult.selectionBackground': r.surface2,
    'peekViewResult.selectionForeground': r.textPrimary,
    'peekViewTitle.background': r.surface2,
    'peekViewTitleDescription.foreground': r.textSecondary,
    'peekViewTitleLabel.foreground': r.textPrimary,

    // Diff editor
    'diffEditor.insertedTextBackground': withAlpha(r.accentSuccess, 0.15),
    'diffEditor.removedTextBackground': withAlpha(r.accentError, 0.15),
    'diffEditor.insertedLineBackground': withAlpha(r.accentSuccess, 0.1),
    'diffEditor.removedLineBackground': withAlpha(r.accentError, 0.1),
    'diffEditor.diagonalFill': withAlpha(r.border, 0.5),
    'diffEditor.border': r.border,
    'diffEditorGutter.insertedLineBackground': withAlpha(r.accentSuccess, 0.2),
    'diffEditorGutter.removedLineBackground': withAlpha(r.accentError, 0.2),
    'diffEditorOverview.insertedForeground': r.accentSuccess,
    'diffEditorOverview.removedForeground': r.accentError,

    // Merge editor
    'merge.currentHeaderBackground': withAlpha(r.accentSuccess, 0.3),
    'merge.currentContentBackground': withAlpha(r.accentSuccess, 0.1),
    'merge.incomingHeaderBackground': withAlpha(r.accentInfo, 0.3),
    'merge.incomingContentBackground': withAlpha(r.accentInfo, 0.1),
    'merge.border': r.border,
    'merge.commonHeaderBackground': withAlpha(r.textMuted, 0.3),
    'merge.commonContentBackground': withAlpha(r.textMuted, 0.1),

    // Breadcrumb
    'breadcrumb.background': r.surface1,
    'breadcrumb.foreground': r.textMuted,
    'breadcrumb.focusForeground': r.textPrimary,
    'breadcrumb.activeSelectionForeground': r.textPrimary,
    'breadcrumbPicker.background': r.surface2,

    // Widget
    'editorWidget.background': r.surface2,
    'editorWidget.foreground': r.textPrimary,
    'editorWidget.border': r.border,
    'editorWidget.resizeBorder': r.accentPrimary,
    'editorSuggestWidget.background': r.surface2,
    'editorSuggestWidget.border': r.border,
    'editorSuggestWidget.foreground': r.textPrimary,
    'editorSuggestWidget.highlightForeground': r.accentPrimary,
    'editorSuggestWidget.focusHighlightForeground': r.accentPrimary,
    'editorSuggestWidget.selectedBackground': r.surface3,
    'editorSuggestWidget.selectedForeground': r.textPrimary,
    'editorSuggestWidget.selectedIconForeground': r.textPrimary,
    'editorHoverWidget.background': r.surface2,
    'editorHoverWidget.foreground': r.textPrimary,
    'editorHoverWidget.border': r.border,
    'editorHoverWidget.highlightForeground': r.accentPrimary,
    'editorHoverWidget.statusBarBackground': r.surface3,

    // Editor markers (errors, warnings in gutter)
    'editorError.foreground': r.accentError,
    'editorError.border': r.accentError,
    'editorWarning.foreground': r.accentWarn,
    'editorWarning.border': r.accentWarn,
    'editorInfo.foreground': r.accentInfo,
    'editorInfo.border': r.accentInfo,
    'editorHint.foreground': r.accentSuccess,
    'editorHint.border': r.accentSuccess,
    'problemsErrorIcon.foreground': r.accentError,
    'problemsWarningIcon.foreground': r.accentWarn,
    'problemsInfoIcon.foreground': r.accentInfo,

    // Editor gutter
    'editorGutter.background': r.surface0,
    'editorGutter.modifiedBackground': r.accentInfo,
    'editorGutter.addedBackground': r.accentSuccess,
    'editorGutter.deletedBackground': r.accentError,
    'editorGutter.commentRangeForeground': r.textMuted,
    'editorGutter.commentGlyphForeground': r.textMuted,
    'editorGutter.foldingControlForeground': r.textMuted,

    // Editor overview ruler (right scrollbar decorations)
    'editorOverviewRuler.border': r.border,
    'editorOverviewRuler.background': r.surface0,
    'editorOverviewRuler.findMatchForeground': withAlpha(r.accentWarn, 0.7),
    'editorOverviewRuler.rangeHighlightForeground': withAlpha(r.accentPrimary, 0.5),
    'editorOverviewRuler.selectionHighlightForeground': withAlpha(r.accentPrimary, 0.5),
    'editorOverviewRuler.wordHighlightForeground': withAlpha(r.accentInfo, 0.5),
    'editorOverviewRuler.wordHighlightStrongForeground': withAlpha(r.accentInfo, 0.7),
    'editorOverviewRuler.modifiedForeground': r.accentInfo,
    'editorOverviewRuler.addedForeground': r.accentSuccess,
    'editorOverviewRuler.deletedForeground': r.accentError,
    'editorOverviewRuler.errorForeground': r.accentError,
    'editorOverviewRuler.warningForeground': r.accentWarn,
    'editorOverviewRuler.infoForeground': r.accentInfo,
    'editorOverviewRuler.bracketMatchForeground': r.accentPrimary,

    // Editor ruler (vertical lines)
    'editorRuler.foreground': withAlpha(r.border, 0.5),

    // Editor code lens
    'editorCodeLens.foreground': r.textMuted,

    // Editor lightbulb
    'editorLightBulb.foreground': r.accentWarn,
    'editorLightBulbAutoFix.foreground': r.accentSuccess,

    // Editor bracket highlighting
    'editorBracketHighlight.foreground1': r.accentPrimary,
    'editorBracketHighlight.foreground2': r.accentInfo,
    'editorBracketHighlight.foreground3': r.accentWarn,
    'editorBracketHighlight.foreground4': r.accentSuccess,
    'editorBracketHighlight.foreground5': r.accentPrimaryAlt,
    'editorBracketHighlight.foreground6': r.textSecondary,
    'editorBracketHighlight.unexpectedBracket.foreground': r.accentError,

    // Editor whitespace
    'editorWhitespace.foreground': withAlpha(r.textMuted, 0.3),

    // Editor linked editing
    'editor.linkedEditingBackground': withAlpha(r.accentPrimary, 0.1),

    // Editor folding
    'editor.foldBackground': withAlpha(r.surface2, 0.5),

    // Ruler
    'editorIndentGuide.background': withAlpha(r.border, 0.3),
    'editorIndentGuide.activeBackground': r.border,

    // Selection highlight
    'editor.selectionForeground': r.textPrimary,
    'editor.inactiveSelectionBackground': withAlpha(r.accentSelection, 0.5),

    // Search
    'searchEditor.findMatchBackground': withAlpha(r.accentWarn, 0.3),
    'searchEditor.findMatchBorder': r.accentWarn,
    'searchEditor.textInputBorder': r.border,
    'search.resultsInfoForeground': r.textSecondary,

    // Menu
    'menu.background': r.surface2,
    'menu.foreground': r.textPrimary,
    'menu.selectionBackground': r.surface3,
    'menu.selectionForeground': r.textPrimary,
    'menu.selectionBorder': r.accentPrimary,
    'menu.separatorBackground': r.border,
    'menu.border': r.border,
    'menubar.selectionBackground': r.surface2,
    'menubar.selectionForeground': r.textPrimary,
    'menubar.selectionBorder': r.accentPrimary,

    // Command center (top bar)
    'commandCenter.foreground': r.textPrimary,
    'commandCenter.activeForeground': r.textPrimary,
    'commandCenter.background': r.surface2,
    'commandCenter.activeBackground': r.surface3,
    'commandCenter.border': r.border,
    'commandCenter.inactiveForeground': r.textMuted,
    'commandCenter.inactiveBorder': r.border,
    'commandCenter.activeBorder': r.accentPrimary,

    // Keybinding
    'keybindingLabel.background': r.surface3,
    'keybindingLabel.foreground': r.textPrimary,
    'keybindingLabel.border': r.border,
    'keybindingLabel.bottomBorder': r.border,

    // Keyboard shortcut table
    'keybindingTable.headerBackground': r.surface2,
    'keybindingTable.rowsBackground': r.surface1,

    // Settings editor
    'settings.headerForeground': r.textPrimary,
    'settings.modifiedItemIndicator': r.accentPrimary,
    'settings.dropdownBackground': r.surface2,
    'settings.dropdownForeground': r.textPrimary,
    'settings.dropdownBorder': r.border,
    'settings.dropdownListBorder': r.border,
    'settings.checkboxBackground': r.surface2,
    'settings.checkboxForeground': r.textPrimary,
    'settings.checkboxBorder': r.border,
    'settings.textInputBackground': r.surface2,
    'settings.textInputForeground': r.textPrimary,
    'settings.textInputBorder': r.border,
    'settings.numberInputBackground': r.surface2,
    'settings.numberInputForeground': r.textPrimary,
    'settings.numberInputBorder': r.border,
    'settings.focusedRowBackground': r.surface2,
    'settings.focusedRowBorder': r.accentPrimary,
    'settings.rowHoverBackground': withAlpha(r.surface2, 0.5),
    'settings.sashBorder': r.border,

    // Notifications
    'notificationCenter.border': r.border,
    'notificationCenterHeader.background': r.surface2,
    'notificationCenterHeader.foreground': r.textPrimary,
    'notificationToast.border': r.border,
    'notifications.border': r.border,
    'notificationsErrorIcon.foreground': r.accentError,
    'notificationsWarningIcon.foreground': r.accentWarn,
    'notificationsInfoIcon.foreground': r.accentInfo,

    // Banner
    'banner.background': r.surface2,
    'banner.foreground': r.textPrimary,
    'banner.iconForeground': r.accentPrimary,

    // Extension button
    'extensionButton.prominentBackground': r.accentPrimary,
    'extensionButton.prominentForeground': badgeFg,
    'extensionButton.prominentHoverBackground': withAlpha(r.accentPrimary, 0.8),
    'extensionButton.background': r.surface2,
    'extensionButton.foreground': r.textPrimary,
    'extensionButton.hoverBackground': r.surface3,
    'extensionButton.separator': r.border,
    'extensionBadge.remoteBackground': r.accentInfo,
    'extensionBadge.remoteForeground': infoFg,
    'extensionIcon.starForeground': r.accentWarn,
    'extensionIcon.verifiedForeground': r.accentSuccess,
    'extensionIcon.preReleaseForeground': r.accentWarn,
    'extensionIcon.sponsorForeground': r.accentPrimary,

    // Welcome page
    'welcomePage.background': r.surface0,
    'welcomePage.tileBackground': r.surface1,
    'welcomePage.tileHoverBackground': r.surface2,
    'welcomePage.tileBorder': r.border,
    'welcomePage.progress.background': r.surface2,
    'welcomePage.progress.foreground': r.accentPrimary,
    'walkThrough.embeddedEditorBackground': r.surface1,
    'walkthrough.stepTitle.foreground': r.textPrimary,

    // Source control
    'scm.providerBorder': r.border,

    // Debug toolbar
    'debugToolBar.background': r.surface2,
    'debugToolBar.border': r.border,
    'debugIcon.breakpointForeground': r.accentError,
    'debugIcon.breakpointDisabledForeground': r.textMuted,
    'debugIcon.breakpointUnverifiedForeground': r.accentWarn,
    'debugIcon.breakpointCurrentStackframeForeground': r.accentWarn,
    'debugIcon.breakpointStackframeForeground': r.accentSuccess,
    'debugIcon.startForeground': r.accentSuccess,
    'debugIcon.pauseForeground': r.accentWarn,
    'debugIcon.stopForeground': r.accentError,
    'debugIcon.disconnectForeground': r.accentError,
    'debugIcon.restartForeground': r.accentSuccess,
    'debugIcon.stepOverForeground': r.accentInfo,
    'debugIcon.stepIntoForeground': r.accentInfo,
    'debugIcon.stepOutForeground': r.accentInfo,
    'debugIcon.continueForeground': r.accentSuccess,
    'debugIcon.stepBackForeground': r.accentInfo,
    'debugConsole.infoForeground': r.accentInfo,
    'debugConsole.warningForeground': r.accentWarn,
    'debugConsole.errorForeground': r.accentError,
    'debugConsole.sourceForeground': r.textMuted,
    'debugConsoleInputIcon.foreground': r.accentPrimary,
    'debugTokenExpression.name': r.accentInfo,
    'debugTokenExpression.value': r.textPrimary,
    'debugTokenExpression.string': r.accentSuccess,
    'debugTokenExpression.boolean': r.accentPrimary,
    'debugTokenExpression.number': r.accentWarn,
    'debugTokenExpression.error': r.accentError,
    'debugView.exceptionLabelForeground': errorFg,
    'debugView.exceptionLabelBackground': r.accentError,
    'debugView.stateLabelForeground': r.textPrimary,
    'debugView.stateLabelBackground': r.surface3,
    'debugView.valueChangedHighlight': r.accentWarn,

    // Testing
    'testing.iconFailed': r.accentError,
    'testing.iconErrored': r.accentError,
    'testing.iconPassed': r.accentSuccess,
    'testing.iconQueued': r.textMuted,
    'testing.iconUnset': r.textMuted,
    'testing.iconSkipped': r.accentWarn,
    'testing.runAction': r.accentSuccess,
    'testing.peekBorder': r.accentPrimary,
    'testing.peekHeaderBackground': r.surface2,
    'testing.message.error.decorationForeground': r.accentError,
    'testing.message.error.lineBackground': withAlpha(r.accentError, 0.1),
    'testing.message.info.decorationForeground': r.accentInfo,
    'testing.message.info.lineBackground': withAlpha(r.accentInfo, 0.1),

    // Notebook
    'notebook.editorBackground': r.surface0,
    'notebook.cellBorderColor': r.border,
    'notebook.cellHoverBackground': r.surface1,
    'notebook.cellInsertionIndicator': r.accentPrimary,
    'notebook.cellStatusBarItemHoverBackground': r.surface3,
    'notebook.cellToolbarSeparator': r.border,
    'notebook.focusedCellBackground': r.surface1,
    'notebook.focusedCellBorder': r.accentPrimary,
    'notebook.focusedEditorBorder': r.accentPrimary,
    'notebook.inactiveFocusedCellBorder': r.border,
    'notebook.outputContainerBackgroundColor': r.surface1,
    'notebook.outputContainerBorderColor': r.border,
    'notebook.selectedCellBackground': r.surface1,
    'notebook.selectedCellBorder': r.accentPrimary,
    'notebook.symbolHighlightBackground': withAlpha(r.accentPrimary, 0.2),
    'notebookScrollbarSlider.activeBackground': withAlpha(r.textMuted, 0.5),
    'notebookScrollbarSlider.background': withAlpha(r.textMuted, 0.2),
    'notebookScrollbarSlider.hoverBackground': withAlpha(r.textMuted, 0.35),
    'notebookStatusErrorIcon.foreground': r.accentError,
    'notebookStatusRunningIcon.foreground': r.accentInfo,
    'notebookStatusSuccessIcon.foreground': r.accentSuccess,

    // Charts
    'charts.foreground': r.textPrimary,
    'charts.lines': r.textMuted,
    'charts.red': r.accentError,
    'charts.blue': r.accentInfo,
    'charts.yellow': r.accentWarn,
    'charts.orange': r.accentWarn,
    'charts.green': r.accentSuccess,
    'charts.purple': r.accentPrimaryAlt,

    // Ports (forwarded ports)
    'ports.iconRunningProcessForeground': r.accentSuccess,

    // Comments
    'commentsView.resolvedIcon': r.accentSuccess,
    'commentsView.unresolvedIcon': r.accentWarn,

    // Action bar
    'actionBar.toggledBackground': r.surface3,

    // Simple find widget
    'simpleFindWidget.sashBorder': r.border,

    // Terminal
    'terminal.border': r.border,
    'terminal.selectionBackground': r.terminalSelection,
    'terminal.inactiveSelectionBackground': withAlpha(r.terminalSelection, 0.5),
    'terminal.findMatchBackground': withAlpha(r.accentWarn, 0.4),
    'terminal.findMatchHighlightBackground': withAlpha(r.accentWarn, 0.2),
    'terminal.findMatchBorder': r.accentWarn,
    'terminalCursor.background': r.terminalBg,
    'terminal.dropBackground': withAlpha(r.accentPrimary, 0.3),
    'terminal.tab.activeBorder': r.accentPrimary,
    'terminalCommandDecoration.defaultBackground': r.textMuted,
    'terminalCommandDecoration.successBackground': r.accentSuccess,
    'terminalCommandDecoration.errorBackground': r.accentError,
    'terminalOverviewRuler.cursorForeground': r.terminalCursor,
    'terminalOverviewRuler.findMatchForeground': r.accentWarn,
    // Terminal ANSI colors - use overrides if provided
    'terminal.ansiBlack': r.terminalBlack,
    'terminal.ansiRed': r.terminalRed,
    'terminal.ansiGreen': r.terminalGreen,
    'terminal.ansiYellow': r.terminalYellow,
    'terminal.ansiBlue': r.terminalBlue,
    'terminal.ansiMagenta': r.terminalMagenta,
    'terminal.ansiCyan': r.terminalCyan,
    'terminal.ansiWhite': r.terminalWhite,
    'terminal.ansiBrightBlack': r.textMuted,
    'terminal.ansiBrightRed': r.terminalRed,
    'terminal.ansiBrightGreen': r.terminalGreen,
    'terminal.ansiBrightYellow': r.terminalYellow,
    'terminal.ansiBrightBlue': r.terminalBlue,
    'terminal.ansiBrightMagenta': r.terminalMagenta,
    'terminal.ansiBrightCyan': r.terminalCyan,
    'terminal.ansiBrightWhite': r.terminalWhite,

    // Inline chat
    'inlineChat.background': r.surface2,
    'inlineChat.border': r.border,
    'inlineChat.shadow': withAlpha(r.surface0, 0.5),
    'inlineChatInput.background': r.surface1,
    'inlineChatInput.border': r.border,
    'inlineChatInput.focusBorder': r.accentPrimary,
    'inlineChatInput.placeholderForeground': r.textMuted,
    'inlineChatDiff.inserted': withAlpha(r.accentSuccess, 0.2),
    'inlineChatDiff.removed': withAlpha(r.accentError, 0.2),

    // Chat
    'chat.requestBackground': r.surface1,
    'chat.requestBorder': r.border,

    // Focus border
    'focusBorder': r.focus,

    // Contrast border (high contrast themes)
    'contrastBorder': r.border,
    'contrastActiveBorder': r.accentPrimary,

    // Selection background
    'selection.background': r.accentSelection,

    // Icon foreground
    'icon.foreground': r.textPrimary,

    // Sash (resize handles)
    'sash.hoverBorder': r.accentPrimary,

    // Window
    'window.activeBorder': r.accentPrimary,
    'window.inactiveBorder': r.border,

    // Progress bar
    'progressBar.background': r.accentPrimary
  };
}

/**
 * Manages the Theme Editor webview panel
 */
export class ThemeEditorPanel {
  static currentPanel = undefined;
  static viewType = 'xelaThemeEditor';

  /**
   * @param {vscode.WebviewPanel} panel
   * @param {vscode.ExtensionContext} context
   */
  constructor(panel, context) {
    this._panel = panel;
    this._context = context;
    this._disposables = [];
    this._aiProcessing = false; // BUG 3 FIX: Lock to prevent duplicate AI requests

    // Load saved theme state or use default
    this._themeState = this._loadSavedThemeState();
    this._originalTheme = null;

    // Undo stack for reverting changes
    this._undoStack = [];
    this._maxUndoStack = 20;

    // Set up the webview
    this._panel.webview.html = this._getWebviewContent();

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      message => this._handleMessage(message),
      null,
      this._disposables
    );

    // Handle panel disposal
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  /**
   * Create or show the theme editor panel
   * @param {vscode.ExtensionContext} context
   */
  static createOrShow(context) {
    const column = vscode.ViewColumn.Beside;

    if (ThemeEditorPanel.currentPanel) {
      ThemeEditorPanel.currentPanel._panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      ThemeEditorPanel.viewType,
      'XELA Theme Editor',
      column,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'src', 'theme-editor')]
      }
    );

    ThemeEditorPanel.currentPanel = new ThemeEditorPanel(panel, context);
  }

  /**
   * Get default theme state with simplified grouped parameters
   */
  _getDefaultThemeState() {
    return {
      name: 'My Custom Theme',
      type: 'dark',

      // === SIMPLIFIED GROUPED PARAMETERS ===

      // Background Group (generates surface0, surface1, surface2, surface3, panel)
      backgrounds: {
        base: '#1A1D2E',        // Main editor background
        offset: 8,              // How much lighter/darker other surfaces are (%)
        panelDarker: true       // Whether panel is darker or lighter than base
      },

      // Text Group (generates textPrimary, textSecondary, textMuted)
      text: {
        primary: '#E5E9F0',
        fadeAmount: 15          // How much secondary/muted fade (%)
      },

      // Accent Group (primary accent derives others)
      accents: {
        primary: '#6C8EEF',     // Main accent (buttons, links, focus)
        secondary: '#88C0D0',   // Secondary accent
        useComplementary: true  // Auto-generate info/warn/error/success
      },

      // Semantic Colors (can override auto-generated)
      semantic: {
        info: '#5BA8D9',
        warning: '#EBCB8B',
        error: '#D57780',
        success: '#A3BE8C'
      },

      // UI Chrome
      chrome: {
        border: '#2D3454',
        borderOpacity: 100,
        focusOpacity: 70
      },

      // Syntax Colors
      syntax: {
        keywords: '#C792EA',
        functions: '#82AAFF',
        strings: '#C3E88D',
        numbers: '#F78C6C',
        comments: '#546E7A',
        variables: '#EEFFFF',
        types: '#FFCB6B',
        operators: '#89DDFF'
      },

      // Design System - High-level styling intentions (auto-computes all derived colors)
      design: {
        // Terminal feel: "recessed" (darker/inset), "floating" (lighter), "unified" (same as editor), "contrast" (max contrast)
        terminalStyle: 'recessed',
        // Panel variation: "subtle" (barely different), "distinct" (clearly separate), "bold" (accent-tinted)
        panelVariation: 'subtle',
        // Cursor style: "accent" (uses primary accent), "contrast" (max visibility), "subtle" (blends more)
        cursorStyle: 'accent'
      },

      // UI Chrome Colors (user-customizable overrides)
      chrome: {
        activityBar: null,      // null = auto-computed
        sidebar: null,          // null = auto-computed
        statusBar: null,        // null = auto-computed
        titleBar: null          // null = auto-computed
      },

      // Locked sections - AI will NOT modify these when generating
      locked: {
        backgrounds: false,
        syntax: false,
        accents: false,
        terminal: false,
        chrome: false
      },

      // Conversation history for iterative refinement
      conversationHistory: [],

      // Terminal ANSI colors (user-customizable)
      terminal: {
        red: '#D57780',
        green: '#A3BE8C',
        yellow: '#EBCB8B',
        blue: '#5BA8D9',
        magenta: '#B48EAD',
        cyan: '#56B6C2',
        black: '#1A1D2E',
        white: '#E5E9F0'
      }
    };
  }

  /**
   * Convert simplified state to full roles object
   */
  _stateToRoles(state) {
    const { backgrounds, text, accents, semantic, chrome, design } = state;

    // Normalize all input colors to prevent corruption
    const base = normalizeHex(backgrounds.base);
    const textColor = normalizeHex(text.primary);
    const accentPrimary = normalizeHex(accents.primary);
    const accentSecondary = normalizeHex(accents.secondary);
    const borderColor = normalizeHex(chrome.border);
    const infoColor = normalizeHex(semantic.info);
    const warnColor = normalizeHex(semantic.warning);
    const errorColor = normalizeHex(semantic.error);
    const successColor = normalizeHex(semantic.success);

    // Calculate surface variations
    const offset = (backgrounds.offset || 8) / 100;
    const isDark = state.type === 'dark';

    const adjustBrightness = (hex, amount) => {
      const clean = normalizeHex(hex);
      const r = parseInt(clean.slice(1, 3), 16);
      const g = parseInt(clean.slice(3, 5), 16);
      const b = parseInt(clean.slice(5, 7), 16);

      const adjust = (c) => Math.max(0, Math.min(255, Math.round(c + (255 * amount))));

      return '#' + [r, g, b].map(adjust).map(c => c.toString(16).padStart(2, '0')).join('').toUpperCase();
    };

    const lighten = (hex, amt) => adjustBrightness(hex, amt);
    const darken = (hex, amt) => adjustBrightness(hex, -amt);

    // Mix two colors together (for bold panel style)
    const mixColors = (hex1, hex2, weight) => {
      const c1 = normalizeHex(hex1);
      const c2 = normalizeHex(hex2);
      const r1 = parseInt(c1.slice(1, 3), 16);
      const g1 = parseInt(c1.slice(3, 5), 16);
      const b1 = parseInt(c1.slice(5, 7), 16);
      const r2 = parseInt(c2.slice(1, 3), 16);
      const g2 = parseInt(c2.slice(3, 5), 16);
      const b2 = parseInt(c2.slice(5, 7), 16);
      const r = Math.round(r1 * (1 - weight) + r2 * weight);
      const g = Math.round(g1 * (1 - weight) + g2 * weight);
      const b = Math.round(b1 * (1 - weight) + b2 * weight);
      return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('').toUpperCase();
    };

    // For dark themes: surface1 darker, surface2/3 lighter
    // For light themes: surface1 lighter, surface2/3 darker
    const surface0 = base;
    const surface1 = isDark ? darken(base, offset * 0.5) : lighten(base, offset * 0.5);
    const surface2 = isDark ? lighten(base, offset) : darken(base, offset);
    const surface3 = isDark ? lighten(base, offset * 1.5) : darken(base, offset * 1.5);
    const panel = backgrounds.panelDarker
      ? (isDark ? darken(base, offset * 0.8) : lighten(base, offset * 0.3))
      : (isDark ? lighten(base, offset * 0.3) : darken(base, offset * 0.8));

    // Calculate text variations
    const fadeText = (hex, amount) => {
      const fade = (amount || 15) / 100;
      return adjustBrightness(hex, isDark ? -fade * 0.5 : fade * 0.5);
    };

    const textPrimary = textColor;
    const textSecondary = fadeText(textColor, text.fadeAmount);
    const textMuted = fadeText(textColor, (text.fadeAmount || 15) * 2.5);
    const textInverted = isDark ? '#1A1D2E' : '#FFFFFF';

    // Calculate focus opacity alpha
    const focusOpacity = chrome.focusOpacity || 70;
    const focusAlpha = Math.round(focusOpacity * 2.55).toString(16).padStart(2, '0');

    // ═══════════════════════════════════════════════════════════════════════════
    // DESIGN RULES ENGINE - Automatic good taste
    // ═══════════════════════════════════════════════════════════════════════════
    const terminalStyle = design?.terminalStyle || 'recessed';
    const panelVariation = design?.panelVariation || 'subtle';
    const cursorStyle = design?.cursorStyle || 'accent';

    // Terminal background based on style
    const terminalBgRules = {
      recessed: () => isDark ? darken(base, 0.08) : lighten(base, 0.05),  // Darker/lighter inset look
      floating: () => isDark ? lighten(base, 0.05) : darken(base, 0.03), // Slight lift effect
      unified: () => base,                                                // Same as editor
      contrast: () => isDark ? '#0D0D0D' : '#FAFAFA'                      // Maximum contrast
    };
    const terminalBg = terminalBgRules[terminalStyle]?.() || terminalBgRules.recessed();
    const terminalFg = textPrimary;
    const terminalSelection = withAlpha(accentPrimary, 0.35);
    const terminalCursor = accentPrimary;

    // Panel/sidebar variation based on style
    const panelRules = {
      subtle: () => ({ sidebar: isDark ? darken(base, 0.02) : lighten(base, 0.015), activity: isDark ? darken(base, 0.04) : lighten(base, 0.025) }),
      distinct: () => ({ sidebar: isDark ? darken(base, 0.06) : lighten(base, 0.04), activity: isDark ? darken(base, 0.08) : lighten(base, 0.05) }),
      bold: () => ({ sidebar: mixColors(base, accentPrimary, 0.06), activity: mixColors(base, accentPrimary, 0.1) })
    };
    const panelColors = panelRules[panelVariation]?.() || panelRules.subtle();
    const sidebarBg = panelColors.sidebar;
    const activityBarBg = panelColors.activity;
    const statusBarBg = isDark ? darken(base, 0.05) : lighten(base, 0.03);

    // Cursor style based on preference
    const cursorRules = {
      accent: () => accentPrimary,
      contrast: () => isDark ? '#FFFFFF' : '#000000',
      subtle: () => fadeText(textColor, 20)
    };
    const cursorColor = cursorRules[cursorStyle]?.() || cursorRules.accent();

    // Selection and line highlight
    const selectionBg = withAlpha(accentPrimary, 0.22);
    const lineHighlight = withAlpha(surface2, 0.6);

    // Terminal ANSI colors (derived from semantic with good taste)
    const terminalBlack = isDark ? darken(base, 0.1) : lighten(base, 0.1);
    const terminalWhite = textPrimary;

    // Build full roles
    return {
      surface0,
      surface1,
      surface2,
      surface3,
      panel,
      overlay: withAlpha(surface0, 0.95),
      backdrop: '#00000099',

      border: borderColor,
      focus: accentPrimary + focusAlpha,

      textPrimary,
      textSecondary,
      textMuted,
      textInverted,

      accentPrimary,
      accentPrimaryAlt: accentSecondary,
      accentInfo: infoColor,
      accentWarn: warnColor,
      accentError: errorColor,
      accentSuccess: successColor,
      accentSelection: selectionBg,
      accentLink: accentSecondary,

      // UI overrides - user chrome colors take precedence over computed
      cursorColor,
      lineHighlight,
      activityBarBg: state.uiChrome?.activityBar || activityBarBg,
      sidebarBg: state.uiChrome?.sidebar || sidebarBg,
      statusBarBg: state.uiChrome?.statusBar || statusBarBg,
      titleBarBg: state.uiChrome?.titleBar || surface1,

      // Terminal - use user-customizable ANSI colors
      terminalBg,
      terminalFg,
      terminalCursor,
      terminalSelection,
      terminalBlack: state.terminal?.black || terminalBlack,
      terminalRed: state.terminal?.red || errorColor,
      terminalGreen: state.terminal?.green || successColor,
      terminalYellow: state.terminal?.yellow || warnColor,
      terminalBlue: state.terminal?.blue || infoColor,
      terminalMagenta: state.terminal?.magenta || accentSecondary,
      terminalCyan: state.terminal?.cyan || '#56B6C2',
      terminalWhite: state.terminal?.white || terminalWhite
    };
  }

  /**
   * Convert state to token colors
   */
  _stateToTokens(state) {
    const { syntax, text } = state;
    return {
      comment: syntax.comments,
      keyword: syntax.keywords,
      function: syntax.functions,
      variable: syntax.variables,
      string: syntax.strings,
      number: syntax.numbers,
      constant: syntax.types,
      storage: syntax.keywords,
      type: syntax.types,
      punctuation: syntax.operators,
      invalid: state.semantic.error,
      code: text.primary,
      heading: state.accents.primary,
      h1: syntax.keywords,
      h2: syntax.functions,
      h3: syntax.strings,
      h4: syntax.types,
      h5: syntax.numbers,
      h6: syntax.comments,
      textPrimary: text.primary
    };
  }

  /**
   * Apply theme customizations in real-time and auto-save
   */
  async _applyThemePreview() {
    try {
      debug('=== XELA Theme Editor: Starting _applyThemePreview ===');
      debug('Theme state:', JSON.stringify(this._themeState, null, 2));

      const roles = this._stateToRoles(this._themeState);
      debug('Roles generated:', JSON.stringify(roles, null, 2));

      const colors = buildCompleteColors(roles);
      debug('Colors generated, count:', Object.keys(colors).length);

      const config = vscode.workspace.getConfiguration('workbench');

      // Clear and apply
      await config.update('colorCustomizations', undefined, vscode.ConfigurationTarget.Global);
      await config.update('colorCustomizations', colors, vscode.ConfigurationTarget.Global);

      debug('colorCustomizations applied successfully');

      // Apply token colors
      const syntax = this._themeState.syntax;
      const editorConfig = vscode.workspace.getConfiguration('editor');
      await editorConfig.update('tokenColorCustomizations', undefined, vscode.ConfigurationTarget.Global);
      await editorConfig.update('tokenColorCustomizations', {
        comments: syntax.comments,
        functions: syntax.functions,
        keywords: syntax.keywords,
        strings: syntax.strings,
        types: syntax.types,
        variables: syntax.variables,
        numbers: syntax.numbers,
        textMateRules: [
          { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: syntax.comments, fontStyle: 'italic' } },
          { scope: ['keyword', 'keyword.control', 'keyword.operator.new', 'storage.type', 'storage.modifier'], settings: { foreground: syntax.keywords } },
          { scope: ['entity.name.function', 'support.function', 'meta.function-call', 'variable.function'], settings: { foreground: syntax.functions } },
          { scope: ['string', 'string.quoted', 'string.template', 'punctuation.definition.string'], settings: { foreground: syntax.strings } },
          { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: syntax.numbers } },
          { scope: ['variable', 'variable.other', 'variable.parameter', 'variable.language'], settings: { foreground: syntax.variables } },
          { scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'], settings: { foreground: syntax.types } },
          { scope: ['keyword.operator', 'punctuation.separator', 'punctuation.accessor'], settings: { foreground: syntax.operators } }
        ]
      }, vscode.ConfigurationTarget.Global);

      debug('tokenColorCustomizations applied successfully');
      debug('=== XELA Theme Editor: _applyThemePreview complete ===');

      // Auto-save theme state
      await this._saveThemeState();
    } catch (error) {
      console.error('=== XELA Theme Editor ERROR ===');
      console.error('Error in _applyThemePreview:', error);
      console.error('Stack:', error.stack);
      vscode.window.showErrorMessage(`Theme preview failed: ${error.message}`);
    }
  }

  /**
   * Save theme state to VS Code global storage
   */
  async _saveThemeState() {
    try {
      await this._context.globalState.update('xelaThemeEditorState', this._themeState);
    } catch (e) {
      console.error('Failed to save theme state:', e);
    }
  }

  /**
   * Load theme state from VS Code global storage
   */
  _loadSavedThemeState() {
    const saved = this._context.globalState.get('xelaThemeEditorState');
    if (saved) {
      // Deep merge saved state with defaults to preserve nested properties
      const defaults = this._getDefaultThemeState();
      return this._deepMerge(defaults, saved);
    }
    return this._getDefaultThemeState();
  }

  /**
   * Deep merge two objects (target is mutated)
   */
  _deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this._deepMerge(target[key] || {}, source[key]);
      } else if (source[key] !== undefined) {
        result[key] = source[key];
      }
    }
    return result;
  }

  /**
   * Handle messages from webview
   */
  async _handleMessage(message) {
    switch (message.command) {
      case 'updateColor':
        this._pushUndoState();
        this._updateNestedProperty(this._themeState, message.path, message.value);
        await this._applyThemePreview();
        break;

      case 'updateValue':
        this._pushUndoState();
        this._updateNestedProperty(this._themeState, message.path, message.value);
        await this._applyThemePreview();
        break;

      case 'setThemeType':
        this._pushUndoState();
        this._themeState.type = message.value;
        await this._applyThemePreview();
        break;

      case 'resetTheme':
        this._pushUndoState();
        this._themeState = this._getDefaultThemeState();
        await this._applyThemePreview();
        this._sendStateWithUndo();
        break;

      case 'undo':
        await this._undoLastChange();
        break;

      case 'clearCustomizations':
        const workbenchConfig = vscode.workspace.getConfiguration('workbench');
        const editorConfig = vscode.workspace.getConfiguration('editor');
        await workbenchConfig.update('colorCustomizations', undefined, vscode.ConfigurationTarget.Global);
        await editorConfig.update('tokenColorCustomizations', undefined, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage('Theme customizations cleared');
        break;

      case 'exportTheme':
        await this._exportTheme();
        break;

      case 'saveToVSCode':
        await this._saveToVSCode();
        break;

      case 'loadPreset':
        this._loadPreset(message.preset);
        await this._applyThemePreview();
        this._panel.webview.postMessage({ command: 'stateUpdated', state: this._themeState });
        break;

      case 'getState':
        this._panel.webview.postMessage({ command: 'stateUpdated', state: this._themeState });
        break;

      case 'aiSuggestion':
        await this._processAiSuggestion(message.prompt);
        break;

      case 'updateDesign':
        // Update design object with new style selections
        if (!this._themeState.design) {
          this._themeState.design = { terminalStyle: 'recessed', panelVariation: 'subtle', cursorStyle: 'accent' };
        }
        // Parse "design.terminalStyle" -> "terminalStyle"
        const designProp = message.path?.split('.').pop();
        if (designProp && ['terminalStyle', 'panelVariation', 'cursorStyle'].includes(designProp)) {
          this._themeState.design[designProp] = message.value;
          await this._applyThemePreview();
          this._panel.webview.postMessage({ command: 'stateUpdated', state: this._themeState });
        }
        break;

      case 'updateLock':
        // Update locked sections
        if (!this._themeState.locked) {
          this._themeState.locked = { backgrounds: false, syntax: false, accents: false, terminal: false, chrome: false };
        }
        this._themeState.locked[message.section] = message.locked;
        break;

      case 'updateUiChrome':
        // Update UI chrome override
        if (!this._themeState.uiChrome) {
          this._themeState.uiChrome = {};
        }
        this._themeState.uiChrome[message.key] = message.value;
        await this._applyThemePreview();
        this._sendStateWithComputedChrome();
        break;

      case 'resetUiChrome':
        // Reset UI chrome to auto
        if (this._themeState.uiChrome) {
          delete this._themeState.uiChrome[message.key];
        }
        await this._applyThemePreview();
        this._sendStateWithComputedChrome();
        break;

      case 'applyPalette':
        // Apply imported color palette intelligently
        this._pushUndoState();
        this._applyColorPalette(message.colors);
        await this._applyThemePreview();
        this._sendStateWithUndo();
        break;

      case 'clearConversation':
        // Clear conversation history
        this._themeState.conversationHistory = [];
        break;
    }
  }

  /**
   * Push current state to undo stack
   */
  _pushUndoState() {
    // Deep clone the state
    const snapshot = JSON.parse(JSON.stringify(this._themeState));
    this._undoStack.push(snapshot);

    // Limit stack size
    if (this._undoStack.length > this._maxUndoStack) {
      this._undoStack.shift();
    }

    // Notify UI
    this._panel.webview.postMessage({ command: 'undoAvailable', canUndo: true });
  }

  /**
   * Undo the last change
   */
  async _undoLastChange() {
    if (this._undoStack.length === 0) return;

    this._themeState = this._undoStack.pop();
    await this._applyThemePreview();
    this._sendStateWithUndo();
  }

  /**
   * Send state with undo availability
   */
  _sendStateWithUndo() {
    this._panel.webview.postMessage({
      command: 'stateUpdated',
      state: this._themeState,
      canUndo: this._undoStack.length > 0
    });
  }

  /**
   * Send state with computed chrome colors for UI
   */
  _sendStateWithComputedChrome() {
    const roles = this._stateToRoles(this._themeState);
    const computedChrome = {
      activityBar: roles.activityBarBg,
      sidebar: roles.sidebarBg,
      statusBar: roles.statusBarBg,
      titleBar: roles.surface1
    };
    this._panel.webview.postMessage({
      command: 'stateUpdated',
      state: this._themeState,
      computedChrome
    });
  }

  /**
   * Apply an imported color palette intelligently
   */
  _applyColorPalette(colors) {
    if (!colors || colors.length < 2) return;

    // Sort colors by luminance to detect dark/light
    const getLuminance = (hex) => {
      const r = parseInt(hex.slice(1,3), 16) / 255;
      const g = parseInt(hex.slice(3,5), 16) / 255;
      const b = parseInt(hex.slice(5,7), 16) / 255;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const sorted = [...colors].sort((a, b) => getLuminance(a) - getLuminance(b));
    const darkest = sorted[0];
    const lightest = sorted[sorted.length - 1];
    const midColors = sorted.slice(1, -1);

    // Determine if this is a dark or light palette
    const avgLum = colors.reduce((sum, c) => sum + getLuminance(c), 0) / colors.length;
    const isDark = avgLum < 0.5;

    // Apply intelligently
    this._themeState.type = isDark ? 'dark' : 'light';
    this._themeState.backgrounds.base = isDark ? darkest : lightest;
    this._themeState.text.primary = isDark ? lightest : darkest;

    // Use mid colors for accents and syntax
    if (midColors.length >= 1) this._themeState.accents.primary = midColors[0];
    if (midColors.length >= 2) this._themeState.accents.secondary = midColors[1];
    if (midColors.length >= 3) this._themeState.syntax.keywords = midColors[2];
    if (midColors.length >= 4) this._themeState.syntax.functions = midColors[3];
    if (midColors.length >= 5) this._themeState.syntax.strings = midColors[4];

    // Fill remaining syntax from available colors
    const allMid = midColors.length > 0 ? midColors : colors.slice(1);
    this._themeState.syntax.numbers = allMid[0 % allMid.length];
    this._themeState.syntax.types = allMid[1 % allMid.length];
  }

  /**
   * Update nested property by path
   */
  _updateNestedProperty(obj, path, value) {
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }

  /**
   * Load a preset theme configuration
   */
  _loadPreset(presetName) {
    const presets = {
      'nord': {
        type: 'dark',
        backgrounds: { base: '#2E3440', offset: 8, panelDarker: true },
        text: { primary: '#ECEFF4', fadeAmount: 15 },
        accents: { primary: '#88C0D0', secondary: '#81A1C1', useComplementary: true },
        semantic: { info: '#5E81AC', warning: '#EBCB8B', error: '#BF616A', success: '#A3BE8C' },
        chrome: { border: '#3B4252', borderOpacity: 100, focusOpacity: 70 },
        syntax: {
          keywords: '#81A1C1', functions: '#88C0D0', strings: '#A3BE8C', numbers: '#B48EAD',
          comments: '#616E88', variables: '#D8DEE9', types: '#EBCB8B', operators: '#81A1C1'
        },
        design: { terminalStyle: 'recessed', panelVariation: 'subtle', cursorStyle: 'accent' }
      },
      'monokai': {
        type: 'dark',
        backgrounds: { base: '#272822', offset: 6, panelDarker: true },
        text: { primary: '#F8F8F2', fadeAmount: 20 },
        accents: { primary: '#A6E22E', secondary: '#66D9EF', useComplementary: true },
        semantic: { info: '#66D9EF', warning: '#E6DB74', error: '#F92672', success: '#A6E22E' },
        chrome: { border: '#3E3D32', borderOpacity: 100, focusOpacity: 70 },
        syntax: {
          keywords: '#F92672', functions: '#A6E22E', strings: '#E6DB74', numbers: '#AE81FF',
          comments: '#75715E', variables: '#F8F8F2', types: '#66D9EF', operators: '#F92672'
        },
        design: { terminalStyle: 'unified', panelVariation: 'subtle', cursorStyle: 'accent' }
      },
      'solarized-dark': {
        type: 'dark',
        backgrounds: { base: '#002B36', offset: 5, panelDarker: true },
        text: { primary: '#839496', fadeAmount: 15 },
        accents: { primary: '#268BD2', secondary: '#2AA198', useComplementary: true },
        semantic: { info: '#268BD2', warning: '#B58900', error: '#DC322F', success: '#859900' },
        chrome: { border: '#073642', borderOpacity: 100, focusOpacity: 70 },
        syntax: {
          keywords: '#859900', functions: '#268BD2', strings: '#2AA198', numbers: '#D33682',
          comments: '#586E75', variables: '#839496', types: '#B58900', operators: '#93A1A1'
        },
        design: { terminalStyle: 'unified', panelVariation: 'subtle', cursorStyle: 'accent' }
      },
      'github-light': {
        type: 'light',
        backgrounds: { base: '#FFFFFF', offset: 3, panelDarker: false },
        text: { primary: '#24292E', fadeAmount: 25 },
        accents: { primary: '#0366D6', secondary: '#6F42C1', useComplementary: true },
        semantic: { info: '#0366D6', warning: '#F9A825', error: '#D73A49', success: '#22863A' },
        chrome: { border: '#E1E4E8', borderOpacity: 100, focusOpacity: 50 },
        syntax: {
          keywords: '#D73A49', functions: '#6F42C1', strings: '#032F62', numbers: '#005CC5',
          comments: '#6A737D', variables: '#24292E', types: '#E36209', operators: '#D73A49'
        },
        design: { terminalStyle: 'recessed', panelVariation: 'subtle', cursorStyle: 'accent' }
      },
      'dracula': {
        type: 'dark',
        backgrounds: { base: '#282A36', offset: 7, panelDarker: true },
        text: { primary: '#F8F8F2', fadeAmount: 18 },
        accents: { primary: '#BD93F9', secondary: '#FF79C6', useComplementary: true },
        semantic: { info: '#8BE9FD', warning: '#F1FA8C', error: '#FF5555', success: '#50FA7B' },
        chrome: { border: '#44475A', borderOpacity: 100, focusOpacity: 70 },
        syntax: {
          keywords: '#FF79C6', functions: '#50FA7B', strings: '#F1FA8C', numbers: '#BD93F9',
          comments: '#6272A4', variables: '#F8F8F2', types: '#8BE9FD', operators: '#FF79C6'
        },
        design: { terminalStyle: 'recessed', panelVariation: 'distinct', cursorStyle: 'accent' }
      },
      'github-dark': {
        type: 'dark',
        backgrounds: { base: '#0D1117', offset: 6, panelDarker: true },
        text: { primary: '#C9D1D9', fadeAmount: 20 },
        accents: { primary: '#58A6FF', secondary: '#A371F7', useComplementary: true },
        semantic: { info: '#58A6FF', warning: '#D29922', error: '#F85149', success: '#3FB950' },
        chrome: { border: '#30363D', borderOpacity: 100, focusOpacity: 70 },
        syntax: {
          keywords: '#FF7B72', functions: '#D2A8FF', strings: '#A5D6FF', numbers: '#79C0FF',
          comments: '#8B949E', variables: '#C9D1D9', types: '#FFA657', operators: '#FF7B72'
        },
        design: { terminalStyle: 'recessed', panelVariation: 'subtle', cursorStyle: 'accent' }
      }
    };

    if (presets[presetName]) {
      this._themeState = { ...this._themeState, ...presets[presetName], name: `Custom ${presetName}` };
    }
  }

  /**
   * Save theme to VS Code's theme picker (Preferences > Color Theme)
   */
  async _saveToVSCode() {
    debug('=== _saveToVSCode called ===');
    const path = await import('path');
    const fs = await import('fs');

    // Generate theme filename from name
    const themeName = this._themeState.name || 'My Custom Theme';
    const themeId = `xela-custom-${themeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    const themeFileName = `${themeId}-color-theme.json`;

    debug('Theme name:', themeName);
    debug('Theme filename:', themeFileName);

    // Get the extension path from context
    const extensionPath = this._context.extensionUri.fsPath;
    const themesDir = path.join(extensionPath, 'themes');
    const themeFilePath = path.join(themesDir, themeFileName);

    debug('Extension path:', extensionPath);
    debug('Theme file path:', themeFilePath);

    // Convert state to roles, then build complete colors
    const roles = this._stateToRoles(this._themeState);
    const colors = buildCompleteColors(roles);
    const tokens = this._stateToTokenColors();

    // Create display label with "XELA Custom" prefix
    const displayLabel = `XELA Custom: ${themeName}`;

    const themeJson = {
      name: displayLabel,
      type: this._themeState.type,
      colors: colors,
      tokenColors: tokens
    };

    try {
      // Ensure themes directory exists
      if (!fs.existsSync(themesDir)) {
        fs.mkdirSync(themesDir, { recursive: true });
      }

      // Write the theme file
      fs.writeFileSync(themeFilePath, JSON.stringify(themeJson, null, 2));

      // Update package.json to register the theme
      const packageJsonPath = path.join(extensionPath, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      // Ensure contributes.themes exists
      if (!packageJson.contributes) {
        packageJson.contributes = {};
      }
      if (!packageJson.contributes.themes) {
        packageJson.contributes.themes = [];
      }

      // Check if theme already exists
      const existingIndex = packageJson.contributes.themes.findIndex(
        t => t.path === `./themes/${themeFileName}`
      );

      const themeEntry = {
        label: displayLabel,
        uiTheme: this._themeState.type === 'light' ? 'vs' : 'vs-dark',
        path: `./themes/${themeFileName}`
      };

      if (existingIndex >= 0) {
        packageJson.contributes.themes[existingIndex] = themeEntry;
      } else {
        packageJson.contributes.themes.push(themeEntry);
      }

      // Write updated package.json
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      // Notify user
      const action = await vscode.window.showInformationMessage(
        `Theme "${themeName}" saved! Reload VS Code to see it in the Color Theme picker.`,
        'Reload Window'
      );

      if (action === 'Reload Window') {
        await vscode.commands.executeCommand('workbench.action.reloadWindow');
      }
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to save theme: ${error.message}`);
    }
  }

  /**
   * Convert state to VS Code tokenColors format
   */
  _stateToTokenColors() {
    const syntax = this._themeState.syntax;
    const comments = this._themeState.text.primary;

    // Calculate faded comment color
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const withAlpha = (hex, alpha) => {
      const rgb = hexToRgb(hex);
      if (!rgb) return hex;
      const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
      return `${hex}${a}`;
    };

    return [
      {
        name: 'Comment',
        scope: ['comment', 'punctuation.definition.comment'],
        settings: { foreground: syntax.comments, fontStyle: 'italic' }
      },
      {
        name: 'Keyword',
        scope: ['keyword', 'storage.type', 'storage.modifier'],
        settings: { foreground: syntax.keywords }
      },
      {
        name: 'String',
        scope: ['string', 'string.quoted'],
        settings: { foreground: syntax.strings }
      },
      {
        name: 'Number',
        scope: ['constant.numeric', 'constant.language'],
        settings: { foreground: syntax.numbers }
      },
      {
        name: 'Function',
        scope: ['entity.name.function', 'support.function', 'meta.function-call'],
        settings: { foreground: syntax.functions }
      },
      {
        name: 'Variable',
        scope: ['variable', 'variable.other', 'variable.parameter'],
        settings: { foreground: syntax.variables }
      },
      {
        name: 'Type',
        scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'],
        settings: { foreground: syntax.types }
      },
      {
        name: 'Operator',
        scope: ['keyword.operator', 'punctuation'],
        settings: { foreground: syntax.operators }
      },
      {
        name: 'Property',
        scope: ['variable.other.property', 'support.variable.property', 'meta.object-literal.key'],
        settings: { foreground: syntax.variables }
      },
      {
        name: 'Tag',
        scope: ['entity.name.tag', 'punctuation.definition.tag'],
        settings: { foreground: syntax.keywords }
      },
      {
        name: 'Attribute',
        scope: ['entity.other.attribute-name'],
        settings: { foreground: syntax.functions }
      },
      {
        name: 'Constant',
        scope: ['constant', 'variable.other.constant'],
        settings: { foreground: syntax.numbers }
      }
    ];
  }

  /**
   * Export theme as a config file
   */
  async _exportTheme() {
    const roles = this._stateToRoles(this._themeState);
    const tokens = this._stateToTokens(this._themeState);

    const themeConfig = `/**
 * Theme: ${this._themeState.name}
 * Type: ${this._themeState.type}
 * Generated by XELA Theme Editor
 */

import { withAlpha } from '../roles.js';

export default {
  id: '${this._themeState.name.toLowerCase().replace(/\s+/g, '-')}',
  name: '${this._themeState.name}',
  type: '${this._themeState.type}',
  roles: ${JSON.stringify(roles, null, 4)},
  colorOverrides: {},
  tokens: function(c) {
    return ${JSON.stringify(tokens, null, 6)};
  }
};
`;

    const uri = await vscode.window.showSaveDialog({
      defaultUri: vscode.Uri.file(`xela-${this._themeState.name.toLowerCase().replace(/\s+/g, '-')}.js`),
      filters: { 'JavaScript': ['js'] }
    });

    if (uri) {
      const fs = await import('fs');
      fs.writeFileSync(uri.fsPath, themeConfig);
      vscode.window.showInformationMessage(`Theme exported to ${uri.fsPath}`);
    }
  }

  /**
   * Get webview HTML content
   */
  _getWebviewContent() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>XELA Theme Editor</title>
  <style>
    :root {
      --bg-primary: #1e1e1e;
      --bg-secondary: #252526;
      --bg-tertiary: #2d2d2d;
      --bg-elevated: #333333;
      --text-primary: #cccccc;
      --text-secondary: #9d9d9d;
      --text-muted: #6d6d6d;
      --accent: #0078d4;
      --accent-glow: rgba(0, 120, 212, 0.3);
      --border: #3c3c3c;
      --input-bg: #3c3c3c;
      --success: #4ec9b0;
      --error: #f14c4c;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 13px;
      background: var(--bg-primary);
      color: var(--text-primary);
      padding: 20px;
      line-height: 1.5;
      max-width: 900px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }
    .header h1 { font-size: 20px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
    .header h1 span { font-size: 24px; }
    .header-actions { display: flex; gap: 8px; }

    /* Buttons */
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      transition: all 0.15s ease;
    }
    .btn-primary { background: var(--accent); color: white; }
    .btn-primary:hover { background: #1a8adb; transform: translateY(-1px); }
    .btn-secondary { background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid var(--border); }
    .btn-secondary:hover { background: #404040; }
    .btn-save { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; }
    .btn-save:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); }

    /* Theme Name */
    .theme-name-bar {
      background: var(--bg-secondary);
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid var(--border);
    }
    .theme-name-bar input {
      font-size: 16px;
      font-weight: 600;
      background: transparent;
      border: none;
      color: var(--text-primary);
      flex: 1;
      outline: none;
    }
    .save-indicator { font-size: 11px; color: var(--success); opacity: 0; transition: opacity 0.3s; }

    /* ==================== AI HERO SECTION ==================== */
    .ai-hero {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      border-radius: 16px;
      padding: 28px;
      margin-bottom: 24px;
      border: 1px solid #0f3460;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    .ai-hero-title {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #e94560, #ff6b9d);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .ai-hero-subtitle {
      color: var(--text-secondary);
      margin-bottom: 20px;
      font-size: 14px;
    }
    .ai-input-wrapper {
      position: relative;
      margin-bottom: 16px;
    }
    .ai-input {
      width: 100%;
      padding: 18px 20px;
      padding-right: 120px;
      border: 2px solid #0f3460;
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.4);
      color: var(--text-primary);
      font-size: 15px;
      resize: none;
      min-height: 60px;
      font-family: inherit;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .ai-input:focus {
      outline: none;
      border-color: #e94560;
      box-shadow: 0 0 0 4px rgba(233, 69, 96, 0.15);
    }
    .ai-input::placeholder { color: #6c757d; }
    .ai-submit {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      padding: 12px 24px;
      background: linear-gradient(135deg, #e94560 0%, #c73659 100%);
      border: none;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .ai-submit:hover { transform: translateY(-50%) scale(1.02); box-shadow: 0 4px 16px rgba(233, 69, 96, 0.4); }
    .ai-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: translateY(-50%); }

    .ai-status {
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 13px;
      margin-bottom: 16px;
      display: none;
    }
    .ai-status.loading { display: block; background: rgba(233, 69, 96, 0.1); border: 1px solid rgba(233, 69, 96, 0.3); color: #e94560; }
    .ai-status.success { display: block; background: rgba(78, 201, 176, 0.1); border: 1px solid rgba(78, 201, 176, 0.3); color: var(--success); }
    .ai-status.error { display: block; background: rgba(241, 76, 76, 0.1); border: 1px solid rgba(241, 76, 76, 0.3); color: var(--error); }

    .ai-examples {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .ai-chip {
      padding: 8px 14px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      font-size: 12px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .ai-chip:hover {
      background: rgba(233, 69, 96, 0.2);
      border-color: rgba(233, 69, 96, 0.4);
      color: var(--text-primary);
      transform: translateY(-1px);
    }

    /* ==================== COLLAPSIBLE SECTIONS ==================== */
    .section {
      background: var(--bg-secondary);
      border-radius: 10px;
      margin-bottom: 12px;
      border: 1px solid var(--border);
      overflow: hidden;
    }
    .section-header {
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
      transition: background 0.15s;
    }
    .section-header:hover { background: var(--bg-tertiary); }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-title .icon { font-size: 16px; }
    .section-chevron {
      font-size: 12px;
      color: var(--text-muted);
      transition: transform 0.2s;
    }
    .section.open .section-chevron { transform: rotate(180deg); }
    .section-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    .section.open .section-content { max-height: 1000px; }
    .section-inner { padding: 0 18px 18px 18px; }

    /* ==================== CONTROLS ==================== */
    .control-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-bottom: 16px;
    }
    .control-row:last-child { margin-bottom: 0; }
    .control { display: flex; flex-direction: column; gap: 6px; }
    .control label {
      font-size: 11px;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
    }
    .control-inline { display: flex; align-items: center; gap: 8px; }

    input[type="color"] {
      width: 100%;
      height: 40px;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--input-bg);
      cursor: pointer;
      padding: 3px;
    }
    input[type="color"]::-webkit-color-swatch-wrapper { padding: 3px; }
    input[type="color"]::-webkit-color-swatch { border-radius: 3px; border: none; }

    select, input[type="text"] {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--input-bg);
      color: var(--text-primary);
      font-size: 13px;
      cursor: pointer;
    }
    select:focus, input[type="text"]:focus { outline: none; border-color: var(--accent); }

    input[type="range"] {
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: var(--input-bg);
      outline: none;
      -webkit-appearance: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--accent);
      cursor: pointer;
      border: 2px solid var(--bg-primary);
    }
    .range-value { font-size: 11px; color: var(--text-secondary); text-align: right; }

    /* Toggle Group */
    .toggle-group {
      display: flex;
      background: var(--input-bg);
      border-radius: 6px;
      padding: 3px;
    }
    .toggle-btn {
      flex: 1;
      padding: 8px 16px;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.15s ease;
    }
    .toggle-btn.active { background: var(--accent); color: white; }

    /* Syntax Grid */
    .syntax-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    @media (max-width: 600px) { .syntax-grid { grid-template-columns: repeat(2, 1fr); } }

    /* ==================== CODE PREVIEW ==================== */
    .preview-section {
      background: var(--bg-secondary);
      border-radius: 10px;
      margin-bottom: 12px;
      border: 1px solid var(--border);
      overflow: hidden;
    }
    .preview-header {
      padding: 12px 18px;
      background: var(--bg-tertiary);
      border-bottom: 1px solid var(--border);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .preview-code {
      padding: 20px;
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.6;
      overflow-x: auto;
      background: var(--preview-bg, #1a1d2e);
    }
    .preview-code .comment { color: var(--syntax-comments, #546E7A); font-style: italic; }
    .preview-code .keyword { color: var(--syntax-keywords, #C792EA); }
    .preview-code .function { color: var(--syntax-functions, #82AAFF); }
    .preview-code .string { color: var(--syntax-strings, #C3E88D); }
    .preview-code .number { color: var(--syntax-numbers, #F78C6C); }
    .preview-code .variable { color: var(--syntax-variables, #EEFFFF); }
    .preview-code .type { color: var(--syntax-types, #FFCB6B); }
    .preview-code .operator { color: var(--syntax-operators, #89DDFF); }
    .preview-code .text { color: var(--preview-text, #E5E9F0); }

    /* Quick Presets */
    .presets-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    .preset-chip {
      padding: 6px 14px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.15s;
    }
    .preset-chip:hover { border-color: var(--accent); background: var(--input-bg); }

    /* ==================== LOCK TOGGLES ==================== */
    .section-header-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .lock-toggle {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 4px;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.15s;
      user-select: none;
    }
    .lock-toggle:hover { border-color: var(--accent); }
    .lock-toggle.locked {
      background: linear-gradient(135deg, #EF4444, #DC2626);
      border-color: #DC2626;
      color: white;
    }
    .lock-toggle .lock-icon { font-size: 12px; }

    /* ==================== PALETTE IMPORT ==================== */
    .palette-import {
      background: var(--bg-secondary);
      border: 2px dashed var(--border);
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 12px;
      text-align: center;
    }
    .palette-import:hover { border-color: var(--accent); }
    .palette-import-title {
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--text-primary);
    }
    .palette-import-subtitle {
      font-size: 12px;
      color: var(--text-muted);
      margin-bottom: 12px;
    }
    .palette-input-row {
      display: flex;
      gap: 8px;
    }
    .palette-input {
      flex: 1;
      padding: 10px 14px;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--input-bg);
      color: var(--text-primary);
      font-family: monospace;
      font-size: 12px;
    }
    .palette-input:focus { outline: none; border-color: var(--accent); }
    .palette-btn {
      padding: 10px 20px;
      background: var(--accent);
      border: none;
      border-radius: 6px;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.15s, opacity 0.15s;
    }
    .palette-btn:hover { opacity: 0.9; transform: scale(1.02); }
    .palette-preview {
      display: flex;
      gap: 6px;
      margin-top: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .palette-swatch {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: 2px solid var(--border);
      transition: transform 0.15s;
    }
    .palette-swatch:hover { transform: scale(1.1); }

    /* ==================== CHAT/ITERATIVE MODE ==================== */
    .chat-history {
      max-height: 150px;
      overflow-y: auto;
      margin-bottom: 12px;
      padding: 8px;
      background: var(--bg-tertiary);
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .chat-message {
      padding: 8px 12px;
      margin-bottom: 6px;
      border-radius: 6px;
      font-size: 13px;
    }
    .chat-message:last-child { margin-bottom: 0; }
    .chat-message.user {
      background: var(--accent);
      color: white;
      margin-left: 20%;
    }
    .chat-message.ai {
      background: var(--bg-secondary);
      color: var(--text-primary);
      margin-right: 20%;
    }
    .chat-clear {
      font-size: 11px;
      color: var(--text-muted);
      cursor: pointer;
      text-decoration: underline;
    }
    .chat-clear:hover { color: var(--text-primary); }

    /* ==================== UI CHROME SECTION ==================== */
    .chrome-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    @media (max-width: 600px) { .chrome-grid { grid-template-columns: repeat(2, 1fr); } }
    .chrome-control {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .chrome-control label {
      font-size: 11px;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .chrome-auto-badge {
      font-size: 9px;
      padding: 2px 6px;
      background: var(--bg-tertiary);
      border-radius: 3px;
      color: var(--text-muted);
    }
    .chrome-color-row {
      display: flex;
      gap: 6px;
    }
    .chrome-color-input {
      flex: 1;
      height: 36px;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--input-bg);
      cursor: pointer;
      padding: 2px;
    }
    .chrome-reset-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.15s;
    }
    .chrome-reset-btn:hover { background: var(--input-bg); border-color: var(--accent); }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <h1><span>🎨</span> XELA Theme Editor</h1>
    <div class="header-actions">
      <button class="btn btn-secondary" id="undoBtn" onclick="undoLastChange()" disabled title="Undo last change">↩️ Undo</button>
      <button class="btn btn-secondary" onclick="resetTheme()">Reset</button>
      <button class="btn btn-secondary" onclick="exportTheme()">Export</button>
      <button class="btn btn-save" onclick="saveToVSCode()">💾 Save Theme</button>
    </div>
  </div>

  <!-- Theme Name -->
  <div class="theme-name-bar">
    <input type="text" id="themeName" value="My Custom Theme" onchange="updateThemeName(this.value)" placeholder="Theme Name">
    <span class="save-indicator" id="saveIndicator">✓ Saved</span>
  </div>

  <!-- ==================== AI HERO ==================== -->
  <div class="ai-hero">
    <div class="ai-hero-title">✨ AI Theme Generator</div>
    <div class="ai-hero-subtitle">Describe your perfect theme and let AI create it for you</div>
    <div class="ai-input-wrapper">
      <textarea id="aiInput" class="ai-input" placeholder="Try: &quot;Windows XP Luna blue&quot; or &quot;dark cyberpunk with neon pink&quot; or &quot;cozy coffee shop vibes&quot;" rows="2"></textarea>
      <button class="ai-submit" id="aiApplyBtn" onclick="applyAiSuggestion()">Generate ✨</button>
    </div>
    <div style="margin: 12px 0; text-align: center;">
      <button onclick="surpriseMe()" style="padding: 10px 24px; background: linear-gradient(135deg, #F59E0B, #EF4444, #8B5CF6, #06B6D4); border: none; border-radius: 20px; color: white; font-weight: 600; cursor: pointer; font-size: 14px; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 20px rgba(139,92,246,0.4)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">🎲 Surprise Me!</button>
    </div>
    <div id="chatHistory" class="chat-history" style="display: none;"></div>
    <div id="aiStatus" class="ai-status"></div>
    <div class="ai-examples">
      <span class="ai-chip" onclick="setAiExample('Windows XP Luna blue theme')">Windows XP</span>
      <span class="ai-chip" onclick="setAiExample('dark cyberpunk with neon pink and cyan')">Cyberpunk</span>
      <span class="ai-chip" onclick="setAiExample('cozy coffee shop warm browns')">Coffee Shop</span>
      <span class="ai-chip" onclick="setAiExample('ocean blue and teal, calm vibes')">Ocean</span>
      <span class="ai-chip" onclick="setAiExample('retro 80s synthwave purple and pink')">Synthwave</span>
      <span class="ai-chip" onclick="setAiExample('forest green nature theme')">Forest</span>
      <span class="ai-chip" onclick="setAiExample('minimal black and white high contrast')">Minimal B&W</span>
      <span class="ai-chip" onclick="setAiExample('soft pastel colors easy on eyes')">Soft Pastels</span>
      <span class="ai-chip" onclick="setAiExample('Discord blurple dark theme')">Discord</span>
      <span class="ai-chip" onclick="setAiExample('GitHub dark dimmed')">GitHub Dark</span>
    </div>
  </div>

  <!-- Palette Import -->
  <div class="palette-import">
    <div class="palette-import-title">🎨 Import Color Palette</div>
    <div class="palette-import-subtitle">Paste colors from Coolors, Adobe Color, or any comma-separated hex codes</div>
    <div class="palette-input-row">
      <input type="text" class="palette-input" id="paletteInput" placeholder="#2E3440, #88C0D0, #BF616A, #A3BE8C, #EBCB8B" onkeyup="previewPalette(this.value)">
      <button class="palette-btn" onclick="applyPalette()">Apply</button>
    </div>
    <div class="palette-preview" id="palettePreview"></div>
  </div>

  <!-- Live Preview -->
  <div class="preview-section">
    <div class="preview-header">📝 Live Preview</div>
    <div class="preview-code" id="codePreview">
<span class="comment">// Your theme preview updates live!</span>
<span class="keyword">function</span> <span class="function">createTheme</span>(<span class="variable">name</span><span class="operator">:</span> <span class="type">string</span>) {
  <span class="keyword">const</span> <span class="variable">colors</span> <span class="operator">=</span> <span class="number">42</span>;
  <span class="keyword">return</span> <span class="string">"Hello, "</span> <span class="operator">+</span> <span class="variable">name</span>;
}
    </div>
  </div>

  <!-- ==================== COLLAPSIBLE SECTIONS ==================== -->

  <!-- Quick Settings (Open by default) -->
  <div class="section open" id="section-quick">
    <div class="section-header" onclick="toggleSection('quick')">
      <span class="section-title"><span class="icon">⚡</span> Quick Settings</span>
      <span class="section-chevron">▼</span>
    </div>
    <div class="section-content">
      <div class="section-inner">
        <div class="control-row">
          <div class="control">
            <label>Theme Type</label>
            <div class="toggle-group">
              <button class="toggle-btn active" data-type="dark" onclick="setThemeType('dark')">🌙 Dark</button>
              <button class="toggle-btn" data-type="light" onclick="setThemeType('light')">☀️ Light</button>
            </div>
          </div>
          <div class="control">
            <label>Base Background</label>
            <input type="color" id="backgrounds.base" value="#1A1D2E" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Primary Accent</label>
            <input type="color" id="accents.primary" value="#6C8EEF" onchange="updateColor(this)">
          </div>
        </div>
        <div class="presets-row">
          <span class="preset-chip" onclick="loadPreset('nord')">Nord</span>
          <span class="preset-chip" onclick="loadPreset('dracula')">Dracula</span>
          <span class="preset-chip" onclick="loadPreset('monokai')">Monokai</span>
          <span class="preset-chip" onclick="loadPreset('solarized-dark')">Solarized</span>
          <span class="preset-chip" onclick="loadPreset('github-dark')">GitHub Dark</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Design Style (NEW!) -->
  <div class="section open" id="section-design">
    <div class="section-header" onclick="toggleSection('design')">
      <span class="section-title"><span class="icon">🎯</span> Design Style</span>
      <span class="section-chevron">▼</span>
    </div>
    <div class="section-content">
      <div class="section-inner">
        <div class="control-row">
          <div class="control">
            <label>Terminal Feel</label>
            <select id="design.terminalStyle" onchange="updateDesign(this)">
              <option value="recessed">Recessed (darker/inset)</option>
              <option value="floating">Floating (lighter/lifted)</option>
              <option value="unified">Unified (same as editor)</option>
              <option value="contrast">Contrast (max black/white)</option>
            </select>
          </div>
          <div class="control">
            <label>Panel Variation</label>
            <select id="design.panelVariation" onchange="updateDesign(this)">
              <option value="subtle">Subtle (barely different)</option>
              <option value="distinct">Distinct (clearly separate)</option>
              <option value="bold">Bold (accent tinted)</option>
            </select>
          </div>
          <div class="control">
            <label>Cursor Style</label>
            <select id="design.cursorStyle" onchange="updateDesign(this)">
              <option value="accent">Accent (uses primary color)</option>
              <option value="contrast">Contrast (max visibility)</option>
              <option value="subtle">Subtle (blends more)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- UI Chrome (NEW - direct control over VS Code areas) -->
  <div class="section" id="section-chrome">
    <div class="section-header" onclick="toggleSection('chrome')">
      <span class="section-title"><span class="icon">🖼️</span> UI Chrome</span>
      <span class="section-header-controls">
        <span class="lock-toggle" id="lock-chrome" onclick="event.stopPropagation(); toggleLock('chrome')">
          <span class="lock-icon">🔓</span> Lock
        </span>
      </span>
      <span class="section-chevron">▼</span>
    </div>
    <div class="section-content">
      <div class="section-inner">
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Override auto-computed colors. Click 🔄 to reset to auto.</p>
        <div class="chrome-grid">
          <div class="chrome-control">
            <label>Activity Bar <span class="chrome-auto-badge" id="activityBar-auto">AUTO</span></label>
            <div class="chrome-color-row">
              <input type="color" class="chrome-color-input" id="uiChrome.activityBar" value="#1A1D2E" onchange="updateUiChrome(this)">
              <button class="chrome-reset-btn" onclick="resetUiChrome('activityBar')" title="Reset to auto">🔄</button>
            </div>
          </div>
          <div class="chrome-control">
            <label>Sidebar <span class="chrome-auto-badge" id="sidebar-auto">AUTO</span></label>
            <div class="chrome-color-row">
              <input type="color" class="chrome-color-input" id="uiChrome.sidebar" value="#1A1D2E" onchange="updateUiChrome(this)">
              <button class="chrome-reset-btn" onclick="resetUiChrome('sidebar')" title="Reset to auto">🔄</button>
            </div>
          </div>
          <div class="chrome-control">
            <label>Status Bar <span class="chrome-auto-badge" id="statusBar-auto">AUTO</span></label>
            <div class="chrome-color-row">
              <input type="color" class="chrome-color-input" id="uiChrome.statusBar" value="#1A1D2E" onchange="updateUiChrome(this)">
              <button class="chrome-reset-btn" onclick="resetUiChrome('statusBar')" title="Reset to auto">🔄</button>
            </div>
          </div>
          <div class="chrome-control">
            <label>Title Bar <span class="chrome-auto-badge" id="titleBar-auto">AUTO</span></label>
            <div class="chrome-color-row">
              <input type="color" class="chrome-color-input" id="uiChrome.titleBar" value="#1A1D2E" onchange="updateUiChrome(this)">
              <button class="chrome-reset-btn" onclick="resetUiChrome('titleBar')" title="Reset to auto">🔄</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Colors (Collapsed by default) -->
  <div class="section" id="section-colors">
    <div class="section-header" onclick="toggleSection('colors')">
      <span class="section-title"><span class="icon">🎨</span> Colors</span>
      <span class="section-header-controls">
        <span class="lock-toggle" id="lock-backgrounds" onclick="event.stopPropagation(); toggleLock('backgrounds')">
          <span class="lock-icon">🔓</span> Lock
        </span>
      </span>
      <span class="section-chevron">▼</span>
    </div>
    <div class="section-content">
      <div class="section-inner">
        <div class="control-row">
          <div class="control">
            <label>Background</label>
            <input type="color" id="colors.backgrounds.base" value="#1A1D2E" onchange="updateColorAlias(this, 'backgrounds.base')">
          </div>
          <div class="control">
            <label>Surface Offset: <span class="range-value" id="backgrounds.offset-val">8%</span></label>
            <input type="range" id="backgrounds.offset" min="2" max="20" value="8" onchange="updateValue(this)">
          </div>
          <div class="control">
            <label>Primary Text</label>
            <input type="color" id="text.primary" value="#E5E9F0" onchange="updateColor(this)">
          </div>
        </div>
        <div class="control-row">
          <div class="control">
            <label>Primary Accent</label>
            <input type="color" id="colors.accents.primary" value="#6C8EEF" onchange="updateColorAlias(this, 'accents.primary')">
          </div>
          <div class="control">
            <label>Secondary Accent</label>
            <input type="color" id="accents.secondary" value="#88C0D0" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Border Color</label>
            <input type="color" id="chrome.border" value="#2D3454" onchange="updateColor(this)">
          </div>
        </div>
        <div class="control-row">
          <div class="control">
            <label>Info</label>
            <input type="color" id="semantic.info" value="#5BA8D9" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Warning</label>
            <input type="color" id="semantic.warning" value="#EBCB8B" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Error</label>
            <input type="color" id="semantic.error" value="#D57780" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Success</label>
            <input type="color" id="semantic.success" value="#A3BE8C" onchange="updateColor(this)">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Syntax Highlighting (Collapsed by default) -->
  <div class="section" id="section-syntax">
    <div class="section-header" onclick="toggleSection('syntax')">
      <span class="section-title"><span class="icon">🔤</span> Syntax Highlighting</span>
      <span class="section-header-controls">
        <span class="lock-toggle" id="lock-syntax" onclick="event.stopPropagation(); toggleLock('syntax')">
          <span class="lock-icon">🔓</span> Lock
        </span>
      </span>
      <span class="section-chevron">▼</span>
    </div>
    <div class="section-content">
      <div class="section-inner">
        <div class="syntax-grid">
          <div class="control">
            <label>Keywords</label>
            <input type="color" id="syntax.keywords" value="#C792EA" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Functions</label>
            <input type="color" id="syntax.functions" value="#82AAFF" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Strings</label>
            <input type="color" id="syntax.strings" value="#C3E88D" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Numbers</label>
            <input type="color" id="syntax.numbers" value="#F78C6C" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Comments</label>
            <input type="color" id="syntax.comments" value="#546E7A" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Variables</label>
            <input type="color" id="syntax.variables" value="#EEFFFF" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Types</label>
            <input type="color" id="syntax.types" value="#FFCB6B" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Operators</label>
            <input type="color" id="syntax.operators" value="#89DDFF" onchange="updateColor(this)">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Terminal ANSI Colors (Collapsed by default) -->
  <div class="section" id="section-terminal">
    <div class="section-header" onclick="toggleSection('terminal')">
      <span class="section-title"><span class="icon">💻</span> Terminal Colors</span>
      <span class="section-header-controls">
        <span class="lock-toggle" id="lock-terminal" onclick="event.stopPropagation(); toggleLock('terminal')">
          <span class="lock-icon">🔓</span> Lock
        </span>
      </span>
      <span class="section-chevron">▼</span>
    </div>
    <div class="section-content">
      <div class="section-inner">
        <div class="syntax-grid">
          <div class="control">
            <label>Red</label>
            <input type="color" id="terminal.red" value="#D57780" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Green</label>
            <input type="color" id="terminal.green" value="#A3BE8C" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Yellow</label>
            <input type="color" id="terminal.yellow" value="#EBCB8B" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Blue</label>
            <input type="color" id="terminal.blue" value="#5BA8D9" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Magenta</label>
            <input type="color" id="terminal.magenta" value="#B48EAD" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Cyan</label>
            <input type="color" id="terminal.cyan" value="#56B6C2" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>Black</label>
            <input type="color" id="terminal.black" value="#1A1D2E" onchange="updateColor(this)">
          </div>
          <div class="control">
            <label>White</label>
            <input type="color" id="terminal.white" value="#E5E9F0" onchange="updateColor(this)">
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const vscode = acquireVsCodeApi();

    // Toggle collapsible sections
    function toggleSection(name) {
      const section = document.getElementById('section-' + name);
      section.classList.toggle('open');
    }

    // Update color and preview
    function updateColor(input) {
      vscode.postMessage({ command: 'updateColor', path: input.id, value: input.value });
      updatePreviewColors();
    }

    // Update color with aliased path (for duplicate controls)
    function updateColorAlias(input, path) {
      vscode.postMessage({ command: 'updateColor', path: path, value: input.value });
      updatePreviewColors();
    }

    function updateValue(input) {
      let value = input.value;
      if (input.type === 'range') {
        value = parseInt(input.value);
        const valSpan = document.getElementById(input.id + '-val');
        if (valSpan) valSpan.textContent = value + '%';
      }
      vscode.postMessage({ command: 'updateValue', path: input.id, value: value });
    }

    function updateDesign(input) {
      vscode.postMessage({ command: 'updateDesign', path: input.id, value: input.value });
    }

    function setThemeType(type) {
      document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
      });
      vscode.postMessage({ command: 'setThemeType', value: type });
    }

    function resetTheme() {
      if (confirm('Reset all theme settings to defaults?')) {
        vscode.postMessage({ command: 'resetTheme' });
      }
    }
    function exportTheme() { vscode.postMessage({ command: 'exportTheme' }); }
    function saveToVSCode() { vscode.postMessage({ command: 'saveToVSCode' }); }
    function loadPreset(preset) { vscode.postMessage({ command: 'loadPreset', preset }); }
    function updateThemeName(name) {
      vscode.postMessage({ command: 'updateValue', path: 'name', value: name });
      showSavedIndicator();
    }

    // Undo functionality
    function undoLastChange() {
      vscode.postMessage({ command: 'undo' });
    }

    function updateUndoButton(canUndo) {
      const btn = document.getElementById('undoBtn');
      if (btn) btn.disabled = !canUndo;
    }

    // AI Functions
    function setAiExample(text) { document.getElementById('aiInput').value = text; }

    // Surprise Me - random creative prompts
    function surpriseMe() {
      const surprises = [
        'vaporwave aesthetic with pink and cyan gradients',
        'Matrix green on black hacker terminal',
        'sunset over the ocean warm oranges and deep blues',
        'cyberpunk neon city at night',
        'cozy fireplace warm amber and brown',
        'Arctic aurora borealis greens and purples',
        'vintage typewriter sepia tones',
        'tropical rainforest lush greens',
        'space nebula deep purples and cosmic blues',
        'cherry blossom soft pink Japanese aesthetic',
        'steampunk brass and copper industrial',
        'underwater coral reef vibrant colors',
        'noir detective black and white with red accent',
        'cotton candy pastel pink and blue',
        'volcanic lava orange and black dramatic',
        'zen garden minimal earth tones',
        'disco 70s funky colors',
        'ice kingdom frozen blues and whites',
        'autumn forest warm reds and oranges',
        'neon Tokyo street signs at night',
        'old paper and ink scholarly aesthetic',
        'bubblegum pop bright playful colors',
        'midnight jazz club smoky blues',
        'solar eclipse dark with golden corona',
        'enchanted forest mystical greens and purples'
      ];
      const randomPrompt = surprises[Math.floor(Math.random() * surprises.length)];
      document.getElementById('aiInput').value = randomPrompt;
      applyAiSuggestion();
    }

    function applyAiSuggestion() {
      const input = document.getElementById('aiInput').value.trim();
      if (!input) return;
      const btn = document.getElementById('aiApplyBtn');
      const status = document.getElementById('aiStatus');
      btn.disabled = true;
      btn.textContent = '⏳ Creating...';
      status.className = 'ai-status loading';
      status.textContent = '🔍 Starting...';
      status.style.display = 'block';

      // Add to chat history for iterative refinement
      addToChatHistory('user', input);

      vscode.postMessage({ command: 'aiSuggestion', prompt: input });
    }

    // ==================== LOCK FEATURE ====================
    const lockedSections = { backgrounds: false, syntax: false, accents: false, terminal: false, chrome: false };

    function toggleLock(section) {
      lockedSections[section] = !lockedSections[section];
      const toggle = document.getElementById('lock-' + section);
      if (toggle) {
        toggle.classList.toggle('locked', lockedSections[section]);
        toggle.querySelector('.lock-icon').textContent = lockedSections[section] ? '🔒' : '🔓';
      }
      vscode.postMessage({ command: 'updateLock', section, locked: lockedSections[section] });
    }

    function updateLockUI(locked) {
      Object.entries(locked || {}).forEach(([section, isLocked]) => {
        lockedSections[section] = isLocked;
        const toggle = document.getElementById('lock-' + section);
        if (toggle) {
          toggle.classList.toggle('locked', isLocked);
          toggle.querySelector('.lock-icon').textContent = isLocked ? '🔒' : '🔓';
        }
      });
    }

    // ==================== PALETTE IMPORT ====================
    function previewPalette(input) {
      const preview = document.getElementById('palettePreview');
      const colors = parsePaletteInput(input);
      preview.innerHTML = colors.map(c =>
        '<div class="palette-swatch" style="background: ' + c + ';" title="' + c + '"></div>'
      ).join('');
    }

    function parsePaletteInput(input) {
      // Handle Coolors URLs, comma-separated, space-separated
      if (input.includes('coolors.co')) {
        const match = input.match(/([0-9a-f]{6}[\\-]?)+/i);
        if (match) return match[0].split('-').map(c => '#' + c.toUpperCase());
      }
      // Extract all hex colors
      const hexPattern = /#?([0-9A-Fa-f]{6})/g;
      const matches = [...input.matchAll(hexPattern)];
      return matches.map(m => '#' + m[1].toUpperCase());
    }

    function applyPalette() {
      const input = document.getElementById('paletteInput').value;
      const colors = parsePaletteInput(input);
      if (colors.length < 2) {
        alert('Please provide at least 2 colors!');
        return;
      }
      vscode.postMessage({ command: 'applyPalette', colors });
    }

    // ==================== UI CHROME CONTROLS ====================
    function updateUiChrome(input) {
      const key = input.id.replace('uiChrome.', '');
      document.getElementById(key + '-auto').textContent = '';
      vscode.postMessage({ command: 'updateUiChrome', key, value: input.value });
    }

    function resetUiChrome(key) {
      document.getElementById(key + '-auto').textContent = 'AUTO';
      vscode.postMessage({ command: 'resetUiChrome', key });
    }

    function updateChromeUI(uiChrome, computedChrome) {
      ['activityBar', 'sidebar', 'statusBar', 'titleBar'].forEach(key => {
        const input = document.getElementById('uiChrome.' + key);
        const badge = document.getElementById(key + '-auto');
        if (input && computedChrome) {
          const hasOverride = uiChrome && uiChrome[key];
          input.value = hasOverride ? uiChrome[key] : (computedChrome[key] || '#1A1D2E');
          if (badge) badge.textContent = hasOverride ? '' : 'AUTO';
        }
      });
    }

    // ==================== CHAT HISTORY (Iterative Refinement) ====================
    let chatHistory = [];

    function addToChatHistory(role, message) {
      chatHistory.push({ role, message });
      renderChatHistory();
    }

    function renderChatHistory() {
      const container = document.getElementById('chatHistory');
      if (chatHistory.length === 0) {
        container.style.display = 'none';
        return;
      }
      container.style.display = 'block';
      container.innerHTML = chatHistory.slice(-6).map(m =>
        '<div class="chat-message ' + m.role + '">' + escapeHtml(m.message) + '</div>'
      ).join('') + '<span class="chat-clear" onclick="clearChatHistory()">Clear history</span>';
    }

    function clearChatHistory() {
      chatHistory = [];
      renderChatHistory();
      vscode.postMessage({ command: 'clearConversation' });
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function showSavedIndicator() {
      const indicator = document.getElementById('saveIndicator');
      indicator.style.opacity = '1';
      setTimeout(() => { indicator.style.opacity = '0'; }, 2000);
    }

    // Update the preview panel with current colors
    function updatePreviewColors() {
      const preview = document.getElementById('codePreview');
      const bg = document.getElementById('backgrounds.base')?.value || '#1A1D2E';
      const text = document.getElementById('text.primary')?.value || '#E5E9F0';

      preview.style.setProperty('--preview-bg', bg);
      preview.style.setProperty('--preview-text', text);
      preview.style.setProperty('--syntax-keywords', document.getElementById('syntax.keywords')?.value || '#C792EA');
      preview.style.setProperty('--syntax-functions', document.getElementById('syntax.functions')?.value || '#82AAFF');
      preview.style.setProperty('--syntax-strings', document.getElementById('syntax.strings')?.value || '#C3E88D');
      preview.style.setProperty('--syntax-numbers', document.getElementById('syntax.numbers')?.value || '#F78C6C');
      preview.style.setProperty('--syntax-comments', document.getElementById('syntax.comments')?.value || '#546E7A');
      preview.style.setProperty('--syntax-variables', document.getElementById('syntax.variables')?.value || '#EEFFFF');
      preview.style.setProperty('--syntax-types', document.getElementById('syntax.types')?.value || '#FFCB6B');
      preview.style.setProperty('--syntax-operators', document.getElementById('syntax.operators')?.value || '#89DDFF');
    }

    // Update UI from state
    function updateUI(state) {
      function setInput(path, value) {
        const input = document.getElementById(path);
        if (!input) return;
        if (input.type === 'color') input.value = value;
        else if (input.type === 'range') {
          input.value = value;
          const valSpan = document.getElementById(path + '-val');
          if (valSpan) valSpan.textContent = value + '%';
        } else if (input.tagName === 'SELECT') input.value = value;
      }

      // Backgrounds & Text
      setInput('backgrounds.base', state.backgrounds?.base);
      setInput('colors.backgrounds.base', state.backgrounds?.base); // Alias in Colors section
      setInput('backgrounds.offset', state.backgrounds?.offset);
      setInput('text.primary', state.text?.primary);
      setInput('text.fadeAmount', state.text?.fadeAmount);

      // Accents
      setInput('accents.primary', state.accents?.primary);
      setInput('colors.accents.primary', state.accents?.primary); // Alias in Colors section
      setInput('accents.secondary', state.accents?.secondary);

      // Semantic
      setInput('semantic.info', state.semantic?.info);
      setInput('semantic.warning', state.semantic?.warning);
      setInput('semantic.error', state.semantic?.error);
      setInput('semantic.success', state.semantic?.success);

      // Chrome
      setInput('chrome.border', state.chrome?.border);
      setInput('chrome.focusOpacity', state.chrome?.focusOpacity);

      // Syntax
      if (state.syntax) {
        Object.keys(state.syntax).forEach(key => setInput('syntax.' + key, state.syntax[key]));
      }

      // Design
      if (state.design) {
        setInput('design.terminalStyle', state.design.terminalStyle);
        setInput('design.panelVariation', state.design.panelVariation);
        setInput('design.cursorStyle', state.design.cursorStyle);
      }

      // Terminal ANSI colors
      if (state.terminal) {
        setInput('terminal.red', state.terminal.red);
        setInput('terminal.green', state.terminal.green);
        setInput('terminal.yellow', state.terminal.yellow);
        setInput('terminal.blue', state.terminal.blue);
        setInput('terminal.magenta', state.terminal.magenta);
        setInput('terminal.cyan', state.terminal.cyan);
        setInput('terminal.black', state.terminal.black);
        setInput('terminal.white', state.terminal.white);
      }

      // Lock toggles
      if (state.locked) {
        updateLockUI(state.locked);
      }

      // UI Chrome overrides
      if (state.uiChrome !== undefined || state.computedChrome) {
        updateChromeUI(state.uiChrome, state.computedChrome);
      }

      // Theme type toggle
      document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === state.type);
      });

      // Theme name
      const nameInput = document.getElementById('themeName');
      if (nameInput && state.name) nameInput.value = state.name;

      // Update preview
      updatePreviewColors();
    }

    // Handle messages from extension
    window.addEventListener('message', event => {
      const message = event.data;

      if (message.command === 'stateUpdated') {
        updateUI(message.state);
        if (message.canUndo !== undefined) {
          updateUndoButton(message.canUndo);
        }
      }
      if (message.command === 'showSaved') {
        showSavedIndicator();
      }
      if (message.command === 'undoAvailable') {
        updateUndoButton(message.canUndo);
      }
      if (message.command === 'aiProgress') {
        const status = document.getElementById('aiStatus');
        status.className = 'ai-status loading';
        status.style.display = 'block';
        status.textContent = message.message;
      }
      if (message.command === 'aiStatus') {
        const btn = document.getElementById('aiApplyBtn');
        const status = document.getElementById('aiStatus');
        btn.disabled = false;
        btn.textContent = 'Generate ✨';
        status.className = message.success ? 'ai-status success' : 'ai-status error';
        status.textContent = (message.success ? '✅ ' : '❌ ') + (message.message || 'Done');

        // Add AI response to chat history
        if (message.success) {
          addToChatHistory('ai', '✅ Theme updated!');
        }

        setTimeout(() => {
          status.style.opacity = '0';
          setTimeout(() => { status.style.display = 'none'; status.style.opacity = '1'; }, 300);
        }, 5000);
      }
    });

    // Request initial state
    vscode.postMessage({ command: 'getState' });
    updatePreviewColors();
  </script>
</body>
</html>`;
  }

  /**
   * Process AI suggestion using VS Code Language Model API
   */
  async _processAiSuggestion(prompt) {
    // BUG 3 FIX: Prevent duplicate requests with a lock
    if (this._aiProcessing) {
      this._panel.webview.postMessage({
        command: 'aiStatus',
        success: false,
        message: 'Already processing a request. Please wait.'
      });
      return;
    }
    this._aiProcessing = true;

    try {
      // Send initial status
      this._panel.webview.postMessage({
        command: 'aiProgress',
        message: '🔍 Finding AI model...'
      });

      // Try to find any available language model
      let model = null;

      // Check if vscode.lm API exists
      if (vscode.lm && vscode.lm.selectChatModels) {
        // Try different model selectors in order of preference
        const selectors = [
          { vendor: 'copilot' },                    // GitHub Copilot
          { family: 'gpt-4o' },                     // GPT-4o
          { family: 'gpt-4' },                      // GPT-4
          { family: 'gpt-3.5-turbo' },              // GPT-3.5
          { family: 'claude-3-5-sonnet' },          // Claude 3.5
          { family: 'claude' },                     // Any Claude
          {},                                        // Any available model
        ];

        for (const selector of selectors) {
          try {
            const models = await vscode.lm.selectChatModels(selector);
            if (models && models.length > 0) {
              model = models[0];
              debug('Found AI model:', model.id, model.vendor, model.family);
              break;
            }
          } catch (e) {
            // Continue trying other selectors
          }
        }
      }

      if (!model) {
        this._panel.webview.postMessage({
          command: 'aiStatus',
          success: false,
          message: 'No AI model available. Please install GitHub Copilot to use AI theme generation.'
        });
        return;
      }

      this._panel.webview.postMessage({
        command: 'aiProgress',
        message: '🧠 AI is analyzing your request...'
      });

      // Build the system prompt with WCAG accessibility guidelines
      const systemPrompt = `You are an ELITE VS Code theme designer. Your themes win Awwwards. They get featured on Product Hunt. Developers switch to them and never look back.

🎯 YOUR MISSION: Create ICONIC, UNFORGETTABLE themes that are both visually stunning AND highly functional for 8+ hour coding sessions.

═══════════════════════════════════════════════════════════════════
⚠️ CRITICAL - INTERPRETING USER REQUESTS:
═══════════════════════════════════════════════════════════════════

When users reference BRANDS, ERAS, SOFTWARE, GAMES, or CULTURAL ICONS, you MUST:
1. Research your knowledge of that reference's ACTUAL color palette
2. Extract the SIGNATURE COLORS that define that reference
3. Create a theme that EVOKES that reference authentically

Examples of proper interpretation:
- "Windows XP" → Luna blue (#0A246A, #245EDC), silver (#D4D0C8), green start button (#3C8A3C)
- "Mac OS 9" → Platinum grey (#CCCCCC), system purple (#663399), finder blue
- "Ubuntu" → Aubergine purple (#2C001E), Ubuntu orange (#E95420)
- "Matrix" → Black background, neon green (#00FF41) rain effect
- "Cyberpunk" → Hot pink (#FF2079), electric cyan (#00FFFF), dark purple
- "Barbie" → Hot pink (#FF69B4), white accents, playful pastels
- "Minecraft" → Grass green, dirt brown, sky blue, blocky simplicity
- "Spotify" → Black (#121212), Spotify green (#1DB954)
- "Discord" → Blurple (#5865F2), dark grey (#36393F)
- "VS Code Dark+" → That specific blue-grey dark theme everyone knows
- "GitHub Dark" → Charcoal with subtle blue accents
- "90s web" → Teal, purple, bright colors, that geocities vibe
- "Terminal/CLI" → Black/dark green background, bright green text

DO NOT default to pure white or generic colors when given a specific reference!
The user expects colors that MATCH what they asked for.

═══════════════════════════════════════════════════════════════════
DESIGN PHILOSOPHY - What makes a theme ICONIC:
═══════════════════════════════════════════════════════════════════

1. STRONG IDENTITY: Every iconic theme has a clear visual story
   - Dracula = Gothic luxury with purple royalty
   - Nord = Arctic frost, Scandinavian minimalism
   - Monokai = Neon nightlife, 80s arcade energy
   - Solarized = Scientific precision, lab-tested harmony

2. EMOTIONAL RESONANCE: Colors evoke feelings
   - Deep blues/purples = Focus, calm, late-night coding
   - Warm ambers/oranges = Energy, creativity, warmth
   - Greens/teals = Nature, growth, freshness
   - Neutrals with pops = Sophistication, professionalism

3. VISUAL HIERARCHY: Guide the eye naturally
   - Background recedes, content advances
   - Keywords POP, variables are steady
   - Strings feel "contained", comments feel "whispered"
   - Errors SCREAM, success reassures

═══════════════════════════════════════════════════════════════════
ACCESSIBILITY (Non-negotiable - WCAG 2.1 AA):
═══════════════════════════════════════════════════════════════════
- Text contrast: minimum 4.5:1 (aim for 7:1 for comfort)
- Dark themes: text #D0D0D0 or lighter
- Light themes: text #333333 or darker
- NO pure white on pure black (causes halation)
- Comments: still readable at 4.5:1, use desaturated tone
- ALL syntax colors must be distinguishable by non-colorblind users

═══════════════════════════════════════════════════════════════════
COLOR THEORY - Professional techniques:
═══════════════════════════════════════════════════════════════════
- 60-30-10 RULE: 60% dominant (bg), 30% secondary, 10% accent
- TEMPERATURE: Consistent warm OR cool, don't mix randomly
- SATURATION: Keep syntax colors at similar saturation levels
- Pick ONE signature color that defines the theme's identity
- Use split-complementary for accent pairs (more sophisticated than complementary)

═══════════════════════════════════════════════════════════════════
SYNTAX COLOR RELATIONSHIPS:
═══════════════════════════════════════════════════════════════════
- Keywords: The BOLDEST, most distinctive color (theme signature)
- Functions: Action-oriented, energetic - often secondary accent
- Strings: Warm or contained feel (greens, oranges, or theme complement)
- Numbers/Constants: Cool precision (blues, purples, teals)
- Comments: Desaturated version of text OR subtle theme tint
- Variables: Neutral but readable - close to primary text
- Types: Important but stable - often cyan/teal family
- Operators: Subtle, don't compete - often matches keywords at lower intensity

Based on the user's description, output ONLY a valid JSON object. Use this structure (include only properties to change):

{
  "type": "dark" or "light",
  "backgrounds": {
    "base": "#HEXCOLOR",
    "offset": 5-15,
    "panelDarker": true/false
  },
  "text": {
    "primary": "#HEXCOLOR",
    "fadeAmount": 10-30
  },
  "accents": {
    "primary": "#HEXCOLOR",
    "secondary": "#HEXCOLOR"
  },
  "semantic": {
    "info": "#HEXCOLOR",
    "warning": "#HEXCOLOR",
    "error": "#HEXCOLOR",
    "success": "#HEXCOLOR"
  },
  "chrome": {
    "border": "#HEXCOLOR",
    "focusOpacity": 50-100
  },
  "syntax": {
    "keywords": "#HEXCOLOR",
    "functions": "#HEXCOLOR",
    "strings": "#HEXCOLOR",
    "numbers": "#HEXCOLOR",
    "comments": "#HEXCOLOR",
    "variables": "#HEXCOLOR",
    "types": "#HEXCOLOR",
    "operators": "#HEXCOLOR"
  },
  "design": {
    "terminalStyle": "recessed" | "floating" | "unified" | "contrast",
    "panelVariation": "subtle" | "distinct" | "bold",
    "cursorStyle": "accent" | "contrast" | "subtle"
  }
}

DESIGN SYSTEM EXPLAINED:
- terminalStyle: "recessed" = darker/inset terminal (RECOMMENDED DEFAULT), "floating" = lighter/lifted, "unified" = same as editor, "contrast" = maximum black/white
- panelVariation: "subtle" = barely different sidebar/activity bar (default), "distinct" = clearly separate, "bold" = tinted with accent color
- cursorStyle: "accent" = uses primary accent (default), "contrast" = pure white/black for max visibility, "subtle" = blends more

The system AUTOMATICALLY computes terminal colors, sidebar, activity bar, status bar, cursor, and all derived colors with good taste. You only pick the STYLE, not individual colors.

OUTPUT ONLY THE JSON. No explanations, no markdown, just the JSON object.`;

      // Build locked sections instruction
      const locked = this._themeState.locked || {};
      const lockedSections = Object.entries(locked)
        .filter(([_, isLocked]) => isLocked)
        .map(([section]) => section);

      let lockedInstruction = '';
      if (lockedSections.length > 0) {
        lockedInstruction = `\n\n🔒 LOCKED SECTIONS (DO NOT MODIFY THESE):\n${lockedSections.join(', ')}\nThe user has locked these sections. Do NOT include them in your JSON response. Only change the unlocked sections.`;
      }

      // Build conversation history for iterative refinement
      const history = this._themeState.conversationHistory || [];
      let historyContext = '';
      if (history.length > 0) {
        historyContext = '\n\n📜 CONVERSATION HISTORY (for context):\n' +
          history.slice(-4).map(h => `${h.role === 'user' ? 'User' : 'AI'}: ${h.message}`).join('\n');
      }

      // Add current prompt to history
      if (!this._themeState.conversationHistory) {
        this._themeState.conversationHistory = [];
      }
      this._themeState.conversationHistory.push({ role: 'user', message: prompt });
      // Keep only last 10 messages
      if (this._themeState.conversationHistory.length > 10) {
        this._themeState.conversationHistory = this._themeState.conversationHistory.slice(-10);
      }

      const messages = [
        vscode.LanguageModelChatMessage.User(systemPrompt),
        vscode.LanguageModelChatMessage.User(`Current theme state:\n${JSON.stringify(this._themeState, null, 2)}${historyContext}${lockedInstruction}`),
        vscode.LanguageModelChatMessage.User(`User request: "${prompt}"

⚠️ IMPORTANT: If this references a BRAND, OS, APP, GAME, or ERA - use AUTHENTIC colors from that reference!
- Do NOT use generic white/black backgrounds unless that's actually authentic to the reference
- Research your knowledge of what "${prompt}" actually LOOKS like
- The background.base color is THE MOST IMPORTANT - get it right!
${lockedSections.length > 0 ? '\n🔒 Remember: Do NOT modify locked sections: ' + lockedSections.join(', ') : ''}
Output ONLY valid JSON. Ensure WCAG AA contrast (4.5:1 minimum for text).`)
      ];

      this._panel.webview.postMessage({
        command: 'aiProgress',
        message: '✨ Generating colors...'
      });

      // BUG 8 FIX: Add timeout for AI request
      const timeoutMs = 60000; // 60 second timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('AI request timed out. Please try again.')), timeoutMs);
      });

      const response = await Promise.race([
        model.sendRequest(messages, { temperature: 0.9 }),  // Higher temperature for creativity
        timeoutPromise
      ]);

      // Stream the response
      let fullResponse = '';
      this._panel.webview.postMessage({
        command: 'aiProgress',
        message: '🎨 Receiving response...'
      });

      for await (const chunk of response.text) {
        fullResponse += chunk;
      }

      this._panel.webview.postMessage({
        command: 'aiProgress',
        message: '🔧 Processing colors...'
      });

      // BUG 1 FIX: Better JSON parsing with proper error handling
      let changes;
      try {
        // Try to find JSON object - use non-greedy match to find first complete object
        const jsonMatch = fullResponse.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        changes = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Raw response:', fullResponse);
        throw new Error('AI returned an invalid response. Please try rephrasing your request.');
      }

      debug('Parsed changes:', JSON.stringify(changes, null, 2));

      // BUG 2 FIX: Validate AI response before applying
      const validationErrors = this._validateAiChanges(changes);
      if (validationErrors.length > 0) {
        console.warn('AI response validation warnings:', validationErrors);
        // Auto-fix invalid values instead of failing
        this._sanitizeAiChanges(changes);
      }

      // BUG 10 FIX: Use AI-generated name if provided, otherwise generate one
      const themeName = changes.name || this._generateThemeName(prompt);
      changes.name = themeName;

      this._panel.webview.postMessage({
        command: 'aiProgress',
        message: `🎯 Applying "${themeName}"...`
      });

      // Save current state for undo before applying AI changes
      this._pushUndoState();

      // Apply changes to theme state
      this._applyAiChanges(changes);

      debug('AI changes applied to state:', JSON.stringify(this._themeState, null, 2));

      // Apply to VS Code and update UI
      await this._applyThemePreview();
      debug('Theme preview applied');

      this._sendStateWithUndo();
      this._panel.webview.postMessage({
        command: 'aiStatus',
        success: true,
        message: `"${themeName}" applied and saved!`
      });
      this._panel.webview.postMessage({ command: 'showSaved' });

    } catch (error) {
      console.error('AI suggestion error:', error);
      // BUG 9 FIX: Sanitize error messages for users
      const userMessage = this._sanitizeErrorMessage(error.message);
      this._panel.webview.postMessage({
        command: 'aiStatus',
        success: false,
        message: userMessage
      });
    } finally {
      // BUG 3 FIX: Always release the lock
      this._aiProcessing = false;
    }
  }

  /**
   * BUG 2 FIX: Validate AI-generated changes
   */
  _validateAiChanges(changes) {
    const errors = [];

    // Validate hex colors
    const validateHex = (value, path) => {
      if (value && typeof value === 'string' && !value.match(/^#[0-9A-Fa-f]{3,8}$/)) {
        errors.push(`Invalid hex color at ${path}: ${value}`);
        return false;
      }
      return true;
    };

    // Validate numeric ranges
    const validateRange = (value, min, max, path) => {
      if (value !== undefined && (typeof value !== 'number' || value < min || value > max)) {
        errors.push(`Invalid value at ${path}: ${value} (expected ${min}-${max})`);
        return false;
      }
      return true;
    };

    // Check backgrounds
    if (changes.backgrounds) {
      validateHex(changes.backgrounds.base, 'backgrounds.base');
      validateRange(changes.backgrounds.offset, 1, 30, 'backgrounds.offset');
    }

    // Check text
    if (changes.text) {
      validateHex(changes.text.primary, 'text.primary');
      validateRange(changes.text.fadeAmount, 5, 50, 'text.fadeAmount');
    }

    // Check accents
    if (changes.accents) {
      validateHex(changes.accents.primary, 'accents.primary');
      validateHex(changes.accents.secondary, 'accents.secondary');
    }

    // Check semantic colors
    if (changes.semantic) {
      for (const key of ['info', 'warning', 'error', 'success']) {
        validateHex(changes.semantic[key], `semantic.${key}`);
      }
    }

    // Check chrome
    if (changes.chrome) {
      validateHex(changes.chrome.border, 'chrome.border');
      validateRange(changes.chrome.focusOpacity, 0, 100, 'chrome.focusOpacity');
    }

    // Check syntax colors
    if (changes.syntax) {
      for (const key of ['keywords', 'functions', 'strings', 'numbers', 'comments', 'variables', 'types', 'operators']) {
        validateHex(changes.syntax[key], `syntax.${key}`);
      }
    }

    // Check design system (enum validation)
    if (changes.design) {
      const validTerminalStyles = ['recessed', 'floating', 'unified', 'contrast'];
      const validPanelVariations = ['subtle', 'distinct', 'bold'];
      const validCursorStyles = ['accent', 'contrast', 'subtle'];

      if (changes.design.terminalStyle && !validTerminalStyles.includes(changes.design.terminalStyle)) {
        errors.push(`Invalid terminalStyle: ${changes.design.terminalStyle} (expected: ${validTerminalStyles.join(', ')})`);
      }
      if (changes.design.panelVariation && !validPanelVariations.includes(changes.design.panelVariation)) {
        errors.push(`Invalid panelVariation: ${changes.design.panelVariation} (expected: ${validPanelVariations.join(', ')})`);
      }
      if (changes.design.cursorStyle && !validCursorStyles.includes(changes.design.cursorStyle)) {
        errors.push(`Invalid cursorStyle: ${changes.design.cursorStyle} (expected: ${validCursorStyles.join(', ')})`);
      }
    }

    return errors;
  }

  /**
   * BUG 2 FIX: Sanitize/fix invalid AI changes
   */
  _sanitizeAiChanges(changes) {
    const defaults = this._getDefaultThemeState();
    const locked = this._themeState.locked || {};

    // Remove locked sections from AI changes
    if (locked.backgrounds && changes.backgrounds) {
      delete changes.backgrounds;
    }
    if (locked.syntax && changes.syntax) {
      delete changes.syntax;
    }
    if (locked.accents && changes.accents) {
      delete changes.accents;
    }
    if (locked.terminal && changes.terminal) {
      delete changes.terminal;
    }
    if (locked.chrome && changes.chrome) {
      delete changes.chrome;
    }

    // Fix invalid hex colors by using defaults
    const fixHex = (obj, key, defaultObj) => {
      if (obj && obj[key] && typeof obj[key] === 'string') {
        if (!obj[key].match(/^#[0-9A-Fa-f]{3,8}$/)) {
          obj[key] = defaultObj?.[key] || '#808080';
        }
      }
    };

    // Fix numeric ranges
    const fixRange = (obj, key, min, max, defaultVal) => {
      if (obj && obj[key] !== undefined) {
        if (typeof obj[key] !== 'number' || obj[key] < min || obj[key] > max) {
          obj[key] = defaultVal;
        }
      }
    };

    // Sanitize backgrounds (loosened ranges for creative freedom)
    if (changes.backgrounds) {
      fixHex(changes.backgrounds, 'base', defaults.backgrounds);
      fixRange(changes.backgrounds, 'offset', 0, 50, 8);  // Allow 0 for flat designs, up to 50 for dramatic
    }

    // Sanitize text (loosened for artistic themes)
    if (changes.text) {
      fixHex(changes.text, 'primary', defaults.text);
      fixRange(changes.text, 'fadeAmount', 0, 70, 15);  // Allow 0 for pure white, up to 70 for very faded
    }

    // Sanitize accents
    if (changes.accents) {
      fixHex(changes.accents, 'primary', defaults.accents);
      fixHex(changes.accents, 'secondary', defaults.accents);
    }

    // Sanitize semantic
    if (changes.semantic) {
      for (const key of ['info', 'warning', 'error', 'success']) {
        fixHex(changes.semantic, key, defaults.semantic);
      }
    }

    // Sanitize chrome
    if (changes.chrome) {
      fixHex(changes.chrome, 'border', defaults.chrome);
      fixRange(changes.chrome, 'focusOpacity', 0, 100, 70);
    }

    // Sanitize syntax
    if (changes.syntax) {
      for (const key of ['keywords', 'functions', 'strings', 'numbers', 'comments', 'variables', 'types', 'operators']) {
        fixHex(changes.syntax, key, defaults.syntax);
      }
    }

    // Sanitize design system (fix invalid enum values)
    if (changes.design) {
      const validTerminalStyles = ['recessed', 'floating', 'unified', 'contrast'];
      const validPanelVariations = ['subtle', 'distinct', 'bold'];
      const validCursorStyles = ['accent', 'contrast', 'subtle'];

      if (changes.design.terminalStyle && !validTerminalStyles.includes(changes.design.terminalStyle)) {
        changes.design.terminalStyle = 'recessed'; // Default
      }
      if (changes.design.panelVariation && !validPanelVariations.includes(changes.design.panelVariation)) {
        changes.design.panelVariation = 'subtle'; // Default
      }
      if (changes.design.cursorStyle && !validCursorStyles.includes(changes.design.cursorStyle)) {
        changes.design.cursorStyle = 'accent'; // Default
      }
    }

    // Remove any extra properties that shouldn't be in state
    const allowedKeys = ['name', 'type', 'backgrounds', 'text', 'accents', 'semantic', 'chrome', 'syntax', 'design'];
    for (const key of Object.keys(changes)) {
      if (!allowedKeys.includes(key)) {
        delete changes[key];
      }
    }
  }

  /**
   * BUG 9 FIX: Sanitize error messages for user display
   */
  _sanitizeErrorMessage(message) {
    if (!message) return 'An unexpected error occurred. Please try again.';

    // Map technical errors to user-friendly messages
    const errorMappings = [
      { pattern: /JSON|parse|Unexpected token/i, message: 'AI returned an invalid response. Please try rephrasing your request.' },
      { pattern: /timed? ?out/i, message: 'Request timed out. Please try again.' },
      { pattern: /network|fetch|connection/i, message: 'Connection error. Please check your internet and try again.' },
      { pattern: /rate limit|too many/i, message: 'Too many requests. Please wait a moment and try again.' },
      { pattern: /model.*not.*available|no.*model/i, message: 'AI model not available. Please ensure GitHub Copilot is installed and signed in.' },
    ];

    for (const { pattern, message: userMsg } of errorMappings) {
      if (pattern.test(message)) {
        return userMsg;
      }
    }

    // If it's already a clean message, return it
    if (message.length < 100 && !message.includes('at position') && !message.includes('undefined')) {
      return message;
    }

    return 'Failed to generate theme. Please try again with a different description.';
  }

  /**
   * Generate a creative theme name from the user's prompt
   */
  _generateThemeName(prompt) {
    const words = prompt.toLowerCase().split(/\s+/);

    // Color/mood keywords to title case
    const colorWords = ['purple', 'blue', 'green', 'red', 'orange', 'pink', 'cyan', 'teal',
      'gold', 'silver', 'neon', 'pastel', 'dark', 'light', 'midnight', 'ocean', 'forest',
      'sunset', 'sunrise', 'coffee', 'warm', 'cool', 'ice', 'fire', 'ember', 'rose',
      'violet', 'lavender', 'mint', 'coral', 'ruby', 'emerald', 'sapphire', 'amber'];

    const moodWords = ['cozy', 'minimal', 'cyber', 'retro', 'modern', 'classic', 'soft',
      'bold', 'elegant', 'vibrant', 'muted', 'clean', 'hacker', 'zen', 'calm'];

    const foundColors = words.filter(w => colorWords.includes(w));
    const foundMoods = words.filter(w => moodWords.includes(w));

    let nameParts = [];

    if (foundMoods.length > 0) {
      nameParts.push(foundMoods[0].charAt(0).toUpperCase() + foundMoods[0].slice(1));
    }
    if (foundColors.length > 0) {
      nameParts.push(foundColors[0].charAt(0).toUpperCase() + foundColors[0].slice(1));
    }

    if (nameParts.length === 0) {
      // Extract first meaningful words
      const meaningful = words.filter(w => w.length > 3 && !['make', 'with', 'like', 'more', 'want', 'theme'].includes(w));
      if (meaningful.length > 0) {
        nameParts.push(meaningful[0].charAt(0).toUpperCase() + meaningful[0].slice(1));
      }
    }

    if (nameParts.length === 0) {
      nameParts.push('Custom');
    }

    return 'XELA ' + nameParts.join(' ');
  }

  /**
   * Apply AI-generated changes to theme state
   */
  _applyAiChanges(changes) {
    // Deep merge changes into theme state
    const merge = (target, source) => {
      for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target[key]) target[key] = {};
          merge(target[key], source[key]);
        } else if (source[key] !== undefined) {
          target[key] = source[key];
        }
      }
    };

    merge(this._themeState, changes);
  }

  dispose() {
    ThemeEditorPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}

/**
 * Register theme editor commands
 * @param {vscode.ExtensionContext} context
 */
export function registerThemeEditorCommands(context) {
  const openEditorCmd = vscode.commands.registerCommand('xelaThemes.openEditor', () => {
    ThemeEditorPanel.createOrShow(context);
  });

  context.subscriptions.push(openEditorCmd);
  debug('XELA Theme Editor commands registered');
}
