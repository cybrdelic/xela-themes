/**
 * Theme: XELA Ink — Print Typography
 * Type: light
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-ink',
    name: 'XELA Ink — Print Typography',
    type: 'light',
    roles: {
      surface0: '#FFFEF7',
      surface1: '#FAF9F2',
      surface2: '#F5F4ED',
      surface3: '#F0EFE8',
      panel: '#FAF9F2',
      overlay: '#FFFEF7CC',
      backdrop: '#FFFFFF88',
      border: '#E8E7E0',
      focus: withAlpha('#8B4513',0.67),
      textPrimary: '#2F2F2F',
      textSecondary: '#4A4A4A',
      textMuted: '#6B6B6B',
      textInverted: '#FFFFFF',
      accentPrimary: '#8B4513',
      accentPrimaryAlt: '#A0522D',
      accentInfo: '#4682B4',
      accentWarn: '#DAA520',
      accentError: '#B22222',
      accentSuccess: '#228B22',
      accentSelection: withAlpha('#8B4513',0.1),
      accentLink: '#4682B4'
    },
    tokens(c){
      return {
        comment: '#708090',
        keyword: '#8B008B',
        function: '#8B4513',
        variable: '#2F2F2F',
        string: '#228B22',
        number: '#DAA520',
        constant: '#8B008B',
        storage: '#B22222',
        type: '#4682B4',
        punctuation: c.textPrimary,
        invalid: '#B22222',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#2F2F2F',
        h2: '#8B4513',
        h3: '#8B008B',
        h4: '#4682B4',
        h5: '#228B22',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('ink','light')
  };
