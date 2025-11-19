/**
 * Theme: XELA Zen Garden — Peaceful Minimalism
 * Type: light
 * Auto-generated from elite collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-zen-garden',
  name: 'XELA Zen Garden — Peaceful Minimalism',
  type: 'light',
  roles: {
      "surface0": "#FEFEFE",
      "surface1": "#F8F8F8",
      "surface2": "#F2F2F2",
      "surface3": "#ECECEC",
      "panel": "#F8F8F8",
      "overlay": "#FEFEFECC",
      "backdrop": "#FFFFFF88",
      "border": "#E0E0E0",
      "focus": "#8B451399",
      "textPrimary": "#2F2F2F",
      "textSecondary": "#4A4A4A",
      "textMuted": "#808080",
      "textInverted": "#FEFEFE",
      "accentPrimary": "#8B4513",
      "accentPrimaryAlt": "#A0522D",
      "accentInfo": "#5F8A5F",
      "accentWarn": "#D2691E",
      "accentError": "#B22222",
      "accentSuccess": "#228B22",
      "accentSelection": "#8B451326",
      "accentLink": "#5F8A5F"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#A9A9A9',
        keyword: '#8B4513',
        function: '#5F8A5F',
        variable: '#2F2F2F',
        string: '#228B22',
        number: '#D2691E',
        constant: '#A0522D',
        storage: '#B22222',
        type: '#5F8A5F',
        punctuation: c.textPrimary,
        invalid: '#B22222',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#2F2F2F',
        h2: '#8B4513',
        h3: '#5F8A5F',
        h4: '#A0522D',
        h5: '#228B22',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#8B4513","htmlStructureTag":"#5F8A5F","htmlInlineTag":"#A0522D","htmlScriptTag":"#D2691E","htmlAttribute":"#5F8A5F","htmlClassAttribute":"#228B22","htmlIdAttribute":"#8B4513","htmlStyleAttribute":"#A0522D","htmlEventAttribute":"#D2691E","htmlAttributeValue":"#228B22","htmlAttributeValueString":"#5F8A5F","htmlTagBrackets":"#808080","htmlPunctuation":"#A9A9A9","htmlStringPunctuation":"#808080","htmlComment":"#A9A9A9","htmlEntity":"#D2691E","htmlEntityPunctuation":"#8B4513","htmlDoctype":"#B22222","embeddedCss":"#A0522D","embeddedCssBlock":"#8B4513","embeddedJs":"#D2691E","embeddedJsBlock":"#5F8A5F","htmlFormTag":"#228B22","htmlFormAttribute":"#5F8A5F","htmlTableTag":"#8B4513","htmlMediaTag":"#D2691E","htmlLinkTag":"#5F8A5F","htmlHrefAttribute":"#228B22","htmlSemanticTag":"#A0522D","htmlText":"#2F2F2F"}
};
