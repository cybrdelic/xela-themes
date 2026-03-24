/**
 * Theme: XELA Shadernetic Flux — Render Lab
 * Type: dark
 * Personal pack: WebGPU, shaders, simulation, and visual systems work.
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-shadernetic-flux',
  name: 'XELA Shadernetic Flux — Render Lab',
  type: 'dark',
  roles: {
    surface0: '#050816',
    surface1: '#0A1020',
    surface2: '#141B33',
    surface3: '#1B2547',
    panel: '#09101E',
    overlay: '#050816F2',
    backdrop: '#02040A99',
    border: '#24345C',
    focus: withAlpha('#57D4FF', 0.7),
    textPrimary: '#F3F7FF',
    textSecondary: '#C1D0F8',
    textMuted: '#7E90BA',
    textInverted: '#050816',
    accentPrimary: '#57D4FF',
    accentPrimaryAlt: '#B680FF',
    accentInfo: '#FF8A5B',
    accentWarn: '#FFD166',
    accentError: '#FF5D87',
    accentSuccess: '#43E1A8',
    accentSelection: withAlpha('#57D4FF', 0.2),
    accentLink: '#B680FF'
  },
  colorOverrides: {
    'terminal.background': '#040613',
    'terminal.foreground': '#EAF2FF',
    'terminal.ansiBlack': '#040613',
    'terminal.ansiRed': '#FF5D87',
    'terminal.ansiGreen': '#43E1A8',
    'terminal.ansiYellow': '#FFD166',
    'terminal.ansiBlue': '#57D4FF',
    'terminal.ansiMagenta': '#B680FF',
    'terminal.ansiCyan': '#6EF0FF',
    'terminal.ansiWhite': '#DAE7FF',
    'terminal.ansiBrightBlack': '#58688D',
    'terminal.ansiBrightRed': '#FF8EAB',
    'terminal.ansiBrightGreen': '#79F0C0',
    'terminal.ansiBrightYellow': '#FFE39A',
    'terminal.ansiBrightBlue': '#8BE4FF',
    'terminal.ansiBrightMagenta': '#D1AEFF',
    'terminal.ansiBrightCyan': '#A4F7FF',
    'terminal.ansiBrightWhite': '#FFFFFF',
    'terminalCursor.foreground': '#57D4FF',
    'terminal.selectionBackground': '#1A2C4F',
    'statusBar.background': '#0B1330',
    'statusBar.foreground': '#F3F7FF',
    'activityBar.activeBorder': '#57D4FF',
    'tab.activeBorderTop': '#57D4FF'
  },
  tokens(c) {
    return {
      comment: '#69789E',
      keyword: c.accentPrimaryAlt,
      function: c.accentPrimary,
      variable: c.textPrimary,
      string: c.accentSuccess,
      number: c.accentWarn,
      constant: c.accentInfo,
      storage: c.accentPrimaryAlt,
      type: '#8DE7FF',
      punctuation: c.textSecondary,
      invalid: c.accentError,
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: '#8DE7FF',
      h2: c.accentPrimaryAlt,
      h3: c.accentInfo,
      h4: c.accentSuccess,
      h5: c.accentWarn,
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  htmlScheme: getHtmlColorScheme('matrix', 'dark')
};
