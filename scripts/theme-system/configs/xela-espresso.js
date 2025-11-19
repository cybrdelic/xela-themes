/**
 * Theme: XELA Espresso — Rich Coffee Brown
 * Type: dark
 * Auto-generated from refined collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-espresso',
  name: 'XELA Espresso — Rich Coffee Brown',
  type: 'dark',
  roles: {
      "surface0": "#2B2421",
      "surface1": "#1F1B19",
      "surface2": "#332D2A",
      "surface3": "#3D3531",
      "panel": "#1A1614",
      "overlay": "#2B2421F5",
      "backdrop": "#00000099",
      "border": "#4A413D",
      "focus": "#D4A57499",
      "textPrimary": "#E8DDD1",
      "textSecondary": "#C9B8A3",
      "textMuted": "#8F7E6E",
      "textInverted": "#2B2421",
      "accentPrimary": "#D4A574",
      "accentPrimaryAlt": "#E4B884",
      "accentInfo": "#8FB4D6",
      "accentWarn": "#E4B884",
      "accentError": "#E57474",
      "accentSuccess": "#98C379",
      "accentSelection": "#D4A57438",
      "accentLink": "#E4B884"
  },
  colorOverrides: {
      "titleBar.activeBackground": "#1A1614",
      "activityBar.background": "#1F1B19",
      "sideBar.background": "#1F1B19",
      "editorGroupHeader.tabsBackground": "#1F1B19",
      "tab.inactiveBackground": "#1A1614",
      "tab.activeBackground": "#2B2421",
      "statusBar.background": "#1A1614",
      "panel.background": "#1A1614",
      "editor.lineHighlightBackground": "#3D353140",
      "editorLineNumber.foreground": "#8F7E6E",
      "editorLineNumber.activeForeground": "#C9B8A3",
      "tab.activeBorderTop": "#D4A574",
      "activityBar.activeBorder": "#D4A574",
      "focusBorder": "#D4A57499",
      "sideBar.border": "#3D3531",
      "panel.border": "#3D3531",
      "editorGroup.border": "#3D3531",
      "list.activeSelectionBackground": "#3D3531",
      "list.hoverBackground": "#332D2A80",
      "editorIndentGuide.background": "#4A413D30",
      "editorIndentGuide.activeBackground": "#4A413D80"
  },
  tokens: function(c) {
      return {
        comment: '#8F7E6E',
        keyword: '#E4B884',
        function: '#8FB4D6',
        variable: '#E8DDD1',
        string: '#98C379',
        number: '#E4B884',
        constant: '#D4A574',
        storage: '#E4B884',
        type: '#8FB4D6',
        punctuation: '#C9B8A3',
        invalid: '#E57474',
        code: c.textPrimary,
        heading: '#D4A574',
        h1: '#E4B884',
        h2: '#8FB4D6',
        h3: '#98C379',
        h4: '#D4A574',
        h5: c.textSecondary,
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
