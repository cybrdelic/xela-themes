/**
 * Theme: XELA Retrowave Synthesis — Neon Dreams
 * Type: dark
 * Auto-generated from ultimate collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-retrowave-synthesis',
  name: 'XELA Retrowave Synthesis — Neon Dreams',
  type: 'dark',
  roles: {
      "surface0": "#0D0D1B",
      "surface1": "#1A1A33",
      "surface2": "#26264B",
      "surface3": "#333363",
      "panel": "#1A1A33",
      "overlay": "#0D0D1BE8",
      "backdrop": "#00000099",
      "border": "#40407B",
      "focus": "#FF006EE6",
      "textPrimary": "#FFFDFD",
      "textSecondary": "#F0EEFF",
      "textMuted": "#B8A6D9",
      "textInverted": "#0D0D1B",
      "accentPrimary": "#FF006E",
      "accentPrimaryAlt": "#FB5607",
      "accentInfo": "#8338EC",
      "accentWarn": "#FFBE0B",
      "accentError": "#FF4081",
      "accentSuccess": "#00F5FF",
      "accentSelection": "#FF006E40",
      "accentLink": "#8338EC"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#8B6CB7',
        keyword: '#FF006E',
        function: '#8338EC',
        variable: '#FFFDFD',
        string: '#00F5FF',
        number: '#FFBE0B',
        constant: '#FB5607',
        storage: '#FF4081',
        type: '#8338EC',
        punctuation: c.textPrimary,
        invalid: '#FF4081',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FF006E',
        h2: '#8338EC',
        h3: '#FB5607',
        h4: '#00F5FF',
        h5: '#FFBE0B',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#FF006E","htmlStructureTag":"#8338EC","htmlInlineTag":"#FB5607","htmlScriptTag":"#FFBE0B","htmlAttribute":"#8338EC","htmlClassAttribute":"#00F5FF","htmlIdAttribute":"#FF006E","htmlStyleAttribute":"#FB5607","htmlEventAttribute":"#FFBE0B","htmlAttributeValue":"#00F5FF","htmlAttributeValueString":"#8338EC","htmlTagBrackets":"#B8A6D9","htmlPunctuation":"#8B6CB7","htmlStringPunctuation":"#B8A6D9","htmlComment":"#8B6CB7","htmlEntity":"#FFBE0B","htmlEntityPunctuation":"#FF006E","htmlDoctype":"#FF4081","embeddedCss":"#FB5607","embeddedCssBlock":"#FF006E","embeddedJs":"#FFBE0B","embeddedJsBlock":"#8338EC","htmlFormTag":"#00F5FF","htmlFormAttribute":"#8338EC","htmlTableTag":"#FF006E","htmlMediaTag":"#FFBE0B","htmlLinkTag":"#8338EC","htmlHrefAttribute":"#00F5FF","htmlSemanticTag":"#FB5607","htmlText":"#FFFDFD"}
};
