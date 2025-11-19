/**
 * Theme: XELA Black — Pure OLED
 * Type: dark
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-black',
    name: 'XELA Black — Pure OLED',
    type: 'dark',
    roles: {
      surface0: '#000000',      // Pure black editor
      surface1: '#000000',      // Pure black sidebar
      surface2: '#0A0A0A',      // Barely elevated
      surface3: '#141414',      // Subtle elevation
      panel: '#000000',         // Pure black terminal
      overlay: '#000000F8',
      backdrop: '#00000099',
      border: '#1F1F1F',
      focus: withAlpha('#00F5A0', 0.6),
      textPrimary: '#F5F2E8',
      textSecondary: '#EADCB2',
      textMuted: '#8E93A6',
      textInverted: '#000000',
      accentPrimary: '#00F5A0',
      accentPrimaryAlt: '#3DFFA8',
      accentInfo: '#D8C8FF',
      accentWarn: '#FFD166',
      accentError: '#FF3366',
      accentSuccess: '#22C55E',
      accentSelection: withAlpha('#00F5A0', 0.22),
      accentLink: '#3DFFA8'
    },
    colorOverrides: {
      // Pure OLED black hierarchy
      'editor.background': '#000000',
      'editor.foreground': '#F5F2E8',
      'titleBar.activeBackground': '#000000',
      'titleBar.activeForeground': '#EADCB2',
      'titleBar.border': '#00000000',
      'activityBar.background': '#000000',
      'activityBar.foreground': '#EADCB2',
      'activityBar.inactiveForeground': '#8E93A6',
      'activityBar.border': '#00000000',
      'activityBar.activeBorder': '#00F5A0',
      'activityBarBadge.background': '#00F5A0',
      'activityBarBadge.foreground': '#000000',
      'sideBar.background': '#000000',
      'sideBar.foreground': '#EADCB2',
      'sideBar.border': '#1F1F1F60',
      'sideBarTitle.foreground': '#F5F2E8',
      'sideBarSectionHeader.background': '#00000000',
      'sideBarSectionHeader.foreground': '#F5F2E8',
      'editorGroupHeader.tabsBackground': '#000000',
      'editorGroupHeader.border': '#1F1F1F',
      'tab.activeBackground': '#000000',
      'tab.activeForeground': '#F5F2E8',
      'tab.inactiveBackground': '#000000',
      'tab.inactiveForeground': '#8E93A6',
      'tab.border': '#00000000',
      'tab.activeBorder': '#00000000',
      'tab.activeBorderTop': '#00F5A0',
      'statusBar.background': '#000000',
      'statusBar.foreground': '#EADCB2',
      'statusBar.border': '#1F1F1F',
      'statusBar.debuggingBackground': '#FFD166',
      'statusBar.debuggingForeground': '#000000',
      'panel.background': '#000000',
      'panel.border': '#1F1F1F',
      'panelTitle.activeBorder': '#00F5A0',
      'panelTitle.activeForeground': '#F5F2E8',
      'panelTitle.inactiveForeground': '#8E93A6',
      'terminal.background': '#000000',
      'terminal.foreground': '#EADCB2',
      'terminalCursor.foreground': '#00F5A0',

      // Editor precision
      'editorLineNumber.foreground': '#2F2F2F',
      'editorLineNumber.activeForeground': '#8E93A6',
      'editor.lineHighlightBackground': '#0A0A0A80',
      'editorCursor.foreground': '#00F5A0',
      'editorWhitespace.foreground': '#1F1F1F40',
      'editorIndentGuide.background1': '#1F1F1F30',
      'editorIndentGuide.activeBackground1': '#00F5A060',
      'editorRuler.foreground': '#1F1F1F',
      'editorBracketMatch.background': '#00F5A028',
      'editorBracketMatch.border': '#00F5A080',

      // Selections
      'editor.selectionBackground': '#00F5A030',
      'editor.selectionHighlightBackground': '#00F5A018',
      'editor.inactiveSelectionBackground': '#00F5A015',
      'editor.wordHighlightBackground': '#D8C8FF25',
      'editor.wordHighlightStrongBackground': '#D8C8FF35',
      'editor.findMatchBackground': '#FFD16650',
      'editor.findMatchHighlightBackground': '#FFD16628',

      // Lists
      'list.activeSelectionBackground': '#141414',
      'list.activeSelectionForeground': '#F5F2E8',
      'list.inactiveSelectionBackground': '#0A0A0A',
      'list.hoverBackground': '#0A0A0A80',
      'list.focusBackground': '#141414',
      'list.highlightForeground': '#00F5A0',

      // Inputs
      'input.background': '#0A0A0A',
      'input.border': '#1F1F1F',
      'input.foreground': '#F5F2E8',
      'input.placeholderForeground': '#8E93A6',
      'dropdown.background': '#0A0A0A',
      'dropdown.border': '#1F1F1F',
      'dropdown.foreground': '#F5F2E8',

      // Buttons
      'button.background': '#00F5A0',
      'button.foreground': '#000000',
      'button.hoverBackground': '#3DFFA8',

      // Badges
      'badge.background': '#00F5A0',
      'badge.foreground': '#000000',

      // Minimap
      'minimap.background': '#000000',
      'minimap.findMatchHighlight': '#FFD16670',
      'minimap.selectionHighlight': '#00F5A050',

      // Breadcrumbs
      'breadcrumb.background': '#000000',
      'breadcrumb.foreground': '#8E93A6',
      'breadcrumb.focusForeground': '#F5F2E8',
      'breadcrumb.activeSelectionForeground': '#00F5A0',

      // Scroll
      'scrollbarSlider.background': '#8E93A625',
      'scrollbarSlider.hoverBackground': '#8E93A640',
      'scrollbarSlider.activeBackground': '#8E93A660',

      // Git
      'gitDecoration.addedResourceForeground': '#22C55E',
      'gitDecoration.modifiedResourceForeground': '#D8C8FF',
      'gitDecoration.deletedResourceForeground': '#FF3366',
      'gitDecoration.untrackedResourceForeground': '#3DFFA8',
      'gitDecoration.ignoredResourceForeground': '#8E93A6'
    },
    tokens(c){
      return {
        comment: '#8E93A6',
        keyword: '#FFD166',
        function: '#00F5A0',
        variable: '#EADCB2',
        string: '#22C55E',
        number: '#FFD166',
        constant: '#F2C97D',
        storage: '#FF3CAC',
        type: '#D8C8FF',
        punctuation: c.textPrimary,
        invalid: '#FF3366',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: c.accentWarn,
        h2: '#F5F2E8',
        h3: '#FF8BDA',
        h4: c.accentPrimaryAlt,
        h5: c.accentSuccess,
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('black','dark')
  };
