/**
 * Theme: XELA Arctic Daylight — Cool Clarity
 * Type: light
 * Auto-generated from refined collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-arctic-daylight',
  name: 'XELA Arctic Daylight — Cool Clarity',
  type: 'light',
  roles: {
      "surface0": "#F7FAFB",
      "surface1": "#EDF2F4",
      "surface2": "#FFFFFF",
      "surface3": "#FFFFFF",
      "panel": "#F0F5F7",
      "overlay": "#F7FAFBF5",
      "backdrop": "#00000010",
      "border": "#D0DDE3",
      "focus": "#0077C880",
      "textPrimary": "#1B2A35",
      "textSecondary": "#4A5F73",
      "textMuted": "#7B8FA3",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#0077C8",
      "accentPrimaryAlt": "#0091EA",
      "accentInfo": "#00ACC1",
      "accentWarn": "#FF9800",
      "accentError": "#E53935",
      "accentSuccess": "#43A047",
      "accentSelection": "#0077C824",
      "accentLink": "#0091EA"
  },
  colorOverrides: {
      "editor.background": "#F7FAFB",
      "titleBar.activeBackground": "#EDF2F4",
      "activityBar.background": "#EDF2F4",
      "sideBar.background": "#EDF2F4",
      "editorGroupHeader.tabsBackground": "#EDF2F4",
      "tab.inactiveBackground": "#EDF2F4",
      "tab.activeBackground": "#F7FAFB",
      "statusBar.background": "#FFFFFF",
      "panel.background": "#F0F5F7",
      "editorLineNumber.foreground": "#B0BEC5",
      "editorLineNumber.activeForeground": "#4A5F73",
      "editor.lineHighlightBackground": "#EDF2F460",
      "tab.activeBorder": "#0077C8",
      "activityBar.activeBorder": "#0077C8",
      "focusBorder": "#0077C899",
      "sideBar.border": "#E1E8EB",
      "panel.border": "#E1E8EB",
      "editorGroup.border": "#E1E8EB",
      "list.activeSelectionBackground": "#E1F5FE",
      "list.hoverBackground": "#F1F8FA",
      "editorIndentGuide.background": "#D0DDE320",
      "editorIndentGuide.activeBackground": "#D0DDE370"
  },
  tokens: function(c) {
      return {
        comment: '#7B8FA3',
        keyword: '#E53935',
        function: '#0077C8',
        variable: '#1B2A35',
        string: '#43A047',
        number: '#FF9800',
        constant: '#00ACC1',
        storage: '#E53935',
        type: '#0077C8',
        punctuation: '#4A5F73',
        invalid: '#E53935',
        code: c.textPrimary,
        heading: '#0077C8',
        h1: '#0077C8',
        h2: '#00ACC1',
        h3: '#43A047',
        h4: '#FF9800',
        h5: '#4A5F73',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#D84315","htmlStructureTag":"#BF360C","htmlInlineTag":"#FF5722","htmlScriptTag":"#E91E63","htmlAttribute":"#1976D2","htmlClassAttribute":"#303F9F","htmlIdAttribute":"#0288D1","htmlStyleAttribute":"#7B1FA2","htmlEventAttribute":"#512DA8","htmlAttributeValue":"#2E7D32","htmlAttributeValueString":"#388E3C","htmlTagBrackets":"#616161","htmlPunctuation":"#757575","htmlStringPunctuation":"#424242","htmlComment":"#9E9E9E","htmlEntity":"#F57C00","htmlEntityPunctuation":"#FF9800","htmlDoctype":"#C62828","embeddedCss":"#4A148C","embeddedCssBlock":"#6A1B9A","embeddedJs":"#E65100","embeddedJsBlock":"#F57C00","htmlFormTag":"#1B5E20","htmlFormAttribute":"#2E7D32","htmlTableTag":"#0D47A1","htmlMediaTag":"#E65100","htmlLinkTag":"#01579B","htmlHrefAttribute":"#0277BD","htmlSemanticTag":"#4A148C","htmlText":"#212121"}
};
