// Complete VS Code color mapping system with advanced customization support
// All critical UI elements are contrast-enforced for WCAG compliance
import { withAlpha, enforceContrast, getLuminance, lighten } from './roles.js';

// WCAG contrast requirements
const CONTRAST = {
  AA: 4.5,       // Normal text
  AA_LARGE: 3.0, // Large text, UI components
  UI: 3.0        // Non-text elements
};

const FINAL_CONTRAST_PAIRS = [
  ['titleBar.activeBackground', 'titleBar.activeForeground'],
  ['activityBar.background', 'activityBar.foreground'],
  ['sideBar.background', 'sideBar.foreground'],
  ['sideBarSectionHeader.background', 'sideBarSectionHeader.foreground'],
  ['statusBar.background', 'statusBar.foreground'],
  ['statusBar.noFolderBackground', 'statusBar.noFolderForeground'],
  ['statusBar.debuggingBackground', 'statusBar.debuggingForeground'],
  ['panel.background', 'panelTitle.activeForeground'],
  ['tab.activeBackground', 'tab.activeForeground'],
  ['tab.inactiveBackground', 'tab.inactiveForeground'],
  ['editor.background', 'editor.foreground'],
  ['editor.background', 'editorLineNumber.activeForeground'],
  ['editorWidget.background', 'editorWidget.foreground'],
  ['editorHoverWidget.background', 'editorWidget.foreground'],
  ['list.activeSelectionBackground', 'list.activeSelectionForeground'],
  ['list.inactiveSelectionBackground', 'list.inactiveSelectionForeground'],
  ['button.background', 'button.foreground'],
  ['button.secondaryBackground', 'button.secondaryForeground'],
  ['input.background', 'input.foreground'],
  ['badge.background', 'badge.foreground'],
  ['activityBarBadge.background', 'activityBarBadge.foreground'],
  ['terminal.background', 'terminal.foreground'],
  ['notifications.background', 'notifications.foreground'],
  ['notificationCenterHeader.background', 'notificationCenterHeader.foreground'],
  ['menu.background', 'menu.foreground'],
  ['menu.selectionBackground', 'menu.selectionForeground'],
  ['quickInput.background', 'quickInput.foreground']
];

function normalizeFinalContrast(colors) {
  for (const [bgKey, fgKey] of FINAL_CONTRAST_PAIRS) {
    const bg = colors[bgKey];
    const fg = colors[fgKey];
    if (!bg || !fg || bg.length > 7 || fg.length > 7) {
      continue;
    }
    colors[fgKey] = enforceContrast(fg, bg, CONTRAST.AA);
  }
  return colors;
}

