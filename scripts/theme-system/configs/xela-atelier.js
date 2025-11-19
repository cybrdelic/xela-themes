/**
 * Theme: XELA Atelier — Art Studio Light
 * Type: light
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-atelier',
  name: 'XELA Atelier — Art Studio Light',
  type: 'light',
  roles: {
      "surface0": "#F9F7F4",
      "surface1": "#EFEAE3",
      "surface2": "#FDFCFA",
      "surface3": "#FFFFFF",
      "panel": "#F4F0EB",
      "overlay": "#F9F7F4F8",
      "backdrop": "#00000012",
      "border": "#DAD1C7",
      "focus": "#C17F4F80",
      "textPrimary": "#2D2620",
      "textSecondary": "#5D534A",
      "textMuted": "#8F8379",
      "textInverted": "#F9F7F4",
      "accentPrimary": "#C17F4F",
      "accentPrimaryAlt": "#D4925F",
      "accentInfo": "#5B8FA6",
      "accentWarn": "#D4A350",
      "accentError": "#C75A54",
      "accentSuccess": "#6B9F6E",
      "accentSelection": "#C17F4F29",
      "accentLink": "#5B8FA6"
  },
  colorOverrides: {
      "editor.background": "#F9F7F4",
      "titleBar.activeBackground": "#EFEAE3",
      "activityBar.background": "#EFEAE3",
      "activityBar.activeBorder": "#C17F4F",
      "sideBar.background": "#EFEAE3",
      "tab.activeBackground": "#F9F7F4",
      "tab.activeBorderTop": "#C17F4F",
      "statusBar.background": "#FDFCFA",
      "panel.background": "#F4F0EB",
      "editorLineNumber.activeForeground": "#8F8379",
      "button.background": "#C17F4F",
      "list.highlightForeground": "#C17F4F"
  },
  tokens: function(c) {
      return {
        comment: '#8F8379',
        keyword: '#C75A54',
        function: '#5B8FA6',
        variable: c.textPrimary,
        string: '#6B9F6E',
        number: '#D4A350',
        constant: '#C17F4F',
        storage: '#C75A54',
        type: '#5B8FA6',
        punctuation: '#5D534A',
        invalid: '#C75A54',
        code: c.textPrimary,
        heading: '#C17F4F',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
