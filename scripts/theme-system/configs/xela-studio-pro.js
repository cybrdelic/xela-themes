/**
 * Theme: XELA Studio Pro — Designer Workspace
 * Type: dark
 * Auto-generated from refined collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-studio-pro',
  name: 'XELA Studio Pro — Designer Workspace',
  type: 'dark',
  roles: {
      "surface0": "#1C1C1E",
      "surface1": "#161618",
      "surface2": "#222224",
      "surface3": "#2A2A2D",
      "panel": "#121214",
      "overlay": "#1C1C1EF5",
      "backdrop": "#00000099",
      "border": "#3A3A3D",
      "focus": "#0A84FF99",
      "textPrimary": "#ECECED",
      "textSecondary": "#C7C7C9",
      "textMuted": "#8E8E93",
      "textInverted": "#1C1C1E",
      "accentPrimary": "#0A84FF",
      "accentPrimaryAlt": "#409CFF",
      "accentInfo": "#5AC8FA",
      "accentWarn": "#FF9F0A",
      "accentError": "#FF453A",
      "accentSuccess": "#32D74B",
      "accentSelection": "#0A84FF33",
      "accentLink": "#409CFF"
  },
  colorOverrides: {
      "titleBar.activeBackground": "#0E0E10",
      "activityBar.background": "#121214",
      "sideBar.background": "#161618",
      "editorGroupHeader.tabsBackground": "#161618",
      "tab.inactiveBackground": "#121214",
      "tab.activeBackground": "#1C1C1E",
      "statusBar.background": "#0E0E10",
      "panel.background": "#121214",
      "editor.lineHighlightBackground": "#2A2A2D40",
      "editorLineNumber.foreground": "#8E8E93",
      "editorLineNumber.activeForeground": "#C7C7C9",
      "editorIndentGuide.background": "#3A3A3D30",
      "editorIndentGuide.activeBackground": "#3A3A3D80",
      "tab.activeBorderTop": "#0A84FF",
      "activityBar.activeBorder": "#0A84FF",
      "focusBorder": "#0A84FF99",
      "sideBar.border": "#2A2A2D",
      "panel.border": "#2A2A2D",
      "editorGroup.border": "#2A2A2D",
      "tab.border": "#00000000",
      "list.activeSelectionBackground": "#2A2A2D",
      "list.hoverBackground": "#22222480",
      "list.inactiveSelectionBackground": "#22222460"
  },
  tokens: function(c) {
      return {
        comment: '#8E8E93',
        keyword: '#FF453A',
        function: '#409CFF',
        variable: '#ECECED',
        string: '#32D74B',
        number: '#FF9F0A',
        constant: '#5AC8FA',
        storage: '#FF453A',
        type: '#5AC8FA',
        punctuation: '#C7C7C9',
        invalid: '#FF453A',
        code: c.textPrimary,
        heading: '#409CFF',
        h1: '#409CFF',
        h2: '#5AC8FA',
        h3: '#32D74B',
        h4: '#FF9F0A',
        h5: '#C7C7C9',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
