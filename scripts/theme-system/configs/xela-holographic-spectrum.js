/**
 * Theme: XELA Holographic Spectrum — Rainbow Prism
 * Type: dark
 * Auto-generated from ultimate collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-holographic-spectrum',
  name: 'XELA Holographic Spectrum — Rainbow Prism',
  type: 'dark',
  roles: {
      "surface0": "#0A0A0F",
      "surface1": "#15151F",
      "surface2": "#20202F",
      "surface3": "#2B2B3F",
      "panel": "#15151F",
      "overlay": "#0A0A0FE8",
      "backdrop": "#00000099",
      "border": "#36364F",
      "focus": "#FF00FFE6",
      "textPrimary": "#FFFFFF",
      "textSecondary": "#E0E0E0",
      "textMuted": "#B0B0B0",
      "textInverted": "#0A0A0F",
      "accentPrimary": "#FF00FF",
      "accentPrimaryAlt": "#00FFFF",
      "accentInfo": "#0080FF",
      "accentWarn": "#FFB000",
      "accentError": "#FF4040",
      "accentSuccess": "#00FF80",
      "accentSelection": "#FF00FF40",
      "accentLink": "#00FFFF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#9090A0',
        keyword: '#FF0080',
        function: '#0080FF',
        variable: '#FFFFFF',
        string: '#00FF80',
        number: '#FFB000',
        constant: '#FF00FF',
        storage: '#FF4040',
        type: '#00FFFF',
        punctuation: '#C0C0C0',
        invalid: '#FF4040',
        code: c.textPrimary,
        heading: '#FF00FF',
        h1: '#FF0080',
        h2: '#0080FF',
        h3: '#00FF80',
        h4: '#FFB000',
        h5: '#FF00FF',
        h6: '#00FFFF',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#FF0080","htmlStructureTag":"#0080FF","htmlInlineTag":"#00FF80","htmlScriptTag":"#FFB000","htmlAttribute":"#00FFFF","htmlClassAttribute":"#00FF80","htmlIdAttribute":"#FF00FF","htmlStyleAttribute":"#FF0080","htmlEventAttribute":"#FFB000","htmlAttributeValue":"#00FF80","htmlAttributeValueString":"#00FFFF","htmlTagBrackets":"#B0B0B0","htmlPunctuation":"#9090A0","htmlStringPunctuation":"#B0B0B0","htmlComment":"#9090A0","htmlEntity":"#FFB000","htmlEntityPunctuation":"#FF0080","htmlDoctype":"#FF4040","embeddedCss":"#FF0080","embeddedCssBlock":"#0080FF","embeddedJs":"#FFB000","embeddedJsBlock":"#00FFFF","htmlFormTag":"#00FF80","htmlFormAttribute":"#00FFFF","htmlTableTag":"#0080FF","htmlMediaTag":"#FFB000","htmlLinkTag":"#FF00FF","htmlHrefAttribute":"#00FFFF","htmlSemanticTag":"#FF0080","htmlText":"#FFFFFF"}
};
