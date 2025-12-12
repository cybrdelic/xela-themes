#!/usr/bin/env node
/**
 * Test theme completeness and contrast levels
 * Enforces that all themes have required color properties and meet contrast standards
 */

const fs = require('fs');
const path = require('path');

const themesDir = path.join(__dirname, '..', 'themes');

// Reference themes that are considered "complete"
const REFERENCE_THEMES = [
  'xela-windows-xp-color-theme.json',
  'xela-macos-classic-color-theme.json',
  'xela-startup-hackathon-sprint-color-theme.json',
  'xela-oled-perfect-color-theme.json'
];

// Essential color properties that MUST be defined in every theme
const REQUIRED_COLORS = [
  // Title bar
  'titleBar.activeBackground',
  'titleBar.activeForeground',
  'titleBar.inactiveBackground',
  'titleBar.inactiveForeground',
  'titleBar.border',

  // Activity bar
  'activityBar.background',
  'activityBar.foreground',
  'activityBar.inactiveForeground',
  'activityBar.activeBorder',
  'activityBarBadge.background',
  'activityBarBadge.foreground',

  // Sidebar
  'sideBar.background',
  'sideBar.foreground',
  'sideBar.border',
  'sideBarTitle.foreground',
  'sideBarSectionHeader.background',
  'sideBarSectionHeader.foreground',

  // Status bar
  'statusBar.background',
  'statusBar.foreground',
  'statusBar.border',
  'statusBar.noFolderBackground',
  'statusBar.debuggingBackground',
  'statusBar.debuggingForeground',

  // Panel
  'panel.background',
  'panel.border',
  'panelTitle.activeForeground',
  'panelTitle.activeBorder',
  'panelTitle.inactiveForeground',

  // Editor groups and tabs
  'editorGroupHeader.tabsBackground',
  'editorGroupHeader.tabsBorder',
  'editorGroup.border',
  'tab.activeBackground',
  'tab.activeForeground',
  'tab.inactiveBackground',
  'tab.inactiveForeground',
  'tab.border',
  'tab.activeBorderTop',

  // Editor
  'editor.background',
  'editor.foreground',
  'editorCursor.foreground',
  'editor.lineHighlightBackground',
  'editorLineNumber.foreground',
  'editorLineNumber.activeForeground',
  'editor.selectionBackground',
  'editor.inactiveSelectionBackground',
  'editor.selectionHighlightBackground',
  'editor.wordHighlightBackground',
  'editor.wordHighlightStrongBackground',
  'editor.findMatchBackground',
  'editor.findMatchHighlightBackground',

  // Editor widgets
  'editorHoverWidget.background',
  'editorHoverWidget.border',
  'editorWidget.background',
  'editorWidget.border',
  'editorWidget.foreground',

  // Editor brackets and indents
  'editorIndentGuide.background1',
  'editorIndentGuide.activeBackground1',
  'editorBracketMatch.background',
  'editorBracketMatch.border',

  // Editor gutter
  'editorGutter.addedBackground',
  'editorGutter.deletedBackground',
  'editorGutter.modifiedBackground',

  // Errors and warnings
  'editorWarning.foreground',
  'editorError.foreground',
  'editorInfo.foreground',

  // Scrollbar
  'scrollbarSlider.background',
  'scrollbarSlider.hoverBackground',
  'scrollbarSlider.activeBackground',

  // Lists
  'list.hoverBackground',
  'list.activeSelectionBackground',
  'list.activeSelectionForeground',
  'list.inactiveSelectionBackground',
  'list.inactiveSelectionForeground',
  'list.focusBackground',
  'list.focusForeground',
  'list.highlightForeground',

  // Buttons
  'button.background',
  'button.foreground',
  'button.hoverBackground',
  'button.secondaryBackground',
  'button.secondaryForeground',

  // Inputs
  'input.background',
  'input.border',
  'input.foreground',
  'input.placeholderForeground',

  // Dropdowns
  'dropdown.background',
  'dropdown.border',
  'dropdown.foreground',

  // Badge
  'badge.background',
  'badge.foreground',

  // Terminal
  'terminal.background',
  'terminal.foreground',
  'terminal.ansiBlack',
  'terminal.ansiRed',
  'terminal.ansiGreen',
  'terminal.ansiYellow',
  'terminal.ansiBlue',
  'terminal.ansiMagenta',
  'terminal.ansiCyan',
  'terminal.ansiWhite',
  'terminal.ansiBrightBlack',
  'terminal.ansiBrightRed',
  'terminal.ansiBrightGreen',
  'terminal.ansiBrightYellow',
  'terminal.ansiBrightBlue',
  'terminal.ansiBrightMagenta',
  'terminal.ansiBrightCyan',
  'terminal.ansiBrightWhite',
  'terminalCursor.foreground',

  // Git decorations
  'gitDecoration.addedResourceForeground',
  'gitDecoration.modifiedResourceForeground',
  'gitDecoration.deletedResourceForeground',
  'gitDecoration.untrackedResourceForeground',
  'gitDecoration.ignoredResourceForeground',
  'gitDecoration.conflictingResourceForeground',

  // Focus and selection
  'focusBorder',
  'selection.background',

  // Notifications
  'notificationCenter.border',
  'notificationCenterHeader.background',
  'notificationCenterHeader.foreground',
  'notifications.background',
  'notifications.foreground',
  'notifications.border',
  'notificationsErrorIcon.foreground',
  'notificationsWarningIcon.foreground',
  'notificationsInfoIcon.foreground',

  // Problems
  'problemsErrorIcon.foreground',
  'problemsWarningIcon.foreground',
  'problemsInfoIcon.foreground',

  // Testing
  'testing.iconFailed',
  'testing.iconPassed',

  // Peek view
  'peekViewResult.background',
  'peekViewEditor.background',
  'peekView.border',

  // Menu
  'menu.background',
  'menu.foreground',
  'menu.selectionBackground',
  'menu.selectionForeground',

  // Quick input
  'quickInput.background',
  'quickInput.foreground'
];

