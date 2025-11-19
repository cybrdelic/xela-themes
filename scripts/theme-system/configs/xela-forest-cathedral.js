/**
 * Theme: XELA Forest Cathedral — Sacred Canopy
 * Type: dark
 * Auto-generated from elite collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-forest-cathedral',
  name: 'XELA Forest Cathedral — Sacred Canopy',
  type: 'dark',
  roles: {
      "surface0": "#0D1B0F",
      "surface1": "#162D1A",
      "surface2": "#1F3F25",
      "surface3": "#285130",
      "panel": "#162D1A",
      "overlay": "#0D1B0FE6",
      "backdrop": "#00000099",
      "border": "#31633B",
      "focus": "#90EE90CC",
      "textPrimary": "#F0FFF0",
      "textSecondary": "#E6FFE6",
      "textMuted": "#CCFFCC",
      "textInverted": "#0D1B0F",
      "accentPrimary": "#90EE90",
      "accentPrimaryAlt": "#98FB98",
      "accentInfo": "#66CDAA",
      "accentWarn": "#F4A460",
      "accentError": "#CD5C5C",
      "accentSuccess": "#32CD32",
      "accentSelection": "#90EE9040",
      "accentLink": "#66CDAA"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#8FBC8F',
        keyword: '#90EE90',
        function: '#66CDAA',
        variable: '#F0FFF0',
        string: '#32CD32',
        number: '#F4A460',
        constant: '#98FB98',
        storage: '#CD5C5C',
        type: '#66CDAA',
        punctuation: c.textPrimary,
        invalid: '#CD5C5C',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#90EE90',
        h2: '#66CDAA',
        h3: '#98FB98',
        h4: '#32CD32',
        h5: '#F4A460',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#90EE90","htmlStructureTag":"#66CDAA","htmlInlineTag":"#98FB98","htmlScriptTag":"#F4A460","htmlAttribute":"#66CDAA","htmlClassAttribute":"#32CD32","htmlIdAttribute":"#90EE90","htmlStyleAttribute":"#98FB98","htmlEventAttribute":"#F4A460","htmlAttributeValue":"#32CD32","htmlAttributeValueString":"#66CDAA","htmlTagBrackets":"#CCFFCC","htmlPunctuation":"#8FBC8F","htmlStringPunctuation":"#CCFFCC","htmlComment":"#8FBC8F","htmlEntity":"#F4A460","htmlEntityPunctuation":"#90EE90","htmlDoctype":"#CD5C5C","embeddedCss":"#98FB98","embeddedCssBlock":"#90EE90","embeddedJs":"#F4A460","embeddedJsBlock":"#66CDAA","htmlFormTag":"#32CD32","htmlFormAttribute":"#66CDAA","htmlTableTag":"#90EE90","htmlMediaTag":"#F4A460","htmlLinkTag":"#66CDAA","htmlHrefAttribute":"#32CD32","htmlSemanticTag":"#98FB98","htmlText":"#F0FFF0"}
};
