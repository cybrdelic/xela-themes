/**
 * Theme: XELA Golden Horizon — Sunset Blaze
 * Type: light
 * Auto-generated from ultimate collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-golden-horizon',
  name: 'XELA Golden Horizon — Sunset Blaze',
  type: 'light',
  roles: {
      "surface0": "#FFFEF5",
      "surface1": "#FFF8E1",
      "surface2": "#FFF2CC",
      "surface3": "#FFECB8",
      "panel": "#FFF8E1",
      "overlay": "#FFFEF5E8",
      "backdrop": "#FFFFFF99",
      "border": "#FFE6A3",
      "focus": "#FF8C00CC",
      "textPrimary": "#4A4A2A",
      "textSecondary": "#5C5C3C",
      "textMuted": "#8C8C6C",
      "textInverted": "#FFFEF5",
      "accentPrimary": "#FF8C00",
      "accentPrimaryAlt": "#FF7F50",
      "accentInfo": "#4682B4",
      "accentWarn": "#CD853F",
      "accentError": "#DC143C",
      "accentSuccess": "#228B22",
      "accentSelection": "#FF8C0026",
      "accentLink": "#4682B4"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#B8B888',
        keyword: '#FF8C00',
        function: '#4682B4',
        variable: '#4A4A2A',
        string: '#228B22',
        number: '#CD853F',
        constant: '#FF7F50',
        storage: '#DC143C',
        type: '#4682B4',
        punctuation: c.textPrimary,
        invalid: '#DC143C',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FF8C00',
        h2: '#4682B4',
        h3: '#FF7F50',
        h4: '#228B22',
        h5: '#CD853F',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#FF8C00","htmlStructureTag":"#4682B4","htmlInlineTag":"#FF7F50","htmlScriptTag":"#CD853F","htmlAttribute":"#4682B4","htmlClassAttribute":"#228B22","htmlIdAttribute":"#FF8C00","htmlStyleAttribute":"#FF7F50","htmlEventAttribute":"#CD853F","htmlAttributeValue":"#228B22","htmlAttributeValueString":"#4682B4","htmlTagBrackets":"#8C8C6C","htmlPunctuation":"#B8B888","htmlStringPunctuation":"#8C8C6C","htmlComment":"#B8B888","htmlEntity":"#CD853F","htmlEntityPunctuation":"#FF8C00","htmlDoctype":"#DC143C","embeddedCss":"#FF7F50","embeddedCssBlock":"#FF8C00","embeddedJs":"#CD853F","embeddedJsBlock":"#4682B4","htmlFormTag":"#228B22","htmlFormAttribute":"#4682B4","htmlTableTag":"#FF8C00","htmlMediaTag":"#CD853F","htmlLinkTag":"#4682B4","htmlHrefAttribute":"#228B22","htmlSemanticTag":"#FF7F50","htmlText":"#4A4A2A"}
};
