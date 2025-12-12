/**
 * XELA Live Theme Fuzzer - Theme Generator
 *
 * Generates batches of theme options for the fuzzer picker.
 *
 * @module theme-fuzzer/theme-generator
 */

import {
    generateThemeJson,
    generateValidPalette,
} from '../lib/index.js';

import {
    getCategories,
    getPalettesByCategory,
    getRandomPalette,
} from './retro-palettes.js';

import { generateRetroInspiredPalette, validatePalette } from '../lib/index.js';

import retroPalettes from './retro-palettes.js';

/**
 * Generate a batch of fuzzed themes
 * @param {number} count - Number of themes to generate
 * @param {Object} options - Generation options
 * @param {'random'|'retro'} options.mode - Generation mode
 * @param {string|null} options.category - Retro category filter
 * @param {'dark'|'light'|null} options.themeType - Theme type filter
 * @returns {Array} Array of theme items for the picker
 */
export function generateThemeBatch(count = 10, options = {}) {
  const items = [];
  const { mode = 'random', category = null, themeType = null } = options;

  console.log(`[XELA Fuzzer] Generating ${count} themes in ${mode} mode, category: ${category}`);

  for (let i = 0; i < count; i++) {
    let result;

    if (mode === 'retro') {
      result = generateValidRetroPaletteLocal(category);
      console.log(`[XELA Fuzzer] Retro result:`, result.retroSource, result.palette?.meta?.colorScheme);
    } else {
      result = generateValidPalette();
    }

    const { palette, validation, attempts, retroSource } = result;

    // Filter by theme type if specified
    if (themeType && palette.type !== themeType) {
      i--; // Retry
      continue;
    }

    const timestamp = Date.now() + i;
    const emoji = palette.type === 'dark' ? '🌙' : '☀️';
    const theme = generateThemeJson(palette, `XELA Fuzzed ${timestamp}`);

    const contrastLabel = validation.scores.mainText >= 7 ? 'AAA' : 'AA';

    // Better labeling for retro vs random
    let schemeLabel = palette.meta.colorScheme;
    if (retroSource) {
      schemeLabel = `📟 ${retroSource}`;
    }

    const hueDesc = `${Math.round(palette.meta.baseHue)}°`;

    items.push({
      label: `${emoji} ${palette.type === 'dark' ? 'Dark' : 'Light'} · ${schemeLabel}`,
      description: `${contrastLabel} · ${validation.scores.mainText.toFixed(1)}:1 · Accent: ${palette.colors.accent}`,
      detail: `Hue: ${hueDesc} · BG: ${palette.colors.bg} · FG: ${palette.colors.fg} · ${attempts} attempt(s)`,
      palette,
      validation,
      theme,
      colors: theme.colors,
      tokenColors: theme.tokenColors,
      retroSource
    });
  }

  return items;
}

/**
 * Generate a valid retro-inspired palette (local implementation)
 * @param {string|null} category - Category filter
 * @param {number} maxAttempts - Max attempts
 * @returns {Object} Result with palette, validation, attempts, retroSource
 */
function generateValidRetroPaletteLocal(category = null, maxAttempts = 50) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let retroPalette = null;

    if (category) {
      const categoryPalettes = getPalettesByCategory(category);
      if (categoryPalettes.length > 0) {
        retroPalette = categoryPalettes[Math.floor(Math.random() * categoryPalettes.length)];
      }
    } else {
      retroPalette = getRandomPalette();
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

/**
 * Get list of all available retro palettes
 * @returns {Array} List of retro palette info
 */
export function getRetroPaletteList() {
  return Object.entries(retroPalettes).map(([id, p]) => ({
    id,
    name: p.name,
    year: p.year,
    category: p.category,
    type: p.type
  }));
}

// Re-export for convenience
export { getCategories };