// Critical contrast pairs that must meet WCAG AA standards (4.5:1 for normal text)
const CRITICAL_CONTRAST_PAIRS = [
  // UI text readability
  ['titleBar.activeBackground', 'titleBar.activeForeground'],
  ['activityBar.background', 'activityBar.foreground'],
  ['sideBar.background', 'sideBar.foreground'],
  ['sideBarSectionHeader.background', 'sideBarSectionHeader.foreground'],
  ['statusBar.background', 'statusBar.foreground'],
  ['statusBar.debuggingBackground', 'statusBar.debuggingForeground'],
  ['panel.background', 'panelTitle.activeForeground'],
  ['tab.activeBackground', 'tab.activeForeground'],
  ['tab.inactiveBackground', 'tab.inactiveForeground'],

  // Editor readability (most critical)
  ['editor.background', 'editor.foreground'],
  ['editor.background', 'editorLineNumber.activeForeground'],

  // Widget readability
  ['editorWidget.background', 'editorWidget.foreground'],
  ['editorHoverWidget.background', 'editorWidget.foreground'],

  // List readability
  ['list.activeSelectionBackground', 'list.activeSelectionForeground'],
  ['list.inactiveSelectionBackground', 'list.inactiveSelectionForeground'],

  // Button readability
  ['button.background', 'button.foreground'],
  ['button.secondaryBackground', 'button.secondaryForeground'],

  // Input readability
  ['input.background', 'input.foreground'],

  // Badge readability
  ['badge.background', 'badge.foreground'],
  ['activityBarBadge.background', 'activityBarBadge.foreground'],

  // Terminal readability
  ['terminal.background', 'terminal.foreground'],

  // Notification readability
  ['notifications.background', 'notifications.foreground'],
  ['notificationCenterHeader.background', 'notificationCenterHeader.foreground'],

  // Menu readability
  ['menu.background', 'menu.foreground'],
  ['menu.selectionBackground', 'menu.selectionForeground'],

  // Quick input readability
  ['quickInput.background', 'quickInput.foreground']
];

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex) {
  // Remove alpha channel if present
  const cleanHex = hex.replace(/^#/, '').substring(0, 6);
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate relative luminance (WCAG 2.0)
 */
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

/**
 * Calculate contrast ratio between two colors (WCAG 2.0)
 */
function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Test theme completeness
 */
function testThemeCompleteness(themePath, referenceColors) {
  const themeName = path.basename(themePath);
  const content = fs.readFileSync(themePath, 'utf8');
  const theme = JSON.parse(content);

  if (!theme.colors) {
    return {
      passed: false,
      errors: ['Missing "colors" object'],
      warnings: [],
      missing: REQUIRED_COLORS
    };
  }

  const errors = [];
  const warnings = [];
  const missing = [];

  // Check for required colors
  for (const colorKey of REQUIRED_COLORS) {
    if (!theme.colors[colorKey]) {
      missing.push(colorKey);
    }
  }

  // Check for colors in reference themes but not in this theme
  const extraMissing = [];
  for (const colorKey of Object.keys(referenceColors)) {
    if (!theme.colors[colorKey] && !REQUIRED_COLORS.includes(colorKey)) {
      extraMissing.push(colorKey);
    }
  }

  if (missing.length > 0) {
    errors.push(`Missing ${missing.length} required color properties`);
  }

  if (extraMissing.length > 10) {
    warnings.push(`Missing ${extraMissing.length} optional color properties found in reference themes`);
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    missing,
    extraMissing: extraMissing.slice(0, 20) // Limit output
  };
}

/**
 * Test theme contrast levels
 */
function testThemeContrast(themePath) {
  const themeName = path.basename(themePath);
  const content = fs.readFileSync(themePath, 'utf8');
  const theme = JSON.parse(content);

  if (!theme.colors) {
    return {
      passed: false,
      errors: ['Missing "colors" object'],
      warnings: [],
      failedPairs: []
    };
  }

  const errors = [];
  const warnings = [];
  const failedPairs = [];

  // Check critical contrast pairs
  for (const [bgKey, fgKey] of CRITICAL_CONTRAST_PAIRS) {
    const bgColor = theme.colors[bgKey];
    const fgColor = theme.colors[fgKey];

    if (!bgColor || !fgColor) {
      continue; // Will be caught by completeness test
    }

    // Skip transparent colors
    if (bgColor.length > 7 || fgColor.length > 7) {
      continue;
    }

    const ratio = getContrastRatio(bgColor, fgColor);

    // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
    // We'll be strict and require 4.5:1 for all critical UI text
    if (ratio < 4.5) {
      failedPairs.push({
        background: bgKey,
        foreground: fgKey,
        bgColor,
        fgColor,
        ratio: ratio.toFixed(2),
        required: 4.5
      });
    } else if (ratio < 7) {
      // Warn if below AAA standard (7:1)
      warnings.push(`Low contrast (${ratio.toFixed(2)}:1) between ${bgKey} and ${fgKey}`);
    }
  }

  if (failedPairs.length > 0) {
    errors.push(`${failedPairs.length} critical contrast pair(s) below WCAG AA standard (4.5:1)`);
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    failedPairs
  };
}

/**
 * Build reference color set from complete themes
 */
function buildReferenceColors() {
  const referenceColors = new Set();

  for (const refTheme of REFERENCE_THEMES) {
    const themePath = path.join(themesDir, refTheme);
    if (!fs.existsSync(themePath)) {
      console.warn(`⚠️  Reference theme not found: ${refTheme}`);
      continue;
    }

    const content = fs.readFileSync(themePath, 'utf8');
    const theme = JSON.parse(content);

    if (theme.colors) {
      for (const colorKey of Object.keys(theme.colors)) {
        referenceColors.add(colorKey);
      }
    }
  }

  return referenceColors;
}

/**
 * Main test execution
 */
function main() {
  const themeFiles = fs.readdirSync(themesDir)
    .filter(f => f.endsWith('-color-theme.json'))
    .map(f => path.join(themesDir, f));

  console.log('🎨 Testing Theme Completeness and Contrast\n');
  console.log(`Found ${themeFiles.length} themes\n`);
  console.log(`📋 Required color properties: ${REQUIRED_COLORS.length}`);
  console.log(`🔍 Critical contrast pairs: ${CRITICAL_CONTRAST_PAIRS.length}\n`);

  // Build reference color set
  const referenceColors = buildReferenceColors();
  console.log(`✅ Reference themes define ${referenceColors.size} unique color properties\n`);
  console.log('─'.repeat(80) + '\n');

  let totalPassed = 0;
  let totalFailed = 0;
  const failedThemes = [];

  for (const themePath of themeFiles) {
    const themeName = path.basename(themePath);

    // Test completeness
    const completenessResult = testThemeCompleteness(themePath, referenceColors);

    // Test contrast
    const contrastResult = testThemeContrast(themePath);

    const passed = completenessResult.passed && contrastResult.passed;

    if (passed) {
      console.log(`✅ ${themeName}`);
      if (completenessResult.warnings.length > 0 || contrastResult.warnings.length > 0) {
        for (const warning of [...completenessResult.warnings, ...contrastResult.warnings]) {
          console.log(`   ⚠️  ${warning}`);
        }
      }
      totalPassed++;
    } else {
      console.log(`❌ ${themeName}`);

      // Show completeness errors
      for (const error of completenessResult.errors) {
        console.log(`   ❌ ${error}`);
      }
      if (completenessResult.missing.length > 0) {
        console.log(`   📝 First 10 missing required properties:`);
        for (const prop of completenessResult.missing.slice(0, 10)) {
          console.log(`      - ${prop}`);
        }
        if (completenessResult.missing.length > 10) {
          console.log(`      ... and ${completenessResult.missing.length - 10} more`);
        }
      }

      // Show contrast errors
      for (const error of contrastResult.errors) {
        console.log(`   ❌ ${error}`);
      }
      if (contrastResult.failedPairs.length > 0) {
        console.log(`   📝 First 5 failed contrast pairs:`);
        for (const pair of contrastResult.failedPairs.slice(0, 5)) {
          console.log(`      - ${pair.foreground} on ${pair.background}: ${pair.ratio}:1 (need 4.5:1)`);
          console.log(`        ${pair.fgColor} on ${pair.bgColor}`);
        }
        if (contrastResult.failedPairs.length > 5) {
          console.log(`      ... and ${contrastResult.failedPairs.length - 5} more`);
        }
      }

      totalFailed++;
      failedThemes.push({
        name: themeName,
        completeness: completenessResult,
        contrast: contrastResult
      });
    }
    console.log('');
  }

  console.log('─'.repeat(80) + '\n');
  console.log(`\n📊 Summary:\n`);
  console.log(`✅ Passed: ${totalPassed}`);
  console.log(`❌ Failed: ${totalFailed}`);
  console.log(`📈 Success rate: ${((totalPassed / themeFiles.length) * 100).toFixed(1)}%\n`);

  if (totalFailed > 0) {
    console.log(`\n⚠️  ${totalFailed} theme(s) need attention!\n`);
    process.exit(1);
  } else {
    console.log(`\n🎉 All themes pass completeness and contrast checks!\n`);
    process.exit(0);
  }
}

main();
