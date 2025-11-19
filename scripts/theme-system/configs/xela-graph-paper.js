/**
 * Theme: XELA Graph Paper — Light Grid
 * Type: light
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-graph-paper',
    name: 'XELA Graph Paper — Light Grid',
    type: 'light',
    roles: {
      surface0: '#FEFEFE',
      surface1: '#F9F9F9',
      surface2: '#F0F0F0',
      surface3: '#E8E8E8',
      panel: '#FFFFFF',
      overlay: '#FEFEFEFF',
      backdrop: '#FFFFFF99',
      border: '#E0E0E0',
      focus: withAlpha('#1976D2',0.6),
      textPrimary: '#212121',
      textSecondary: '#424242',
      textMuted: '#757575',
      textInverted: '#FFFFFF',
      accentPrimary: '#1976D2',
      accentPrimaryAlt: '#2196F3',
      accentInfo: '#0288D1',
      accentWarn: '#F57C00',
      accentError: '#D32F2F',
      accentSuccess: '#388E3C',
      accentSelection: withAlpha('#1976D2',0.15),
      accentLink: '#1976D2'
    },
    colorOverrides: {
      // Engineering grid aesthetic
      'editor.background': '#FEFEFE',
      'editor.foreground': '#212121',
      'titleBar.activeBackground': '#F9F9F9',
      'titleBar.activeForeground': '#424242',
      'titleBar.border': '#E0E0E0',
      'activityBar.background': '#F9F9F9',
      'activityBar.foreground': '#424242',
      'activityBar.inactiveForeground': '#757575',
      'activityBar.border': '#E0E0E0',
      'activityBar.activeBorder': '#1976D2',
      'activityBarBadge.background': '#1976D2',
      'activityBarBadge.foreground': '#FFFFFF',
      'sideBar.background': '#F9F9F9',
      'sideBar.foreground': '#424242',
      'sideBar.border': '#E0E0E0',
      'sideBarTitle.foreground': '#212121',
      'sideBarSectionHeader.background': '#00000000',
      'sideBarSectionHeader.foreground': '#212121',
      'editorGroupHeader.tabsBackground': '#F9F9F9',
      'editorGroupHeader.border': '#E0E0E0',
      'tab.activeBackground': '#FEFEFE',
      'tab.activeForeground': '#212121',
      'tab.inactiveBackground': '#F9F9F9',
      'tab.inactiveForeground': '#757575',
      'tab.border': '#E0E0E0',
      'tab.activeBorder': '#00000000',
      'tab.activeBorderTop': '#1976D2',
      'statusBar.background': '#F9F9F9',
      'statusBar.foreground': '#424242',
      'statusBar.border': '#E0E0E0',
      'statusBar.debuggingBackground': '#1976D2',
      'statusBar.debuggingForeground': '#FFFFFF',
      'panel.background': '#FFFFFF',
      'panel.border': '#E0E0E0',
      'panelTitle.activeBorder': '#1976D2',
      'panelTitle.activeForeground': '#212121',
      'panelTitle.inactiveForeground': '#757575',
      'terminal.background': '#FFFFFF',
      'terminal.foreground': '#424242',
      'terminalCursor.foreground': '#1976D2',

      // Grid precision
      'editorLineNumber.foreground': '#BDBDBD',
      'editorLineNumber.activeForeground': '#757575',
      'editor.lineHighlightBackground': '#F0F0F0B0',
      'editorCursor.foreground': '#1976D2',
      'editorWhitespace.foreground': '#E0E0E060',
      'editorIndentGuide.background1': '#E0E0E050',
      'editorIndentGuide.activeBackground1': '#1976D260',
      'editorRuler.foreground': '#E0E0E0',
      'editorBracketMatch.background': '#1976D228',
      'editorBracketMatch.border': '#1976D290',

      // Clean selections
      'editor.selectionBackground': '#1976D228',
      'editor.selectionHighlightBackground': '#1976D218',
      'editor.inactiveSelectionBackground': '#1976D215',
      'editor.wordHighlightBackground': '#2196F320',
      'editor.wordHighlightStrongBackground': '#2196F330',
      'editor.findMatchBackground': '#F57C0050',
      'editor.findMatchHighlightBackground': '#F57C0028',

      // Lists
      'list.activeSelectionBackground': '#F0F0F0',
      'list.activeSelectionForeground': '#212121',
      'list.inactiveSelectionBackground': '#E8E8E8',
      'list.hoverBackground': '#F0F0F0C0',
      'list.focusBackground': '#E8E8E8',
      'list.highlightForeground': '#1976D2',

      // Inputs
      'input.background': '#FFFFFF',
      'input.border': '#E0E0E0',
      'input.foreground': '#212121',
      'input.placeholderForeground': '#757575',
      'dropdown.background': '#FFFFFF',
      'dropdown.border': '#E0E0E0',
      'dropdown.foreground': '#212121',

      // Buttons
      'button.background': '#1976D2',
      'button.foreground': '#FFFFFF',
      'button.hoverBackground': '#2196F3',

      // Badges
      'badge.background': '#1976D2',
      'badge.foreground': '#FFFFFF',

      // Minimap
      'minimap.background': '#FEFEFE',
      'minimap.findMatchHighlight': '#F57C0060',
      'minimap.selectionHighlight': '#1976D250',

      // Breadcrumbs
      'breadcrumb.background': '#F9F9F9',
      'breadcrumb.foreground': '#757575',
      'breadcrumb.focusForeground': '#212121',
      'breadcrumb.activeSelectionForeground': '#1976D2',

      // Scroll
      'scrollbarSlider.background': '#75757530',
      'scrollbarSlider.hoverBackground': '#75757550',
      'scrollbarSlider.activeBackground': '#75757570',

      // Git
      'gitDecoration.addedResourceForeground': '#388E3C',
      'gitDecoration.modifiedResourceForeground': '#2196F3',
      'gitDecoration.deletedResourceForeground': '#D32F2F',
      'gitDecoration.untrackedResourceForeground': '#0288D1',
      'gitDecoration.ignoredResourceForeground': '#9E9E9E'
    },
    tokens(c){
      return {
        comment: '#9E9E9E',
        keyword: '#5E35B1',
        function: '#1976D2',
        variable: '#212121',
        string: '#388E3C',
        number: '#F57C00',
        constant: '#7B1FA2',
        storage: '#C2185B',
        type: '#0288D1',
        punctuation: c.textPrimary,
        invalid: '#D32F2F',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#212121',
        h2: '#1976D2',
        h3: '#5E35B1',
        h4: '#0288D1',
        h5: '#388E3C',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('graph','light')
  };
