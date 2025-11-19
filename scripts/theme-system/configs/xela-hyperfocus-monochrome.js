/**
 * Theme: XELA Hyperfocus Monochrome — Cognitive Isolation
 * Type: dark
 * Auto-generated from elite collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-hyperfocus-monochrome',
  name: 'XELA Hyperfocus Monochrome — Cognitive Isolation',
  type: 'dark',
  roles: {
      "surface0": "#0B0C0D",
      "surface1": "#101214",
      "surface2": "#16181B",
      "surface3": "#1F2226",
      "panel": "#101214",
      "overlay": "#0B0C0DD9",
      "backdrop": "#000000AA",
      "border": "#2A2F35",
      "focus": "#FFBF40E6",
      "textPrimary": "#ECEFF1",
      "textSecondary": "#C7CCD1",
      "textMuted": "#89939C",
      "textInverted": "#0B0C0D",
      "accentPrimary": "#FFBF40",
      "accentPrimaryAlt": "#FFC766",
      "accentInfo": "#5AB4FF",
      "accentWarn": "#FF8C37",
      "accentError": "#FF4D61",
      "accentSuccess": "#4DD88E",
      "accentSelection": "#FFBF4026",
      "accentLink": "#5AB4FF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#5A646E',
        keyword: '#FFBF40',
        function: '#ECEFF1',
        variable: '#ECEFF1',
        string: '#D6E2C4',
        number: '#D8CFB6',
        constant: '#FFC766',
        storage: '#FF4D61',
        type: '#C7D7E5',
        punctuation: c.textPrimary,
        invalid: '#FF4D61',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FFBF40',
        h2: '#FFC766',
        h3: '#C7D7E5',
        h4: '#D6E2C4',
        h5: '#D8CFB6',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#FFBF40","htmlStructureTag":"#FFC766","htmlInlineTag":"#C7D7E5","htmlScriptTag":"#FF8C37","htmlAttribute":"#FFC766","htmlClassAttribute":"#C7D7E5","htmlIdAttribute":"#FFBF40","htmlStyleAttribute":"#C7D7E5","htmlEventAttribute":"#FF8C37","htmlAttributeValue":"#D6E2C4","htmlAttributeValueString":"#D6E2C4","htmlTagBrackets":"#89939C","htmlPunctuation":"#5A646E","htmlStringPunctuation":"#89939C","htmlComment":"#5A646E","htmlEntity":"#FF8C37","htmlEntityPunctuation":"#FFBF40","htmlDoctype":"#FF4D61","embeddedCss":"#C7D7E5","embeddedCssBlock":"#FFBF40","embeddedJs":"#FF8C37","embeddedJsBlock":"#FFC766","htmlFormTag":"#D6E2C4","htmlFormAttribute":"#FFC766","htmlTableTag":"#FFBF40","htmlMediaTag":"#FF8C37","htmlLinkTag":"#FFC766","htmlHrefAttribute":"#D6E2C4","htmlSemanticTag":"#C7D7E5","htmlText":"#ECEFF1"}
};
