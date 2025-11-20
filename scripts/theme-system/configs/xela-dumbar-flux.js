/**
 * Theme: XELA Dumbar Flux — Hyperchromatic Motion
 * Type: dark
 * Inspired by Studio Dumbar's kinetic neon palette (VPRO redesign)
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

const neonBlue = '#00F5FF';
const ultraviolet = '#FF40F3';
const midnight = '#05001A';

export default {
  id: 'xela-dumbar-flux',
  name: 'XELA Hyperflux Studio — Dumbar Motion',
  type: 'dark',
  roles: {
    surface0: '#040015',
    surface1: '#080022',
    surface2: '#110035',
    surface3: '#1B064F',
    panel: '#090024',
    overlay: withAlpha(midnight, 0.92),
    backdrop: withAlpha('#010006', 0.72),
    border: '#2F1170',
    focus: withAlpha(neonBlue, 0.8),
    textPrimary: '#FDF7FF',
    textSecondary: '#E4D8FF',
    textMuted: '#A691D1',
    textInverted: '#040015',
    accentPrimary: ultraviolet,
    accentPrimaryAlt: neonBlue,
    accentInfo: '#78F1FF',
    accentWarn: '#FFD166',
    accentError: '#FF3B6A',
    accentSuccess: '#5CFFB0',
    accentSelection: withAlpha(neonBlue, 0.22),
    accentLink: '#7AE2FF'
  },
  colorOverrides: {},
  tokens(c) {
    return {
      comment: '#6F5A9C',
      keyword: ultraviolet,
      function: '#00D5FF',
      variable: c.textPrimary,
      string: '#5CFFB0',
      number: '#FFD166',
      constant: '#F7A8FF',
      storage: '#FF3B6A',
      type: '#78F1FF',
      punctuation: c.textPrimary,
      invalid: '#FF5F8E',
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: '#FDF7FF',
      h2: '#FF6AF6',
      h3: '#00E0FF',
      h4: '#5CFFB0',
      h5: '#FFD166',
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  semanticTokens: {
    variable: '#FDF7FF',
    'variable.defaultLibrary': '#E4D8FF',
    parameter: '#C8B6ED',
    property: '#F7EFFF',
    function: '#00E0FF',
    method: '#00E0FF',
    'function.defaultLibrary': '#64F2FF',
    'method.defaultLibrary': '#64F2FF',
    class: '#FF8AE2',
    type: '#7CEAFF',
    interface: '#D8A2FF',
    enum: '#FFD166',
    enumMember: '#F7A8FF',
    namespace: '#7CEAFF',
    keyword: ultraviolet,
    modifier: ultraviolet,
    operator: '#F7A8FF',
    comment: '#6F5A9C',
    string: '#5CFFB0',
    number: '#FFD166',
    regexp: '#E8FF9C',
    decorator: '#FF3B6A',
    label: '#FF8AE2',
    macro: '#FF3B6A',
    event: neonBlue,
    typeParameter: '#7CEAFF'
  },
  semanticHighlighting: true,
  htmlScheme: getHtmlColorScheme('black', 'dark')
};
