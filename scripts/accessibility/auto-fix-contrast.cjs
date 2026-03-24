#!/usr/bin/env node
/**
 * Theme Accessibility Auto-Fixer
 * Automatically fixes contrast issues in existing theme files
 * 
 * This script patches theme JSON files in-place to ensure all critical
 * UI elements meet WCAG contrast requirements.
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', '..', 'themes');

// WCAG contrast requirements
const CONTRAST = {
  AA: 4.5,
  AA_LARGE: 3.0,
  UI: 3.0
};

// Critical pairs that must meet contrast requirements
const CRITICAL_PAIRS = [
  { fg: 'editorLineNumber.foreground', bg: 'editor.background', min: CONTRAST.AA_LARGE },
  { fg: 'editorLineNumber.activeForeground', bg: 'editor.background', min: CONTRAST.AA },
  { fg: 'editorCursor.foreground', bg: 'editor.background', min: CONTRAST.UI },
  { fg: 'activityBarBadge.foreground', bg: 'activityBarBadge.background', min: CONTRAST.AA },
  { fg: 'badge.foreground', bg: 'badge.background', min: CONTRAST.AA },
  { fg: 'button.foreground', bg: 'button.background', min: CONTRAST.AA },
  { fg: 'statusBarItem.errorForeground', bg: 'statusBarItem.errorBackground', min: CONTRAST.AA },
  { fg: 'statusBarItem.warningForeground', bg: 'statusBarItem.warningBackground', min: CONTRAST.AA },
  { fg: 'statusBarItem.remoteForeground', bg: 'statusBarItem.remoteBackground', min: CONTRAST.AA },
  { fg: 'tab.activeForeground', bg: 'tab.activeBackground', min: CONTRAST.AA },
  { fg: 'tab.inactiveForeground', bg: 'tab.inactiveBackground', min: CONTRAST.AA_LARGE },
  { fg: 'input.foreground', bg: 'input.background', min: CONTRAST.AA },
  { fg: 'input.placeholderForeground', bg: 'input.background', min: CONTRAST.AA_LARGE },
  { fg: 'terminal.foreground', bg: 'terminal.background', min: CONTRAST.AA },
  { fg: 'breadcrumb.foreground', bg: 'editor.background', min: CONTRAST.AA_LARGE },
  { fg: 'sideBar.foreground', bg: 'sideBar.background', min: CONTRAST.AA },
  { fg: 'titleBar.activeForeground', bg: 'titleBar.activeBackground', min: CONTRAST.AA },
];

// Color utilities
function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return null;
  // Handle 8-char hex (with alpha)
  const clean = hex.replace('#', '').slice(0, 6);
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  const bigint = parseInt(clean, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function rgbToHex(r, g, b) {
  const clamp = v => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [r, g, b].map(x => clamp(x).toString(16).padStart(2, '0')).join('').toUpperCase();
}

function getLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(fg, bg) {
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function adjustColorForContrast(fg, bg, minContrast) {
  if (!fg || !bg) return fg;
  let ratio = getContrastRatio(fg, bg);
  if (ratio >= minContrast) return fg;

  const bgLum = getLuminance(bg);
  const isLightBg = bgLum > 0.5;
  const rgb = hexToRgb(fg);
  if (!rgb) return fg;

  let { r, g, b } = rgb;

  for (let i = 0; i < 100 && ratio < minContrast; i++) {
    if (isLightBg) {
      r = Math.max(0, r - 5);
      g = Math.max(0, g - 5);
      b = Math.max(0, b - 5);
    } else {
      r = Math.min(255, r + 5);
      g = Math.min(255, g + 5);
      b = Math.min(255, b + 5);
    }
    const adjusted = rgbToHex(r, g, b);
    ratio = getContrastRatio(adjusted, bg);
    if (ratio >= minContrast) return adjusted;
  }

  return isLightBg ? '#000000' : '#FFFFFF';
}

function fixThemeContrast(themePath) {
  const content = fs.readFileSync(themePath, 'utf8');
  let theme;
  try {
    theme = JSON.parse(content);
  } catch (e) {
    console.error(`  ❌ Failed to parse: ${path.basename(themePath)}`);
    return { fixed: false, changes: [] };
  }

  if (!theme.colors) {
    return { fixed: false, changes: [] };
  }

  const changes = [];
  const colors = theme.colors;

  for (const pair of CRITICAL_PAIRS) {
    const fg = colors[pair.fg];
    const bg = colors[pair.bg];

    if (!fg || !bg) continue;

    const ratio = getContrastRatio(fg, bg);
    if (ratio < pair.min) {
      const fixed = adjustColorForContrast(fg, bg, pair.min);
      if (fixed !== fg) {
        colors[pair.fg] = fixed;
        changes.push({
          key: pair.fg,
          from: fg,
          to: fixed,
          ratio: ratio.toFixed(2),
          required: pair.min
        });
      }
    }
  }

  if (changes.length > 0) {
    fs.writeFileSync(themePath, JSON.stringify(theme, null, 2));
    return { fixed: true, changes };
  }

  return { fixed: false, changes: [] };
}

function main() {
  console.log('\n🔧 XELA Theme Accessibility Auto-Fixer\n');

  const files = fs.readdirSync(THEMES_DIR)
    .filter(f => f.endsWith('.json') && !f.endsWith('.backup'));

  console.log(`Found ${files.length} theme files\n`);

  let totalFixed = 0;
  let totalChanges = 0;

  for (const file of files) {
    const themePath = path.join(THEMES_DIR, file);
    const result = fixThemeContrast(themePath);

    if (result.fixed) {
      totalFixed++;
      totalChanges += result.changes.length;
      console.log(`  ✅ Fixed: ${file}`);
      for (const change of result.changes) {
        console.log(`      ${change.key}: ${change.from} → ${change.to} (was ${change.ratio}:1, need ${change.required}:1)`);
      }
    }
  }

  console.log('\n' + '═'.repeat(50));
  console.log(`  Themes fixed: ${totalFixed}`);
  console.log(`  Total changes: ${totalChanges}`);
  console.log('═'.repeat(50) + '\n');
}

main();
