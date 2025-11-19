/**
 * Theme: XELA Vapor — Neon Retrowave
 * Type: dark
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-vapor',
    name: 'XELA Vapor — Neon Retrowave',
    type: 'dark',
    roles: {
      surface0: '#1A0033',
      surface1: '#110026',
      surface2: '#2B0055',
      surface3: '#33003A',
      panel: '#110026',
      overlay: '#1A0033F8',
      backdrop: '#00000099',
      border: '#2B0055',
      focus: withAlpha('#FF00FF',0.6),
      textPrimary: '#EAD7FF',
      textSecondary: '#F7E9FF',
      textMuted: '#C9B1E6',
      textInverted: '#110026',
      accentPrimary: '#FF00FF',
      accentPrimaryAlt: '#00FFFF',
      accentInfo: '#00FFFF',
      accentWarn: '#FFB86C',
      accentError: '#FF5555',
      accentSuccess: '#50FA7B',
      accentSelection: withAlpha('#FF00FF',0.22),
      accentLink: '#00FFFF'
    },
    colorOverrides: {
      // Vaporwave retrowave aesthetic
      'editor.background': '#1A0033',
      'editor.foreground': '#EAD7FF',
      'titleBar.activeBackground': '#110026',
      'titleBar.activeForeground': '#F7E9FF',
      'titleBar.border': '#00000000',
      'activityBar.background': '#110026',
      'activityBar.foreground': '#F7E9FF',
      'activityBar.inactiveForeground': '#C9B1E6',
      'activityBar.border': '#00000000',
      'activityBar.activeBorder': '#FF00FF',
      'activityBarBadge.background': '#FF00FF',
      'activityBarBadge.foreground': '#110026',
      'sideBar.background': '#110026',
      'sideBar.foreground': '#F7E9FF',
      'sideBar.border': '#2B005580',
      'sideBarTitle.foreground': '#EAD7FF',
      'sideBarSectionHeader.background': '#00000000',
      'sideBarSectionHeader.foreground': '#FF00FF',
      'editorGroupHeader.tabsBackground': '#110026',
      'editorGroupHeader.border': '#2B0055',
      'tab.activeBackground': '#1A0033',
      'tab.activeForeground': '#EAD7FF',
      'tab.inactiveBackground': '#110026',
      'tab.inactiveForeground': '#C9B1E6',
      'tab.border': '#00000000',
      'tab.activeBorder': '#00000000',
      'tab.activeBorderTop': '#FF00FF',
      'statusBar.background': '#110026',
      'statusBar.foreground': '#F7E9FF',
      'statusBar.border': '#2B0055',
      'statusBar.debuggingBackground': '#FF00FF',
      'statusBar.debuggingForeground': '#110026',
      'panel.background': '#110026',
      'panel.border': '#2B0055',
      'panelTitle.activeBorder': '#FF00FF',
      'panelTitle.activeForeground': '#EAD7FF',
      'panelTitle.inactiveForeground': '#C9B1E6',
      'terminal.background': '#110026',
      'terminal.foreground': '#F7E9FF',
      'terminalCursor.foreground': '#FF00FF',

      // Neon precision
      'editorLineNumber.foreground': '#33003A60',
      'editorLineNumber.activeForeground': '#C9B1E6',
      'editor.lineHighlightBackground': '#2B005550',
      'editorCursor.foreground': '#FF00FF',
      'editorWhitespace.foreground': '#2B005550',
      'editorIndentGuide.background1': '#2B005540',
      'editorIndentGuide.activeBackground1': '#FF00FF60',
      'editorRuler.foreground': '#2B0055',
      'editorBracketMatch.background': '#FF00FF30',
      'editorBracketMatch.border': '#FF00FF90',

      // Retrowave selections
      'editor.selectionBackground': '#FF00FF38',
      'editor.selectionHighlightBackground': '#FF00FF20',
      'editor.inactiveSelectionBackground': '#FF00FF18',
      'editor.wordHighlightBackground': '#00FFFF28',
      'editor.wordHighlightStrongBackground': '#00FFFF38',
      'editor.findMatchBackground': '#FFB86C60',
      'editor.findMatchHighlightBackground': '#FFB86C30',

      // Lists
      'list.activeSelectionBackground': '#2B0055',
      'list.activeSelectionForeground': '#EAD7FF',
      'list.inactiveSelectionBackground': '#33003A50',
      'list.hoverBackground': '#2B005580',
      'list.focusBackground': '#33003A',
      'list.highlightForeground': '#FF00FF',

      // Inputs
      'input.background': '#110026',
      'input.border': '#2B0055',
      'input.foreground': '#EAD7FF',
      'input.placeholderForeground': '#C9B1E6',
      'dropdown.background': '#110026',
      'dropdown.border': '#2B0055',
      'dropdown.foreground': '#EAD7FF',

      // Buttons
      'button.background': '#FF00FF',
      'button.foreground': '#110026',
      'button.hoverBackground': '#FF79C6',

      // Badges
      'badge.background': '#FF00FF',
      'badge.foreground': '#110026',

      // Minimap
      'minimap.background': '#1A0033',
      'minimap.findMatchHighlight': '#FFB86C70',
      'minimap.selectionHighlight': '#FF00FF60',

      // Breadcrumbs
      'breadcrumb.background': '#110026',
      'breadcrumb.foreground': '#C9B1E6',
      'breadcrumb.focusForeground': '#EAD7FF',
      'breadcrumb.activeSelectionForeground': '#FF00FF',

      // Scroll
      'scrollbarSlider.background': '#C9B1E630',
      'scrollbarSlider.hoverBackground': '#C9B1E650',
      'scrollbarSlider.activeBackground': '#C9B1E670',

      // Git with neon
      'gitDecoration.addedResourceForeground': '#50FA7B',
      'gitDecoration.modifiedResourceForeground': '#00FFFF',
      'gitDecoration.deletedResourceForeground': '#FF5555',
      'gitDecoration.untrackedResourceForeground': '#BD93F9',
      'gitDecoration.ignoredResourceForeground': '#BDA6DB'
    },
    tokens(c){
      return {
        comment: '#BDA6DB',
        keyword: '#FF00FF',
        function: '#00FFFF',
        variable: '#EAD7FF',
        string: '#50FA7B',
        number: '#FFB86C',
        constant: '#BD93F9',
        storage: '#FF79C6',
        type: '#8BE9FD',
        punctuation: c.textPrimary,
        invalid: '#FF5555',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FF00FF',
        h2: '#00FFFF',
        h3: '#BD93F9',
        h4: '#FFB86C',
        h5: '#50FA7B',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('vapor','dark')
  };