export function buildCompleteColors(roles, overrides = {}) {
  const r = roles;
  const isLight = getLuminance(r.surface0 || '#000000') > 0.45;

  // Pre-compute contrast-safe variants for badge/button foregrounds
  const badgeFg = enforceContrast(r.textInverted, r.accentPrimary, CONTRAST.AA);
  const errorFg = enforceContrast(r.textInverted, r.accentError, CONTRAST.AA);
  const warnFg = enforceContrast(r.textInverted, r.accentWarn, CONTRAST.AA);
  const infoFg = enforceContrast(r.textInverted, r.accentInfo, CONTRAST.AA);
  const successFg = enforceContrast(r.textInverted, r.accentSuccess, CONTRAST.AA);
  const sidebarSectionBg = r.surface2;
  const sidebarSectionFg = enforceContrast(r.textPrimary, sidebarSectionBg, CONTRAST.AA);
  const widgetBg = r.surface3;
  const widgetFg = enforceContrast(r.textPrimary, widgetBg, CONTRAST.AA);
  const listInactiveBg = r.surface1;
  const listInactiveFg = enforceContrast(r.textPrimary, listInactiveBg, CONTRAST.AA);
  const listFocusBg = r.surface1;
  const listFocusFg = enforceContrast(r.textPrimary, listFocusBg, CONTRAST.AA);
  const secondaryButtonBg = r.surface2;
  const secondaryButtonFg = enforceContrast(r.textPrimary, secondaryButtonBg, CONTRAST.AA);
  const notificationBg = r.surface3;
  const notificationFg = enforceContrast(r.textPrimary, notificationBg, CONTRAST.AA);
  const notificationHeaderBg = r.surface2;
  const notificationHeaderFg = enforceContrast(r.textPrimary, notificationHeaderBg, CONTRAST.AA);

  // Base colors with intelligent surface distribution
  const colors = {
    // Title Bar (use surface1 for distinction)
    'titleBar.activeBackground': r.surface1,
    'titleBar.inactiveBackground': r.surface1,
    'titleBar.activeForeground': enforceContrast(r.textPrimary, r.surface1, CONTRAST.AA),
    'titleBar.inactiveForeground': enforceContrast(r.textMuted, r.surface1, CONTRAST.AA_LARGE),
    'titleBar.border': r.border,

    // Window
    'window.activeBorder': r.accentPrimary,
    'window.inactiveBorder': r.border,

    // Activity Bar (use surface1 - darker/different from editor)
    'activityBar.background': r.surface1,
    'activityBar.foreground': enforceContrast(r.textPrimary, r.surface1, CONTRAST.UI),
    'activityBar.inactiveForeground': enforceContrast(r.textMuted, r.surface1, CONTRAST.UI),
    'activityBar.border': r.border,
    'activityBar.activeBorder': r.accentPrimary,
    'activityBarBadge.background': r.accentPrimary,
    'activityBarBadge.foreground': badgeFg,

    // Side Bar (use surface1 - different from editor)
    'sideBar.background': r.surface1,
    'sideBar.foreground': enforceContrast(r.textPrimary, r.surface1, CONTRAST.AA),
    'sideBar.border': r.border,
    'sideBarTitle.foreground': enforceContrast(r.textSecondary, r.surface1, CONTRAST.AA),
    'sideBarSectionHeader.background': sidebarSectionBg,
    'sideBarSectionHeader.foreground': sidebarSectionFg,
    'sideBar.dropBackground': withAlpha(r.accentPrimary, 0.13),

    // Status Bar (use surface1 for distinction)
    'statusBar.background': r.surface1,
    'statusBar.foreground': enforceContrast(r.textPrimary, r.surface1, CONTRAST.AA),
    'statusBar.border': r.border,
    'statusBar.noFolderBackground': r.surface2,
    'statusBar.noFolderForeground': enforceContrast(r.textSecondary, r.surface2, CONTRAST.AA),
    'statusBar.debuggingBackground': r.accentWarn,
    'statusBar.debuggingForeground': warnFg,
    'statusBarItem.hoverBackground': r.surface2,
    'statusBarItem.remoteBackground': r.accentInfo,
    'statusBarItem.remoteForeground': infoFg,
    'statusBarItem.prominentBackground': r.surface2,
    'statusBarItem.prominentHoverBackground': r.surface3,
    'statusBarItem.errorBackground': r.accentError,
    'statusBarItem.errorForeground': errorFg,
    'statusBarItem.warningBackground': r.accentWarn,
    'statusBarItem.warningForeground': warnFg,

    // Panel (use panel surface for distinction - often darker or lighter)
    'panel.background': r.panel,
    'panel.border': r.border,
    'panel.dropBorder': r.accentPrimary,
    'panelTitle.activeForeground': enforceContrast(r.textPrimary, r.panel, CONTRAST.AA),
    'panelTitle.activeBorder': r.accentPrimary,
    'panelTitle.inactiveForeground': enforceContrast(r.textSecondary, r.panel, CONTRAST.AA_LARGE),

    // Editor Groups & Tabs (use surface2 for tab bar)
    'editorGroupHeader.tabsBackground': r.surface2,
    'editorGroupHeader.tabsBorder': r.border,
    'editorGroup.border': r.border,
    'editorGroup.dropBackground': withAlpha(r.accentPrimary, 0.13),
    'tab.activeBackground': r.surface0,
    'tab.inactiveBackground': r.surface2,
    'tab.border': r.surface2,
    'tab.activeForeground': enforceContrast(r.textPrimary, r.surface0, CONTRAST.AA),
    'tab.inactiveForeground': enforceContrast(r.textMuted, r.surface2, CONTRAST.AA_LARGE),
    'tab.activeBorderTop': r.accentPrimary,
    'tab.unfocusedActiveBorderTop': withAlpha(r.accentWarn, 0.53),
    'tab.hoverBackground': r.surface3,
    'tab.hoverForeground': enforceContrast(r.textPrimary, r.surface3, CONTRAST.AA),
    'tab.unfocusedHoverBackground': r.surface3,
    'tab.activeModifiedBorder': r.accentWarn,
    'tab.hoverBorder': r.surface3,
    'tab.lastPinnedBorder': r.border,

    // Editor (surface0 is the main editor background)
    'editor.background': r.surface0,
    'editor.foreground': r.textPrimary,
    'editor.lineHighlightBackground': r.surface2,
    'editor.selectionBackground': r.accentSelection,
    'editor.inactiveSelectionBackground': withAlpha(r.accentSelection, 0.6),
    'editor.selectionHighlightBackground': withAlpha(r.accentSelection, 0.6),
    'editor.selectionHighlightBorder': withAlpha(r.accentPrimary, 0.33),
    'editor.wordHighlightBackground': withAlpha(r.accentPrimary, 0.1),
    'editor.wordHighlightStrongBackground': withAlpha(r.accentPrimary, 0.17),
    'editor.foldBackground': withAlpha(r.surface1, 0.5),
    'editor.findMatchBackground': '#00000000',
    'editor.findMatchBorder': r.accentWarn,
    'editor.findMatchHighlightBackground': withAlpha(r.surface2, 0.5),
    'editor.findMatchHighlightBorder': withAlpha(r.accentWarn, 0.53),
    'editor.hoverHighlightBackground': withAlpha(r.surface2, 0.5),

    // Editor Cursor & Line Numbers - CRITICAL for accessibility
    'editorCursor.foreground': enforceContrast(r.accentPrimary, r.surface0, CONTRAST.UI),
    'editorLineNumber.foreground': enforceContrast(r.textMuted, r.surface0, CONTRAST.AA_LARGE),
    'editorLineNumber.activeForeground': enforceContrast(r.textSecondary, r.surface0, CONTRAST.AA),

    // Editor Widgets (use surface3 for elevated floating widgets)
    'editorHoverWidget.background': r.surface3,
    'editorHoverWidget.border': r.border,
    'editorWidget.background': widgetBg,
    'editorWidget.foreground': widgetFg,
    'editorWidget.border': r.border,
    'editorWidget.resizeBorder': r.accentPrimary,

    // Editor Guides & Indentation
    'editorIndentGuide.background1': r.surface2,
    'editorIndentGuide.activeBackground1': withAlpha(r.textMuted, 0.7),

    // Bracket Matching & Highlighting
    'editorBracketMatch.background': r.surface2,
    'editorBracketMatch.border': withAlpha(r.accentWarn, 0.53),
    'editorBracketHighlight.foreground1': r.accentPrimary,
    'editorBracketHighlight.foreground2': r.accentWarn,
    'editorBracketHighlight.foreground3': r.accentError,
    'editorBracketHighlight.foreground4': r.accentInfo,
    'editorBracketHighlight.foreground5': r.accentSuccess,
    'editorBracketHighlight.foreground6': r.accentPrimaryAlt,
    'editorBracketPairGuide.activeBackground1': withAlpha(r.accentPrimary, 0.33),
    'editorBracketPairGuide.activeBackground2': withAlpha(r.accentWarn, 0.33),
    'editorBracketPairGuide.activeBackground3': withAlpha(r.accentError, 0.33),
    'editorBracketPairGuide.activeBackground4': withAlpha(r.accentInfo, 0.33),
    'editorBracketPairGuide.activeBackground5': withAlpha(r.accentSuccess, 0.33),
    'editorBracketPairGuide.activeBackground6': withAlpha(r.accentPrimaryAlt, 0.33),

    // Diff Editor
    'diffEditor.insertedTextBackground': withAlpha(r.accentSuccess, 0.13),
    'diffEditor.removedTextBackground': withAlpha(r.accentError, 0.13),
    'diffEditor.insertedLineBackground': withAlpha(r.accentSuccess, 0.1),
    'diffEditor.removedLineBackground': withAlpha(r.accentError, 0.1),

    // Overview Ruler
    'editorOverviewRuler.errorForeground': withAlpha(r.accentError, 0.67),
    'editorOverviewRuler.warningForeground': withAlpha(r.accentWarn, 0.67),
    'editorOverviewRuler.infoForeground': withAlpha(r.accentInfo, 0.53),
    'editorOverviewRuler.findMatchForeground': withAlpha(r.accentWarn, 0.53),
    'editorOverviewRuler.modifiedForeground': withAlpha(r.accentWarn, 0.4),
    'editorOverviewRuler.addedForeground': withAlpha(r.accentSuccess, 0.4),
    'editorOverviewRuler.deletedForeground': withAlpha(r.accentError, 0.4),

    // Editor Gutter
    'editorGutter.addedBackground': withAlpha(r.accentSuccess, 0.67),
    'editorGutter.modifiedBackground': withAlpha(r.accentWarn, 0.67),
    'editorGutter.deletedBackground': withAlpha(r.accentError, 0.67),
    'editorGutter.commentRangeForeground': r.textMuted,

    // Minimap
    'minimap.findMatchHighlight': withAlpha(r.accentWarn, 0.6),
    'minimap.selectionHighlight': withAlpha(r.accentPrimary, 0.33),
    'minimap.selectionOccurrenceHighlight': withAlpha(r.accentPrimary, 0.2),
    'minimap.errorHighlight': withAlpha(r.accentError, 0.6),
    'minimap.warningHighlight': withAlpha(r.accentWarn, 0.6),

    // Lists
    'list.activeSelectionBackground': r.surface2,
    'list.activeSelectionForeground': enforceContrast(r.textPrimary, r.surface2, CONTRAST.AA),
    'list.inactiveSelectionBackground': listInactiveBg,
    'list.inactiveSelectionForeground': listInactiveFg,
    'list.hoverBackground': r.surface2,
    'list.focusBackground': listFocusBg,
    'list.focusForeground': listFocusFg,
    'list.highlightForeground': enforceContrast(r.accentPrimary, r.surface2, CONTRAST.AA),
    'list.warningForeground': r.accentWarn,
    'list.errorForeground': r.accentError,
    'list.dropBackground': withAlpha(r.accentPrimary, 0.13),

    // Inputs & Forms (use surface2 for input contrast)
    'input.background': r.surface2,
    'input.foreground': enforceContrast(r.textPrimary, r.surface2, CONTRAST.AA),
    'input.border': r.border,
    'input.placeholderForeground': enforceContrast(r.textMuted, r.surface2, CONTRAST.AA_LARGE),
    'inputOption.activeBorder': withAlpha(r.accentPrimary, 0.67),
    'inputValidation.errorBackground': withAlpha(r.accentError, 0.1),
    'inputValidation.errorBorder': r.accentError,
    'inputValidation.warningBackground': withAlpha(r.accentWarn, 0.1),
    'inputValidation.warningBorder': r.accentWarn,
    'inputValidation.infoBackground': withAlpha(r.accentInfo, 0.1),
    'inputValidation.infoBorder': r.accentInfo,

    // Dropdowns & Buttons (use surface2 for contrast)
    'dropdown.background': r.surface2,
    'dropdown.border': r.border,
    'dropdown.foreground': enforceContrast(r.textPrimary, r.surface2, CONTRAST.AA),
    'button.background': r.accentPrimary,
    'button.foreground': badgeFg,
    'button.hoverBackground': r.accentPrimaryAlt,
    'button.secondaryBackground': secondaryButtonBg,
    'button.secondaryForeground': secondaryButtonFg,
    'checkbox.background': r.surface2,
    'checkbox.foreground': enforceContrast(r.textSecondary, r.surface2, CONTRAST.AA),
    'checkbox.border': r.border,

    // Badges & Progress
    'badge.background': r.accentPrimary,
    'badge.foreground': badgeFg,
    'progressBar.background': r.accentPrimary,

    // Peek View (use surface3 for elevated overlay)
    'peekView.border': r.border,
    'peekViewEditor.background': r.surface3,
    'peekViewEditor.matchHighlightBackground': withAlpha(r.accentWarn, 0.13),
    'peekViewEditor.matchHighlightBorder': withAlpha(r.accentWarn, 0.53),
    'peekViewResult.background': r.surface2,
    'peekViewResult.matchHighlightBackground': r.surface3,
    'peekViewTitle.background': r.surface2,
    'peekViewTitleLabel.foreground': r.textPrimary,
    'peekViewTitleDescription.foreground': r.textMuted,

    // Quick Input (use overlay for floating)
    'quickInput.background': r.overlay,
    'quickInput.foreground': r.textPrimary,
    'quickInputTitle.background': r.surface3,
    'pickerGroup.foreground': r.accentPrimary,
    'pickerGroup.border': r.border,

    // Notifications (use surface3 for elevated)
    'notifications.background': notificationBg,
    'notifications.foreground': notificationFg,
    'notifications.border': r.border,
    'notificationCenter.border': r.border,
    'notificationCenterHeader.background': notificationHeaderBg,
    'notificationCenterHeader.foreground': notificationHeaderFg,
    'notificationsErrorIcon.foreground': r.accentError,
    'notificationsWarningIcon.foreground': r.accentWarn,
    'notificationsInfoIcon.foreground': r.accentInfo,

    // Breadcrumbs (keep on editor surface)
    'breadcrumb.background': r.surface0,
    'breadcrumb.foreground': enforceContrast(r.textMuted, r.surface0, CONTRAST.AA_LARGE),
    'breadcrumb.focusForeground': enforceContrast(r.textPrimary, r.surface0, CONTRAST.AA),
    'breadcrumb.activeSelectionForeground': enforceContrast(r.accentPrimary, r.surface0, CONTRAST.AA),
    'breadcrumbPicker.background': r.surface3,

    // Menu (use surface3 for elevated menus)
    'menu.background': r.surface3,
    'menu.foreground': enforceContrast(r.textPrimary, r.surface3, CONTRAST.AA),
    'menu.separatorBackground': r.border,
    'menu.selectionBackground': r.surface2,
    'menu.selectionForeground': enforceContrast(r.textPrimary, r.surface2, CONTRAST.AA),
    'menu.selectionBorder': r.border,

    // Terminal
    'terminal.background': r.surface0,
    'terminal.foreground': enforceContrast(r.textPrimary, r.surface0, CONTRAST.AA),
    'terminalCursor.foreground': enforceContrast(r.accentPrimary, r.surface0, CONTRAST.UI),
    'terminal.selectionBackground': r.accentSelection,
    'terminal.ansiBlack':   isLight ? '#1A1A1A' : r.surface0,
    'terminal.ansiRed':     r.accentError,
    'terminal.ansiGreen':   r.accentSuccess,
    'terminal.ansiYellow':  r.accentWarn,
    'terminal.ansiBlue':    r.accentInfo,
    'terminal.ansiMagenta': r.accentPrimaryAlt || r.accentPrimary,
    'terminal.ansiCyan':    r.accentPrimary,
    'terminal.ansiWhite':   r.textSecondary,
    'terminal.ansiBrightBlack':   r.textMuted,
    'terminal.ansiBrightRed':     lighten(r.accentError,   0.15),
    'terminal.ansiBrightGreen':   lighten(r.accentSuccess, 0.15),
    'terminal.ansiBrightYellow':  lighten(r.accentWarn,    0.15),
    'terminal.ansiBrightBlue':    lighten(r.accentInfo,    0.15),
    'terminal.ansiBrightMagenta': lighten(r.accentPrimaryAlt || r.accentPrimary, 0.15),
    'terminal.ansiBrightCyan':    lighten(r.accentPrimaryAlt || r.accentPrimary, 0.15),
    'terminal.ansiBrightWhite':   r.textPrimary,

    // Scrollbars
    'scrollbar.shadow': r.backdrop,
    'scrollbarSlider.background': r.surface3,
    'scrollbarSlider.hoverBackground': withAlpha(r.surface3, 1.2),
    'scrollbarSlider.activeBackground': withAlpha(r.surface3, 1.5),

    // General UI
    'focusBorder': r.focus,
    'selection.background': r.accentSelection,
    'widget.shadow': r.backdrop,
    'sash.hoverBorder': r.accentPrimary,

    // Editor Info/Warning/Error
    'editorInfo.foreground': r.accentInfo,
    'editorWarning.foreground': r.accentWarn,
    'editorError.foreground': r.accentError,
    'problemsErrorIcon.foreground': r.accentError,
    'problemsWarningIcon.foreground': r.accentWarn,
    'problemsInfoIcon.foreground': r.accentInfo,

    // Testing
    'testing.iconFailed': r.accentError,
    'testing.iconErrored': withAlpha(r.accentError, 0.8),
    'testing.iconPassed': r.accentSuccess,
    'testing.iconQueued': r.accentWarn,
    'testing.iconSkipped': r.textMuted,
    'testing.peekBorder': r.border,

    // Debug
    'debugToolBar.background': r.surface1,
    'debugIcon.breakpointForeground': r.accentError,
    'editor.stackFrameHighlightBackground': withAlpha(r.accentWarn, 0.1),
    'editor.focusedStackFrameHighlightBackground': withAlpha(r.accentSuccess, 0.1),

    // Git Decorations
    'gitDecoration.addedResourceForeground': r.accentSuccess,
    'gitDecoration.modifiedResourceForeground': r.accentWarn,
    'gitDecoration.deletedResourceForeground': r.accentError,
    'gitDecoration.renamedResourceForeground': r.accentInfo,
    'gitDecoration.untrackedResourceForeground': withAlpha(r.accentSuccess, 0.8),
    'gitDecoration.ignoredResourceForeground': r.textMuted,
    'gitDecoration.conflictingResourceForeground': withAlpha(r.accentError, 0.8),
    'gitDecoration.submoduleResourceForeground': withAlpha(r.accentWarn, 0.8),

    // Other UI Elements
    'editorLink.activeForeground': r.accentLink,
    'textLink.foreground': r.accentLink,
    'textLink.activeForeground': r.accentPrimary,
    'textPreformat.foreground': r.textSecondary,
    'textBlockQuote.background': r.surface1,
    'textBlockQuote.border': r.border,
    'textCodeBlock.background': r.surface2,
    'textSeparator.foreground': r.border,
    'editorUnnecessaryCode.opacity': withAlpha(r.textPrimary, 0.25),
    'listFilterWidget.background': r.surface2,
    'listFilterWidget.outline': withAlpha(r.accentPrimary, 0.67),
    'listFilterWidget.noMatchesOutline': withAlpha(r.accentError, 0.67),
    'editorStickyScroll.background': withAlpha(r.surface0, 0.95),
    'editorStickyScrollHover.background': r.surface1
  };

  // Borderless post-processing: if theme declares transparent base border, neutralize all structural borders
  if (r.border === 'transparent' || r.border === '#00000000') {
    const preserve = new Set([
      'editor.findMatchBorder',
      'editor.findMatchHighlightBorder',
      'editorBracketMatch.border',
      'editor.selectionHighlightBorder' // keep semantic highlight borders
    ]);
    for (const k of Object.keys(colors)) {
      if (k.toLowerCase().includes('border') && !preserve.has(k)) {
        colors[k] = '#00000000';
      }
    }

    // Explicitly flatten high-visibility accent borders that are not always matched by generic loop or we want guaranteed off
    const explicitNeutral = [
      'window.activeBorder',
      'activityBar.activeBorder',
      'panel.dropBorder',
      'panelTitle.activeBorder',
      'tab.activeBorderTop',
      'tab.unfocusedActiveBorderTop',
      'tab.activeModifiedBorder',
      'pickerGroup.border',
      'listFilterWidget.outline'
    ];
    explicitNeutral.forEach(k => { if (k in colors) colors[k] = '#00000000'; });

    // Remove tab edge artifact
    colors['tab.border'] = '#00000000';

    // Subtle focus treatment: reduce focusBorder intensity (still accessible) instead of bright accent line
    if (colors['focusBorder']) {
      colors['focusBorder'] = withAlpha(r.focus || r.accentPrimary || '#FFFFFF', 0.25);
    }

    // Harmonize hover/selection so absence of borders still gives spatial cues
    if (colors['tab.hoverBackground']) colors['tab.hoverBackground'] = r.surface1;
    if (colors['list.activeSelectionBackground']) colors['list.activeSelectionBackground'] = r.surface2;
  }

  // Apply overrides for fine-grained control, then normalize critical text contrast.
  return normalizeFinalContrast({ ...colors, ...overrides });
}
