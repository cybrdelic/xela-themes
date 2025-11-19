/**
 * Theme: XELA Aurora Borealis — Northern Lights
 * Type: dark
 * Auto-generated from elite collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-aurora-borealis',
  name: 'XELA Aurora Borealis — Northern Lights',
  type: 'dark',
  roles: {
      "surface0": "#0F1419",
      "surface1": "#1A2332",
      "surface2": "#25324B",
      "surface3": "#304164",
      "panel": "#1A2332",
      "overlay": "#0F1419E6",
      "backdrop": "#00000099",
      "border": "#3B507D",
      "focus": "#00FF7FCC",
      "textPrimary": "#F0FFFF",
      "textSecondary": "#E0F6FF",
      "textMuted": "#B0D4F1",
      "textInverted": "#0F1419",
      "accentPrimary": "#00FF7F",
      "accentPrimaryAlt": "#20B2AA",
      "accentInfo": "#87CEFA",
      "accentWarn": "#FFB6C1",
      "accentError": "#FF69B4",
      "accentSuccess": "#98FB98",
      "accentSelection": "#00FF7F40",
      "accentLink": "#87CEFA"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#778899',
        keyword: '#00FF7F',
        function: '#87CEFA',
        variable: '#F0FFFF',
        string: '#98FB98',
        number: '#FFB6C1',
        constant: '#20B2AA',
        storage: '#FF69B4',
        type: '#87CEFA',
        punctuation: c.textPrimary,
        invalid: '#FF69B4',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#00FF7F',
        h2: '#87CEFA',
        h3: '#20B2AA',
        h4: '#98FB98',
        h5: '#FFB6C1',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#00FF7F","htmlStructureTag":"#87CEFA","htmlInlineTag":"#20B2AA","htmlScriptTag":"#FFB6C1","htmlAttribute":"#87CEFA","htmlClassAttribute":"#98FB98","htmlIdAttribute":"#00FF7F","htmlStyleAttribute":"#20B2AA","htmlEventAttribute":"#FFB6C1","htmlAttributeValue":"#98FB98","htmlAttributeValueString":"#87CEFA","htmlTagBrackets":"#B0D4F1","htmlPunctuation":"#778899","htmlStringPunctuation":"#B0D4F1","htmlComment":"#778899","htmlEntity":"#FFB6C1","htmlEntityPunctuation":"#00FF7F","htmlDoctype":"#FF69B4","embeddedCss":"#20B2AA","embeddedCssBlock":"#00FF7F","embeddedJs":"#FFB6C1","embeddedJsBlock":"#87CEFA","htmlFormTag":"#98FB98","htmlFormAttribute":"#87CEFA","htmlTableTag":"#00FF7F","htmlMediaTag":"#FFB6C1","htmlLinkTag":"#87CEFA","htmlHrefAttribute":"#98FB98","htmlSemanticTag":"#20B2AA","htmlText":"#F0FFFF"}
};
