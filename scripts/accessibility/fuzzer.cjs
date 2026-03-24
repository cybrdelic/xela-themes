/**
 * Accessibility Theme Fuzzer
 * Generates mutations and edge cases to test theme robustness
 */

/**
 * Predefined fuzzing strategies
 */
const FUZZ_STRATEGIES = {
  RANDOM_COLOR: 'random_color',
  EXTREME_LIGHTNESS: 'extreme_lightness',
  EXTREME_SATURATION: 'extreme_saturation',
  HUE_SHIFT: 'hue_shift',
  ALPHA_VARIATION: 'alpha_variation',
  REMOVE_COLOR: 'remove_color',
  SWAP_COLORS: 'swap_colors',
  INVERT: 'invert'
};

/**
 * Simple seeded random number generator (mulberry32)
 */
function seededRandom(seed) {
  let t = seed + 0x6D2B79F5;
  return function () {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Convert hex to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Invert a hex color
 */
function invertColor(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
}

/**
 * Generate a random hex color
 */
function randomColor(rand) {
  const r = Math.floor(rand() * 256);
  const g = Math.floor(rand() * 256);
  const b = Math.floor(rand() * 256);
  return rgbToHex(r, g, b);
}

/**
 * Shift hue of a color
 */
function shiftHue(hex, amount) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  // Simple RGB rotation approximation
  const shift = amount % 3;
  if (shift === 1) return rgbToHex(rgb.g, rgb.b, rgb.r);
  if (shift === 2) return rgbToHex(rgb.b, rgb.r, rgb.g);
  return hex;
}

/**
 * Adjust lightness of a color
 */
function adjustLightness(hex, factor) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return rgbToHex(
    Math.round(rgb.r * factor),
    Math.round(rgb.g * factor),
    Math.round(rgb.b * factor)
  );
}

/**
 * ThemeFuzzer class for mutation testing
 */
class ThemeFuzzer {
  constructor(options = {}) {
    this.seed = options.seed || Date.now();
    this.maxMutations = options.maxMutations || 100;
    this.strategies = options.strategies || Object.values(FUZZ_STRATEGIES);
    this.rand = seededRandom(this.seed);
  }

  /**
   * Deep clone an object
   */
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Apply a single mutation to a theme
   */
  mutate(theme) {
    const mutated = this.clone(theme);
    const mutations = [];
    const colorKeys = Object.keys(mutated.colors || {});

    if (colorKeys.length === 0) {
      return { theme: mutated, mutations: [], strategy: null };
    }

    const strategy = this.strategies[Math.floor(this.rand() * this.strategies.length)];
    const targetKey = colorKeys[Math.floor(this.rand() * colorKeys.length)];
    const originalValue = mutated.colors[targetKey];

    switch (strategy) {
      case FUZZ_STRATEGIES.RANDOM_COLOR:
        mutated.colors[targetKey] = randomColor(this.rand);
        break;

      case FUZZ_STRATEGIES.EXTREME_LIGHTNESS:
        mutated.colors[targetKey] = this.rand() > 0.5 ? '#000000' : '#FFFFFF';
        break;

      case FUZZ_STRATEGIES.EXTREME_SATURATION:
        mutated.colors[targetKey] = this.rand() > 0.5 ? '#FF0000' : '#808080';
        break;

      case FUZZ_STRATEGIES.HUE_SHIFT:
        mutated.colors[targetKey] = shiftHue(originalValue, Math.floor(this.rand() * 3));
        break;

      case FUZZ_STRATEGIES.ALPHA_VARIATION:
        if (originalValue && originalValue.length === 7) {
          const alpha = Math.floor(this.rand() * 256).toString(16).padStart(2, '0');
          mutated.colors[targetKey] = originalValue + alpha;
        }
        break;

      case FUZZ_STRATEGIES.REMOVE_COLOR:
        delete mutated.colors[targetKey];
        break;

      case FUZZ_STRATEGIES.SWAP_COLORS:
        const otherKey = colorKeys[Math.floor(this.rand() * colorKeys.length)];
        const temp = mutated.colors[targetKey];
        mutated.colors[targetKey] = mutated.colors[otherKey];
        mutated.colors[otherKey] = temp;
        break;

      case FUZZ_STRATEGIES.INVERT:
        mutated.colors[targetKey] = invertColor(originalValue);
        break;
    }

    mutations.push({
      strategy,
      key: targetKey,
      original: originalValue,
      mutated: mutated.colors[targetKey]
    });

    return { theme: mutated, mutations, strategy };
  }

