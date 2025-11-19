/**
 * Theme: XELA Velvet Dusk — Plush Comfort
 * Type: dark
 * Auto-generated from artisan collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-velvet-dusk',
  name: 'XELA Velvet Dusk — Plush Comfort',
  type: 'dark',
  roles: {
      "surface0": "#262232",
      "surface1": "#2E2939",
      "surface2": "#363142",
      "surface3": "#3F394B",
      "panel": "#262232",
      "overlay": "#262232F2",
      "backdrop": "#00000099",
      "border": "#49425A",
      "focus": "#B39CD1B3",
      "textPrimary": "#D8CFE3",
      "textSecondary": "#C9BED8",
      "textMuted": "#8A7FA0",
      "textInverted": "#262232",
      "accentPrimary": "#B39CD1",
      "accentPrimaryAlt": "#C9B3E5",
      "accentInfo": "#8FB8D1",
      "accentWarn": "#E8C08A",
      "accentError": "#E08A9A",
      "accentSuccess": "#9AD1A8",
      "accentSelection": "#B39CD138",
      "accentLink": "#A3C8E5"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#6B6080',
        keyword: '#C9B3E5',
        function: '#8FB8D1',
        variable: '#D8CFE3',
        string: '#A8D8B8',
        number: '#E8C99F',
        constant: '#D1A3C8',
        storage: '#C9B3E5',
        type: '#8FB8D1',
        punctuation: '#C9BED8',
        invalid: '#E08A9A',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#C9B3E5',
        h2: '#8FB8D1',
        h3: '#A8D8B8',
        h4: '#E8C99F',
        h5: '#D1A3C8',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
