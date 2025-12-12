/**
 * XELA Retro & Classic Color Palettes - Index
 *
 * Central export point for all retro palette collections.
 * Combines palettes from various categories into a single object.
 *
 * @module lib/palettes
 */

import { brandPalettes } from './brand.js';
import { classicAppPalettes } from './classic-app.js';
import { classicIdePalettes } from './classic-ide.js';
import { classicOsPalettes } from './classic-os.js';
import { designMovementPalettes } from './design-movement.js';
import { retroGamesPalettes } from './retro-games.js';
import { retroTerminalPalettes } from './retro-terminal.js';
import { vintageComputingPalettes } from './vintage-computing.js';

/**
 * All retro palettes combined into a single object
 */
export const retroPalettes = {
  ...vintageComputingPalettes,
  ...classicOsPalettes,
  ...classicIdePalettes,
  ...designMovementPalettes,
  ...retroTerminalPalettes,
  ...retroGamesPalettes,
  ...classicAppPalettes,
  ...brandPalettes,
};

/**
 * Get all palettes in a specific category
 * @param {string} category - Category name
 * @returns {Array} Array of palette objects with id
 */
export function getPalettesByCategory(category) {
  return Object.entries(retroPalettes)
    .filter(([_, p]) => p.category === category)
    .map(([id, p]) => ({ id, ...p }));
}

/**
 * Get all dark theme palettes
 * @returns {Array} Array of dark palette objects
 */
export function getDarkPalettes() {
  return Object.entries(retroPalettes)
    .filter(([_, p]) => p.type === 'dark')
    .map(([id, p]) => ({ id, ...p }));
}

/**
 * Get all light theme palettes
 * @returns {Array} Array of light palette objects
 */
export function getLightPalettes() {
  return Object.entries(retroPalettes)
    .filter(([_, p]) => p.type === 'light')
    .map(([id, p]) => ({ id, ...p }));
}

/**
 * Get a random palette
 * @param {'dark'|'light'|null} type - Optional type filter
 * @returns {Object} Random palette with id
 */
export function getRandomPalette(type = null) {
  let palettes = Object.entries(retroPalettes);
  if (type) {
    palettes = palettes.filter(([_, p]) => p.type === type);
  }
  const [id, palette] = palettes[Math.floor(Math.random() * palettes.length)];
  return { id, ...palette };
}

/**
 * Extract accent colors from a palette (most saturated/bright colors)
 * @param {Object} palette - Palette object with colors
 * @returns {string[]} Array of hex color strings suitable as accents
 */
export function extractAccentColors(palette) {
  const colors = Object.values(palette.colors);
  return colors.filter(hex => {
    if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return false;
    // Filter out near-black and near-white
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r + g + b) / 3;
    return brightness > 30 && brightness < 225;
  });
}

/**
 * Get all unique category names
 * @returns {string[]} Array of category names
 */
export function getCategories() {
  const categories = new Set();
  Object.values(retroPalettes).forEach(p => categories.add(p.category));
  return Array.from(categories);
}

/**
 * Get palette by ID
 * @param {string} id - Palette ID
 * @returns {Object|null} Palette object or null if not found
 */
export function getPaletteById(id) {
  if (retroPalettes[id]) {
    return { id, ...retroPalettes[id] };
  }
  return null;
}

/**
 * Get palettes matching a search term (in name or category)
 * @param {string} term - Search term
 * @returns {Array} Matching palettes
 */
export function searchPalettes(term) {
  const lowerTerm = term.toLowerCase();
  return Object.entries(retroPalettes)
    .filter(([id, p]) =>
      id.toLowerCase().includes(lowerTerm) ||
      p.name.toLowerCase().includes(lowerTerm) ||
      p.category.toLowerCase().includes(lowerTerm)
    )
    .map(([id, p]) => ({ id, ...p }));
}

// Default export for backwards compatibility
export default retroPalettes;
