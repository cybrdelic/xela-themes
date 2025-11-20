#!/usr/bin/env node
/**
 * Fix excessive bright colors by slightly darkening colors above 0.9 luminance
 * to improve visual comfort and reduce eye strain
 */

const fs = require('fs');
const path = require('1path');

const themesDir = path.join(__dirname, '..', 'themes');

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Convert RGB to hex
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Calculate relative luminance
function getLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Slightly darken overly bright colors
function toneDownBrightColor(hex) {
  const lum = getLuminance(hex);

  // If luminance > 0.9, reduce it slightly
  if (lum > 0.9) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;

    // Reduce each channel by a small amount to tone it down
    // More aggressive for very bright colors
    const factor = lum > 0.95 ? 0.95 : 0.97;

    return rgbToHex(
      Math.max(0, Math.round(rgb.r * factor)),
      Math.max(0, Math.round(rgb.g * factor)),
      Math.max(0, Math.round(rgb.b * factor))
    );
  }

  return hex;
}

// Process a theme file
function processTheme(themePath) {
  const content = fs.readFileSync(themePath, 'utf8');
  const theme = JSON.parse(content);

  if (!theme.colors) return 0;

  let fixed = 0;
  const brightKeys = [];

  // Track which keys had overly bright colors
  for (const [key, value] of Object.entries(theme.colors)) {
    if (typeof value === 'string' && value.startsWith('#')) {
      const lum = getLuminance(value);
      if (lum > 0.9) {
        const newColor = toneDownBrightColor(value);
        if (newColor !== value) {
          theme.colors[key] = newColor;
          brightKeys.push(key);
          fixed++;
        }
      }
    }
  }

  if (fixed > 0) {
    console.log(`${path.basename(themePath)}: toned down ${fixed} overly bright colors`);
    fs.writeFileSync(themePath, JSON.stringify(theme, null, 2), 'utf8');
  }

  return fixed;
}

// Main execution
function main() {
  const themeFiles = fs.readdirSync(themesDir)
    .filter(f => f.endsWith('-color-theme.json'))
    .map(f => path.join(themesDir, f));

  let totalFixed = 0;
  let themesModified = 0;

  console.log('Toning down excessively bright colors...\n');

  for (const themePath of themeFiles) {
    const fixed = processTheme(themePath);
    if (fixed > 0) {
      totalFixed += fixed;
      themesModified++;
    }
  }

  console.log(`\nModified ${themesModified} themes, toned down ${totalFixed} overly bright colors.`);
}

main();
