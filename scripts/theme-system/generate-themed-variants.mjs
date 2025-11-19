/**
 * Theme Generator - Creates high-quality XELA theme variants
 * Analyzes existing high-quality themes to create new ones with proper detail
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configsDir = path.join(__dirname, 'configs');

// High-quality reference themes to learn from
const referenceThemes = [
  'xela-popgirly.js',
  'xela-mr-robot.js',
  'xela-eye-care.js',
  'xela-50s-gangster.js',
  'xela-surgical.js',
  'xela-boardroom.js'
];

/**
 * Apple-inspired theme definitions with accurate color palettes
 */
const appleThemes = [
  {
    id: 'xela-cupertino',
    name: 'XELA Cupertino — California Design',
    type: 'light',
    description: 'Clean, minimal, refined - inspired by Apple Park',
    palette: {
      base: '#FFFFFF',
      surface: '#F5F5F7',
      surfaceAlt: '#E8E8ED',
      text: '#1D1D1F',
      textSecondary: '#515154',
      textMuted: '#86868B',
      accent: '#007AFF',
      accentAlt: '#0071E3',
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#5E5CE6'
    }
  },
  {
    id: 'xela-monterey',
    name: 'XELA Monterey — Big Sur Evolution',
    type: 'light',
    description: 'Translucent layers, vibrant gradients, spatial design',
    palette: {
      base: '#FFFFFF',
      surface: '#FAFAFA',
      surfaceAlt: '#F0F0F5',
      text: '#000000',
      textSecondary: '#3C3C43',
      textMuted: '#8E8E93',
      accent: '#007AFF',
      accentAlt: '#0A84FF',
      success: '#30D158',
      warning: '#FF9F0A',
      error: '#FF453A',
      info: '#BF5AF2'
    }
  },
  {
    id: 'xela-space-gray',
    name: 'XELA Space Gray — Pro Hardware',
    type: 'dark',
    description: 'Aluminum precision, professional darkness',
    palette: {
      base: '#1C1C1E',
      surface: '#2C2C2E',
      surfaceAlt: '#3A3A3C',
      text: '#FFFFFF',
      textSecondary: '#EBEBF5',
      textMuted: '#8E8E93',
      accent: '#0A84FF',
      accentAlt: '#409CFF',
      success: '#32D74B',
      warning: '#FF9F0A',
      error: '#FF453A',
      info: '#BF5AF2'
    }
  },
  {
    id: 'xela-midnight',
    name: 'XELA Midnight — iPhone 13 Shadow',
    type: 'dark',
    description: 'Deep black with subtle blue undertones',
    palette: {
      base: '#0A0A0F',
      surface: '#14141F',
      surfaceAlt: '#1E1E2F',
      text: '#F5F5FA',
      textSecondary: '#D1D1D6',
      textMuted: '#8E8E93',
      accent: '#0984FF',
      accentAlt: '#409CFF',
      success: '#30D158',
      warning: '#FFD60A',
      error: '#FF453A',
      info: '#64D2FF'
    }
  },
  {
    id: 'xela-pro-display',
    name: 'XELA Pro Display — Reference Monitor',
    type: 'dark',
    description: 'Color-accurate editing environment with true blacks',
    palette: {
      base: '#000000',
      surface: '#0D0D0D',
      surfaceAlt: '#1A1A1A',
      text: '#FFFFFF',
      textSecondary: '#E5E5E5',
      textMuted: '#A0A0A0',
      accent: '#0984FF',
      accentAlt: '#0A84FF',
      success: '#32D74B',
      warning: '#FF9F0A',
      error: '#FF453A',
      info: '#5E5CE6'
    }
  },
  {
    id: 'xela-aqua-interface',
    name: 'XELA Aqua Interface — Classic macOS',
    type: 'light',
    description: 'Lickable buttons and glassy refinement',
    palette: {
      base: '#FFFFFF',
      surface: '#E8E8E8',
      surfaceAlt: '#D4D4D4',
      text: '#000000',
      textSecondary: '#4D4D4D',
      textMuted: '#8E8E8E',
      accent: '#3B7DD7',
      accentAlt: '#5A9AEB',
      success: '#5FB951',
      warning: '#FFB627',
      error: '#E9423E',
      info: '#7C7CFF'
    }
  },
  {
    id: 'xela-rosetta',
    name: 'XELA Rosetta — Translation Layer',
    type: 'light',
    description: 'Bridging architectures with silicon elegance',
    palette: {
      base: '#FAFAFA',
      surface: '#F0F0F5',
      surfaceAlt: '#E5E5EA',
      text: '#1C1C1E',
      textSecondary: '#48484A',
      textMuted: '#8E8E93',
      accent: '#5E5CE6',
      accentAlt: '#7A78FF',
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#007AFF'
    }
  },
  {
    id: 'xela-wwdc',
    name: 'XELA WWDC — Developer Conference',
    type: 'dark',
    description: 'Keynote excitement and developer energy',
    palette: {
      base: '#000000',
      surface: '#0F0F0F',
      surfaceAlt: '#1E1E1E',
      text: '#F5F5F7',
      textSecondary: '#D1D1D6',
      textMuted: '#98989D',
      accent: '#007AFF',
      accentAlt: '#0984FF',
      success: '#30D158',
      warning: '#FFD60A',
      error: '#FF453A',
      info: '#BF5AF2'
    }
  },
  {
    id: 'xela-titanium',
    name: 'XELA Titanium — iPhone 15 Pro',
    type: 'light',
    description: 'Aerospace-grade material aesthetic',
    palette: {
      base: '#E8E8EA',
      surface: '#D1D1D6',
      surfaceAlt: '#C0C0C5',
      text: '#1C1C1E',
      textSecondary: '#3A3A3C',
      textMuted: '#6E6E73',
      accent: '#007AFF',
      accentAlt: '#0071E3',
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#5E5CE6'
    }
  },
  {
    id: 'xela-continuity',
    name: 'XELA Continuity — Handoff Flow',
    type: 'light',
    description: 'Seamless cross-device experience',
    palette: {
      base: '#FFFFFF',
      surface: '#F2F2F7',
      surfaceAlt: '#E5E5EA',
      text: '#000000',
      textSecondary: '#3C3C43',
      textMuted: '#8E8E93',
      accent: '#007AFF',
      accentAlt: '#5856D6',
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#32ADE6'
    }
  }
];

