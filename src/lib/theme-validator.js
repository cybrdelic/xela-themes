/**
 * XELA Theme Validation
 *
 * Validates color palettes for WCAG accessibility compliance.
 * Checks contrast ratios, color differentiation, and overall accessibility.
 *
 * @module lib/theme-validator
 */

import { getContrastRatio } from './color-utils.js';

/**
 * @typedef {Object} ValidationScores
 * @property {number} mainText - Main text contrast ratio
 * @property {number} mutedText - Muted text contrast ratio
 * @property {number} subtleText - Subtle text contrast ratio
 * @property {number} [accent] - Accent color contrast ratio
 * @property {number} [border] - Border contrast ratio
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Whether the palette passes all checks
 * @property {string[]} issues - Array of issue descriptions
 * @property {ValidationScores} scores - Contrast scores for each element
 * @property {Object} summary - Summary of issues by severity
 */

/**
 * Validate that a palette meets all accessibility requirements
 * Comprehensive validation covering all contrast scenarios
 * @param {Object} palette - Theme palette to validate
 * @returns {ValidationResult} Validation results
 */
export function validatePalette(palette) {
  const { colors, syntax, terminal, type } = palette;
  const issues = [];
  const scores = {};

  // ===== MAIN TEXT CONTRAST (AAA - 7:1) =====
  scores.mainText = getContrastRatio(colors.fg, colors.bg);
  if (scores.mainText < 7) {
    issues.push(`Main text contrast too low: ${scores.mainText.toFixed(2)}:1 (need 7:1)`);
  }

  // ===== MUTED TEXT CONTRAST (AA - 4.5:1) =====
  scores.mutedText = getContrastRatio(colors.fgMuted, colors.bg);
  if (scores.mutedText < 4.5) {
    issues.push(`Muted text contrast too low: ${scores.mutedText.toFixed(2)}:1 (need 4.5:1)`);
  }

  // ===== SUBTLE TEXT CONTRAST (UI - 3:1) =====
  scores.subtleText = getContrastRatio(colors.fgSubtle, colors.bg);
  if (scores.subtleText < 3) {
    issues.push(`Subtle text contrast too low: ${scores.subtleText.toFixed(2)}:1 (need 3:1)`);
  }

  // ===== UI ELEMENT CONTRAST (3:1 minimum) =====
  const uiElements = ['accent', 'accentAlt', 'error', 'warning', 'success', 'info'];
  for (const element of uiElements) {
    if (!colors[element]) continue;
    const contrast = getContrastRatio(colors[element], colors.bg);
    scores[element] = contrast;
    if (contrast < 3) {
      issues.push(`${element} contrast too low: ${contrast.toFixed(2)}:1 (need 3:1)`);
    }
  }

  // ===== BORDER VISIBILITY (2:1 minimum) =====
  scores.border = getContrastRatio(colors.border, colors.bg);
  if (scores.border < 2) {
    issues.push(`Border contrast too low: ${scores.border.toFixed(2)}:1 (need 2:1)`);
  }

  // ===== SYNTAX HIGHLIGHTING (AA - 4.5:1 for important tokens) =====
  const criticalSyntax = ['keyword', 'function', 'string', 'number', 'type', 'constant', 'storage'];
  for (const name of criticalSyntax) {
    if (!syntax[name]) continue;
    const contrast = getContrastRatio(syntax[name], colors.bg);
    scores[`syntax_${name}`] = contrast;
    if (contrast < 4.5) {
      issues.push(`Syntax ${name} contrast too low: ${contrast.toFixed(2)}:1 (need 4.5:1)`);
    }
  }

  // Variable is typically the main text color, just verify it's readable
  if (syntax.variable) {
    const varContrast = getContrastRatio(syntax.variable, colors.bg);
    scores.syntax_variable = varContrast;
    if (varContrast < 4.5) {
      issues.push(`Syntax variable contrast too low: ${varContrast.toFixed(2)}:1 (need 4.5:1)`);
    }
  }

  // Comments can be lower contrast but should still be readable
  if (syntax.comment) {
    const commentContrast = getContrastRatio(syntax.comment, colors.bg);
    scores.syntax_comment = commentContrast;
    if (commentContrast < 3) {
      issues.push(`Syntax comment contrast too low: ${commentContrast.toFixed(2)}:1 (need 3:1)`);
    }
  }

  // Punctuation can be subtle but readable
  if (syntax.punctuation) {
    const punctContrast = getContrastRatio(syntax.punctuation, colors.bg);
    scores.syntax_punctuation = punctContrast;
    if (punctContrast < 3) {
      issues.push(`Syntax punctuation contrast too low: ${punctContrast.toFixed(2)}:1 (need 3:1)`);
    }
  }

  // ===== TERMINAL COLORS (3:1 minimum against terminal background) =====
  const termBg = terminal.black || colors.bg;
  const termColors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
  for (const color of termColors) {
    if (!terminal[color]) continue;
    const contrast = getContrastRatio(terminal[color], termBg);
    scores[`terminal_${color}`] = contrast;
    if (contrast < 3) {
      issues.push(`Terminal ${color} contrast too low: ${contrast.toFixed(2)}:1 (need 3:1)`);
    }
  }

  // ===== CONTRAST BETWEEN ACCENT COLORS (differentiation) =====
  if (colors.accent && colors.accentAlt) {
    const accentDiff = getContrastRatio(colors.accent, colors.accentAlt);
    scores.accentDifferentiation = accentDiff;
    // Accents should be visually distinct from each other
    if (accentDiff < 1.5) {
      issues.push(`Accent colors too similar: ${accentDiff.toFixed(2)}:1 (need 1.5:1 differentiation)`);
    }
  }

  // ===== SEMANTIC COLOR DIFFERENTIATION =====
  const semanticColors = [colors.error, colors.warning, colors.success, colors.info].filter(Boolean);
  for (let i = 0; i < semanticColors.length; i++) {
    for (let j = i + 1; j < semanticColors.length; j++) {
      const diff = getContrastRatio(semanticColors[i], semanticColors[j]);
      if (diff < 1.3) {
        issues.push(`Semantic colors ${i} and ${j} too similar: ${diff.toFixed(2)}:1`);
      }
    }
  }

  // ===== ELEVATED BACKGROUND CONTRAST =====
  if (colors.bgElevated) {
    const elevatedContrast = getContrastRatio(colors.bgElevated, colors.bg);
    scores.bgElevation = elevatedContrast;
    // Elevated surfaces should be slightly distinct
    if (elevatedContrast < 1.05) {
      issues.push(`Elevated background not distinct enough from main bg`);
    }
  }

  // ===== ALT BACKGROUND CONTRAST =====
  if (colors.bgAlt) {
    const altContrast = getContrastRatio(colors.bgAlt, colors.bg);
    scores.bgAlt = altContrast;
    // Alt bg should be distinct but not too different
    if (altContrast < 1.02 || altContrast > 1.5) {
      // Not an issue, just a note - alt bg should be subtle
    }
  }

  // ===== TEXT ON ELEVATED SURFACES =====
  if (colors.bgElevated) {
    const fgOnElevated = getContrastRatio(colors.fg, colors.bgElevated);
    scores.fgOnElevated = fgOnElevated;
    if (fgOnElevated < 7) {
      issues.push(`Main text on elevated bg too low: ${fgOnElevated.toFixed(2)}:1 (need 7:1)`);
    }
  }

  // ===== LINK COLOR DISTINCTIVENESS =====
  if (syntax.link && colors.fg) {
    const linkVsFg = getContrastRatio(syntax.link, colors.fg);
    scores.linkDistinct = linkVsFg;
    // Links should be visually distinct from regular text
    if (linkVsFg < 1.2 && syntax.link === colors.fg) {
      issues.push(`Link color should be distinct from regular text`);
    }
  }

  return {
    valid: issues.length === 0,
    issues,
    scores,
    summary: {
      criticalIssues: issues.filter(i => i.includes('Main text') || i.includes('7:1')).length,
      majorIssues: issues.filter(i => i.includes('4.5:1')).length,
      minorIssues: issues.filter(i => i.includes('3:1') || i.includes('2:1')).length,
    }
  };
}

