/**
 * Color Utility Functions
 * Provides color manipulation, conversion, and analysis utilities
 */

/**
 * Parse a hex color string to RGB components
 * @param {string} hex - Hex color string (#RGB, #RRGGBB, or #RRGGBBAA)
 * @returns {{r: number, g: number, b: number, a: number} | null}
 */
function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return null;

  hex = hex.replace('#', '').toUpperCase();

  // Handle shorthand (#RGB)
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Handle shorthand with alpha (#RGBA)
  if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  // Extract alpha if present
  let alpha = 1;
  if (hex.length === 8) {
    alpha = parseInt(hex.substring(6, 8), 16) / 255;
    hex = hex.substring(0, 6);
  }

  if (hex.length !== 6) return null;

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;

  return { r, g, b, a: alpha };
}

/**
 * Convert RGB to hex string
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @param {number} [a] - Alpha (0-1)
 * @returns {string}
 */
function rgbToHex(r, g, b, a = 1) {
  const toHex = (n) => Math.round(Math.max(0, Math.min(255, n)))
    .toString(16)
    .padStart(2, '0');

  let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (a < 1) {
    hex += toHex(a * 255);
  }
  return hex.toUpperCase();
}

/**
 * Convert RGB to HSL
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {{h: number, s: number, l: number}}
 */
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
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
 * Convert HSL to RGB
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {{r: number, g: number, b: number}}
 */
function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * Calculate relative luminance per WCAG 2.1
 * @param {string} hex - Hex color string
 * @returns {number} Luminance value (0-1)
 */
function getRelativeLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const { r, g, b } = rgb;

  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate contrast ratio between two colors per WCAG 2.1
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @returns {number} Contrast ratio (1-21)
 */
function getContrastRatio(color1, color2) {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if a color combination meets WCAG AA standard
 * @param {string} foreground - Foreground color
 * @param {string} background - Background color
 * @param {boolean} [largeText=false] - Whether text is large (14pt bold or 18pt regular)
 * @returns {boolean}
 */
function meetsWcagAA(foreground, background, largeText = false) {
  const ratio = getContrastRatio(foreground, background);
  return largeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check if a color combination meets WCAG AAA standard
 * @param {string} foreground - Foreground color
 * @param {string} background - Background color
 * @param {boolean} [largeText=false] - Whether text is large
 * @returns {boolean}
 */
function meetsWcagAAA(foreground, background, largeText = false) {
  const ratio = getContrastRatio(foreground, background);
  return largeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Blend two colors with optional alpha
 * @param {string} foreground - Foreground color (may have alpha)
 * @param {string} background - Background color
 * @returns {string} Blended hex color
 */
function blendColors(foreground, background) {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);

  if (!fg || !bg) return foreground;

  const alpha = fg.a;
  if (alpha >= 1) return foreground;

  const r = Math.round(fg.r * alpha + bg.r * (1 - alpha));
  const g = Math.round(fg.g * alpha + bg.g * (1 - alpha));
  const b = Math.round(fg.b * alpha + bg.b * (1 - alpha));

  return rgbToHex(r, g, b);
}

/**
 * Get perceived brightness of a color (0-255)
 * @param {string} hex - Hex color
 * @returns {number}
 */
function getPerceivedBrightness(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  // Using perceived brightness formula
  return Math.sqrt(
    0.299 * rgb.r * rgb.r +
    0.587 * rgb.g * rgb.g +
    0.114 * rgb.b * rgb.b
  );
}

/**
 * Determine if a color is "light" or "dark"
 * @param {string} hex - Hex color
 * @returns {'light' | 'dark'}
 */
function getColorType(hex) {
  return getPerceivedBrightness(hex) > 127 ? 'light' : 'dark';
}

/**
 * Calculate color distance (Euclidean in RGB space)
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @returns {number} Distance (0-441.67)
 */
function getColorDistance(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return Infinity;

  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
}

/**
 * Generate a random hex color
 * @returns {string}
 */
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

/**
 * Adjust color lightness
 * @param {string} hex - Hex color
 * @param {number} amount - Amount to adjust (-100 to 100)
 * @returns {string}
 */
function adjustLightness(hex, amount) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.l = Math.max(0, Math.min(100, hsl.l + amount));

  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b, rgb.a);
}

/**
 * Adjust color saturation
 * @param {string} hex - Hex color
 * @param {number} amount - Amount to adjust (-100 to 100)
 * @returns {string}
 */
function adjustSaturation(hex, amount) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.s = Math.max(0, Math.min(100, hsl.s + amount));

  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b, rgb.a);
}

module.exports = {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  getRelativeLuminance,
  getContrastRatio,
  meetsWcagAA,
  meetsWcagAAA,
  blendColors,
  getPerceivedBrightness,
  getColorType,
  getColorDistance,
  randomColor,
  adjustLightness,
  adjustSaturation
};
