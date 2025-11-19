/**
 * Theme: XELA Forest Floor — Earthy Greens
 * Type: dark
 * Auto-generated from dynamic collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-forest-floor',
  name: 'XELA Forest Floor — Earthy Greens',
  type: 'dark',
  roles: {
      "surface0": "#1C2320",
      "surface1": "#151A17",
      "surface2": "#242D28",
      "surface3": "#2D3832",
      "panel": "#0F1311",
      "overlay": "#1C2320F2",
      "backdrop": "#00000099",
      "border": "#2D3832",
      "focus": "#7FB069B3",
      "textPrimary": "#D9E4DB",
      "textSecondary": "#BFD1C2",
      "textMuted": "#7D9080",
      "textInverted": "#1C2320",
      "accentPrimary": "#7FB069",
      "accentPrimaryAlt": "#97C87F",
      "accentInfo": "#6ABFB8",
      "accentWarn": "#D9B881",
      "accentError": "#C97777",
      "accentSuccess": "#8FBF7A",
      "accentSelection": "#7FB06938",
      "accentLink": "#6ABFB8"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#5E7862',
        keyword: '#97C87F',
        function: '#6ABFB8',
        variable: '#BFD1C2',
        string: '#8FBF7A',
        number: '#D9B881',
        constant: '#97C87F',
        storage: '#7FB069',
        type: '#6ABFB8',
        punctuation: '#D9E4DB',
        invalid: '#C97777',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#97C87F',
        h2: '#6ABFB8',
        h3: '#8FBF7A',
        h4: '#D9B881',
        h5: '#7FB069',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
