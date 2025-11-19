/**
 * Theme: XELA Velvet Night — Luxury Dark
 * Type: dark
 * Auto-generated from refined collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-velvet-night',
  name: 'XELA Velvet Night — Luxury Dark',
  type: 'dark',
  roles: {
      "surface0": "#1E1A28",
      "surface1": "#15121D",
      "surface2": "#252130",
      "surface3": "#2D2838",
      "panel": "#110E18",
      "overlay": "#1E1A28F5",
      "backdrop": "#00000099",
      "border": "#3A3545",
      "focus": "#B794F699",
      "textPrimary": "#E8E4F0",
      "textSecondary": "#C8BFDC",
      "textMuted": "#8E859F",
      "textInverted": "#1E1A28",
      "accentPrimary": "#B794F6",
      "accentPrimaryAlt": "#CBA6FF",
      "accentInfo": "#8FA5D6",
      "accentWarn": "#F6C794",
      "accentError": "#F69494",
      "accentSuccess": "#94F6B0",
      "accentSelection": "#B794F633",
      "accentLink": "#CBA6FF"
  },
  colorOverrides: {
      "titleBar.activeBackground": "#110E18",
      "activityBar.background": "#15121D",
      "sideBar.background": "#15121D",
      "editorGroupHeader.tabsBackground": "#15121D",
      "tab.inactiveBackground": "#110E18",
      "tab.activeBackground": "#1E1A28",
      "statusBar.background": "#110E18",
      "panel.background": "#110E18",
      "editor.lineHighlightBackground": "#2D283840",
      "editorLineNumber.foreground": "#8E859F",
      "editorLineNumber.activeForeground": "#C8BFDC",
      "tab.activeBorderTop": "#B794F6",
      "activityBar.activeBorder": "#B794F6",
      "focusBorder": "#B794F699",
      "sideBar.border": "#2D2838",
      "panel.border": "#2D2838",
      "editorGroup.border": "#2D2838",
      "list.activeSelectionBackground": "#2D2838",
      "list.hoverBackground": "#25213080",
      "editorIndentGuide.background": "#3A354530",
      "editorIndentGuide.activeBackground": "#3A354580",
      "button.background": "#B794F6",
      "button.hoverBackground": "#CBA6FF"
  },
  tokens: function(c) {
      return {
        comment: '#8E859F',
        keyword: '#F6C794',
        function: '#8FA5D6',
        variable: '#E8E4F0',
        string: '#94F6B0',
        number: '#F6C794',
        constant: '#B794F6',
        storage: '#F6C794',
        type: '#8FA5D6',
        punctuation: '#C8BFDC',
        invalid: '#F69494',
        code: c.textPrimary,
        heading: '#B794F6',
        h1: '#CBA6FF',
        h2: '#8FA5D6',
        h3: '#94F6B0',
        h4: '#F6C794',
        h5: c.textSecondary,
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
