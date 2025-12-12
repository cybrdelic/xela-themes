#!/usr/bin/env node
/**
 * XELA Themes Accessibility CLI
 * Command-line interface for running accessibility audits and fuzzing
 *
 * Usage:
 *   node run-accessibility.cjs audit [--target-level AA|AAA] [--strict]
 *   node run-accessibility.cjs fuzz [--iterations 100] [--sample 5]
 *   node run-accessibility.cjs check <theme-file>
 *   node run-accessibility.cjs fix <theme-file> [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const { runFullAudit, runFuzzingCampaign, auditTheme, loadTheme, generateReport, saveResults } = require('./runner.cjs');
const { AccessibilityValidator } = require('./validator.cjs');
const { InvariantChecker } = require('./invariants.cjs');
const { ThemeFuzzer } = require('./fuzzer.cjs');
const { ColorBlindnessSimulator } = require('./color-blindness.cjs');
const { getContrastRatio, adjustLightness } = require('./color-utils.cjs');

const OUTPUT_DIR = path.join(__dirname, '..', '..', 'accessibility-reports');

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0];
  const options = {};

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];
      if (nextArg && !nextArg.startsWith('--')) {
        options[key] = nextArg;
        i++;
      } else {
        options[key] = true;
      }
    } else if (!options.file) {
      options.file = arg;
    }
  }

  return { command, options };
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
XELA Themes Accessibility Tools
================================

Usage:
  node run-accessibility.cjs <command> [options]

Commands:
  audit              Run full accessibility audit on all themes
  fuzz               Run fuzzing campaign to find edge cases
  check <file>       Check a single theme file
  fix <file>         Suggest fixes for a theme
  simulate <file>    Simulate color blindness for a theme
  report             Generate report from last audit

Options:
  --target-level     WCAG target level: AA (default) or AAA
  --strict           Enable strict mode (fail on warnings)
  --iterations       Number of fuzz iterations (default: 50)
  --sample           Number of themes to fuzz (default: 5)
  --dry-run          Show fixes without applying them
  --output           Output directory for reports
  --type             Color blindness type for simulation

Examples:
  node run-accessibility.cjs audit
  node run-accessibility.cjs audit --target-level AAA
  node run-accessibility.cjs fuzz --iterations 100 --sample 10
  node run-accessibility.cjs check themes/xela-black-color-theme.json
  node run-accessibility.cjs fix themes/xela-black-color-theme.json --dry-run
  node run-accessibility.cjs simulate themes/xela-black-color-theme.json --type deuteranopia
`);
}

/**
 * Run the audit command
 */
function runAuditCommand(options) {
  console.log('\n🔍 XELA Themes Accessibility Audit\n');

  const results = runFullAudit({
    targetLevel: options['target-level'] || 'AA',
    strict: options.strict || false
  });

  // Print summary to console
  console.log(generateReport(results));

  // Save results
  const outputDir = options.output || OUTPUT_DIR;
  saveResults(results, outputDir);

  // Exit with error code if themes fail
  const failRate = results.summary.notAccessible / results.totalThemes;
  if (failRate > 0.5) {
    console.log('\n⚠️  More than 50% of themes have accessibility issues!\n');
    process.exit(1);
  }
}

/**
 * Run the fuzz command
 */
function runFuzzCommand(options) {
  console.log('\n🧪 XELA Themes Fuzzing Campaign\n');

  const results = runFuzzingCampaign({
    sampleSize: parseInt(options.sample) || 5,
    iterations: parseInt(options.iterations) || 50
  });

  // Print summary
  console.log('═'.repeat(50));
  console.log('  FUZZING RESULTS');
  console.log('═'.repeat(50));
  console.log(`  Total Tests: ${results.summary.totalTests}`);
  console.log(`  Passed: ${results.summary.totalPassed}`);
  console.log(`  Failed: ${results.summary.totalFailed}`);
  console.log(`  Crashes: ${results.summary.totalCrashes}`);

  if (results.summary.crashingStrategies.length > 0) {
    console.log(`\n  ⚠️  Crashing Strategies:`);
    for (const strategy of results.summary.crashingStrategies) {
      console.log(`    - ${strategy}`);
    }
  }

  if (Object.keys(results.summary.failingStrategies).length > 0) {
    console.log(`\n  Frequently Failing Strategies:`);
    const sorted = Object.entries(results.summary.failingStrategies)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    for (const [strategy, count] of sorted) {
      console.log(`    - ${strategy}: ${count} failures`);
    }
  }

  console.log('═'.repeat(50));

  // Save results
  const outputDir = options.output || OUTPUT_DIR;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(outputDir, 'fuzzing-results.json'),
    JSON.stringify(results, null, 2)
  );
  console.log(`\n📄 Results saved to: ${path.join(outputDir, 'fuzzing-results.json')}`);
}

