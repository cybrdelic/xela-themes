/**
 * Theme: XELA Platinum — Premium Silver
 * Type: light
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-platinum',
  name: 'XELA Platinum — Premium Silver',
  type: 'light',
  roles: {
      "surface0": "#FAFAFA",
      "surface1": "#F3F3F3",
      "surface2": "#EBEBEB",
      "surface3": "#E3E3E3",
      "panel": "#FCFCFC",
      "overlay": "#FAFAFAF2",
      "backdrop": "#FAFAFA99",
      "border": "#D6D6D6",
      "focus": "#616161B3",
      "textPrimary": "#212121",
      "textSecondary": "#424242",
      "textMuted": "#757575",
      "textInverted": "#FAFAFA",
      "accentPrimary": "#616161",
      "accentPrimaryAlt": "#757575",
      "accentInfo": "#0288D1",
      "accentWarn": "#F57C00",
      "accentError": "#D32F2F",
      "accentSuccess": "#388E3C",
      "accentSelection": "#6161612E",
      "accentLink": "#1976D2"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#9E9E9E',
        keyword: '#616161',
        function: '#0288D1',
        variable: '#212121',
        string: '#388E3C',
        number: '#F57C00',
        constant: '#7B1FA2',
        storage: '#616161',
        type: '#00796B',
        punctuation: '#424242',
        invalid: '#D32F2F',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#212121',
        h2: '#0288D1',
        h3: '#388E3C',
        h4: '#F57C00',
        h5: '#7B1FA2',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
