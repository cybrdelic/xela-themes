/**
 * Theme: XELA Swiss Modern — Helvetica Grid
 * Type: light
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-swiss-modern',
  name: 'XELA Swiss Modern — Helvetica Grid',
  type: 'light',
  roles: {
      "surface0": "#FAFAFA",
      "surface1": "#EEEEEE",
      "surface2": "#FFFFFF",
      "surface3": "#FFFFFF",
      "panel": "#F5F5F5",
      "overlay": "#FAFAFAF8",
      "backdrop": "#00000010",
      "border": "#E0E0E0",
      "focus": "#D32F2F80",
      "textPrimary": "#212121",
      "textSecondary": "#616161",
      "textMuted": "#9E9E9E",
      "textInverted": "#FAFAFA",
      "accentPrimary": "#D32F2F",
      "accentPrimaryAlt": "#F44336",
      "accentInfo": "#1976D2",
      "accentWarn": "#FFA000",
      "accentError": "#D32F2F",
      "accentSuccess": "#388E3C",
      "accentSelection": "#D32F2F1F",
      "accentLink": "#1976D2"
  },
  colorOverrides: {
      "editor.background": "#FAFAFA",
      "titleBar.activeBackground": "#EEEEEE",
      "activityBar.background": "#EEEEEE",
      "activityBar.activeBorder": "#D32F2F",
      "sideBar.background": "#EEEEEE",
      "tab.activeBackground": "#FAFAFA",
      "tab.activeBorder": "#D32F2F",
      "statusBar.background": "#FFFFFF",
      "panel.background": "#F5F5F5",
      "button.background": "#D32F2F",
      "button.foreground": "#FFFFFF",
      "editorRuler.foreground": "#E0E0E0",
      "editorIndentGuide.background": "#E0E0E020",
      "editorIndentGuide.activeBackground": "#E0E0E050"
  },
  tokens: function(c) {
      return {
        comment: '#9E9E9E',
        keyword: '#D32F2F',
        function: '#1976D2',
        variable: '#212121',
        string: '#388E3C',
        number: '#FFA000',
        constant: '#212121',
        storage: '#D32F2F',
        type: '#1976D2',
        punctuation: '#616161',
        invalid: '#D32F2F',
        code: c.textPrimary,
        heading: '#D32F2F',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
