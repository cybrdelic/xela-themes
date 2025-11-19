/**
 * Theme: XELA Arctic Night — Northern Calm
 * Type: dark
 * Auto-generated from artisan collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-arctic-night',
  name: 'XELA Arctic Night — Northern Calm',
  type: 'dark',
  roles: {
      "surface0": "#1E2430",
      "surface1": "#242A38",
      "surface2": "#2B3240",
      "surface3": "#343B4A",
      "panel": "#1E2430",
      "overlay": "#1E2430F2",
      "backdrop": "#00000099",
      "border": "#3D4454",
      "focus": "#7DCFFFB3",
      "textPrimary": "#C8D3E0",
      "textSecondary": "#B4BFD0",
      "textMuted": "#6B7A8F",
      "textInverted": "#1E2430",
      "accentPrimary": "#7DCFFF",
      "accentPrimaryAlt": "#9FDBFF",
      "accentInfo": "#7AA2F7",
      "accentWarn": "#FFC777",
      "accentError": "#FF757F",
      "accentSuccess": "#82E2A2",
      "accentSelection": "#7DCFFF33",
      "accentLink": "#9FDBFF"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#5A6881',
        keyword: '#BB9AF7',
        function: '#7AA2F7',
        variable: '#C8D3E0',
        string: '#C3E88D',
        number: '#FF9E64',
        constant: '#FFC777',
        storage: '#BB9AF7',
        type: '#7DCFFF',
        punctuation: '#B4BFD0',
        invalid: '#FF757F',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#7DCFFF',
        h2: '#BB9AF7',
        h3: '#C3E88D',
        h4: '#FFC777',
        h5: '#7AA2F7',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#D84315","htmlStructureTag":"#BF360C","htmlInlineTag":"#FF5722","htmlScriptTag":"#E91E63","htmlAttribute":"#1976D2","htmlClassAttribute":"#303F9F","htmlIdAttribute":"#0288D1","htmlStyleAttribute":"#7B1FA2","htmlEventAttribute":"#512DA8","htmlAttributeValue":"#2E7D32","htmlAttributeValueString":"#388E3C","htmlTagBrackets":"#616161","htmlPunctuation":"#757575","htmlStringPunctuation":"#424242","htmlComment":"#9E9E9E","htmlEntity":"#F57C00","htmlEntityPunctuation":"#FF9800","htmlDoctype":"#C62828","embeddedCss":"#4A148C","embeddedCssBlock":"#6A1B9A","embeddedJs":"#E65100","embeddedJsBlock":"#F57C00","htmlFormTag":"#1B5E20","htmlFormAttribute":"#2E7D32","htmlTableTag":"#0D47A1","htmlMediaTag":"#E65100","htmlLinkTag":"#01579B","htmlHrefAttribute":"#0277BD","htmlSemanticTag":"#4A148C","htmlText":"#212121"}
};
