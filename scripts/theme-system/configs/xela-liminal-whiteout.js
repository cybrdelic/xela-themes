/**
 * Theme: XELA Liminal Whiteout — Overexposed Minimal Field
 * Type: light
 * Auto-generated from experimental collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-liminal-whiteout',
  name: 'XELA Liminal Whiteout — Overexposed Minimal Field',
  type: 'light',
  roles: {
      "surface0": "#FCFCFD",
      "surface1": "#F7F8FA",
      "surface2": "#F2F4F7",
      "surface3": "#ECEFF3",
      "panel": "#FFFFFF",
      "overlay": "#FCFCFDE6",
      "backdrop": "#FFFFFFAA",
      "border": "transparent",
      "focus": "#3366FF73",
      "textPrimary": "#1F242B",
      "textSecondary": "#39424D",
      "textMuted": "#6E7A86",
      "textInverted": "#FCFCFD",
      "accentPrimary": "#3366FF",
      "accentPrimaryAlt": "#5C8DFF",
      "accentInfo": "#2EA8B8",
      "accentWarn": "#FFB347",
      "accentError": "#FF5A5F",
      "accentSuccess": "#2F915C",
      "accentSelection": "#3366FF2B",
      "accentLink": "#3366FF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#8995A2',
        keyword: '#3366FF',
        function: '#2EA8B8',
        variable: c.textPrimary,
        string: '#2F915C',
        number: '#FFB347',
        constant: '#5C8DFF',
        storage: '#FF5A5F',
        type: '#2EA8B8',
        punctuation: c.textPrimary,
        invalid: '#FF5A5F',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#3366FF',
        h2: '#2EA8B8',
        h3: '#2F915C',
        h4: '#5C8DFF',
        h5: '#FFB347',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#3366FF","htmlStructureTag":"#2EA8B8","htmlInlineTag":"#2F915C","htmlScriptTag":"#FFB347","htmlAttribute":"#5C8DFF","htmlClassAttribute":"#2F915C","htmlIdAttribute":"#3366FF","htmlStyleAttribute":"#2EA8B8","htmlEventAttribute":"#FFB347","htmlAttributeValue":"#2F915C","htmlAttributeValueString":"#2EA8B8","htmlTagBrackets":"#6E7A86","htmlPunctuation":"#8995A2","htmlStringPunctuation":"#6E7A86","htmlComment":"#8995A2","htmlEntity":"#FFB347","htmlEntityPunctuation":"#3366FF","htmlDoctype":"#FF5A5F","embeddedCss":"#2EA8B8","embeddedCssBlock":"#3366FF","embeddedJs":"#FFB347","embeddedJsBlock":"#5C8DFF","htmlFormTag":"#2F915C","htmlFormAttribute":"#5C8DFF","htmlTableTag":"#3366FF","htmlMediaTag":"#FFB347","htmlLinkTag":"#5C8DFF","htmlHrefAttribute":"#2F915C","htmlSemanticTag":"#2EA8B8","htmlText":"#1F242B"}
};
