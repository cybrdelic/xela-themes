/**
 * Theme: XELA Porcelain — Delicate Light
 * Type: light
 * Auto-generated from premium collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-porcelain',
  name: 'XELA Porcelain — Delicate Light',
  type: 'light',
  roles: {
      "surface0": "#FEFEFE",
      "surface1": "#F9F9F9",
      "surface2": "#F4F4F4",
      "surface3": "#EFEFEF",
      "panel": "#FEFEFE",
      "overlay": "#FEFEFEF2",
      "backdrop": "#FEFEFE99",
      "border": "#E5E5E5",
      "focus": "#6366F1B3",
      "textPrimary": "#18181B",
      "textSecondary": "#27272A",
      "textMuted": "#71717A",
      "textInverted": "#FAFAFA",
      "accentPrimary": "#6366F1",
      "accentPrimaryAlt": "#818CF8",
      "accentInfo": "#06B6D4",
      "accentWarn": "#F59E0B",
      "accentError": "#EF4444",
      "accentSuccess": "#10B981",
      "accentSelection": "#6366F12E",
      "accentLink": "#818CF8"
  },
  colorOverrides: {},
  tokens: function(c) {
      return {
        comment: '#71717A',
        keyword: '#6366F1',
        function: '#06B6D4',
        variable: '#18181B',
        string: '#10B981',
        number: '#F59E0B',
        constant: '#8B5CF6',
        storage: '#6366F1',
        type: '#0EA5E9',
        punctuation: '#27272A',
        invalid: '#EF4444',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#6366F1',
        h2: '#06B6D4',
        h3: '#10B981',
        h4: '#F59E0B',
        h5: '#8B5CF6',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
