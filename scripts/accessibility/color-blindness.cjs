/**
 * Color Blindness Simulator
 * Simulates how colors appear to people with different types of color vision deficiency
 */

const { hexToRgb, rgbToHex } = require('./color-utils.cjs');

/**
 * Color blindness types and their transformation matrices
 * Based on Brettel, Viénot, and Mollon (1997) research
 */
const COLOR_BLINDNESS_MATRICES = {
  // Protanopia (red-blind) - ~1% of males
  protanopia: {
    name: 'Protanopia',
    description: 'Red-blind (difficulty distinguishing red/green, reds appear darker)',
    matrix: [
      [0.567, 0.433, 0.000],
      [0.558, 0.442, 0.000],
      [0.000, 0.242, 0.758]
    ]
  },

  // Deuteranopia (green-blind) - ~1% of males
  deuteranopia: {
    name: 'Deuteranopia',
    description: 'Green-blind (difficulty distinguishing red/green)',
    matrix: [
      [0.625, 0.375, 0.000],
      [0.700, 0.300, 0.000],
      [0.000, 0.300, 0.700]
    ]
  },

  // Tritanopia (blue-blind) - ~0.003% of population
  tritanopia: {
    name: 'Tritanopia',
    description: 'Blue-blind (difficulty distinguishing blue/yellow)',
    matrix: [
      [0.950, 0.050, 0.000],
      [0.000, 0.433, 0.567],
      [0.000, 0.475, 0.525]
    ]
  },

  // Protanomaly (red-weak) - ~1% of males
  protanomaly: {
    name: 'Protanomaly',
    description: 'Red-weak (reduced sensitivity to red)',
    matrix: [
      [0.817, 0.183, 0.000],
      [0.333, 0.667, 0.000],
      [0.000, 0.125, 0.875]
    ]
  },

  // Deuteranomaly (green-weak) - ~5% of males
  deuteranomaly: {
    name: 'Deuteranomaly',
    description: 'Green-weak (reduced sensitivity to green)',
    matrix: [
      [0.800, 0.200, 0.000],
      [0.258, 0.742, 0.000],
      [0.000, 0.142, 0.858]
    ]
  },

  // Tritanomaly (blue-weak) - rare
  tritanomaly: {
    name: 'Tritanomaly',
    description: 'Blue-weak (reduced sensitivity to blue)',
    matrix: [
      [0.967, 0.033, 0.000],
      [0.000, 0.733, 0.267],
      [0.000, 0.183, 0.817]
    ]
  },

  // Achromatopsia (total color blindness) - ~0.003% of population
  achromatopsia: {
    name: 'Achromatopsia',
    description: 'Complete color blindness (monochromatic vision)',
    matrix: [
      [0.299, 0.587, 0.114],
      [0.299, 0.587, 0.114],
      [0.299, 0.587, 0.114]
    ]
  }
};

class ColorBlindnessSimulator {
  /**
   * Get all supported color blindness types
   * @returns {string[]}
   */
  static getTypes() {
    return Object.keys(COLOR_BLINDNESS_MATRICES);
  }

  /**
   * Get info about a color blindness type
   * @param {string} type - Type of color blindness
   * @returns {{name: string, description: string} | null}
   */
  static getTypeInfo(type) {
    const config = COLOR_BLINDNESS_MATRICES[type];
    if (!config) return null;
    return { name: config.name, description: config.description };
  }

  /**
   * Simulate how a color appears with a specific type of color blindness
   * @param {string} hex - Hex color to transform
   * @param {string} type - Type of color blindness
   * @returns {string} Transformed hex color
   */
  static simulate(hex, type) {
    const config = COLOR_BLINDNESS_MATRICES[type];
    if (!config) {
      throw new Error(`Unknown color blindness type: ${type}`);
    }

    const rgb = hexToRgb(hex);
    if (!rgb) return hex;

    const { r, g, b, a } = rgb;
    const matrix = config.matrix;

    // Apply transformation matrix
    const newR = matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b;
    const newG = matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b;
    const newB = matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b;

    return rgbToHex(newR, newG, newB, a);
  }

  /**
   * Simulate a color for all types of color blindness
   * @param {string} hex - Hex color to transform
   * @returns {Object.<string, string>} Map of type to transformed color
   */
  static simulateAll(hex) {
    const results = {};
    for (const type of this.getTypes()) {
      results[type] = this.simulate(hex, type);
    }
    return results;
  }

