/**
 * Theme: XELA Signal Watch — Reliability Deck
 * Type: dark
 * Personal pack: observability, watchdogs, perf triage, and operational focus.
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-signal-watch',
  name: 'XELA Signal Watch — Reliability Deck',
  type: 'dark',
  roles: {
    surface0: '#061018',
    surface1: '#0A1822',
    surface2: '#112432',
    surface3: '#173244',
    panel: '#0A151E',
    overlay: '#061018F2',
    backdrop: '#02070B99',
    border: '#214457',
    focus: withAlpha('#2EC4B6', 0.68),
    textPrimary: '#E8F8FF',
    textSecondary: '#BED7E3',
    textMuted: '#6C8E9C',
    textInverted: '#061018',
    accentPrimary: '#2EC4B6',
    accentPrimaryAlt: '#64E0D2',
    accentInfo: '#67B7FF',
    accentWarn: '#FFCC66',
    accentError: '#FF6B6B',
    accentSuccess: '#4ADE80',
    accentSelection: withAlpha('#2EC4B6', 0.2),
    accentLink: '#67B7FF'
  },
  colorOverrides: {
    'terminal.background': '#040C12',
    'terminal.foreground': '#DCEFF6',
    'terminal.ansiBlack': '#040C12',
    'terminal.ansiRed': '#FF6B6B',
    'terminal.ansiGreen': '#4ADE80',
    'terminal.ansiYellow': '#FFCC66',
    'terminal.ansiBlue': '#67B7FF',
    'terminal.ansiMagenta': '#6DD3C8',
    'terminal.ansiCyan': '#2EC4B6',
    'terminal.ansiWhite': '#DCEFF6',
    'terminal.ansiBrightBlack': '#587483',
    'terminal.ansiBrightRed': '#FF9A9A',
    'terminal.ansiBrightGreen': '#80E8A7',
    'terminal.ansiBrightYellow': '#FFDEA0',
    'terminal.ansiBrightBlue': '#9AD0FF',
    'terminal.ansiBrightMagenta': '#9CECE3',
    'terminal.ansiBrightCyan': '#7CEADF',
    'terminal.ansiBrightWhite': '#F8FDFF',
    'terminalCursor.foreground': '#2EC4B6',
    'terminal.selectionBackground': '#15303A',
    'statusBar.background': '#0E2430',
    'statusBar.foreground': '#E8F8FF',
    'activityBar.activeBorder': '#2EC4B6',
    'tab.activeBorderTop': '#2EC4B6'
  },
  tokens(c) {
    return {
      comment: '#64808D',
      keyword: c.accentPrimary,
      function: c.accentInfo,
      variable: c.textPrimary,
      string: c.accentSuccess,
      number: c.accentWarn,
      constant: c.accentPrimaryAlt,
      storage: c.accentPrimary,
      type: '#88D7FF',
      punctuation: c.textSecondary,
      invalid: c.accentError,
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: '#7CEADF',
      h2: c.accentInfo,
      h3: c.accentPrimaryAlt,
      h4: c.accentSuccess,
      h5: c.accentWarn,
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  htmlScheme: getHtmlColorScheme('night-vision', 'dark')
};
