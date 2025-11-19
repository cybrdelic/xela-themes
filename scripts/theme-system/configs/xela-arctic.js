/**
 * Theme: XELA Arctic — Crystal Light
 * Type: light
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-arctic',
    name: 'XELA Arctic — Crystal Light',
    type: 'light',
    roles: {
      surface0: '#F8FAFB',
      surface1: '#F3F6F8',
      surface2: '#EDF3F7',
      surface3: '#E8F1F7',
      panel: '#FFFFFF',
      overlay: '#FFFFFFF8',
      backdrop: '#FFFFFF99',
      border: '#E5EDF2',
      focus: withAlpha('#2980B9',0.6),
      textPrimary: '#2C3E50',
      textSecondary: '#34495E',
      textMuted: '#7F8C8D',
      textInverted: '#FFFFFF',
      accentPrimary: '#2980B9',
      accentPrimaryAlt: '#3498DB',
      accentInfo: '#16A085',
      accentWarn: '#F39C12',
      accentError: '#E74C3C',
      accentSuccess: '#27AE60',
      accentSelection: withAlpha('#2980B9',0.18),
      accentLink: '#2980B9'
    },
    colorOverrides: {
      // Pristine arctic light hierarchy
      'editor.background': '#F8FAFB',
      'editor.foreground': '#2C3E50',
      'titleBar.activeBackground': '#F3F6F8',
      'titleBar.activeForeground': '#34495E',
      'titleBar.border': '#00000000',
      'activityBar.background': '#F3F6F8',
      'activityBar.foreground': '#34495E',
      'activityBar.inactiveForeground': '#7F8C8D',
      'activityBar.border': '#00000000',
      'activityBar.activeBorder': '#2980B9',
      'activityBarBadge.background': '#2980B9',
      'activityBarBadge.foreground': '#FFFFFF',
      'sideBar.background': '#F3F6F8',
      'sideBar.foreground': '#34495E',
      'sideBar.border': '#E5EDF280',
      'sideBarTitle.foreground': '#2C3E50',
      'sideBarSectionHeader.background': '#00000000',
      'sideBarSectionHeader.foreground': '#2C3E50',
      'editorGroupHeader.tabsBackground': '#F3F6F8',
      'editorGroupHeader.border': '#E5EDF2',
      'tab.activeBackground': '#F8FAFB',
      'tab.activeForeground': '#2C3E50',
      'tab.inactiveBackground': '#F3F6F8',
      'tab.inactiveForeground': '#7F8C8D',
      'tab.border': '#00000000',
      'tab.activeBorder': '#00000000',
      'tab.activeBorderTop': '#2980B9',
      'statusBar.background': '#F3F6F8',
      'statusBar.foreground': '#34495E',
      'statusBar.border': '#E5EDF2',
      'statusBar.debuggingBackground': '#F39C12',
      'statusBar.debuggingForeground': '#FFFFFF',
      'panel.background': '#FFFFFF',
      'panel.border': '#E5EDF2',
      'panelTitle.activeBorder': '#2980B9',
      'panelTitle.activeForeground': '#2C3E50',
      'panelTitle.inactiveForeground': '#7F8C8D',
      'terminal.background': '#FFFFFF',
      'terminal.foreground': '#34495E',
      'terminalCursor.foreground': '#2980B9',

      // Crystal clarity precision
      'editorLineNumber.foreground': '#BDC3C7',
      'editorLineNumber.activeForeground': '#7F8C8D',
      'editor.lineHighlightBackground': '#EDF3F7B0',
      'editorCursor.foreground': '#2980B9',
      'editorWhitespace.foreground': '#E5EDF260',
      'editorIndentGuide.background1': '#E5EDF240',
      'editorIndentGuide.activeBackground1': '#2980B960',
      'editorRuler.foreground': '#E5EDF2',
      'editorBracketMatch.background': '#2980B930',
      'editorBracketMatch.border': '#2980B990',

      // Clean selections
      'editor.selectionBackground': '#2980B930',
      'editor.selectionHighlightBackground': '#2980B920',
      'editor.inactiveSelectionBackground': '#2980B918',
      'editor.wordHighlightBackground': '#3498DB28',
      'editor.wordHighlightStrongBackground': '#3498DB38',
      'editor.findMatchBackground': '#F39C1260',
      'editor.findMatchHighlightBackground': '#F39C1230',

      // Lists
      'list.activeSelectionBackground': '#EDF3F7',
      'list.activeSelectionForeground': '#2C3E50',
      'list.inactiveSelectionBackground': '#E8F1F7',
      'list.hoverBackground': '#EDF3F7C0',
      'list.focusBackground': '#E8F1F7',
      'list.highlightForeground': '#2980B9',

      // Inputs
      'input.background': '#FFFFFF',
      'input.border': '#E5EDF2',
      'input.foreground': '#2C3E50',
      'input.placeholderForeground': '#7F8C8D',
      'dropdown.background': '#FFFFFF',
      'dropdown.border': '#E5EDF2',
      'dropdown.foreground': '#2C3E50',

      // Buttons
      'button.background': '#2980B9',
      'button.foreground': '#FFFFFF',
      'button.hoverBackground': '#3498DB',

      // Badges
      'badge.background': '#2980B9',
      'badge.foreground': '#FFFFFF',

      // Minimap
      'minimap.background': '#F8FAFB',
      'minimap.findMatchHighlight': '#F39C1270',
      'minimap.selectionHighlight': '#2980B960',

      // Breadcrumbs
      'breadcrumb.background': '#F3F6F8',
      'breadcrumb.foreground': '#7F8C8D',
      'breadcrumb.focusForeground': '#2C3E50',
      'breadcrumb.activeSelectionForeground': '#2980B9',

      // Scroll
      'scrollbarSlider.background': '#7F8C8D30',
      'scrollbarSlider.hoverBackground': '#7F8C8D50',
      'scrollbarSlider.activeBackground': '#7F8C8D70',

      // Git
      'gitDecoration.addedResourceForeground': '#27AE60',
      'gitDecoration.modifiedResourceForeground': '#3498DB',
      'gitDecoration.deletedResourceForeground': '#E74C3C',
      'gitDecoration.untrackedResourceForeground': '#16A085',
      'gitDecoration.ignoredResourceForeground': '#95A5A6'
    },
    tokens(c){
      return {
        comment: '#95A5A6',
        keyword: '#8E44AD',
        function: '#2980B9',
        variable: '#2C3E50',
        string: '#27AE60',
        number: '#E67E22',
        constant: '#9B59B6',
        storage: '#8E44AD',
        type: '#3498DB',
        punctuation: c.textPrimary,
        invalid: '#E74C3C',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#2C3E50',
        h2: '#2980B9',
        h3: '#8E44AD',
        h4: '#16A085',
        h5: '#27AE60',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('arctic','light')
  };
