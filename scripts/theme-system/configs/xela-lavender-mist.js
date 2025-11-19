/**
 * Theme: XELA Lavender Mist — Soft Purple Hues
 * Type: light
 * Auto-generated from dynamic collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-lavender-mist',
  name: 'XELA Lavender Mist — Soft Purple Hues',
  type: 'light',
  roles: {
      "surface0": "#F7F4FA",
      "surface1": "#EDE8F2",
      "surface2": "#FDFBFF",
      "surface3": "#E1D9EA",
      "panel": "#FFFEFF",
      "overlay": "#F7F4FAF2",
      "backdrop": "#F7F4FA99",
      "border": "#D6CBDF",
      "focus": "#8B7AA8B3",
      "textPrimary": "#352E42",
      "textSecondary": "#4D445E",
      "textMuted": "#7D7088",
      "textInverted": "#F7F4FA",
      "accentPrimary": "#8B7AA8",
      "accentPrimaryAlt": "#A594C0",
      "accentInfo": "#6A9FBA",
      "accentWarn": "#C9A66E",
      "accentError": "#C96B78",
      "accentSuccess": "#7FA587",
      "accentSelection": "#8B7AA82E",
      "accentLink": "#6A9FBA"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#9688A6',
        keyword: '#8B7AA8',
        function: '#6A9FBA',
        variable: '#352E42',
        string: '#7FA587',
        number: '#C9A66E',
        constant: '#A594C0',
        storage: '#8B7AA8',
        type: '#6A9FBA',
        punctuation: '#4D445E',
        invalid: '#C96B78',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#352E42',
        h2: '#6A9FBA',
        h3: '#7FA587',
        h4: '#C9A66E',
        h5: '#A594C0',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
