/**
 * Theme: XELA AMOLED+ — Pure Black Max
 * Type: dark
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-amoled-plus',
    name: 'XELA AMOLED+ — Pure Black Max',
    type: 'dark',
    roles: {
      surface0: '#000000',
      surface1: '#000000',
      surface2: '#0A0A0A',
      surface3: '#141414',
      panel: '#000000',
      overlay: '#000000F8',
      backdrop: '#00000099',
      border: '#1F1F1F',
      focus: withAlpha('#FFD700',0.6),
      textPrimary: '#FFFFFF',
      textSecondary: '#F0F0F0',
      textMuted: '#B0B0B0',
      textInverted: '#000000',
      accentPrimary: '#FFD700',
      accentPrimaryAlt: '#00FF00',
      accentInfo: '#87CEEB',
      accentWarn: '#FFA500',
      accentError: '#FF6347',
      accentSuccess: '#98FB98',
      accentSelection: withAlpha('#FFD700',0.22),
      accentLink: '#00FF00'
    },
    colorOverrides: {
      // Maximum AMOLED power savings
      'editor.background': '#000000',
      'editor.foreground': '#FFFFFF',
      'titleBar.activeBackground': '#000000',
      'titleBar.activeForeground': '#F0F0F0',
      'titleBar.border': '#00000000',
      'activityBar.background': '#000000',
      'activityBar.foreground': '#F0F0F0',
      'activityBar.inactiveForeground': '#B0B0B0',
      'activityBar.border': '#00000000',
      'activityBar.activeBorder': '#FFD700',
      'activityBarBadge.background': '#FFD700',
      'activityBarBadge.foreground': '#000000',
      'sideBar.background': '#000000',
      'sideBar.foreground': '#F0F0F0',
      'sideBar.border': '#1F1F1F60',
      'sideBarTitle.foreground': '#FFFFFF',
      'sideBarSectionHeader.background': '#00000000',
      'sideBarSectionHeader.foreground': '#FFD700',
      'editorGroupHeader.tabsBackground': '#000000',
      'editorGroupHeader.border': '#1F1F1F',
      'tab.activeBackground': '#000000',
      'tab.activeForeground': '#FFFFFF',
      'tab.inactiveBackground': '#000000',
      'tab.inactiveForeground': '#B0B0B0',
      'tab.border': '#00000000',
      'tab.activeBorder': '#00000000',
      'tab.activeBorderTop': '#FFD700',
      'statusBar.background': '#000000',
      'statusBar.foreground': '#F0F0F0',
      'statusBar.border': '#1F1F1F',
      'statusBar.debuggingBackground': '#FFD700',
      'statusBar.debuggingForeground': '#000000',
      'panel.background': '#000000',
      'panel.border': '#1F1F1F',
      'panelTitle.activeBorder': '#FFD700',
      'panelTitle.activeForeground': '#FFFFFF',
      'panelTitle.inactiveForeground': '#B0B0B0',
      'terminal.background': '#000000',
      'terminal.foreground': '#F0F0F0',
      'terminalCursor.foreground': '#FFD700',

      // AMOLED precision
      'editorLineNumber.foreground': '#2F2F2F',
      'editorLineNumber.activeForeground': '#B0B0B0',
      'editor.lineHighlightBackground': '#0A0A0A80',
      'editorCursor.foreground': '#FFD700',
      'editorWhitespace.foreground': '#1F1F1F40',
      'editorIndentGuide.background1': '#1F1F1F30',
      'editorIndentGuide.activeBackground1': '#FFD70060',
      'editorRuler.foreground': '#1F1F1F',
      'editorBracketMatch.background': '#FFD70028',
      'editorBracketMatch.border': '#FFD70080',

      // Gold selections
      'editor.selectionBackground': '#FFD70030',
      'editor.selectionHighlightBackground': '#FFD70018',
      'editor.inactiveSelectionBackground': '#FFD70015',
      'editor.wordHighlightBackground': '#87CEEB25',
      'editor.wordHighlightStrongBackground': '#87CEEB35',
      'editor.findMatchBackground': '#FFA50060',
      'editor.findMatchHighlightBackground': '#FFA50030',

      // Lists
      'list.activeSelectionBackground': '#141414',
      'list.activeSelectionForeground': '#FFFFFF',
      'list.inactiveSelectionBackground': '#0A0A0A',
      'list.hoverBackground': '#0A0A0A80',
      'list.focusBackground': '#141414',
      'list.highlightForeground': '#FFD700',

      // Inputs
      'input.background': '#0A0A0A',
      'input.border': '#1F1F1F',
      'input.foreground': '#FFFFFF',
      'input.placeholderForeground': '#B0B0B0',
      'dropdown.background': '#0A0A0A',
      'dropdown.border': '#1F1F1F',
      'dropdown.foreground': '#FFFFFF',

      // Buttons
      'button.background': '#FFD700',
      'button.foreground': '#000000',
      'button.hoverBackground': '#FFA500',

      // Badges
      'badge.background': '#FFD700',
      'badge.foreground': '#000000',

      // Minimap
      'minimap.background': '#000000',
      'minimap.findMatchHighlight': '#FFA50070',
      'minimap.selectionHighlight': '#FFD70050',

      // Breadcrumbs
      'breadcrumb.background': '#000000',
      'breadcrumb.foreground': '#B0B0B0',
      'breadcrumb.focusForeground': '#FFFFFF',
      'breadcrumb.activeSelectionForeground': '#FFD700',

      // Scroll
      'scrollbarSlider.background': '#B0B0B025',
      'scrollbarSlider.hoverBackground': '#B0B0B040',
      'scrollbarSlider.activeBackground': '#B0B0B060',

      // Git
      'gitDecoration.addedResourceForeground': '#98FB98',
      'gitDecoration.modifiedResourceForeground': '#87CEEB',
      'gitDecoration.deletedResourceForeground': '#FF6347',
      'gitDecoration.untrackedResourceForeground': '#00FF00',
      'gitDecoration.ignoredResourceForeground': '#7C7C7C'
    },
    tokens(c){
      return {
        comment: '#7C7C7C',
        keyword: '#FFD700',
        function: '#00FF00',
        variable: '#FFFFFF',
        string: '#98FB98',
        number: '#FFD700',
        constant: '#FFA500',
        storage: '#FF69B4',
        type: '#87CEEB',
        punctuation: c.textPrimary,
        invalid: '#FF6347',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FFD700',
        h2: '#00FF00',
        h3: '#FF69B4',
        h4: '#87CEEB',
        h5: '#98FB98',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('amoled','dark')
  };
