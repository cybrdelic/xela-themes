/**
 * Theme Invariant Checker
 * Validates structural and logical invariants that all themes must satisfy
 */

const { hexToRgb, getContrastRatio, getColorType } = require('./color-utils.cjs');

/**
 * Required theme structure properties
 */
const REQUIRED_PROPERTIES = {
  root: ['name', 'type', 'colors'],
  recommended: ['semanticHighlighting', 'tokenColors']
};

/**
 * Required color definitions for a complete theme
 */
const REQUIRED_COLORS = {
  critical: [
    'editor.background',
    'editor.foreground',
    'activityBar.background',
    'activityBar.foreground',
    'sideBar.background',
    'sideBar.foreground',
    'statusBar.background',
    'statusBar.foreground',
    'titleBar.activeBackground',
    'titleBar.activeForeground',
    'tab.activeBackground',
    'tab.activeForeground',
    'tab.inactiveBackground',
    'tab.inactiveForeground'
  ],
  important: [
    'editorGroupHeader.tabsBackground',
    'panel.background',
    'panel.border',
    'terminal.background',
    'terminal.foreground',
    'input.background',
    'input.foreground',
    'button.background',
    'button.foreground',
    'dropdown.background',
    'dropdown.foreground',
    'list.activeSelectionBackground',
    'list.activeSelectionForeground'
  ],
  semantic: [
    'editorError.foreground',
    'editorWarning.foreground',
    'editorInfo.foreground',
    'editorGutter.addedBackground',
    'editorGutter.modifiedBackground',
    'editorGutter.deletedBackground'
  ]
};

/**
 * Color relationship invariants
 */
const COLOR_INVARIANTS = [
  {
    name: 'dark-theme-dark-background',
    description: 'Dark themes should have dark backgrounds',
    condition: (theme) => {
      if (theme.type !== 'dark') return { applies: false };
      const bg = theme.colors?.['editor.background'];
      if (!bg) return { applies: false };
      const type = getColorType(bg);
      return { applies: true, passes: type === 'dark', value: bg };
    }
  },
  {
    name: 'light-theme-light-background',
    description: 'Light themes should have light backgrounds',
    condition: (theme) => {
      if (theme.type !== 'light') return { applies: false };
      const bg = theme.colors?.['editor.background'];
      if (!bg) return { applies: false };
      const type = getColorType(bg);
      return { applies: true, passes: type === 'light', value: bg };
    }
  },
  {
    name: 'consistent-ui-darkness',
    description: 'UI elements should have consistent darkness level',
    condition: (theme) => {
      const colors = theme.colors || {};
      const bgKeys = ['editor.background', 'sideBar.background', 'activityBar.background', 'statusBar.background'];
      const types = bgKeys.map(k => colors[k] ? getColorType(colors[k]) : null).filter(Boolean);
      const uniqueTypes = [...new Set(types)];
      return {
        applies: types.length >= 2,
        passes: uniqueTypes.length === 1,
        value: types.join(', ')
      };
    }
  },
  {
    name: 'error-warning-distinction',
    description: 'Error and warning colors should be visually distinct',
    condition: (theme) => {
      const colors = theme.colors || {};
      const error = colors['editorError.foreground'];
      const warning = colors['editorWarning.foreground'];
      if (!error || !warning) return { applies: false };

      const rgb1 = hexToRgb(error);
      const rgb2 = hexToRgb(warning);
      if (!rgb1 || !rgb2) return { applies: false };

      const distance = Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
      );

      return {
        applies: true,
        passes: distance >= 50,
        value: `distance: ${distance.toFixed(1)}`
      };
    }
  },
  {
    name: 'cursor-visibility',
    description: 'Cursor should be clearly visible against editor background',
    condition: (theme) => {
      const colors = theme.colors || {};
      const cursor = colors['editorCursor.foreground'];
      const bg = colors['editor.background'];
      if (!cursor || !bg) return { applies: false };

      const ratio = getContrastRatio(cursor, bg);
      return {
        applies: true,
        passes: ratio >= 3.0,
        value: `ratio: ${ratio.toFixed(2)}`
      };
    }
  },
  {
    name: 'selection-visibility',
    description: 'Selected text should be clearly visible',
    condition: (theme) => {
      const colors = theme.colors || {};
      const selection = colors['editor.selectionBackground'];
      const bg = colors['editor.background'];
      if (!selection || !bg) return { applies: false };

      const ratio = getContrastRatio(selection, bg);
      return {
        applies: true,
        passes: ratio >= 1.3, // Selection doesn't need high contrast, just visible
        value: `ratio: ${ratio.toFixed(2)}`
      };
    }
  },
  {
    name: 'find-match-visibility',
    description: 'Find match highlights should be visible',
    condition: (theme) => {
      const colors = theme.colors || {};
      const match = colors['editor.findMatchBackground'];
      const bg = colors['editor.background'];
      if (!match || !bg) return { applies: false };

      const ratio = getContrastRatio(match, bg);
      return {
        applies: true,
        passes: ratio >= 1.5,
        value: `ratio: ${ratio.toFixed(2)}`
      };
    }
  },
  {
    name: 'active-inactive-distinction',
    description: 'Active and inactive states should be distinguishable',
    condition: (theme) => {
      const colors = theme.colors || {};
      const active = colors['tab.activeForeground'];
      const inactive = colors['tab.inactiveForeground'];
      if (!active || !inactive) return { applies: false };

      const rgb1 = hexToRgb(active);
      const rgb2 = hexToRgb(inactive);
      if (!rgb1 || !rgb2) return { applies: false };

      const distance = Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
      );

      return {
        applies: true,
        passes: distance >= 30,
        value: `distance: ${distance.toFixed(1)}`
      };
    }
  },
  {
    name: 'valid-hex-colors',
    description: 'All colors should be valid hex values',
    condition: (theme) => {
      const colors = theme.colors || {};
      const invalid = [];

      for (const [key, value] of Object.entries(colors)) {
        if (typeof value !== 'string') {
          invalid.push({ key, value, reason: 'not a string' });
          continue;
        }
        if (!value.startsWith('#')) {
          invalid.push({ key, value, reason: 'missing #' });
          continue;
        }
        const rgb = hexToRgb(value);
        if (!rgb) {
          invalid.push({ key, value, reason: 'invalid hex' });
        }
      }

      return {
        applies: true,
        passes: invalid.length === 0,
        value: invalid.length > 0 ? invalid.slice(0, 5) : 'all valid'
      };
    }
  },
  {
    name: 'no-pure-black-text-on-white',
    description: 'Avoid pure black (#000000) text on pure white (#FFFFFF) - too harsh',
    condition: (theme) => {
      if (theme.type !== 'light') return { applies: false };
      const colors = theme.colors || {};
      const fg = colors['editor.foreground'];
      const bg = colors['editor.background'];
      if (!fg || !bg) return { applies: false };

      const isPureBlackOnWhite = fg.toUpperCase() === '#000000' && bg.toUpperCase() === '#FFFFFF';
      return {
        applies: true,
        passes: !isPureBlackOnWhite,
        value: `${fg} on ${bg}`
      };
    }
  }
];

