/**
 * Theme: XELA Deep Focus — Distraction-Free Code
 * Type: dark
 * Auto-generated from refined collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-deep-focus',
  name: 'XELA Deep Focus — Distraction-Free Code',
  type: 'dark',
  roles: {
      "surface0": "#1A1D23",
      "surface1": "#13151A",
      "surface2": "#1F2229",
      "surface3": "#252930",
      "panel": "#0F1115",
      "overlay": "#1A1D23F5",
      "backdrop": "#00000099",
      "border": "#2A2D35",
      "focus": "#7C9CBF80",
      "textPrimary": "#D8DEE9",
      "textSecondary": "#A8B4C8",
      "textMuted": "#6B7A93",
      "textInverted": "#1A1D23",
      "accentPrimary": "#7C9CBF",
      "accentPrimaryAlt": "#94B4D6",
      "accentInfo": "#7C9CBF",
      "accentWarn": "#B89876",
      "accentError": "#BF7C7C",
      "accentSuccess": "#8FB f9C",
      "accentSelection": "#7C9CBF2E",
      "accentLink": "#94B4D6"
  },
  colorOverrides: {
      "titleBar.activeBackground": "#0F1115",
      "activityBar.background": "#0F1115",
      "sideBar.background": "#13151A",
      "editorGroupHeader.tabsBackground": "#13151A",
      "tab.inactiveBackground": "#0F1115",
      "tab.activeBackground": "#1A1D23",
      "statusBar.background": "#0F1115",
      "statusBar.noFolderBackground": "#0F1115",
      "panel.background": "#0F1115",
      "activityBar.border": "#00000000",
      "sideBar.border": "#00000000",
      "panel.border": "#2A2D3550",
      "editorGroup.border": "#2A2D3550",
      "tab.border": "#00000000",
      "tab.activeBorder": "#00000000",
      "tab.activeBorderTop": "#00000000",
      "editor.lineHighlightBackground": "#252930 30",
      "editorCursor.foreground": "#94B4D6",
      "editorWhitespace.foreground": "#2A2D35",
      "editorIndentGuide.background": "#2A2D3540",
      "editorIndentGuide.activeBackground": "#2A2D3580",
      "list.activeSelectionBackground": "#252930",
      "list.hoverBackground": "#1F222980",
      "selection.background": "#7C9CBF30"
  },
  tokens: function(c) {
      return {
        comment: '#6B7A93',
        keyword: '#94B4D6',
        function: '#A8B4C8',
        variable: '#D8DEE9',
        string: '#8FBF9C',
        number: '#B89876',
        constant: '#7C9CBF',
        storage: '#94B4D6',
        type: '#7C9CBF',
        punctuation: '#A8B4C8',
        invalid: '#BF7C7C',
        code: c.textPrimary,
        heading: '#94B4D6',
        h1: '#94B4D6',
        h2: '#8FBF9C',
        h3: '#B89876',
        h4: '#A8B4C8',
        h5: c.textSecondary,
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
