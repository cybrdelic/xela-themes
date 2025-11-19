/**
 * Theme: XELA Deep — Abyssal Bioluminescence
 * Type: dark
 * Auto-generated from final collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-deep',
  name: 'XELA Deep — Abyssal Bioluminescence',
  type: 'dark',
  roles: {
      "surface0": "#0A0E1A",
      "surface1": "#0F1520",
      "surface2": "#141A26",
      "surface3": "#1A212E",
      "panel": "#0F1520",
      "overlay": "#0A0E1ACC",
      "backdrop": "#00000088",
      "border": "#1A212E",
      "focus": "#4DD0E1AB",
      "textPrimary": "#E1F5FE",
      "textSecondary": "#B3E5FC",
      "textMuted": "#81D4FA",
      "textInverted": "#0A0E1A",
      "accentPrimary": "#4DD0E1",
      "accentPrimaryAlt": "#26C6DA",
      "accentInfo": "#00BCD4",
      "accentWarn": "#FFB74D",
      "accentError": "#FF8A65",
      "accentSuccess": "#4DB6AC",
      "accentSelection": "#4DD0E133",
      "accentLink": "#26C6DA"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#546E7A',
        keyword: '#4DD0E1',
        function: '#26C6DA',
        variable: '#E1F5FE',
        string: '#4DB6AC',
        number: '#FFB74D',
        constant: '#81D4FA',
        storage: '#FF8A65',
        type: '#00BCD4',
        punctuation: c.textPrimary,
        invalid: '#FF8A65',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#4DD0E1',
        h2: '#26C6DA',
        h3: '#00BCD4',
        h4: '#4DB6AC',
        h5: '#FFB74D',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
