/**
 * Theme: XELA Birch Morning — Scandinavian Fresh
 * Type: light
 * Auto-generated from artisan collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-birch-morning',
  name: 'XELA Birch Morning — Scandinavian Fresh',
  type: 'light',
  roles: {
      "surface0": "#FAFAF8",
      "surface1": "#F5F5F2",
      "surface2": "#EFEFE9",
      "surface3": "#E8E8E0",
      "panel": "#FCFCFA",
      "overlay": "#FAFAF8F2",
      "backdrop": "#FAFAF899",
      "border": "#DCDCD0",
      "focus": "#5A8A7AB3",
      "textPrimary": "#2F3832",
      "textSecondary": "#424B42",
      "textMuted": "#6F7A72",
      "textInverted": "#FAFAF8",
      "accentPrimary": "#5A8A7A",
      "accentPrimaryAlt": "#72A590",
      "accentInfo": "#5A7A9A",
      "accentWarn": "#BA9A5A",
      "accentError": "#BA6B5A",
      "accentSuccess": "#6BA070",
      "accentSelection": "#5A8A7A2E",
      "accentLink": "#5A7A9A"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#7A877F',
        keyword: '#5A8A7A',
        function: '#5A7A9A',
        variable: '#2F3832',
        string: '#6BA070',
        number: '#BA9A5A',
        constant: '#8A6B9A',
        storage: '#5A8A7A',
        type: '#5A7A9A',
        punctuation: '#424B42',
        invalid: '#BA6B5A',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#2F3832',
        h2: '#5A8A7A',
        h3: '#5A7A9A',
        h4: '#6BA070',
        h5: '#BA9A5A',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
