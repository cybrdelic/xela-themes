/**
 * Theme: XELA Lavender Fields — Provence Light
 * Type: light
 * Auto-generated from artisan collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-lavender-fields',
  name: 'XELA Lavender Fields — Provence Light',
  type: 'light',
  roles: {
      "surface0": "#F8F7FB",
      "surface1": "#F2F0F8",
      "surface2": "#EBE8F3",
      "surface3": "#E4E0ED",
      "panel": "#FAF9FC",
      "overlay": "#F8F7FBF2",
      "backdrop": "#F8F7FB99",
      "border": "#D8D3E5",
      "focus": "#8B7BB8B3",
      "textPrimary": "#342F42",
      "textSecondary": "#463F54",
      "textMuted": "#736A85",
      "textInverted": "#F8F7FB",
      "accentPrimary": "#8B7BB8",
      "accentPrimaryAlt": "#A393CE",
      "accentInfo": "#6B8BB8",
      "accentWarn": "#C9A76B",
      "accentError": "#C96B7C",
      "accentSuccess": "#7BB88B",
      "accentSelection": "#8B7BB833",
      "accentLink": "#6B8BB8"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#8A7FA0',
        keyword: '#8B7BB8',
        function: '#6B8BB8',
        variable: '#342F42',
        string: '#7BB88B',
        number: '#C9A76B',
        constant: '#B87BB8',
        storage: '#8B7BB8',
        type: '#6B8BB8',
        punctuation: '#463F54',
        invalid: '#C96B7C',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#8B7BB8',
        h2: '#6B8BB8',
        h3: '#7BB88B',
        h4: '#C9A76B',
        h5: '#B87BB8',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
