/**
 * Theme: XELA Honey Glow — Golden Warmth
 * Type: light
 * Auto-generated from artisan collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-honey-glow',
  name: 'XELA Honey Glow — Golden Warmth',
  type: 'light',
  roles: {
      "surface0": "#FFF9F0",
      "surface1": "#FFF4E5",
      "surface2": "#FFEED8",
      "surface3": "#FFE8C8",
      "panel": "#FFFBF5",
      "overlay": "#FFF9F0F2",
      "backdrop": "#FFF9F099",
      "border": "#F0D9B8",
      "focus": "#D4A056B3",
      "textPrimary": "#3D3020",
      "textSecondary": "#52422E",
      "textMuted": "#8A7456",
      "textInverted": "#FFF9F0",
      "accentPrimary": "#D4A056",
      "accentPrimaryAlt": "#E8BA70",
      "accentInfo": "#5690B8",
      "accentWarn": "#E89F56",
      "accentError": "#D96B56",
      "accentSuccess": "#8AB870",
      "accentSelection": "#D4A05633",
      "accentLink": "#56A0C9"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#9A8568',
        keyword: '#D4A056',
        function: '#5690B8',
        variable: '#3D3020',
        string: '#8AB870',
        number: '#E89F56',
        constant: '#B87CA8',
        storage: '#D4A056',
        type: '#5690B8',
        punctuation: '#52422E',
        invalid: '#D96B56',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#D4A056',
        h2: '#5690B8',
        h3: '#8AB870',
        h4: '#E89F56',
        h5: '#B87CA8',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
