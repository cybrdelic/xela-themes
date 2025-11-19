/**
 * Theme: XELA Linen — Natural Fabric
 * Type: light
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-linen',
  name: 'XELA Linen — Natural Fabric',
  type: 'light',
  roles: {
      "surface0": "#FAF9F7",
      "surface1": "#F5F4F1",
      "surface2": "#EFEEE9",
      "surface3": "#E9E7DF",
      "panel": "#FCFBF9",
      "overlay": "#FAF9F7F2",
      "backdrop": "#FAF9F799",
      "border": "#D9D6CD",
      "focus": "#7F6B5DB3",
      "textPrimary": "#3A3631",
      "textSecondary": "#52443C",
      "textMuted": "#7E6F65",
      "textInverted": "#FAF9F7",
      "accentPrimary": "#7F6B5D",
      "accentPrimaryAlt": "#9B8677",
      "accentInfo": "#5B8C85",
      "accentWarn": "#C9A26D",
      "accentError": "#B85C50",
      "accentSuccess": "#6B9B6E",
      "accentSelection": "#7F6B5D33",
      "accentLink": "#5B8C85"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#90827A',
        keyword: '#9B4F47',
        function: '#5B8C85',
        variable: '#3A3631',
        string: '#6B9B6E',
        number: '#C9A26D',
        constant: '#9B4F47',
        storage: '#7F6B5D',
        type: '#5B8C85',
        punctuation: '#52443C',
        invalid: '#B85C50',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#7F6B5D',
        h2: '#5B8C85',
        h3: '#6B9B6E',
        h4: '#C9A26D',
        h5: '#9B8677',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
