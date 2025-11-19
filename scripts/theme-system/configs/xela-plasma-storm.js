/**
 * Theme: XELA Plasma Storm — Electric Current
 * Type: dark
 * Auto-generated from ultimate collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-plasma-storm',
  name: 'XELA Plasma Storm — Electric Current',
  type: 'dark',
  roles: {
      "surface0": "#0A0A14",
      "surface1": "#141428",
      "surface2": "#1E1E3C",
      "surface3": "#282850",
      "panel": "#141428",
      "overlay": "#0A0A14E8",
      "backdrop": "#00000099",
      "border": "#323264",
      "focus": "#FF1493E6",
      "textPrimary": "#F0F8FF",
      "textSecondary": "#E6F3FF",
      "textMuted": "#B3D9FF",
      "textInverted": "#0A0A14",
      "accentPrimary": "#FF1493",
      "accentPrimaryAlt": "#00BFFF",
      "accentInfo": "#1E90FF",
      "accentWarn": "#FFD700",
      "accentError": "#FF4500",
      "accentSuccess": "#00FF7F",
      "accentSelection": "#FF149340",
      "accentLink": "#00BFFF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#7B68EE',
        keyword: '#FF1493',
        function: '#00BFFF',
        variable: '#F0F8FF',
        string: '#00FF7F',
        number: '#FFD700',
        constant: '#1E90FF',
        storage: '#FF4500',
        type: '#00BFFF',
        punctuation: c.textPrimary,
        invalid: '#FF4500',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FF1493',
        h2: '#00BFFF',
        h3: '#1E90FF',
        h4: '#00FF7F',
        h5: '#FFD700',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#FF1493","htmlStructureTag":"#00BFFF","htmlInlineTag":"#1E90FF","htmlScriptTag":"#FFD700","htmlAttribute":"#00BFFF","htmlClassAttribute":"#00FF7F","htmlIdAttribute":"#FF1493","htmlStyleAttribute":"#1E90FF","htmlEventAttribute":"#FFD700","htmlAttributeValue":"#00FF7F","htmlAttributeValueString":"#00BFFF","htmlTagBrackets":"#B3D9FF","htmlPunctuation":"#7B68EE","htmlStringPunctuation":"#B3D9FF","htmlComment":"#7B68EE","htmlEntity":"#FFD700","htmlEntityPunctuation":"#FF1493","htmlDoctype":"#FF4500","embeddedCss":"#1E90FF","embeddedCssBlock":"#FF1493","embeddedJs":"#FFD700","embeddedJsBlock":"#00BFFF","htmlFormTag":"#00FF7F","htmlFormAttribute":"#00BFFF","htmlTableTag":"#FF1493","htmlMediaTag":"#FFD700","htmlLinkTag":"#00BFFF","htmlHrefAttribute":"#00FF7F","htmlSemanticTag":"#1E90FF","htmlText":"#F0F8FF"}
};
