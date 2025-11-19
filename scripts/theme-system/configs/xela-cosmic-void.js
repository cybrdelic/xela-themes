/**
 * Theme: XELA Cosmic Void — Event Horizon
 * Type: dark
 * Auto-generated from elite collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-cosmic-void',
  name: 'XELA Cosmic Void — Event Horizon',
  type: 'dark',
  roles: {
      "surface0": "#000000",
      "surface1": "#030308",
      "surface2": "#060610",
      "surface3": "#0A0A18",
      "panel": "#030308",
      "overlay": "#000000F5",
      "backdrop": "#00000099",
      "border": "#0F0F20",
      "focus": "#9400D3E6",
      "textPrimary": "#E6E6FA",
      "textSecondary": "#D8BFD8",
      "textMuted": "#9370DB",
      "textInverted": "#000000",
      "accentPrimary": "#9400D3",
      "accentPrimaryAlt": "#8B00FF",
      "accentInfo": "#4B0082",
      "accentWarn": "#FF4500",
      "accentError": "#B22222",
      "accentSuccess": "#32CD32",
      "accentSelection": "#9400D359",
      "accentLink": "#4B0082"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#6A5ACD',
        keyword: '#9400D3',
        function: '#4B0082',
        variable: '#E6E6FA',
        string: '#32CD32',
        number: '#FF4500',
        constant: '#8B00FF',
        storage: '#B22222',
        type: '#4B0082',
        punctuation: c.textPrimary,
        invalid: '#B22222',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#9400D3',
        h2: '#4B0082',
        h3: '#8B00FF',
        h4: '#32CD32',
        h5: '#FF4500',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#9400D3","htmlStructureTag":"#4B0082","htmlInlineTag":"#8B00FF","htmlScriptTag":"#FF4500","htmlAttribute":"#4B0082","htmlClassAttribute":"#32CD32","htmlIdAttribute":"#9400D3","htmlStyleAttribute":"#8B00FF","htmlEventAttribute":"#FF4500","htmlAttributeValue":"#32CD32","htmlAttributeValueString":"#4B0082","htmlTagBrackets":"#9370DB","htmlPunctuation":"#6A5ACD","htmlStringPunctuation":"#9370DB","htmlComment":"#6A5ACD","htmlEntity":"#FF4500","htmlEntityPunctuation":"#9400D3","htmlDoctype":"#B22222","embeddedCss":"#8B00FF","embeddedCssBlock":"#9400D3","embeddedJs":"#FF4500","embeddedJsBlock":"#4B0082","htmlFormTag":"#32CD32","htmlFormAttribute":"#4B0082","htmlTableTag":"#9400D3","htmlMediaTag":"#FF4500","htmlLinkTag":"#4B0082","htmlHrefAttribute":"#32CD32","htmlSemanticTag":"#8B00FF","htmlText":"#E6E6FA"}
};
