/**
 * Theme: XELA Cupertino Prism — Dynamic Glass
 * Type: light
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

const alpineMist = '#F6F8FF';
const crystalBlue = '#0A84FF';

export default {
  id: 'xela-cupertino-prism',
  name: 'XELA Cupertino Prism — Dynamic Glass',
  type: 'light',
  roles: {
    surface0: alpineMist,
    surface1: '#EEF2FF',
    surface2: '#E2E8F6',
    surface3: '#D7DEF0',
    panel: '#E8EDFF',
    overlay: withAlpha('#F6F8FF', 0.92),
    backdrop: withAlpha('#AFC3FF', 0.35),
    border: '#CBD5F0',
    focus: withAlpha(crystalBlue, 0.55),
    textPrimary: '#0A1228',
    textSecondary: '#1F2A44',
    textMuted: '#6B7A99',
    textInverted: alpineMist,
    accentPrimary: crystalBlue,
    accentPrimaryAlt: '#4BD3FF',
    accentInfo: '#32D74B',
    accentWarn: '#FF9F0A',
    accentError: '#FF375F',
    accentSuccess: '#0BD27C',
    accentSelection: withAlpha(crystalBlue, 0.16),
    accentLink: '#5856D6'
  },
  colorOverrides: {},
  tokens(c) {
    return {
      comment: '#8A94B8',
      keyword: '#5856D6',
      function: crystalBlue,
      variable: c.textPrimary,
      string: '#0BD27C',
      number: '#FF9F0A',
      constant: '#FF5E57',
      storage: '#AF52DE',
      type: '#4BD3FF',
      punctuation: c.textPrimary,
      invalid: '#FF375F',
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: '#0A1228',
      h2: '#5856D6',
      h3: crystalBlue,
      h4: '#0BD27C',
      h5: '#FF9F0A',
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  semanticTokens: {
    variable: '#142040',
    'variable.defaultLibrary': '#1F2A44',
    parameter: '#5B6684',
    property: '#0F1B32',
    function: crystalBlue,
    method: crystalBlue,
    'function.defaultLibrary': '#4BD3FF',
    'method.defaultLibrary': '#4BD3FF',
    class: '#5856D6',
    type: '#4BD3FF',
    interface: '#32D74B',
    enum: '#FF9F0A',
    enumMember: '#FF5E57',
    namespace: '#4BD3FF',
    keyword: '#5856D6',
    modifier: '#AF52DE',
    operator: '#0F1B32',
    comment: '#8A94B8',
    string: '#0BD27C',
    number: '#FF9F0A',
    regexp: '#FF5E57',
    decorator: '#FF375F',
    label: '#4BD3FF',
    macro: '#AF52DE',
    event: '#32D74B',
    typeParameter: '#4BD3FF'
  },
  semanticHighlighting: true,
  htmlScheme: getHtmlColorScheme('arctic', 'light')
};
