/**
 * Theme: XELA Resonance Studio — Creative Nights
 * Type: dark
 * Personal pack: music, visual experiments, and expressive late-night making.
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-resonance-studio',
  name: 'XELA Resonance Studio — Creative Nights',
  type: 'dark',
  roles: {
    surface0: '#120B16',
    surface1: '#1A1020',
    surface2: '#26152E',
    surface3: '#34203E',
    panel: '#170D1C',
    overlay: '#120B16F2',
    backdrop: '#05030799',
    border: '#493154',
    focus: withAlpha('#FF6FAE', 0.7),
    textPrimary: '#F6EDF7',
    textSecondary: '#D8C3DB',
    textMuted: '#A189A4',
    textInverted: '#120B16',
    accentPrimary: '#FF6FAE',
    accentPrimaryAlt: '#7CF7E1',
    accentInfo: '#8A7CFF',
    accentWarn: '#FFCF70',
    accentError: '#FF6B6B',
    accentSuccess: '#43D9A3',
    accentSelection: withAlpha('#FF6FAE', 0.18),
    accentLink: '#7CF7E1'
  },
  colorOverrides: {
    'terminal.background': '#100913',
    'terminal.foreground': '#F1E6F2',
    'terminal.ansiBlack': '#100913',
    'terminal.ansiRed': '#FF6B6B',
    'terminal.ansiGreen': '#43D9A3',
    'terminal.ansiYellow': '#FFCF70',
    'terminal.ansiBlue': '#8A7CFF',
    'terminal.ansiMagenta': '#FF6FAE',
    'terminal.ansiCyan': '#7CF7E1',
    'terminal.ansiWhite': '#E9DCEE',
    'terminal.ansiBrightBlack': '#745E78',
    'terminal.ansiBrightRed': '#FF9A9A',
    'terminal.ansiBrightGreen': '#74E8BC',
    'terminal.ansiBrightYellow': '#FFE09E',
    'terminal.ansiBrightBlue': '#B1A8FF',
    'terminal.ansiBrightMagenta': '#FF9BC8',
    'terminal.ansiBrightCyan': '#A7FFF1',
    'terminal.ansiBrightWhite': '#FFF8FF',
    'terminalCursor.foreground': '#FF6FAE',
    'terminal.selectionBackground': '#3A1E39',
    'statusBar.background': '#24122C',
    'statusBar.foreground': '#F6EDF7',
    'activityBar.activeBorder': '#FF6FAE',
    'tab.activeBorderTop': '#FF6FAE'
  },
  tokens(c) {
    return {
      comment: '#8A748F',
      keyword: c.accentPrimary,
      function: c.accentInfo,
      variable: c.textPrimary,
      string: c.accentSuccess,
      number: c.accentWarn,
      constant: c.accentPrimaryAlt,
      storage: c.accentPrimary,
      type: '#B1A8FF',
      punctuation: c.textSecondary,
      invalid: c.accentError,
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: '#FF9BC8',
      h2: c.accentInfo,
      h3: c.accentPrimaryAlt,
      h4: c.accentSuccess,
      h5: c.accentWarn,
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  htmlScheme: getHtmlColorScheme('black', 'dark')
};
