/**
 * Theme: XELA Smoke — Atmospheric Grey
 * Type: dark
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-smoke',
  name: 'XELA Smoke — Atmospheric Grey',
  type: 'dark',
  roles: {
      "surface0": "#1C1C1E",
      "surface1": "#242427",
      "surface2": "#2D2D30",
      "surface3": "#363639",
      "panel": "#1C1C1E",
      "overlay": "#1C1C1EF2",
      "backdrop": "#00000099",
      "border": "#3F3F42",
      "focus": "#B4B4B4B3",
      "textPrimary": "#DCDCDC",
      "textSecondary": "#C8C8C8",
      "textMuted": "#8C8C8C",
      "textInverted": "#1C1C1E",
      "accentPrimary": "#B4B4B4",
      "accentPrimaryAlt": "#C8C8C8",
      "accentInfo": "#6EB4D1",
      "accentWarn": "#E0B872",
      "accentError": "#D87C7C",
      "accentSuccess": "#8FC08A",
      "accentSelection": "#B4B4B43D",
      "accentLink": "#8DBEDC"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#6C6C6C',
        keyword: '#C8C8C8',
        function: '#B4B4B4',
        variable: '#DCDCDC',
        string: '#A0D0A0',
        number: '#E0C090',
        constant: '#C0B0D0',
        storage: '#C8C8C8',
        type: '#90C8D8',
        punctuation: '#C8C8C8',
        invalid: '#D87C7C',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#DCDCDC',
        h2: '#C8C8C8',
        h3: '#B4B4B4',
        h4: '#A0A0A0',
        h5: '#8C8C8C',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
