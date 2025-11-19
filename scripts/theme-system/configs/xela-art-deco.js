/**
 * Theme: XELA Art Deco — 1920s Luxury
 * Type: dark
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-art-deco',
  name: 'XELA Art Deco — 1920s Luxury',
  type: 'dark',
  roles: {
      "surface0": "#16161A",
      "surface1": "#0C0C0E",
      "surface2": "#1E1E23",
      "surface3": "#27272D",
      "panel": "#090909",
      "overlay": "#16161AF8",
      "backdrop": "#00000099",
      "border": "#3A3A42",
      "focus": "#FFD70099",
      "textPrimary": "#F0E6D2",
      "textSecondary": "#D4C4A8",
      "textMuted": "#9A8A6E",
      "textInverted": "#16161A",
      "accentPrimary": "#FFD700",
      "accentPrimaryAlt": "#FFE44D",
      "accentInfo": "#4ECDC4",
      "accentWarn": "#FF6B6B",
      "accentError": "#C44569",
      "accentSuccess": "#95E1D3",
      "accentSelection": "#FFD70033",
      "accentLink": "#4ECDC4"
  },
  colorOverrides: {
      "editor.background": "#16161A",
      "titleBar.activeBackground": "#090909",
      "activityBar.background": "#0C0C0E",
      "activityBar.activeBorder": "#FFD700",
      "sideBar.background": "#0C0C0E",
      "tab.activeBackground": "#16161A",
      "tab.activeBorderTop": "#FFD700",
      "statusBar.background": "#090909",
      "panel.background": "#090909",
      "button.background": "#FFD700",
      "button.foreground": "#16161A",
      "editorRuler.foreground": "#3A3A42",
      "editorBracketMatch.border": "#FFD700"
  },
  tokens: function(c) {
      return {
        comment: '#9A8A6E',
        keyword: '#FF6B6B',
        function: '#4ECDC4',
        variable: c.textPrimary,
        string: '#95E1D3',
        number: '#FFD700',
        constant: '#FFD700',
        storage: '#FF6B6B',
        type: '#4ECDC4',
        punctuation: c.textSecondary,
        invalid: '#C44569',
        code: c.textPrimary,
        heading: '#FFD700',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
