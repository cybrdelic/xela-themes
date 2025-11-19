/**
 * Theme: XELA Midnight Oil — Late Night Focus
 * Type: dark
 * Auto-generated from refined collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-midnight-oil',
  name: 'XELA Midnight Oil — Late Night Focus',
  type: 'dark',
  roles: {
      "surface0": "#15181F",
      "surface1": "#0F1115",
      "surface2": "#1B1E25",
      "surface3": "#21242C",
      "panel": "#0A0C0F",
      "overlay": "#15181FF5",
      "backdrop": "#00000099",
      "border": "#2A2D35",
      "focus": "#6B9BD180",
      "textPrimary": "#D6DBE5",
      "textSecondary": "#A0A8B8",
      "textMuted": "#6B7280",
      "textInverted": "#15181F",
      "accentPrimary": "#6B9BD1",
      "accentPrimaryAlt": "#85AED6",
      "accentInfo": "#6B9BD1",
      "accentWarn": "#D6A86B",
      "accentError": "#D17A7A",
      "accentSuccess": "#85D17A",
      "accentSelection": "#6B9BD12E",
      "accentLink": "#85AED6"
  },
  colorOverrides: {
      "titleBar.activeBackground": "#0A0C0F",
      "activityBar.background": "#0F1115",
      "sideBar.background": "#0F1115",
      "editorGroupHeader.tabsBackground": "#0F1115",
      "tab.inactiveBackground": "#0A0C0F",
      "tab.activeBackground": "#15181F",
      "statusBar.background": "#0A0C0F",
      "panel.background": "#0A0C0F",
      "editor.lineHighlightBackground": "#21242C30",
      "editorLineNumber.foreground": "#6B7280",
      "editorLineNumber.activeForeground": "#A0A8B8",
      "editorCursor.foreground": "#85AED6",
      "tab.activeBorderTop": "#6B9BD1",
      "activityBar.activeBorder": "#6B9BD1",
      "focusBorder": "#6B9BD180",
      "sideBar.border": "#1B1E25",
      "panel.border": "#1B1E25",
      "editorGroup.border": "#1B1E25",
      "list.activeSelectionBackground": "#21242C",
      "list.hoverBackground": "#1B1E2580",
      "editorIndentGuide.background": "#2A2D3530",
      "editorIndentGuide.activeBackground": "#2A2D3580",
      "button.background": "#6B9BD1",
      "button.hoverBackground": "#85AED6"
  },
  tokens: function(c) {
      return {
        comment: '#6B7280',
        keyword: '#85AED6',
        function: '#6B9BD1',
        variable: '#D6DBE5',
        string: '#85D17A',
        number: '#D6A86B',
        constant: '#6B9BD1',
        storage: '#85AED6',
        type: '#6B9BD1',
        punctuation: '#A0A8B8',
        invalid: '#D17A7A',
        code: c.textPrimary,
        heading: '#85AED6',
        h1: '#85AED6',
        h2: '#85D17A',
        h3: '#D6A86B',
        h4: '#6B9BD1',
        h5: c.textSecondary,
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