/**
 * Token color invariants
 */
const TOKEN_INVARIANTS = [
  {
    name: 'minimum-token-rules',
    description: 'Theme should have at least 10 token color rules',
    condition: (theme) => {
      const count = (theme.tokenColors || []).length;
      return { applies: true, passes: count >= 10, value: count };
    }
  },
  {
    name: 'has-comment-styling',
    description: 'Theme should style comments',
    condition: (theme) => {
      const hasComment = (theme.tokenColors || []).some(t => {
        const scope = Array.isArray(t.scope) ? t.scope.join(' ') : (t.scope || '');
        return scope.toLowerCase().includes('comment');
      });
      return { applies: true, passes: hasComment, value: hasComment };
    }
  },
  {
    name: 'has-string-styling',
    description: 'Theme should style strings',
    condition: (theme) => {
      const hasString = (theme.tokenColors || []).some(t => {
        const scope = Array.isArray(t.scope) ? t.scope.join(' ') : (t.scope || '');
        return scope.toLowerCase().includes('string');
      });
      return { applies: true, passes: hasString, value: hasString };
    }
  },
  {
    name: 'has-keyword-styling',
    description: 'Theme should style keywords',
    condition: (theme) => {
      const hasKeyword = (theme.tokenColors || []).some(t => {
        const scope = Array.isArray(t.scope) ? t.scope.join(' ') : (t.scope || '');
        return scope.toLowerCase().includes('keyword');
      });
      return { applies: true, passes: hasKeyword, value: hasKeyword };
    }
  },
  {
    name: 'comments-distinct-from-code',
    description: 'Comments should be visually distinct from regular code',
    condition: (theme) => {
      const colors = theme.colors || {};
      const editorFg = colors['editor.foreground'];

      const commentToken = (theme.tokenColors || []).find(t => {
        const scope = Array.isArray(t.scope) ? t.scope.join(' ') : (t.scope || '');
        return scope.toLowerCase().includes('comment') && t.settings?.foreground;
      });

      if (!editorFg || !commentToken) return { applies: false };

      const commentColor = commentToken.settings.foreground;
      const rgb1 = hexToRgb(editorFg);
      const rgb2 = hexToRgb(commentColor);
      if (!rgb1 || !rgb2) return { applies: false };

      const distance = Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
      );

      return {
        applies: true,
        passes: distance >= 25,
        value: `distance: ${distance.toFixed(1)}`
      };
    }
  }
];

class InvariantChecker {
  constructor(options = {}) {
    this.strict = options.strict || false;
  }

