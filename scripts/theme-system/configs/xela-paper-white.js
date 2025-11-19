/**
 * Theme: XELA Paper White — Clean Manuscript
 * Type: light
 * Auto-generated from refined collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-paper-white',
  name: 'XELA Paper White — Clean Manuscript',
  type: 'light',
  roles: {
      "surface0": "#FFFFFF",
      "surface1": "#F8F9FA",
      "surface2": "#FFFFFF",
      "surface3": "#FFFFFF",
      "panel": "#F8F9FA",
      "overlay": "#FFFFFFF5",
      "backdrop": "#00000012",
      "border": "#DFE1E5",
      "focus": "#1967D280",
      "textPrimary": "#1F1F1F",
      "textSecondary": "#5F6368",
      "textMuted": "#80868B",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#1967D2",
      "accentPrimaryAlt": "#4285F4",
      "accentInfo": "#1967D2",
      "accentWarn": "#F9AB00",
      "accentError": "#D93025",
      "accentSuccess": "#1E8E3E",
      "accentSelection": "#1967D21F",
      "accentLink": "#1967D2"
  },
  colorOverrides: {
      "editor.background": "#FFFFFF",
      "titleBar.activeBackground": "#F8F9FA",
      "activityBar.background": "#F8F9FA",
      "sideBar.background": "#F8F9FA",
      "editorGroupHeader.tabsBackground": "#F8F9FA",
      "tab.inactiveBackground": "#F8F9FA",
      "tab.activeBackground": "#FFFFFF",
      "statusBar.background": "#F8F9FA",
      "panel.background": "#F8F9FA",
      "editorLineNumber.foreground": "#BDC1C6",
      "editorLineNumber.activeForeground": "#5F6368",
      "editor.lineHighlightBackground": "#F8F9FA80",
      "sideBar.border": "#F1F3F4",
      "panel.border": "#F1F3F4",
      "editorGroup.border": "#F1F3F4",
      "tab.border": "#00000000",
      "tab.activeBorder": "#1967D2",
      "activityBar.activeBorder": "#1967D2",
      "editorIndentGuide.background": "#DFE1E520",
      "editorIndentGuide.activeBackground": "#DFE1E570",
      "list.activeSelectionBackground": "#E8F0FE",
      "list.hoverBackground": "#F1F3F4",
      "list.inactiveSelectionBackground": "#F1F3F4",
      "minimap.background": "#FAFBFC"
  },
  tokens: function(c) {
      return {
        comment: '#80868B',
        keyword: '#D93025',
        function: '#1967D2',
        variable: '#1F1F1F',
        string: '#1E8E3E',
        number: '#F9AB00',
        constant: '#1967D2',
        storage: '#D93025',
        type: '#185ABC',
        punctuation: '#5F6368',
        invalid: '#D93025',
        code: c.textPrimary,
        heading: '#1967D2',
        h1: '#1967D2',
        h2: '#185ABC',
        h3: '#1E8E3E',
        h4: '#F9AB00',
        h5: '#5F6368',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
