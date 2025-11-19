/**
 * Theme: XELA Dark — Balanced Dark
 * Type: dark
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-dark',
    name: 'XELA Dark — Balanced Dark',
    type: 'dark',
    roles: {
      surface0: '#0F0F0F',
      surface1: '#1A1A1A',
      surface2: '#242424',
      surface3: '#2E2E2E',
      panel: '#1A1A1A',
      overlay: '#0F0F0FF8',
      backdrop: '#00000099',
      border: '#333333',
      focus: withAlpha('#00A8FF',0.6),
      textPrimary: '#F0F0F0',
      textSecondary: '#D0D0D0',
      textMuted: '#A0A0A0',
      textInverted: '#0F0F0F',
      accentPrimary: '#00A8FF',
      accentPrimaryAlt: '#33B8FF',
      accentInfo: '#00A8FF',
      accentWarn: '#FFB347',
      accentError: '#FF6B6B',
      accentSuccess: '#4ECDC4',
      accentSelection: withAlpha('#00A8FF',0.22),
      accentLink: '#33B8FF'
    },
    colorOverrides: {
      // Perfectly balanced neutral dark
      'editor.background': '#0F0F0F',
      'editor.foreground': '#F0F0F0',
      'titleBar.activeBackground': '#1A1A1A',
      'titleBar.activeForeground': '#D0D0D0',
      'titleBar.border': '#00000000',
      'activityBar.background': '#1A1A1A',
      'activityBar.foreground': '#D0D0D0',
      'activityBar.inactiveForeground': '#A0A0A0',
      'activityBar.border': '#00000000',
      'activityBar.activeBorder': '#00A8FF',
      'activityBarBadge.background': '#00A8FF',
      'activityBarBadge.foreground': '#0F0F0F',
      'sideBar.background': '#1A1A1A',
      'sideBar.foreground': '#D0D0D0',
      'sideBar.border': '#33333380',
      'sideBarTitle.foreground': '#F0F0F0',
      'sideBarSectionHeader.background': '#00000000',
      'sideBarSectionHeader.foreground': '#F0F0F0',
      'editorGroupHeader.tabsBackground': '#1A1A1A',
      'editorGroupHeader.border': '#333333',
      'tab.activeBackground': '#0F0F0F',
      'tab.activeForeground': '#F0F0F0',
      'tab.inactiveBackground': '#1A1A1A',
      'tab.inactiveForeground': '#A0A0A0',
      'tab.border': '#00000000',
      'tab.activeBorder': '#00000000',
      'tab.activeBorderTop': '#00A8FF',
      'statusBar.background': '#1A1A1A',
      'statusBar.foreground': '#D0D0D0',
      'statusBar.border': '#333333',
      'statusBar.debuggingBackground': '#00A8FF',
      'statusBar.debuggingForeground': '#0F0F0F',
      'panel.background': '#1A1A1A',
      'panel.border': '#333333',
      'panelTitle.activeBorder': '#00A8FF',
      'panelTitle.activeForeground': '#F0F0F0',
      'panelTitle.inactiveForeground': '#A0A0A0',
      'terminal.background': '#1A1A1A',
      'terminal.foreground': '#D0D0D0',
      'terminalCursor.foreground': '#00A8FF',

      // Balanced precision
      'editorLineNumber.foreground': '#2E2E2E',
      'editorLineNumber.activeForeground': '#A0A0A0',
      'editor.lineHighlightBackground': '#1A1A1A80',
      'editorCursor.foreground': '#00A8FF',
      'editorWhitespace.foreground': '#33333350',
      'editorIndentGuide.background1': '#33333340',
      'editorIndentGuide.activeBackground1': '#00A8FF60',
      'editorRuler.foreground': '#333333',
      'editorBracketMatch.background': '#00A8FF30',
      'editorBracketMatch.border': '#00A8FF90',

      // Neutral selections
      'editor.selectionBackground': '#00A8FF35',
      'editor.selectionHighlightBackground': '#00A8FF20',
      'editor.inactiveSelectionBackground': '#00A8FF18',
      'editor.wordHighlightBackground': '#33B8FF28',
      'editor.wordHighlightStrongBackground': '#33B8FF38',
      'editor.findMatchBackground': '#FFB34760',
      'editor.findMatchHighlightBackground': '#FFB34730',

      // Lists
      'list.activeSelectionBackground': '#242424',
      'list.activeSelectionForeground': '#F0F0F0',
      'list.inactiveSelectionBackground': '#1A1A1A',
      'list.hoverBackground': '#24242480',
      'list.focusBackground': '#2E2E2E',
      'list.highlightForeground': '#00A8FF',

      // Inputs
      'input.background': '#1A1A1A',
      'input.border': '#333333',
      'input.foreground': '#F0F0F0',
      'input.placeholderForeground': '#A0A0A0',
      'dropdown.background': '#1A1A1A',
      'dropdown.border': '#333333',
      'dropdown.foreground': '#F0F0F0',

      // Buttons
      'button.background': '#00A8FF',
      'button.foreground': '#0F0F0F',
      'button.hoverBackground': '#33B8FF',

      // Badges
      'badge.background': '#00A8FF',
      'badge.foreground': '#0F0F0F',

      // Minimap
      'minimap.background': '#0F0F0F',
      'minimap.findMatchHighlight': '#FFB34770',
      'minimap.selectionHighlight': '#00A8FF60',

      // Breadcrumbs
      'breadcrumb.background': '#1A1A1A',
      'breadcrumb.foreground': '#A0A0A0',
      'breadcrumb.focusForeground': '#F0F0F0',
      'breadcrumb.activeSelectionForeground': '#00A8FF',

      // Scroll
      'scrollbarSlider.background': '#A0A0A030',
      'scrollbarSlider.hoverBackground': '#A0A0A050',
      'scrollbarSlider.activeBackground': '#A0A0A070',

      // Git
      'gitDecoration.addedResourceForeground': '#4ECDC4',
      'gitDecoration.modifiedResourceForeground': '#00A8FF',
      'gitDecoration.deletedResourceForeground': '#FF6B6B',
      'gitDecoration.untrackedResourceForeground': '#33B8FF',
      'gitDecoration.ignoredResourceForeground': '#888888'
    },
    tokens(c){
      return {
        comment: '#888888',
        keyword: '#C586C0',
        function: '#DCDCAA',
        variable: '#9CDCFE',
        string: '#CE9178',
        number: '#B5CEA8',
        constant: '#569CD6',
        storage: '#C586C0',
        type: '#4EC9B0',
        punctuation: c.textPrimary,
        invalid: '#F44747',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#569CD6',
        h2: '#4EC9B0',
        h3: '#DCDCAA',
        h4: '#9CDCFE',
        h5: '#CE9178',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('dark','dark')
  };
