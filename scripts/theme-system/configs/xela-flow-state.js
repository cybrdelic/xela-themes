/**
 * Theme: XELA Flow State — Deep Concentration
 * Type: dark
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-flow-state',
  name: 'XELA Flow State — Deep Concentration',
  type: 'dark',
  roles: {
      "surface0": "#16181D",
      "surface1": "#0C0E11",
      "surface2": "#1D1F25",
      "surface3": "#25272E",
      "panel": "#080A0D",
      "overlay": "#16181DF8",
      "backdrop": "#00000099",
      "border": "#2D2F37",
      "focus": "#7B9EC880",
      "textPrimary": "#D5DFE8",
      "textSecondary": "#A8B9CA",
      "textMuted": "#6B7C8F",
      "textInverted": "#16181D",
      "accentPrimary": "#7B9EC8",
      "accentPrimaryAlt": "#8FAFD6",
      "accentInfo": "#7B9EC8",
      "accentWarn": "#C8A87B",
      "accentError": "#C87B7B",
      "accentSuccess": "#7BC88F",
      "accentSelection": "#7B9EC829",
      "accentLink": "#8FAFD6"
  },
  colorOverrides: {
      "editor.background": "#16181D",
      "titleBar.activeBackground": "#080A0D",
      "activityBar.background": "#0C0E11",
      "sideBar.background": "#0C0E11",
      "tab.activeBackground": "#16181D",
      "tab.activeBorderTop": "#00000000",
      "statusBar.background": "#080A0D",
      "panel.background": "#080A0D",
      "activityBar.border": "#00000000",
      "sideBar.border": "#00000000",
      "editorLineNumber.foreground": "#3D4855",
      "editor.lineHighlightBackground": "#25272E10",
      "button.background": "#7B9EC8",
      "focusBorder": "#7B9EC850"
  },
  tokens: function(c) {
      return {
        comment: '#6B7C8F',
        keyword: '#8FAFD6',
        function: '#7B9EC8',
        variable: c.textPrimary,
        string: '#7BC88F',
        number: '#C8A87B',
        constant: '#7B9EC8',
        storage: '#8FAFD6',
        type: '#7B9EC8',
        punctuation: c.textSecondary,
        invalid: '#C87B7B',
        code: c.textPrimary,
        heading: '#7B9EC8',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
