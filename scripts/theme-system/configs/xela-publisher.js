/**
 * Theme: XELA Publisher — Editorial Excellence
 * Type: light
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-publisher',
  name: 'XELA Publisher — Editorial Excellence',
  type: 'light',
  roles: {
      "surface0": "#FDFCFB",
      "surface1": "#F2EFEA",
      "surface2": "#FFFFFE",
      "surface3": "#FFFFFF",
      "panel": "#F7F4EF",
      "overlay": "#FDFCFBF8",
      "backdrop": "#00000010",
      "border": "#DCD5CA",
      "focus": "#2B5F8F80",
      "textPrimary": "#1A1816",
      "textSecondary": "#4A4541",
      "textMuted": "#8A837A",
      "textInverted": "#FDFCFB",
      "accentPrimary": "#2B5F8F",
      "accentPrimaryAlt": "#3A75A8",
      "accentInfo": "#2B5F8F",
      "accentWarn": "#C18542",
      "accentError": "#B94A48",
      "accentSuccess": "#5F8F5F",
      "accentSelection": "#2B5F8F24",
      "accentLink": "#3A75A8"
  },
  colorOverrides: {
      "editor.background": "#FDFCFB",
      "titleBar.activeBackground": "#F2EFEA",
      "activityBar.background": "#F2EFEA",
      "activityBar.activeBorder": "#2B5F8F",
      "sideBar.background": "#F2EFEA",
      "tab.activeBackground": "#FDFCFB",
      "tab.activeBorderTop": "#2B5F8F",
      "statusBar.background": "#FFFFFE",
      "panel.background": "#F7F4EF",
      "button.background": "#2B5F8F"
  },
  tokens: function(c) {
      return {
        comment: '#8A837A',
        keyword: '#B94A48',
        function: '#2B5F8F',
        variable: c.textPrimary,
        string: '#5F8F5F',
        number: '#C18542',
        constant: '#2B5F8F',
        storage: '#B94A48',
        type: '#2B5F8F',
        punctuation: '#4A4541',
        invalid: '#B94A48',
        code: c.textPrimary,
        heading: '#2B5F8F',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
