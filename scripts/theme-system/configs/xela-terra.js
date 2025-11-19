/**
 * Theme: XELA Terra — Organic Warmth
 * Type: dark
 * Auto-generated from batch2 collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-terra',
  name: 'XELA Terra — Organic Warmth',
  type: 'dark',
  roles: {
      "surface0": "#2C1810",
      "surface1": "#3D2318",
      "surface2": "#4E2E20",
      "surface3": "#5F3928",
      "panel": "#3D2318",
      "overlay": "#2C1810CC",
      "backdrop": "#00000088",
      "border": "#4E2E20",
      "focus": "#CD853FAB",
      "textPrimary": "#F4E4BC",
      "textSecondary": "#E6D4A8",
      "textMuted": "#D2B48C",
      "textInverted": "#2C1810",
      "accentPrimary": "#CD853F",
      "accentPrimaryAlt": "#DEB887",
      "accentInfo": "#8FBC8F",
      "accentWarn": "#DAA520",
      "accentError": "#CD5C5C",
      "accentSuccess": "#9ACD32",
      "accentSelection": "#CD853F33",
      "accentLink": "#8FBC8F"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#A0522D',
        keyword: '#CD853F',
        function: '#8FBC8F',
        variable: '#F4E4BC',
        string: '#9ACD32',
        number: '#DAA520',
        constant: '#DEB887',
        storage: '#CD5C5C',
        type: '#8FBC8F',
        punctuation: c.textPrimary,
        invalid: '#CD5C5C',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#CD853F',
        h2: '#8FBC8F',
        h3: '#DEB887',
        h4: '#9ACD32',
        h5: '#DAA520',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
