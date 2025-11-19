/**
 * Theme: XELA Sage Wisdom — Herbal Serenity
 * Type: light
 * Auto-generated from artisan collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-sage-wisdom',
  name: 'XELA Sage Wisdom — Herbal Serenity',
  type: 'light',
  roles: {
      "surface0": "#F5F5F0",
      "surface1": "#EEEEE5",
      "surface2": "#E5E5D8",
      "surface3": "#DCDCC8",
      "panel": "#F7F7F2",
      "overlay": "#F5F5F0F2",
      "backdrop": "#F5F5F099",
      "border": "#D0D0BC",
      "focus": "#6B8E6BB3",
      "textPrimary": "#3A4039",
      "textSecondary": "#4E544C",
      "textMuted": "#7A8078",
      "textInverted": "#F5F5F0",
      "accentPrimary": "#6B8E6B",
      "accentPrimaryAlt": "#7FA77F",
      "accentInfo": "#5A8A8A",
      "accentWarn": "#B8905A",
      "accentError": "#B46B5A",
      "accentSuccess": "#7AA070",
      "accentSelection": "#6B8E6B33",
      "accentLink": "#5A8A8A"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#8A9088',
        keyword: '#6B8E6B',
        function: '#5A8A8A',
        variable: '#3A4039',
        string: '#7AA070',
        number: '#B8905A',
        constant: '#8B7A8B',
        storage: '#6B8E6B',
        type: '#5A8A8A',
        punctuation: '#4E544C',
        invalid: '#B46B5A',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#3A4039',
        h2: '#6B8E6B',
        h3: '#5A8A8A',
        h4: '#7AA070',
        h5: '#B8905A',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
