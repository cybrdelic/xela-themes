/**
 * XELA Color Utilities
 *
 * Core color manipulation functions for theme generation and validation.
 * Includes hex/RGB/HSL conversions, WCAG contrast calculations, and
 * accessible color generation.
 *
 * @module lib/color-utils
 */

// ============================================================================
// COLOR CONVERSIONS
// ============================================================================

/**
 * Convert hex color to RGB object
 * @param {string} hex - Hex color string (e.g., '#FF0000' or 'FF0000')
 * @returns {{r: number, g: number, b: number}|null} RGB object or null if invalid
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert RGB values to hex color string
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} Uppercase hex color string (e.g., '#FF0000')
 */
export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

/**
 * Convert HSL values to RGB object
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {{r: number, g: number, b: number}} RGB object
 */
export function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4))
  };
}

/**
 * Convert RGB values to HSL object
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {{h: number, s: number, l: number}} HSL object (h: 0-360, s: 0-100, l: 0-100)
 */
export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert hex color to HSL object
 * @param {string} hex - Hex color string
 * @returns {{h: number, s: number, l: number}|null} HSL object or null if invalid
 */
export function hexToHsl(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

/**
 * Convert HSL values to hex color string
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {string} Hex color string
 */
export function hslToHex(h, s, l) {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// ============================================================================
// WCAG CONTRAST CALCULATIONS
// ============================================================================

/**
 * Get relative luminance for WCAG contrast calculation
 * @param {string} hex - Hex color string
 * @returns {number} Relative luminance (0-1)
 */
export function getLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate WCAG contrast ratio between two colors
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @returns {number} Contrast ratio (1-21)
 */
export function getContrastRatio(color1, color2) {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast meets WCAG AA standard (4.5:1 for normal text)
 * @param {string} foreground - Foreground hex color
 * @param {string} background - Background hex color
 * @returns {boolean}
 */
export function meetsContrastAA(foreground, background) {
  return getContrastRatio(foreground, background) >= 4.5;
}

/**
 * Check if contrast meets WCAG AAA standard (7:1 for normal text)
 * @param {string} foreground - Foreground hex color
 * @param {string} background - Background hex color
 * @returns {boolean}
 */
export function meetsContrastAAA(foreground, background) {
  return getContrastRatio(foreground, background) >= 7;
}

/**
 * Check if contrast is acceptable for large text/UI (3:1)
 * @param {string} foreground - Foreground hex color
 * @param {string} background - Background hex color
 * @returns {boolean}
 */
export function meetsContrastUI(foreground, background) {
  return getContrastRatio(foreground, background) >= 3;
}

// ============================================================================
// COLOR MANIPULATION
// ============================================================================

/**
 * Adjust lightness of a color
 * @param {string} hex - Hex color string
 * @param {number} amount - Amount to adjust (-100 to 100)
 * @returns {string} Adjusted hex color
 */
export function adjustLightness(hex, amount) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.l = Math.max(0, Math.min(100, hsl.l + amount));
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Desaturate a color
 * @param {string} hex - Hex color string
 * @param {number} amount - Amount to desaturate (0-100)
 * @returns {string} Desaturated hex color
 */
export function desaturate(hex, amount) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.s = Math.max(0, hsl.s - amount);
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Saturate a color
 * @param {string} hex - Hex color string
 * @param {number} amount - Amount to saturate (0-100)
 * @returns {string} Saturated hex color
 */
export function saturate(hex, amount) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.s = Math.min(100, hsl.s + amount);
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Lighten a color
 * @param {string} hex - Hex color string
 * @param {number} amount - Amount to lighten (0-1)
 * @returns {string} Lightened hex color
 */
export function lighten(hex, amount = 0.1) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return rgbToHex(
    Math.round(rgb.r + (255 - rgb.r) * amount),
    Math.round(rgb.g + (255 - rgb.g) * amount),
    Math.round(rgb.b + (255 - rgb.b) * amount)
  );
}

/**
 * Darken a color
 * @param {string} hex - Hex color string
 * @param {number} amount - Amount to darken (0-1)
 * @returns {string} Darkened hex color
 */
export function darken(hex, amount = 0.1) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return rgbToHex(
    Math.round(rgb.r * (1 - amount)),
    Math.round(rgb.g * (1 - amount)),
    Math.round(rgb.b * (1 - amount))
  );
}

/**
 * Mix two colors together
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @param {number} ratio - Mix ratio (0 = all color1, 1 = all color2)
 * @returns {string} Mixed hex color
 */
export function mix(color1, color2, ratio = 0.5) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  if (!c1 || !c2) return color1;

  return rgbToHex(
    Math.round(c1.r + (c2.r - c1.r) * ratio),
    Math.round(c1.g + (c2.g - c1.g) * ratio),
    Math.round(c1.b + (c2.b - c1.b) * ratio)
  );
}

