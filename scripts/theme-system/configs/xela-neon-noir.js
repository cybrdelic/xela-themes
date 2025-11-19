/**
 * Theme: XELA Neon Noir — Cyber Noir
 * Type: dark
 * Auto-generated from final collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-neon-noir',
  name: 'XELA Neon Noir — Cyber Noir',
  type: 'dark',
  roles: {
      "surface0": "#0D0D0D",
      "surface1": "#1A1A1A",
      "surface2": "#262626",
      "surface3": "#333333",
      "panel": "#1A1A1A",
      "overlay": "#0D0D0DCC",
      "backdrop": "#00000088",
      "border": "#333333",
      "focus": "#00FFFFAB",
      "textPrimary": "#F0F0F0",
      "textSecondary": "#E0E0E0",
      "textMuted": "#B0B0B0",
      "textInverted": "#0D0D0D",
      "accentPrimary": "#00FFFF",
      "accentPrimaryAlt": "#FF00FF",
      "accentInfo": "#00FF00",
      "accentWarn": "#FFFF00",
      "accentError": "#FF0080",
      "accentSuccess": "#80FF00",
      "accentSelection": "#00FFFF33",
      "accentLink": "#FF00FF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#808080',
        keyword: '#FF00FF',
        function: '#00FFFF',
        variable: '#F0F0F0',
        string: '#80FF00',
        number: '#FFFF00',
        constant: '#00FF00',
        storage: '#FF0080',
        type: '#00FFFF',
        punctuation: c.textPrimary,
        invalid: '#FF0080',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#00FFFF',
        h2: '#FF00FF',
        h3: '#00FF00',
        h4: '#FFFF00',
        h5: '#80FF00',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
