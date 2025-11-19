/**
 * Theme: XELA Limestone — Natural Stone
 * Type: light
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-limestone',
  name: 'XELA Limestone — Natural Stone',
  type: 'light',
  roles: {
      "surface0": "#F4F3F1",
      "surface1": "#EDEAE6",
      "surface2": "#E5E1DB",
      "surface3": "#DDD8D0",
      "panel": "#F6F5F3",
      "overlay": "#F4F3F1F2",
      "backdrop": "#F4F3F199",
      "border": "#CECAC2",
      "focus": "#6B675EB3",
      "textPrimary": "#3B3731",
      "textSecondary": "#524E48",
      "textMuted": "#7F7A72",
      "textInverted": "#F4F3F1",
      "accentPrimary": "#6B675E",
      "accentPrimaryAlt": "#857F74",
      "accentInfo": "#5A8A8C",
      "accentWarn": "#C19A5B",
      "accentError": "#B05B50",
      "accentSuccess": "#6B8E6B",
      "accentSelection": "#6B675E33",
      "accentLink": "#5A8A8C"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#98928A',
        keyword: '#857F74',
        function: '#5A8A8C',
        variable: '#3B3731',
        string: '#6B8E6B',
        number: '#C19A5B',
        constant: '#9B7FA0',
        storage: '#857F74',
        type: '#5A8A8C',
        punctuation: '#524E48',
        invalid: '#B05B50',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#3B3731',
        h2: '#5A8A8C',
        h3: '#6B8E6B',
        h4: '#C19A5B',
        h5: '#9B7FA0',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