  /**
   * Check required properties
   * @param {Object} theme - Theme object
   * @returns {Object} Check results
   */
  checkRequiredProperties(theme) {
    const results = {
      missing: [],
      present: [],
      recommended: []
    };

    for (const prop of REQUIRED_PROPERTIES.root) {
      if (theme[prop] === undefined) {
        results.missing.push(prop);
      } else {
        results.present.push(prop);
      }
    }

    for (const prop of REQUIRED_PROPERTIES.recommended) {
      if (theme[prop] === undefined) {
        results.recommended.push(prop);
      }
    }

    return results;
  }

  /**
   * Check required colors
   * @param {Object} theme - Theme object
   * @returns {Object} Check results
   */
  checkRequiredColors(theme) {
    const colors = theme.colors || {};
    const results = {
      critical: { missing: [], present: [] },
      important: { missing: [], present: [] },
      semantic: { missing: [], present: [] }
    };

    for (const key of REQUIRED_COLORS.critical) {
      if (colors[key]) {
        results.critical.present.push(key);
      } else {
        results.critical.missing.push(key);
      }
    }

    for (const key of REQUIRED_COLORS.important) {
      if (colors[key]) {
        results.important.present.push(key);
      } else {
        results.important.missing.push(key);
      }
    }

    for (const key of REQUIRED_COLORS.semantic) {
      if (colors[key]) {
        results.semantic.present.push(key);
      } else {
        results.semantic.missing.push(key);
      }
    }

    return results;
  }

  /**
   * Check all color invariants
   * @param {Object} theme - Theme object
   * @returns {Object} Check results
   */
  checkColorInvariants(theme) {
    const results = {
      passed: [],
      failed: [],
      skipped: []
    };

    for (const invariant of COLOR_INVARIANTS) {
      const result = invariant.condition(theme);
      const entry = {
        name: invariant.name,
        description: invariant.description,
        ...result
      };

      if (!result.applies) {
        results.skipped.push(entry);
      } else if (result.passes) {
        results.passed.push(entry);
      } else {
        results.failed.push(entry);
      }
    }

    return results;
  }

  /**
   * Check all token invariants
   * @param {Object} theme - Theme object
   * @returns {Object} Check results
   */
  checkTokenInvariants(theme) {
    const results = {
      passed: [],
      failed: [],
      skipped: []
    };

    for (const invariant of TOKEN_INVARIANTS) {
      const result = invariant.condition(theme);
      const entry = {
        name: invariant.name,
        description: invariant.description,
        ...result
      };

      if (!result.applies) {
        results.skipped.push(entry);
      } else if (result.passes) {
        results.passed.push(entry);
      } else {
        results.failed.push(entry);
      }
    }

    return results;
  }

  /**
   * Run all invariant checks
   * @param {Object} theme - Theme object
   * @returns {Object} Complete check results
   */
  check(theme) {
    const report = {
      themeName: theme.name || 'Unknown',
      timestamp: new Date().toISOString(),

      properties: this.checkRequiredProperties(theme),
      colors: this.checkRequiredColors(theme),
      colorInvariants: this.checkColorInvariants(theme),
      tokenInvariants: this.checkTokenInvariants(theme),

      summary: {
        isValid: false,
        criticalIssues: [],
        warnings: [],
        score: 0
      }
    };

    // Collect critical issues
    if (report.properties.missing.length > 0) {
      report.summary.criticalIssues.push(
        `Missing required properties: ${report.properties.missing.join(', ')}`
      );
    }

    if (report.colors.critical.missing.length > 0) {
      report.summary.criticalIssues.push(
        `Missing critical colors: ${report.colors.critical.missing.join(', ')}`
      );
    }

    for (const failed of report.colorInvariants.failed) {
      if (['valid-hex-colors', 'cursor-visibility'].includes(failed.name)) {
        report.summary.criticalIssues.push(`${failed.description}: ${JSON.stringify(failed.value)}`);
      } else {
        report.summary.warnings.push(`${failed.description}: ${JSON.stringify(failed.value)}`);
      }
    }

    for (const failed of report.tokenInvariants.failed) {
      report.summary.warnings.push(`${failed.description}`);
    }

    // Calculate score
    const colorInvariantScore = report.colorInvariants.passed.length /
      (report.colorInvariants.passed.length + report.colorInvariants.failed.length) || 0;
    const tokenInvariantScore = report.tokenInvariants.passed.length /
      (report.tokenInvariants.passed.length + report.tokenInvariants.failed.length) || 0;
    const colorCompleteness = report.colors.critical.present.length / REQUIRED_COLORS.critical.length;

    report.summary.score = Math.round(
      (colorInvariantScore * 0.4 + tokenInvariantScore * 0.3 + colorCompleteness * 0.3) * 100
    );

    report.summary.isValid = report.summary.criticalIssues.length === 0 && report.summary.score >= 70;

    return report;
  }
}

module.exports = {
  InvariantChecker,
  REQUIRED_PROPERTIES,
  REQUIRED_COLORS,
  COLOR_INVARIANTS,
  TOKEN_INVARIANTS
};
