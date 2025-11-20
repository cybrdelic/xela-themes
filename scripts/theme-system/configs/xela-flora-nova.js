/**
 * Theme: XELA Flora Nova — Botanical Atelier
 * Type: light
 * Palette references: Leta Sobierajski soft botanicals & Design Seeds "Blush Garden"
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

const tide = '#1DACB2';

export default {
  id: 'xela-flora-nova',
  name: 'XELA Botanica Nova — Atelier Bloom',
  type: 'light',
  roles: {
    surface0: '#FFFBF6',
    surface1: '#FFF7F0',
    surface2: '#FFEFE5',
    surface3: '#F8E4DB',
    panel: '#FFF7F0',
    overlay: withAlpha('#FFFBF6', 0.94),
    backdrop: withAlpha('#C19988', 0.2),
    border: '#E7CFC1',
    focus: withAlpha(tide, 0.58),
    textPrimary: '#3E2F2B',
    textSecondary: '#5A4A45',
    textMuted: '#8A6F65',
    textInverted: '#FFFBF6',
    accentPrimary: '#FF5E7E',
    accentPrimaryAlt: '#FF8A5B',
    accentInfo: tide,
    accentWarn: '#F0B429',
    accentError: '#B34255',
    accentSuccess: '#6FAD3B',
    accentSelection: withAlpha(tide, 0.18),
    accentLink: '#1A8AA6'
  },
  colorOverrides: {},
  tokens(c) {
    return {
      comment: '#A68A80',
      keyword: '#D8466F',
      function: '#1A8AA6',
      variable: c.textPrimary,
      string: '#6FAD3B',
      number: '#F0B429',
      constant: '#FF8A5B',
      storage: '#B34255',
      type: tide,
      punctuation: c.textPrimary,
      invalid: '#B34255',
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: '#3E2F2B',
      h2: '#FF5E7E',
      h3: tide,
      h4: '#FF8A5B',
      h5: '#6FAD3B',
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  semanticTokens: {
    variable: '#3E2F2B',
    'variable.defaultLibrary': '#5A4A45',
    parameter: '#8A6F65',
    property: '#3E2F2B',
    function: '#1A8AA6',
    method: '#1A8AA6',
    'function.defaultLibrary': tide,
    'method.defaultLibrary': tide,
    class: '#B34255',
    type: tide,
    interface: '#6FAD3B',
    enum: '#F0B429',
    enumMember: '#FF8A5B',
    namespace: tide,
    keyword: '#D8466F',
    modifier: '#B34255',
    operator: '#FF8A5B',
    comment: '#A68A80',
    string: '#6FAD3B',
    number: '#F0B429',
    regexp: '#FF5E7E',
    decorator: '#B34255',
    label: tide,
    macro: '#B34255',
    event: '#FF5E7E',
    typeParameter: tide
  },
  semanticHighlighting: true,
  htmlScheme: getHtmlColorScheme('arctic', 'light')
};
