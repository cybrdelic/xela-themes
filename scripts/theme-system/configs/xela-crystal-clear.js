/**
 * Theme: XELA Crystal Clear — Pure Transparency
 * Type: light
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-crystal-clear',
  name: 'XELA Crystal Clear — Pure Transparency',
  type: 'light',
  roles: {
      "surface0": "#FCFCFC",
      "surface1": "#F7F7F7",
      "surface2": "#F0F0F0",
      "surface3": "#E9E9E9",
      "panel": "#FEFEFE",
      "overlay": "#FCFCFCF2",
      "backdrop": "#FCFCFC99",
      "border": "#DADADA",
      "focus": "#0969DAB3",
      "textPrimary": "#1F2328",
      "textSecondary": "#59636E",
      "textMuted": "#8C959F",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#0969DA",
      "accentPrimaryAlt": "#0550AE",
      "accentInfo": "#0969DA",
      "accentWarn": "#9A6700",
      "accentError": "#D1242F",
      "accentSuccess": "#1A7F37",
      "accentSelection": "#0969DA26",
      "accentLink": "#0969DA"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#57606A',
        keyword: '#CF222E',
        function: '#8250DF',
        variable: '#0550AE',
        string: '#0A3069',
        number: '#0550AE',
        constant: '#0550AE',
        storage: '#CF222E',
        type: '#8250DF',
        punctuation: '#1F2328',
        invalid: '#D1242F',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#0550AE',
        h2: '#8250DF',
        h3: '#1A7F37',
        h4: '#9A6700',
        h5: '#0969DA',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
