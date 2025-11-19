/**
 * Theme: XELA Twilight Layers — Depth & Dimension
 * Type: dark
 * Auto-generated from dynamic collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-twilight-layers',
  name: 'XELA Twilight Layers — Depth & Dimension',
  type: 'dark',
  roles: {
      "surface0": "#1A1D2E",
      "surface1": "#13151F",
      "surface2": "#232842",
      "surface3": "#2D3454",
      "panel": "#0F1118",
      "overlay": "#1A1D2EF2",
      "backdrop": "#00000099",
      "border": "#2D3454",
      "focus": "#6C8EEFB3",
      "textPrimary": "#E5E9F0",
      "textSecondary": "#D8DEE9",
      "textMuted": "#81889F",
      "textInverted": "#1A1D2E",
      "accentPrimary": "#6C8EEF",
      "accentPrimaryAlt": "#88C0D0",
      "accentInfo": "#5BA8D9",
      "accentWarn": "#EBCB8B",
      "accentError": "#D57780",
      "accentSuccess": "#A3BE8C",
      "accentSelection": "#6C8EEF38",
      "accentLink": "#88C0D0"
  },
  colorOverrides: {
      "editorGroupHeader.tabsBackground": "#161923",
      "tab.inactiveBackground": "#13151F",
      "tab.activeBackground": "#1A1D2E",
      "statusBar.background": "#0F1118",
      "input.background": "#0F1118",
      "dropdown.background": "#161923",
      "list.hoverBackground": "#1E2233",
      "list.activeSelectionBackground": "#232842",
      "editor.lineHighlightBackground": "#1E2233",
      "editorWidget.background": "#161923",
      "peekViewEditor.background": "#13151F",
      "peekViewResult.background": "#0F1118"
  },
  tokens: function(c) {
      return {
        comment: '#616E88',
        keyword: '#B48EAD',
        function: '#88C0D0',
        variable: '#D8DEE9',
        string: '#A3BE8C',
        number: '#EBCB8B',
        constant: '#B48EAD',
        storage: '#81A1C1',
        type: '#6C8EEF',
        punctuation: '#D8DEE9',
        invalid: '#D57780',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#88C0D0',
        h2: '#6C8EEF',
        h3: '#A3BE8C',
        h4: '#EBCB8B',
        h5: '#B48EAD',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