  /**
   * Generate multiple mutations
   */
  generateMutations(theme, count = 10) {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(this.mutate(theme));
    }
    return results;
  }

  /**
   * Generate edge case themes
   */
  generateEdgeCases(theme) {
    const edgeCases = [];
    const colorKeys = Object.keys(theme.colors || {});

    // All black
    const allBlack = this.clone(theme);
    colorKeys.forEach(k => { allBlack.colors[k] = '#000000'; });
    edgeCases.push({ name: 'all_black', theme: allBlack });

    // All white
    const allWhite = this.clone(theme);
    colorKeys.forEach(k => { allWhite.colors[k] = '#FFFFFF'; });
    edgeCases.push({ name: 'all_white', theme: allWhite });

    // Inverted
    const inverted = this.clone(theme);
    colorKeys.forEach(k => {
      if (inverted.colors[k]) {
        inverted.colors[k] = invertColor(inverted.colors[k]);
      }
    });
    edgeCases.push({ name: 'inverted', theme: inverted });

    // Very dark
    const veryDark = this.clone(theme);
    colorKeys.forEach(k => {
      if (veryDark.colors[k]) {
        veryDark.colors[k] = adjustLightness(veryDark.colors[k], 0.2);
      }
    });
    edgeCases.push({ name: 'very_dark', theme: veryDark });

    // Very bright
    const veryBright = this.clone(theme);
    colorKeys.forEach(k => {
      if (veryBright.colors[k]) {
        veryBright.colors[k] = adjustLightness(veryBright.colors[k], 2.0);
      }
    });
    edgeCases.push({ name: 'very_bright', theme: veryBright });

    // Empty colors
    const emptyColors = this.clone(theme);
    emptyColors.colors = {};
    edgeCases.push({ name: 'empty_colors', theme: emptyColors });

    // Random noise
    const noise = this.clone(theme);
    colorKeys.forEach(k => { noise.colors[k] = randomColor(this.rand); });
    edgeCases.push({ name: 'random_noise', theme: noise });

    return edgeCases;
  }

  /**
   * Run a fuzzing campaign
   */
  runCampaign(theme, validator, options = {}) {
    const maxIterations = options.maxIterations || this.maxMutations;
    const results = {
      totalTests: 0,
      passed: 0,
      failed: 0,
      crashes: 0,
      failures: [],
      crashDetails: [],
      coverage: []
    };

    const strategyCoverage = {};
    Object.values(FUZZ_STRATEGIES).forEach(s => { strategyCoverage[s] = 0; });

    // Test edge cases first
    const edgeCases = this.generateEdgeCases(theme);
    for (const edgeCase of edgeCases) {
      results.totalTests++;
      try {
        const validation = validator(edgeCase.theme);
        if (validation.valid) {
          results.passed++;
        } else {
          results.failed++;
          results.failures.push({
            strategy: `edge_case_${edgeCase.name}`,
            errors: validation.errors
          });
        }
      } catch (error) {
        results.crashes++;
        results.crashDetails.push({
          strategy: `edge_case_${edgeCase.name}`,
          error: error.message
        });
      }
    }

    // Run random mutations
    for (let i = 0; i < maxIterations; i++) {
      results.totalTests++;
      try {
        const { theme: mutated, strategy } = this.mutate(theme);
        if (strategy) {
          strategyCoverage[strategy]++;
        }

        const validation = validator(mutated);
        if (validation.valid) {
          results.passed++;
        } else {
          results.failed++;
          results.failures.push({
            strategy,
            errors: validation.errors
          });
        }
      } catch (error) {
        results.crashes++;
        results.crashDetails.push({
          strategy: 'mutation',
          error: error.message
        });
      }
    }

    results.coverage = Object.entries(strategyCoverage).map(([strategy, count]) => ({
      strategy,
      count,
      percentage: (count / maxIterations * 100).toFixed(1)
    }));

    return results;
  }
}

module.exports = {
  ThemeFuzzer,
  FUZZ_STRATEGIES
};
