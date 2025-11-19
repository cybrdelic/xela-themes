/**
 * Theme: XELA Synthwave Outrun — Neon Highway
 * Type: dark
 * Auto-generated from elite collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-synthwave-outrun',
  name: 'XELA Synthwave Outrun — Neon Highway',
  type: 'dark',
  roles: {
      "surface0": "#1A0A2E",
      "surface1": "#2D1B4E",
      "surface2": "#402C6E",
      "surface3": "#533D8E",
      "panel": "#2D1B4E",
      "overlay": "#1A0A2EE6",
      "backdrop": "#00000099",
      "border": "#664EAE",
      "focus": "#FF0080E6",
      "textPrimary": "#F5F5DC",
      "textSecondary": "#E6E6FA",
      "textMuted": "#D8BFD8",
      "textInverted": "#1A0A2E",
      "accentPrimary": "#FF0080",
      "accentPrimaryAlt": "#00FFFF",
      "accentInfo": "#FF00FF",
      "accentWarn": "#FFFF00",
      "accentError": "#FF1493",
      "accentSuccess": "#00FF00",
      "accentSelection": "#FF00804D",
      "accentLink": "#00FFFF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#8A2BE2',
        keyword: '#FF0080',
        function: '#00FFFF',
        variable: '#F5F5DC',
        string: '#00FF00',
        number: '#FFFF00',
        constant: '#FF00FF',
        storage: '#FF1493',
        type: '#00FFFF',
        punctuation: c.textPrimary,
        invalid: '#FF1493',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FF0080',
        h2: '#00FFFF',
        h3: '#FF00FF',
        h4: '#00FF00',
        h5: '#FFFF00',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#FF0080","htmlStructureTag":"#00FFFF","htmlInlineTag":"#FF00FF","htmlScriptTag":"#FFFF00","htmlAttribute":"#00FFFF","htmlClassAttribute":"#00FF00","htmlIdAttribute":"#FF0080","htmlStyleAttribute":"#FF00FF","htmlEventAttribute":"#FFFF00","htmlAttributeValue":"#00FF00","htmlAttributeValueString":"#00FFFF","htmlTagBrackets":"#D8BFD8","htmlPunctuation":"#8A2BE2","htmlStringPunctuation":"#D8BFD8","htmlComment":"#8A2BE2","htmlEntity":"#FFFF00","htmlEntityPunctuation":"#FF0080","htmlDoctype":"#FF1493","embeddedCss":"#FF00FF","embeddedCssBlock":"#FF0080","embeddedJs":"#FFFF00","embeddedJsBlock":"#00FFFF","htmlFormTag":"#00FF00","htmlFormAttribute":"#00FFFF","htmlTableTag":"#FF0080","htmlMediaTag":"#FFFF00","htmlLinkTag":"#00FFFF","htmlHrefAttribute":"#00FF00","htmlSemanticTag":"#FF00FF","htmlText":"#F5F5DC"}
};