/**
 * Startup culture-inspired theme definitions
 */
const startupThemes = [
  {
    id: 'xela-garage-mode',
    name: 'XELA Garage Mode — Origin Story',
    type: 'dark',
    description: 'Late-night coding in the birthplace of legends',
    palette: {
      base: '#0F0F0F',
      surface: '#1A1A1A',
      surfaceAlt: '#252525',
      text: '#E0E0E0',
      textSecondary: '#B0B0B0',
      textMuted: '#707070',
      accent: '#FF6B35',
      accentAlt: '#FF8555',
      success: '#4CAF50',
      warning: '#FFA726',
      error: '#EF5350',
      info: '#42A5F5'
    }
  },
  {
    id: 'xela-mvp-sprint',
    name: 'XELA MVP Sprint — Ship Fast Mode',
    type: 'light',
    description: 'Move fast, minimal viable polish',
    palette: {
      base: '#FAFAFA',
      surface: '#EEEEEE',
      surfaceAlt: '#E0E0E0',
      text: '#212121',
      textSecondary: '#424242',
      textMuted: '#757575',
      accent: '#FF4081',
      accentAlt: '#F50057',
      success: '#00E676',
      warning: '#FFAB00',
      error: '#FF1744',
      info: '#2979FF'
    }
  },
  {
    id: 'xela-unicorn',
    name: 'XELA Unicorn — Billion Dollar Vision',
    type: 'dark',
    description: 'Mythical valuation, iridescent dreams',
    palette: {
      base: '#0A0010',
      surface: '#150020',
      surfaceAlt: '#200030',
      text: '#F0E0FF',
      textSecondary: '#D0B0E0',
      textMuted: '#9070B0',
      accent: '#B967FF',
      accentAlt: '#D896FF',
      success: '#05FFA1',
      warning: '#FFFB96',
      error: '#FF6AC1',
      info: '#7BFFFF'
    }
  },
  {
    id: 'xela-pitch-deck',
    name: 'XELA Pitch Deck — Series A Ready',
    type: 'light',
    description: 'Investor confidence and traction metrics',
    palette: {
      base: '#FFFFFF',
      surface: '#F8F9FA',
      surfaceAlt: '#E9ECEF',
      text: '#212529',
      textSecondary: '#495057',
      textMuted: '#6C757D',
      accent: '#0D6EFD',
      accentAlt: '#0B5ED7',
      success: '#198754',
      warning: '#FFC107',
      error: '#DC3545',
      info: '#0DCAF0'
    }
  },
  {
    id: 'xela-yc-batch',
    name: 'XELA Y Combinator — Orange Accelerator',
    type: 'light',
    description: 'Mountain View hustle and demo day glory',
    palette: {
      base: '#FFFFFF',
      surface: '#FFF8F0',
      surfaceAlt: '#FFEDDC',
      text: '#2B2B2B',
      textSecondary: '#4A4A4A',
      textMuted: '#8A8A8A',
      accent: '#FF6600',
      accentAlt: '#FF7F1F',
      success: '#28A745',
      warning: '#FD7E14',
      error: '#DC3545',
      info: '#17A2B8'
    }
  },
  {
    id: 'xela-ramen-profitable',
    name: 'XELA Ramen Profitable — Bootstrapped Grind',
    type: 'dark',
    description: 'Sustainable revenue, no investors needed',
    palette: {
      base: '#1A1410',
      surface: '#2A2420',
      surfaceAlt: '#3A3430',
      text: '#F5E6D3',
      textSecondary: '#D5C6B3',
      textMuted: '#A59483',
      accent: '#FFB84D',
      accentAlt: '#FFD699',
      success: '#7CB342',
      warning: '#FFA726',
      error: '#E64A19',
      info: '#29B6F6'
    }
  },
  {
    id: 'xela-hockey-stick',
    name: 'XELA Hockey Stick — Exponential Growth',
    type: 'light',
    description: 'Metrics trending up and to the right',
    palette: {
      base: '#F0FFF4',
      surface: '#E6F9ED',
      surfaceAlt: '#D4F1E0',
      text: '#0A3D1F',
      textSecondary: '#1A5D3F',
      textMuted: '#4A8D6F',
      accent: '#10B981',
      accentAlt: '#059669',
      success: '#22C55E',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    }
  },
  {
    id: 'xela-product-hunt',
    name: 'XELA Product Hunt — Launch Day',
    type: 'light',
    description: 'Upvote frenzy and maker community',
    palette: {
      base: '#FFFFFF',
      surface: '#FFF5F0',
      surfaceAlt: '#FFEBE0',
      text: '#1F1F1F',
      textSecondary: '#4F4F4F',
      textMuted: '#8F8F8F',
      accent: '#DA552F',
      accentAlt: '#FF6B4A',
      success: '#06C167',
      warning: '#FFBB00',
      error: '#E5484D',
      info: '#0091FF'
    }
  },
  {
    id: 'xela-aws-credits',
    name: 'XELA AWS Credits — Startup Pack',
    type: 'dark',
    description: 'Cloud infrastructure on borrowed time',
    palette: {
      base: '#0F1419',
      surface: '#1A1F29',
      surfaceAlt: '#252A39',
      text: '#F2F3F5',
      textSecondary: '#D2D3D5',
      textMuted: '#9293A5',
      accent: '#FF9900',
      accentAlt: '#FFAC31',
      success: '#1F8A70',
      warning: '#FF9900',
      error: '#FF5252',
      info: '#146EB4'
    }
  },
  {
    id: 'xela-pivot',
    name: 'XELA Pivot — Strategic Shift',
    type: 'dark',
    description: 'Changing direction before the runway ends',
    palette: {
      base: '#12161B',
      surface: '#1C2128',
      surfaceAlt: '#2D333B',
      text: '#ECEFF1',
      textSecondary: '#CFD8DC',
      textMuted: '#90A4AE',
      accent: '#82B1FF',
      accentAlt: '#448AFF',
      success: '#69F0AE',
      warning: '#FFD740',
      error: '#FF5252',
      info: '#40C4FF'
    }
  }
];

