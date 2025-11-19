/**
 * Theme: XELA Crystalline Matrix — Diamond Lattice
 * Type: dark
 * Auto-generated from ultimate collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-crystalline-matrix',
  name: 'XELA Crystalline Matrix — Diamond Lattice',
  type: 'dark',
  roles: {
      "surface0": "#0F0F1A",
      "surface1": "#1A1A2E",
      "surface2": "#252542",
      "surface3": "#303056",
      "panel": "#1A1A2E",
      "overlay": "#0F0F1AE8",
      "backdrop": "#00000099",
      "border": "#3B3B6A",
      "focus": "#40E0D0E6",
      "textPrimary": "#F0FFFF",
      "textSecondary": "#E0F8FF",
      "textMuted": "#B0D0E0",
      "textInverted": "#0F0F1A",
      "accentPrimary": "#40E0D0",
      "accentPrimaryAlt": "#00CED1",
      "accentInfo": "#87CEEB",
      "accentWarn": "#F0E68C",
      "accentError": "#FF69B4",
      "accentSuccess": "#98FB98",
      "accentSelection": "#40E0D040",
      "accentLink": "#87CEEB"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#8090B0',
        keyword: '#40E0D0',
        function: '#87CEEB',
        variable: '#F0FFFF',
        string: '#98FB98',
        number: '#F0E68C',
        constant: '#00CED1',
        storage: '#FF69B4',
        type: '#87CEEB',
        punctuation: c.textPrimary,
        invalid: '#FF69B4',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#40E0D0',
        h2: '#87CEEB',
        h3: '#00CED1',
        h4: '#98FB98',
        h5: '#F0E68C',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#40E0D0","htmlStructureTag":"#87CEEB","htmlInlineTag":"#00CED1","htmlScriptTag":"#F0E68C","htmlAttribute":"#87CEEB","htmlClassAttribute":"#98FB98","htmlIdAttribute":"#40E0D0","htmlStyleAttribute":"#00CED1","htmlEventAttribute":"#F0E68C","htmlAttributeValue":"#98FB98","htmlAttributeValueString":"#87CEEB","htmlTagBrackets":"#B0D0E0","htmlPunctuation":"#8090B0","htmlStringPunctuation":"#B0D0E0","htmlComment":"#8090B0","htmlEntity":"#F0E68C","htmlEntityPunctuation":"#40E0D0","htmlDoctype":"#FF69B4","embeddedCss":"#00CED1","embeddedCssBlock":"#40E0D0","embeddedJs":"#F0E68C","embeddedJsBlock":"#87CEEB","htmlFormTag":"#98FB98","htmlFormAttribute":"#87CEEB","htmlTableTag":"#40E0D0","htmlMediaTag":"#F0E68C","htmlLinkTag":"#87CEEB","htmlHrefAttribute":"#98FB98","htmlSemanticTag":"#00CED1","htmlText":"#F0FFFF"}
};
