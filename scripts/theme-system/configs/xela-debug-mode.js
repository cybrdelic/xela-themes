/**
 * Theme: XELA Debug Mode — Error Detection
 * Type: light
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-debug-mode',
  name: 'XELA Debug Mode — Error Detection',
  type: 'light',
  roles: {
      "surface0": "#FEF7F0",
      "surface1": "#F4EBE0",
      "surface2": "#FFFBF7",
      "surface3": "#FFFFFF",
      "panel": "#F9F0E7",
      "overlay": "#FEF7F0F8",
      "backdrop": "#00000012",
      "border": "#E0D0BD",
      "focus": "#DC262680",
      "textPrimary": "#292524",
      "textSecondary": "#57534E",
      "textMuted": "#9F9389",
      "textInverted": "#FEF7F0",
      "accentPrimary": "#DC2626",
      "accentPrimaryAlt": "#EF4444",
      "accentInfo": "#2563EB",
      "accentWarn": "#F59E0B",
      "accentError": "#DC2626",
      "accentSuccess": "#16A34A",
      "accentSelection": "#DC26261F",
      "accentLink": "#2563EB"
  },
  colorOverrides: {
      "editor.background": "#FEF7F0",
      "titleBar.activeBackground": "#F4EBE0",
      "activityBar.background": "#F4EBE0",
      "activityBar.activeBorder": "#DC2626",
      "sideBar.background": "#F4EBE0",
      "tab.activeBackground": "#FEF7F0",
      "tab.activeBorderTop": "#DC2626",
      "statusBar.background": "#FFFBF7",
      "panel.background": "#F9F0E7",
      "button.background": "#DC2626",
      "button.foreground": "#FFFFFF",
      "errorForeground": "#DC2626",
      "editorError.foreground": "#DC2626",
      "editorWarning.foreground": "#F59E0B",
      "editorInfo.foreground": "#2563EB",
      "problemsErrorIcon.foreground": "#DC2626",
      "problemsWarningIcon.foreground": "#F59E0B",
      "problemsInfoIcon.foreground": "#2563EB"
  },
  tokens: function(c) {
      return {
        comment: '#9F9389',
        keyword: '#DC2626',
        function: '#2563EB',
        variable: c.textPrimary,
        string: '#16A34A',
        number: '#F59E0B',
        constant: '#DC2626',
        storage: '#DC2626',
        type: '#2563EB',
        punctuation: '#57534E',
        invalid: '#DC2626',
        code: c.textPrimary,
        heading: '#DC2626',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
