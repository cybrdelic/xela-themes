/**
 * Theme: XELA Cloud Nine — Soft Elegance
 * Type: light
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-cloud-nine',
  name: 'XELA Cloud Nine — Soft Elegance',
  type: 'light',
  roles: {
      "surface0": "#FAFAFA",
      "surface1": "#F5F5F5",
      "surface2": "#EEEEEE",
      "surface3": "#E8E8E8",
      "panel": "#FCFCFC",
      "overlay": "#FAFAFAFF",
      "backdrop": "#FAFAFA99",
      "border": "#E0E0E0",
      "focus": "#5E81ACB3",
      "textPrimary": "#2E3440",
      "textSecondary": "#3B4252",
      "textMuted": "#4C566A",
      "textInverted": "#ECEFF4",
      "accentPrimary": "#5E81AC",
      "accentPrimaryAlt": "#81A1C1",
      "accentInfo": "#88C0D0",
      "accentWarn": "#EBCB8B",
      "accentError": "#BF616A",
      "accentSuccess": "#A3BE8C",
      "accentSelection": "#5E81AC33",
      "accentLink": "#81A1C1"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#4C566A',
        keyword: '#5E81AC',
        function: '#88C0D0',
        variable: '#2E3440',
        string: '#A3BE8C',
        number: '#B48EAD',
        constant: '#5E81AC',
        storage: '#81A1C1',
        type: '#88C0D0',
        punctuation: '#2E3440',
        invalid: '#BF616A',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#5E81AC',
        h2: '#88C0D0',
        h3: '#A3BE8C',
        h4: '#EBCB8B',
        h5: '#B48EAD',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
