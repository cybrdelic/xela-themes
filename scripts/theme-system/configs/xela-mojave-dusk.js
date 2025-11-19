/**
 * Theme: XELA Mojave Dusk — Desert Warmth
 * Type: dark
 * Auto-generated from artisan collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-mojave-dusk',
  name: 'XELA Mojave Dusk — Desert Warmth',
  type: 'dark',
  roles: {
      "surface0": "#2B2520",
      "surface1": "#332B26",
      "surface2": "#3D342E",
      "surface3": "#473D36",
      "panel": "#2B2520",
      "overlay": "#2B2520F2",
      "backdrop": "#00000099",
      "border": "#4A413A",
      "focus": "#E8B87EB3",
      "textPrimary": "#E8D5C4",
      "textSecondary": "#D4C1B0",
      "textMuted": "#9B8A7A",
      "textInverted": "#2B2520",
      "accentPrimary": "#E8B87E",
      "accentPrimaryAlt": "#F5D5A8",
      "accentInfo": "#87B5B5",
      "accentWarn": "#E8A87C",
      "accentError": "#D17A6F",
      "accentSuccess": "#9CB587",
      "accentSelection": "#E8B87E38",
      "accentLink": "#A8C5C5"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#8A7968',
        keyword: '#E8B87E',
        function: '#A8C5C5',
        variable: '#E8D5C4',
        string: '#9CB587',
        number: '#E8A87C',
        constant: '#D4A582',
        storage: '#E8B87E',
        type: '#87B5B5',
        punctuation: '#D4C1B0',
        invalid: '#D17A6F',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#E8B87E',
        h2: '#A8C5C5',
        h3: '#9CB587',
        h4: '#E8A87C',
        h5: '#D4A582',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
