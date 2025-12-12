/**
 * Accessibility Audit Runner
 * Orchestrates validation, invariant checking, and fuzzing across all themes
 */

const fs = require('fs');
const path = require('path');
const { AccessibilityValidator } = require('./validator.cjs');
const { InvariantChecker } = require('./invariants.cjs');
const { ThemeFuzzer } = require('./fuzzer.cjs');
const { ColorBlindnessSimulator } = require('./color-blindness.cjs');

const THEMES_DIR = path.join(__dirname, '..', '..', 'themes');

/**
 * Load a theme file
 * @param {string} filePath - Path to theme file
 * @returns {Object | null} Theme object or null on error
 */
function loadTheme(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to load theme: ${filePath}`, error.message);
    return null;
  }
}

/**
 * Get all theme files
 * @returns {string[]} Array of theme file paths
 */
function getThemeFiles() {
  const files = fs.readdirSync(THEMES_DIR);
  return files
    .filter(f => f.endsWith('.json') && !f.endsWith('.backup'))
    .map(f => path.join(THEMES_DIR, f));
}

/**
 * Run full accessibility audit on a single theme
 * @param {Object} theme - Theme object
 * @param {Object} options - Audit options
 * @returns {Object} Audit results
 */
function auditTheme(theme, options = {}) {
  const validator = new AccessibilityValidator({
    targetLevel: options.targetLevel || 'AA'
  });

  const invariantChecker = new InvariantChecker({
    strict: options.strict || false
  });

  const results = {
    themeName: theme.name || 'Unknown',
    themeType: theme.type || 'unknown',
    timestamp: new Date().toISOString(),

    accessibility: validator.validate(theme),
    invariants: invariantChecker.check(theme),
    colorBlindness: ColorBlindnessSimulator.generateReport(theme),

    summary: {
      overallScore: 0,
      isAccessible: false,
      criticalIssues: [],
      warnings: [],
      recommendations: []
    }
  };

  // Calculate overall score
  const accessibilityScore = results.accessibility.summary.score;
  const invariantScore = results.invariants.summary.score;
  const colorBlindnessScore = Math.max(0, 100 - results.colorBlindness.summary.totalIssues * 10);

  results.summary.overallScore = Math.round(
    (accessibilityScore * 0.4 + invariantScore * 0.4 + colorBlindnessScore * 0.2)
  );

  // Collect all critical issues
  results.summary.criticalIssues = [
    ...results.accessibility.summary.issues.filter(i => i.includes('contrast')),
    ...results.invariants.summary.criticalIssues
  ];

  // Collect warnings
  results.summary.warnings = [
    ...results.accessibility.summary.issues.filter(i => !i.includes('contrast')),
    ...results.invariants.summary.warnings
  ];

  // Generate recommendations
  if (results.accessibility.contrastValidation.summary.failed > 0) {
    results.summary.recommendations.push(
      `Improve contrast for ${results.accessibility.contrastValidation.summary.failed} UI elements`
    );
  }

  if (results.colorBlindness.summary.totalIssues > 0) {
    results.summary.recommendations.push(
      `Review ${results.colorBlindness.summary.totalIssues} color pairs that may be indistinguishable for color blind users`
    );
  }

  if (results.invariants.colors.semantic.missing.length > 0) {
    results.summary.recommendations.push(
      `Add missing semantic colors: ${results.invariants.colors.semantic.missing.join(', ')}`
    );
  }

  results.summary.isAccessible =
    results.summary.criticalIssues.length === 0 &&
    results.summary.overallScore >= 70;

  return results;
}

/**
 * Run accessibility audit on all themes
 * @param {Object} options - Audit options
 * @returns {Object} Full audit results
 */
function runFullAudit(options = {}) {
  const themeFiles = getThemeFiles();
  const results = {
    timestamp: new Date().toISOString(),
    options,
    totalThemes: themeFiles.length,
    themes: [],
    summary: {
      accessible: 0,
      notAccessible: 0,
      averageScore: 0,
      commonIssues: {},
      byType: { dark: { count: 0, avgScore: 0 }, light: { count: 0, avgScore: 0 } }
    }
  };

  let totalScore = 0;
  let darkScore = 0;
  let lightScore = 0;

  console.log(`\n🔍 Running accessibility audit on ${themeFiles.length} themes...\n`);

  for (const filePath of themeFiles) {
    const theme = loadTheme(filePath);
    if (!theme) continue;

    const themeResult = auditTheme(theme, options);
    themeResult.file = path.basename(filePath);
    results.themes.push(themeResult);

    // Update summary stats
    if (themeResult.summary.isAccessible) {
      results.summary.accessible++;
    } else {
      results.summary.notAccessible++;
    }

    totalScore += themeResult.summary.overallScore;

    // Track by type
    if (theme.type === 'dark') {
      results.summary.byType.dark.count++;
      darkScore += themeResult.summary.overallScore;
    } else if (theme.type === 'light') {
      results.summary.byType.light.count++;
      lightScore += themeResult.summary.overallScore;
    }

    // Track common issues
    for (const issue of themeResult.summary.criticalIssues) {
      const key = issue.split(':')[0].trim();
      results.summary.commonIssues[key] = (results.summary.commonIssues[key] || 0) + 1;
    }

    // Progress indicator
    const progress = results.themes.length;
    const percent = Math.round((progress / themeFiles.length) * 100);
    const status = themeResult.summary.isAccessible ? '✅' : '⚠️';
    process.stdout.write(`\r  ${status} ${progress}/${themeFiles.length} (${percent}%) - ${themeResult.themeName}`);
  }

  // Finalize summary
  results.summary.averageScore = Math.round(totalScore / results.themes.length);
  results.summary.byType.dark.avgScore = results.summary.byType.dark.count > 0
    ? Math.round(darkScore / results.summary.byType.dark.count) : 0;
  results.summary.byType.light.avgScore = results.summary.byType.light.count > 0
    ? Math.round(lightScore / results.summary.byType.light.count) : 0;

  console.log('\n');

  return results;
}

/**
 * Run fuzzing campaign on themes
 * @param {Object} options - Fuzzing options
 * @returns {Object} Fuzzing results
 */
function runFuzzingCampaign(options = {}) {
  const themeFiles = getThemeFiles();
  const sampleSize = options.sampleSize || 5;
  const iterationsPerTheme = options.iterations || 50;

  // Sample themes for fuzzing
  const sampledFiles = themeFiles
    .sort(() => Math.random() - 0.5)
    .slice(0, sampleSize);

  const results = {
    timestamp: new Date().toISOString(),
    options: { sampleSize, iterationsPerTheme },
    themes: [],
    summary: {
      totalTests: 0,
      totalPassed: 0,
      totalFailed: 0,
      totalCrashes: 0,
      crashingStrategies: new Set(),
      failingStrategies: {}
    }
  };

  const validator = new AccessibilityValidator();
  const invariantChecker = new InvariantChecker();

  // Combined validator for fuzzing
  const combinedValidator = (theme) => {
    const errors = [];

    try {
      const accessResult = validator.validate(theme);
      if (!accessResult.summary.isAccessible) {
        errors.push(...accessResult.summary.issues.slice(0, 3));
      }
    } catch (e) {
      errors.push(`Accessibility validation error: ${e.message}`);
    }

    try {
      const invariantResult = invariantChecker.check(theme);
      if (!invariantResult.summary.isValid) {
        errors.push(...invariantResult.summary.criticalIssues.slice(0, 3));
      }
    } catch (e) {
      errors.push(`Invariant check error: ${e.message}`);
    }

    return { valid: errors.length === 0, errors };
  };

  console.log(`\n🧪 Running fuzzing campaign on ${sampleSize} themes...\n`);

  for (const filePath of sampledFiles) {
    const theme = loadTheme(filePath);
    if (!theme) continue;

    console.log(`  Fuzzing: ${theme.name || path.basename(filePath)}`);

    const fuzzer = new ThemeFuzzer({
      seed: Date.now(),
      maxMutations: iterationsPerTheme
    });

    const campaignResult = fuzzer.runCampaign(theme, combinedValidator, {
      maxIterations: iterationsPerTheme
    });

    results.themes.push({
      file: path.basename(filePath),
      themeName: theme.name,
      ...campaignResult
    });

    // Update summary
    results.summary.totalTests += campaignResult.totalTests;
    results.summary.totalPassed += campaignResult.passed;
    results.summary.totalFailed += campaignResult.failed;
    results.summary.totalCrashes += campaignResult.crashes;

    // Track problematic strategies
    for (const failure of campaignResult.failures || []) {
      if (failure.strategy) {
        results.summary.failingStrategies[failure.strategy] =
          (results.summary.failingStrategies[failure.strategy] || 0) + 1;
      }
    }

    for (const crash of campaignResult.crashes || []) {
      if (crash.strategy) {
        results.summary.crashingStrategies.add(crash.strategy);
      }
    }
  }

  results.summary.crashingStrategies = Array.from(results.summary.crashingStrategies);

  console.log('\n');

  return results;
}

/**
 * Generate a human-readable report
 * @param {Object} auditResults - Results from runFullAudit
 * @returns {string} Formatted report
 */
function generateReport(auditResults) {
  const lines = [];

  lines.push('═'.repeat(60));
  lines.push('  XELA THEMES ACCESSIBILITY AUDIT REPORT');
  lines.push('═'.repeat(60));
  lines.push('');
  lines.push(`Generated: ${auditResults.timestamp}`);
  lines.push(`Total Themes: ${auditResults.totalThemes}`);
  lines.push('');

  // Summary
  lines.push('📊 SUMMARY');
  lines.push('─'.repeat(40));
  lines.push(`  Accessible Themes: ${auditResults.summary.accessible}/${auditResults.totalThemes} (${Math.round(auditResults.summary.accessible/auditResults.totalThemes*100)}%)`);
  lines.push(`  Average Score: ${auditResults.summary.averageScore}/100`);
  lines.push(`  Dark Themes: ${auditResults.summary.byType.dark.count} (avg: ${auditResults.summary.byType.dark.avgScore})`);
  lines.push(`  Light Themes: ${auditResults.summary.byType.light.count} (avg: ${auditResults.summary.byType.light.avgScore})`);
  lines.push('');

  // Common Issues
  if (Object.keys(auditResults.summary.commonIssues).length > 0) {
    lines.push('⚠️  COMMON ISSUES');
    lines.push('─'.repeat(40));
    const sortedIssues = Object.entries(auditResults.summary.commonIssues)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    for (const [issue, count] of sortedIssues) {
      lines.push(`  • ${issue}: ${count} themes`);
    }
    lines.push('');
  }

  // Top Issues (worst themes)
  const worstThemes = auditResults.themes
    .filter(t => !t.summary.isAccessible)
    .sort((a, b) => a.summary.overallScore - b.summary.overallScore)
    .slice(0, 10);

  if (worstThemes.length > 0) {
    lines.push('🔴 THEMES NEEDING ATTENTION');
    lines.push('─'.repeat(40));
    for (const theme of worstThemes) {
      lines.push(`  ${theme.themeName} (Score: ${theme.summary.overallScore})`);
      lines.push(`    File: ${theme.file}`);
      if (theme.summary.criticalIssues.length > 0) {
        lines.push(`    Issues: ${theme.summary.criticalIssues[0]}`);
      }
    }
    lines.push('');
  }

  // Best themes
  const bestThemes = auditResults.themes
    .filter(t => t.summary.isAccessible)
    .sort((a, b) => b.summary.overallScore - a.summary.overallScore)
    .slice(0, 5);

  if (bestThemes.length > 0) {
    lines.push('🟢 TOP ACCESSIBLE THEMES');
    lines.push('─'.repeat(40));
    for (const theme of bestThemes) {
      lines.push(`  ✓ ${theme.themeName} (Score: ${theme.summary.overallScore})`);
    }
    lines.push('');
  }

  lines.push('═'.repeat(60));

  return lines.join('\n');
}

/**
 * Save audit results to files
 * @param {Object} results - Audit results
 * @param {string} outputDir - Output directory
 */
function saveResults(results, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save full JSON results
  const jsonPath = path.join(outputDir, 'accessibility-audit.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`📄 Full results saved to: ${jsonPath}`);

  // Save human-readable report
  const reportPath = path.join(outputDir, 'accessibility-report.txt');
  fs.writeFileSync(reportPath, generateReport(results));
  console.log(`📄 Report saved to: ${reportPath}`);

  // Save themes needing fixes
  const fixesNeeded = results.themes
    .filter(t => !t.summary.isAccessible)
    .map(t => ({
      file: t.file,
      name: t.themeName,
      score: t.summary.overallScore,
      issues: t.summary.criticalIssues,
      recommendations: t.summary.recommendations
    }));

  const fixesPath = path.join(outputDir, 'themes-needing-fixes.json');
  fs.writeFileSync(fixesPath, JSON.stringify(fixesNeeded, null, 2));
  console.log(`📄 Fixes needed saved to: ${fixesPath}`);
}

module.exports = {
  loadTheme,
  getThemeFiles,
  auditTheme,
  runFullAudit,
  runFuzzingCampaign,
  generateReport,
  saveResults
};
