/**
 * XELA Palette Generator
 *
 * Generates accessible color palettes for theme creation.
 * Supports both random generation and retro-inspired palettes.
 *
 * @module lib/palette-generator
 */

import {
    adjustColorForContrast,
    adjustLightness,
    generateAccessibleColor,
    generateHarmoniousHues,
    getContrastRatio,
    getHueFromHex,
    getLuminance,
    hexToRgb,
    hslToRgb,
    randomHue,
    rgbToHex,
    rgbToHsl,
} from './color-utils.js';
import { validatePalette } from './theme-validator.js';

/**
 * Default configuration for palette generation. Consumers can override
 * by passing `options.config` to the generator functions.
 */
export const DEFAULT_PALETTE_CONFIG = {
  colorSchemes: ['complementary', 'analogous', 'triadic', 'splitComplementary'],
  saturationRange: { min: 30, max: 80 },
  dark: {
    baseLightnessRange: [5, 15], // percent
    baseSaturationRange: [0, 15],
    bgAltDelta: 5, // lightness delta
    bgElevatedDelta: 10,
    borderDelta: 15
  },
  light: {
    baseLightnessRange: [92, 98],
    baseSaturationRange: [0, 10],
    bgAltDelta: -3,
    bgElevatedDelta: -6,
    borderDelta: -15
  },
  contrast: {
    aaa: 7,
    aa: 4.5,
    aaLarge: 3, // Large text and UI components
    ui: 3
  },
  semanticHues: {
    error: 0,
    warning: 35,
    success: 120,
    info: 210
  },
  syntaxHues: {
    string: 120,
    type: 200,
    storage: 300
  },
  terminal: {
    magentaHue: 300,
    cyanHue: 180
  },
  retro: {
    accentSaturationThreshold: 30,
    accentLightnessMin: 20,
    accentLightnessMax: 80,
    defaultSaturationLevel: 60,
    // retro luminance thresholds and fallback deltas for legacy palettes
    darkBgLuminanceMax: 0.2,
    lightFgLuminanceMin: 0.5,
    lightBgLuminanceMin: 0.7,
    lightDarkLuminanceMax: 0.4,
    fallbackDeltas: {
      dark: { bgAlt: 5, bgElevated: 10, border: 15 },
      light: { bgAlt: -3, bgElevated: -6, border: -15 }
    }
  }
};

/**
 * @typedef {Object} ColorPalette
 * @property {string} bg - Main background color
 * @property {string} bgAlt - Alternate background color
 * @property {string} bgElevated - Elevated surface background
 * @property {string} fg - Main foreground/text color
 * @property {string} fgMuted - Muted text color
 * @property {string} fgSubtle - Subtle text color
 * @property {string} accent - Primary accent color
 * @property {string} accentAlt - Secondary accent color
 * @property {string} border - Border color
 * @property {string} borderSubtle - Subtle border color
 * @property {string} error - Error state color
 * @property {string} warning - Warning state color
 * @property {string} success - Success state color
 * @property {string} info - Info state color
 * @property {string} remote - Remote indicator color
 */

/**
 * @typedef {Object} SyntaxColors
 * @property {string} comment - Comment color
 * @property {string} keyword - Keyword color
 * @property {string} function - Function name color
 * @property {string} string - String literal color
 * @property {string} number - Number literal color
 * @property {string} variable - Variable color
 * @property {string} constant - Constant color
 * @property {string} type - Type/class color
 * @property {string} storage - Storage modifier color
 * @property {string} punctuation - Punctuation color
 * @property {string} invalid - Invalid/error color
 * @property {string} link - Link color
 */

/**
 * @typedef {Object} TerminalColors
 * @property {string} black
 * @property {string} white
 * @property {string} red
 * @property {string} green
 * @property {string} yellow
 * @property {string} blue
 * @property {string} magenta
 * @property {string} cyan
 */

