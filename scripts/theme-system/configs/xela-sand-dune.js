/**
 * Theme: XELA Sand Dune — Desert Warmth
 * Type: light
 * Auto-generated from dynamic collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-sand-dune',
  name: 'XELA Sand Dune — Desert Warmth',
  type: 'light',
  roles: {
      "surface0": "#FAF6F1",
      "surface1": "#EFE7DC",
      "surface2": "#FFFBF5",
      "surface3": "#E2D5C3",
      "panel": "#FFFEFC",
      "overlay": "#FAF6F1F2",
      "backdrop": "#FAF6F199",
      "border": "#D8C9B5",
      "focus": "#A67C52B3",
      "textPrimary": "#3A2F23",
      "textSecondary": "#51443A",
      "textMuted": "#8A7B6C",
      "textInverted": "#FAF6F1",
      "accentPrimary": "#A67C52",
      "accentPrimaryAlt": "#C9985E",
      "accentInfo": "#6A9AB0",
      "accentWarn": "#D9A05B",
      "accentError": "#C46752",
      "accentSuccess": "#7FA36B",
      "accentSelection": "#A67C5229",
      "accentLink": "#6A9AB0"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#9B8A77',
        keyword: '#A67C52',
        function: '#6A9AB0',
        variable: '#3A2F23',
        string: '#7FA36B',
        number: '#D9A05B',
        constant: '#C9985E',
        storage: '#A67C52',
        type: '#6A9AB0',
        punctuation: '#51443A',
        invalid: '#C46752',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#3A2F23',
        h2: '#6A9AB0',
        h3: '#7FA36B',
        h4: '#D9A05B',
        h5: '#C9985E',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
