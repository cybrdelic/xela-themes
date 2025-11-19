/**
 * Theme: XELA Mint Cream — Fresh Coolness
 * Type: light
 * Auto-generated from dynamic collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-mint-cream',
  name: 'XELA Mint Cream — Fresh Coolness',
  type: 'light',
  roles: {
      "surface0": "#F5FAF8",
      "surface1": "#E9F3EF",
      "surface2": "#FCFFFD",
      "surface3": "#DDEAE4",
      "panel": "#FEFFFF",
      "overlay": "#F5FAF8F2",
      "backdrop": "#F5FAF899",
      "border": "#D0E0D9",
      "focus": "#5FA888B3",
      "textPrimary": "#283832",
      "textSecondary": "#3E4F47",
      "textMuted": "#6E847A",
      "textInverted": "#F5FAF8",
      "accentPrimary": "#5FA888",
      "accentPrimaryAlt": "#7AC09E",
      "accentInfo": "#6AA8C7",
      "accentWarn": "#C8A86E",
      "accentError": "#C87070",
      "accentSuccess": "#6EB88A",
      "accentSelection": "#5FA8882E",
      "accentLink": "#6AA8C7"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#8B9D94',
        keyword: '#5FA888',
        function: '#6AA8C7',
        variable: '#283832',
        string: '#6EB88A',
        number: '#C8A86E',
        constant: '#7AC09E',
        storage: '#5FA888',
        type: '#6AA8C7',
        punctuation: '#3E4F47',
        invalid: '#C87070',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#283832',
        h2: '#6AA8C7',
        h3: '#6EB88A',
        h4: '#C8A86E',
        h5: '#7AC09E',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
