/**
 * Accessibility Validator
 * Validates theme accessibility against WCAG 2.1 guidelines
 */

const {
  getContrastRatio,
  meetsWcagAA,
  meetsWcagAAA,
  blendColors,
  getColorType,
  hexToRgb
} = require('./color-utils.cjs');

/**
 * WCAG 2.1 Contrast Requirements
 */
const WCAG_REQUIREMENTS = {
  AA_NORMAL_TEXT: 4.5,
  AA_LARGE_TEXT: 3.0,
  AA_UI_COMPONENTS: 3.0,
  AAA_NORMAL_TEXT: 7.0,
  AAA_LARGE_TEXT: 4.5
};

/**
 * Critical UI element pairs that must meet contrast requirements
 */
const CRITICAL_CONTRAST_PAIRS = [
  // Editor
  { fg: 'editor.foreground', bg: 'editor.background', level: 'AA', description: 'Editor text' },
  { fg: 'editorLineNumber.foreground', bg: 'editor.background', level: 'AA_LARGE', description: 'Line numbers' },
  { fg: 'editorLineNumber.activeForeground', bg: 'editor.background', level: 'AA', description: 'Active line number' },
  { fg: 'editorCursor.foreground', bg: 'editor.background', level: 'UI', description: 'Cursor visibility' },

  // Tabs
  { fg: 'tab.activeForeground', bg: 'tab.activeBackground', level: 'AA', description: 'Active tab text' },
  { fg: 'tab.inactiveForeground', bg: 'tab.inactiveBackground', level: 'AA_LARGE', description: 'Inactive tab text' },

  // Sidebar
  { fg: 'sideBar.foreground', bg: 'sideBar.background', level: 'AA', description: 'Sidebar text' },
  { fg: 'sideBarTitle.foreground', bg: 'sideBar.background', level: 'AA', description: 'Sidebar title' },

  // Activity Bar
  { fg: 'activityBar.foreground', bg: 'activityBar.background', level: 'UI', description: 'Activity bar icons' },
  { fg: 'activityBarBadge.foreground', bg: 'activityBarBadge.background', level: 'AA', description: 'Activity bar badge' },

  // Status Bar
  { fg: 'statusBar.foreground', bg: 'statusBar.background', level: 'AA', description: 'Status bar text' },
  { fg: 'statusBarItem.errorForeground', bg: 'statusBarItem.errorBackground', level: 'AA', description: 'Status bar error' },
  { fg: 'statusBarItem.warningForeground', bg: 'statusBarItem.warningBackground', level: 'AA', description: 'Status bar warning' },

  // Title Bar
  { fg: 'titleBar.activeForeground', bg: 'titleBar.activeBackground', level: 'AA', description: 'Title bar text' },
  { fg: 'titleBar.inactiveForeground', bg: 'titleBar.inactiveBackground', level: 'AA_LARGE', description: 'Inactive title bar' },

  // Terminal
  { fg: 'terminal.foreground', bg: 'terminal.background', level: 'AA', description: 'Terminal text' },

  // Input
  { fg: 'input.foreground', bg: 'input.background', level: 'AA', description: 'Input text' },
  { fg: 'input.placeholderForeground', bg: 'input.background', level: 'AA_LARGE', description: 'Input placeholder' },

  // Buttons
  { fg: 'button.foreground', bg: 'button.background', level: 'AA', description: 'Button text' },

  // Lists
  { fg: 'list.activeSelectionForeground', bg: 'list.activeSelectionBackground', level: 'AA', description: 'Selected list item' },
  { fg: 'list.highlightForeground', bg: 'list.activeSelectionBackground', level: 'AA', description: 'List highlight' },

  // Badges
  { fg: 'badge.foreground', bg: 'badge.background', level: 'AA', description: 'Badge text' },

  // Notifications
  { fg: 'notifications.foreground', bg: 'notifications.background', level: 'AA', description: 'Notification text' },

  // Breadcrumbs
  { fg: 'breadcrumb.foreground', bg: 'breadcrumb.background', level: 'AA_LARGE', description: 'Breadcrumb text' },

  // Panel
  { fg: 'panelTitle.activeForeground', bg: 'panel.background', level: 'AA', description: 'Panel title' },
  { fg: 'panelTitle.inactiveForeground', bg: 'panel.background', level: 'AA_LARGE', description: 'Inactive panel title' }
];

/**
 * Semantic color requirements
 */
const SEMANTIC_COLOR_REQUIREMENTS = {
  error: {
    keys: ['editorError.foreground', 'list.errorForeground', 'inputValidation.errorBorder'],
    expectedHue: { min: 340, max: 20 }, // Red range (wraps around 0)
    description: 'Error colors should be red-ish'
  },
  warning: {
    keys: ['editorWarning.foreground', 'list.warningForeground', 'inputValidation.warningBorder'],
    expectedHue: { min: 30, max: 60 }, // Yellow/orange range
    description: 'Warning colors should be yellow/orange'
  },
  success: {
    keys: ['editorGutter.addedBackground', 'gitDecoration.addedResourceForeground'],
    expectedHue: { min: 80, max: 160 }, // Green range
    description: 'Success/added colors should be green-ish'
  },
  info: {
    keys: ['editorInfo.foreground', 'inputValidation.infoBorder'],
    expectedHue: { min: 180, max: 260 }, // Blue range
    description: 'Info colors should be blue-ish'
  }
};

