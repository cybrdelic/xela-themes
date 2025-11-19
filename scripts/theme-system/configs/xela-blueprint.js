/**
 * Theme: XELA Blueprint — Technical Drafting
 * Type: dark
 * Auto-generated from batch2 collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-blueprint',
  name: 'XELA Blueprint — Technical Drafting',
  type: 'dark',
  roles: {
      "surface0": "#0A1929",
      "surface1": "#0E2139",
      "surface2": "#1A374D",
      "surface3": "#264B61",
      "panel": "#0E2139",
      "overlay": "#0A1929CC",
      "backdrop": "#00000088",
      "border": "#1A374D",
      "focus": "#87CEEBAB",
      "textPrimary": "#E3F2FD",
      "textSecondary": "#BBDEFB",
      "textMuted": "#90CAF9",
      "textInverted": "#0A1929",
      "accentPrimary": "#87CEEB",
      "accentPrimaryAlt": "#B3E5FC",
      "accentInfo": "#4FC3F7",
      "accentWarn": "#FFB74D",
      "accentError": "#FF8A65",
      "accentSuccess": "#81C784",
      "accentSelection": "#87CEEB33",
      "accentLink": "#4FC3F7"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#64B5F6',
        keyword: '#87CEEB',
        function: '#4FC3F7',
        variable: '#E3F2FD',
        string: '#81C784',
        number: '#FFB74D',
        constant: '#B3E5FC',
        storage: '#FF8A65',
        type: '#4FC3F7',
        punctuation: c.textPrimary,
        invalid: '#FF8A65',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#87CEEB',
        h2: '#4FC3F7',
        h3: '#B3E5FC',
        h4: '#81C784',
        h5: '#FFB74D',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