/**
 * Generate surface gradients from base color
 */
function generateSurfaces(baseColor) {
  const surfaces = {};
  const isDark = isColorDark(baseColor);

  for (let i = 0; i <= 7; i++) {
    surfaces[`surface${i}`] = adjustBrightness(baseColor, isDark ? i * 2 : -i * 2);
  }

  return surfaces;
}

/**
 * Check if color is dark
 */
function isColorDark(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

/**
 * Adjust color brightness
 */
function adjustBrightness(hex, amount) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
}

/**
 * Generate comprehensive colorOverrides based on palette
 */
function generateColorOverrides(palette, type) {
  const isDark = type === 'dark';
  const surfaces = generateSurfaces(palette.base);

  return {
    // Editor
    "editor.background": palette.base,
    "editor.foreground": palette.text,
    "editor.lineHighlightBackground": `${palette.surfaceAlt}40`,
    "editor.lineHighlightBorder": "#00000000",
    "editor.selectionBackground": `${palette.accent}30`,
    "editor.selectionHighlightBackground": `${palette.accent}20`,
    "editor.inactiveSelectionBackground": `${palette.accent}15`,
    "editor.wordHighlightBackground": `${palette.accent}25`,
    "editor.wordHighlightStrongBackground": `${palette.accent}35`,
    "editor.findMatchBackground": `${palette.warning}40`,
    "editor.findMatchHighlightBackground": `${palette.warning}25`,
    "editor.findRangeHighlightBackground": `${palette.warning}15`,
    "editor.hoverHighlightBackground": `${palette.info}20`,
    "editor.rangeHighlightBackground": `${palette.accent}10`,

    // Cursor
    "editorCursor.foreground": palette.accent,
    "editorCursor.background": palette.base,

    // Line numbers
    "editorLineNumber.foreground": palette.textMuted,
    "editorLineNumber.activeForeground": palette.accent,
    "editorLineNumber.dimmedForeground": adjustBrightness(palette.textMuted, isDark ? -20 : 20),

    // Whitespace
    "editorWhitespace.foreground": `${palette.textMuted}40`,
    "editorIndentGuide.background": `${palette.textMuted}20`,
    "editorIndentGuide.activeBackground": `${palette.textMuted}50`,

    // Title bar
    "titleBar.activeBackground": palette.surface,
    "titleBar.activeForeground": palette.text,
    "titleBar.inactiveBackground": palette.base,
    "titleBar.inactiveForeground": palette.textMuted,
    "titleBar.border": "#00000000",

    // Activity bar
    "activityBar.background": palette.surface,
    "activityBar.foreground": palette.text,
    "activityBar.inactiveForeground": palette.textMuted,
    "activityBar.border": "#00000000",
    "activityBar.activeBorder": palette.accent,
    "activityBar.activeFocusBorder": "#00000000",
    "activityBar.activeBackground": `${palette.surfaceAlt}80`,
    "activityBar.dropBorder": `${palette.accent}60`,
    "activityBarBadge.background": palette.accent,
    "activityBarBadge.foreground": isDark ? palette.base : '#FFFFFF',

    // Sidebar
    "sideBar.background": palette.surface,
    "sideBar.foreground": palette.textSecondary,
    "sideBar.border": `${palette.surfaceAlt}60`,
    "sideBar.dropBackground": `${palette.surfaceAlt}80`,
    "sideBarTitle.foreground": palette.text,
    "sideBarSectionHeader.background": palette.surfaceAlt,
    "sideBarSectionHeader.foreground": palette.accent,
    "sideBarSectionHeader.border": adjustBrightness(palette.surfaceAlt, isDark ? 10 : -10),

    // Editor groups
    "editorGroupHeader.tabsBackground": palette.surface,
    "editorGroupHeader.tabsBorder": "#00000000",
    "editorGroupHeader.border": palette.surfaceAlt,
    "editorGroupHeader.noTabsBackground": palette.surface,
    "editorGroup.border": palette.surfaceAlt,
    "editorGroup.dropBackground": `${palette.surfaceAlt}80`,

    // Tabs
    "tab.activeBackground": palette.base,
    "tab.unfocusedActiveBackground": palette.base,
    "tab.activeForeground": palette.text,
    "tab.activeBorder": "#00000000",
    "tab.activeBorderTop": palette.accent,
    "tab.unfocusedActiveBorder": "#00000000",
    "tab.unfocusedActiveBorderTop": `${palette.accent}80`,
    "tab.activeModifiedBorder": palette.warning,
    "tab.inactiveBackground": palette.surface,
    "tab.unfocusedInactiveBackground": palette.surface,
    "tab.inactiveForeground": palette.textMuted,
    "tab.unfocusedInactiveForeground": adjustBrightness(palette.textMuted, isDark ? -20 : 20),
    "tab.border": "#00000000",
    "tab.lastPinnedBorder": adjustBrightness(palette.surfaceAlt, isDark ? 10 : -10),
    "tab.hoverBackground": palette.surfaceAlt,
    "tab.unfocusedHoverBackground": `${palette.surfaceAlt}80`,
    "tab.hoverForeground": palette.text,
    "tab.hoverBorder": "#00000000",

    // Status bar
    "statusBar.background": palette.accent,
    "statusBar.foreground": isDark ? palette.base : '#FFFFFF',
    "statusBar.border": "#00000000",
    "statusBar.debuggingBackground": palette.accentAlt,
    "statusBar.debuggingForeground": isDark ? palette.base : '#FFFFFF',
    "statusBar.debuggingBorder": "#00000000",
    "statusBar.noFolderBackground": palette.info,
    "statusBar.noFolderForeground": isDark ? palette.base : '#FFFFFF',
    "statusBarItem.activeBackground": `${isDark ? '#FFFFFF' : '#000000'}40`,
    "statusBarItem.hoverBackground": `${isDark ? '#FFFFFF' : '#000000'}30`,
    "statusBarItem.prominentBackground": palette.warning,
    "statusBarItem.prominentForeground": isDark ? palette.base : '#FFFFFF',
    "statusBarItem.prominentHoverBackground": adjustBrightness(palette.warning, isDark ? 20 : -20),
    "statusBarItem.remoteBackground": palette.success,
    "statusBarItem.remoteForeground": isDark ? palette.base : '#FFFFFF',
    "statusBarItem.errorBackground": palette.error,
    "statusBarItem.errorForeground": isDark ? palette.base : '#FFFFFF',
    "statusBarItem.warningBackground": palette.warning,
    "statusBarItem.warningForeground": isDark ? palette.base : '#FFFFFF',

    // Panel
    "panel.background": palette.base,
    "panel.border": palette.surfaceAlt,
    "panelTitle.activeBorder": palette.accent,
    "panelTitle.activeForeground": palette.text,
    "panelTitle.inactiveForeground": palette.textMuted,
    "panelInput.border": palette.surfaceAlt,
    "panelSection.border": palette.surfaceAlt,
    "panelSection.dropBackground": `${palette.surfaceAlt}80`,
    "panelSectionHeader.background": palette.surface,
    "panelSectionHeader.foreground": palette.text,
    "panelSectionHeader.border": palette.surfaceAlt,

    // Terminal
    "terminal.background": palette.base,
    "terminal.foreground": palette.text,
    "terminal.ansiBlack": isDark ? '#000000' : '#1A1A1A',
    "terminal.ansiRed": palette.error,
    "terminal.ansiGreen": palette.success,
    "terminal.ansiYellow": palette.warning,
    "terminal.ansiBlue": palette.accent,
    "terminal.ansiMagenta": palette.info,
    "terminal.ansiCyan": palette.accentAlt,
    "terminal.ansiWhite": palette.text,
    "terminal.ansiBrightBlack": palette.textMuted,
    "terminal.ansiBrightRed": adjustBrightness(palette.error, isDark ? 30 : -30),
    "terminal.ansiBrightGreen": adjustBrightness(palette.success, isDark ? 30 : -30),
    "terminal.ansiBrightYellow": adjustBrightness(palette.warning, isDark ? 30 : -30),
    "terminal.ansiBrightBlue": adjustBrightness(palette.accent, isDark ? 30 : -30),
    "terminal.ansiBrightMagenta": adjustBrightness(palette.info, isDark ? 30 : -30),
    "terminal.ansiBrightCyan": adjustBrightness(palette.accentAlt, isDark ? 30 : -30),
    "terminal.ansiBrightWhite": isDark ? '#FFFFFF' : palette.text,
    "terminalCursor.foreground": palette.accent,
    "terminalCursor.background": palette.base,
    "terminal.selectionBackground": `${palette.accent}40`,

    // Buttons
    "button.background": palette.accent,
    "button.foreground": isDark ? palette.base : '#FFFFFF',
    "button.hoverBackground": adjustBrightness(palette.accent, isDark ? 20 : -20),
    "button.secondaryBackground": palette.surfaceAlt,
    "button.secondaryForeground": palette.text,
    "button.secondaryHoverBackground": adjustBrightness(palette.surfaceAlt, isDark ? 10 : -10),

    // Input
    "input.background": palette.surface,
    "input.border": palette.surfaceAlt,
    "input.foreground": palette.text,
    "input.placeholderForeground": palette.textMuted,
    "inputOption.activeBorder": palette.accent,
    "inputOption.activeBackground": `${palette.accent}30`,
    "inputOption.activeForeground": palette.text,
    "inputValidation.errorBackground": `${palette.error}20`,
    "inputValidation.errorBorder": palette.error,
    "inputValidation.infoBackground": `${palette.info}20`,
    "inputValidation.infoBorder": palette.info,
    "inputValidation.warningBackground": `${palette.warning}20`,
    "inputValidation.warningBorder": palette.warning,

    // Dropdown
    "dropdown.background": palette.surface,
    "dropdown.border": palette.surfaceAlt,
    "dropdown.foreground": palette.text,
    "dropdown.listBackground": palette.base,

    // List & Trees
    "list.activeSelectionBackground": `${palette.accent}30`,
    "list.activeSelectionForeground": palette.text,
    "list.inactiveSelectionBackground": `${palette.accent}20`,
    "list.inactiveSelectionForeground": palette.text,
    "list.hoverBackground": `${palette.surfaceAlt}60`,
    "list.hoverForeground": palette.text,
    "list.focusBackground": `${palette.accent}40`,
    "list.focusForeground": palette.text,
    "list.highlightForeground": palette.accent,
    "list.dropBackground": `${palette.accent}30`,
    "list.errorForeground": palette.error,
    "list.warningForeground": palette.warning,
    "listFilterWidget.background": palette.surface,
    "listFilterWidget.outline": palette.accent,
    "listFilterWidget.noMatchesOutline": palette.error,
    "tree.indentGuidesStroke": `${palette.textMuted}40`,

    // Scrollbar
    "scrollbar.shadow": `${isDark ? '#000000' : '#000000'}30`,
    "scrollbarSlider.background": `${palette.textMuted}40`,
    "scrollbarSlider.hoverBackground": `${palette.textMuted}60`,
    "scrollbarSlider.activeBackground": `${palette.textMuted}80`,

    // Badge
    "badge.background": palette.accent,
    "badge.foreground": isDark ? palette.base : '#FFFFFF',

    // Progress bar
    "progressBar.background": palette.accent,

    // Notifications
    "notificationCenter.border": palette.surfaceAlt,
    "notificationCenterHeader.foreground": palette.text,
    "notificationCenterHeader.background": palette.surface,
    "notificationToast.border": palette.surfaceAlt,
    "notifications.foreground": palette.text,
    "notifications.background": palette.surface,
    "notifications.border": palette.surfaceAlt,
    "notificationLink.foreground": palette.accent,
    "notificationsErrorIcon.foreground": palette.error,
    "notificationsWarningIcon.foreground": palette.warning,
    "notificationsInfoIcon.foreground": palette.info,

    // Peek view
    "peekView.border": palette.accent,
    "peekViewEditor.background": palette.base,
    "peekViewEditor.matchHighlightBackground": `${palette.warning}40`,
    "peekViewResult.background": palette.surface,
    "peekViewResult.fileForeground": palette.text,
    "peekViewResult.lineForeground": palette.textSecondary,
    "peekViewResult.matchHighlightBackground": `${palette.warning}40`,
    "peekViewResult.selectionBackground": `${palette.accent}30`,
    "peekViewResult.selectionForeground": palette.text,
    "peekViewTitle.background": palette.surfaceAlt,
    "peekViewTitleDescription.foreground": palette.textSecondary,
    "peekViewTitleLabel.foreground": palette.text,

    // Breadcrumbs
    "breadcrumb.foreground": palette.textSecondary,
    "breadcrumb.background": palette.base,
    "breadcrumb.focusForeground": palette.text,
    "breadcrumb.activeSelectionForeground": palette.accent,
    "breadcrumbPicker.background": palette.surface,

    // Git decorations
    "gitDecoration.addedResourceForeground": palette.success,
    "gitDecoration.modifiedResourceForeground": palette.warning,
    "gitDecoration.deletedResourceForeground": palette.error,
    "gitDecoration.untrackedResourceForeground": palette.info,
    "gitDecoration.ignoredResourceForeground": palette.textMuted,
    "gitDecoration.conflictingResourceForeground": palette.error,
    "gitDecoration.submoduleResourceForeground": palette.accentAlt,

    // Diff editor
    "diffEditor.insertedTextBackground": `${palette.success}25`,
    "diffEditor.insertedTextBorder": `${palette.success}00`,
    "diffEditor.removedTextBackground": `${palette.error}25`,
    "diffEditor.removedTextBorder": `${palette.error}00`,
    "diffEditor.border": palette.surfaceAlt,
    "diffEditor.diagonalFill": `${palette.textMuted}30`,
  };
}

