/**
 * Theme: XELA Tungsten — Industrial Grey
 * Type: dark
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-tungsten',
  name: 'XELA Tungsten — Industrial Grey',
  type: 'dark',
  roles: {
      "surface0": "#202020",
      "surface1": "#292929",
      "surface2": "#323232",
      "surface3": "#3B3B3B",
      "panel": "#202020",
      "overlay": "#202020F2",
      "backdrop": "#00000099",
      "border": "#444444",
      "focus": "#FFB86CB3",
      "textPrimary": "#F8F8F2",
      "textSecondary": "#E6E6E0",
      "textMuted": "#6272A4",
      "textInverted": "#202020",
      "accentPrimary": "#FFB86C",
      "accentPrimaryAlt": "#FFD700",
      "accentInfo": "#8BE9FD",
      "accentWarn": "#F1FA8C",
      "accentError": "#FF5555",
      "accentSuccess": "#50FA7B",
      "accentSelection": "#FFB86C38",
      "accentLink": "#8BE9FD"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#6272A4',
        keyword: '#FF79C6',
        function: '#50FA7B',
        variable: '#F8F8F2',
        string: '#F1FA8C',
        number: '#BD93F9',
        constant: '#FFB86C',
        storage: '#FF79C6',
        type: '#8BE9FD',
        punctuation: '#F8F8F2',
        invalid: '#FF5555',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FF79C6',
        h2: '#8BE9FD',
        h3: '#50FA7B',
        h4: '#F1FA8C',
        h5: '#FFB86C',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
