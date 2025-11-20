/**
 * Theme: XELA Atelier Prisma — Chromatic Kinetic Studio
 * Type: dark
 * Palette cues: Studio Dumbar + Vasava poster gradients
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

const ultraviolet = '#FF7FE5';
const cyanVeil = '#6EFEF5';

export default {
  id: 'xela-atelier-prisma',
  name: 'XELA Atelier Prisma — Chromatic Kinetic Studio',
  type: 'dark',
  roles: {
    surface0: '#050311',
    surface1: '#090824',
    surface2: '#13123A',
    surface3: '#1E1C4F',
    panel: '#0D0C2F',
    overlay: withAlpha('#050311', 0.93),
    backdrop: withAlpha('#010006', 0.74),
    border: '#2E2B54',
    focus: withAlpha(cyanVeil, 0.7),
    textPrimary: '#F6F3FF',
    textSecondary: '#D8D2FF',
    textMuted: '#9D96CC',
    textInverted: '#050311',
    accentPrimary: ultraviolet,
    accentPrimaryAlt: cyanVeil,
    accentInfo: '#8FD4FF',
    accentWarn: '#FFB966',
    accentError: '#FF4E81',
    accentSuccess: '#58FFC8',
    accentSelection: withAlpha(cyanVeil, 0.22),
    accentLink: '#7EE0FF'
  },
  colorOverrides: {},
  tokens(c) {
    return {
      comment: '#7B78A8',
      keyword: ultraviolet,
      function: cyanVeil,
      variable: c.textPrimary,
      string: '#58FFC8',
      number: '#FFB966',
      constant: '#F7A8FF',
      storage: '#FF4E81',
      type: '#8FD4FF',
      punctuation: c.textPrimary,
      invalid: '#FF5F8E',
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: '#F6F3FF',
      h2: '#FF7FE5',
      h3: '#6EFEF5',
      h4: '#58FFC8',
      h5: '#FFB966',
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  semanticTokens: {
    variable: '#F6F3FF',
    'variable.defaultLibrary': '#D8D2FF',
    parameter: '#B7B1E0',
    property: '#EDE9FF',
    function: '#6EFEF5',
    method: '#6EFEF5',
    'function.defaultLibrary': '#8FD4FF',
    'method.defaultLibrary': '#8FD4FF',
    class: '#F7A8FF',
    type: '#8FD4FF',
    interface: '#C0B2FF',
    enum: '#FFB966',
    enumMember: '#F7A8FF',
    namespace: '#8FD4FF',
    keyword: ultraviolet,
    modifier: ultraviolet,
    operator: '#F7A8FF',
    comment: '#7B78A8',
    string: '#58FFC8',
    number: '#FFB966',
    regexp: '#E8FF9C',
    decorator: '#FF4E81',
    label: '#7EE0FF',
    macro: '#FF4E81',
    event: '#6EFEF5',
    typeParameter: '#8FD4FF'
  },
  semanticHighlighting: true,
  htmlScheme: getHtmlColorScheme('black', 'dark')
};
