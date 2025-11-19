/**
 * Theme: XELA Speed Reading — Rapid Scan
 * Type: light
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-speed-reading',
  name: 'XELA Speed Reading — Rapid Scan',
  type: 'light',
  roles: {
      "surface0": "#FFFFFF",
      "surface1": "#F5F5F5",
      "surface2": "#FFFFFF",
      "surface3": "#FFFFFF",
      "panel": "#FAFAFA",
      "overlay": "#FFFFFFF8",
      "backdrop": "#00000010",
      "border": "#E0E0E0",
      "focus": "#00000066",
      "textPrimary": "#000000",
      "textSecondary": "#424242",
      "textMuted": "#757575",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#000000",
      "accentPrimaryAlt": "#212121",
      "accentInfo": "#1565C0",
      "accentWarn": "#EF6C00",
      "accentError": "#C62828",
      "accentSuccess": "#2E7D32",
      "accentSelection": "#0000001A",
      "accentLink": "#1565C0"
  },
  colorOverrides: {
      "editor.background": "#FFFFFF",
      "titleBar.activeBackground": "#F5F5F5",
      "activityBar.background": "#F5F5F5",
      "activityBar.activeBorder": "#000000",
      "sideBar.background": "#F5F5F5",
      "tab.activeBackground": "#FFFFFF",
      "tab.activeBorder": "#000000",
      "statusBar.background": "#FFFFFF",
      "panel.background": "#FAFAFA",
      "editorLineNumber.foreground": "#BDBDBD",
      "editorLineNumber.activeForeground": "#757575",
      "editor.lineHighlightBackground": "#F5F5F550",
      "button.background": "#000000",
      "button.foreground": "#FFFFFF"
  },
  tokens: function(c) {
      return {
        comment: '#757575',
        keyword: '#C62828',
        function: '#1565C0',
        variable: '#000000',
        string: '#2E7D32',
        number: '#EF6C00',
        constant: '#000000',
        storage: '#C62828',
        type: '#1565C0',
        punctuation: '#424242',
        invalid: '#C62828',
        code: c.textPrimary,
        heading: '#000000',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
