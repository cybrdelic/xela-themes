/**
 * Theme: XELA Seraphine Conservatory — Terracotta Botanical Gallery
 * Type: light
 * Palette cues: Luis Barragán courtyards + London Barbican Conservatory
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

const tide = '#2F8AA1';
const terra = '#D16A5D';

export default {
  id: 'xela-seraphine-conservatory',
  name: 'XELA Seraphine Conservatory — Terracotta Botanical Gallery',
  type: 'light',
  roles: {
    surface0: '#FBF8F1',
    surface1: '#F5F1EA',
    surface2: '#EDE6DB',
    surface3: '#E3DBCB',
    panel: '#F6F1E7',
    overlay: withAlpha('#FBF8F1', 0.94),
    backdrop: withAlpha('#C9BEB0', 0.28),
    border: '#D6C8B5',
    focus: withAlpha(tide, 0.55),
    textPrimary: '#2F2A24',
    textSecondary: '#4B4438',
    textMuted: '#7A6C5A',
    textInverted: '#FBF8F1',
    accentPrimary: terra,
    accentPrimaryAlt: '#C1A651',
    accentInfo: tide,
    accentWarn: '#E59A34',
    accentError: '#A5483C',
    accentSuccess: '#5F8E4A',
    accentSelection: withAlpha(tide, 0.16),
    accentLink: '#2F7A8E'
  },
  colorOverrides: {},
  tokens(c) {
    return {
      comment: '#948471',
      keyword: '#B4554B',
      function: '#2F7A8E',
      variable: c.textPrimary,
      string: '#5F8E4A',
      number: '#E59A34',
      constant: '#C1A651',
      storage: '#A5483C',
      type: tide,
      punctuation: c.textPrimary,
      invalid: '#A5483C',
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: '#2F2A24',
      h2: terra,
      h3: tide,
      h4: '#C1A651',
      h5: '#5F8E4A',
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  semanticTokens: {
    variable: '#2F2A24',
    'variable.defaultLibrary': '#4B4438',
    parameter: '#7A6C5A',
    property: '#2F2A24',
    function: '#2F7A8E',
    method: '#2F7A8E',
    'function.defaultLibrary': tide,
    'method.defaultLibrary': tide,
    class: '#A5483C',
    type: tide,
    interface: '#5F8E4A',
    enum: '#E59A34',
    enumMember: '#C1A651',
    namespace: tide,
    keyword: '#B4554B',
    modifier: '#A5483C',
    operator: '#C1A651',
    comment: '#948471',
    string: '#5F8E4A',
    number: '#E59A34',
    regexp: terra,
    decorator: '#A5483C',
    label: tide,
    macro: '#A5483C',
    event: terra,
    typeParameter: tide
  },
  semanticHighlighting: true,
  htmlScheme: getHtmlColorScheme('arctic', 'light')
};
