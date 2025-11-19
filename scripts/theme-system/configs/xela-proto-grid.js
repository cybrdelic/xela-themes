/**
 * Theme: XELA Proto Grid — Early Wireframe UX
 * Type: light
 * Auto-generated from experimental collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-proto-grid',
  name: 'XELA Proto Grid — Early Wireframe UX',
  type: 'light',
  roles: {
      "surface0": "#FFFFFF",
      "surface1": "#F6F9FB",
      "surface2": "#EEF2F6",
      "surface3": "#E5EBF0",
      "panel": "#FFFFFF",
      "overlay": "#FFFFFFE6",
      "backdrop": "#FFFFFFBB",
      "border": "#CED6DE",
      "focus": "#146FD48C",
      "textPrimary": "#1D2730",
      "textSecondary": "#34424F",
      "textMuted": "#6C7B87",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#146FD4",
      "accentPrimaryAlt": "#2B87EB",
      "accentInfo": "#2B87EB",
      "accentWarn": "#FFB652",
      "accentError": "#F0625F",
      "accentSuccess": "#299F5D",
      "accentSelection": "#146FD433",
      "accentLink": "#146FD4"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#8897A3',
        keyword: '#146FD4',
        function: '#2B87EB',
        variable: c.textPrimary,
        string: '#299F5D',
        number: '#FFB652',
        constant: '#2B87EB',
        storage: '#F0625F',
        type: '#146FD4',
        punctuation: c.textPrimary,
        invalid: '#F0625F',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#146FD4',
        h2: '#2B87EB',
        h3: '#299F5D',
        h4: '#FFB652',
        h5: '#F0625F',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#146FD4","htmlStructureTag":"#2B87EB","htmlInlineTag":"#299F5D","htmlScriptTag":"#FFB652","htmlAttribute":"#2B87EB","htmlClassAttribute":"#299F5D","htmlIdAttribute":"#146FD4","htmlStyleAttribute":"#299F5D","htmlEventAttribute":"#FFB652","htmlAttributeValue":"#299F5D","htmlAttributeValueString":"#2B87EB","htmlTagBrackets":"#6C7B87","htmlPunctuation":"#8897A3","htmlStringPunctuation":"#6C7B87","htmlComment":"#8897A3","htmlEntity":"#FFB652","htmlEntityPunctuation":"#146FD4","htmlDoctype":"#F0625F","embeddedCss":"#299F5D","embeddedCssBlock":"#146FD4","embeddedJs":"#FFB652","embeddedJsBlock":"#2B87EB","htmlFormTag":"#299F5D","htmlFormAttribute":"#2B87EB","htmlTableTag":"#146FD4","htmlMediaTag":"#FFB652","htmlLinkTag":"#2B87EB","htmlHrefAttribute":"#299F5D","htmlSemanticTag":"#299F5D","htmlText":"#1D2730"}
};
