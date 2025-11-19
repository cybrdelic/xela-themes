/**
 * Theme: XELA Void Mist — Diffuse Nebula
 * Type: dark
 * Auto-generated from experimental collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-void-mist',
  name: 'XELA Void Mist — Diffuse Nebula',
  type: 'dark',
  roles: {
      "surface0": "#08090D",
      "surface1": "#0D0F14",
      "surface2": "#13161E",
      "surface3": "#1A1F29",
      "panel": "#0D0F14",
      "overlay": "#08090DE6",
      "backdrop": "#00000099",
      "border": "#202837",
      "focus": "#A47CFFA6",
      "textPrimary": "#E6ECF5",
      "textSecondary": "#CBD5E2",
      "textMuted": "#8292A8",
      "textInverted": "#08090D",
      "accentPrimary": "#A47CFF",
      "accentPrimaryAlt": "#6FB7FF",
      "accentInfo": "#6FB7FF",
      "accentWarn": "#FFC878",
      "accentError": "#FF6F88",
      "accentSuccess": "#4DD6A3",
      "accentSelection": "#A47CFF38",
      "accentLink": "#6FB7FF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#5A6B80',
        keyword: '#A47CFF',
        function: '#6FB7FF',
        variable: '#E6ECF5',
        string: '#4DD6A3',
        number: '#FFC878',
        constant: '#6FB7FF',
        storage: '#FF6F88',
        type: '#A47CFF',
        punctuation: c.textPrimary,
        invalid: '#FF6F88',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#A47CFF',
        h2: '#6FB7FF',
        h3: '#4DD6A3',
        h4: '#FFC878',
        h5: '#FF6F88',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#A47CFF","htmlStructureTag":"#6FB7FF","htmlInlineTag":"#4DD6A3","htmlScriptTag":"#FFC878","htmlAttribute":"#6FB7FF","htmlClassAttribute":"#4DD6A3","htmlIdAttribute":"#A47CFF","htmlStyleAttribute":"#4DD6A3","htmlEventAttribute":"#FFC878","htmlAttributeValue":"#4DD6A3","htmlAttributeValueString":"#6FB7FF","htmlTagBrackets":"#8292A8","htmlPunctuation":"#5A6B80","htmlStringPunctuation":"#8292A8","htmlComment":"#5A6B80","htmlEntity":"#FFC878","htmlEntityPunctuation":"#A47CFF","htmlDoctype":"#FF6F88","embeddedCss":"#4DD6A3","embeddedCssBlock":"#A47CFF","embeddedJs":"#FFC878","embeddedJsBlock":"#6FB7FF","htmlFormTag":"#4DD6A3","htmlFormAttribute":"#6FB7FF","htmlTableTag":"#A47CFF","htmlMediaTag":"#FFC878","htmlLinkTag":"#6FB7FF","htmlHrefAttribute":"#4DD6A3","htmlSemanticTag":"#4DD6A3","htmlText":"#E6ECF5"}
};
