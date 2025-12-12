# XELA Themes Accessibility System

A comprehensive accessibility validation and fuzzing system for VS Code color themes.

## Features

- **WCAG 2.1 Compliance Checking**: Validates contrast ratios for AA and AAA standards
- **Color Blindness Simulation**: Simulates how themes appear to users with various types of color vision deficiency
- **Invariant Checking**: Validates structural and semantic requirements for themes
- **Theme Fuzzing**: Tests theme robustness with random mutations and edge cases
- **Auto-Fix**: Automatically suggests and applies fixes for common accessibility issues

## Installation

The accessibility tools are included in the XELA Themes repository. No additional installation is required.

## Usage

### Command Line Interface

```bash
# Run full accessibility audit on all themes
node scripts/accessibility/run-accessibility.cjs audit

# Run with AAA compliance level
node scripts/accessibility/run-accessibility.cjs audit --target-level AAA

# Check a single theme
node scripts/accessibility/run-accessibility.cjs check themes/xela-black-color-theme.json

# Generate fix suggestions
node scripts/accessibility/run-accessibility.cjs fix themes/xela-black-color-theme.json --dry-run

# Apply fixes
node scripts/accessibility/run-accessibility.cjs fix themes/xela-black-color-theme.json

# Run fuzzing campaign
node scripts/accessibility/run-accessibility.cjs fuzz --iterations 100 --sample 10

# Simulate color blindness
node scripts/accessibility/run-accessibility.cjs simulate themes/xela-black-color-theme.json --type deuteranopia
```

### Programmatic Usage

```javascript
const { AccessibilityValidator } = require('./scripts/accessibility/validator.cjs');
const { ThemeFuzzer } = require('./scripts/accessibility/fuzzer.cjs');
const { ColorBlindnessSimulator } = require('./scripts/accessibility/color-blindness.cjs');
const { InvariantChecker } = require('./scripts/accessibility/invariants.cjs');

// Load a theme
const theme = require('./themes/xela-black-color-theme.json');

// Validate accessibility
const validator = new AccessibilityValidator({ targetLevel: 'AA' });
const results = validator.validate(theme);
console.log(`Score: ${results.summary.score}/100`);

// Check invariants
const checker = new InvariantChecker();
const invariantResults = checker.check(theme);

// Simulate color blindness
const simulated = ColorBlindnessSimulator.transformTheme(theme, 'deuteranopia');

// Fuzz the theme
const fuzzer = new ThemeFuzzer({ seed: 12345 });
const mutations = fuzzer.generateMutations(theme, 10);
```

## WCAG Requirements

The validator checks against WCAG 2.1 contrast requirements:

| Level | Normal Text | Large Text | UI Components |
|-------|-------------|------------|---------------|
| AA    | 4.5:1       | 3.0:1      | 3.0:1         |
| AAA   | 7.0:1       | 4.5:1      | 4.5:1         |

## Color Blindness Types

The simulator supports:

- **Protanopia**: Red-blind (~1% of males)
- **Deuteranopia**: Green-blind (~1% of males)
- **Tritanopia**: Blue-blind (~0.003% of population)
- **Protanomaly**: Red-weak (~1% of males)
- **Deuteranomaly**: Green-weak (~5% of males)
- **Tritanomaly**: Blue-weak (rare)
- **Achromatopsia**: Complete color blindness

## Invariants Checked

### Color Invariants
- Dark themes have dark backgrounds
- Light themes have light backgrounds
- Consistent UI darkness across components
- Error and warning colors are visually distinct
- Cursor is clearly visible
- Selection is visible
- Find matches are highlighted
- Active/inactive states are distinguishable
- All hex colors are valid

### Token Invariants
- Minimum 10 token color rules
- Comments are styled
- Strings are styled
- Keywords are styled
- Comments are distinct from regular code

## Fuzzing Strategies

The fuzzer applies various mutations:

- Random colors
- Color inversion
- Saturation adjustments
- Lightness adjustments
- Transparency
- Pure black/white
- Invalid hex values
- Empty strings
- Null values
- Wrong types

## Output

Reports are saved to `accessibility-reports/`:

- `accessibility-audit.json`: Full JSON results
- `accessibility-report.txt`: Human-readable report
- `themes-needing-fixes.json`: List of themes requiring attention
- `fuzzing-results.json`: Fuzzing campaign results

## Integration with CI

Add to your CI pipeline:

```yaml
- name: Accessibility Check
  run: |
    node scripts/accessibility/run-accessibility.cjs audit
    if [ $? -ne 0 ]; then
      echo "Accessibility audit failed"
      exit 1
    fi
```

## API Reference

### AccessibilityValidator

```javascript
const validator = new AccessibilityValidator(options);

// Options:
// - targetLevel: 'AA' | 'AAA' (default: 'AA')
// - strictMode: boolean (default: false)

const results = validator.validate(theme);
// Returns: { themeName, themeType, contrastValidation, semanticValidation, tokenContrastValidation, summary }
```

### InvariantChecker

```javascript
const checker = new InvariantChecker(options);

// Options:
// - strict: boolean (default: false)

const results = checker.check(theme);
// Returns: { properties, colors, colorInvariants, tokenInvariants, summary }
```

### ThemeFuzzer

```javascript
const fuzzer = new ThemeFuzzer(options);

// Options:
// - seed: number (default: Date.now())
// - maxMutations: number (default: 100)
// - strategies: string[] (default: all strategies)

const mutations = fuzzer.generateMutations(theme, count);
const edgeCases = fuzzer.generateEdgeCases(theme);
const campaignResults = fuzzer.runCampaign(theme, validatorFn, options);
```

### ColorBlindnessSimulator

```javascript
// Static methods
ColorBlindnessSimulator.getTypes();
ColorBlindnessSimulator.simulate(hex, type);
ColorBlindnessSimulator.transformTheme(theme, type);
ColorBlindnessSimulator.findProblematicPairs(theme, type);
ColorBlindnessSimulator.generateReport(theme);
```

## License

MIT License - See LICENSE file for details.