  /**
   * Transform an entire theme for a specific type of color blindness
   * @param {Object} theme - Theme object with colors property
   * @param {string} type - Type of color blindness
   * @returns {Object} Transformed theme
   */
  static transformTheme(theme, type) {
    const transformed = JSON.parse(JSON.stringify(theme));

    // Transform UI colors
    if (transformed.colors) {
      for (const [key, value] of Object.entries(transformed.colors)) {
        if (typeof value === 'string' && value.startsWith('#')) {
          transformed.colors[key] = this.simulate(value, type);
        }
      }
    }

    // Transform token colors
    if (transformed.tokenColors) {
      for (const token of transformed.tokenColors) {
        if (token.settings) {
          if (token.settings.foreground) {
            token.settings.foreground = this.simulate(token.settings.foreground, type);
          }
          if (token.settings.background) {
            token.settings.background = this.simulate(token.settings.background, type);
          }
        }
      }
    }

    // Transform semantic token colors
    if (transformed.semanticTokenColors) {
      for (const [key, value] of Object.entries(transformed.semanticTokenColors)) {
        if (typeof value === 'string' && value.startsWith('#')) {
          transformed.semanticTokenColors[key] = this.simulate(value, type);
        } else if (typeof value === 'object' && value.foreground) {
          transformed.semanticTokenColors[key].foreground = this.simulate(value.foreground, type);
        }
      }
    }

    return transformed;
  }

  /**
   * Check if two colors are distinguishable under color blindness
   * @param {string} color1 - First hex color
   * @param {string} color2 - Second hex color
   * @param {string} type - Type of color blindness
   * @param {number} [threshold=30] - Minimum color distance to be distinguishable
   * @returns {boolean}
   */
  static areDistinguishable(color1, color2, type, threshold = 30) {
    const transformed1 = this.simulate(color1, type);
    const transformed2 = this.simulate(color2, type);

    const rgb1 = hexToRgb(transformed1);
    const rgb2 = hexToRgb(transformed2);

    if (!rgb1 || !rgb2) return true;

    const distance = Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    );

    return distance >= threshold;
  }

  /**
   * Find problematic color pairs in a theme for color blind users
   * @param {Object} theme - Theme object
   * @param {string} type - Type of color blindness
   * @returns {Array} Array of problematic color pairs
   */
  static findProblematicPairs(theme, type) {
    const problems = [];
    const colors = theme.colors || {};

    // Define color pairs that should be distinguishable
    const criticalPairs = [
      ['editor.background', 'editor.foreground'],
      ['editor.background', 'editorCursor.foreground'],
      ['editorError.foreground', 'editorWarning.foreground'],
      ['diffEditor.insertedTextBackground', 'diffEditor.removedTextBackground'],
      ['editorGutter.addedBackground', 'editorGutter.deletedBackground'],
      ['gitDecoration.addedResourceForeground', 'gitDecoration.deletedResourceForeground'],
      ['terminal.ansiRed', 'terminal.ansiGreen'],
      ['list.errorForeground', 'list.warningForeground']
    ];

    for (const [key1, key2] of criticalPairs) {
      const color1 = colors[key1];
      const color2 = colors[key2];

      if (color1 && color2) {
        if (!this.areDistinguishable(color1, color2, type)) {
          problems.push({
            type,
            pair: [key1, key2],
            original: [color1, color2],
            simulated: [this.simulate(color1, type), this.simulate(color2, type)]
          });
        }
      }
    }

    return problems;
  }

  /**
   * Generate a comprehensive color blindness report for a theme
   * @param {Object} theme - Theme object
   * @returns {Object} Report with issues for each type
   */
  static generateReport(theme) {
    const report = {
      themeName: theme.name || 'Unknown',
      issues: {},
      summary: {
        totalIssues: 0,
        byType: {}
      }
    };

    for (const type of this.getTypes()) {
      const problems = this.findProblematicPairs(theme, type);
      report.issues[type] = problems;
      report.summary.byType[type] = problems.length;
      report.summary.totalIssues += problems.length;
    }

    return report;
  }
}

module.exports = { ColorBlindnessSimulator, COLOR_BLINDNESS_MATRICES };