/**
 * Run the check command for a single theme
 */
function runCheckCommand(options) {
  if (!options.file) {
    console.error('❌ Please specify a theme file to check');
    process.exit(1);
  }

  const themePath = path.resolve(options.file);
  if (!fs.existsSync(themePath)) {
    console.error(`❌ Theme file not found: ${themePath}`);
    process.exit(1);
  }

  const theme = loadTheme(themePath);
  if (!theme) {
    console.error('❌ Failed to load theme');
    process.exit(1);
  }

  console.log(`\n🔍 Checking: ${theme.name || path.basename(themePath)}\n`);

  const results = auditTheme(theme, {
    targetLevel: options['target-level'] || 'AA'
  });

  // Print results
  console.log('═'.repeat(50));
  console.log(`  Theme: ${results.themeName}`);
  console.log(`  Type: ${results.themeType}`);
  console.log(`  Score: ${results.summary.overallScore}/100`);
  console.log(`  Accessible: ${results.summary.isAccessible ? '✅ Yes' : '❌ No'}`);
  console.log('═'.repeat(50));

  if (results.summary.criticalIssues.length > 0) {
    console.log('\n🔴 Critical Issues:');
    for (const issue of results.summary.criticalIssues) {
      console.log(`  • ${issue}`);
    }
  }

  if (results.summary.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    for (const warning of results.summary.warnings.slice(0, 10)) {
      console.log(`  • ${warning}`);
    }
    if (results.summary.warnings.length > 10) {
      console.log(`  ... and ${results.summary.warnings.length - 10} more`);
    }
  }

  if (results.summary.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    for (const rec of results.summary.recommendations) {
      console.log(`  • ${rec}`);
    }
  }

  // Color blindness check
  if (results.colorBlindness.summary.totalIssues > 0) {
    console.log('\n👁️  Color Blindness Issues:');
    for (const [type, count] of Object.entries(results.colorBlindness.summary.byType)) {
      if (count > 0) {
        console.log(`  • ${type}: ${count} problematic color pairs`);
      }
    }
  }

  console.log('');

  process.exit(results.summary.isAccessible ? 0 : 1);
}

/**
 * Generate fix suggestions for a theme
 */
