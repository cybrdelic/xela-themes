/**
 * Theme: XELA Graphite Pro — Precision Grey
 * Type: dark
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-graphite-pro',
  name: 'XELA Graphite Pro — Precision Grey',
  type: 'dark',
  roles: {
      "surface0": "#1E1E1E",
      "surface1": "#252525",
      "surface2": "#2D2D2D",
      "surface3": "#363636",
      "panel": "#1E1E1E",
      "overlay": "#1E1E1EF2",
      "backdrop": "#00000099",
      "border": "#3E3E3E",
      "focus": "#569CD6B3",
      "textPrimary": "#D4D4D4",
      "textSecondary": "#CCCCCC",
      "textMuted": "#858585",
      "textInverted": "#1E1E1E",
      "accentPrimary": "#569CD6",
      "accentPrimaryAlt": "#6DB3F2",
      "accentInfo": "#4FC1FF",
      "accentWarn": "#D7BA7D",
      "accentError": "#F48771",
      "accentSuccess": "#4EC9B0",
      "accentSelection": "#569CD640",
      "accentLink": "#4FC1FF"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#6A9955',
        keyword: '#569CD6',
        function: '#DCDCAA',
        variable: '#9CDCFE',
        string: '#CE9178',
        number: '#B5CEA8',
        constant: '#4FC1FF',
        storage: '#569CD6',
        type: '#4EC9B0',
        punctuation: '#D4D4D4',
        invalid: '#F48771',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#DCDCAA',
        h2: '#9CDCFE',
        h3: '#4EC9B0',
        h4: '#CE9178',
        h5: '#B5CEA8',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#D84315","htmlStructureTag":"#BF360C","htmlInlineTag":"#FF5722","htmlScriptTag":"#E91E63","htmlAttribute":"#1976D2","htmlClassAttribute":"#303F9F","htmlIdAttribute":"#0288D1","htmlStyleAttribute":"#7B1FA2","htmlEventAttribute":"#512DA8","htmlAttributeValue":"#2E7D32","htmlAttributeValueString":"#388E3C","htmlTagBrackets":"#616161","htmlPunctuation":"#757575","htmlStringPunctuation":"#424242","htmlComment":"#9E9E9E","htmlEntity":"#F57C00","htmlEntityPunctuation":"#FF9800","htmlDoctype":"#C62828","embeddedCss":"#4A148C","embeddedCssBlock":"#6A1B9A","embeddedJs":"#E65100","embeddedJsBlock":"#F57C00","htmlFormTag":"#1B5E20","htmlFormAttribute":"#2E7D32","htmlTableTag":"#0D47A1","htmlMediaTag":"#E65100","htmlLinkTag":"#01579B","htmlHrefAttribute":"#0277BD","htmlSemanticTag":"#4A148C","htmlText":"#212121"}
};
