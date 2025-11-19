/**
 * Theme: XELA Pearl White — Luminous Clarity
 * Type: light
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-pearl-white',
  name: 'XELA Pearl White — Luminous Clarity',
  type: 'light',
  roles: {
      "surface0": "#FFFFFF",
      "surface1": "#F9F9F9",
      "surface2": "#F3F3F3",
      "surface3": "#EEEEEE",
      "panel": "#FEFEFE",
      "overlay": "#FFFFFFF2",
      "backdrop": "#FFFFFF99",
      "border": "#E7E7E7",
      "focus": "#0078D4B3",
      "textPrimary": "#1E1E1E",
      "textSecondary": "#3E3E3E",
      "textMuted": "#767676",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#0078D4",
      "accentPrimaryAlt": "#106EBE",
      "accentInfo": "#00BCF2",
      "accentWarn": "#CA5010",
      "accentError": "#E81123",
      "accentSuccess": "#107C10",
      "accentSelection": "#0078D433",
      "accentLink": "#0066B4"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#008000',
        keyword: '#0000FF',
        function: '#795E26',
        variable: '#001080',
        string: '#A31515',
        number: '#098658',
        constant: '#0000FF',
        storage: '#0000FF',
        type: '#267F99',
        punctuation: '#000000',
        invalid: '#CD3131',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#0000FF',
        h2: '#267F99',
        h3: '#AF00DB',
        h4: '#795E26',
        h5: '#098658',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
