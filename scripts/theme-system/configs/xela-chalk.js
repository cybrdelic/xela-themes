/**
 * Theme: XELA Chalk — Matte White
 * Type: light
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-chalk',
  name: 'XELA Chalk — Matte White',
  type: 'light',
  roles: {
      "surface0": "#F9F9F9",
      "surface1": "#F3F3F3",
      "surface2": "#ECECEC",
      "surface3": "#E5E5E5",
      "panel": "#FBFBFB",
      "overlay": "#F9F9F9F2",
      "backdrop": "#F9F9F999",
      "border": "#D8D8D8",
      "focus": "#4A90E2B3",
      "textPrimary": "#2D2D2D",
      "textSecondary": "#424242",
      "textMuted": "#757575",
      "textInverted": "#FAFAFA",
      "accentPrimary": "#4A90E2",
      "accentPrimaryAlt": "#5BA3F5",
      "accentInfo": "#50C8E0",
      "accentWarn": "#F5A623",
      "accentError": "#D0021B",
      "accentSuccess": "#7ED321",
      "accentSelection": "#4A90E233",
      "accentLink": "#5BA3F5"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#9B9B9B',
        keyword: '#BD10E0',
        function: '#4A90E2',
        variable: '#2D2D2D',
        string: '#7ED321',
        number: '#F5A623',
        constant: '#BD10E0',
        storage: '#BD10E0',
        type: '#50C8E0',
        punctuation: '#424242',
        invalid: '#D0021B',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#4A90E2',
        h2: '#BD10E0',
        h3: '#7ED321',
        h4: '#F5A623',
        h5: '#50C8E0',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
