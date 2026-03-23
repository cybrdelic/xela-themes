/**
 * Theme: XELA E‑Ink Sepia — Paper Light
 * Type: light
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-e-ink-sepia',
    name: 'XELA E‑Ink Sepia — Paper Light',
    type: 'light',
    roles: {
      surface0: '#FBF7F0',
      surface1: '#F6F2EB',
      surface2: '#F1EDE6',
      surface3: '#ECE8E1',
      panel: '#F6F2EB',
      overlay: '#FBF7F0CC',
      backdrop: '#FFFFFF88',
      border: '#E0DCD5',
      focus: withAlpha('#8B4513',0.67),
      textPrimary: '#3C2415',
      textSecondary: '#4A2F1B',
      textMuted: '#6B4E37',
      textInverted: '#FBF7F0',
      accentPrimary: '#8B4513',
      accentPrimaryAlt: '#A0522D',
      accentInfo: '#5D4E37',
      accentWarn: '#D2691E',
      accentError: '#A0522D',
      accentSuccess: '#556B2F',
      accentSelection: withAlpha('#8B4513',0.1),
      accentLink: '#5D4E37'
    },
    colorOverrides: {
      "terminal.ansiMagenta": "#7B6D8D",
    },
    tokens(c){
      return {
        comment: '#8B7355',
        keyword: '#8B4513',
        function: '#5D4E37',
        variable: '#3C2415',
        string: '#556B2F',
        number: '#D2691E',
        constant: '#8B4513',
        storage: '#A0522D',
        type: '#5D4E37',
        punctuation: c.textPrimary,
        invalid: '#A0522D',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#3C2415',
        h2: '#8B4513',
        h3: '#5D4E37',
        h4: '#6B4E37',
        h5: '#556B2F',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('sepia','light')
  };
