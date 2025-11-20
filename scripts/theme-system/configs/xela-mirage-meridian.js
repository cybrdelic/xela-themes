/**
 * Theme: XELA Mirage Meridian — Dusk Lagoon Geometry
 * Type: dark
 * Palette cues: Omar Aqil x Lucho Poletti desert cyan gradients
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

const ember = '#FF914D';
const tide = '#1FB9C0';

export default {
  id: 'xela-mirage-meridian',
  name: 'XELA Mirage Meridian — Dusk Lagoon Geometry',
  type: 'dark',
  roles: {
    surface0: '#02161D',
    surface1: '#041E26',
    surface2: '#072933',
    surface3: '#0D3946',
    panel: '#07252F',
    overlay: withAlpha('#02161D', 0.9),
    backdrop: withAlpha('#01090C', 0.75),
    border: '#134653',
    focus: withAlpha(tide, 0.65),
    textPrimary: '#E6F7F8',
    textSecondary: '#B7E4E8',
    textMuted: '#6FA4A9',
    textInverted: '#03181F',
    accentPrimary: ember,
    accentPrimaryAlt: '#FF5A82',
    accentInfo: tide,
    accentWarn: '#FFC75F',
    accentError: '#FF4E5C',
    accentSuccess: '#89D47A',
    accentSelection: withAlpha(tide, 0.22),
    accentLink: '#4CD8E0'
  },
  colorOverrides: {},
  tokens(c) {
    return {
      comment: '#5F8890',
      keyword: '#FF5A82',
      function: '#FFB670',
      variable: c.textPrimary,
      string: '#89D47A',
      number: ember,
      constant: '#FFC75F',
      storage: '#FF5A82',
      type: tide,
      punctuation: c.textPrimary,
      invalid: '#FF4E5C',
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: '#E6F7F8',
      h2: '#FF914D',
      h3: '#FF5A82',
      h4: tide,
      h5: '#FFC75F',
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  semanticTokens: {
    variable: '#E6F7F8',
    'variable.defaultLibrary': '#B7E4E8',
    parameter: '#8FC8CB',
    property: '#E6F7F8',
    function: '#FFB670',
    method: '#FFB670',
    'function.defaultLibrary': '#FFD1A5',
    'method.defaultLibrary': '#FFD1A5',
    class: '#FF5A82',
    type: tide,
    interface: '#89D47A',
    enum: '#FFC75F',
    enumMember: '#FF914D',
    namespace: tide,
    keyword: '#FF5A82',
    modifier: '#FF5A82',
    operator: '#FFC75F',
    comment: '#5F8890',
    string: '#89D47A',
    number: ember,
    regexp: '#FF914D',
    decorator: '#FF4E5C',
    label: tide,
    macro: '#FF4E5C',
    event: '#FF914D',
    typeParameter: tide
  },
  semanticHighlighting: true,
  htmlScheme: getHtmlColorScheme('black', 'dark')
};
