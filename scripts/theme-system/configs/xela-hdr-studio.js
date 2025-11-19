/**
 * Theme: XELA HDR Studio — Wide Gamut
 * Type: dark
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-hdr-studio',
  name: 'XELA HDR Studio — Wide Gamut',
  type: 'dark',
  roles: {
      "surface0": "#0D0D0D",
      "surface1": "#050505",
      "surface2": "#161616",
      "surface3": "#202020",
      "panel": "#020202",
      "overlay": "#0D0D0DF8",
      "backdrop": "#00000099",
      "border": "#2D2D2D",
      "focus": "#FF00FFB3",
      "textPrimary": "#FFFFFF",
      "textSecondary": "#DDDDDD",
      "textMuted": "#999999",
      "textInverted": "#0D0D0D",
      "accentPrimary": "#FF00FF",
      "accentPrimaryAlt": "#FF40FF",
      "accentInfo": "#00FFFF",
      "accentWarn": "#FFFF00",
      "accentError": "#FF0000",
      "accentSuccess": "#00FF00",
      "accentSelection": "#FF00FF40",
      "accentLink": "#FF40FF"
  },
  colorOverrides: {
      "editor.background": "#0D0D0D",
      "titleBar.activeBackground": "#020202",
      "activityBar.background": "#050505",
      "activityBar.activeBorder": "#FF00FF",
      "sideBar.background": "#050505",
      "tab.activeBackground": "#0D0D0D",
      "tab.activeBorderTop": "#FF00FF",
      "statusBar.background": "#020202",
      "panel.background": "#020202",
      "button.background": "#FF00FF",
      "button.foreground": "#FFFFFF",
      "terminal.ansiBlack": "#000000",
      "terminal.ansiWhite": "#FFFFFF",
      "terminal.ansiBlue": "#0000FF",
      "terminal.ansiCyan": "#00FFFF",
      "terminal.ansiGreen": "#00FF00",
      "terminal.ansiMagenta": "#FF00FF",
      "terminal.ansiRed": "#FF0000",
      "terminal.ansiYellow": "#FFFF00",
      "terminal.ansiBrightBlue": "#8080FF",
      "terminal.ansiBrightCyan": "#80FFFF",
      "terminal.ansiBrightGreen": "#80FF80",
      "terminal.ansiBrightMagenta": "#FF80FF",
      "terminal.ansiBrightRed": "#FF8080",
      "terminal.ansiBrightYellow": "#FFFF80"
  },
  tokens: function(c) {
      return {
        comment: '#999999',
        keyword: '#FF0000',
        function: '#00FFFF',
        variable: '#FFFFFF',
        string: '#00FF00',
        number: '#FFFF00',
        constant: '#FF00FF',
        storage: '#FF0000',
        type: '#00FFFF',
        punctuation: c.textSecondary,
        invalid: '#FF0000',
        code: c.textPrimary,
        heading: '#FF00FF',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