/**
 * Generate roles from palette
 */
function generateRoles(palette, type) {
  const isDark = type === 'dark';
  const surfaces = generateSurfaces(palette.base);

  return {
    ...surfaces,
    "panel": palette.base,
    "overlay": `${palette.base}FC`,
    "backdrop": `${palette.base}DD`,
    "border": palette.surfaceAlt,
    "focus": `${palette.accent}B3`,
    "textPrimary": palette.text,
    "textSecondary": palette.textSecondary,
    "textMuted": palette.textMuted,
    "textInverted": isDark ? palette.base : '#FFFFFF',
    "accentPrimary": palette.accent,
    "accentPrimaryAlt": palette.accentAlt,
    "accentInfo": palette.info,
    "accentWarn": palette.warning,
    "accentError": palette.error,
    "accentSuccess": palette.success,
    "accentSelection": `${palette.accent}26`,
    "accentLink": palette.accent
  };
}

/**
 * Generate theme file content
 */
function generateThemeFile(theme) {
  const roles = generateRoles(theme.palette, theme.type);
  const colorOverrides = generateColorOverrides(theme.palette, theme.type);

  return `/**
 * Theme: ${theme.name}
 * Type: ${theme.type}
 * Description: ${theme.description}
 * Auto-generated by theme generator
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: '${theme.id}',
  name: '${theme.name}',
  type: '${theme.type}',
  roles: ${JSON.stringify(roles, null, 4)},
  colorOverrides: ${JSON.stringify(colorOverrides, null, 4)},
  tokens: function(c) {
    return [
      { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.textMuted, fontStyle: 'italic' } },
      { scope: ['keyword', 'storage.type', 'storage.modifier'], settings: { foreground: c.accentPrimary, fontStyle: 'bold' } },
      { scope: ['string', 'string.quoted'], settings: { foreground: c.accentSuccess } },
      { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: c.accentWarn } },
      { scope: ['variable', 'support.variable'], settings: { foreground: c.textPrimary } },
      { scope: ['entity.name.function', 'support.function'], settings: { foreground: c.accentInfo, fontStyle: 'bold' } },
      { scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'], settings: { foreground: c.accentPrimaryAlt } },
      { scope: ['entity.other.attribute-name'], settings: { foreground: c.accentInfo } },
      { scope: ['entity.name.tag'], settings: { foreground: c.accentPrimary } },
      { scope: ['invalid', 'invalid.illegal'], settings: { foreground: c.accentError, fontStyle: 'bold underline' } },
      { scope: ['markup.heading'], settings: { foreground: c.accentPrimary, fontStyle: 'bold' } },
      { scope: ['markup.bold'], settings: { fontStyle: 'bold' } },
      { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
      { scope: ['markup.list'], settings: { foreground: c.accentWarn } },
      { scope: ['markup.inline.raw', 'markup.fenced_code'], settings: { foreground: c.accentSuccess } },
      { scope: ['meta.link'], settings: { foreground: c.accentLink, fontStyle: 'underline' } }
    ];
  },
  htmlScheme: function() {
    return getHtmlColorScheme(this.roles, this.type);
  }
};
`;
}

/**
 * Main generation function
 */
async function generateThemes() {
  console.log('🎨 XELA Theme Generator\n');
  console.log(`Generating ${appleThemes.length} Apple themes and ${startupThemes.length} Startup themes...\n`);

  const allThemes = [...appleThemes, ...startupThemes];
  let successCount = 0;
  let errorCount = 0;

  for (const theme of allThemes) {
    try {
      const filePath = path.join(configsDir, `${theme.id}.js`);
      const content = generateThemeFile(theme);

      await fs.writeFile(filePath, content, 'utf8');
      console.log(`✅ Generated: ${theme.name}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to generate ${theme.name}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`\nNext steps:`);
  console.log(`   1. Run: npm run rebuild`);
  console.log(`   2. Install the VSIX: vsce package`);
  console.log(`   3. Reload VS Code window`);
}

// Run the generator
generateThemes().catch(console.error);