/**
 * @typedef {Object} ThemePalette
 * @property {'dark'|'light'} type - Theme type
 * @property {ColorPalette} colors - UI colors
 * @property {SyntaxColors} syntax - Syntax highlighting colors
 * @property {TerminalColors} terminal - Terminal colors
 * @property {Object} meta - Metadata about the palette
 */

/**
 * Generate a complete accessible theme palette
 * @param {Object} [options] - Generation options
 * @param {'dark'|'light'} [options.type] - Theme type (random if not specified)
 * @param {number} [options.baseHue] - Base hue (0-360)
 * @param {string} [options.colorScheme] - Color scheme type
 * @param {number} [options.saturationLevel] - Saturation level (0-100)
 * @returns {ThemePalette}
 */
export function generateAccessiblePalette(options = {}) {
  const cfg = { ...DEFAULT_PALETTE_CONFIG, ...(options.config || {}) };
  const {
    type = Math.random() > 0.5 ? 'dark' : 'light',
    baseHue = randomHue(),
    colorScheme = cfg.colorSchemes[Math.floor(Math.random() * cfg.colorSchemes.length)],
    saturationLevel = typeof options.saturationLevel === 'number' ? options.saturationLevel : (cfg.saturationRange.min + Math.random() * (cfg.saturationRange.max - cfg.saturationRange.min)),
  } = options;

  const hues = generateHarmoniousHues(baseHue, colorScheme);
  const accentHue = hues[0];
  const secondaryHue = hues[1] || (baseHue + 180) % 360;

  let bg, bgAlt, bgElevated, fg, fgMuted, fgSubtle, border;

  if (type === 'dark') {
    // Dark theme: dark backgrounds, light text
    const [minL, maxL] = cfg.dark.baseLightnessRange;
    const [minS, maxS] = cfg.dark.baseSaturationRange;
    const baseLightness = minL + Math.random() * (maxL - minL);
    const baseSaturation = minS + Math.random() * (maxS - minS);

    const bgRgb = hslToRgb(baseHue, baseSaturation, baseLightness);
    bg = rgbToHex(bgRgb.r, bgRgb.g, bgRgb.b);
    bgAlt = adjustLightness(bg, cfg.dark.bgAltDelta);
    bgElevated = adjustLightness(bg, cfg.dark.bgElevatedDelta);
    border = adjustLightness(bg, cfg.dark.borderDelta);

    // Generate accessible foreground colors
    fg = generateAccessibleColor(bg, cfg.contrast.aaa); // AAA contrast for main text
    fgMuted = generateAccessibleColor(bg, cfg.contrast.aa); // AA contrast
    fgSubtle = generateAccessibleColor(bg, cfg.contrast.ui); // UI contrast

  } else {
    // Light theme: light backgrounds, dark text
    const [minL, maxL] = cfg.light.baseLightnessRange;
    const [minS, maxS] = cfg.light.baseSaturationRange;
    const baseLightness = minL + Math.random() * (maxL - minL);
    const baseSaturation = minS + Math.random() * (maxS - minS);

    const bgRgb = hslToRgb(baseHue, baseSaturation, baseLightness);
    bg = rgbToHex(bgRgb.r, bgRgb.g, bgRgb.b);
    bgAlt = adjustLightness(bg, cfg.light.bgAltDelta);
    bgElevated = adjustLightness(bg, cfg.light.bgElevatedDelta);
    border = adjustLightness(bg, cfg.light.borderDelta);

    fg = generateAccessibleColor(bg, cfg.contrast.aaa);
    fgMuted = generateAccessibleColor(bg, cfg.contrast.aa);
    fgSubtle = generateAccessibleColor(bg, cfg.contrast.ui);
  }

  // Generate accent colors that are accessible
  const accent = generateAccessibleColor(bg, cfg.contrast.ui, saturationLevel, accentHue);
  const accentAlt = generateAccessibleColor(bg, cfg.contrast.ui, saturationLevel, secondaryHue);

  // Semantic colors (must be distinguishable and accessible)
  const error = generateAccessibleColor(bg, cfg.contrast.ui, 70, cfg.semanticHues.error);
  const warning = generateAccessibleColor(bg, cfg.contrast.ui, 80, cfg.semanticHues.warning);
  const success = generateAccessibleColor(bg, cfg.contrast.ui, 60, cfg.semanticHues.success);
  const info = generateAccessibleColor(bg, cfg.contrast.ui, 60, cfg.semanticHues.info);

  // Syntax colors - all must be accessible against bg
  const syntax = {
    comment: fgSubtle,
    keyword: generateAccessibleColor(bg, cfg.contrast.aa, saturationLevel, accentHue),
    function: generateAccessibleColor(bg, cfg.contrast.aa, saturationLevel, (accentHue + 60) % 360),
    string: generateAccessibleColor(bg, cfg.contrast.aa, saturationLevel, cfg.syntaxHues.string),
    number: generateAccessibleColor(bg, cfg.contrast.aa, saturationLevel, accentHue),
    variable: fg,
    constant: generateAccessibleColor(bg, 4.5, saturationLevel, secondaryHue),
    type: generateAccessibleColor(bg, cfg.contrast.aa, saturationLevel, cfg.syntaxHues.type),
    storage: generateAccessibleColor(bg, cfg.contrast.aa, saturationLevel, cfg.syntaxHues.storage),
    punctuation: fgMuted,
    invalid: error,
    link: accent,
  };

  // Terminal colors
  const terminal = {
    black: type === 'dark' ? bg : '#1A1A1A',
    white: type === 'dark' ? '#F0F0F0' : fg,
    red: error,
    green: success,
    yellow: warning,
    blue: info,
    magenta: generateAccessibleColor(bg, cfg.contrast.ui, 60, cfg.terminal.magentaHue),
    cyan: generateAccessibleColor(bg, cfg.contrast.ui, 60, cfg.terminal.cyanHue),
  };

  // UI-specific colors with exact contrast requirements
  // These are separate from general foreground colors to ensure they meet
  // WCAG requirements for their specific use cases
  const ui = {
    // Line numbers need AA_LARGE (3:1) - use fgMuted which has 4.5:1 for safety margin
    lineNumber: fgMuted,
    lineNumberActive: fg,
    // Badge foreground needs AA (4.5:1) against accent background
    badgeFg: adjustColorForContrast(type === 'dark' ? bg : '#FFFFFF', accent, cfg.contrast.aa),
    // Cursor needs UI (3:1) against editor background - use accent but ensure contrast
    cursor: adjustColorForContrast(accent, bg, cfg.contrast.ui),
    // Button foreground needs AA (4.5:1) against accent
    buttonFg: adjustColorForContrast(type === 'dark' ? bg : '#FFFFFF', accent, cfg.contrast.aa),
    // Placeholder text needs AA_LARGE (3:1)
    placeholder: fgSubtle,
  };

  return {
    type,
    colors: {
      bg, bgAlt, bgElevated, fg, fgMuted, fgSubtle, accent, accentAlt, border,
      borderSubtle: border + '80', error, warning, success, info, remote: info
    },
    ui,
    syntax,
    terminal,
    meta: { baseHue, colorScheme, saturationLevel }
  };
}

