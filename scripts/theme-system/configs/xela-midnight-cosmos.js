/**
 * Theme: XELA Midnight Cosmos — Stellar Deep
 * Type: dark
 * Auto-generated from ultimate collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-midnight-cosmos',
  name: 'XELA Midnight Cosmos — Stellar Deep',
  type: 'dark',
  roles: {
      "surface0": "#050510",
      "surface1": "#0A0A20",
      "surface2": "#0F0F30",
      "surface3": "#141440",
      "panel": "#0A0A20",
      "overlay": "#050510F0",
      "backdrop": "#00000099",
      "border": "#191950",
      "focus": "#4169E1E6",
      "textPrimary": "#F8F8FF",
      "textSecondary": "#E6E6FA",
      "textMuted": "#C6C6E2",
      "textInverted": "#050510",
      "accentPrimary": "#4169E1",
      "accentPrimaryAlt": "#6495ED",
      "accentInfo": "#87CEEB",
      "accentWarn": "#F0E68C",
      "accentError": "#FF6347",
      "accentSuccess": "#98FB98",
      "accentSelection": "#4169E14D",
      "accentLink": "#87CEEB"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#8A8ABA',
        keyword: '#4169E1',
        function: '#6495ED',
        variable: '#F8F8FF',
        string: '#98FB98',
        number: '#F0E68C',
        constant: '#87CEEB',
        storage: '#FF6347',
        type: '#6495ED',
        punctuation: c.textPrimary,
        invalid: '#FF6347',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#4169E1',
        h2: '#6495ED',
        h3: '#87CEEB',
        h4: '#98FB98',
        h5: '#F0E68C',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#4169E1","htmlStructureTag":"#6495ED","htmlInlineTag":"#87CEEB","htmlScriptTag":"#F0E68C","htmlAttribute":"#6495ED","htmlClassAttribute":"#98FB98","htmlIdAttribute":"#4169E1","htmlStyleAttribute":"#87CEEB","htmlEventAttribute":"#F0E68C","htmlAttributeValue":"#98FB98","htmlAttributeValueString":"#6495ED","htmlTagBrackets":"#C6C6E2","htmlPunctuation":"#8A8ABA","htmlStringPunctuation":"#C6C6E2","htmlComment":"#8A8ABA","htmlEntity":"#F0E68C","htmlEntityPunctuation":"#4169E1","htmlDoctype":"#FF6347","embeddedCss":"#87CEEB","embeddedCssBlock":"#4169E1","embeddedJs":"#F0E68C","embeddedJsBlock":"#6495ED","htmlFormTag":"#98FB98","htmlFormAttribute":"#6495ED","htmlTableTag":"#4169E1","htmlMediaTag":"#F0E68C","htmlLinkTag":"#6495ED","htmlHrefAttribute":"#98FB98","htmlSemanticTag":"#87CEEB","htmlText":"#F8F8FF"}
};
