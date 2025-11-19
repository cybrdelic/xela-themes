#!/usr/bin/env node
/**
 * Fix statusbar contrast issues by darkening the background color
 * Target: minimum 3.0:1 contrast ratio with white text
 */

const fs = require('fs');
const path = require('path');

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

// Calculate contrast ratio
function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Darken a color by reducing RGB values proportionally
function darkenColor(hex, factor = 0.85) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  return rgbToHex(
    Math.max(0, Math.round(rgb.r * factor)),
    Math.max(0, Math.round(rgb.g * factor)),
    Math.max(0, Math.round(rgb.b * factor))
  );
}

// Find the right darkness to achieve target contrast
function adjustForContrast(bgHex, fgHex, targetContrast = 3.0) {
  let adjustedBg = bgHex;
  let factor = 0.95;
  let iterations = 0;
  const maxIterations = 20;

  while (getContrastRatio(adjustedBg, fgHex) < targetContrast && iterations < maxIterations) {
    adjustedBg = darkenColor(adjustedBg, factor);
    iterations++;
    factor -= 0.05; // Get more aggressive with each iteration
  }

  return adjustedBg;
}

// Fix a single theme file
function fixTheme(themePath) {
  const content = fs.readFileSync(themePath, 'utf8');
  const theme = JSON.parse(content);

  if (!theme.colors || !theme.colors['statusBar.background']) {
    return false;
  }

  const sbBg = theme.colors['statusBar.background'];
  let sbFg = theme.colors['statusBar.foreground'] || '#FFFFFF';

  // If using off-white (#F2F2F2 etc), change to pure white for better contrast
  if (getLuminance(sbFg) > 0.85 && sbFg !== '#FFFFFF') {
    theme.colors['statusBar.foreground'] = '#FFFFFF';
    sbFg = '#FFFFFF';
  }

  const currentContrast = getContrastRatio(sbBg, sbFg);

  if (currentContrast < 3.0) {
    const newBg = adjustForContrast(sbBg, sbFg, 3.0);
    const newContrast = getContrastRatio(newBg, sbFg);

    console.log(`${path.basename(themePath)}`);
    console.log(`  Old: ${sbBg} (${currentContrast.toFixed(2)}:1)`);
    console.log(`  New: ${newBg} (${newContrast.toFixed(2)}:1)`);

    theme.colors['statusBar.background'] = newBg;

    // Also update related statusbar colors to match
    if (theme.colors['statusBarItem.hoverBackground']) {
      theme.colors['statusBarItem.hoverBackground'] = darkenColor(newBg, 0.9);
    }

    fs.writeFileSync(themePath, JSON.stringify(theme, null, 2), 'utf8');
    return true;
  }

  return false;
}

// Main execution
function main() {
  const themeFiles = fs.readdirSync(themesDir)
    .filter(f => f.endsWith('-color-theme.json'))
    .map(f => path.join(themesDir, f));

  let fixed = 0;

  console.log('Fixing statusbar contrast issues...\n');

  for (const themePath of themeFiles) {
    if (fixTheme(themePath)) {
      fixed++;
    }
  }

  console.log(`\nFixed ${fixed} themes with poor statusbar contrast.`);
}

main();
