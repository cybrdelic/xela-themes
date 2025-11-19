/**
 * Theme: XELA Bauhaus — Primary Geometry
 * Type: dark
 * Auto-generated from batch2 collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-bauhaus',
  name: 'XELA Bauhaus — Primary Geometry',
  type: 'dark',
  roles: {
      "surface0": "#1A1A1A",
      "surface1": "#2A2A2A",
      "surface2": "#3A3A3A",
      "surface3": "#4A4A4A",
      "panel": "#2A2A2A",
      "overlay": "#1A1A1ACC",
      "backdrop": "#00000088",
      "border": "#4A4A4A",
      "focus": "#FF0000AB",
      "textPrimary": "#FFFFFF",
      "textSecondary": "#E0E0E0",
      "textMuted": "#B0B0B0",
      "textInverted": "#000000",
      "accentPrimary": "#FF0000",
      "accentPrimaryAlt": "#FFFF00",
      "accentInfo": "#0000FF",
      "accentWarn": "#FFFF00",
      "accentError": "#FF0000",
      "accentSuccess": "#00FF00",
      "accentSelection": "#FF000033",
      "accentLink": "#0000FF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#808080',
        keyword: '#FF0000',
        function: '#0000FF',
        variable: '#FFFFFF',
        string: '#FFFF00',
        number: '#00FF00',
        constant: '#FF0000',
        storage: '#0000FF',
        type: '#FFFF00',
        punctuation: c.textPrimary,
        invalid: '#FF0000',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FF0000',
        h2: '#0000FF',
        h3: '#FFFF00',
        h4: '#00FF00',
        h5: '#FF0000',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
