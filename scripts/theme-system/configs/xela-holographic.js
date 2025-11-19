/**
 * Theme: XELA Holographic — Dimensional Shift
 * Type: dark
 * Auto-generated from elite collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-holographic',
  name: 'XELA Holographic — Dimensional Shift',
  type: 'dark',
  roles: {
      "surface0": "#0D0D1F",
      "surface1": "#1A1A33",
      "surface2": "#272747",
      "surface3": "#34345B",
      "panel": "#1A1A33",
      "overlay": "#0D0D1FE6",
      "backdrop": "#00000099",
      "border": "#41416F",
      "focus": "#FF00D4D9",
      "textPrimary": "#FFFFFF",
      "textSecondary": "#F0F0FF",
      "textMuted": "#C0C0E6",
      "textInverted": "#0D0D1F",
      "accentPrimary": "#FF00D4",
      "accentPrimaryAlt": "#00FFFF",
      "accentInfo": "#00FF80",
      "accentWarn": "#FFFF00",
      "accentError": "#FF4080",
      "accentSuccess": "#80FF00",
      "accentSelection": "#FF00D44D",
      "accentLink": "#00FFFF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#8080B3',
        keyword: '#FF00D4',
        function: '#00FFFF',
        variable: '#FFFFFF',
        string: '#80FF00',
        number: '#FFFF00',
        constant: '#00FF80',
        storage: '#FF4080',
        type: '#00FFFF',
        punctuation: c.textPrimary,
        invalid: '#FF4080',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FF00D4',
        h2: '#00FFFF',
        h3: '#00FF80',
        h4: '#FFFF00',
        h5: '#80FF00',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#FF00D4","htmlStructureTag":"#00FFFF","htmlInlineTag":"#00FF80","htmlScriptTag":"#FFFF00","htmlAttribute":"#00FFFF","htmlClassAttribute":"#80FF00","htmlIdAttribute":"#FF00D4","htmlStyleAttribute":"#00FF80","htmlEventAttribute":"#FFFF00","htmlAttributeValue":"#80FF00","htmlAttributeValueString":"#00FFFF","htmlTagBrackets":"#C0C0E6","htmlPunctuation":"#8080B3","htmlStringPunctuation":"#C0C0E6","htmlComment":"#8080B3","htmlEntity":"#FFFF00","htmlEntityPunctuation":"#FF00D4","htmlDoctype":"#FF4080","embeddedCss":"#00FF80","embeddedCssBlock":"#FF00D4","embeddedJs":"#FFFF00","embeddedJsBlock":"#00FFFF","htmlFormTag":"#80FF00","htmlFormAttribute":"#00FFFF","htmlTableTag":"#FF00D4","htmlMediaTag":"#FFFF00","htmlLinkTag":"#00FFFF","htmlHrefAttribute":"#80FF00","htmlSemanticTag":"#00FF80","htmlText":"#FFFFFF"}
};
