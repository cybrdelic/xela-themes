/**
 * Theme: XELA Clean Slate — Minimal Precision
 * Type: light
 * Auto-generated from refined collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-clean-slate',
  name: 'XELA Clean Slate — Minimal Precision',
  type: 'light',
  roles: {
      "surface0": "#FAFAFA",
      "surface1": "#F0F0F0",
      "surface2": "#FFFFFF",
      "surface3": "#FFFFFF",
      "panel": "#F5F5F5",
      "overlay": "#FAFAFAF5",
      "backdrop": "#00000008",
      "border": "#E0E0E0",
      "focus": "#0000004D",
      "textPrimary": "#212121",
      "textSecondary": "#616161",
      "textMuted": "#9E9E9E",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#000000",
      "accentPrimaryAlt": "#424242",
      "accentInfo": "#1976D2",
      "accentWarn": "#F57C00",
      "accentError": "#D32F2F",
      "accentSuccess": "#388E3C",
      "accentSelection": "#00000014",
      "accentLink": "#1976D2"
  },
  colorOverrides: {
      "editor.background": "#FAFAFA",
      "titleBar.activeBackground": "#F0F0F0",
      "activityBar.background": "#F0F0F0",
      "sideBar.background": "#F0F0F0",
      "editorGroupHeader.tabsBackground": "#F0F0F0",
      "tab.inactiveBackground": "#F0F0F0",
      "tab.activeBackground": "#FAFAFA",
      "statusBar.background": "#FFFFFF",
      "panel.background": "#F5F5F5",
      "editorLineNumber.foreground": "#BDBDBD",
      "editorLineNumber.activeForeground": "#616161",
      "editor.lineHighlightBackground": "#F5F5F580",
      "tab.activeBorder": "#000000",
      "activityBar.activeBorder": "#000000",
      "focusBorder": "#00000050",
      "sideBar.border": "#EEEEEE",
      "panel.border": "#EEEEEE",
      "editorGroup.border": "#EEEEEE",
      "list.activeSelectionBackground": "#E0E0E0",
      "list.hoverBackground": "#F5F5F5",
      "editorIndentGuide.background": "#E0E0E015",
      "editorIndentGuide.activeBackground": "#E0E0E060",
      "button.background": "#212121",
      "button.foreground": "#FFFFFF",
      "button.hoverBackground": "#424242"
  },
  tokens: function(c) {
      return {
        comment: '#9E9E9E',
        keyword: '#D32F2F',
        function: '#1976D2',
        variable: '#212121',
        string: '#388E3C',
        number: '#F57C00',
        constant: '#000000',
        storage: '#D32F2F',
        type: '#1976D2',
        punctuation: '#616161',
        invalid: '#D32F2F',
        code: c.textPrimary,
        heading: '#000000',
        h1: '#000000',
        h2: '#1976D2',
        h3: '#388E3C',
        h4: '#F57C00',
        h5: '#616161',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
