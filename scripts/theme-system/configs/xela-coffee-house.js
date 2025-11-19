/**
 * Theme: XELA Coffee House — Rich Espresso
 * Type: dark
 * Auto-generated from artisan collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-coffee-house',
  name: 'XELA Coffee House — Rich Espresso',
  type: 'dark',
  roles: {
      "surface0": "#261F1C",
      "surface1": "#2E2622",
      "surface2": "#382F2A",
      "surface3": "#423833",
      "panel": "#261F1C",
      "overlay": "#261F1CF2",
      "backdrop": "#00000099",
      "border": "#4D433D",
      "focus": "#D4A574B3",
      "textPrimary": "#E5D7C8",
      "textSecondary": "#D1C3B4",
      "textMuted": "#9A8A7C",
      "textInverted": "#261F1C",
      "accentPrimary": "#D4A574",
      "accentPrimaryAlt": "#E8BF92",
      "accentInfo": "#8AB5D1",
      "accentWarn": "#E8C08A",
      "accentError": "#D88A7C",
      "accentSuccess": "#A0C088",
      "accentSelection": "#D4A57438",
      "accentLink": "#A0C8D1"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#7C6D60',
        keyword: '#E8BF92',
        function: '#8AB5D1',
        variable: '#E5D7C8',
        string: '#A0C088',
        number: '#E8C08A',
        constant: '#C8A8B8',
        storage: '#E8BF92',
        type: '#8AB5D1',
        punctuation: '#D1C3B4',
        invalid: '#D88A7C',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#E8BF92',
        h2: '#8AB5D1',
        h3: '#A0C088',
        h4: '#E8C08A',
        h5: '#C8A8B8',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
