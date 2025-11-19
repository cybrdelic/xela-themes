/**
 * Theme: XELA Terminalist — ANSI Native
 * Type: dark
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
    id: 'xela-terminalist',
    name: 'XELA Terminalist — ANSI Native',
    type: 'dark',
    roles: {
      surface0: '#0B0D10',
      surface1: '#0F1216',
      surface2: '#1F242B',
      surface3: '#374151',
      panel: '#0F1216',
      overlay: '#0B0D10CC',
      backdrop: '#00000088',
      border: '#1F242B',
      focus: withAlpha('#3B82F6',0.67),
      textPrimary: '#E5E7EB',
      textSecondary: '#D1D5DB',
      textMuted: '#9CA3AF',
      textInverted: '#111827',
      accentPrimary: '#3B82F6',
      accentPrimaryAlt: '#60A5FA',
      accentInfo: '#06B6D4',
      accentWarn: '#F59E0B',
      accentError: '#EF4444',
      accentSuccess: '#22C55E',
      accentSelection: withAlpha('#93C5FD',0.13),
      accentLink: '#22D3EE'
    },
    tokens(c){
      return {
        comment: '#6B7280',
        keyword: '#A855F7',
        function: '#06B6D4',
        variable: '#E5E7EB',
        string: '#22C55E',
        number: '#F59E0B',
        constant: '#C084FC',
        storage: '#EF4444',
        type: '#60A5FA',
        punctuation: c.textPrimary,
        invalid: '#F87171',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#FFFFFF',
        h2: '#60A5FA',
        h3: '#C084FC',
        h4: '#22D3EE',
        h5: '#4ADE80',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('terminalist','dark')
  };