class AccessibilityValidator {
  constructor(options = {}) {
    this.strictMode = options.strictMode || false;
    this.targetLevel = options.targetLevel || 'AA'; // 'AA' or 'AAA'
  }

  /**
   * Get required contrast ratio for a level
   * @param {string} level - Contrast level requirement
   * @returns {number}
   */
  getRequiredRatio(level) {
    switch (level) {
      case 'AAA': return WCAG_REQUIREMENTS.AAA_NORMAL_TEXT;
      case 'AAA_LARGE': return WCAG_REQUIREMENTS.AAA_LARGE_TEXT;
      case 'AA': return WCAG_REQUIREMENTS.AA_NORMAL_TEXT;
      case 'AA_LARGE': return WCAG_REQUIREMENTS.AA_LARGE_TEXT;
      case 'UI': return WCAG_REQUIREMENTS.AA_UI_COMPONENTS;
      default: return WCAG_REQUIREMENTS.AA_NORMAL_TEXT;
    }
  }

  /**
   * Resolve a color value, handling transparency by blending with background
   * @param {Object} colors - Theme colors object
   * @param {string} colorKey - Color key to resolve
   * @param {string} [fallbackBg] - Fallback background for blending
   * @returns {string | null}
   */
  resolveColor(colors, colorKey, fallbackBg = null) {
    let color = colors[colorKey];
    if (!color) return null;

    // Check if color has alpha channel
    const rgb = hexToRgb(color);
    if (rgb && rgb.a < 1 && fallbackBg) {
      const bg = colors[fallbackBg] || colors['editor.background'];
      if (bg) {
        color = blendColors(color, bg);
      }
    }

    return color;
  }

  /**
   * Validate contrast for a single pair
   * @param {Object} colors - Theme colors
   * @param {Object} pair - Contrast pair definition
   * @returns {Object} Validation result
   */
  validateContrastPair(colors, pair) {
    const fg = this.resolveColor(colors, pair.fg, pair.bg);
    const bg = this.resolveColor(colors, pair.bg);

    if (!fg || !bg) {
      return {
        valid: false,
        skipped: true,
        pair,
        reason: `Missing color: ${!fg ? pair.fg : pair.bg}`
      };
    }

    const ratio = getContrastRatio(fg, bg);
    const required = this.getRequiredRatio(pair.level);
    const passes = ratio >= required;

    // If targeting AAA, also check AAA requirements
    let aaaRatio = null;
    let passesAAA = null;
    if (this.targetLevel === 'AAA') {
      aaaRatio = this.getRequiredRatio(pair.level.replace('AA', 'AAA'));
      passesAAA = ratio >= aaaRatio;
    }

    return {
      valid: passes,
      pair,
      foreground: fg,
      background: bg,
      ratio: parseFloat(ratio.toFixed(2)),
      required,
      passesAAA,
      aaaRequired: aaaRatio,
      deficit: passes ? 0 : parseFloat((required - ratio).toFixed(2))
    };
  }

  /**
   * Validate all critical contrast pairs
   * @param {Object} theme - Theme object
   * @returns {Object} Validation results
   */
  validateContrast(theme) {
    const colors = theme.colors || {};
    const results = {
      passed: [],
      failed: [],
      skipped: [],
      summary: {
        total: CRITICAL_CONTRAST_PAIRS.length,
        passed: 0,
        failed: 0,
        skipped: 0,
        averageRatio: 0
      }
    };

    let totalRatio = 0;
    let ratioCount = 0;

    for (const pair of CRITICAL_CONTRAST_PAIRS) {
      const result = this.validateContrastPair(colors, pair);

      if (result.skipped) {
        results.skipped.push(result);
        results.summary.skipped++;
      } else if (result.valid) {
        results.passed.push(result);
        results.summary.passed++;
        totalRatio += result.ratio;
        ratioCount++;
      } else {
        results.failed.push(result);
        results.summary.failed++;
        totalRatio += result.ratio;
        ratioCount++;
      }
    }

    results.summary.averageRatio = ratioCount > 0
      ? parseFloat((totalRatio / ratioCount).toFixed(2))
      : 0;

    return results;
  }