/**
 * Add alpha channel to hex color
 * @param {string} hex - Hex color string (6 digits)
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} Hex color with alpha (8 digits)
 */
export function withAlpha(hex, alpha) {
  const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0').toUpperCase();
  return hex.slice(0, 7) + alphaHex;
}

/**
 * Extract the dominant hue from a hex color
 * @param {string} hex - Hex color string
 * @returns {number} Hue value (0-360)
 */
export function getHueFromHex(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return hsl.h;
}

// ============================================================================
// ACCESSIBLE COLOR GENERATION
// ============================================================================

/**
 * Generate a random hue (0-360)
 * @returns {number} Random hue value
 */
export function randomHue() {
  return Math.floor(Math.random() * 360);
}

/**
 * Generate harmonious color hues based on color theory
 * @param {number} baseHue - Base hue (0-360)
 * @param {string} scheme - Color scheme type
 * @returns {number[]} Array of harmonious hues
 */
export function generateHarmoniousHues(baseHue, scheme = 'complementary') {
  const schemes = {
    complementary: [baseHue, (baseHue + 180) % 360],
    analogous: [baseHue, (baseHue + 30) % 360, (baseHue + 330) % 360],
    triadic: [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360],
    splitComplementary: [baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360],
    tetradic: [baseHue, (baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360],
  };
  return schemes[scheme] || schemes.complementary;
}

/**
 * Generate a color that meets contrast requirements against a background
 * @param {string} background - Background hex color
 * @param {number} minContrast - Minimum contrast ratio required
 * @param {number|null} targetSaturation - Target saturation (0-100) or null for random
 * @param {number|null} targetHue - Target hue (0-360) or null for random
 * @returns {string} Accessible hex color
 */
export function generateAccessibleColor(background, minContrast = 4.5, targetSaturation = null, targetHue = null) {
  const bgLuminance = getLuminance(background);
  const isLightBg = bgLuminance > 0.179;

  // Try to find a color that meets contrast
  for (let attempt = 0; attempt < 100; attempt++) {
    const hue = targetHue !== null ? targetHue : randomHue();
    const saturation = targetSaturation !== null ? targetSaturation : 50 + Math.random() * 50;

    // For light backgrounds, use darker colors; for dark backgrounds, use lighter colors
    let lightness;
    if (isLightBg) {
      // Light background - need dark text
      if (minContrast >= 7) {
        lightness = 5 + Math.random() * 25; // 5-30% for AAA contrast
      } else if (minContrast >= 4.5) {
        lightness = 10 + Math.random() * 35; // 10-45% for AA contrast
      } else {
        lightness = 15 + Math.random() * 40; // 15-55% for UI contrast
      }
    } else {
      // Dark background - need light text
      if (minContrast >= 7) {
        lightness = 75 + Math.random() * 20; // 75-95% for AAA contrast
      } else if (minContrast >= 4.5) {
        lightness = 65 + Math.random() * 30; // 65-95% for AA contrast
      } else {
        lightness = 55 + Math.random() * 40; // 55-95% for UI contrast
      }
    }

    const rgb = hslToRgb(hue, saturation, lightness);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

    if (getContrastRatio(hex, background) >= minContrast) {
      return hex;
    }
  }

  // Fallback: return black or white based on background
  return isLightBg ? '#000000' : '#FFFFFF';
}

/**
 * Adjust a color to meet minimum contrast while preserving its character
 * @param {string} color - Original hex color
 * @param {string} background - Background hex color
 * @param {number} minContrast - Minimum contrast ratio required
 * @returns {string} Adjusted hex color
 */
export function adjustColorForContrast(color, background, minContrast) {
  const currentContrast = getContrastRatio(color, background);
  if (currentContrast >= minContrast) return color;

  const rgb = hexToRgb(color);
  if (!rgb) return color;

  const bgLum = getLuminance(background);
  const isLightBg = bgLum > 0.5;
  let { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  for (let i = 0; i < 50; i++) {
    if (isLightBg) {
      l = Math.max(0, l - 3); // Darken for light backgrounds
    } else {
      l = Math.min(100, l + 3); // Lighten for dark backgrounds
    }

    const newRgb = hslToRgb(h, s, l);
    const newColor = rgbToHex(newRgb.r, newRgb.g, newRgb.b);

    if (getContrastRatio(newColor, background) >= minContrast) {
      return newColor;
    }
  }

  // If we can't achieve contrast, generate a new accessible color with same hue
  return generateAccessibleColor(background, minContrast, s, h);
}
