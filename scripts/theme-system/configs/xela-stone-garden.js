/**
 * Theme: XELA Stone Garden — Natural Balance
 * Type: light
 * Auto-generated from refined collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-stone-garden',
  name: 'XELA Stone Garden — Natural Balance',
  type: 'light',
  roles: {
      "surface0": "#F5F3F0",
      "surface1": "#ECE9E4",
      "surface2": "#FAF8F5",
      "surface3": "#FFFFFF",
      "panel": "#F0EDE8",
      "overlay": "#F5F3F0F5",
      "backdrop": "#00000015",
      "border": "#D8D3CC",
      "focus": "#7A6F5D80",
      "textPrimary": "#2A2620",
      "textSecondary": "#5A534A",
      "textMuted": "#8A8178",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#7A6F5D",
      "accentPrimaryAlt": "#8F836F",
      "accentInfo": "#5B8A8A",
      "accentWarn": "#C4905E",
      "accentError": "#C45E5E",
      "accentSuccess": "#6B8A5B",
      "accentSelection": "#7A6F5D29",
      "accentLink": "#5B8A8A"
  },
  colorOverrides: {
      "editor.background": "#F5F3F0",
      "titleBar.activeBackground": "#ECE9E4",
      "activityBar.background": "#ECE9E4",
      "sideBar.background": "#ECE9E4",
      "editorGroupHeader.tabsBackground": "#ECE9E4",
      "tab.inactiveBackground": "#ECE9E4",
      "tab.activeBackground": "#F5F3F0",
      "statusBar.background": "#FAF8F5",
      "panel.background": "#F0EDE8",
      "editorLineNumber.foreground": "#AEA89F",
      "editorLineNumber.activeForeground": "#5A534A",
      "editor.lineHighlightBackground": "#ECE9E450",
      "tab.activeBorder": "#7A6F5D",
      "activityBar.activeBorder": "#7A6F5D",
      "sideBar.border": "#E3DFD8",
      "panel.border": "#E3DFD8",
      "editorGroup.border": "#E3DFD8",
      "list.activeSelectionBackground": "#E3DFD8",
      "list.hoverBackground": "#F0EDE8",
      "editorIndentGuide.background": "#D8D3CC25",
      "editorIndentGuide.activeBackground": "#D8D3CC70"
  },
  tokens: function(c) {
      return {
        comment: '#8A8178',
        keyword: '#C45E5E',
        function: '#5B8A8A',
        variable: '#2A2620',
        string: '#6B8A5B',
        number: '#C4905E',
        constant: '#7A6F5D',
        storage: '#C45E5E',
        type: '#5B8A8A',
        punctuation: '#5A534A',
        invalid: '#C45E5E',
        code: c.textPrimary,
        heading: '#7A6F5D',
        h1: '#5B8A8A',
        h2: '#6B8A5B',
        h3: '#C4905E',
        h4: '#7A6F5D',
        h5: '#5A534A',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
