/**
 * Theme: XELA Storm Grey — Moody Atmosphere
 * Type: dark
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-storm-grey',
  name: 'XELA Storm Grey — Moody Atmosphere',
  type: 'dark',
  roles: {
      "surface0": "#23272E",
      "surface1": "#2C313A",
      "surface2": "#353A45",
      "surface3": "#3E4451",
      "panel": "#23272E",
      "overlay": "#23272EF2",
      "backdrop": "#00000099",
      "border": "#3E4451",
      "focus": "#61AFEFB3",
      "textPrimary": "#ABB2BF",
      "textSecondary": "#9DA5B4",
      "textMuted": "#5C6370",
      "textInverted": "#282C34",
      "accentPrimary": "#61AFEF",
      "accentPrimaryAlt": "#82C7FF",
      "accentInfo": "#56B6C2",
      "accentWarn": "#E5C07B",
      "accentError": "#E06C75",
      "accentSuccess": "#98C379",
      "accentSelection": "#61AFEF40",
      "accentLink": "#82C7FF"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#5C6370',
        keyword: '#C678DD',
        function: '#61AFEF',
        variable: '#ABB2BF',
        string: '#98C379',
        number: '#D19A66',
        constant: '#D19A66',
        storage: '#C678DD',
        type: '#E5C07B',
        punctuation: '#ABB2BF',
        invalid: '#E06C75',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#61AFEF',
        h2: '#C678DD',
        h3: '#98C379',
        h4: '#E5C07B',
        h5: '#56B6C2',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
