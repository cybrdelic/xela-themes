/**
 * Theme: XELA Color Blind Pro — Accessible
 * Type: light
 * Auto-generated from professional collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-colorblind-pro',
  name: 'XELA Color Blind Pro — Accessible',
  type: 'light',
  roles: {
      "surface0": "#FFFFFF",
      "surface1": "#F5F5F5",
      "surface2": "#FFFFFF",
      "surface3": "#FFFFFF",
      "panel": "#FAFAFA",
      "overlay": "#FFFFFFF8",
      "backdrop": "#00000010",
      "border": "#E0E0E0",
      "focus": "#0077BB80",
      "textPrimary": "#000000",
      "textSecondary": "#424242",
      "textMuted": "#757575",
      "textInverted": "#FFFFFF",
      "accentPrimary": "#0077BB",
      "accentPrimaryAlt": "#3399CC",
      "accentInfo": "#0077BB",
      "accentWarn": "#EE7733",
      "accentError": "#CC3311",
      "accentSuccess": "#009988",
      "accentSelection": "#0077BB1F",
      "accentLink": "#3399CC"
  },
  colorOverrides: {
      "editor.background": "#FFFFFF",
      "titleBar.activeBackground": "#F5F5F5",
      "activityBar.background": "#F5F5F5",
      "activityBar.activeBorder": "#0077BB",
      "sideBar.background": "#F5F5F5",
      "tab.activeBackground": "#FFFFFF",
      "tab.activeBorderTop": "#0077BB",
      "statusBar.background": "#FFFFFF",
      "panel.background": "#FAFAFA",
      "button.background": "#0077BB",
      "button.foreground": "#FFFFFF",
      "errorForeground": "#CC3311",
      "editorError.foreground": "#CC3311",
      "editorWarning.foreground": "#EE7733",
      "editorInfo.foreground": "#0077BB",
      "gitDecoration.addedResourceForeground": "#009988",
      "gitDecoration.modifiedResourceForeground": "#0077BB",
      "gitDecoration.deletedResourceForeground": "#CC3311",
      "gitDecoration.untrackedResourceForeground": "#3399CC",
      "gitDecoration.conflictingResourceForeground": "#EE7733"
  },
  tokens: function(c) {
      return {
        comment: '#757575',
        keyword: '#CC3311',
        function: '#0077BB',
        variable: '#000000',
        string: '#009988',
        number: '#EE7733',
        constant: '#0077BB',
        storage: '#CC3311',
        type: '#0077BB',
        punctuation: '#424242',
        invalid: '#CC3311',
        code: c.textPrimary,
        heading: '#0077BB',
        textPrimary: c.textPrimary
      };
    },
  htmlScheme: {"htmlTag":"#F7B883","htmlStructureTag":"#FFD166","htmlInlineTag":"#EADCB2","htmlScriptTag":"#FF3CAC","htmlAttribute":"#EADCB2","htmlClassAttribute":"#C8B0FF","htmlIdAttribute":"#4CFFCA","htmlStyleAttribute":"#FF8BDA","htmlEventAttribute":"#D8C8FF","htmlAttributeValue":"#00F5A0","htmlAttributeValueString":"#98FF66","htmlTagBrackets":"#A6AAB4","htmlPunctuation":"#8E93A6","htmlStringPunctuation":"#9AA0B4","htmlComment":"#8E93A6","htmlEntity":"#F2C97D","htmlEntityPunctuation":"#FFD166","htmlDoctype":"#FF3CAC","embeddedCss":"#E0CCFF","embeddedCssBlock":"#D7C7FF","embeddedJs":"#F7B883","embeddedJsBlock":"#EADCB2","htmlFormTag":"#79E49A","htmlFormAttribute":"#98FF66","htmlTableTag":"#4CFFCA","htmlMediaTag":"#FFD166","htmlLinkTag":"#4CFFCA","htmlHrefAttribute":"#00F5A0","htmlSemanticTag":"#C8B0FF","htmlText":"#F7F8FA"}
};
