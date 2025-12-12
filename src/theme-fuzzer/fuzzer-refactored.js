/**
 * XELA Theme Fuzzer
 *
 * Generates random accessible themes with live preview in VS Code.
 * This module has been refactored to use shared utilities from src/lib.
 *
 * Run: node src/theme-fuzzer/fuzzer.js
 * Then use "XELA: Fuzz Themes" command in VS Code
 *
 * @module theme-fuzzer/fuzzer
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import from shared library
import {
    generateAccessiblePalette,
    generateRetroInspiredPalette,
    generateThemeJson,
    generateValidPalette,
    getContrastRatio,
    meetsContrastAA,
    meetsContrastAAA,
    meetsContrastUI,
    validatePalette,
} from '../lib/index.js';

// Import retro palette utilities
import retroPalettes, {
    extractAccentColors,
    getCategories,
    getPalettesByCategory,
    getRandomPalette,
} from './retro-palettes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============================================================================
// RETRO PALETTE INTEGRATION
// ============================================================================

/**
 * Generate a valid retro-inspired palette (with retries)
 * @param {string|null} categoryOrId - Category name to filter by, or specific palette ID
 * @param {number} maxAttempts - Max generation attempts
 * @returns {{palette: Object, validation: Object, attempts: number, retroSource: string|null}}
 */
function generateValidRetroPalette(categoryOrId = null, maxAttempts = 50) {
  const categories = getCategories();
  const isCategory = categoryOrId === null || categories.includes(categoryOrId);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let retroPalette = null;

    if (isCategory && categoryOrId) {
      // Pick random palette from category
      const categoryPalettes = getPalettesByCategory(categoryOrId);
      if (categoryPalettes.length > 0) {
        retroPalette = categoryPalettes[Math.floor(Math.random() * categoryPalettes.length)];
      }
    } else if (!isCategory && categoryOrId && retroPalettes[categoryOrId]) {
      // Use specific palette ID
      retroPalette = { id: categoryOrId, ...retroPalettes[categoryOrId] };
    } else {
      // Random palette
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
 * @returns {Array<{id: string, name: string, year: number, category: string, type: string}>}
 */
function getRetroPaletteList() {
  return Object.entries(retroPalettes).map(([id, p]) => ({
    id,
    name: p.name,
    year: p.year,
    category: p.category,
    type: p.type
  }));
}

/**
 * Get retro palettes by category
 * @param {string} category - Category to filter by
 * @returns {Array} Palettes in the category
 */
function getRetroPalettesByCategory(category) {
  return getPalettesByCategory(category);
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
    // Re-export from retro-palettes
    extractAccentColors,
    // Re-export from lib for backwards compatibility
    generateAccessiblePalette,
    generateThemeJson,
    generateValidPalette,
    // Local functions
    generateValidRetroPalette, getCategories, getContrastRatio, getRetroPaletteList,
    getRetroPalettesByCategory, meetsContrastAA,
    meetsContrastAAA,
    meetsContrastUI, retroPalettes, validatePalette
};

// ============================================================================
// CLI MODE
// ============================================================================

if (process.argv[1] && process.argv[1].includes('fuzzer.js')) {
  const count = parseInt(process.argv[2]) || 5;
  const outputDir = path.join(__dirname, '../../themes-fuzzed');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\n🎲 XELA Theme Fuzzer - Generating ${count} accessible themes...\n`);

  for (let i = 0; i < count; i++) {
    const { palette, validation, attempts } = generateValidPalette();
    const timestamp = Date.now();
    const name = `XELA Fuzzed ${palette.type === 'dark' ? '🌙' : '☀️'} #${timestamp}`;
    const theme = generateThemeJson(palette, name);

    const filename = `xela-fuzzed-${timestamp}-color-theme.json`;
    const filepath = path.join(outputDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(theme, null, 2));

    const status = validation.valid ? '✅' : '⚠️';
    console.log(`${status} ${name}`);
    console.log(`   Type: ${palette.type}, Hue: ${palette.meta.baseHue}°, Scheme: ${palette.meta.colorScheme}`);
    console.log(`   Contrast: text=${validation.scores.mainText.toFixed(1)}:1, accent=${validation.scores.accent?.toFixed(1) || 'N/A'}:1`);
    console.log(`   Generated in ${attempts} attempt(s)`);
    console.log(`   → ${filename}\n`);
  }

  console.log(`\n✨ Done! Themes saved to: ${outputDir}`);
  console.log(`\nTo preview in VS Code:`);
  console.log(`  1. Add themes-fuzzed to package.json contributes.themes`);
  console.log(`  2. Or use the live fuzzer command (Cmd/Ctrl+Shift+P > "XELA: Fuzz Theme")\n`);
}
