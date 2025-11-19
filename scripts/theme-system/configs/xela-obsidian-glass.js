/**
 * Theme: XELA Obsidian Glass — Black + Glass
 * Type: dark
 * Auto-generated from final collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-obsidian-glass',
  name: 'XELA Obsidian Glass — Black + Glass',
  type: 'dark',
  roles: {
      "surface0": "#000000",
      "surface1": "#0A0A0A",
      "surface2": "#141414",
      "surface3": "#1E1E1E",
      "panel": "#0A0A0A",
      "overlay": "#000000E6",
      "backdrop": "#00000099",
      "border": "#333333",
      "focus": "#4A9EFFAB",
      "textPrimary": "#F8F8F8",
      "textSecondary": "#E8E8E8",
      "textMuted": "#B8B8B8",
      "textInverted": "#000000",
      "accentPrimary": "#4A9EFF",
      "accentPrimaryAlt": "#7BB8FF",
      "accentInfo": "#4FC3F7",
      "accentWarn": "#FFB347",
      "accentError": "#FF6B6B",
      "accentSuccess": "#4ECDC4",
      "accentSelection": "#4A9EFF33",
      "accentLink": "#7BB8FF"
  },
  colorOverrides: {},
  tokens: function(c){
      return {
        comment: '#888888',
        keyword: '#4A9EFF',
        function: '#4FC3F7',
        variable: '#F8F8F8',
        string: '#4ECDC4',
        number: '#FFB347',
        constant: '#7BB8FF',
        storage: '#FF6B6B',
        type: '#4FC3F7',
        punctuation: c.textPrimary,
        invalid: '#FF6B6B',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#4A9EFF',
        h2: '#4FC3F7',
        h3: '#7BB8FF',
        h4: '#4ECDC4',
        h5: '#FFB347',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
