/**
 * Theme: XELA Laboratory — Scientific Precision
 * Type: dark
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-laboratory',
  name: 'XELA Laboratory — Scientific Precision',
  type: 'dark',
  roles: {
      "surface0": "#181D21",
      "surface1": "#0F1315",
      "surface2": "#1F2529",
      "surface3": "#272D32",
      "panel": "#0A0D0F",
      "overlay": "#181D21F8",
      "backdrop": "#00000099",
      "border": "#2E363C",
      "focus": "#4DD4AC99",
      "textPrimary": "#E8F0ED",
      "textSecondary": "#C1D4CD",
      "textMuted": "#7A9189",
      "textInverted": "#181D21",
      "accentPrimary": "#4DD4AC",
      "accentPrimaryAlt": "#5FE0B8",
      "accentInfo": "#5BA5D6",
      "accentWarn": "#E5B869",
      "accentError": "#E57373",
      "accentSuccess": "#4DD4AC",
      "accentSelection": "#4DD4AC33",
      "accentLink": "#5FE0B8"
  },
  colorOverrides: {
      "editor.background": "#181D21",
      "titleBar.activeBackground": "#0A0D0F",
      "activityBar.background": "#0F1315",
      "activityBar.activeBorder": "#4DD4AC",
      "sideBar.background": "#0F1315",
      "tab.activeBackground": "#181D21",
      "tab.activeBorderTop": "#4DD4AC",
      "statusBar.background": "#0A0D0F",
      "panel.background": "#0A0D0F",
      "button.background": "#4DD4AC",
      "button.foreground": "#0A0D0F"
  },
  tokens: function(c) {
      return {
        comment: '#7A9189',
        keyword: '#5BA5D6',
        function: '#5FE0B8',
        variable: c.textPrimary,
        string: '#4DD4AC',
        number: '#E5B869',
        constant: '#4DD4AC',
        storage: '#5BA5D6',
        type: '#5BA5D6',
        punctuation: c.textSecondary,
        invalid: '#E57373',
        code: c.textPrimary,
        heading: '#4DD4AC',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
