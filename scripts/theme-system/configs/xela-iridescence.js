/**
 * Theme: XELA Iridescence — Prismatic Black
 * Type: dark
 * Auto-generated from final collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-iridescence',
  name: 'XELA Iridescence — Prismatic Black',
  type: 'dark',
  roles: {
      "surface0": "#000000",
      "surface1": "#0A0A0A",
      "surface2": "#141414",
      "surface3": "#1E1E1E",
      "panel": "#0A0A0A",
      "overlay": "#000000CC",
      "backdrop": "#00000088",
      "border": "#2A2A2A",
      "focus": "#FF6B9DAB",
      "textPrimary": "#FFFFFF",
      "textSecondary": "#F0F0F0",
      "textMuted": "#C0C0C0",
      "textInverted": "#000000",
      "accentPrimary": "#FF6B9D",
      "accentPrimaryAlt": "#9B6BFF",
      "accentInfo": "#6BFFFF",
      "accentWarn": "#FFFF6B",
      "accentError": "#FF6B6B",
      "accentSuccess": "#6BFF6B",
      "accentSelection": "#FF6B9D33",
      "accentLink": "#9B6BFF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#808080',
        keyword: '#FF6B9D',
        function: '#6BFFFF',
        variable: '#FFFFFF',
        string: '#6BFF6B',
        number: '#FFFF6B',
        constant: '#9B6BFF',
        storage: '#FF6B6B',
        type: '#6BFFFF',
        punctuation: c.textPrimary,
        invalid: '#FF6B6B',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FF6B9D',
        h2: '#9B6BFF',
        h3: '#6BFFFF',
        h4: '#6BFF6B',
        h5: '#FFFF6B',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
