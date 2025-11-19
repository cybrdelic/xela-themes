/**
 * Theme: XELA Solar Ink — Warm Print Light
 * Type: light
 * Auto-generated from experimental collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-solar-ink',
  name: 'XELA Solar Ink — Warm Print Light',
  type: 'light',
  roles: {
      "surface0": "#FDF8F2",
      "surface1": "#F9F3EB",
      "surface2": "#F4EDDF",
      "surface3": "#EEE6D4",
      "panel": "#F9F3EB",
      "overlay": "#FDF8F2E6",
      "backdrop": "#FFFFFFAA",
      "border": "#E4D9C7",
      "focus": "#B258008C",
      "textPrimary": "#2C2A27",
      "textSecondary": "#4A453F",
      "textMuted": "#7A7065",
      "textInverted": "#FDF8F2",
      "accentPrimary": "#B25800",
      "accentPrimaryAlt": "#CB7A1F",
      "accentInfo": "#007A72",
      "accentWarn": "#D48806",
      "accentError": "#B7352E",
      "accentSuccess": "#317344",
      "accentSelection": "#B258002E",
      "accentLink": "#007A72"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#8A7B6B',
        keyword: '#B25800',
        function: '#007A72',
        variable: '#2C2A27',
        string: '#317344',
        number: '#D48806',
        constant: '#CB7A1F',
        storage: '#B7352E',
        type: '#007A72',
        punctuation: c.textPrimary,
        invalid: '#B7352E',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#2C2A27',
        h2: '#B25800',
        h3: '#007A72',
        h4: '#317344',
        h5: '#D48806',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#B25800","htmlStructureTag":"#007A72","htmlInlineTag":"#CB7A1F","htmlScriptTag":"#D48806","htmlAttribute":"#007A72","htmlClassAttribute":"#317344","htmlIdAttribute":"#B25800","htmlStyleAttribute":"#CB7A1F","htmlEventAttribute":"#D48806","htmlAttributeValue":"#317344","htmlAttributeValueString":"#007A72","htmlTagBrackets":"#7A7065","htmlPunctuation":"#8A7B6B","htmlStringPunctuation":"#7A7065","htmlComment":"#8A7B6B","htmlEntity":"#D48806","htmlEntityPunctuation":"#B25800","htmlDoctype":"#B7352E","embeddedCss":"#CB7A1F","embeddedCssBlock":"#B25800","embeddedJs":"#D48806","embeddedJsBlock":"#007A72","htmlFormTag":"#317344","htmlFormAttribute":"#007A72","htmlTableTag":"#B25800","htmlMediaTag":"#D48806","htmlLinkTag":"#007A72","htmlHrefAttribute":"#317344","htmlSemanticTag":"#CB7A1F","htmlText":"#2C2A27"}
};
