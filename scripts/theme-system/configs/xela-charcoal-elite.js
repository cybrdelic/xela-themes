/**
 * Theme: XELA Charcoal Elite — Professional Dark
 * Type: dark
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-charcoal-elite',
  name: 'XELA Charcoal Elite — Professional Dark',
  type: 'dark',
  roles: {
      "surface0": "#171717",
      "surface1": "#1F1F1F",
      "surface2": "#272727",
      "surface3": "#2F2F2F",
      "panel": "#171717",
      "overlay": "#171717F2",
      "backdrop": "#00000099",
      "border": "#373737",
      "focus": "#7AA2F7B3",
      "textPrimary": "#C0CAF5",
      "textSecondary": "#A9B1D6",
      "textMuted": "#565F89",
      "textInverted": "#1A1B26",
      "accentPrimary": "#7AA2F7",
      "accentPrimaryAlt": "#89DDFF",
      "accentInfo": "#2AC3DE",
      "accentWarn": "#E0AF68",
      "accentError": "#F7768E",
      "accentSuccess": "#9ECE6A",
      "accentSelection": "#7AA2F73D",
      "accentLink": "#89DDFF"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#565F89',
        keyword: '#BB9AF7',
        function: '#7AA2F7',
        variable: '#C0CAF5',
        string: '#9ECE6A',
        number: '#FF9E64',
        constant: '#FF9E64',
        storage: '#BB9AF7',
        type: '#2AC3DE',
        punctuation: '#C0CAF5',
        invalid: '#F7768E',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#7AA2F7',
        h2: '#BB9AF7',
        h3: '#9ECE6A',
        h4: '#E0AF68',
        h5: '#2AC3DE',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
