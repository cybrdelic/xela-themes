/**
 * Theme: XELA Reader Mode — Optimal Legibility
 * Type: light
 * Auto-generated from refined collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-reader-mode',
  name: 'XELA Reader Mode — Optimal Legibility',
  type: 'light',
  roles: {
      "surface0": "#FAF9F7",
      "surface1": "#F2F1EF",
      "surface2": "#FFFFFF",
      "surface3": "#FFFFFF",
      "panel": "#F5F4F2",
      "overlay": "#FAF9F7F5",
      "backdrop": "#00000015",
      "border": "#D4D3D1",
      "focus": "#1A73E880",
      "textPrimary": "#202124",
      "textSecondary": "#5F6368",
      "textMuted": "#9AA0A6",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#1A73E8",
      "accentPrimaryAlt": "#4285F4",
      "accentInfo": "#1A73E8",
      "accentWarn": "#E37400",
      "accentError": "#D93025",
      "accentSuccess": "#1E8E3E",
      "accentSelection": "#1A73E826",
      "accentLink": "#1A73E8"
  },
  colorOverrides: {
      "editor.background": "#FAF9F7",
      "editorLineNumber.foreground": "#9AA0A6",
      "editorLineNumber.activeForeground": "#5F6368",
      "editor.lineHighlightBackground": "#F2F1EF50",
      "editorIndentGuide.background": "#D4D3D120",
      "editorIndentGuide.activeBackground": "#D4D3D160",
      "titleBar.activeBackground": "#F2F1EF",
      "activityBar.background": "#F2F1EF",
      "sideBar.background": "#F2F1EF",
      "editorGroupHeader.tabsBackground": "#F2F1EF",
      "tab.inactiveBackground": "#F2F1EF",
      "tab.activeBackground": "#FAF9F7",
      "statusBar.background": "#FFFFFF",
      "panel.background": "#F5F4F2",
      "tab.activeBorder": "#1A73E8",
      "activityBar.activeBorder": "#1A73E8",
      "sideBar.border": "#E8E7E5",
      "panel.border": "#E8E7E5",
      "editorGroup.border": "#E8E7E5",
      "list.activeSelectionBackground": "#E8F0FE",
      "list.hoverBackground": "#F1F3F4",
      "list.inactiveSelectionBackground": "#F1F3F4"
  },
  tokens: function(c) {
      return {
        comment: '#9AA0A6',
        keyword: '#C5221F',
        function: '#1A73E8',
        variable: '#202124',
        string: '#1E8E3E',
        number: '#E37400',
        constant: '#185ABC',
        storage: '#C5221F',
        type: '#185ABC',
        punctuation: '#5F6368',
        invalid: '#D93025',
        code: c.textPrimary,
        heading: '#1A73E8',
        h1: '#1A73E8',
        h2: '#185ABC',
        h3: '#1E8E3E',
        h4: '#E37400',
        h5: '#5F6368',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
