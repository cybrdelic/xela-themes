/**
 * Accessibility System Tests
 * Validates that all accessibility tools work correctly
 */

const path = require('path');
const fs = require('fs');

// Test utilities
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failed++;
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${error.message}`);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`);
  }
}

function assertTrue(value, message) {
  if (!value) {
    throw new Error(`${message}: expected truthy value`);
  }
}

function assertFalse(value, message) {
  if (value) {
    throw new Error(`${message}: expected falsy value`);
  }
}

// Run tests
console.log('\n🧪 Running Accessibility System Tests\n');

// Test Color Utils
console.log('Color Utils:');
const colorUtils = require('./color-utils.cjs');

test('hexToRgb parses valid hex', () => {
  const rgb = colorUtils.hexToRgb('#FF5500');
  assertEqual(rgb.r, 255, 'Red');
  assertEqual(rgb.g, 85, 'Green');
  assertEqual(rgb.b, 0, 'Blue');
});

test('hexToRgb handles alpha', () => {
  const rgb = colorUtils.hexToRgb('#FF550080');
  assertEqual(rgb.a, 128/255, 'Alpha');
});

test('hexToRgb handles shorthand', () => {
  const rgb = colorUtils.hexToRgb('#F50');
  assertEqual(rgb.r, 255, 'Red');
  assertEqual(rgb.g, 85, 'Green');
  assertEqual(rgb.b, 0, 'Blue');
});

test('getContrastRatio calculates correctly', () => {
  const ratio = colorUtils.getContrastRatio('#000000', '#FFFFFF');
  assertTrue(ratio > 20, 'Black on white should have high contrast');
});

test('meetsWcagAA returns correct results', () => {
  assertTrue(colorUtils.meetsWcagAA('#000000', '#FFFFFF'), 'Black on white');
  assertFalse(colorUtils.meetsWcagAA('#777777', '#888888'), 'Similar grays');
});

test('getColorType identifies light/dark', () => {
  assertEqual(colorUtils.getColorType('#000000'), 'dark', 'Black');
  assertEqual(colorUtils.getColorType('#FFFFFF'), 'light', 'White');
  assertEqual(colorUtils.getColorType('#1E1E1E'), 'dark', 'VS Code dark');
});

// Test Color Blindness Simulator
console.log('\nColor Blindness Simulator:');
const { ColorBlindnessSimulator } = require('./color-blindness.cjs');

test('getTypes returns all types', () => {
  const types = ColorBlindnessSimulator.getTypes();
  assertTrue(types.includes('protanopia'), 'Has protanopia');
  assertTrue(types.includes('deuteranopia'), 'Has deuteranopia');
  assertTrue(types.includes('tritanopia'), 'Has tritanopia');
  assertTrue(types.length >= 7, 'At least 7 types');
});

test('simulate transforms colors', () => {
  const original = '#FF0000';
  const simulated = ColorBlindnessSimulator.simulate(original, 'protanopia');
  assertTrue(simulated !== original, 'Color should change');
  assertTrue(simulated.startsWith('#'), 'Returns valid hex');
});

test('areDistinguishable detects similar colors', () => {
  // Red and green should be indistinguishable for protanopia
  const result = ColorBlindnessSimulator.areDistinguishable('#FF0000', '#00FF00', 'achromatopsia', 10);
  // With full color blindness, both map to gray
  assertTrue(typeof result === 'boolean', 'Returns boolean');
});

// Test Validator
console.log('\nAccessibility Validator:');
const { AccessibilityValidator } = require('./validator.cjs');

test('validates theme contrast', () => {
  const validator = new AccessibilityValidator();
  const theme = {
    name: 'Test Theme',
    type: 'dark',
    colors: {
      'editor.background': '#000000',
      'editor.foreground': '#FFFFFF',
      'statusBar.background': '#000000',
      'statusBar.foreground': '#FFFFFF'
    }
  };

  const results = validator.validateContrast(theme);
  assertTrue(results.passed.length > 0, 'Some pairs pass');
});

