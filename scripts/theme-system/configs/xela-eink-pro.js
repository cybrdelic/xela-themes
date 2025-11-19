/**
 * Theme: XELA E-Ink Pro — Grayscale Perfect
 * Type: light
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-eink-pro',
  name: 'XELA E-Ink Pro — Grayscale Perfect',
  type: 'light',
  roles: {
      "surface0": "#FFFFFF",
      "surface1": "#F0F0F0",
      "surface2": "#FFFFFF",
      "surface3": "#FFFFFF",
      "panel": "#F8F8F8",
      "overlay": "#FFFFFFF8",
      "backdrop": "#00000005",
      "border": "#CCCCCC",
      "focus": "#0000004D",
      "textPrimary": "#000000",
      "textSecondary": "#4D4D4D",
      "textMuted": "#999999",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#000000",
      "accentPrimaryAlt": "#1A1A1A",
      "accentInfo": "#333333",
      "accentWarn": "#666666",
      "accentError": "#000000",
      "accentSuccess": "#000000",
      "accentSelection": "#00000014",
      "accentLink": "#000000"
  },
  colorOverrides: {
      "editor.background": "#FFFFFF",
      "titleBar.activeBackground": "#F0F0F0",
      "activityBar.background": "#F0F0F0",
      "activityBar.activeBorder": "#000000",
      "sideBar.background": "#F0F0F0",
      "tab.activeBackground": "#FFFFFF",
      "tab.activeBorder": "#000000",
      "statusBar.background": "#FFFFFF",
      "panel.background": "#F8F8F8",
      "button.background": "#000000",
      "button.foreground": "#FFFFFF",
      "editorLineNumber.foreground": "#CCCCCC",
      "editorLineNumber.activeForeground": "#999999",
      "editor.lineHighlightBackground": "#F0F0F040",
      "editorCursor.foreground": "#000000",
      "editorWhitespace.foreground": "#CCCCCC30"
  },
  tokens: function(c) {
      return {
        comment: '#999999',
        keyword: '#000000',
        function: '#333333',
        variable: '#000000',
        string: '#4D4D4D',
        number: '#666666',
        constant: '#000000',
        storage: '#000000',
        type: '#333333',
        punctuation: '#4D4D4D',
        invalid: '#000000',
        code: c.textPrimary,
        heading: '#000000',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#D84315","htmlStructureTag":"#BF360C","htmlInlineTag":"#FF5722","htmlScriptTag":"#E91E63","htmlAttribute":"#1976D2","htmlClassAttribute":"#303F9F","htmlIdAttribute":"#0288D1","htmlStyleAttribute":"#7B1FA2","htmlEventAttribute":"#512DA8","htmlAttributeValue":"#2E7D32","htmlAttributeValueString":"#388E3C","htmlTagBrackets":"#616161","htmlPunctuation":"#757575","htmlStringPunctuation":"#424242","htmlComment":"#9E9E9E","htmlEntity":"#F57C00","htmlEntityPunctuation":"#FF9800","htmlDoctype":"#C62828","embeddedCss":"#4A148C","embeddedCssBlock":"#6A1B9A","embeddedJs":"#E65100","embeddedJsBlock":"#F57C00","htmlFormTag":"#1B5E20","htmlFormAttribute":"#2E7D32","htmlTableTag":"#0D47A1","htmlMediaTag":"#E65100","htmlLinkTag":"#01579B","htmlHrefAttribute":"#0277BD","htmlSemanticTag":"#4A148C","htmlText":"#212121"}
};
