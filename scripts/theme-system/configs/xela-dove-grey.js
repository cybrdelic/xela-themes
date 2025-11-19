/**
 * Theme: XELA Dove Grey — Soft Neutral
 * Type: light
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-dove-grey',
  name: 'XELA Dove Grey — Soft Neutral',
  type: 'light',
  roles: {
      "surface0": "#F7F7F7",
      "surface1": "#F0F0F0",
      "surface2": "#E8E8E8",
      "surface3": "#E0E0E0",
      "panel": "#F9F9F9",
      "overlay": "#F7F7F7F2",
      "backdrop": "#F7F7F799",
      "border": "#D0D0D0",
      "focus": "#666666B3",
      "textPrimary": "#333333",
      "textSecondary": "#4D4D4D",
      "textMuted": "#808080",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#666666",
      "accentPrimaryAlt": "#7A7A7A",
      "accentInfo": "#5C97BF",
      "accentWarn": "#D4A036",
      "accentError": "#C75450",
      "accentSuccess": "#66A366",
      "accentSelection": "#66666633",
      "accentLink": "#5C97BF"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#999999',
        keyword: '#7A7A7A',
        function: '#5C97BF',
        variable: '#333333',
        string: '#66A366',
        number: '#D4A036',
        constant: '#8B5C8B',
        storage: '#7A7A7A',
        type: '#5C97BF',
        punctuation: '#4D4D4D',
        invalid: '#C75450',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#333333',
        h2: '#5C97BF',
        h3: '#66A366',
        h4: '#D4A036',
        h5: '#8B5C8B',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
