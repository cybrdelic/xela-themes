/**
 * Auto-fix Accessibility Issues
 * Automatically fixes common accessibility problems in themes
 */

const fs = require('fs');
const path = require('path');
const { AccessibilityValidator, CRITICAL_CONTRAST_PAIRS } = require('./validator.cjs');
const { InvariantChecker } = require('./invariants.cjs');
const {
  getContrastRatio,
  adjustLightness,
  adjustSaturation,
  hexToRgb,
  rgbToHex,
  getRelativeLuminance,
  getColorType
} = require('./color-utils.cjs');

const THEMES_DIR = path.join(__dirname, '..', '..', 'themes');

/**
 * Fix contrast issues by adjusting foreground colors
 * @param {Object} theme - Theme object
 * @param {Object} options - Fix options
 * @returns {Object} Fixed theme and list of changes
 */
function fixContrastIssues(theme, options = {}) {
  const validator = new AccessibilityValidator({ targetLevel: options.targetLevel || 'AA' });
  const results = validator.validateContrast(theme);
  const changes = [];
  const fixedTheme = JSON.parse(JSON.stringify(theme));

  for (const failed of results.failed) {
    const { pair, foreground, background, ratio, required } = failed;

    if (!fixedTheme.colors[pair.fg]) continue;

    // Determine adjustment direction based on background luminance
    const bgLuminance = getRelativeLuminance(background);
    let newForeground = foreground;
    let attempts = 0;
    const maxAttempts = 20;

    while (getContrastRatio(newForeground, background) < required && attempts < maxAttempts) {
      attempts++;
      const adjustment = bgLuminance < 0.5 ? 5 : -5;
      newForeground = adjustLightness(newForeground, adjustment);
    }

    const newRatio = getContrastRatio(newForeground, background);

    if (newRatio >= required) {
      fixedTheme.colors[pair.fg] = newForeground;
      changes.push({
        type: 'contrast_fix',
        key: pair.fg,
        description: pair.description,
        original: foreground,
        fixed: newForeground,
        originalRatio: ratio,
        newRatio: parseFloat(newRatio.toFixed(2)),
        required
      });
    }
  }

  return { theme: fixedTheme, changes };
}

/**
 * Fix semantic color issues (wrong hues for error/warning/etc)
 * @param {Object} theme - Theme object
 * @returns {Object} Fixed theme and list of changes
 */
function fixSemanticColors(theme) {
  const changes = [];
  const fixedTheme = JSON.parse(JSON.stringify(theme));
  const colors = fixedTheme.colors || {};

  // Standard semantic colors
  const semanticDefaults = {
    error: '#FF5555',      // Red
    warning: '#FFAA00',    // Orange/Yellow
    info: '#5599FF',       // Blue
    success: '#55FF55',    // Green
    added: '#55FF55',      // Green
    deleted: '#FF5555',    // Red
    modified: '#FFAA00'    // Yellow
  };

  const semanticMappings = {
    'editorError.foreground': 'error',
    'editorError.border': 'error',
    'list.errorForeground': 'error',
    'inputValidation.errorBorder': 'error',
    'inputValidation.errorForeground': 'error',
    'editorWarning.foreground': 'warning',
    'editorWarning.border': 'warning',
    'list.warningForeground': 'warning',
    'inputValidation.warningBorder': 'warning',
    'inputValidation.warningForeground': 'warning',
    'editorInfo.foreground': 'info',
    'editorInfo.border': 'info',
    'inputValidation.infoBorder': 'info',
    'inputValidation.infoForeground': 'info',
    'editorGutter.addedBackground': 'added',
    'gitDecoration.addedResourceForeground': 'added',
    'editorGutter.deletedBackground': 'deleted',
    'gitDecoration.deletedResourceForeground': 'deleted',
    'editorGutter.modifiedBackground': 'modified',
    'gitDecoration.modifiedResourceForeground': 'modified'
  };

  // Check and fix missing semantic colors
  for (const [colorKey, semantic] of Object.entries(semanticMappings)) {
    if (!colors[colorKey]) {
      // Get default and adjust for theme type
      let defaultColor = semanticDefaults[semantic];

      // Adjust opacity for background colors
      if (colorKey.includes('Background')) {
        const rgb = hexToRgb(defaultColor);
        if (rgb) {
          defaultColor = rgbToHex(rgb.r, rgb.g, rgb.b, 0.4);
        }
      }

      fixedTheme.colors[colorKey] = defaultColor;
      changes.push({
        type: 'semantic_add',
        key: colorKey,
        semantic,
        value: defaultColor
      });
    }
  }

  return { theme: fixedTheme, changes };
}

/**
 * Fix theme type consistency
 * @param {Object} theme - Theme object
 * @returns {Object} Fixed theme and list of changes
 */
function fixThemeType(theme) {
  const changes = [];
  const fixedTheme = JSON.parse(JSON.stringify(theme));

  const editorBg = fixedTheme.colors?.['editor.background'];
  if (!editorBg) return { theme: fixedTheme, changes };

  const detectedType = getColorType(editorBg);

  if (fixedTheme.type && fixedTheme.type !== detectedType) {
    changes.push({
      type: 'type_fix',
      original: fixedTheme.type,
      fixed: detectedType,
      reason: `Background ${editorBg} suggests ${detectedType} theme`
    });
    fixedTheme.type = detectedType;
  }

  return { theme: fixedTheme, changes };
}

/**
 * Ensure minimum required colors are present
 * @param {Object} theme - Theme object
 * @returns {Object} Fixed theme and list of changes
 */
