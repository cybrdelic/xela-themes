/**
 * Theme: XELA Digital Rain — Data Cascade
 * Type: dark
 * Auto-generated from elite collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-digital-rain',
  name: 'XELA Digital Rain — Data Cascade',
  type: 'dark',
  roles: {
      "surface0": "#000B00",
      "surface1": "#001A00",
      "surface2": "#002900",
      "surface3": "#003800",
      "panel": "#001A00",
      "overlay": "#000B00F0",
      "backdrop": "#00000099",
      "border": "#004700",
      "focus": "#00FF41E6",
      "textPrimary": "#00FF41",
      "textSecondary": "#00E63C",
      "textMuted": "#00CC37",
      "textInverted": "#000B00",
      "accentPrimary": "#00FF41",
      "accentPrimaryAlt": "#33FF66",
      "accentInfo": "#66FF8C",
      "accentWarn": "#FFFF99",
      "accentError": "#FF9999",
      "accentSuccess": "#99FF99",
      "accentSelection": "#00FF414D",
      "accentLink": "#66FF8C"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#008F11',
        keyword: '#00FF41',
        function: '#66FF8C',
        variable: '#00FF41',
        string: '#99FF99',
        number: '#FFFF99',
        constant: '#33FF66',
        storage: '#FF9999',
        type: '#66FF8C',
        punctuation: c.textPrimary,
        invalid: '#FF9999',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#00FF41',
        h2: '#66FF8C',
        h3: '#33FF66',
        h4: '#99FF99',
        h5: '#FFFF99',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#00FF41","htmlStructureTag":"#66FF8C","htmlInlineTag":"#33FF66","htmlScriptTag":"#FFFF99","htmlAttribute":"#66FF8C","htmlClassAttribute":"#99FF99","htmlIdAttribute":"#00FF41","htmlStyleAttribute":"#33FF66","htmlEventAttribute":"#FFFF99","htmlAttributeValue":"#99FF99","htmlAttributeValueString":"#66FF8C","htmlTagBrackets":"#00CC37","htmlPunctuation":"#008F11","htmlStringPunctuation":"#00CC37","htmlComment":"#008F11","htmlEntity":"#FFFF99","htmlEntityPunctuation":"#00FF41","htmlDoctype":"#FF9999","embeddedCss":"#33FF66","embeddedCssBlock":"#00FF41","embeddedJs":"#FFFF99","embeddedJsBlock":"#66FF8C","htmlFormTag":"#99FF99","htmlFormAttribute":"#66FF8C","htmlTableTag":"#00FF41","htmlMediaTag":"#FFFF99","htmlLinkTag":"#66FF8C","htmlHrefAttribute":"#99FF99","htmlSemanticTag":"#33FF66","htmlText":"#00FF41"}
};
