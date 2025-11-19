/**
 * Theme: XELA Nebula Haze — Iridescent Fog
 * Type: dark
 * Auto-generated from experimental collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-nebula-haze',
  name: 'XELA Nebula Haze — Iridescent Fog',
  type: 'dark',
  roles: {
      "surface0": "#070910",
      "surface1": "#0C1018",
      "surface2": "#121926",
      "surface3": "#182230",
      "panel": "#0C1018",
      "overlay": "#070910E6",
      "backdrop": "#00000099",
      "border": "#1E2C3A",
      "focus": "#A05CFF99",
      "textPrimary": "#E5ECF8",
      "textSecondary": "#CCD6E6",
      "textMuted": "#8A98AC",
      "textInverted": "#070910",
      "accentPrimary": "#A05CFF",
      "accentPrimaryAlt": "#5AAEFF",
      "accentInfo": "#5AAEFF",
      "accentWarn": "#FFC86B",
      "accentError": "#FF5C8D",
      "accentSuccess": "#48D3A8",
      "accentSelection": "#A05CFF33",
      "accentLink": "#5AAEFF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#5F6E82',
        keyword: '#A05CFF',
        function: '#5AAEFF',
        variable: c.textPrimary,
        string: '#48D3A8',
        number: '#FFC86B',
        constant: '#5AAEFF',
        storage: '#FF5C8D',
        type: '#A05CFF',
        punctuation: c.textPrimary,
        invalid: '#FF5C8D',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#A05CFF',
        h2: '#5AAEFF',
        h3: '#48D3A8',
        h4: '#FFC86B',
        h5: '#FF5C8D',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#A05CFF","htmlStructureTag":"#5AAEFF","htmlInlineTag":"#48D3A8","htmlScriptTag":"#FFC86B","htmlAttribute":"#5AAEFF","htmlClassAttribute":"#48D3A8","htmlIdAttribute":"#A05CFF","htmlStyleAttribute":"#48D3A8","htmlEventAttribute":"#FFC86B","htmlAttributeValue":"#48D3A8","htmlAttributeValueString":"#5AAEFF","htmlTagBrackets":"#8A98AC","htmlPunctuation":"#5F6E82","htmlStringPunctuation":"#8A98AC","htmlComment":"#5F6E82","htmlEntity":"#FFC86B","htmlEntityPunctuation":"#A05CFF","htmlDoctype":"#FF5C8D","embeddedCss":"#48D3A8","embeddedCssBlock":"#A05CFF","embeddedJs":"#FFC86B","embeddedJsBlock":"#5AAEFF","htmlFormTag":"#48D3A8","htmlFormAttribute":"#5AAEFF","htmlTableTag":"#A05CFF","htmlMediaTag":"#FFC86B","htmlLinkTag":"#5AAEFF","htmlHrefAttribute":"#48D3A8","htmlSemanticTag":"#48D3A8","htmlText":"#E5ECF8"}
};