function runFixCommand(options) {
  if (!options.file) {
    console.error('❌ Please specify a theme file to fix');
    process.exit(1);
  }

  const themePath = path.resolve(options.file);
  const theme = loadTheme(themePath);
  if (!theme) {
    console.error('❌ Failed to load theme');
    process.exit(1);
  }

  console.log(`\n🔧 Generating fixes for: ${theme.name}\n`);

  const validator = new AccessibilityValidator();
  const results = validator.validate(theme);

  const fixes = [];

  // Generate contrast fixes
  for (const failed of results.contrastValidation.failed) {
    const { pair, foreground, background, ratio, required } = failed;

    // Calculate how much to adjust
    const deficit = required - ratio;
    const adjustment = Math.ceil(deficit * 15); // Rough adjustment factor

    // Try lightening or darkening based on current contrast
    let suggestedFg;
    const bgLuminance = require('./color-utils.cjs').getRelativeLuminance(background);

    if (bgLuminance < 0.5) {
      // Dark background - lighten foreground
      suggestedFg = adjustLightness(foreground, adjustment);
    } else {
      // Light background - darken foreground
      suggestedFg = adjustLightness(foreground, -adjustment);
    }

    const newRatio = getContrastRatio(suggestedFg, background);

    fixes.push({
      type: 'contrast',
      key: pair.fg,
      description: pair.description,
      current: foreground,
      suggested: suggestedFg,
      currentRatio: ratio,
      newRatio: parseFloat(newRatio.toFixed(2)),
      required
    });
  }

  // Print fixes
  if (fixes.length === 0) {
    console.log('✅ No fixes needed - theme passes accessibility checks!\n');
    return;
  }

  console.log(`Found ${fixes.length} suggested fixes:\n`);

  for (const fix of fixes) {
    console.log(`  ${fix.description}:`);
    console.log(`    Key: ${fix.key}`);
    console.log(`    Current: ${fix.current} (ratio: ${fix.currentRatio}:1)`);
    console.log(`    Suggested: ${fix.suggested} (ratio: ${fix.newRatio}:1)`);
    console.log(`    Required: ${fix.required}:1`);
    console.log('');
  }

  // Apply fixes if not dry-run
  if (!options['dry-run']) {
    const fixedTheme = JSON.parse(JSON.stringify(theme));
    for (const fix of fixes) {
      if (fixedTheme.colors[fix.key]) {
        fixedTheme.colors[fix.key] = fix.suggested;
      }
    }

    const outputPath = themePath.replace('.json', '.fixed.json');
    fs.writeFileSync(outputPath, JSON.stringify(fixedTheme, null, 2));
    console.log(`\n📄 Fixed theme saved to: ${outputPath}`);
  } else {
    console.log('(Dry run - no changes applied. Remove --dry-run to apply fixes)');
  }
}

/**
 * Run color blindness simulation
 */
function runSimulateCommand(options) {
  if (!options.file) {
    console.error('❌ Please specify a theme file to simulate');
    process.exit(1);
  }

  const themePath = path.resolve(options.file);
  const theme = loadTheme(themePath);
  if (!theme) {
    console.error('❌ Failed to load theme');
    process.exit(1);
  }

  const type = options.type || 'deuteranopia';
  const validTypes = ColorBlindnessSimulator.getTypes();

  if (!validTypes.includes(type)) {
    console.error(`❌ Invalid type. Valid types: ${validTypes.join(', ')}`);
    process.exit(1);
  }

  console.log(`\n👁️  Simulating ${type} for: ${theme.name}\n`);

  const info = ColorBlindnessSimulator.getTypeInfo(type);
  console.log(`  ${info.name}: ${info.description}\n`);

  const transformed = ColorBlindnessSimulator.transformTheme(theme, type);
  transformed.name = `${theme.name} (${info.name} Simulation)`;

  const outputPath = themePath.replace('.json', `.${type}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 2));

  console.log(`📄 Simulated theme saved to: ${outputPath}`);
  console.log('\nYou can apply this theme in VS Code to see how it appears to');
  console.log(`users with ${info.name}.\n`);

  // Also show problematic pairs
  const problems = ColorBlindnessSimulator.findProblematicPairs(theme, type);
  if (problems.length > 0) {
    console.log(`⚠️  Found ${problems.length} potentially indistinguishable color pairs:`);
    for (const problem of problems.slice(0, 5)) {
      console.log(`  • ${problem.pair[0]} vs ${problem.pair[1]}`);
    }
    if (problems.length > 5) {
      console.log(`  ... and ${problems.length - 5} more`);
    }
  }
}

// Main execution
const { command, options } = parseArgs();

switch (command) {
  case 'audit':
    runAuditCommand(options);
    break;
  case 'fuzz':
    runFuzzCommand(options);
    break;
  case 'check':
    runCheckCommand(options);
    break;
  case 'fix':
    runFixCommand(options);
    break;
  case 'simulate':
    runSimulateCommand(options);
    break;
  case 'help':
  case '--help':
  case '-h':
    printHelp();
    break;
  default:
    if (command) {
      console.error(`Unknown command: ${command}`);
    }
    printHelp();
    process.exit(1);
}
