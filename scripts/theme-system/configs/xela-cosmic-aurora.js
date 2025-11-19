/**
 * Theme: XELA Cosmic Aurora — Stellar Dance
 * Type: dark
 * Auto-generated from ultimate collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-cosmic-aurora',
  name: 'XELA Cosmic Aurora — Stellar Dance',
  type: 'dark',
  roles: {
      "surface0": "#0B0D1A",
      "surface1": "#161B2E",
      "surface2": "#212742",
      "surface3": "#2C3356",
      "panel": "#161B2E",
      "overlay": "#0B0D1AE8",
      "backdrop": "#00000099",
      "border": "#373F6A",
      "focus": "#B147FFE6",
      "textPrimary": "#F8FAFF",
      "textSecondary": "#D6E4FF",
      "textMuted": "#A8B8D4",
      "textInverted": "#0B0D1A",
      "accentPrimary": "#B147FF",
      "accentPrimaryAlt": "#47B7FF",
      "accentInfo": "#47FFB7",
      "accentWarn": "#FFB747",
      "accentError": "#FF4747",
      "accentSuccess": "#47FF7B",
      "accentSelection": "#B147FF40",
      "accentLink": "#47B7FF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#7A82A8',
        keyword: '#B147FF',
        function: '#47B7FF',
        variable: '#F8FAFF',
        string: '#47FF7B',
        number: '#FFB747',
        constant: '#FF7BB1',
        storage: '#FF4747',
        type: '#47FFB7',
        punctuation: c.textPrimary,
        invalid: '#FF4747',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#B147FF',
        h2: '#47B7FF',
        h3: '#47FFB7',
        h4: '#47FF7B',
        h5: '#FFB747',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#B147FF","htmlStructureTag":"#47B7FF","htmlInlineTag":"#47FFB7","htmlScriptTag":"#FFB747","htmlAttribute":"#47B7FF","htmlClassAttribute":"#47FF7B","htmlIdAttribute":"#B147FF","htmlStyleAttribute":"#47FFB7","htmlEventAttribute":"#FFB747","htmlAttributeValue":"#47FF7B","htmlAttributeValueString":"#47B7FF","htmlTagBrackets":"#A8B8D4","htmlPunctuation":"#7A82A8","htmlStringPunctuation":"#A8B8D4","htmlComment":"#7A82A8","htmlEntity":"#FFB747","htmlEntityPunctuation":"#B147FF","htmlDoctype":"#FF4747","embeddedCss":"#47FFB7","embeddedCssBlock":"#B147FF","embeddedJs":"#FFB747","embeddedJsBlock":"#47B7FF","htmlFormTag":"#47FF7B","htmlFormAttribute":"#47B7FF","htmlTableTag":"#B147FF","htmlMediaTag":"#FFB747","htmlLinkTag":"#47B7FF","htmlHrefAttribute":"#47FF7B","htmlSemanticTag":"#47FFB7","htmlText":"#F8FAFF"}
};
