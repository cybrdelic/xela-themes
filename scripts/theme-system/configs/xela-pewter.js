/**
 * Theme: XELA Pewter — Refined Metal
 * Type: dark
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-pewter',
  name: 'XELA Pewter — Refined Metal',
  type: 'dark',
  roles: {
      "surface0": "#242628",
      "surface1": "#2C2E30",
      "surface2": "#34373A",
      "surface3": "#3C4043",
      "panel": "#242628",
      "overlay": "#242628F2",
      "backdrop": "#00000099",
      "border": "#46494C",
      "focus": "#9AA5B1B3",
      "textPrimary": "#E8EAED",
      "textSecondary": "#BDC1C6",
      "textMuted": "#9AA0A6",
      "textInverted": "#202124",
      "accentPrimary": "#9AA5B1",
      "accentPrimaryAlt": "#ADB8C4",
      "accentInfo": "#8AB4F8",
      "accentWarn": "#FDD663",
      "accentError": "#F28B82",
      "accentSuccess": "#81C995",
      "accentSelection": "#9AA5B13B",
      "accentLink": "#8AB4F8"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#5F6368',
        keyword: '#AECBFA',
        function: '#A8C7FA',
        variable: '#E8EAED',
        string: '#78D9A8',
        number: '#FDD663',
        constant: '#AECBFA',
        storage: '#C58AF9',
        type: '#8AB4F8',
        punctuation: '#BDC1C6',
        invalid: '#F28B82',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#AECBFA',
        h2: '#8AB4F8',
        h3: '#78D9A8',
        h4: '#FDD663',
        h5: '#F5A8AB',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
