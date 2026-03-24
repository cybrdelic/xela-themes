/**
 * Theme: XELA Runtime Forge — Systems Heat
 * Type: dark
 * Personal pack: harness work, infrastructure, and engine discipline.
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-runtime-forge',
  name: 'XELA Runtime Forge — Systems Heat',
  type: 'dark',
  roles: {
    surface0: '#110E0B',
    surface1: '#17120E',
    surface2: '#221914',
    surface3: '#2E231B',
    panel: '#140F0C',
    overlay: '#110E0BF2',
    backdrop: '#04030299',
    border: '#473222',
    focus: withAlpha('#FF8A3D', 0.68),
    textPrimary: '#F2E7DB',
    textSecondary: '#D6C1AD',
    textMuted: '#A69384',
    textInverted: '#110E0B',
    accentPrimary: '#FF8A3D',
    accentPrimaryAlt: '#FFB067',
    accentInfo: '#72B7FF',
    accentWarn: '#FFD166',
    accentError: '#FF6A4D',
    accentSuccess: '#65D192',
    accentSelection: withAlpha('#FF8A3D', 0.2),
    accentLink: '#72B7FF'
  },
  colorOverrides: {
    'terminal.background': '#0D0907',
    'terminal.foreground': '#E8D8C8',
    'terminal.ansiBlack': '#0D0907',
    'terminal.ansiRed': '#FF6A4D',
    'terminal.ansiGreen': '#65D192',
    'terminal.ansiYellow': '#FFD166',
    'terminal.ansiBlue': '#72B7FF',
    'terminal.ansiMagenta': '#D08CFF',
    'terminal.ansiCyan': '#7BDFF6',
    'terminal.ansiWhite': '#E8D8C8',
    'terminal.ansiBrightBlack': '#6E5A4C',
    'terminal.ansiBrightRed': '#FF9A84',
    'terminal.ansiBrightGreen': '#93E5AF',
    'terminal.ansiBrightYellow': '#FFE09A',
    'terminal.ansiBrightBlue': '#9ED1FF',
    'terminal.ansiBrightMagenta': '#E2B4FF',
    'terminal.ansiBrightCyan': '#A8F0FF',
    'terminal.ansiBrightWhite': '#FFF7F1',
    'terminalCursor.foreground': '#FF8A3D',
    'terminal.selectionBackground': '#3B2417',
    'statusBar.background': '#2A1D15',
    'statusBar.foreground': '#F2E7DB',
    'activityBar.activeBorder': '#FFB067',
    'tab.activeBorderTop': '#FF8A3D'
  },
  tokens(c) {
    return {
      comment: '#847261',
      keyword: c.accentPrimary,
      function: c.accentInfo,
      variable: c.textPrimary,
      string: c.accentSuccess,
      number: c.accentWarn,
      constant: c.accentPrimaryAlt,
      storage: c.accentPrimary,
      type: '#D6B2FF',
      punctuation: c.textSecondary,
      invalid: c.accentError,
      code: c.textPrimary,
      heading: c.accentPrimary,
      h1: '#FFC28A',
      h2: c.accentInfo,
      h3: '#D6B2FF',
      h4: c.accentSuccess,
      h5: c.accentWarn,
      h6: c.textMuted,
      textPrimary: c.textPrimary
    };
  },
  htmlScheme: getHtmlColorScheme('night-vision', 'dark')
};
