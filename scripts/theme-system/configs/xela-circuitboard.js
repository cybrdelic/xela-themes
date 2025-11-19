/**
 * Theme: XELA Circuitboard — Soldermask Green
 * Type: dark
 * Auto-generated from final collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-circuitboard',
  name: 'XELA Circuitboard — Soldermask Green',
  type: 'dark',
  roles: {
      "surface0": "#0A1A0A",
      "surface1": "#0F2F0F",
      "surface2": "#144414",
      "surface3": "#1A5A1A",
      "panel": "#0F2F0F",
      "overlay": "#0A1A0ACC",
      "backdrop": "#00000088",
      "border": "#1A5A1A",
      "focus": "#00FF00AB",
      "textPrimary": "#E0FFE0",
      "textSecondary": "#CCFFCC",
      "textMuted": "#99FF99",
      "textInverted": "#0A1A0A",
      "accentPrimary": "#00FF00",
      "accentPrimaryAlt": "#33FF33",
      "accentInfo": "#66FF66",
      "accentWarn": "#FFFF00",
      "accentError": "#FF6600",
      "accentSuccess": "#00FF00",
      "accentSelection": "#00FF0033",
      "accentLink": "#33FF33"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#66AA66',
        keyword: '#00FF00',
        function: '#66FF66',
        variable: '#E0FFE0',
        string: '#00FF00',
        number: '#FFFF00',
        constant: '#33FF33',
        storage: '#FF6600',
        type: '#66FF66',
        punctuation: c.textPrimary,
        invalid: '#FF6600',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#00FF00',
        h2: '#33FF33',
        h3: '#66FF66',
        h4: '#99FF99',
        h5: '#CCFFCC',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
