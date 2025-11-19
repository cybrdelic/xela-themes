/**
 * Theme: XELA Arctic Glass — Crystal Light
 * Type: light
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-arctic-glass',
    name: 'XELA Arctic Glass — Crystal Light',
    type: 'light',
    roles: {
      surface0: '#FFFFFF',
      surface1: '#F7FBFE',
      surface2: '#F2F8FC',
      surface3: '#ECF7FD',
      panel: '#F7FBFE',
      overlay: '#FFFFFFCC',
      backdrop: '#FFFFFF88',
      border: '#E2E8F0',
      focus: withAlpha('#06B6D4',0.67),
      textPrimary: '#0F172A',
      textSecondary: '#334155',
      textMuted: '#64748B',
      textInverted: '#FFFFFF',
      accentPrimary: '#06B6D4',
      accentPrimaryAlt: '#22D3EE',
      accentInfo: '#0EA5E9',
      accentWarn: '#EAB308',
      accentError: '#EF4444',
      accentSuccess: '#10B981',
      accentSelection: withAlpha('#06B6D4',0.13),
      accentLink: '#06B6D4'
    },
    tokens(c){
      return {
        comment: '#64748B',
        keyword: '#0EA5E9',
        function: '#06B6D4',
        variable: '#475569',
        string: '#10B981',
        number: '#EAB308',
        constant: '#8B5CF6',
        storage: '#EC4899',
        type: '#3B82F6',
        punctuation: c.textPrimary,
        invalid: '#EF4444',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#0F172A',
        h2: '#06B6D4',
        h3: '#0EA5E9',
        h4: '#60A5FA',
        h5: '#10B981',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('arctic','light')
  };
