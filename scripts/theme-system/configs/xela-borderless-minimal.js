/**
 * Theme: XELA Borderless Minimal — Chrome-less Focus
 * Type: dark
 * Auto-generated from experimental collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-borderless-minimal',
  name: 'XELA Borderless Minimal — Chrome-less Focus',
  type: 'dark',
  roles: {
      "surface0": "#0E1012",
      "surface1": "#101214",
      "surface2": "#121518",
      "surface3": "#14181B",
      "panel": "#101214",
      "overlay": "#0E1012E6",
      "backdrop": "#00000099",
      "border": "transparent",
      "focus": "#3D9EFF8C",
      "textPrimary": "#DDE2E6",
      "textSecondary": "#B7C0C7",
      "textMuted": "#6F7A82",
      "textInverted": "#0E1012",
      "accentPrimary": "#3D9EFF",
      "accentPrimaryAlt": "#5ABEFF",
      "accentInfo": "#5ABEFF",
      "accentWarn": "#FFB347",
      "accentError": "#FF5A6B",
      "accentSuccess": "#37D99E",
      "accentSelection": "#3D9EFF2E",
      "accentLink": "#5ABEFF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#546069',
        keyword: '#3D9EFF',
        function: '#5ABEFF',
        variable: '#DDE2E6',
        string: '#37D99E',
        number: '#FFB347',
        constant: '#5ABEFF',
        storage: '#FF5A6B',
        type: '#5ABEFF',
        punctuation: c.textPrimary,
        invalid: '#FF5A6B',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#3D9EFF',
        h2: '#5ABEFF',
        h3: '#37D99E',
        h4: '#FFB347',
        h5: '#FF5A6B',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#3D9EFF","htmlStructureTag":"#5ABEFF","htmlInlineTag":"#37D99E","htmlScriptTag":"#FFB347","htmlAttribute":"#5ABEFF","htmlClassAttribute":"#37D99E","htmlIdAttribute":"#3D9EFF","htmlStyleAttribute":"#37D99E","htmlEventAttribute":"#FFB347","htmlAttributeValue":"#37D99E","htmlAttributeValueString":"#5ABEFF","htmlTagBrackets":"#6F7A82","htmlPunctuation":"#546069","htmlStringPunctuation":"#6F7A82","htmlComment":"#546069","htmlEntity":"#FFB347","htmlEntityPunctuation":"#3D9EFF","htmlDoctype":"#FF5A6B","embeddedCss":"#37D99E","embeddedCssBlock":"#3D9EFF","embeddedJs":"#FFB347","embeddedJsBlock":"#5ABEFF","htmlFormTag":"#37D99E","htmlFormAttribute":"#5ABEFF","htmlTableTag":"#3D9EFF","htmlMediaTag":"#FFB347","htmlLinkTag":"#5ABEFF","htmlHrefAttribute":"#37D99E","htmlSemanticTag":"#37D99E","htmlText":"#DDE2E6"}
};
