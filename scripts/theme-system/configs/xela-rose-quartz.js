/**
 * Theme: XELA Rose Quartz — Gentle Pink
 * Type: light
 * Auto-generated from dynamic collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-rose-quartz',
  name: 'XELA Rose Quartz — Gentle Pink',
  type: 'light',
  roles: {
      "surface0": "#FCF7F8",
      "surface1": "#F4EBF0",
      "surface2": "#FFFCFD",
      "surface3": "#E8DCE3",
      "panel": "#FFFEFF",
      "overlay": "#FCF7F8F2",
      "backdrop": "#FCF7F899",
      "border": "#DFD0D9",
      "focus": "#B07890B3",
      "textPrimary": "#3B2F35",
      "textSecondary": "#52424B",
      "textMuted": "#847179",
      "textInverted": "#FCF7F8",
      "accentPrimary": "#B07890",
      "accentPrimaryAlt": "#C992A8",
      "accentInfo": "#6F9EB8",
      "accentWarn": "#CCA66F",
      "accentError": "#C96B6B",
      "accentSuccess": "#82A880",
      "accentSelection": "#B0789029",
      "accentLink": "#6F9EB8"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#9B8792',
        keyword: '#B07890',
        function: '#6F9EB8',
        variable: '#3B2F35',
        string: '#82A880',
        number: '#CCA66F',
        constant: '#C992A8',
        storage: '#B07890',
        type: '#6F9EB8',
        punctuation: '#52424B',
        invalid: '#C96B6B',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#3B2F35',
        h2: '#6F9EB8',
        h3: '#82A880',
        h4: '#CCA66F',
        h5: '#C992A8',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
