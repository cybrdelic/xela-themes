/**
 * Theme: XELA Zen Code — Mindful Simplicity
 * Type: light
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-zen-code',
  name: 'XELA Zen Code — Mindful Simplicity',
  type: 'light',
  roles: {
      "surface0": "#F8F8F6",
      "surface1": "#EEEEEC",
      "surface2": "#FCFCFB",
      "surface3": "#FFFFFF",
      "panel": "#F3F3F1",
      "overlay": "#F8F8F6F8",
      "backdrop": "#00000010",
      "border": "#D9D9D7",
      "focus": "#6B728066",
      "textPrimary": "#27272A",
      "textSecondary": "#52525B",
      "textMuted": "#A1A1AA",
      "textInverted": "#F8F8F6",
      "accentPrimary": "#6B7280",
      "accentPrimaryAlt": "#9CA3AF",
      "accentInfo": "#6B7280",
      "accentWarn": "#A16207",
      "accentError": "#991B1B",
      "accentSuccess": "#166534",
      "accentSelection": "#6B72801F",
      "accentLink": "#6B7280"
  },
  colorOverrides: {
      "editor.background": "#F8F8F6",
      "titleBar.activeBackground": "#EEEEEC",
      "activityBar.background": "#EEEEEC",
      "activityBar.activeBorder": "#6B7280",
      "sideBar.background": "#EEEEEC",
      "tab.activeBackground": "#F8F8F6",
      "tab.activeBorder": "#6B7280",
      "statusBar.background": "#FCFCFB",
      "panel.background": "#F3F3F1",
      "button.background": "#6B7280",
      "button.foreground": "#FFFFFF",
      "editorLineNumber.foreground": "#D1D5DB",
      "editorLineNumber.activeForeground": "#A1A1AA",
      "editor.lineHighlightBackground": "#EEEEEC30",
      "activityBar.border": "#00000000",
      "sideBar.border": "#00000000"
  },
  tokens: function(c) {
      return {
        comment: '#A1A1AA',
        keyword: '#991B1B',
        function: '#6B7280',
        variable: c.textPrimary,
        string: '#166534',
        number: '#A16207',
        constant: '#6B7280',
        storage: '#991B1B',
        type: '#6B7280',
        punctuation: '#52525B',
        invalid: '#991B1B',
        code: c.textPrimary,
        heading: '#6B7280',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
