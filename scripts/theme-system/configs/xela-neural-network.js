/**
 * Theme: XELA Neural Network — AI Synapses
 * Type: dark
 * Auto-generated from elite collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-neural-network',
  name: 'XELA Neural Network — AI Synapses',
  type: 'dark',
  roles: {
      "surface0": "#0A0B12",
      "surface1": "#111220",
      "surface2": "#1A1B2E",
      "surface3": "#232441",
      "panel": "#111220",
      "overlay": "#0A0B12E6",
      "backdrop": "#00000099",
      "border": "#2D2F47",
      "focus": "#00D4FFCC",
      "textPrimary": "#E8F4FD",
      "textSecondary": "#BDE0FF",
      "textMuted": "#7BA7CC",
      "textInverted": "#0A0B12",
      "accentPrimary": "#00D4FF",
      "accentPrimaryAlt": "#33E0FF",
      "accentInfo": "#66ECFF",
      "accentWarn": "#FFB84D",
      "accentError": "#FF5757",
      "accentSuccess": "#3DFFA3",
      "accentSelection": "#00D4FF40",
      "accentLink": "#66ECFF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#5A6B8C',
        keyword: '#FF5BB5',
        function: '#00D4FF',
        variable: '#E8F4FD',
        string: '#3DFFA3',
        number: '#FFB84D',
        constant: '#B084FF',
        storage: '#FF5757',
        type: '#66ECFF',
        punctuation: c.textPrimary,
        invalid: '#FF3B3B',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#00D4FF',
        h2: '#FF5BB5',
        h3: '#B084FF',
        h4: '#3DFFA3',
        h5: '#FFB84D',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#FF5BB5","htmlStructureTag":"#00D4FF","htmlInlineTag":"#B084FF","htmlScriptTag":"#FFB84D","htmlAttribute":"#66ECFF","htmlClassAttribute":"#3DFFA3","htmlIdAttribute":"#FF5BB5","htmlStyleAttribute":"#B084FF","htmlEventAttribute":"#FFB84D","htmlAttributeValue":"#3DFFA3","htmlAttributeValueString":"#66ECFF","htmlTagBrackets":"#7BA7CC","htmlPunctuation":"#5A6B8C","htmlStringPunctuation":"#7BA7CC","htmlComment":"#5A6B8C","htmlEntity":"#FFB84D","htmlEntityPunctuation":"#FF5BB5","htmlDoctype":"#FF5757","embeddedCss":"#B084FF","embeddedCssBlock":"#FF5BB5","embeddedJs":"#FFB84D","embeddedJsBlock":"#00D4FF","htmlFormTag":"#3DFFA3","htmlFormAttribute":"#66ECFF","htmlTableTag":"#00D4FF","htmlMediaTag":"#FFB84D","htmlLinkTag":"#FF5BB5","htmlHrefAttribute":"#66ECFF","htmlSemanticTag":"#B084FF","htmlText":"#E8F4FD"}
};
