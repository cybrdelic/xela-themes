/**
 * Theme: XELA Daybreak — Morning Light
 * Type: light
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-daybreak',
  name: 'XELA Daybreak — Morning Light',
  type: 'light',
  roles: {
      "surface0": "#FFFFFF",
      "surface1": "#F8F9FA",
      "surface2": "#F1F3F5",
      "surface3": "#E9ECEF",
      "panel": "#FFFFFF",
      "overlay": "#FFFFFFF2",
      "backdrop": "#FFFFFF99",
      "border": "#DEE2E6",
      "focus": "#1971C2B3",
      "textPrimary": "#212529",
      "textSecondary": "#343A40",
      "textMuted": "#6C757D",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#1971C2",
      "accentPrimaryAlt": "#1864AB",
      "accentInfo": "#0C8599",
      "accentWarn": "#F59F00",
      "accentError": "#E03131",
      "accentSuccess": "#2F9E44",
      "accentSelection": "#1971C22E",
      "accentLink": "#1864AB"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#5C7080',
        keyword: '#D6336C',
        function: '#1971C2',
        variable: '#212529',
        string: '#2F9E44',
        number: '#F59F00',
        constant: '#D6336C',
        storage: '#AE3EC9',
        type: '#0C8599',
        punctuation: '#343A40',
        invalid: '#E03131',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#D6336C',
        h2: '#1971C2',
        h3: '#0C8599',
        h4: '#2F9E44',
        h5: '#F59F00',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
