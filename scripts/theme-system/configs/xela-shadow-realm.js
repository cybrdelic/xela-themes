/**
 * Theme: XELA Shadow Realm — Void Walker
 * Type: dark
 * Auto-generated from ultimate collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-shadow-realm',
  name: 'XELA Shadow Realm — Void Walker',
  type: 'dark',
  roles: {
      "surface0": "#050505",
      "surface1": "#0A0A0A",
      "surface2": "#0F0F0F",
      "surface3": "#141414",
      "panel": "#0A0A0A",
      "overlay": "#050505F0",
      "backdrop": "#00000099",
      "border": "#191919",
      "focus": "#800080E6",
      "textPrimary": "#E8E8E8",
      "textSecondary": "#D0D0D0",
      "textMuted": "#808080",
      "textInverted": "#050505",
      "accentPrimary": "#800080",
      "accentPrimaryAlt": "#9932CC",
      "accentInfo": "#4B0082",
      "accentWarn": "#FF8C00",
      "accentError": "#DC143C",
      "accentSuccess": "#32CD32",
      "accentSelection": "#8000804D",
      "accentLink": "#9932CC"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#606060',
        keyword: '#800080',
        function: '#9932CC',
        variable: '#E8E8E8',
        string: '#32CD32',
        number: '#FF8C00',
        constant: '#4B0082',
        storage: '#DC143C',
        type: '#9932CC',
        punctuation: c.textPrimary,
        invalid: '#DC143C',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#800080',
        h2: '#9932CC',
        h3: '#4B0082',
        h4: '#32CD32',
        h5: '#FF8C00',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#800080","htmlStructureTag":"#9932CC","htmlInlineTag":"#4B0082","htmlScriptTag":"#FF8C00","htmlAttribute":"#9932CC","htmlClassAttribute":"#32CD32","htmlIdAttribute":"#800080","htmlStyleAttribute":"#4B0082","htmlEventAttribute":"#FF8C00","htmlAttributeValue":"#32CD32","htmlAttributeValueString":"#9932CC","htmlTagBrackets":"#808080","htmlPunctuation":"#606060","htmlStringPunctuation":"#808080","htmlComment":"#606060","htmlEntity":"#FF8C00","htmlEntityPunctuation":"#800080","htmlDoctype":"#DC143C","embeddedCss":"#4B0082","embeddedCssBlock":"#800080","embeddedJs":"#FF8C00","embeddedJsBlock":"#9932CC","htmlFormTag":"#32CD32","htmlFormAttribute":"#9932CC","htmlTableTag":"#800080","htmlMediaTag":"#FF8C00","htmlLinkTag":"#9932CC","htmlHrefAttribute":"#32CD32","htmlSemanticTag":"#4B0082","htmlText":"#E8E8E8"}
};
