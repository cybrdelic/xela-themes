/**
 * Theme: XELA Tokyo Neon — Shibuya Night
 * Type: dark
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-tokyo-neon',
  name: 'XELA Tokyo Neon — Shibuya Night',
  type: 'dark',
  roles: {
      "surface0": "#0A0E17",
      "surface1": "#050810",
      "surface2": "#101520",
      "surface3": "#161D2B",
      "panel": "#030509",
      "overlay": "#0A0E17F8",
      "backdrop": "#00000099",
      "border": "#1F2937",
      "focus": "#FF00DCB3",
      "textPrimary": "#F9FAFB",
      "textSecondary": "#E5E7EB",
      "textMuted": "#9CA3AF",
      "textInverted": "#0A0E17",
      "accentPrimary": "#FF00DC",
      "accentPrimaryAlt": "#FF40E5",
      "accentInfo": "#00E5FF",
      "accentWarn": "#FFD600",
      "accentError": "#FF1744",
      "accentSuccess": "#00FF9F",
      "accentSelection": "#FF00DC3D",
      "accentLink": "#00E5FF"
  },
  colorOverrides: {
      "editor.background": "#0A0E17",
      "titleBar.activeBackground": "#030509",
      "activityBar.background": "#050810",
      "activityBar.activeBorder": "#FF00DC",
      "sideBar.background": "#050810",
      "tab.activeBackground": "#0A0E17",
      "tab.activeBorderTop": "#FF00DC",
      "statusBar.background": "#030509",
      "panel.background": "#030509",
      "button.background": "#FF00DC",
      "button.foreground": "#FFFFFF",
      "editorCursor.foreground": "#FF00DC",
      "terminal.ansiMagenta": "#FF00DC",
      "terminal.ansiCyan": "#00E5FF",
      "terminal.ansiYellow": "#FFD600",
      "terminal.ansiGreen": "#00FF9F",
      "terminal.ansiRed": "#FF1744"
  },
  tokens: function(c) {
      return {
        comment: '#9CA3AF',
        keyword: '#FF1744',
        function: '#00E5FF',
        variable: c.textPrimary,
        string: '#00FF9F',
        number: '#FFD600',
        constant: '#FF00DC',
        storage: '#FF1744',
        type: '#00E5FF',
        punctuation: c.textSecondary,
        invalid: '#FF1744',
        code: c.textPrimary,
        heading: '#FF00DC',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
