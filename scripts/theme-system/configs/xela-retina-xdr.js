/**
 * Theme: XELA Retina XDR — Apple Display
 * Type: dark
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-retina-xdr',
  name: 'XELA Retina XDR — Apple Display',
  type: 'dark',
  roles: {
      "surface0": "#000000",
      "surface1": "#000000",
      "surface2": "#1C1C1E",
      "surface3": "#2C2C2E",
      "panel": "#000000",
      "overlay": "#000000F8",
      "backdrop": "#00000099",
      "border": "#3A3A3C",
      "focus": "#0A84FF99",
      "textPrimary": "#FFFFFF",
      "textSecondary": "#E5E5EA",
      "textMuted": "#8E8E93",
      "textInverted": "#000000",
      "accentPrimary": "#0A84FF",
      "accentPrimaryAlt": "#409CFF",
      "accentInfo": "#5AC8FA",
      "accentWarn": "#FF9F0A",
      "accentError": "#FF453A",
      "accentSuccess": "#32D74B",
      "accentSelection": "#0A84FF3D",
      "accentLink": "#409CFF"
  },
  colorOverrides: {
      "editor.background": "#000000",
      "titleBar.activeBackground": "#000000",
      "activityBar.background": "#000000",
      "activityBar.activeBorder": "#0A84FF",
      "sideBar.background": "#000000",
      "tab.activeBackground": "#1C1C1E",
      "tab.activeBorderTop": "#0A84FF",
      "statusBar.background": "#000000",
      "panel.background": "#000000",
      "button.background": "#0A84FF",
      "button.foreground": "#FFFFFF",
      "editorLineNumber.foreground": "#3A3A3C",
      "editorLineNumber.activeForeground": "#8E8E93",
      "terminal.ansiBlack": "#000000",
      "terminal.ansiWhite": "#FFFFFF",
      "terminal.ansiBlue": "#0A84FF",
      "terminal.ansiCyan": "#5AC8FA",
      "terminal.ansiGreen": "#32D74B",
      "terminal.ansiMagenta": "#BF5AF2",
      "terminal.ansiRed": "#FF453A",
      "terminal.ansiYellow": "#FF9F0A"
  },
  tokens: function(c) {
      return {
        comment: '#8E8E93',
        keyword: '#FF453A',
        function: '#0A84FF',
        variable: c.textPrimary,
        string: '#32D74B',
        number: '#FF9F0A',
        constant: '#5AC8FA',
        storage: '#FF453A',
        type: '#5AC8FA',
        punctuation: c.textSecondary,
        invalid: '#FF453A',
        code: c.textPrimary,
        heading: '#0A84FF',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
