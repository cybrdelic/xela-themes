/**
 * Theme: XELA Café au Lait — Warm Gradient
 * Type: light
 * Auto-generated from dynamic collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-cafe-au-lait',
  name: 'XELA Café au Lait — Warm Gradient',
  type: 'light',
  roles: {
      "surface0": "#F5F0E8",
      "surface1": "#E8DFD0",
      "surface2": "#FBF7F0",
      "surface3": "#DFD3BD",
      "panel": "#FFFCF7",
      "overlay": "#F5F0E8F2",
      "backdrop": "#F5F0E899",
      "border": "#D4C4A8",
      "focus": "#9B7653B3",
      "textPrimary": "#3E3228",
      "textSecondary": "#564940",
      "textMuted": "#8B7D6B",
      "textInverted": "#FBF7F0",
      "accentPrimary": "#9B7653",
      "accentPrimaryAlt": "#B89068",
      "accentInfo": "#6B9E9E",
      "accentWarn": "#D4A373",
      "accentError": "#C26B5F",
      "accentSuccess": "#8FA876",
      "accentSelection": "#9B76532E",
      "accentLink": "#6B9E9E"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#A59583',
        keyword: '#9B7653',
        function: '#6B9E9E',
        variable: '#3E3228',
        string: '#8FA876',
        number: '#D4A373',
        constant: '#B89068',
        storage: '#9B7653',
        type: '#6B9E9E',
        punctuation: '#564940',
        invalid: '#C26B5F',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#3E3228',
        h2: '#6B9E9E',
        h3: '#8FA876',
        h4: '#D4A373',
        h5: '#B89068',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
