/**
 * XELA Themes - Accessibility Invariant System & Fuzzer
 *
 * This module provides:
 * 1. WCAG 2.1 contrast ratio validation
 * 2. Color blindness simulation (protanopia, deuteranopia, tritanopia)
 * 3. Semantic color validation
 * 4. Theme structure invariant checking
 * 5. Property fuzzing for robustness testing
 */

const { AccessibilityValidator } = require('./validator.cjs');
const { ThemeFuzzer } = require('./fuzzer.cjs');
const { ColorBlindnessSimulator } = require('./color-blindness.cjs');
const { InvariantChecker } = require('./invariants.cjs');
const { runFullAudit, generateReport } = require('./runner.cjs');

module.exports = {
  AccessibilityValidator,
  ThemeFuzzer,
  ColorBlindnessSimulator,
  InvariantChecker,
  runFullAudit,
  generateReport
};
