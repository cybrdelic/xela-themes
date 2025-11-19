/**
 * Theme: XELA Brutalist — Raw Concrete
 * Type: dark
 * Auto-generated from final collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-brutalist',
  name: 'XELA Brutalist — Raw Concrete',
  type: 'dark',
  roles: {
      "surface0": "#2A2A2A",
      "surface1": "#3A3A3A",
      "surface2": "#4A4A4A",
      "surface3": "#5A5A5A",
      "panel": "#3A3A3A",
      "overlay": "#2A2A2ACC",
      "backdrop": "#00000088",
      "border": "#6A6A6A",
      "focus": "#FFFFFFAB",
      "textPrimary": "#F0F0F0",
      "textSecondary": "#E0E0E0",
      "textMuted": "#C0C0C0",
      "textInverted": "#2A2A2A",
      "accentPrimary": "#FFFFFF",
      "accentPrimaryAlt": "#DDDDDD",
      "accentInfo": "#BBBBBB",
      "accentWarn": "#999999",
      "accentError": "#777777",
      "accentSuccess": "#AAAAAA",
      "accentSelection": "#FFFFFF1A",
      "accentLink": "#DDDDDD"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#888888',
        keyword: '#FFFFFF',
        function: '#DDDDDD',
        variable: '#F0F0F0',
        string: '#BBBBBB',
        number: '#999999',
        constant: '#CCCCCC',
        storage: '#777777',
        type: '#AAAAAA',
        punctuation: c.textPrimary,
        invalid: '#777777',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FFFFFF',
        h2: '#DDDDDD',
        h3: '#CCCCCC',
        h4: '#BBBBBB',
        h5: '#AAAAAA',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