  /**
   * Validate semantic color usage
   * @param {Object} theme - Theme object
   * @returns {Object} Validation results
   */
  validateSemanticColors(theme) {
    const colors = theme.colors || {};
    const results = {
      valid: [],
      invalid: [],
      missing: []
    };

    const rgbToHue = (r, g, b) => {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h;

      if (max === min) return 0;

      const d = max - min;
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
      return Math.round(h * 360);
    };

    const isHueInRange = (hue, range) => {
      if (range.min > range.max) {
        // Wraps around 0 (e.g., red: 340-20)
        return hue >= range.min || hue <= range.max;
      }
      return hue >= range.min && hue <= range.max;
    };

    for (const [semantic, config] of Object.entries(SEMANTIC_COLOR_REQUIREMENTS)) {
      for (const key of config.keys) {
        const color = colors[key];

        if (!color) {
          results.missing.push({ semantic, key, description: config.description });
          continue;
        }

        const rgb = hexToRgb(color);
        if (!rgb) continue;

        const hue = rgbToHue(rgb.r, rgb.g, rgb.b);
        const isValid = isHueInRange(hue, config.expectedHue);

        const result = {
          semantic,
          key,
          color,
          hue,
          expectedRange: config.expectedHue,
          description: config.description
        };

        if (isValid) {
          results.valid.push(result);
        } else {
          results.invalid.push(result);
        }
      }
    }

    return results;
  }

  /**
   * Validate theme type consistency
   * @param {Object} theme - Theme object
   * @returns {Object} Validation result
   */
  validateThemeType(theme) {
    const colors = theme.colors || {};
    const declaredType = theme.type; // 'dark' or 'light'

    const editorBg = colors['editor.background'];
    if (!editorBg) {
      return { valid: false, reason: 'Missing editor.background' };
    }

    const detectedType = getColorType(editorBg);
    const isConsistent = declaredType === detectedType;

    return {
      valid: isConsistent,
      declaredType,
      detectedType,
      editorBackground: editorBg,
      reason: isConsistent ? null : `Theme declares "${declaredType}" but background suggests "${detectedType}"`
    };
  }

  /**
   * Validate token colors have sufficient contrast
   * @param {Object} theme - Theme object
   * @returns {Object} Validation results
   */
  validateTokenContrast(theme) {
    const colors = theme.colors || {};
    const tokenColors = theme.tokenColors || [];
    const editorBg = colors['editor.background'];

    if (!editorBg) {
      return { valid: false, skipped: true, reason: 'Missing editor.background' };
    }

    const results = {
      passed: [],
      failed: [],
      summary: { total: 0, passed: 0, failed: 0 }
    };

    for (const token of tokenColors) {
      if (!token.settings || !token.settings.foreground) continue;

      results.summary.total++;
      const fg = token.settings.foreground;
      const ratio = getContrastRatio(fg, editorBg);
      const passes = ratio >= WCAG_REQUIREMENTS.AA_NORMAL_TEXT;

      const result = {
        scope: token.scope || token.name || 'unnamed',
        foreground: fg,
        background: editorBg,
        ratio: parseFloat(ratio.toFixed(2)),
        required: WCAG_REQUIREMENTS.AA_NORMAL_TEXT
      };

      if (passes) {
        results.passed.push(result);
        results.summary.passed++;
      } else {
        results.failed.push(result);
        results.summary.failed++;
      }
    }

    return results;
  }

  /**
   * Run full accessibility validation
   * @param {Object} theme - Theme object
   * @returns {Object} Complete validation report
   */
  validate(theme) {
    const report = {
      themeName: theme.name || 'Unknown',
      themeType: theme.type || 'unknown',
      timestamp: new Date().toISOString(),
      targetLevel: this.targetLevel,

      themeTypeValidation: this.validateThemeType(theme),
      contrastValidation: this.validateContrast(theme),
      semanticValidation: this.validateSemanticColors(theme),
      tokenContrastValidation: this.validateTokenContrast(theme),

      summary: {
        isAccessible: false,
        issues: [],
        score: 0
      }
    };

    // Calculate overall accessibility
    const contrastScore = report.contrastValidation.summary.passed /
      (report.contrastValidation.summary.total - report.contrastValidation.summary.skipped) || 0;
    const tokenScore = report.tokenContrastValidation.summary.passed /
      report.tokenContrastValidation.summary.total || 1;
    const semanticScore = report.semanticValidation.valid.length /
      (report.semanticValidation.valid.length + report.semanticValidation.invalid.length) || 1;
    const typeScore = report.themeTypeValidation.valid ? 1 : 0;

    report.summary.score = Math.round(
      (contrastScore * 0.4 + tokenScore * 0.3 + semanticScore * 0.2 + typeScore * 0.1) * 100
    );

    // Collect issues
    if (!report.themeTypeValidation.valid) {
      report.summary.issues.push(report.themeTypeValidation.reason);
    }

    for (const failed of report.contrastValidation.failed) {
      report.summary.issues.push(
        `Low contrast (${failed.ratio}:1) for ${failed.pair.description}: ${failed.pair.fg} on ${failed.pair.bg}`
      );
    }

    for (const invalid of report.semanticValidation.invalid) {
      report.summary.issues.push(
        `Unexpected ${invalid.semantic} color: ${invalid.key} = ${invalid.color}`
      );
    }

    report.summary.isAccessible = report.summary.score >= 80 &&
      report.contrastValidation.summary.failed === 0;

    return report;
  }
}

module.exports = {
  AccessibilityValidator,
  WCAG_REQUIREMENTS,
  CRITICAL_CONTRAST_PAIRS,
  SEMANTIC_COLOR_REQUIREMENTS
};
