/**
 * Theme: XELA Mercury — Liquid Metal
 * Type: dark
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-mercury',
  name: 'XELA Mercury — Liquid Metal',
  type: 'dark',
  roles: {
      "surface0": "#18191A",
      "surface1": "#1F2122",
      "surface2": "#272A2B",
      "surface3": "#2F3234",
      "panel": "#18191A",
      "overlay": "#18191AF2",
      "backdrop": "#00000099",
      "border": "#3A3D3F",
      "focus": "#E0E0E0B3",
      "textPrimary": "#E4E6EB",
      "textSecondary": "#B8BBBF",
      "textMuted": "#8A8D91",
      "textInverted": "#18191A",
      "accentPrimary": "#E0E0E0",
      "accentPrimaryAlt": "#F0F0F0",
      "accentInfo": "#60A5FA",
      "accentWarn": "#FBBF24",
      "accentError": "#F87171",
      "accentSuccess": "#4ADE80",
      "accentSelection": "#E0E0E033",
      "accentLink": "#93C5FD"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#6B6F76',
        keyword: '#D0D0D0',
        function: '#E0E0E0',
        variable: '#E4E6EB',
        string: '#86EFAC',
        number: '#FCD34D',
        constant: '#C4B5FD',
        storage: '#D0D0D0',
        type: '#93C5FD',
        punctuation: '#B8BBBF',
        invalid: '#F87171',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#F0F0F0',
        h2: '#E0E0E0',
        h3: '#D0D0D0',
        h4: '#C0C0C0',
        h5: '#B0B0B0',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