function fixMissingColors(theme) {
  const changes = [];
  const fixedTheme = JSON.parse(JSON.stringify(theme));
  const colors = fixedTheme.colors || {};

  // Get base colors for deriving others
  const editorBg = colors['editor.background'] || '#1E1E1E';
  const editorFg = colors['editor.foreground'] || '#D4D4D4';
  const isDark = getColorType(editorBg) === 'dark';

  // Color derivation helpers
  const deriveColor = (baseColor, lightnessAdjust) => {
    return adjustLightness(baseColor, lightnessAdjust);
  };

  // Essential colors and how to derive them
  const essentialColors = {
    'editor.background': editorBg,
    'editor.foreground': editorFg,
    'activityBar.background': deriveColor(editorBg, isDark ? -2 : 2),
    'activityBar.foreground': editorFg,
    'sideBar.background': deriveColor(editorBg, isDark ? 2 : -2),
    'sideBar.foreground': editorFg,
    'statusBar.background': deriveColor(editorBg, isDark ? -5 : 5),
    'statusBar.foreground': editorFg,
    'titleBar.activeBackground': deriveColor(editorBg, isDark ? -3 : 3),
    'titleBar.activeForeground': editorFg,
    'titleBar.inactiveBackground': deriveColor(editorBg, isDark ? -3 : 3),
    'titleBar.inactiveForeground': adjustLightness(editorFg, isDark ? -20 : 20),
    'tab.activeBackground': editorBg,
    'tab.activeForeground': editorFg,
    'tab.inactiveBackground': deriveColor(editorBg, isDark ? -3 : 3),
    'tab.inactiveForeground': adjustLightness(editorFg, isDark ? -30 : 30),
    'editorGroupHeader.tabsBackground': deriveColor(editorBg, isDark ? -2 : 2),
    'panel.background': editorBg,
    'panel.border': deriveColor(editorBg, isDark ? 15 : -15),
    'terminal.background': editorBg,
    'terminal.foreground': editorFg
  };

  for (const [key, derivedValue] of Object.entries(essentialColors)) {
    if (!colors[key]) {
      fixedTheme.colors[key] = derivedValue;
      changes.push({
        type: 'missing_color_add',
        key,
        value: derivedValue,
        derivedFrom: 'editor.background/foreground'
      });
    }
  }

  return { theme: fixedTheme, changes };
}

/**
 * Apply all fixes to a theme
 * @param {Object} theme - Theme object
 * @param {Object} options - Fix options
 * @returns {Object} Fully fixed theme and all changes
 */
function fixTheme(theme, options = {}) {
  let currentTheme = JSON.parse(JSON.stringify(theme));
  const allChanges = [];

  // Fix in order of priority
  const fixers = [
    { name: 'missing_colors', fn: fixMissingColors },
    { name: 'theme_type', fn: fixThemeType },
    { name: 'semantic_colors', fn: fixSemanticColors },
    { name: 'contrast', fn: (t) => fixContrastIssues(t, options) }
  ];

  for (const fixer of fixers) {
    const result = fixer.fn(currentTheme);
    currentTheme = result.theme;
    allChanges.push(...result.changes.map(c => ({ ...c, fixer: fixer.name })));
  }

  return {
    original: theme,
    fixed: currentTheme,
    changes: allChanges,
    summary: {
      totalChanges: allChanges.length,
      byType: allChanges.reduce((acc, c) => {
        acc[c.type] = (acc[c.type] || 0) + 1;
        return acc;
      }, {})
    }
  };
}

/**
 * Fix all themes in the themes directory
 * @param {Object} options - Fix options
 */
function fixAllThemes(options = {}) {
  const dryRun = options.dryRun || false;
  const files = fs.readdirSync(THEMES_DIR)
    .filter(f => f.endsWith('.json') && !f.endsWith('.backup'));

  console.log(`\n🔧 Auto-fixing ${files.length} themes${dryRun ? ' (dry run)' : ''}...\n`);

  const results = {
    fixed: 0,
    unchanged: 0,
    errors: 0,
    totalChanges: 0,
    themes: []
  };

  for (const file of files) {
    const filePath = path.join(THEMES_DIR, file);

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const theme = JSON.parse(content);

      const fixResult = fixTheme(theme, options);

      if (fixResult.changes.length > 0) {
        results.fixed++;
        results.totalChanges += fixResult.changes.length;

        results.themes.push({
          file,
          name: theme.name,
          changes: fixResult.changes.length,
          details: fixResult.summary.byType
        });

        if (!dryRun) {
          fs.writeFileSync(filePath, JSON.stringify(fixResult.fixed, null, 2));
        }

        console.log(`  ✓ ${theme.name}: ${fixResult.changes.length} changes`);
      } else {
        results.unchanged++;
      }
    } catch (error) {
      results.errors++;
      console.error(`  ✗ ${file}: ${error.message}`);
    }
  }

  console.log('\n' + '─'.repeat(50));
  console.log(`  Fixed: ${results.fixed} themes`);
  console.log(`  Unchanged: ${results.unchanged} themes`);
  console.log(`  Errors: ${results.errors}`);
  console.log(`  Total changes: ${results.totalChanges}`);
  console.log('─'.repeat(50) + '\n');

  return results;
}

// CLI support
if (require.main === module) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const targetLevel = args.includes('--aaa') ? 'AAA' : 'AA';

  fixAllThemes({ dryRun, targetLevel });
}

module.exports = {
  fixContrastIssues,
  fixSemanticColors,
  fixThemeType,
  fixMissingColors,
  fixTheme,
  fixAllThemes
};
