/**
 * Theme: XELA Memory Palace — Spatial Recall
 * Type: dark
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-memory-palace',
  name: 'XELA Memory Palace — Spatial Recall',
  type: 'dark',
  roles: {
      "surface0": "#1C1A22",
      "surface1": "#13111A",
      "surface2": "#242229",
      "surface3": "#2D2B34",
      "panel": "#0E0C13",
      "overlay": "#1C1A22F8",
      "backdrop": "#00000099",
      "border": "#3A3740",
      "focus": "#A78BFA99",
      "textPrimary": "#E9E5F5",
      "textSecondary": "#C7BFE5",
      "textMuted": "#8B82A8",
      "textInverted": "#1C1A22",
      "accentPrimary": "#A78BFA",
      "accentPrimaryAlt": "#C4B5FD",
      "accentInfo": "#60A5FA",
      "accentWarn": "#FBBF24",
      "accentError": "#F87171",
      "accentSuccess": "#34D399",
      "accentSelection": "#A78BFA33",
      "accentLink": "#C4B5FD"
  },
  colorOverrides: {
      "editor.background": "#1C1A22",
      "titleBar.activeBackground": "#0E0C13",
      "activityBar.background": "#13111A",
      "activityBar.activeBorder": "#A78BFA",
      "sideBar.background": "#13111A",
      "tab.activeBackground": "#1C1A22",
      "tab.activeBorderTop": "#A78BFA",
      "statusBar.background": "#0E0C13",
      "panel.background": "#0E0C13",
      "button.background": "#A78BFA",
      "button.foreground": "#1C1A22",
      "editorBracketHighlight.foreground1": "#60A5FA",
      "editorBracketHighlight.foreground2": "#34D399",
      "editorBracketHighlight.foreground3": "#FBBF24",
      "editorBracketHighlight.foreground4": "#F87171",
      "editorBracketHighlight.foreground5": "#A78BFA",
      "editorBracketHighlight.foreground6": "#C4B5FD"
  },
  tokens: function(c) {
      return {
        comment: '#8B82A8',
        keyword: '#F87171',
        function: '#60A5FA',
        variable: c.textPrimary,
        string: '#34D399',
        number: '#FBBF24',
        constant: '#A78BFA',
        storage: '#F87171',
        type: '#60A5FA',
        punctuation: c.textSecondary,
        invalid: '#F87171',
        code: c.textPrimary,
        heading: '#A78BFA',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
