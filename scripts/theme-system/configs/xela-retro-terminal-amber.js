/**
 * Theme: XELA Retro Terminal Amber — Monochrome CRT
 * Type: dark
 * Auto-generated from experimental collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-retro-terminal-amber',
  name: 'XELA Retro Terminal Amber — Monochrome CRT',
  type: 'dark',
  roles: {
      "surface0": "#060400",
      "surface1": "#0A0802",
      "surface2": "#120F05",
      "surface3": "#1A170B",
      "panel": "#0A0802",
      "overlay": "#060400E8",
      "backdrop": "#000000AA",
      "border": "#241E10",
      "focus": "#FFB64899",
      "textPrimary": "#FFE4B5",
      "textSecondary": "#FFD89B",
      "textMuted": "#B89664",
      "textInverted": "#060400",
      "accentPrimary": "#FFB648",
      "accentPrimaryAlt": "#FFC978",
      "accentInfo": "#FF9C2B",
      "accentWarn": "#FFCF66",
      "accentError": "#FF6A3D",
      "accentSuccess": "#FFC978",
      "accentSelection": "#FFB64838",
      "accentLink": "#FFC978"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#8F7349',
        keyword: '#FFB648',
        function: '#FFC978',
        variable: '#FFE4B5',
        string: '#FFC978',
        number: '#FFCF66',
        constant: '#FFD89B',
        storage: '#FFB648',
        type: '#FFC978',
        punctuation: c.textPrimary,
        invalid: '#FF6A3D',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FFB648',
        h2: '#FFC978',
        h3: '#FFD89B',
        h4: '#FFCF66',
        h5: '#FF9C2B',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#FFB648","htmlStructureTag":"#FFC978","htmlInlineTag":"#FFD89B","htmlScriptTag":"#FFCF66","htmlAttribute":"#FFC978","htmlClassAttribute":"#FFC978","htmlIdAttribute":"#FFB648","htmlStyleAttribute":"#FFD89B","htmlEventAttribute":"#FFCF66","htmlAttributeValue":"#FFC978","htmlAttributeValueString":"#FFC978","htmlTagBrackets":"#B89664","htmlPunctuation":"#8F7349","htmlStringPunctuation":"#B89664","htmlComment":"#8F7349","htmlEntity":"#FFCF66","htmlEntityPunctuation":"#FFB648","htmlDoctype":"#FF6A3D","embeddedCss":"#FFD89B","embeddedCssBlock":"#FFB648","embeddedJs":"#FFCF66","embeddedJsBlock":"#FFC978","htmlFormTag":"#FFC978","htmlFormAttribute":"#FFC978","htmlTableTag":"#FFB648","htmlMediaTag":"#FFCF66","htmlLinkTag":"#FFC978","htmlHrefAttribute":"#FFC978","htmlSemanticTag":"#FFD89B","htmlText":"#FFE4B5"}
};
