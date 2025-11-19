/**
 * Theme: XELA Silver Lining — Refined Neutrality
 * Type: dark
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-silver-lining',
  name: 'XELA Silver Lining — Refined Neutrality',
  type: 'dark',
  roles: {
      "surface0": "#282828",
      "surface1": "#303030",
      "surface2": "#383838",
      "surface3": "#404040",
      "panel": "#282828",
      "overlay": "#282828F2",
      "backdrop": "#00000099",
      "border": "#505050",
      "focus": "#A8A8A8B3",
      "textPrimary": "#E8E8E8",
      "textSecondary": "#D0D0D0",
      "textMuted": "#909090",
      "textInverted": "#202020",
      "accentPrimary": "#A8A8A8",
      "accentPrimaryAlt": "#C0C0C0",
      "accentInfo": "#80B0D0",
      "accentWarn": "#E8C08A",
      "accentError": "#D88888",
      "accentSuccess": "#90C890",
      "accentSelection": "#A8A8A847",
      "accentLink": "#B0C8E0"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#707070',
        keyword: '#B8B8B8',
        function: '#D8D8D8',
        variable: '#C8C8C8',
        string: '#A8C8A8',
        number: '#C8B8A8',
        constant: '#B8C8D8',
        storage: '#B8B8B8',
        type: '#C0D0D0',
        punctuation: '#D0D0D0',
        invalid: '#D88888',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#E8E8E8',
        h2: '#D8D8D8',
        h3: '#C8C8C8',
        h4: '#B8B8B8',
        h5: '#A8A8A8',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
