/**
 * XELA Refined Collection
 * 10 Premium Themes - Superior Readability, Exceptional UX, Professional Polish
 * Focus: Typography clarity, visual hierarchy, eye comfort, designer aesthetics
 */

import { getHtmlColorScheme } from './html-tokens.js';
import { withAlpha } from './roles.js';

export const refinedThemes = [
  // 1. STUDIO PRO - Professional design tool aesthetic
  {
    id: 'xela-studio-pro',
    name: 'XELA Studio Pro — Designer Workspace',
    type: 'dark',
    roles: {
      surface0: '#1C1C1E',      // Neutral charcoal editor
      surface1: '#161618',      // Darker sidebar (depth)
      surface2: '#222224',      // Lighter panels (elevation)
      surface3: '#2A2A2D',      // Elevated elements
      panel: '#121214',         // Deep terminal
      overlay: '#1C1C1EF5',
      backdrop: '#00000099',
      border: '#3A3A3D',
      focus: withAlpha('#0A84FF', 0.6),
      textPrimary: '#ECECED',   // High contrast
      textSecondary: '#C7C7C9',
      textMuted: '#8E8E93',
      textInverted: '#1C1C1E',
      accentPrimary: '#0A84FF',  // iOS system blue
      accentPrimaryAlt: '#409CFF',
      accentInfo: '#5AC8FA',
      accentWarn: '#FF9F0A',
      accentError: '#FF453A',
      accentSuccess: '#32D74B',
      accentSelection: withAlpha('#0A84FF', 0.20),
      accentLink: '#409CFF'
    },
    colorOverrides: {
      // Professional depth hierarchy
      'titleBar.activeBackground': '#0E0E10',
      'activityBar.background': '#121214',
      'sideBar.background': '#161618',
      'editorGroupHeader.tabsBackground': '#161618',
      'tab.inactiveBackground': '#121214',
      'tab.activeBackground': '#1C1C1E',
      'statusBar.background': '#0E0E10',
      'panel.background': '#121214',

      // Enhanced readability
      'editor.lineHighlightBackground': '#2A2A2D40',
      'editorLineNumber.foreground': '#8E8E93',
      'editorLineNumber.activeForeground': '#C7C7C9',
      'editorIndentGuide.background': '#3A3A3D30',
      'editorIndentGuide.activeBackground': '#3A3A3D80',

      // Professional accents
      'tab.activeBorderTop': '#0A84FF',
      'activityBar.activeBorder': '#0A84FF',
      'focusBorder': '#0A84FF99',

      // Refined borders
      'sideBar.border': '#2A2A2D',
      'panel.border': '#2A2A2D',
      'editorGroup.border': '#2A2A2D',
      'tab.border': '#00000000',

      // Clear selections
      'list.activeSelectionBackground': '#2A2A2D',
      'list.hoverBackground': '#22222480',
      'list.inactiveSelectionBackground': '#22222460'
    },
    tokens(c) {
      return {
        comment: '#8E8E93',
        keyword: '#FF453A',
        function: '#409CFF',
        variable: '#ECECED',
        string: '#32D74B',
        number: '#FF9F0A',
        constant: '#5AC8FA',
        storage: '#FF453A',
        type: '#5AC8FA',
        punctuation: '#C7C7C9',
        invalid: '#FF453A',
        code: c.textPrimary,
        heading: '#409CFF',
        h1: '#409CFF',
        h2: '#5AC8FA',
        h3: '#32D74B',
        h4: '#FF9F0A',
        h5: '#C7C7C9',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('studio-pro', 'dark')
  },

  // 2. READER MODE - Maximum readability, reduced eye strain
  {
    id: 'xela-reader-mode',
    name: 'XELA Reader Mode — Optimal Legibility',
    type: 'light',
    roles: {
      surface0: '#FAF9F7',      // Warm off-white (less glare)
      surface1: '#F2F1EF',      // Slightly darker sidebar
      surface2: '#FFFFFF',      // Pure white panels
      surface3: '#FFFFFF',      // Elevated
      panel: '#F5F4F2',         // Warm panel
      overlay: '#FAF9F7F5',
      backdrop: '#00000015',
      border: '#D4D3D1',
      focus: withAlpha('#1A73E8', 0.5),
      textPrimary: '#202124',   // Near black for max contrast
      textSecondary: '#5F6368',
      textMuted: '#9AA0A6',
      textInverted: '#FFFFFF',
      accentPrimary: '#1A73E8',  // Google blue
      accentPrimaryAlt: '#4285F4',
      accentInfo: '#1A73E8',
      accentWarn: '#E37400',
      accentError: '#D93025',
      accentSuccess: '#1E8E3E',
      accentSelection: withAlpha('#1A73E8', 0.15),
      accentLink: '#1A73E8'
    },
    colorOverrides: {
      // Warm, comfortable backgrounds
      'editor.background': '#FAF9F7',
      'editorLineNumber.foreground': '#9AA0A6',
      'editorLineNumber.activeForeground': '#5F6368',

      // Reduced contrast for comfort
      'editor.lineHighlightBackground': '#F2F1EF50',
      'editorIndentGuide.background': '#D4D3D120',
      'editorIndentGuide.activeBackground': '#D4D3D160',

      // Clear hierarchy
      'titleBar.activeBackground': '#F2F1EF',
      'activityBar.background': '#F2F1EF',
      'sideBar.background': '#F2F1EF',
      'editorGroupHeader.tabsBackground': '#F2F1EF',
      'tab.inactiveBackground': '#F2F1EF',
      'tab.activeBackground': '#FAF9F7',
      'statusBar.background': '#FFFFFF',
      'panel.background': '#F5F4F2',

      // Subtle accents
      'tab.activeBorder': '#1A73E8',
      'activityBar.activeBorder': '#1A73E8',

      // Minimal borders
      'sideBar.border': '#E8E7E5',
      'panel.border': '#E8E7E5',
      'editorGroup.border': '#E8E7E5',

      // Comfortable selections
      'list.activeSelectionBackground': '#E8F0FE',
      'list.hoverBackground': '#F1F3F4',
      'list.inactiveSelectionBackground': '#F1F3F4'
    },
    tokens(c) {
      return {
        comment: '#9AA0A6',
        keyword: '#C5221F',
        function: '#1A73E8',
        variable: '#202124',
        string: '#1E8E3E',
        number: '#E37400',
        constant: '#185ABC',
        storage: '#C5221F',
        type: '#185ABC',
        punctuation: '#5F6368',
        invalid: '#D93025',
        code: c.textPrimary,
        heading: '#1A73E8',
        h1: '#1A73E8',
        h2: '#185ABC',
        h3: '#1E8E3E',
        h4: '#E37400',
        h5: '#5F6368',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('reader-mode', 'light')
  },

  // 3. DEEP FOCUS - Minimal distraction, single-task clarity
  {
    id: 'xela-deep-focus',
    name: 'XELA Deep Focus — Distraction-Free Code',
    type: 'dark',
    roles: {
      surface0: '#1A1D23',      // Editor focus area
      surface1: '#13151A',      // Recessed sidebar
      surface2: '#1F2229',      // Subtle panels
      surface3: '#252930',      // Elevated
      panel: '#0F1115',         // Very dark terminal
      overlay: '#1A1D23F5',
      backdrop: '#00000099',
      border: '#2A2D35',
      focus: withAlpha('#7C9CBF', 0.5),
      textPrimary: '#D8DEE9',
      textSecondary: '#A8B4C8',
      textMuted: '#6B7A93',
      textInverted: '#1A1D23',
      accentPrimary: '#7C9CBF',  // Muted blue
      accentPrimaryAlt: '#94B4D6',
      accentInfo: '#7C9CBF',
      accentWarn: '#B89876',
      accentError: '#BF7C7C',
      accentSuccess: '#8FB f9C',
      accentSelection: withAlpha('#7C9CBF', 0.18),
      accentLink: '#94B4D6'
    },
    colorOverrides: {
      // Extreme focus on editor
      'titleBar.activeBackground': '#0F1115',
      'activityBar.background': '#0F1115',
      'sideBar.background': '#13151A',
      'editorGroupHeader.tabsBackground': '#13151A',
      'tab.inactiveBackground': '#0F1115',
      'tab.activeBackground': '#1A1D23',
      'statusBar.background': '#0F1115',
      'statusBar.noFolderBackground': '#0F1115',
      'panel.background': '#0F1115',

      // Minimal UI chrome
      'activityBar.border': '#00000000',
      'sideBar.border': '#00000000',
      'panel.border': '#2A2D3550',
      'editorGroup.border': '#2A2D3550',
      'tab.border': '#00000000',
      'tab.activeBorder': '#00000000',
      'tab.activeBorderTop': '#00000000',

      // Subtle editor enhancements
      'editor.lineHighlightBackground': '#252930 30',
      'editorCursor.foreground': '#94B4D6',
      'editorWhitespace.foreground': '#2A2D35',
      'editorIndentGuide.background': '#2A2D3540',
      'editorIndentGuide.activeBackground': '#2A2D3580',

      // Muted selections
      'list.activeSelectionBackground': '#252930',
      'list.hoverBackground': '#1F222980',
      'selection.background': '#7C9CBF30'
    },
    tokens(c) {
      return {
        comment: '#6B7A93',
        keyword: '#94B4D6',
        function: '#A8B4C8',
        variable: '#D8DEE9',
        string: '#8FBF9C',
        number: '#B89876',
        constant: '#7C9CBF',
        storage: '#94B4D6',
        type: '#7C9CBF',
        punctuation: '#A8B4C8',
        invalid: '#BF7C7C',
        code: c.textPrimary,
        heading: '#94B4D6',
        h1: '#94B4D6',
        h2: '#8FBF9C',
        h3: '#B89876',
        h4: '#A8B4C8',
        h5: c.textSecondary,
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('deep-focus', 'dark')
  },

  // 4. PAPER WHITE - Clean digital paper aesthetic
  {
    id: 'xela-paper-white',
    name: 'XELA Paper White — Clean Manuscript',
    type: 'light',
    roles: {
      surface0: '#FFFFFF',      // Pure white editor
      surface1: '#F8F9FA',      // Light grey sidebar
      surface2: '#FFFFFF',      // White panels
      surface3: '#FFFFFF',      // White elevated
      panel: '#F8F9FA',         // Light panel
      overlay: '#FFFFFFF5',
      backdrop: '#00000012',
      border: '#DFE1E5',
      focus: withAlpha('#1967D2', 0.5),
      textPrimary: '#1F1F1F',
      textSecondary: '#5F6368',
      textMuted: '#80868B',
      textInverted: '#FFFFFF',
      accentPrimary: '#1967D2',
      accentPrimaryAlt: '#4285F4',
      accentInfo: '#1967D2',
      accentWarn: '#F9AB00',
      accentError: '#D93025',
      accentSuccess: '#1E8E3E',
      accentSelection: withAlpha('#1967D2', 0.12),
      accentLink: '#1967D2'
    },
    colorOverrides: {
      // Ultra-clean hierarchy
      'editor.background': '#FFFFFF',
      'titleBar.activeBackground': '#F8F9FA',
      'activityBar.background': '#F8F9FA',
      'sideBar.background': '#F8F9FA',
      'editorGroupHeader.tabsBackground': '#F8F9FA',
      'tab.inactiveBackground': '#F8F9FA',
      'tab.activeBackground': '#FFFFFF',
      'statusBar.background': '#F8F9FA',
      'panel.background': '#F8F9FA',

      // Crisp text rendering
      'editorLineNumber.foreground': '#BDC1C6',
      'editorLineNumber.activeForeground': '#5F6368',
      'editor.lineHighlightBackground': '#F8F9FA80',

      // Minimal borders (very subtle)
      'sideBar.border': '#F1F3F4',
      'panel.border': '#F1F3F4',
      'editorGroup.border': '#F1F3F4',
      'tab.border': '#00000000',

      // Clean accents
      'tab.activeBorder': '#1967D2',
      'activityBar.activeBorder': '#1967D2',
      'editorIndentGuide.background': '#DFE1E520',
      'editorIndentGuide.activeBackground': '#DFE1E570',

      // Subtle selections
      'list.activeSelectionBackground': '#E8F0FE',
      'list.hoverBackground': '#F1F3F4',
      'list.inactiveSelectionBackground': '#F1F3F4',

      // Clear minimap
      'minimap.background': '#FAFBFC'
    },
    tokens(c) {
      return {
        comment: '#80868B',
        keyword: '#D93025',
        function: '#1967D2',
        variable: '#1F1F1F',
        string: '#1E8E3E',
        number: '#F9AB00',
        constant: '#1967D2',
        storage: '#D93025',
        type: '#185ABC',
        punctuation: '#5F6368',
        invalid: '#D93025',
        code: c.textPrimary,
        heading: '#1967D2',
        h1: '#1967D2',
        h2: '#185ABC',
        h3: '#1E8E3E',
        h4: '#F9AB00',
        h5: '#5F6368',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('paper-white', 'light')
  },

  // 5. ESPRESSO - Rich, warm, coffee house coding
  {
    id: 'xela-espresso',
    name: 'XELA Espresso — Rich Coffee Brown',
    type: 'dark',
    roles: {
      surface0: '#2B2421',      // Deep espresso editor
      surface1: '#1F1B19',      // Darker roast sidebar
      surface2: '#332D2A',      // Lighter panels
      surface3: '#3D3531',      // Elevated
      panel: '#1A1614',         // Very dark terminal
      overlay: '#2B2421F5',
      backdrop: '#00000099',
      border: '#4A413D',
      focus: withAlpha('#D4A574', 0.6),
      textPrimary: '#E8DDD1',
      textSecondary: '#C9B8A3',
      textMuted: '#8F7E6E',
      textInverted: '#2B2421',
      accentPrimary: '#D4A574',  // Caramel
      accentPrimaryAlt: '#E4B884',
      accentInfo: '#8FB4D6',
      accentWarn: '#E4B884',
      accentError: '#E57474',
      accentSuccess: '#98C379',
      accentSelection: withAlpha('#D4A574', 0.22),
      accentLink: '#E4B884'
    },
    colorOverrides: {
      // Warm depth
      'titleBar.activeBackground': '#1A1614',
      'activityBar.background': '#1F1B19',
      'sideBar.background': '#1F1B19',
      'editorGroupHeader.tabsBackground': '#1F1B19',
      'tab.inactiveBackground': '#1A1614',
      'tab.activeBackground': '#2B2421',
      'statusBar.background': '#1A1614',
      'panel.background': '#1A1614',

      // Rich highlights
      'editor.lineHighlightBackground': '#3D353140',
      'editorLineNumber.foreground': '#8F7E6E',
      'editorLineNumber.activeForeground': '#C9B8A3',

      // Warm accents
      'tab.activeBorderTop': '#D4A574',
      'activityBar.activeBorder': '#D4A574',
      'focusBorder': '#D4A57499',

      // Subtle borders
      'sideBar.border': '#3D3531',
      'panel.border': '#3D3531',
      'editorGroup.border': '#3D3531',

      // Comfortable selections
      'list.activeSelectionBackground': '#3D3531',
      'list.hoverBackground': '#332D2A80',
      'editorIndentGuide.background': '#4A413D30',
      'editorIndentGuide.activeBackground': '#4A413D80'
    },
    tokens(c) {
      return {
        comment: '#8F7E6E',
        keyword: '#E4B884',
        function: '#8FB4D6',
        variable: '#E8DDD1',
        string: '#98C379',
        number: '#E4B884',
        constant: '#D4A574',
        storage: '#E4B884',
        type: '#8FB4D6',
        punctuation: '#C9B8A3',
        invalid: '#E57474',
        code: c.textPrimary,
        heading: '#D4A574',
        h1: '#E4B884',
        h2: '#8FB4D6',
        h3: '#98C379',
        h4: '#D4A574',
        h5: c.textSecondary,
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('espresso', 'dark')
  },

  // 6. ARCTIC DAYLIGHT - Cool, energizing, high-clarity
  {
    id: 'xela-arctic-daylight',
    name: 'XELA Arctic Daylight — Cool Clarity',
    type: 'light',
    roles: {
      surface0: '#F7FAFB',      // Icy white editor
      surface1: '#EDF2F4',      // Cool grey sidebar
      surface2: '#FFFFFF',      // Pure white panels
      surface3: '#FFFFFF',      // White elevated
      panel: '#F0F5F7',         // Cool panel
      overlay: '#F7FAFBF5',
      backdrop: '#00000010',
      border: '#D0DDE3',
      focus: withAlpha('#0077C8', 0.5),
      textPrimary: '#1B2A35',
      textSecondary: '#4A5F73',
      textMuted: '#7B8FA3',
      textInverted: '#FFFFFF',
      accentPrimary: '#0077C8',  // Arctic blue
      accentPrimaryAlt: '#0091EA',
      accentInfo: '#00ACC1',
      accentWarn: '#FF9800',
      accentError: '#E53935',
      accentSuccess: '#43A047',
      accentSelection: withAlpha('#0077C8', 0.14),
      accentLink: '#0091EA'
    },
    colorOverrides: {
      // Cool, energizing hierarchy
      'editor.background': '#F7FAFB',
      'titleBar.activeBackground': '#EDF2F4',
      'activityBar.background': '#EDF2F4',
      'sideBar.background': '#EDF2F4',
      'editorGroupHeader.tabsBackground': '#EDF2F4',
      'tab.inactiveBackground': '#EDF2F4',
      'tab.activeBackground': '#F7FAFB',
      'statusBar.background': '#FFFFFF',
      'panel.background': '#F0F5F7',

      // High clarity
      'editorLineNumber.foreground': '#B0BEC5',
      'editorLineNumber.activeForeground': '#4A5F73',
      'editor.lineHighlightBackground': '#EDF2F460',

      // Cool accents
      'tab.activeBorder': '#0077C8',
      'activityBar.activeBorder': '#0077C8',
      'focusBorder': '#0077C899',

      // Crisp borders
      'sideBar.border': '#E1E8EB',
      'panel.border': '#E1E8EB',
      'editorGroup.border': '#E1E8EB',

      // Clear selections
      'list.activeSelectionBackground': '#E1F5FE',
      'list.hoverBackground': '#F1F8FA',
      'editorIndentGuide.background': '#D0DDE320',
      'editorIndentGuide.activeBackground': '#D0DDE370'
    },
    tokens(c) {
      return {
        comment: '#7B8FA3',
        keyword: '#E53935',
        function: '#0077C8',
        variable: '#1B2A35',
        string: '#43A047',
        number: '#FF9800',
        constant: '#00ACC1',
        storage: '#E53935',
        type: '#0077C8',
        punctuation: '#4A5F73',
        invalid: '#E53935',
        code: c.textPrimary,
        heading: '#0077C8',
        h1: '#0077C8',
        h2: '#00ACC1',
        h3: '#43A047',
        h4: '#FF9800',
        h5: '#4A5F73',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('arctic-daylight', 'light')
  },

  // 7. MIDNIGHT OIL - Late night coding comfort
  {
    id: 'xela-midnight-oil',
    name: 'XELA Midnight Oil — Late Night Focus',
    type: 'dark',
    roles: {
      surface0: '#15181F',      // Deep midnight editor
      surface1: '#0F1115',      // Darker sidebar
      surface2: '#1B1E25',      // Panels
      surface3: '#21242C',      // Elevated
      panel: '#0A0C0F',         // Very dark terminal
      overlay: '#15181FF5',
      backdrop: '#00000099',
      border: '#2A2D35',
      focus: withAlpha('#6B9BD1', 0.5),
      textPrimary: '#D6DBE5',
      textSecondary: '#A0A8B8',
      textMuted: '#6B7280',
      textInverted: '#15181F',
      accentPrimary: '#6B9BD1',  // Soft blue for night
      accentPrimaryAlt: '#85AED6',
      accentInfo: '#6B9BD1',
      accentWarn: '#D6A86B',
      accentError: '#D17A7A',
      accentSuccess: '#85D17A',
      accentSelection: withAlpha('#6B9BD1', 0.18),
      accentLink: '#85AED6'
    },
    colorOverrides: {
      // Maximum eye comfort
      'titleBar.activeBackground': '#0A0C0F',
      'activityBar.background': '#0F1115',
      'sideBar.background': '#0F1115',
      'editorGroupHeader.tabsBackground': '#0F1115',
      'tab.inactiveBackground': '#0A0C0F',
      'tab.activeBackground': '#15181F',
      'statusBar.background': '#0A0C0F',
      'panel.background': '#0A0C0F',

      // Reduced eye strain
      'editor.lineHighlightBackground': '#21242C30',
      'editorLineNumber.foreground': '#6B7280',
      'editorLineNumber.activeForeground': '#A0A8B8',
      'editorCursor.foreground': '#85AED6',

      // Soft accents (no harsh blues)
      'tab.activeBorderTop': '#6B9BD1',
      'activityBar.activeBorder': '#6B9BD1',
      'focusBorder': '#6B9BD180',

      // Minimal borders
      'sideBar.border': '#1B1E25',
      'panel.border': '#1B1E25',
      'editorGroup.border': '#1B1E25',

      // Comfortable selections
      'list.activeSelectionBackground': '#21242C',
      'list.hoverBackground': '#1B1E2580',
      'editorIndentGuide.background': '#2A2D3530',
      'editorIndentGuide.activeBackground': '#2A2D3580',

      // Low-brightness UI
      'button.background': '#6B9BD1',
      'button.hoverBackground': '#85AED6'
    },
    tokens(c) {
      return {
        comment: '#6B7280',
        keyword: '#85AED6',
        function: '#6B9BD1',
        variable: '#D6DBE5',
        string: '#85D17A',
        number: '#D6A86B',
        constant: '#6B9BD1',
        storage: '#85AED6',
        type: '#6B9BD1',
        punctuation: '#A0A8B8',
        invalid: '#D17A7A',
        code: c.textPrimary,
        heading: '#85AED6',
        h1: '#85AED6',
        h2: '#85D17A',
        h3: '#D6A86B',
        h4: '#6B9BD1',
        h5: c.textSecondary,
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('midnight-oil', 'dark')
  },

  // 8. STONE GARDEN - Natural, zen, balanced
  {
    id: 'xela-stone-garden',
    name: 'XELA Stone Garden — Natural Balance',
    type: 'light',
    roles: {
      surface0: '#F5F3F0',      // Stone beige editor
      surface1: '#ECE9E4',      // Darker stone sidebar
      surface2: '#FAF8F5',      // Light panels
      surface3: '#FFFFFF',      // White elevated
      panel: '#F0EDE8',         // Warm panel
      overlay: '#F5F3F0F5',
      backdrop: '#00000015',
      border: '#D8D3CC',
      focus: withAlpha('#7A6F5D', 0.5),
      textPrimary: '#2A2620',
      textSecondary: '#5A534A',
      textMuted: '#8A8178',
      textInverted: '#FFFFFF',
      accentPrimary: '#7A6F5D',  // Stone brown
      accentPrimaryAlt: '#8F836F',
      accentInfo: '#5B8A8A',
      accentWarn: '#C4905E',
      accentError: '#C45E5E',
      accentSuccess: '#6B8A5B',
      accentSelection: withAlpha('#7A6F5D', 0.16),
      accentLink: '#5B8A8A'
    },
    colorOverrides: {
      // Natural, organic hierarchy
      'editor.background': '#F5F3F0',
      'titleBar.activeBackground': '#ECE9E4',
      'activityBar.background': '#ECE9E4',
      'sideBar.background': '#ECE9E4',
      'editorGroupHeader.tabsBackground': '#ECE9E4',
      'tab.inactiveBackground': '#ECE9E4',
      'tab.activeBackground': '#F5F3F0',
      'statusBar.background': '#FAF8F5',
      'panel.background': '#F0EDE8',

      // Soft, natural accents
      'editorLineNumber.foreground': '#AEA89F',
      'editorLineNumber.activeForeground': '#5A534A',
      'editor.lineHighlightBackground': '#ECE9E450',

      'tab.activeBorder': '#7A6F5D',
      'activityBar.activeBorder': '#7A6F5D',

      // Natural borders
      'sideBar.border': '#E3DFD8',
      'panel.border': '#E3DFD8',
      'editorGroup.border': '#E3DFD8',

      // Balanced selections
      'list.activeSelectionBackground': '#E3DFD8',
      'list.hoverBackground': '#F0EDE8',
      'editorIndentGuide.background': '#D8D3CC25',
      'editorIndentGuide.activeBackground': '#D8D3CC70'
    },
    tokens(c) {
      return {
        comment: '#8A8178',
        keyword: '#C45E5E',
        function: '#5B8A8A',
        variable: '#2A2620',
        string: '#6B8A5B',
        number: '#C4905E',
        constant: '#7A6F5D',
        storage: '#C45E5E',
        type: '#5B8A8A',
        punctuation: '#5A534A',
        invalid: '#C45E5E',
        code: c.textPrimary,
        heading: '#7A6F5D',
        h1: '#5B8A8A',
        h2: '#6B8A5B',
        h3: '#C4905E',
        h4: '#7A6F5D',
        h5: '#5A534A',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('stone-garden', 'light')
  },

  // 9. VELVET NIGHT - Luxurious, sophisticated dark
  {
    id: 'xela-velvet-night',
    name: 'XELA Velvet Night — Luxury Dark',
    type: 'dark',
    roles: {
      surface0: '#1E1A28',      // Deep velvet editor
      surface1: '#15121D',      // Darker sidebar
      surface2: '#252130',      // Panels
      surface3: '#2D2838',      // Elevated
      panel: '#110E18',         // Very dark terminal
      overlay: '#1E1A28F5',
      backdrop: '#00000099',
      border: '#3A3545',
      focus: withAlpha('#B794F6', 0.6),
      textPrimary: '#E8E4F0',
      textSecondary: '#C8BFDC',
      textMuted: '#8E859F',
      textInverted: '#1E1A28',
      accentPrimary: '#B794F6',  // Luxury purple
      accentPrimaryAlt: '#CBA6FF',
      accentInfo: '#8FA5D6',
      accentWarn: '#F6C794',
      accentError: '#F69494',
      accentSuccess: '#94F6B0',
      accentSelection: withAlpha('#B794F6', 0.20),
      accentLink: '#CBA6FF'
    },
    colorOverrides: {
      // Luxurious depth
      'titleBar.activeBackground': '#110E18',
      'activityBar.background': '#15121D',
      'sideBar.background': '#15121D',
      'editorGroupHeader.tabsBackground': '#15121D',
      'tab.inactiveBackground': '#110E18',
      'tab.activeBackground': '#1E1A28',
      'statusBar.background': '#110E18',
      'panel.background': '#110E18',

      // Rich highlights
      'editor.lineHighlightBackground': '#2D283840',
      'editorLineNumber.foreground': '#8E859F',
      'editorLineNumber.activeForeground': '#C8BFDC',

      // Elegant accents
      'tab.activeBorderTop': '#B794F6',
      'activityBar.activeBorder': '#B794F6',
      'focusBorder': '#B794F699',

      // Sophisticated borders
      'sideBar.border': '#2D2838',
      'panel.border': '#2D2838',
      'editorGroup.border': '#2D2838',

      // Luxury selections
      'list.activeSelectionBackground': '#2D2838',
      'list.hoverBackground': '#25213080',
      'editorIndentGuide.background': '#3A354530',
      'editorIndentGuide.activeBackground': '#3A354580',

      // Premium feel
      'button.background': '#B794F6',
      'button.hoverBackground': '#CBA6FF'
    },
    tokens(c) {
      return {
        comment: '#8E859F',
        keyword: '#F6C794',
        function: '#8FA5D6',
        variable: '#E8E4F0',
        string: '#94F6B0',
        number: '#F6C794',
        constant: '#B794F6',
        storage: '#F6C794',
        type: '#8FA5D6',
        punctuation: '#C8BFDC',
        invalid: '#F69494',
        code: c.textPrimary,
        heading: '#B794F6',
        h1: '#CBA6FF',
        h2: '#8FA5D6',
        h3: '#94F6B0',
        h4: '#F6C794',
        h5: c.textSecondary,
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('velvet-night', 'dark')
  },

  // 10. CLEAN SLATE - Minimal, modern, surgical precision
  {
    id: 'xela-clean-slate',
    name: 'XELA Clean Slate — Minimal Precision',
    type: 'light',
    roles: {
      surface0: '#FAFAFA',      // Near-white editor
      surface1: '#F0F0F0',      // Light grey sidebar
      surface2: '#FFFFFF',      // Pure white panels
      surface3: '#FFFFFF',      // White elevated
      panel: '#F5F5F5',         // Light panel
      overlay: '#FAFAFAF5',
      backdrop: '#00000008',
      border: '#E0E0E0',
      focus: withAlpha('#000000', 0.3),
      textPrimary: '#212121',   // Almost black
      textSecondary: '#616161',
      textMuted: '#9E9E9E',
      textInverted: '#FFFFFF',
      accentPrimary: '#000000',  // Pure black accent
      accentPrimaryAlt: '#424242',
      accentInfo: '#1976D2',
      accentWarn: '#F57C00',
      accentError: '#D32F2F',
      accentSuccess: '#388E3C',
      accentSelection: withAlpha('#000000', 0.08),
      accentLink: '#1976D2'
    },
    colorOverrides: {
      // Ultra-minimal hierarchy
      'editor.background': '#FAFAFA',
      'titleBar.activeBackground': '#F0F0F0',
      'activityBar.background': '#F0F0F0',
      'sideBar.background': '#F0F0F0',
      'editorGroupHeader.tabsBackground': '#F0F0F0',
      'tab.inactiveBackground': '#F0F0F0',
      'tab.activeBackground': '#FAFAFA',
      'statusBar.background': '#FFFFFF',
      'panel.background': '#F5F5F5',

      // Surgical precision
      'editorLineNumber.foreground': '#BDBDBD',
      'editorLineNumber.activeForeground': '#616161',
      'editor.lineHighlightBackground': '#F5F5F580',

      // Bold accents
      'tab.activeBorder': '#000000',
      'activityBar.activeBorder': '#000000',
      'focusBorder': '#00000050',

      // Hairline borders
      'sideBar.border': '#EEEEEE',
      'panel.border': '#EEEEEE',
      'editorGroup.border': '#EEEEEE',

      // Precise selections
      'list.activeSelectionBackground': '#E0E0E0',
      'list.hoverBackground': '#F5F5F5',
      'editorIndentGuide.background': '#E0E0E015',
      'editorIndentGuide.activeBackground': '#E0E0E060',

      // Clean UI
      'button.background': '#212121',
      'button.foreground': '#FFFFFF',
      'button.hoverBackground': '#424242'
    },
    tokens(c) {
      return {
        comment: '#9E9E9E',
        keyword: '#D32F2F',
        function: '#1976D2',
        variable: '#212121',
        string: '#388E3C',
        number: '#F57C00',
        constant: '#000000',
        storage: '#D32F2F',
        type: '#1976D2',
        punctuation: '#616161',
        invalid: '#D32F2F',
        code: c.textPrimary,
        heading: '#000000',
        h1: '#000000',
        h2: '#1976D2',
        h3: '#388E3C',
        h4: '#F57C00',
        h5: '#616161',
        h6: c.textMuted,
        textPrimary: c.textPrimary
      };
    },
    htmlScheme: getHtmlColorScheme('clean-slate', 'light')
  }
];
