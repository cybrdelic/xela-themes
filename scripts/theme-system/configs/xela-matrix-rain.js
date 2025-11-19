/**
 * Theme: XELA Matrix Rain — Hyperphosphor Cascade
 * Type: dark
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-matrix-rain',
    name: 'XELA Matrix Rain — Hyperphosphor Cascade',
    type: 'dark',
    roles: {
      surface0: '#000A06',
      surface1: '#000D09',
      surface2: '#072E1F',
      surface3: '#0B3A29',
      panel: '#000D09',
      overlay: '#000A06F8',
      backdrop: '#00000099',
      border: '#072E1F',
      focus: withAlpha('#00FF87',0.6),
      textPrimary: '#B9FDE4',
      textSecondary: '#A4F6D6',
      textMuted: '#6DEAB8',
      textInverted: '#003321',
      accentPrimary: '#00FF87',
      accentPrimaryAlt: '#72FFD4',
      accentInfo: '#4DFFAA',
      accentWarn: '#FFE66D',
      accentError: '#FF4D5E',
      accentSuccess: '#00FF88',
      accentSelection: withAlpha('#00FF87',0.22),
      accentLink: '#72FFD4'
    },
    colorOverrides: {
      // Deep phosphor green terminal aesthetic
      'editor.background': '#000A06',
      'editor.foreground': '#B9FDE4',
      'titleBar.activeBackground': '#000D09',
      'titleBar.activeForeground': '#A4F6D6',
      'titleBar.border': '#00000000',
      'activityBar.background': '#000D09',
      'activityBar.foreground': '#A4F6D6',
      'activityBar.inactiveForeground': '#6DEAB8',
      'activityBar.border': '#00000000',
      'activityBar.activeBorder': '#00FF87',
      'activityBarBadge.background': '#00FF87',
      'activityBarBadge.foreground': '#003321',
      'sideBar.background': '#000D09',
      'sideBar.foreground': '#A4F6D6',
      'sideBar.border': '#072E1F80',
      'sideBarTitle.foreground': '#B9FDE4',
      'sideBarSectionHeader.background': '#00000000',
      'sideBarSectionHeader.foreground': '#00FF87',
      'editorGroupHeader.tabsBackground': '#000D09',
      'editorGroupHeader.border': '#072E1F',
      'tab.activeBackground': '#000A06',
      'tab.activeForeground': '#B9FDE4',
      'tab.inactiveBackground': '#000D09',
      'tab.inactiveForeground': '#6DEAB8',
      'tab.border': '#00000000',
      'tab.activeBorder': '#00000000',
      'tab.activeBorderTop': '#00FF87',
      'statusBar.background': '#000D09',
      'statusBar.foreground': '#A4F6D6',
      'statusBar.border': '#072E1F',
      'statusBar.debuggingBackground': '#00FF87',
      'statusBar.debuggingForeground': '#003321',
      'panel.background': '#000D09',
      'panel.border': '#072E1F',
      'panelTitle.activeBorder': '#00FF87',
      'panelTitle.activeForeground': '#B9FDE4',
      'panelTitle.inactiveForeground': '#6DEAB8',
      'terminal.background': '#000D09',
      'terminal.foreground': '#A4F6D6',
      'terminalCursor.foreground': '#00FF87',

      // Matrix cascade precision
      'editorLineNumber.foreground': '#0B3A2960',
      'editorLineNumber.activeForeground': '#6DEAB8',
      'editor.lineHighlightBackground': '#072E1F50',
      'editorCursor.foreground': '#00FF87',
      'editorWhitespace.foreground': '#072E1F50',
      'editorIndentGuide.background1': '#072E1F40',
      'editorIndentGuide.activeBackground1': '#00FF8760',
      'editorRuler.foreground': '#072E1F',
      'editorBracketMatch.background': '#00FF8730',
      'editorBracketMatch.border': '#00FF8790',

      // Phosphor selections
      'editor.selectionBackground': '#00FF8738',
      'editor.selectionHighlightBackground': '#00FF871F',
      'editor.inactiveSelectionBackground': '#00FF8718',
      'editor.wordHighlightBackground': '#72FFD428',
      'editor.wordHighlightStrongBackground': '#72FFD438',
      'editor.findMatchBackground': '#FFE66D60',
      'editor.findMatchHighlightBackground': '#FFE66D30',

      // Lists with cascade effect
      'list.activeSelectionBackground': '#072E1F',
      'list.activeSelectionForeground': '#B9FDE4',
      'list.inactiveSelectionBackground': '#0B3A2950',
      'list.hoverBackground': '#072E1F80',
      'list.focusBackground': '#0B3A29',
      'list.highlightForeground': '#00FF87',

      // Inputs
      'input.background': '#000D09',
      'input.border': '#072E1F',
      'input.foreground': '#B9FDE4',
      'input.placeholderForeground': '#6DEAB8',
      'dropdown.background': '#000D09',
      'dropdown.border': '#072E1F',
      'dropdown.foreground': '#B9FDE4',

      // Buttons
      'button.background': '#00FF87',
      'button.foreground': '#003321',
      'button.hoverBackground': '#72FFD4',

      // Badges
      'badge.background': '#00FF87',
      'badge.foreground': '#003321',

      // Minimap cascade
      'minimap.background': '#000A06',
      'minimap.findMatchHighlight': '#FFE66D70',
      'minimap.selectionHighlight': '#00FF8760',

      // Breadcrumbs
      'breadcrumb.background': '#000D09',
      'breadcrumb.foreground': '#6DEAB8',
      'breadcrumb.focusForeground': '#B9FDE4',
      'breadcrumb.activeSelectionForeground': '#00FF87',

      // Scroll
      'scrollbarSlider.background': '#6DEAB830',
      'scrollbarSlider.hoverBackground': '#6DEAB850',
      'scrollbarSlider.activeBackground': '#6DEAB870',

      // Git with phosphor glow
      'gitDecoration.addedResourceForeground': '#00FF88',
      'gitDecoration.modifiedResourceForeground': '#72FFD4',
      'gitDecoration.deletedResourceForeground': '#FF4D5E',
      'gitDecoration.untrackedResourceForeground': '#4DFFAA',
      'gitDecoration.ignoredResourceForeground': '#5A9C7E'
    },
    tokens(c){
      return {
        comment: '#5A9C7E',
        keyword: '#00FF87',
        function: '#72FFD4',
        variable: '#B9FDE4',
        string: '#00FF88',
        number: '#72FFD4',
        constant: '#A4F6D6',
        storage: '#00FF87',
        type: '#4DFFAA',
        punctuation: c.textPrimary,
        invalid: '#FF4D5E',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#00FF87',
        h2: '#72FFD4',
        h3: '#4DFFAA',
        h4: '#B9FDE4',
        h5: '#A4F6D6',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('matrix','dark')
  };
