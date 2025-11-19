/**
 * Theme: XELA OLED Perfect — True Black
 * Type: dark
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-oled-perfect',
  name: 'XELA OLED Perfect — True Black',
  type: 'dark',
  roles: {
      "surface0": "#000000",
      "surface1": "#000000",
      "surface2": "#0A0A0A",
      "surface3": "#141414",
      "panel": "#000000",
      "overlay": "#000000F8",
      "backdrop": "#00000099",
      "border": "#1F1F1F",
      "focus": "#00E5FF99",
      "textPrimary": "#E0E0E0",
      "textSecondary": "#B0B0B0",
      "textMuted": "#707070",
      "textInverted": "#000000",
      "accentPrimary": "#00E5FF",
      "accentPrimaryAlt": "#40EAFF",
      "accentInfo": "#00E5FF",
      "accentWarn": "#FFB300",
      "accentError": "#FF5252",
      "accentSuccess": "#00E676",
      "accentSelection": "#00E5FF33",
      "accentLink": "#40EAFF"
  },
  colorOverrides: {
      "editor.background": "#000000",
      "titleBar.activeBackground": "#000000",
      "activityBar.background": "#000000",
      "activityBar.activeBorder": "#00E5FF",
      "sideBar.background": "#000000",
      "tab.activeBackground": "#000000",
      "tab.inactiveBackground": "#000000",
      "tab.activeBorderTop": "#00E5FF",
      "statusBar.background": "#000000",
      "panel.background": "#000000",
      "button.background": "#00E5FF",
      "button.foreground": "#000000",
      "editorLineNumber.foreground": "#2F2F2F",
      "editorLineNumber.activeForeground": "#707070",
      "editor.lineHighlightBackground": "#0A0A0A80",
      "editorCursor.foreground": "#00E5FF",
      "terminal.background": "#000000"
  },
  tokens: function(c) {
      return {
        comment: '#707070',
        keyword: '#FF5252',
        function: '#00E5FF',
        variable: c.textPrimary,
        string: '#00E676',
        number: '#FFB300',
        constant: '#00E5FF',
        storage: '#FF5252',
        type: '#00E5FF',
        punctuation: c.textSecondary,
        invalid: '#FF5252',
        code: c.textPrimary,
        heading: '#00E5FF',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
