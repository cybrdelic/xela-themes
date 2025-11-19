/**
 * Theme: XELA Phosphor Green — Monochrome CRT
 * Type: dark
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-phosphor-green',
    name: 'XELA Phosphor Green — Monochrome CRT',
    type: 'dark',
    roles: {
      surface0: '#000000',
      surface1: '#00110A',
      surface2: '#001A10',
      surface3: '#0A3322',
      panel: '#00110A',
      overlay: '#000000F8',
      backdrop: '#00000099',
      border: '#001A10',
      focus: withAlpha('#00FF7F',0.6),
      textPrimary: '#CCFFDD',
      textSecondary: '#B8FFCE',
      textMuted: '#88AA99',
      textInverted: '#00110A',
      accentPrimary: '#00FF7F',
      accentPrimaryAlt: '#33FF99',
      accentInfo: '#00FF7F',
      accentWarn: '#88AA99',
      accentError: '#AA8888',
      accentSuccess: '#00FF7F',
      accentSelection: withAlpha('#00FF7F',0.2),
      accentLink: '#33FF99'
    },
    colorOverrides: {
      // Pure monochrome CRT phosphor
      'editor.background': '#000000',
      'editor.foreground': '#CCFFDD',
      'titleBar.activeBackground': '#00110A',
      'titleBar.activeForeground': '#B8FFCE',
      'titleBar.border': '#00000000',
      'activityBar.background': '#00110A',
      'activityBar.foreground': '#B8FFCE',
      'activityBar.inactiveForeground': '#88AA99',
      'activityBar.border': '#00000000',
      'activityBar.activeBorder': '#00FF7F',
      'activityBarBadge.background': '#00FF7F',
      'activityBarBadge.foreground': '#00110A',
      'sideBar.background': '#00110A',
      'sideBar.foreground': '#B8FFCE',
      'sideBar.border': '#001A1080',
      'sideBarTitle.foreground': '#CCFFDD',
      'sideBarSectionHeader.background': '#00000000',
      'sideBarSectionHeader.foreground': '#00FF7F',
      'editorGroupHeader.tabsBackground': '#00110A',
      'editorGroupHeader.border': '#001A10',
      'tab.activeBackground': '#000000',
      'tab.activeForeground': '#CCFFDD',
      'tab.inactiveBackground': '#00110A',
      'tab.inactiveForeground': '#88AA99',
      'tab.border': '#00000000',
      'tab.activeBorder': '#00000000',
      'tab.activeBorderTop': '#00FF7F',
      'statusBar.background': '#00110A',
      'statusBar.foreground': '#B8FFCE',
      'statusBar.border': '#001A10',
      'statusBar.debuggingBackground': '#00FF7F',
      'statusBar.debuggingForeground': '#00110A',
      'panel.background': '#00110A',
      'panel.border': '#001A10',
      'panelTitle.activeBorder': '#00FF7F',
      'panelTitle.activeForeground': '#CCFFDD',
      'panelTitle.inactiveForeground': '#88AA99',
      'terminal.background': '#00110A',
      'terminal.foreground': '#B8FFCE',
      'terminalCursor.foreground': '#00FF7F',

      // CRT phosphor precision
      'editorLineNumber.foreground': '#0A332260',
      'editorLineNumber.activeForeground': '#88AA99',
      'editor.lineHighlightBackground': '#001A1050',
      'editorCursor.foreground': '#00FF7F',
      'editorWhitespace.foreground': '#001A1050',
      'editorIndentGuide.background1': '#001A1040',
      'editorIndentGuide.activeBackground1': '#00FF7F60',
      'editorRuler.foreground': '#001A10',
      'editorBracketMatch.background': '#00FF7F30',
      'editorBracketMatch.border': '#00FF7F90',

      // Phosphor glow selections
      'editor.selectionBackground': '#00FF7F35',
      'editor.selectionHighlightBackground': '#00FF7F20',
      'editor.inactiveSelectionBackground': '#00FF7F18',
      'editor.wordHighlightBackground': '#33FF9928',
      'editor.wordHighlightStrongBackground': '#33FF9938',
      'editor.findMatchBackground': '#88AA9960',
      'editor.findMatchHighlightBackground': '#88AA9930',

      // Lists
      'list.activeSelectionBackground': '#001A10',
      'list.activeSelectionForeground': '#CCFFDD',
      'list.inactiveSelectionBackground': '#0A332250',
      'list.hoverBackground': '#001A1080',
      'list.focusBackground': '#0A3322',
      'list.highlightForeground': '#00FF7F',

      // Inputs
      'input.background': '#00110A',
      'input.border': '#001A10',
      'input.foreground': '#CCFFDD',
      'input.placeholderForeground': '#88AA99',
      'dropdown.background': '#00110A',
      'dropdown.border': '#001A10',
      'dropdown.foreground': '#CCFFDD',

      // Buttons
      'button.background': '#00FF7F',
      'button.foreground': '#00110A',
      'button.hoverBackground': '#33FF99',

      // Badges
      'badge.background': '#00FF7F',
      'badge.foreground': '#00110A',

      // Minimap
      'minimap.background': '#000000',
      'minimap.findMatchHighlight': '#88AA9970',
      'minimap.selectionHighlight': '#00FF7F60',

      // Breadcrumbs
      'breadcrumb.background': '#00110A',
      'breadcrumb.foreground': '#88AA99',
      'breadcrumb.focusForeground': '#CCFFDD',
      'breadcrumb.activeSelectionForeground': '#00FF7F',

      // Scroll
      'scrollbarSlider.background': '#88AA9930',
      'scrollbarSlider.hoverBackground': '#88AA9950',
      'scrollbarSlider.activeBackground': '#88AA9970',

      // Git monochrome
      'gitDecoration.addedResourceForeground': '#00FF7F',
      'gitDecoration.modifiedResourceForeground': '#33FF99',
      'gitDecoration.deletedResourceForeground': '#AA8888',
      'gitDecoration.untrackedResourceForeground': '#B8FFCE',
      'gitDecoration.ignoredResourceForeground': '#88AA99'
    },
    tokens(c){
      return {
        comment: '#88AA99',
        keyword: '#00FF7F',
        function: '#33FF99',
        variable: '#CCFFDD',
        string: '#00FF7F',
        number: '#33FF99',
        constant: '#B8FFCE',
        storage: '#00FF7F',
        type: '#33FF99',
        punctuation: c.textPrimary,
        invalid: '#AA8888',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#00FF7F',
        h2: '#33FF99',
        h3: '#CCFFDD',
        h4: '#B8FFCE',
        h5: '#88AA99',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('phosphor','dark')
  };
