/**
 * Theme: XELA Inkwell Sepia — Vintage Manuscript
 * Type: light
 * Auto-generated from experimental collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-inkwell-sepia',
  name: 'XELA Inkwell Sepia — Vintage Manuscript',
  type: 'light',
  roles: {
      "surface0": "#FBF7F2",
      "surface1": "#F4EEE6",
      "surface2": "#EDE4DA",
      "surface3": "#E4DACE",
      "panel": "#F4EEE6",
      "overlay": "#FBF7F2E6",
      "backdrop": "#FFFFFFBB",
      "border": "#D8CAB9",
      "focus": "#9A5F1E8C",
      "textPrimary": "#2C261F",
      "textSecondary": "#4B4034",
      "textMuted": "#7D6D5B",
      "textInverted": "#FBF7F2",
      "accentPrimary": "#9A5F1E",
      "accentPrimaryAlt": "#B87A36",
      "accentInfo": "#376E78",
      "accentWarn": "#D4943F",
      "accentError": "#B6513B",
      "accentSuccess": "#3F7A49",
      "accentSelection": "#9A5F1E2E",
      "accentLink": "#376E78"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#8C7A67',
        keyword: '#9A5F1E',
        function: '#376E78',
        variable: c.textPrimary,
        string: '#3F7A49',
        number: '#D4943F',
        constant: '#B87A36',
        storage: '#B6513B',
        type: '#376E78',
        punctuation: c.textPrimary,
        invalid: '#B6513B',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#9A5F1E',
        h2: '#376E78',
        h3: '#3F7A49',
        h4: '#B87A36',
        h5: '#D4943F',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#9A5F1E","htmlStructureTag":"#376E78","htmlInlineTag":"#B87A36","htmlScriptTag":"#D4943F","htmlAttribute":"#376E78","htmlClassAttribute":"#3F7A49","htmlIdAttribute":"#9A5F1E","htmlStyleAttribute":"#B87A36","htmlEventAttribute":"#D4943F","htmlAttributeValue":"#3F7A49","htmlAttributeValueString":"#376E78","htmlTagBrackets":"#7D6D5B","htmlPunctuation":"#8C7A67","htmlStringPunctuation":"#7D6D5B","htmlComment":"#8C7A67","htmlEntity":"#D4943F","htmlEntityPunctuation":"#9A5F1E","htmlDoctype":"#B6513B","embeddedCss":"#B87A36","embeddedCssBlock":"#9A5F1E","embeddedJs":"#D4943F","embeddedJsBlock":"#376E78","htmlFormTag":"#3F7A49","htmlFormAttribute":"#376E78","htmlTableTag":"#9A5F1E","htmlMediaTag":"#D4943F","htmlLinkTag":"#376E78","htmlHrefAttribute":"#3F7A49","htmlSemanticTag":"#B87A36","htmlText":"#2C261F"}
};
