/**
 * Theme: XELA Carbon Fiber — Technical Weave
 * Type: dark
 * Auto-generated from experimental collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-carbon-fiber',
  name: 'XELA Carbon Fiber — Technical Weave',
  type: 'dark',
  roles: {
      "surface0": "#0D0F11",
      "surface1": "#13171B",
      "surface2": "#181D22",
      "surface3": "#1F252B",
      "panel": "#13171B",
      "overlay": "#0D0F11E6",
      "backdrop": "#000000AA",
      "border": "#242D33",
      "focus": "#00C0FF8C",
      "textPrimary": "#E3E8EC",
      "textSecondary": "#C7D0D6",
      "textMuted": "#8A959C",
      "textInverted": "#0D0F11",
      "accentPrimary": "#00C0FF",
      "accentPrimaryAlt": "#41D1FF",
      "accentInfo": "#41D1FF",
      "accentWarn": "#FFA341",
      "accentError": "#FF5B55",
      "accentSuccess": "#33B58C",
      "accentSelection": "#00C0FF33",
      "accentLink": "#41D1FF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#607078',
        keyword: '#00C0FF',
        function: '#41D1FF',
        variable: c.textPrimary,
        string: '#33B58C',
        number: '#FFA341',
        constant: '#41D1FF',
        storage: '#FF5B55',
        type: '#00C0FF',
        punctuation: c.textPrimary,
        invalid: '#FF5B55',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#00C0FF',
        h2: '#41D1FF',
        h3: '#33B58C',
        h4: '#FFA341',
        h5: '#FF5B55',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#00C0FF","htmlStructureTag":"#41D1FF","htmlInlineTag":"#33B58C","htmlScriptTag":"#FFA341","htmlAttribute":"#41D1FF","htmlClassAttribute":"#33B58C","htmlIdAttribute":"#00C0FF","htmlStyleAttribute":"#33B58C","htmlEventAttribute":"#FFA341","htmlAttributeValue":"#33B58C","htmlAttributeValueString":"#41D1FF","htmlTagBrackets":"#8A959C","htmlPunctuation":"#607078","htmlStringPunctuation":"#8A959C","htmlComment":"#607078","htmlEntity":"#FFA341","htmlEntityPunctuation":"#00C0FF","htmlDoctype":"#FF5B55","embeddedCss":"#33B58C","embeddedCssBlock":"#00C0FF","embeddedJs":"#FFA341","embeddedJsBlock":"#41D1FF","htmlFormTag":"#33B58C","htmlFormAttribute":"#41D1FF","htmlTableTag":"#00C0FF","htmlMediaTag":"#FFA341","htmlLinkTag":"#41D1FF","htmlHrefAttribute":"#33B58C","htmlSemanticTag":"#33B58C","htmlText":"#E3E8EC"}
};
