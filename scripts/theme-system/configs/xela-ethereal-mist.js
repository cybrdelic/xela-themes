/**
 * Theme: XELA Ethereal Mist — Spirit Realm
 * Type: light
 * Auto-generated from ultimate collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-ethereal-mist',
  name: 'XELA Ethereal Mist — Spirit Realm',
  type: 'light',
  roles: {
      "surface0": "#FAFAFA",
      "surface1": "#F0F0F5",
      "surface2": "#E6E6F0",
      "surface3": "#DCDCEB",
      "panel": "#F0F0F5",
      "overlay": "#FAFAFAE8",
      "backdrop": "#FFFFFF99",
      "border": "#D2D2E6",
      "focus": "#9370DBCC",
      "textPrimary": "#2C2C3A",
      "textSecondary": "#404055",
      "textMuted": "#808095",
      "textInverted": "#FAFAFA",
      "accentPrimary": "#9370DB",
      "accentPrimaryAlt": "#8A2BE2",
      "accentInfo": "#6495ED",
      "accentWarn": "#DAA520",
      "accentError": "#DC143C",
      "accentSuccess": "#228B22",
      "accentSelection": "#9370DB26",
      "accentLink": "#6495ED"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#9999AA',
        keyword: '#9370DB',
        function: '#6495ED',
        variable: '#2C2C3A',
        string: '#228B22',
        number: '#DAA520',
        constant: '#8A2BE2',
        storage: '#DC143C',
        type: '#6495ED',
        punctuation: c.textPrimary,
        invalid: '#DC143C',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#9370DB',
        h2: '#6495ED',
        h3: '#8A2BE2',
        h4: '#228B22',
        h5: '#DAA520',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#9370DB","htmlStructureTag":"#6495ED","htmlInlineTag":"#8A2BE2","htmlScriptTag":"#DAA520","htmlAttribute":"#6495ED","htmlClassAttribute":"#228B22","htmlIdAttribute":"#9370DB","htmlStyleAttribute":"#8A2BE2","htmlEventAttribute":"#DAA520","htmlAttributeValue":"#228B22","htmlAttributeValueString":"#6495ED","htmlTagBrackets":"#808095","htmlPunctuation":"#9999AA","htmlStringPunctuation":"#808095","htmlComment":"#9999AA","htmlEntity":"#DAA520","htmlEntityPunctuation":"#9370DB","htmlDoctype":"#DC143C","embeddedCss":"#8A2BE2","embeddedCssBlock":"#9370DB","embeddedJs":"#DAA520","embeddedJsBlock":"#6495ED","htmlFormTag":"#228B22","htmlFormAttribute":"#6495ED","htmlTableTag":"#9370DB","htmlMediaTag":"#DAA520","htmlLinkTag":"#6495ED","htmlHrefAttribute":"#228B22","htmlSemanticTag":"#8A2BE2","htmlText":"#2C2C3A"}
};
