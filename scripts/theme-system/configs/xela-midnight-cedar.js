/**
 * Theme: XELA Midnight Cedar — Forest Dark
 * Type: dark
 * Auto-generated from artisan collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-midnight-cedar',
  name: 'XELA Midnight Cedar — Forest Dark',
  type: 'dark',
  roles: {
      "surface0": "#1C2521",
      "surface1": "#232C28",
      "surface2": "#2A342F",
      "surface3": "#323D37",
      "panel": "#1C2521",
      "overlay": "#1C2521F2",
      "backdrop": "#00000099",
      "border": "#3A463F",
      "focus": "#8FC9A3B3",
      "textPrimary": "#D5E3D8",
      "textSecondary": "#C1D5C8",
      "textMuted": "#7A9084",
      "textInverted": "#1C2521",
      "accentPrimary": "#8FC9A3",
      "accentPrimaryAlt": "#A8DCBD",
      "accentInfo": "#7AB8D1",
      "accentWarn": "#D4BA7A",
      "accentError": "#D1857A",
      "accentSuccess": "#9FD19A",
      "accentSelection": "#8FC9A338",
      "accentLink": "#91CFE0"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#5E756A',
        keyword: '#A8DCBD',
        function: '#7AB8D1',
        variable: '#D5E3D8',
        string: '#9FD19A',
        number: '#E8C99F',
        constant: '#B8A8D1',
        storage: '#A8DCBD',
        type: '#7AB8D1',
        punctuation: '#C1D5C8',
        invalid: '#D1857A',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#A8DCBD',
        h2: '#7AB8D1',
        h3: '#9FD19A',
        h4: '#E8C99F',
        h5: '#B8A8D1',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
