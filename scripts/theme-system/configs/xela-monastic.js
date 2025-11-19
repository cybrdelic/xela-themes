/**
 * Theme: XELA Monastic — Near‑Monochrome Focus
 * Type: dark
 * Auto-generated from final collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-monastic',
  name: 'XELA Monastic — Near‑Monochrome Focus',
  type: 'dark',
  roles: {
      "surface0": "#1C1C1C",
      "surface1": "#262626",
      "surface2": "#303030",
      "surface3": "#3A3A3A",
      "panel": "#262626",
      "overlay": "#1C1C1CCC",
      "backdrop": "#00000088",
      "border": "#444444",
      "focus": "#808080AB",
      "textPrimary": "#E8E8E8",
      "textSecondary": "#D0D0D0",
      "textMuted": "#A0A0A0",
      "textInverted": "#1C1C1C",
      "accentPrimary": "#FFFFFF",
      "accentPrimaryAlt": "#E0E0E0",
      "accentInfo": "#C0C0C0",
      "accentWarn": "#B0B0B0",
      "accentError": "#909090",
      "accentSuccess": "#A8A8A8",
      "accentSelection": "#FFFFFF1A",
      "accentLink": "#D0D0D0"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#808080',
        keyword: '#FFFFFF',
        function: '#E0E0E0',
        variable: '#E8E8E8',
        string: '#C0C0C0',
        number: '#B0B0B0',
        constant: '#D0D0D0',
        storage: '#A0A0A0',
        type: '#C8C8C8',
        punctuation: c.textPrimary,
        invalid: '#909090',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FFFFFF',
        h2: '#E0E0E0',
        h3: '#D0D0D0',
        h4: '#C0C0C0',
        h5: '#B0B0B0',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
