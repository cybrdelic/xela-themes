/**
 * Theme: XELA Portfolio Grid — Editorial Systems
 * Type: light
 * Personal pack: portfolio, product clarity, typography, and structured visual design.
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-portfolio-grid',
  name: 'XELA Portfolio Grid — Editorial Systems',
  type: 'light',
  roles: {
    surface0: '#F7F4EE',
    surface1: '#F0EADF',
    surface2: '#E6DDCE',
    surface3: '#D7C8B4',
    panel: '#F3EEE6',
    overlay: '#F7F4EEF2',
    backdrop: '#FFFDF9CC',
    border: '#CDB9A1',
    focus: withAlpha('#1D5CFF', 0.62),
    textPrimary: '#1C222B',
    textSecondary: '#394455',
    textMuted: '#6F7685',
    textInverted: '#FFFDFC',
    accentPrimary: '#1D5CFF',
    accentPrimaryAlt: '#D06F45',
    accentInfo: '#0F8B8D',
    accentWarn: '#B7791F',
    accentError: '#C44536',
    accentSuccess: '#2F855A',
    accentSelection: withAlpha('#1D5CFF', 0.16),
    accentLink: '#1D5CFF'
  },
  colorOverrides: {
    'terminal.background': '#FCFAF6',
    'terminal.foreground': '#1C222B',
    'terminal.ansiBlack': '#1C222B',
    'terminal.ansiRed': '#C44536',
    'terminal.ansiGreen': '#2F855A',
    'terminal.ansiYellow': '#B7791F',
    'terminal.ansiBlue': '#1D5CFF',
    'terminal.ansiMagenta': '#8B5CF6',
    'terminal.ansiCyan': '#0F8B8D',
    'terminal.ansiWhite': '#FCFAF6',
    'terminal.ansiBrightBlack': '#6F7685',
    'terminal.ansiBrightRed': '#E06455',
    'terminal.ansiBrightGreen': '#3FA870',
    'terminal.ansiBrightYellow': '#D39536',
    'terminal.ansiBrightBlue': '#4C7BFF',
    'terminal.ansiBrightMagenta': '#A585FF',
    'terminal.ansiBrightCyan': '#2DA8AA',
    'terminal.ansiBrightWhite': '#FFFFFF',
    'terminalCursor.foreground': '#1D5CFF',
    'terminal.selectionBackground': '#D9E4FF',
    'statusBar.background': '#E8E0D3',
    'statusBar.foreground': '#1C222B',
    'activityBar.activeBorder': '#1D5CFF',
    'tab.activeBorderTop': '#1D5CFF'
  },
  tokens(c) {
    return {
      comment: '#7A818F',
      keyword: c.accentPrimary,
      function: c.accentInfo,
      variable: c.textPrimary,
      string: c.accentSuccess,
      number: c.accentWarn,
      constant: c.accentPrimaryAlt,
      storage: c.accentPrimary,
      type: '#7553D9',
      punctuation: c.textSecondary,
      invalid: c.accentError,
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: c.accentPrimary,
      h2: c.accentInfo,
      h3: c.accentPrimaryAlt,
      h4: c.accentSuccess,
      h5: c.accentWarn,
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  htmlScheme: getHtmlColorScheme('graph-paper', 'light')
};
