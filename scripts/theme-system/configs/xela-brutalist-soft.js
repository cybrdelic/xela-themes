/**
 * Theme: XELA Brutalist Soft — Warm Concrete
 * Type: light
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-brutalist-soft',
  name: 'XELA Brutalist Soft — Warm Concrete',
  type: 'light',
  roles: {
      "surface0": "#E8E5E0",
      "surface1": "#D4D0CA",
      "surface2": "#F0EDE8",
      "surface3": "#F8F6F2",
      "panel": "#DCD8D2",
      "overlay": "#E8E5E0F8",
      "backdrop": "#00000015",
      "border": "#B8B3AA",
      "focus": "#6D5D4B80",
      "textPrimary": "#3A342C",
      "textSecondary": "#5C534A",
      "textMuted": "#8B7F72",
      "textInverted": "#E8E5E0",
      "accentPrimary": "#6D5D4B",
      "accentPrimaryAlt": "#826E5A",
      "accentInfo": "#5A7A82",
      "accentWarn": "#B8874E",
      "accentError": "#A85A4B",
      "accentSuccess": "#6B8270",
      "accentSelection": "#6D5D4B26",
      "accentLink": "#5A7A82"
  },
  colorOverrides: {
      "editor.background": "#E8E5E0",
      "titleBar.activeBackground": "#D4D0CA",
      "activityBar.background": "#D4D0CA",
      "activityBar.activeBorder": "#6D5D4B",
      "sideBar.background": "#D4D0CA",
      "tab.activeBackground": "#E8E5E0",
      "tab.activeBorder": "#6D5D4B",
      "statusBar.background": "#F0EDE8",
      "panel.background": "#DCD8D2",
      "button.background": "#6D5D4B",
      "button.foreground": "#E8E5E0",
      "editorLineNumber.foreground": "#B8B3AA",
      "editorLineNumber.activeForeground": "#8B7F72",
      "editorIndentGuide.background": "#B8B3AA30",
      "editorIndentGuide.activeBackground": "#B8B3AA60"
  },
  tokens: function(c) {
      return {
        comment: '#8B7F72',
        keyword: '#A85A4B',
        function: '#5A7A82',
        variable: c.textPrimary,
        string: '#6B8270',
        number: '#B8874E',
        constant: '#6D5D4B',
        storage: '#A85A4B',
        type: '#5A7A82',
        punctuation: '#5C534A',
        invalid: '#A85A4B',
        code: c.textPrimary,
        heading: '#6D5D4B',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