/**
 * Quick check if a color pair meets a specific contrast level
 * @param {string} foreground - Foreground color
 * @param {string} background - Background color
 * @param {'AAA'|'AA'|'UI'} level - Accessibility level to check
 * @returns {boolean}
 */
export function checkContrast(foreground, background, level = 'AA') {
  const ratio = getContrastRatio(foreground, background);
  switch (level) {
    case 'AAA': return ratio >= 7;
    case 'AA': return ratio >= 4.5;
    case 'UI': return ratio >= 3;
    default: return ratio >= 4.5;
  }
}

/**
 * Get a detailed accessibility report for a palette
 * @param {Object} palette - Theme palette
 * @returns {Object} Detailed accessibility report
 */
export function getAccessibilityReport(palette) {
  const validation = validatePalette(palette);

  return {
    ...validation,
    grade: validation.summary.criticalIssues === 0
      ? (validation.summary.majorIssues === 0 ? 'A' : 'B')
      : (validation.summary.minorIssues < 3 ? 'C' : 'D'),
    recommendations: generateRecommendations(validation),
  };
}

/**
 * Generate recommendations based on validation issues
 * @param {ValidationResult} validation - Validation result
 * @returns {string[]} Array of recommendations
 */
function generateRecommendations(validation) {
  const recommendations = [];

  if (validation.scores.mainText < 7) {
    recommendations.push('Increase main text contrast by using a lighter foreground on dark themes or darker on light themes');
  }

  if (validation.scores.mutedText < 4.5) {
    recommendations.push('Muted text should still be clearly readable - consider adjusting its lightness');
  }

  if (validation.issues.some(i => i.includes('Syntax'))) {
    recommendations.push('Some syntax colors have insufficient contrast - consider using more vibrant or adjusted colors');
  }

  if (validation.issues.some(i => i.includes('Terminal'))) {
    recommendations.push('Terminal colors should be adjusted to meet 3:1 contrast against the terminal background');
  }

  return recommendations;
}
