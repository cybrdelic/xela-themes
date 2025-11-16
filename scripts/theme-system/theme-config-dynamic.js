// Dynamic Backgrounds Collection - 10 themes with varied shades and depth
import { getHtmlColorScheme } from './html-tokens.js';
import { withAlpha } from './roles.js';

export const dynamicThemes = [
  {
    id: 'xela-twilight-layers',
    name: 'XELA Twilight Layers — Depth & Dimension',
    type: 'dark',
    roles: {
      surface0: '#1A1D2E',      // Deep blue-grey editor
      surface1: '#13151F',      // Darker sidebar
      surface2: '#232842',      // Lighter panels
      surface3: '#2D3454',      // Elevated elements
      panel: '#0F1118',         // Darkest panel
      overlay: '#1A1D2EF2',
      backdrop: '#00000099',
      border: '#2D3454',
      focus: withAlpha('#6C8EEF', 0.7),
      textPrimary: '#E5E9F0',
      textSecondary: '#D8DEE9',
      textMuted: '#81889F',
      textInverted: '#1A1D2E',
      accentPrimary: '#6C8EEF',
      accentPrimaryAlt: '#88C0D0',
      accentInfo: '#5BA8D9',
      accentWarn: '#EBCB8B',
      accentError: '#D57780',
      accentSuccess: '#A3BE8C',
      accentSelection: withAlpha('#6C8EEF', 0.22),
      accentLink: '#88C0D0'
    },
    tokens(c) {
      return {
        comment: '#616E88',
        keyword: '#B48EAD',
        function: '#88C0D0',
        variable: '#D8DEE9',
        string: '#A3BE8C',
        number: '#EBCB8B',
        constant: '#B48EAD',
        storage: '#81A1C1',
        type: '#6C8EEF',
        punctuation: '#D8DEE9',
        invalid: '#D57780',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#88C0D0',
        h2: '#6C8EEF',
        h3: '#A3BE8C',
        h4: '#EBCB8B',
        h5: '#B48EAD',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('twilight', 'dark')
  },

  {
    id: 'xela-cafe-au-lait',
    name: 'XELA Café au Lait — Warm Gradient',
    type: 'light',
    roles: {
      surface0: '#F5F0E8',      // Lightest cream editor
      surface1: '#E8DFD0',      // Medium sidebar
      surface2: '#FBF7F0',      // Bright panels
      surface3: '#DFD3BD',      // Darker elements
      panel: '#FFFCF7',         // Brightest panel
      overlay: '#F5F0E8F2',
      backdrop: '#F5F0E899',
      border: '#D4C4A8',
      focus: withAlpha('#9B7653', 0.7),
      textPrimary: '#3E3228',
      textSecondary: '#564940',
      textMuted: '#8B7D6B',
      textInverted: '#FBF7F0',
      accentPrimary: '#9B7653',
      accentPrimaryAlt: '#B89068',
      accentInfo: '#6B9E9E',
      accentWarn: '#D4A373',
      accentError: '#C26B5F',
      accentSuccess: '#8FA876',
      accentSelection: withAlpha('#9B7653', 0.18),
      accentLink: '#6B9E9E'
    },
    tokens(c) {
      return {
        comment: '#A59583',
        keyword: '#9B7653',
        function: '#6B9E9E',
        variable: '#3E3228',
        string: '#8FA876',
        number: '#D4A373',
        constant: '#B89068',
        storage: '#9B7653',
        type: '#6B9E9E',
        punctuation: '#564940',
        invalid: '#C26B5F',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#3E3228',
        h2: '#6B9E9E',
        h3: '#8FA876',
        h4: '#D4A373',
        h5: '#B89068',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('cafe', 'light')
  },

  {
    id: 'xela-midnight-gradient',
    name: 'XELA Midnight Gradient — Deep Layers',
    type: 'dark',
    roles: {
      surface0: '#0D1117',      // Darkest editor
      surface1: '#161B22',      // Medium sidebar
      surface2: '#1C2128',      // Lighter panels
      surface3: '#2D333B',      // Elevated
      panel: '#0A0E14',         // Ultra dark panel
      overlay: '#0D1117F2',
      backdrop: '#00000099',
      border: '#30363D',
      focus: withAlpha('#58A6FF', 0.7),
      textPrimary: '#C9D1D9',
      textSecondary: '#B1BAC4',
      textMuted: '#8B949E',
      textInverted: '#0D1117',
      accentPrimary: '#58A6FF',
      accentPrimaryAlt: '#79C0FF',
      accentInfo: '#56D4DD',
      accentWarn: '#F0883E',
      accentError: '#F85149',
      accentSuccess: '#56D364',
      accentSelection: withAlpha('#58A6FF', 0.2),
      accentLink: '#79C0FF'
    },
    tokens(c) {
      return {
        comment: '#8B949E',
        keyword: '#FF7B72',
        function: '#D2A8FF',
        variable: '#79C0FF',
        string: '#A5D6FF',
        number: '#79C0FF',
        constant: '#79C0FF',
        storage: '#FF7B72',
        type: '#FFA657',
        punctuation: '#C9D1D9',
        invalid: '#F85149',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#79C0FF',
        h2: '#D2A8FF',
        h3: '#56D364',
        h4: '#F0883E',
        h5: '#FF7B72',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('midnight', 'dark')
  },

  {
    id: 'xela-sand-dune',
    name: 'XELA Sand Dune — Desert Warmth',
    type: 'light',
    roles: {
      surface0: '#FAF6F1',      // Warm sand editor
      surface1: '#EFE7DC',      // Darker sidebar
      surface2: '#FFFBF5',      // Lightest panels
      surface3: '#E2D5C3',      // Medium elements
      panel: '#FFFEFC',         // Brightest
      overlay: '#FAF6F1F2',
      backdrop: '#FAF6F199',
      border: '#D8C9B5',
      focus: withAlpha('#A67C52', 0.7),
      textPrimary: '#3A2F23',
      textSecondary: '#51443A',
      textMuted: '#8A7B6C',
      textInverted: '#FAF6F1',
      accentPrimary: '#A67C52',
      accentPrimaryAlt: '#C9985E',
      accentInfo: '#6A9AB0',
      accentWarn: '#D9A05B',
      accentError: '#C46752',
      accentSuccess: '#7FA36B',
      accentSelection: withAlpha('#A67C52', 0.16),
      accentLink: '#6A9AB0'
    },
    tokens(c) {
      return {
        comment: '#9B8A77',
        keyword: '#A67C52',
        function: '#6A9AB0',
        variable: '#3A2F23',
        string: '#7FA36B',
        number: '#D9A05B',
        constant: '#C9985E',
        storage: '#A67C52',
        type: '#6A9AB0',
        punctuation: '#51443A',
        invalid: '#C46752',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#3A2F23',
        h2: '#6A9AB0',
        h3: '#7FA36B',
        h4: '#D9A05B',
        h5: '#C9985E',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('sand', 'light')
  },

  {
    id: 'xela-ocean-depths',
    name: 'XELA Ocean Depths — Blue Gradient',
    type: 'dark',
    roles: {
      surface0: '#0B2942',      // Deep ocean editor
      surface1: '#082137',      // Darker sidebar
      surface2: '#0E3450',      // Lighter panels
      surface3: '#134060',      // Elevated
      panel: '#051829',         // Deepest
      overlay: '#0B2942F2',
      backdrop: '#00000099',
      border: '#1B4D6F',
      focus: withAlpha('#4FB8D6', 0.7),
      textPrimary: '#D4E8F0',
      textSecondary: '#B8D4E0',
      textMuted: '#6B95AB',
      textInverted: '#082137',
      accentPrimary: '#4FB8D6',
      accentPrimaryAlt: '#6DCCE3',
      accentInfo: '#52D1E8',
      accentWarn: '#F2B866',
      accentError: '#E76F6F',
      accentSuccess: '#6DD4A0',
      accentSelection: withAlpha('#4FB8D6', 0.24),
      accentLink: '#6DCCE3'
    },
    tokens(c) {
      return {
        comment: '#5C8299',
        keyword: '#8BB3D6',
        function: '#6DCCE3',
        variable: '#B8D4E0',
        string: '#6DD4A0',
        number: '#F2B866',
        constant: '#8BB3D6',
        storage: '#8BB3D6',
        type: '#52D1E8',
        punctuation: '#D4E8F0',
        invalid: '#E76F6F',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#6DCCE3',
        h2: '#4FB8D6',
        h3: '#6DD4A0',
        h4: '#F2B866',
        h5: '#8BB3D6',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('ocean', 'dark')
  },

  {
    id: 'xela-lavender-mist',
    name: 'XELA Lavender Mist — Soft Purple Hues',
    type: 'light',
    roles: {
      surface0: '#F7F4FA',      // Soft lavender editor
      surface1: '#EDE8F2',      // Medium sidebar
      surface2: '#FDFBFF',      // Lightest panels
      surface3: '#E1D9EA',      // Darker elements
      panel: '#FFFEFF',         // Pure white panel
      overlay: '#F7F4FAF2',
      backdrop: '#F7F4FA99',
      border: '#D6CBDF',
      focus: withAlpha('#8B7AA8', 0.7),
      textPrimary: '#352E42',
      textSecondary: '#4D445E',
      textMuted: '#7D7088',
      textInverted: '#F7F4FA',
      accentPrimary: '#8B7AA8',
      accentPrimaryAlt: '#A594C0',
      accentInfo: '#6A9FBA',
      accentWarn: '#C9A66E',
      accentError: '#C96B78',
      accentSuccess: '#7FA587',
      accentSelection: withAlpha('#8B7AA8', 0.18),
      accentLink: '#6A9FBA'
    },
    tokens(c) {
      return {
        comment: '#9688A6',
        keyword: '#8B7AA8',
        function: '#6A9FBA',
        variable: '#352E42',
        string: '#7FA587',
        number: '#C9A66E',
        constant: '#A594C0',
        storage: '#8B7AA8',
        type: '#6A9FBA',
        punctuation: '#4D445E',
        invalid: '#C96B78',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#352E42',
        h2: '#6A9FBA',
        h3: '#7FA587',
        h4: '#C9A66E',
        h5: '#A594C0',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('lavender', 'light')
  },

  {
    id: 'xela-forest-floor',
    name: 'XELA Forest Floor — Earthy Greens',
    type: 'dark',
    roles: {
      surface0: '#1C2320',      // Dark forest editor
      surface1: '#151A17',      // Darker sidebar
      surface2: '#242D28',      // Lighter panels
      surface3: '#2D3832',      // Elevated
      panel: '#0F1311',         // Darkest
      overlay: '#1C2320F2',
      backdrop: '#00000099',
      border: '#2D3832',
      focus: withAlpha('#7FB069', 0.7),
      textPrimary: '#D9E4DB',
      textSecondary: '#BFD1C2',
      textMuted: '#7D9080',
      textInverted: '#1C2320',
      accentPrimary: '#7FB069',
      accentPrimaryAlt: '#97C87F',
      accentInfo: '#6ABFB8',
      accentWarn: '#D9B881',
      accentError: '#C97777',
      accentSuccess: '#8FBF7A',
      accentSelection: withAlpha('#7FB069', 0.22),
      accentLink: '#6ABFB8'
    },
    tokens(c) {
      return {
        comment: '#5E7862',
        keyword: '#97C87F',
        function: '#6ABFB8',
        variable: '#BFD1C2',
        string: '#8FBF7A',
        number: '#D9B881',
        constant: '#97C87F',
        storage: '#7FB069',
        type: '#6ABFB8',
        punctuation: '#D9E4DB',
        invalid: '#C97777',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#97C87F',
        h2: '#6ABFB8',
        h3: '#8FBF7A',
        h4: '#D9B881',
        h5: '#7FB069',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('forest', 'dark')
  },

  {
    id: 'xela-rose-quartz',
    name: 'XELA Rose Quartz — Gentle Pink',
    type: 'light',
    roles: {
      surface0: '#FCF7F8',      // Soft pink editor
      surface1: '#F4EBF0',      // Medium sidebar
      surface2: '#FFFCFD',      // Lightest panels
      surface3: '#E8DCE3',      // Darker elements
      panel: '#FFFEFF',         // Pure white
      overlay: '#FCF7F8F2',
      backdrop: '#FCF7F899',
      border: '#DFD0D9',
      focus: withAlpha('#B07890', 0.7),
      textPrimary: '#3B2F35',
      textSecondary: '#52424B',
      textMuted: '#847179',
      textInverted: '#FCF7F8',
      accentPrimary: '#B07890',
      accentPrimaryAlt: '#C992A8',
      accentInfo: '#6F9EB8',
      accentWarn: '#CCA66F',
      accentError: '#C96B6B',
      accentSuccess: '#82A880',
      accentSelection: withAlpha('#B07890', 0.16),
      accentLink: '#6F9EB8'
    },
    tokens(c) {
      return {
        comment: '#9B8792',
        keyword: '#B07890',
        function: '#6F9EB8',
        variable: '#3B2F35',
        string: '#82A880',
        number: '#CCA66F',
        constant: '#C992A8',
        storage: '#B07890',
        type: '#6F9EB8',
        punctuation: '#52424B',
        invalid: '#C96B6B',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#3B2F35',
        h2: '#6F9EB8',
        h3: '#82A880',
        h4: '#CCA66F',
        h5: '#C992A8',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('rose', 'light')
  },

  {
    id: 'xela-ember-glow',
    name: 'XELA Ember Glow — Warm Fire',
    type: 'dark',
    roles: {
      surface0: '#2A1F1A',      // Warm dark editor
      surface1: '#221813',      // Darker sidebar
      surface2: '#342620',      // Lighter panels
      surface3: '#3F2E27',      // Elevated
      panel: '#1B120D',         // Darkest
      overlay: '#2A1F1AF2',
      backdrop: '#00000099',
      border: '#4A3830',
      focus: withAlpha('#E89B68', 0.7),
      textPrimary: '#E8D5C8',
      textSecondary: '#D4BFB0',
      textMuted: '#9D8477',
      textInverted: '#2A1F1A',
      accentPrimary: '#E89B68',
      accentPrimaryAlt: '#F2B380',
      accentInfo: '#7FAFBA',
      accentWarn: '#E8C070',
      accentError: '#D87070',
      accentSuccess: '#8FB87A',
      accentSelection: withAlpha('#E89B68', 0.2),
      accentLink: '#7FAFBA'
    },
    tokens(c) {
      return {
        comment: '#7B6A5E',
        keyword: '#F2B380',
        function: '#7FAFBA',
        variable: '#D4BFB0',
        string: '#8FB87A',
        number: '#E8C070',
        constant: '#E89B68',
        storage: '#F2B380',
        type: '#7FAFBA',
        punctuation: '#E8D5C8',
        invalid: '#D87070',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#F2B380',
        h2: '#7FAFBA',
        h3: '#8FB87A',
        h4: '#E8C070',
        h5: '#E89B68',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('ember', 'dark')
  },

  {
    id: 'xela-mint-cream',
    name: 'XELA Mint Cream — Fresh Coolness',
    type: 'light',
    roles: {
      surface0: '#F5FAF8',      // Mint editor
      surface1: '#E9F3EF',      // Medium sidebar
      surface2: '#FCFFFD',      // Lightest panels
      surface3: '#DDEAE4',      // Darker elements
      panel: '#FEFFFF',         // Pure white
      overlay: '#F5FAF8F2',
      backdrop: '#F5FAF899',
      border: '#D0E0D9',
      focus: withAlpha('#5FA888', 0.7),
      textPrimary: '#283832',
      textSecondary: '#3E4F47',
      textMuted: '#6E847A',
      textInverted: '#F5FAF8',
      accentPrimary: '#5FA888',
      accentPrimaryAlt: '#7AC09E',
      accentInfo: '#6AA8C7',
      accentWarn: '#C8A86E',
      accentError: '#C87070',
      accentSuccess: '#6EB88A',
      accentSelection: withAlpha('#5FA888', 0.18),
      accentLink: '#6AA8C7'
    },
    tokens(c) {
      return {
        comment: '#8B9D94',
        keyword: '#5FA888',
        function: '#6AA8C7',
        variable: '#283832',
        string: '#6EB88A',
        number: '#C8A86E',
        constant: '#7AC09E',
        storage: '#5FA888',
        type: '#6AA8C7',
        punctuation: '#3E4F47',
        invalid: '#C87070',
        code: c.textPrimary,
        heading: c.accentPrimary,
        h1: '#283832',
        h2: '#6AA8C7',
        h3: '#6EB88A',
        h4: '#C8A86E',
        h5: '#7AC09E',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('mint', 'light')
  }
];
