/**
 * Theme: XELA Scandinavian — Nordic Hygge
 * Type: light
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-scandinavian',
  name: 'XELA Scandinavian — Nordic Hygge',
  type: 'light',
  roles: {
      "surface0": "#F7F6F3",
      "surface1": "#ECEAE5",
      "surface2": "#FFFFFE",
      "surface3": "#FFFFFF",
      "panel": "#F2F0EB",
      "overlay": "#F7F6F3F8",
      "backdrop": "#00000010",
      "border": "#D8D3CA",
      "focus": "#5B7C8D80",
      "textPrimary": "#2B2A27",
      "textSecondary": "#5A5752",
      "textMuted": "#998F82",
      "textInverted": "#F7F6F3",
      "accentPrimary": "#5B7C8D",
      "accentPrimaryAlt": "#6F8FA1",
      "accentInfo": "#5B7C8D",
      "accentWarn": "#C8965F",
      "accentError": "#B7665E",
      "accentSuccess": "#6B8E6F",
      "accentSelection": "#5B7C8D24",
      "accentLink": "#6F8FA1"
  },
  colorOverrides: {
      "editor.background": "#F7F6F3",
      "titleBar.activeBackground": "#ECEAE5",
      "activityBar.background": "#ECEAE5",
      "activityBar.activeBorder": "#5B7C8D",
      "sideBar.background": "#ECEAE5",
      "tab.activeBackground": "#F7F6F3",
      "tab.activeBorderTop": "#5B7C8D",
      "statusBar.background": "#FFFFFE",
      "panel.background": "#F2F0EB",
      "button.background": "#5B7C8D",
      "button.foreground": "#F7F6F3"
  },
  tokens: function(c) {
      return {
        comment: '#998F82',
        keyword: '#B7665E',
        function: '#5B7C8D',
        variable: c.textPrimary,
        string: '#6B8E6F',
        number: '#C8965F',
        constant: '#5B7C8D',
        storage: '#B7665E',
        type: '#5B7C8D',
        punctuation: '#5A5752',
        invalid: '#B7665E',
        code: c.textPrimary,
        heading: '#5B7C8D',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
