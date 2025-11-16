// Complete VS Code color mapping system
import { withAlpha } from './roles.js';

export function buildCompleteColors(roles) {
  const r = roles;

  const colors = {
    // Title Bar (use surface1 for distinction)
    'titleBar.activeBackground': r.surface1,
    'titleBar.inactiveBackground': r.surface1,
    'titleBar.activeForeground': r.textPrimary,
    'titleBar.inactiveForeground': r.textMuted,
    'titleBar.border': r.border,

    // Window
    'window.activeBorder': r.accentPrimary,
    'window.inactiveBorder': r.border,

    // Activity Bar (use surface1 - darker/different from editor)
    'activityBar.background': r.surface1,
    'activityBar.foreground': r.textPrimary,
    'activityBar.inactiveForeground': r.textMuted,
    'activityBar.border': r.border,
    'activityBar.activeBorder': r.accentPrimary,
    'activityBarBadge.background': r.accentPrimary,
    'activityBarBadge.foreground': r.textInverted,

    // Side Bar (use surface1 - different from editor)
    'sideBar.background': r.surface1,
    'sideBar.foreground': r.textPrimary,
    'sideBar.border': r.border,
    'sideBarTitle.foreground': r.textSecondary,
    'sideBarSectionHeader.background': r.surface2,
    'sideBar.dropBackground': withAlpha(r.accentPrimary, 0.13),

    // Status Bar (use surface1 for distinction)
    'statusBar.background': r.surface1,
    'statusBar.foreground': r.textPrimary,
    'statusBar.border': r.border,
    'statusBar.noFolderBackground': r.surface2,
    'statusBar.noFolderForeground': r.textSecondary,
    'statusBar.debuggingBackground': r.accentWarn,
    'statusBar.debuggingForeground': r.textInverted,
    'statusBarItem.hoverBackground': r.surface2,
    'statusBarItem.remoteBackground': r.accentInfo,
    'statusBarItem.remoteForeground': r.textInverted,
    'statusBarItem.prominentBackground': r.surface2,
    'statusBarItem.prominentHoverBackground': r.surface3,
    'statusBarItem.errorBackground': r.accentError,
    'statusBarItem.errorForeground': r.textInverted,
    'statusBarItem.warningBackground': r.accentWarn,
    'statusBarItem.warningForeground': r.textInverted,

    // Panel (use panel surface for distinction - often darker or lighter)
    'panel.background': r.panel,
    'panel.border': r.border,
    'panel.dropBorder': r.accentPrimary,
    'panelTitle.activeForeground': r.textPrimary,
    'panelTitle.activeBorder': r.accentPrimary,
    'panelTitle.inactiveForeground': r.textSecondary,

    // Editor Groups & Tabs (use surface2 for tab bar)
    'editorGroupHeader.tabsBackground': r.surface2,
    'editorGroupHeader.tabsBorder': r.border,
    'editorGroup.dropBackground': withAlpha(r.accentPrimary, 0.13),
    'tab.activeBackground': r.surface0,
    'tab.inactiveBackground': r.surface2,
    'tab.border': r.surface2,
    'tab.activeForeground': r.textPrimary,
    'tab.inactiveForeground': r.textMuted,
    'tab.activeBorderTop': r.accentPrimary,
    'tab.unfocusedActiveBorderTop': withAlpha(r.accentWarn, 0.53),
    'tab.hoverBackground': r.surface3,
    'tab.hoverForeground': r.textPrimary,
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
    'editor.findMatchBackground': 'transparent',
    'editor.findMatchBorder': r.accentWarn,
    'editor.findMatchHighlightBackground': withAlpha(r.surface2, 0.5),
    'editor.findMatchHighlightBorder': withAlpha(r.accentWarn, 0.53),
    'editor.hoverHighlightBackground': withAlpha(r.surface2, 0.5),

    // Editor Cursor & Line Numbers
    'editorCursor.foreground': r.accentPrimary,
    'editorLineNumber.foreground': r.textMuted,
    'editorLineNumber.activeForeground': r.textSecondary,

    // Editor Widgets (use surface3 for elevated floating widgets)
    'editorHoverWidget.background': r.surface3,
    'editorHoverWidget.border': r.border,
    'editorWidget.background': r.surface3,
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
    'list.activeSelectionForeground': r.textPrimary,
    'list.inactiveSelectionBackground': r.surface1,
    'list.hoverBackground': r.surface2,
    'list.focusBackground': r.surface1,
    'list.highlightForeground': r.accentPrimary,
    'list.warningForeground': r.accentWarn,
    'list.errorForeground': r.accentError,
    'list.dropBackground': withAlpha(r.accentPrimary, 0.13),

    // Inputs & Forms (use surface2 for input contrast)
    'input.background': r.surface2,
    'input.foreground': r.textPrimary,
    'input.border': r.border,
    'input.placeholderForeground': r.textMuted,
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
    'dropdown.foreground': r.textPrimary,
    'button.background': r.accentPrimary,
    'button.foreground': r.textInverted,
    'button.hoverBackground': r.accentPrimaryAlt,
    'checkbox.background': r.surface2,
    'checkbox.foreground': r.textSecondary,
    'checkbox.border': r.border,

    // Badges & Progress
    'badge.background': r.accentPrimary,
    'badge.foreground': r.textInverted,
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
    'notifications.background': r.surface3,
    'notifications.border': r.border,
    'notificationCenterHeader.foreground': r.textPrimary,

    // Breadcrumbs (keep on editor surface)
    'breadcrumb.background': r.surface0,
    'breadcrumb.foreground': r.textMuted,
    'breadcrumb.focusForeground': r.textPrimary,
    'breadcrumb.activeSelectionForeground': r.accentPrimary,
    'breadcrumbPicker.background': r.surface3,

    // Menu (use surface3 for elevated menus)
    'menu.background': r.surface3,
    'menu.foreground': r.textPrimary,
    'menu.separatorBackground': r.border,
    'menu.selectionBackground': r.surface2,
    'menu.selectionForeground': r.textPrimary,
    'menu.selectionBorder': r.border,

    // Terminal
    'terminal.background': r.surface0,
    'terminal.foreground': r.textPrimary,
    'terminalCursor.foreground': r.accentPrimary,
    'terminal.ansiBlack': r.surface0,
    'terminal.ansiRed': r.accentError,
    'terminal.ansiGreen': r.accentSuccess,
    'terminal.ansiYellow': r.accentWarn,
    'terminal.ansiBlue': r.accentInfo,
    'terminal.ansiMagenta': r.accentError,
    'terminal.ansiCyan': r.accentPrimary,
    'terminal.ansiWhite': r.textSecondary,
    'terminal.ansiBrightBlack': r.textMuted,
    'terminal.ansiBrightRed': withAlpha(r.accentError, 0.8),
    'terminal.ansiBrightGreen': withAlpha(r.accentSuccess, 0.8),
    'terminal.ansiBrightYellow': withAlpha(r.accentWarn, 0.8),
    'terminal.ansiBrightBlue': withAlpha(r.accentInfo, 0.8),
    'terminal.ansiBrightMagenta': withAlpha(r.accentError, 0.8),
    'terminal.ansiBrightCyan': r.accentPrimaryAlt,
    'terminal.ansiBrightWhite': r.textPrimary,

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
  if (r.border === 'transparent') {
    const preserve = new Set([
      'editor.findMatchBorder',
      'editor.findMatchHighlightBorder',
      'editorBracketMatch.border',
      'editor.selectionHighlightBorder' // keep semantic highlight borders
    ]);
    for (const k of Object.keys(colors)) {
      if (k.toLowerCase().includes('border') && !preserve.has(k)) {
        colors[k] = 'transparent';
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
    explicitNeutral.forEach(k => { if (k in colors) colors[k] = 'transparent'; });

    // Remove tab edge artifact
    colors['tab.border'] = 'transparent';

    // Subtle focus treatment: reduce focusBorder intensity (still accessible) instead of bright accent line
    if (colors['focusBorder']) {
      colors['focusBorder'] = withAlpha(r.focus || r.accentPrimary || '#FFFFFF', 0.25);
    }

    // Harmonize hover/selection so absence of borders still gives spatial cues
    if (colors['tab.hoverBackground']) colors['tab.hoverBackground'] = r.surface1;
    if (colors['list.activeSelectionBackground']) colors['list.activeSelectionBackground'] = r.surface2;
  }

  return colors;
}