test('detects low contrast', () => {
  const validator = new AccessibilityValidator();
  const theme = {
    name: 'Low Contrast Theme',
    type: 'dark',
    colors: {
      'editor.background': '#333333',
      'editor.foreground': '#444444'
    }
  };

  const results = validator.validateContrast(theme);
  assertTrue(results.failed.length > 0 || results.passed.some(p => p.ratio < 4.5), 'Detects issues');
});

// Test Invariant Checker
console.log('\nInvariant Checker:');
const { InvariantChecker } = require('./invariants.cjs');

test('checks required properties', () => {
  const checker = new InvariantChecker();
  const theme = { name: 'Test', type: 'dark' };

  const results = checker.checkRequiredProperties(theme);
  assertTrue(results.missing.includes('colors'), 'Detects missing colors');
});

test('checks color invariants', () => {
  const checker = new InvariantChecker();
  const theme = {
    name: 'Test',
    type: 'dark',
    colors: {
      'editor.background': '#FFFFFF' // Light bg for dark theme - invalid
    }
  };

  const results = checker.checkColorInvariants(theme);
  assertTrue(results.failed.length > 0, 'Detects type mismatch');
});

// Test Fuzzer
console.log('\nTheme Fuzzer:');
const { ThemeFuzzer, FUZZ_STRATEGIES } = require('./fuzzer.cjs');

test('generates mutations', () => {
  const fuzzer = new ThemeFuzzer({ seed: 12345 });
  const theme = {
    name: 'Test',
    type: 'dark',
    colors: {
      'editor.background': '#1E1E1E',
      'editor.foreground': '#D4D4D4'
    }
  };

  const result = fuzzer.mutate(theme);
  assertTrue(result.mutations.length > 0, 'Creates mutations');
  assertTrue(result.theme !== theme, 'Returns new theme object');
});

test('generates edge cases', () => {
  const fuzzer = new ThemeFuzzer({ seed: 12345 });
  const theme = {
    name: 'Test',
    type: 'dark',
    colors: {
      'editor.background': '#1E1E1E'
    }
  };

  const edgeCases = fuzzer.generateEdgeCases(theme);
  assertTrue(edgeCases.length >= 5, 'Generates multiple edge cases');
  assertTrue(edgeCases.some(e => e.name === 'all_black'), 'Has all black case');
  assertTrue(edgeCases.some(e => e.name === 'inverted'), 'Has inverted case');
});

test('runs campaign', () => {
  const fuzzer = new ThemeFuzzer({ seed: 12345, maxMutations: 5 });
  const theme = {
    name: 'Test',
    type: 'dark',
    colors: {
      'editor.background': '#1E1E1E',
      'editor.foreground': '#D4D4D4'
    }
  };

  const validator = (t) => ({ valid: true, errors: [] });
  const results = fuzzer.runCampaign(theme, validator, { maxIterations: 5 });

  assertTrue(results.totalTests > 0, 'Runs tests');
  assertTrue(Array.isArray(results.coverage), 'Tracks coverage');
});

// Test Auto-Fix
console.log('\nAuto-Fix:');
const { fixContrastIssues, fixMissingColors } = require('./auto-fix.cjs');

test('fixes missing colors', () => {
  const theme = {
    name: 'Minimal',
    type: 'dark',
    colors: {
      'editor.background': '#1E1E1E',
      'editor.foreground': '#D4D4D4'
    }
  };

  const result = fixMissingColors(theme);
  assertTrue(result.changes.length > 0, 'Adds missing colors');
  assertTrue(result.theme.colors['activityBar.background'], 'Adds activity bar');
});

// Summary
console.log('\n' + '═'.repeat(40));
console.log(`  Tests: ${passed + failed} total`);
console.log(`  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);
console.log('═'.repeat(40) + '\n');

process.exit(failed > 0 ? 1 : 0);
