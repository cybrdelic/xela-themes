/**
 * Theme: XELA Night Vision — Tactical Display
 * Type: dark
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-night-vision',
    name: 'XELA Night Vision — Tactical Display',
    type: 'dark',
    roles: {
      surface0: '#0B0F0A',
      surface1: '#0E130E',
      surface2: '#121812',
      surface3: '#162016',
      panel: '#0B0F0A',
      overlay: '#0B0F0AF8',
      backdrop: '#00000099',
      border: '#121812',
      focus: withAlpha('#6BFF3E',0.6),
      textPrimary: '#E4FFE4',
      textSecondary: '#D9FAD9',
      textMuted: '#B5CBB5',
      textInverted: '#061106',
      accentPrimary: '#6BFF3E',
      accentPrimaryAlt: '#A8FF74',
      accentInfo: '#6BFF3E',
      accentWarn: '#FFB224',
      accentError: '#FF5A87',
      accentSuccess: '#6BFF3E',
      accentSelection: withAlpha('#6BFF3E',0.2),
      accentLink: '#A8FF74'
    },
    colorOverrides: {
      // Military night vision aesthetic
      'editor.background': '#0B0F0A',
      'editor.foreground': '#E4FFE4',
      'titleBar.activeBackground': '#0E130E',
      'titleBar.activeForeground': '#D9FAD9',
      'titleBar.border': '#00000000',
      'activityBar.background': '#0E130E',
      'activityBar.foreground': '#D9FAD9',
      'activityBar.inactiveForeground': '#B5CBB5',
      'activityBar.border': '#00000000',
      'activityBar.activeBorder': '#6BFF3E',
      'activityBarBadge.background': '#6BFF3E',
      'activityBarBadge.foreground': '#061106',
      'sideBar.background': '#0E130E',
      'sideBar.foreground': '#D9FAD9',
      'sideBar.border': '#12181280',
      'sideBarTitle.foreground': '#E4FFE4',
      'sideBarSectionHeader.background': '#00000000',
      'sideBarSectionHeader.foreground': '#6BFF3E',
      'editorGroupHeader.tabsBackground': '#0E130E',
      'editorGroupHeader.border': '#121812',
      'tab.activeBackground': '#0B0F0A',
      'tab.activeForeground': '#E4FFE4',
      'tab.inactiveBackground': '#0E130E',
      'tab.inactiveForeground': '#B5CBB5',
      'tab.border': '#00000000',
      'tab.activeBorder': '#00000000',
      'tab.activeBorderTop': '#6BFF3E',
      'statusBar.background': '#0E130E',
      'statusBar.foreground': '#D9FAD9',
      'statusBar.border': '#121812',
      'statusBar.debuggingBackground': '#6BFF3E',
      'statusBar.debuggingForeground': '#061106',
      'panel.background': '#0B0F0A',
      'panel.border': '#121812',
      'panelTitle.activeBorder': '#6BFF3E',
      'panelTitle.activeForeground': '#E4FFE4',
      'panelTitle.inactiveForeground': '#B5CBB5',
      'terminal.background': '#0B0F0A',
      'terminal.foreground': '#D9FAD9',
      'terminalCursor.foreground': '#6BFF3E',

      // Tactical precision
      'editorLineNumber.foreground': '#16201660',
      'editorLineNumber.activeForeground': '#B5CBB5',
      'editor.lineHighlightBackground': '#12181250',
      'editorCursor.foreground': '#6BFF3E',
      'editorWhitespace.foreground': '#12181250',
      'editorIndentGuide.background1': '#12181240',
      'editorIndentGuide.activeBackground1': '#6BFF3E60',
      'editorRuler.foreground': '#121812',
      'editorBracketMatch.background': '#6BFF3E30',
      'editorBracketMatch.border': '#6BFF3E90',

      // Night vision selections
      'editor.selectionBackground': '#6BFF3E35',
      'editor.selectionHighlightBackground': '#6BFF3E20',
      'editor.inactiveSelectionBackground': '#6BFF3E18',
      'editor.wordHighlightBackground': '#A8FF7428',
      'editor.wordHighlightStrongBackground': '#A8FF7438',
      'editor.findMatchBackground': '#FFB22460',
      'editor.findMatchHighlightBackground': '#FFB22430',

      // Lists
      'list.activeSelectionBackground': '#121812',
      'list.activeSelectionForeground': '#E4FFE4',
      'list.inactiveSelectionBackground': '#0E130E',
      'list.hoverBackground': '#12181280',
      'list.focusBackground': '#162016',
      'list.highlightForeground': '#6BFF3E',

      // Inputs
      'input.background': '#0E130E',
      'input.border': '#121812',
      'input.foreground': '#E4FFE4',
      'input.placeholderForeground': '#B5CBB5',
      'dropdown.background': '#0E130E',
      'dropdown.border': '#121812',
      'dropdown.foreground': '#E4FFE4',

      // Buttons
      'button.background': '#6BFF3E',
      'button.foreground': '#061106',
      'button.hoverBackground': '#A8FF74',

      // Badges
      'badge.background': '#6BFF3E',
      'badge.foreground': '#061106',

      // Minimap
      'minimap.background': '#0B0F0A',
      'minimap.findMatchHighlight': '#FFB22470',
      'minimap.selectionHighlight': '#6BFF3E60',

      // Breadcrumbs
      'breadcrumb.background': '#0E130E',
      'breadcrumb.foreground': '#B5CBB5',
      'breadcrumb.focusForeground': '#E4FFE4',
      'breadcrumb.activeSelectionForeground': '#6BFF3E',

      // Scroll
      'scrollbarSlider.background': '#B5CBB530',
      'scrollbarSlider.hoverBackground': '#B5CBB550',
      'scrollbarSlider.activeBackground': '#B5CBB570',

      // Git
      'gitDecoration.addedResourceForeground': '#6BFF3E',
      'gitDecoration.modifiedResourceForeground': '#A8FF74',
      'gitDecoration.deletedResourceForeground': '#FF5A87',
      'gitDecoration.untrackedResourceForeground': '#D9FAD9',
      'gitDecoration.ignoredResourceForeground': '#9DB39D'
    },
    tokens(c){
      return {
        comment: '#9DB39D',
        keyword: '#6BFF3E',
        function: '#A8FF74',
        variable: '#E4FFE4',
        string: '#6BFF3E',
        number: '#A8FF74',
        constant: '#D9FAD9',
        storage: '#6BFF3E',
        type: '#A8FF74',
        punctuation: c.textPrimary,
        invalid: '#FF5A87',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#6BFF3E',
        h2: '#A8FF74',
        h3: '#D9FAD9',
        h4: '#B5CBB5',
        h5: '#9DB39D',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('night-vision','dark')
  };