/**
 * Generate a valid accessible palette (retries until valid)
 * @param {number} [maxAttempts=50] - Maximum generation attempts
 * @returns {{palette: ThemePalette, validation: Object, attempts: number}}
 */
export function generateValidPalette(maxAttempts = 50) {
  for (let i = 0; i < maxAttempts; i++) {
    const palette = generateAccessiblePalette();
    const validation = validatePalette(palette);

    if (validation.valid) {
      return { palette, validation, attempts: i + 1 };
    }
  }

  // If we can't generate a valid one, return the last attempt with issues noted
  const palette = generateAccessiblePalette();
  return { palette, validation: validatePalette(palette), attempts: maxAttempts };
}

/**
 * Generate a theme inspired by a retro palette
 * Strongly prefers using actual retro colors, only adjusts for accessibility
 * @param {Object} retroPalette - Retro palette object
 * @param {Object} retroPalettes - All available retro palettes
 * @returns {ThemePalette}
 */
export function generateRetroInspiredPalette(retroPalette, retroPalettes = {}) {
  const cfg = DEFAULT_PALETTE_CONFIG;
  const retroColors = Object.values(retroPalette.colors).filter(c => c && c.startsWith('#'));
  const type = retroPalette.type || (Math.random() > 0.5 ? 'dark' : 'light');

  // Sort retro colors by luminance to find bg/fg candidates
  const colorsByLuminance = retroColors
    .map(c => ({ color: c, lum: getLuminance(c) }))
    .sort((a, b) => a.lum - b.lum);

  let bg, bgAlt, bgElevated, fg, fgMuted, fgSubtle, border;

  if (type === 'dark') {
    // Use actual darkest retro colors for background
    const darkColors = colorsByLuminance.filter(c => c.lum < cfg.retro.darkBgLuminanceMax);
    const lightColors = colorsByLuminance.filter(c => c.lum > cfg.retro.lightFgLuminanceMin);

    if (darkColors.length > 0) {
      bg = darkColors[0].color;
      bgAlt = darkColors[1]?.color || adjustLightness(bg, cfg.retro.fallbackDeltas.dark.bgAlt);
      bgElevated = darkColors[2]?.color || adjustLightness(bg, cfg.retro.fallbackDeltas.dark.bgElevated);
    } else {
      const baseHue = getHueFromHex(retroColors[0]) || 0;
      const rgb = hslToRgb(baseHue, 15, 8);
      bg = rgbToHex(rgb.r, rgb.g, rgb.b);
      bgAlt = adjustLightness(bg, cfg.retro.fallbackDeltas.dark.bgAlt);
      bgElevated = adjustLightness(bg, cfg.retro.fallbackDeltas.dark.bgElevated);
    }

    if (lightColors.length > 0) {
      fg = adjustColorForContrast(lightColors[lightColors.length - 1].color, bg, cfg.contrast.aaa);
      fgMuted = adjustColorForContrast(lightColors[Math.max(0, lightColors.length - 2)]?.color || fg, bg, cfg.contrast.aa);
      fgSubtle = adjustColorForContrast(lightColors[Math.max(0, lightColors.length - 3)]?.color || fgMuted, bg, cfg.contrast.ui);
    } else {
      fg = generateAccessibleColor(bg, cfg.contrast.aaa);
      fgMuted = generateAccessibleColor(bg, cfg.contrast.aa);
      fgSubtle = generateAccessibleColor(bg, cfg.contrast.ui);
    }
    border = adjustLightness(bg, cfg.retro.fallbackDeltas.dark.border);

  } else {
    // Light theme
    const lightColors = colorsByLuminance.filter(c => c.lum > cfg.retro.lightBgLuminanceMin);
    const darkColors = colorsByLuminance.filter(c => c.lum < cfg.retro.lightDarkLuminanceMax);

    if (lightColors.length > 0) {
      bg = lightColors[lightColors.length - 1].color;
      bgAlt = lightColors[lightColors.length - 2]?.color || adjustLightness(bg, cfg.retro.fallbackDeltas.light.bgAlt);
      bgElevated = adjustLightness(bg, cfg.retro.fallbackDeltas.light.bgElevated);
    } else {
      const baseHue = getHueFromHex(retroColors[0]) || 0;
      const rgb = hslToRgb(baseHue, 10, 95);
      bg = rgbToHex(rgb.r, rgb.g, rgb.b);
      bgAlt = adjustLightness(bg, cfg.retro.fallbackDeltas.light.bgAlt);
      bgElevated = adjustLightness(bg, cfg.retro.fallbackDeltas.light.bgElevated);
    }

    if (darkColors.length > 0) {
      fg = adjustColorForContrast(darkColors[0].color, bg, cfg.contrast.aaa);
      fgMuted = adjustColorForContrast(darkColors[1]?.color || fg, bg, cfg.contrast.aa);
      fgSubtle = adjustColorForContrast(darkColors[2]?.color || fgMuted, bg, cfg.contrast.ui);
    } else {
      fg = generateAccessibleColor(bg, cfg.contrast.aaa);
      fgMuted = generateAccessibleColor(bg, cfg.contrast.aa);
      fgSubtle = generateAccessibleColor(bg, cfg.contrast.ui);
    }
    border = adjustLightness(bg, cfg.retro.fallbackDeltas.light.border);
  }

  // Get vibrant accent colors from the retro palette
  const accentCandidates = extractAccentColorsFromPalette(retroPalette);
  const sortedAccents = accentCandidates
    .map(c => {
      const rgb = hexToRgb(c);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return { color: c, saturation: hsl.s, contrast: getContrastRatio(c, bg) };
    })
    .sort((a, b) => b.saturation - a.saturation);

  let accent = sortedAccents[0]?.color;
  let accentAlt = sortedAccents[1]?.color || sortedAccents[0]?.color;

  if (accent) {
    accent = adjustColorForContrast(accent, bg, 3);
  } else {
    const baseHue = getHueFromHex(retroColors[0]) || randomHue();
    accent = generateAccessibleColor(bg, 3, 60, baseHue);
  }

  if (accentAlt && accentAlt !== accent) {
    accentAlt = adjustColorForContrast(accentAlt, bg, 3);
  } else {
    const altHue = (getHueFromHex(accent) + 120) % 360;
    accentAlt = generateAccessibleColor(bg, 3, 60, altHue);
  }

  // Build syntax colors from retro palette
  const syntaxCandidates = sortedAccents
    .filter(c => c.contrast >= 3)
    .map(c => ({
      ...c,
      hue: getHueFromHex(c.color),
      adjusted: adjustColorForContrast(c.color, bg, 4.5)
    }));

  const getRetroSyntaxColor = (targetHue, saturation = 60) => {
    let best = null;
    let bestDiff = 360;
    for (const c of syntaxCandidates) {
      const diff = Math.min(Math.abs(c.hue - targetHue), 360 - Math.abs(c.hue - targetHue));
      if (diff < bestDiff) {
        bestDiff = diff;
        best = c;
      }
    }
    if (best && bestDiff < 60) {
      return best.adjusted;
    }
    if (syntaxCandidates.length > 0) {
      return syntaxCandidates[Math.floor(Math.random() * syntaxCandidates.length)].adjusted;
    }
    return generateAccessibleColor(bg, 4.5, saturation, targetHue);
  };

  const keywordColor = adjustColorForContrast(accent, bg, 4.5);
  const functionColor = adjustColorForContrast(accentAlt, bg, 4.5);

  const syntax = {
    comment: fgSubtle,
    keyword: keywordColor,
    function: functionColor,
    string: getRetroSyntaxColor(120),
    number: getRetroSyntaxColor(30),
    variable: fg,
    constant: getRetroSyntaxColor(270),
    type: getRetroSyntaxColor(200),
    storage: getRetroSyntaxColor(300),
    punctuation: fgMuted,
    invalid: getRetroSyntaxColor(0),
    link: accent,
  };

  const error = getRetroSyntaxColor(0, 70);
  const warning = getRetroSyntaxColor(45, 70);
  const success = getRetroSyntaxColor(120, 70);
  const info = getRetroSyntaxColor(210, 70);

  const getTerminalColor = (targetHue) => {
    for (const c of syntaxCandidates) {
      const diff = Math.min(Math.abs(c.hue - targetHue), 360 - Math.abs(c.hue - targetHue));
      if (diff < 45) {
        return adjustColorForContrast(c.color, bg, 3);
      }
    }
    return generateAccessibleColor(bg, 3, 70, targetHue);
  };

  const terminal = {
    black: type === 'dark' ? bg : colorsByLuminance[0]?.color || '#1A1A1A',
    white: type === 'dark' ? colorsByLuminance[colorsByLuminance.length - 1]?.color || '#F0F0F0' : fg,
    red: getTerminalColor(0),
    green: getTerminalColor(120),
    yellow: getTerminalColor(60),
    blue: getTerminalColor(210),
    magenta: getTerminalColor(300),
    cyan: getTerminalColor(180),
  };

  const baseHue = getHueFromHex(retroColors[0]) || 0;

  return {
    type,
    colors: {
      bg, bgAlt, bgElevated, fg, fgMuted, fgSubtle, accent, accentAlt, border,
      borderSubtle: border + '80', error, warning, success, info, remote: info
    },
    syntax,
    terminal,
    meta: {
      baseHue,
      colorScheme: `retro-${retroPalette.id}`,
      saturationLevel: 60,
      retroPalette: retroPalette.id,
      retroPaletteName: retroPalette.name,
      retroPaletteYear: retroPalette.year,
      retroPaletteCategory: retroPalette.category
    }
  };
}

