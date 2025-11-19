/**
 * Theme: XELA Ivory Tower — Refined Cream
 * Type: light
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-ivory-tower',
  name: 'XELA Ivory Tower — Refined Cream',
  type: 'light',
  roles: {
      "surface0": "#FFFFF8",
      "surface1": "#FFFEF5",
      "surface2": "#FFFCF0",
      "surface3": "#FFF9E8",
      "panel": "#FFFFF8",
      "overlay": "#FFFFF8F2",
      "backdrop": "#FFFFF899",
      "border": "#F0E6D2",
      "focus": "#8B7355B3",
      "textPrimary": "#3C3530",
      "textSecondary": "#4F4843",
      "textMuted": "#7A7368",
      "textInverted": "#FFFFF8",
      "accentPrimary": "#8B7355",
      "accentPrimaryAlt": "#A68A6B",
      "accentInfo": "#6B9080",
      "accentWarn": "#D4A574",
      "accentError": "#C05746",
      "accentSuccess": "#70A37F",
      "accentSelection": "#8B735533",
      "accentLink": "#6B9080"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#8C8279',
        keyword: '#8B7355',
        function: '#6B9080',
        variable: '#3C3530',
        string: '#70A37F',
        number: '#D4A574',
        constant: '#8B7355',
        storage: '#A68A6B',
        type: '#6B9080',
        punctuation: '#4F4843',
        invalid: '#C05746',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#8B7355',
        h2: '#6B9080',
        h3: '#70A37F',
        h4: '#D4A574',
        h5: '#A68A6B',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
