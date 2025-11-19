/**
 * Theme: XELA Slate Modern — Contemporary Grey
 * Type: dark
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-slate-modern',
  name: 'XELA Slate Modern — Contemporary Grey',
  type: 'dark',
  roles: {
      "surface0": "#0F1419",
      "surface1": "#1A1F29",
      "surface2": "#232834",
      "surface3": "#2D323E",
      "panel": "#0F1419",
      "overlay": "#0F1419F2",
      "backdrop": "#00000099",
      "border": "#2D323E",
      "focus": "#39BAE6B3",
      "textPrimary": "#BFBDB6",
      "textSecondary": "#B3B1AD",
      "textMuted": "#5C6773",
      "textInverted": "#0F1419",
      "accentPrimary": "#39BAE6",
      "accentPrimaryAlt": "#59C2FF",
      "accentInfo": "#36A3D9",
      "accentWarn": "#FFB454",
      "accentError": "#F07178",
      "accentSuccess": "#86B300",
      "accentSelection": "#39BAE638",
      "accentLink": "#59C2FF"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#5C6773',
        keyword: '#FF8F40',
        function: '#FFB454',
        variable: '#BFBDB6',
        string: '#AAD94C',
        number: '#FFB454',
        constant: '#FF8F40',
        storage: '#FF7733',
        type: '#39BAE6',
        punctuation: '#BFBDB6',
        invalid: '#F07178',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FFB454',
        h2: '#39BAE6',
        h3: '#AAD94C',
        h4: '#FF8F40',
        h5: '#59C2FF',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
