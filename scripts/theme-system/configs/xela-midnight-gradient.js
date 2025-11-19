/**
 * Theme: XELA Midnight Gradient — Deep Layers
 * Type: dark
 * Auto-generated from dynamic collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-midnight-gradient',
  name: 'XELA Midnight Gradient — Deep Layers',
  type: 'dark',
  roles: {
      "surface0": "#0D1117",
      "surface1": "#161B22",
      "surface2": "#1C2128",
      "surface3": "#2D333B",
      "panel": "#0A0E14",
      "overlay": "#0D1117F2",
      "backdrop": "#00000099",
      "border": "#30363D",
      "focus": "#58A6FFB3",
      "textPrimary": "#C9D1D9",
      "textSecondary": "#B1BAC4",
      "textMuted": "#8B949E",
      "textInverted": "#0D1117",
      "accentPrimary": "#58A6FF",
      "accentPrimaryAlt": "#79C0FF",
      "accentInfo": "#56D4DD",
      "accentWarn": "#F0883E",
      "accentError": "#F85149",
      "accentSuccess": "#56D364",
      "accentSelection": "#58A6FF33",
      "accentLink": "#79C0FF"
  },
  colorOverrides: {
      "editorGroupHeader.tabsBackground": "#010409",
      "tab.inactiveBackground": "#0D1117",
      "tab.activeBackground": "#161B22",
      "statusBar.background": "#010409",
      "titleBar.activeBackground": "#010409",
      "activityBar.background": "#0D1117",
      "panel.background": "#0A0E14",
      "sideBar.background": "#010409",
      "input.background": "#0D1117",
      "dropdown.background": "#161B22",
      "list.hoverBackground": "#161B2280",
      "editor.lineHighlightBackground": "#161B2250",
      "editorGutter.background": "#0D1117",
      "minimap.background": "#010409"
  },
  tokens: function(c) {
      return {
        comment: '#8B949E',
        keyword: '#FF7B72',
        function: '#D2A8FF',
        variable: '#79C0FF',
        string: '#A5D6FF',
        number: '#79C0FF',
        constant: '#79C0FF',
        storage: '#FF7B72',
        type: '#FFA657',
        punctuation: '#C9D1D9',
        invalid: '#F85149',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#79C0FF',
        h2: '#D2A8FF',
        h3: '#56D364',
        h4: '#F0883E',
        h5: '#FF7B72',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