/**
 * Extract accent colors from a retro palette
 * @param {Object} palette - Retro palette object
 * @returns {string[]} Array of accent color hex values
 */
function extractAccentColorsFromPalette(palette) {
  const colors = Object.values(palette.colors).filter(c => c && c.startsWith('#'));
  const accentColors = [];

  for (const color of colors) {
    const rgb = hexToRgb(color);
    if (!rgb) continue;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    // Consider it an accent if it has decent saturation and isn't too dark or light
    if (hsl.s > 30 && hsl.l > 20 && hsl.l < 80) {
      accentColors.push(color);
    }
  }

  return accentColors;
}

/**
 * Generate a valid retro-inspired palette (with retries)
 * @param {Object} retroPalettes - Available retro palettes
 * @param {string|null} categoryOrId - Category name or specific palette ID
 * @param {number} maxAttempts - Max generation attempts
 * @returns {{palette: ThemePalette, validation: Object, attempts: number, retroSource: string|null}}
 */
export function generateValidRetroPalette(retroPalettes, categoryOrId = null, maxAttempts = 50) {
  const categories = Object.values(retroPalettes)
    .map(p => p.category)
    .filter((v, i, a) => a.indexOf(v) === i);

  const isCategory = categoryOrId === null || categories.includes(categoryOrId);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let retroPalette = null;

    if (isCategory && categoryOrId) {
      // Pick random palette from category
      const categoryPalettes = Object.entries(retroPalettes)
        .filter(([_, p]) => p.category === categoryOrId)
        .map(([id, p]) => ({ id, ...p }));

      if (categoryPalettes.length > 0) {
        retroPalette = categoryPalettes[Math.floor(Math.random() * categoryPalettes.length)];
      }
    } else if (!isCategory && categoryOrId && retroPalettes[categoryOrId]) {
      retroPalette = { id: categoryOrId, ...retroPalettes[categoryOrId] };
    } else {
      // Random palette
      const keys = Object.keys(retroPalettes);
      const randomId = keys[Math.floor(Math.random() * keys.length)];
      retroPalette = { id: randomId, ...retroPalettes[randomId] };
    }

    if (!retroPalette) continue;

    const palette = generateRetroInspiredPalette(retroPalette, retroPalettes);
    const validation = validatePalette(palette);

    if (validation.valid) {
      const retroSource = palette.meta.retroPaletteName
        ? `${palette.meta.retroPaletteName} (${palette.meta.retroPaletteYear})`
        : null;
      return { palette, validation, attempts: attempt, retroSource };
    }
  }

  // Fallback to regular generation
  const fallback = generateValidPalette();
  return { ...fallback, retroSource: null };
}
