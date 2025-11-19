/**
 * Theme: XELA Cyberpunk 2077 — Night City
 * Type: dark
 * Auto-generated from elite collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-cyberpunk-2077',
  name: 'XELA Cyberpunk 2077 — Night City',
  type: 'dark',
  roles: {
      "surface0": "#000B1E",
      "surface1": "#0A1A3A",
      "surface2": "#142856",
      "surface3": "#1E3672",
      "panel": "#0A1A3A",
      "overlay": "#000B1EE6",
      "backdrop": "#00000099",
      "border": "#28448E",
      "focus": "#FCEE09E6",
      "textPrimary": "#00F5FF",
      "textSecondary": "#87CEEB",
      "textMuted": "#4682B4",
      "textInverted": "#000B1E",
      "accentPrimary": "#FCEE09",
      "accentPrimaryAlt": "#FF2A6D",
      "accentInfo": "#00F5FF",
      "accentWarn": "#FF6B35",
      "accentError": "#FF073A",
      "accentSuccess": "#39FF14",
      "accentSelection": "#FCEE0940",
      "accentLink": "#FF2A6D"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#1E90FF',
        keyword: '#FCEE09',
        function: '#FF2A6D',
        variable: '#00F5FF',
        string: '#39FF14',
        number: '#FF6B35',
        constant: '#00F5FF',
        storage: '#FF073A',
        type: '#FF2A6D',
        punctuation: c.textPrimary,
        invalid: '#FF073A',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FCEE09',
        h2: '#FF2A6D',
        h3: '#00F5FF',
        h4: '#39FF14',
        h5: '#FF6B35',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#FCEE09","htmlStructureTag":"#FF2A6D","htmlInlineTag":"#00F5FF","htmlScriptTag":"#FF6B35","htmlAttribute":"#FF2A6D","htmlClassAttribute":"#39FF14","htmlIdAttribute":"#FCEE09","htmlStyleAttribute":"#00F5FF","htmlEventAttribute":"#FF6B35","htmlAttributeValue":"#39FF14","htmlAttributeValueString":"#FF2A6D","htmlTagBrackets":"#4682B4","htmlPunctuation":"#1E90FF","htmlStringPunctuation":"#4682B4","htmlComment":"#1E90FF","htmlEntity":"#FF6B35","htmlEntityPunctuation":"#FCEE09","htmlDoctype":"#FF073A","embeddedCss":"#00F5FF","embeddedCssBlock":"#FCEE09","embeddedJs":"#FF6B35","embeddedJsBlock":"#FF2A6D","htmlFormTag":"#39FF14","htmlFormAttribute":"#FF2A6D","htmlTableTag":"#FCEE09","htmlMediaTag":"#FF6B35","htmlLinkTag":"#FF2A6D","htmlHrefAttribute":"#39FF14","htmlSemanticTag":"#00F5FF","htmlText":"#00F5FF"}
};
