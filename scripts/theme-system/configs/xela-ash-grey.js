/**
 * Theme: XELA Ash Grey — Minimal Elegance
 * Type: dark
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-ash-grey',
  name: 'XELA Ash Grey — Minimal Elegance',
  type: 'dark',
  roles: {
      "surface0": "#1A1A1A",
      "surface1": "#212121",
      "surface2": "#2A2A2A",
      "surface3": "#333333",
      "panel": "#1A1A1A",
      "overlay": "#1A1A1AF2",
      "backdrop": "#00000099",
      "border": "#3C3C3C",
      "focus": "#B0B0B0B3",
      "textPrimary": "#DEDEDE",
      "textSecondary": "#CFCFCF",
      "textMuted": "#888888",
      "textInverted": "#1A1A1A",
      "accentPrimary": "#B0B0B0",
      "accentPrimaryAlt": "#C8C8C8",
      "accentInfo": "#8AB4F8",
      "accentWarn": "#F9AB00",
      "accentError": "#F28B82",
      "accentSuccess": "#81C995",
      "accentSelection": "#B0B0B040",
      "accentLink": "#8AB4F8"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#707070',
        keyword: '#C8C8C8',
        function: '#B0B0B0',
        variable: '#DEDEDE',
        string: '#A8D8A8',
        number: '#D8B8A8',
        constant: '#C8B8D8',
        storage: '#C8C8C8',
        type: '#A8C8D8',
        punctuation: '#CFCFCF',
        invalid: '#F28B82',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#DEDEDE',
        h2: '#C8C8C8',
        h3: '#B0B0B0',
        h4: '#A0A0A0',
        h5: '#909090',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
