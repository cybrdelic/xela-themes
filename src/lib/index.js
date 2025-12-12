/**
 * XELA Themes - Shared Library
 *
 * Central export point for all theme utilities and generators.
 *
 * @module lib
 */

// Color Utilities
export {
    adjustColorForContrast,
    adjustLightness,
    darken,
    desaturate,
    generateAccessibleColor,
    generateHarmoniousHues,
    getContrastRatio,
    getHueFromHex,
    getLuminance,
    hexToHsl,
    hexToRgb,
    hslToHex,
    hslToRgb,
    lighten,
    meetsContrastAA,
    meetsContrastAAA,
    meetsContrastUI,
    mix,
    randomHue,
    rgbToHex,
    rgbToHsl,
    saturate,
    withAlpha
} from './color-utils.js';

// Theme Validation
export {
    checkContrast,
    getAccessibilityReport,
    validatePalette
} from './theme-validator.js';

// Palette Generation
export {
    generateAccessiblePalette,
    generateRetroInspiredPalette,
    generateValidPalette,
    generateValidRetroPalette
} from './palette-generator.js';

// Theme Building
export {
    buildExtendedTokenColors,
    buildSemanticTokenColors,
    generateThemeJson
} from './theme-builder.js';

// Retro Palettes
export {
    extractAccentColors,
    getCategories,
    getDarkPalettes,
    getLightPalettes,
    getPaletteById,
    getPalettesByCategory,
    getRandomPalette,
    retroPalettes,
    searchPalettes
} from './palettes/index.js';
