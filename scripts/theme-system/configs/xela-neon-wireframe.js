/**
 * Theme: XELA Neon Wireframe — Vector Grid
 * Type: dark
 * Auto-generated from experimental collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-neon-wireframe',
  name: 'XELA Neon Wireframe — Vector Grid',
  type: 'dark',
  roles: {
      "surface0": "#01050B",
      "surface1": "#030A14",
      "surface2": "#06101F",
      "surface3": "#0A162B",
      "panel": "#030A14",
      "overlay": "#01050BE8",
      "backdrop": "#00000099",
      "border": "#0F223F",
      "focus": "#00F5FFBF",
      "textPrimary": "#DDF6FF",
      "textSecondary": "#B9EFFF",
      "textMuted": "#6FB3CC",
      "textInverted": "#01050B",
      "accentPrimary": "#00F5FF",
      "accentPrimaryAlt": "#FF2BFF",
      "accentInfo": "#00CFFF",
      "accentWarn": "#FFC300",
      "accentError": "#FF4F6F",
      "accentSuccess": "#37FFB0",
      "accentSelection": "#00F5FF40",
      "accentLink": "#00CFFF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#2F5C66',
        keyword: '#FF2BFF',
        function: '#00F5FF',
        variable: '#DDF6FF',
        string: '#37FFB0',
        number: '#FFC300',
        constant: '#00CFFF',
        storage: '#FF2BFF',
        type: '#00F5FF',
        punctuation: c.textPrimary,
        invalid: '#FF4F6F',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#00F5FF',
        h2: '#FF2BFF',
        h3: '#00CFFF',
        h4: '#37FFB0',
        h5: '#FFC300',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#00F5FF","htmlStructureTag":"#FF2BFF","htmlInlineTag":"#00CFFF","htmlScriptTag":"#FFC300","htmlAttribute":"#00F5FF","htmlClassAttribute":"#37FFB0","htmlIdAttribute":"#00F5FF","htmlStyleAttribute":"#00CFFF","htmlEventAttribute":"#FFC300","htmlAttributeValue":"#37FFB0","htmlAttributeValueString":"#00F5FF","htmlTagBrackets":"#6FB3CC","htmlPunctuation":"#2F5C66","htmlStringPunctuation":"#6FB3CC","htmlComment":"#2F5C66","htmlEntity":"#FFC300","htmlEntityPunctuation":"#00F5FF","htmlDoctype":"#FF4F6F","embeddedCss":"#00CFFF","embeddedCssBlock":"#00F5FF","embeddedJs":"#FFC300","embeddedJsBlock":"#FF2BFF","htmlFormTag":"#37FFB0","htmlFormAttribute":"#00F5FF","htmlTableTag":"#00F5FF","htmlMediaTag":"#FFC300","htmlLinkTag":"#FF2BFF","htmlHrefAttribute":"#37FFB0","htmlSemanticTag":"#00CFFF","htmlText":"#DDF6FF"}
};
