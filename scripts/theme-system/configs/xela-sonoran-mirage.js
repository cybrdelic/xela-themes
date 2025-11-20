/**
 * Theme: XELA Sonoran Mirage — Desert Neon Dusk
 * Type: dark
 * Palette inspiration: Omar Aqil "Mirage" gradients & ColorHunt Desert Night
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

const ember = '#FF8A3C';
const oasis = '#11C5B7';

export default {
  id: 'xela-sonoran-mirage',
  name: 'XELA Mirage Sonora — Desert Prism',
  type: 'dark',
  roles: {
    surface0: '#0E0704',
    surface1: '#140C08',
    surface2: '#1C110C',
    surface3: '#281A14',
    panel: '#18110C',
    overlay: withAlpha('#0E0704', 0.9),
    backdrop: withAlpha('#020100', 0.75),
    border: '#3C2619',
    focus: withAlpha(ember, 0.7),
    textPrimary: '#FFE7D1',
    textSecondary: '#F2C7A1',
    textMuted: '#B98566',
    textInverted: '#120A06',
    accentPrimary: ember,
    accentPrimaryAlt: '#FF5376',
    accentInfo: oasis,
    accentWarn: '#FFC857',
    accentError: '#FF4257',
    accentSuccess: '#A0D468',
    accentSelection: withAlpha(ember, 0.18),
    accentLink: oasis
  },
  colorOverrides: {},
  tokens(c) {
    return {
      comment: '#99705B',
      keyword: '#FF5376',
      function: '#FFB661',
      variable: c.textPrimary,
      string: '#A0D468',
      number: ember,
      constant: '#FFC857',
      storage: '#FF5376',
      type: oasis,
      punctuation: c.textPrimary,
      invalid: '#FF4257',
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: '#FFE7D1',
      h2: '#FF8A3C',
      h3: '#FF5376',
      h4: oasis,
      h5: '#FFC857',
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  semanticTokens: {
    variable: '#FFE7D1',
    'variable.defaultLibrary': '#F2C7A1',
    parameter: '#D7A679',
    property: '#FFE7D1',
    function: '#FFB661',
    method: '#FFB661',
    'function.defaultLibrary': '#FFC98A',
    'method.defaultLibrary': '#FFC98A',
    class: '#FF5376',
    type: oasis,
    interface: '#A0D468',
    enum: '#FFC857',
    enumMember: '#FF8A3C',
    namespace: oasis,
    keyword: '#FF5376',
    modifier: '#FF5376',
    operator: '#FFC857',
    comment: '#99705B',
    string: '#A0D468',
    number: ember,
    regexp: '#FF8A3C',
    decorator: '#FF4257',
    label: '#FFC857',
    macro: '#FF4257',
    event: '#FF8A3C',
    typeParameter: oasis
  },
  semanticHighlighting: true,
  htmlScheme: getHtmlColorScheme('desert', 'dark')
};
