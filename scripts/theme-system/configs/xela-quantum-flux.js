/**
 * Theme: XELA Quantum Flux — Probability Waves
 * Type: dark
 * Auto-generated from elite collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-quantum-flux',
  name: 'XELA Quantum Flux — Probability Waves',
  type: 'dark',
  roles: {
      "surface0": "#000510",
      "surface1": "#0A0F2A",
      "surface2": "#141A44",
      "surface3": "#1E245E",
      "panel": "#0A0F2A",
      "overlay": "#000510F0",
      "backdrop": "#00000099",
      "border": "#2A3178",
      "focus": "#8A2BE2E6",
      "textPrimary": "#F0F8FF",
      "textSecondary": "#D6E8FF",
      "textMuted": "#9BB8E8",
      "textInverted": "#000510",
      "accentPrimary": "#8A2BE2",
      "accentPrimaryAlt": "#9932CC",
      "accentInfo": "#4169E1",
      "accentWarn": "#FF6347",
      "accentError": "#DC143C",
      "accentSuccess": "#00FA9A",
      "accentSelection": "#8A2BE24D",
      "accentLink": "#4169E1"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#6A5ACD',
        keyword: '#8A2BE2',
        function: '#4169E1',
        variable: '#F0F8FF',
        string: '#00FA9A',
        number: '#FF6347',
        constant: '#9932CC',
        storage: '#DC143C',
        type: '#4169E1',
        punctuation: c.textPrimary,
        invalid: '#DC143C',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#8A2BE2',
        h2: '#4169E1',
        h3: '#9932CC',
        h4: '#00FA9A',
        h5: '#FF6347',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#8A2BE2","htmlStructureTag":"#4169E1","htmlInlineTag":"#9932CC","htmlScriptTag":"#FF6347","htmlAttribute":"#4169E1","htmlClassAttribute":"#00FA9A","htmlIdAttribute":"#8A2BE2","htmlStyleAttribute":"#9932CC","htmlEventAttribute":"#FF6347","htmlAttributeValue":"#00FA9A","htmlAttributeValueString":"#4169E1","htmlTagBrackets":"#9BB8E8","htmlPunctuation":"#6A5ACD","htmlStringPunctuation":"#9BB8E8","htmlComment":"#6A5ACD","htmlEntity":"#FF6347","htmlEntityPunctuation":"#8A2BE2","htmlDoctype":"#DC143C","embeddedCss":"#9932CC","embeddedCssBlock":"#8A2BE2","embeddedJs":"#FF6347","embeddedJsBlock":"#4169E1","htmlFormTag":"#00FA9A","htmlFormAttribute":"#4169E1","htmlTableTag":"#8A2BE2","htmlMediaTag":"#FF6347","htmlLinkTag":"#4169E1","htmlHrefAttribute":"#00FA9A","htmlSemanticTag":"#9932CC","htmlText":"#F0F8FF"}
};
