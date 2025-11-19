/**
 * Theme: XELA Volcanic Forge — Molten Core
 * Type: dark
 * Auto-generated from ultimate collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-volcanic-forge',
  name: 'XELA Volcanic Forge — Molten Core',
  type: 'dark',
  roles: {
      "surface0": "#1A0B08",
      "surface1": "#2E1610",
      "surface2": "#422118",
      "surface3": "#562C20",
      "panel": "#2E1610",
      "overlay": "#1A0B08E8",
      "backdrop": "#00000099",
      "border": "#6A3728",
      "focus": "#FF6600E6",
      "textPrimary": "#FFF8F0",
      "textSecondary": "#FFE4D0",
      "textMuted": "#D4B8A8",
      "textInverted": "#1A0B08",
      "accentPrimary": "#FF6600",
      "accentPrimaryAlt": "#FF9933",
      "accentInfo": "#FF3366",
      "accentWarn": "#FFCC00",
      "accentError": "#CC0000",
      "accentSuccess": "#66FF33",
      "accentSelection": "#FF660040",
      "accentLink": "#FF9933"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#A87A5A',
        keyword: '#FF6600',
        function: '#FF9933',
        variable: '#FFF8F0',
        string: '#66FF33',
        number: '#FFCC00',
        constant: '#FF3366',
        storage: '#CC0000',
        type: '#FF9933',
        punctuation: c.textPrimary,
        invalid: '#CC0000',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FF6600',
        h2: '#FF9933',
        h3: '#FF3366',
        h4: '#66FF33',
        h5: '#FFCC00',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#FF6600","htmlStructureTag":"#FF9933","htmlInlineTag":"#FF3366","htmlScriptTag":"#FFCC00","htmlAttribute":"#FF9933","htmlClassAttribute":"#66FF33","htmlIdAttribute":"#FF6600","htmlStyleAttribute":"#FF3366","htmlEventAttribute":"#FFCC00","htmlAttributeValue":"#66FF33","htmlAttributeValueString":"#FF9933","htmlTagBrackets":"#D4B8A8","htmlPunctuation":"#A87A5A","htmlStringPunctuation":"#D4B8A8","htmlComment":"#A87A5A","htmlEntity":"#FFCC00","htmlEntityPunctuation":"#FF6600","htmlDoctype":"#CC0000","embeddedCss":"#FF3366","embeddedCssBlock":"#FF6600","embeddedJs":"#FFCC00","embeddedJsBlock":"#FF9933","htmlFormTag":"#66FF33","htmlFormAttribute":"#FF9933","htmlTableTag":"#FF6600","htmlMediaTag":"#FFCC00","htmlLinkTag":"#FF9933","htmlHrefAttribute":"#66FF33","htmlSemanticTag":"#FF3366","htmlText":"#FFF8F0"}
};
