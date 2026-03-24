/**
 * Theme: XELA Jarvis Command — Agentic Control
 * Type: dark
 * Personal pack: AI tooling, orchestration, and high-signal control surfaces.
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-jarvis-command',
  name: 'XELA Jarvis Command — Agentic Control',
  type: 'dark',
  roles: {
    surface0: '#08111A',
    surface1: '#0C1722',
    surface2: '#132131',
    surface3: '#1A2B40',
    panel: '#0B1520',
    overlay: '#08111AF2',
    backdrop: '#02060A99',
    border: '#22354B',
    focus: withAlpha('#58A6FF', 0.68),
    textPrimary: '#E7F2FF',
    textSecondary: '#B7CBE3',
    textMuted: '#6E879F',
    textInverted: '#08111A',
    accentPrimary: '#58A6FF',
    accentPrimaryAlt: '#7BE0FF',
    accentInfo: '#4FD6BE',
    accentWarn: '#FFB454',
    accentError: '#FF6B7A',
    accentSuccess: '#56D364',
    accentSelection: withAlpha('#58A6FF', 0.22),
    accentLink: '#7BE0FF'
  },
  colorOverrides: {
    'terminal.background': '#050B12',
    'terminal.foreground': '#DDEBFA',
    'terminal.ansiBlack': '#050B12',
    'terminal.ansiRed': '#FF6B7A',
    'terminal.ansiGreen': '#56D364',
    'terminal.ansiYellow': '#FFB454',
    'terminal.ansiBlue': '#58A6FF',
    'terminal.ansiMagenta': '#9B8CFF',
    'terminal.ansiCyan': '#7BE0FF',
    'terminal.ansiWhite': '#C9D9EA',
    'terminal.ansiBrightBlack': '#4E647A',
    'terminal.ansiBrightRed': '#FF9AA5',
    'terminal.ansiBrightGreen': '#7EE28A',
    'terminal.ansiBrightYellow': '#FFD08A',
    'terminal.ansiBrightBlue': '#8FC2FF',
    'terminal.ansiBrightMagenta': '#C4B9FF',
    'terminal.ansiBrightCyan': '#A6EDFF',
    'terminal.ansiBrightWhite': '#F7FBFF',
    'terminalCursor.foreground': '#58A6FF',
    'terminal.selectionBackground': '#17324E',
    'statusBar.background': '#0F1E2D',
    'statusBar.foreground': '#E7F2FF',
    'activityBar.activeBorder': '#7BE0FF',
    'tab.activeBorderTop': '#58A6FF'
  },
  tokens(c) {
    return {
      comment: '#5F748B',
      keyword: c.accentPrimary,
      function: c.accentInfo,
      variable: c.textPrimary,
      string: c.accentSuccess,
      number: c.accentWarn,
      constant: '#9B8CFF',
      storage: c.accentPrimary,
      type: c.accentPrimaryAlt,
      punctuation: c.textSecondary,
      invalid: c.accentError,
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: '#8FC2FF',
      h2: c.accentInfo,
      h3: '#9B8CFF',
      h4: c.accentSuccess,
      h5: c.accentWarn,
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  htmlScheme: getHtmlColorScheme('black', 'dark')
};
