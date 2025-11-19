// Theme Quality Auditor
// Finds themes with missing colors, poor contrast, or incomplete definitions

const fs = require('fs');
const path = require('path');

const THEME_DIR = path.join(__dirname, '..', 'themes');

// Critical UI elements that MUST be defined
const REQUIRED_COLORS = [
  'editor.background',
  'editor.foreground',
  'editorGroupHeader.tabsBackground',
  'tab.activeBackground',
  'tab.activeForeground',
  'tab.inactiveBackground',
  'tab.inactiveForeground',
  'statusBar.background',
  'statusBar.foreground',
  'activityBar.background',
  'activityBar.foreground',
  'sideBar.background',
  'sideBar.foreground',
  'titleBar.activeBackground',
  'titleBar.activeForeground'
];

// Calculate relative luminance for contrast checking
function getLuminance(hex) {
  if (!hex || typeof hex !== 'string') return 0;

  hex = hex.replace('#', '');
  if (hex.length === 8) hex = hex.substring(0, 6); // Remove alpha

  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const rsrgb = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsrgb = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsrgb = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * rsrgb + 0.7152 * gsrgb + 0.0722 * bsrgb;
}

// Calculate contrast ratio
function getContrastRatio(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Audit a single theme
function auditTheme(themePath) {
  const content = fs.readFileSync(themePath, 'utf8');
  let theme;

  try {
    theme = JSON.parse(content);
  } catch (e) {
    return { error: 'Invalid JSON', details: e.message };
  }

  const issues = [];
  const colors = theme.colors || {};
  const tokenColors = theme.tokenColors || [];

  // Check for missing required colors
  const missing = REQUIRED_COLORS.filter(key => !colors[key]);
  if (missing.length > 0) {
    issues.push({ type: 'missing_colors', count: missing.length, colors: missing });
  }

  // Check editor contrast
  if (colors['editor.background'] && colors['editor.foreground']) {
    const contrast = getContrastRatio(colors['editor.background'], colors['editor.foreground']);
    if (contrast < 4.5) {
      issues.push({
        type: 'poor_editor_contrast',
        contrast: contrast.toFixed(2),
        bg: colors['editor.background'],
        fg: colors['editor.foreground']
      });
    }
  }

  // Check statusbar contrast
  if (colors['statusBar.background'] && colors['statusBar.foreground']) {
    const contrast = getContrastRatio(colors['statusBar.background'], colors['statusBar.foreground']);
    if (contrast < 3.0) {
      issues.push({
        type: 'poor_statusbar_contrast',
        contrast: contrast.toFixed(2),
        bg: colors['statusBar.background'],
        fg: colors['statusBar.foreground']
      });
    }
  }

  // Check if tokenColors is sparse (less than 10 rules = incomplete)
  if (tokenColors.length < 10) {
    issues.push({ type: 'sparse_token_colors', count: tokenColors.length });
  }

  // Check for overly bright colors (neon issues)
  const brightColors = Object.entries(colors).filter(([key, val]) => {
    if (typeof val !== 'string') return false;
    const lum = getLuminance(val);
    return lum > 0.9; // Very bright
  });

  if (brightColors.length > 5) {
    issues.push({
      type: 'too_many_bright_colors',
      count: brightColors.length,
      examples: brightColors.slice(0, 3).map(([k, v]) => `${k}: ${v}`)
    });
  }

  return {
    name: theme.name,
    type: theme.type,
    issueCount: issues.length,
    issues
  };
}

// Main audit
function auditAllThemes() {
  const files = fs.readdirSync(THEME_DIR).filter(f => f.endsWith('.json'));
  const results = [];

  console.log(`\n=== AUDITING ${files.length} THEMES ===\n`);

  for (const file of files) {
    const themePath = path.join(THEME_DIR, file);
    const result = auditTheme(themePath);

    if (result.error || result.issueCount > 0) {
      results.push({ file, ...result });
    }
  }

  // Sort by issue count (worst first)
  results.sort((a, b) => b.issueCount - a.issueCount);

  // Print results
  console.log(`Found ${results.length} themes with issues:\n`);

  results.forEach((r, idx) => {
    console.log(`${idx + 1}. ${r.name || r.file}`);
    console.log(`   File: ${r.file}`);
    console.log(`   Issues: ${r.issueCount}`);
    r.issues.forEach(issue => {
      console.log(`   - ${issue.type}: ${JSON.stringify(issue).substring(0, 100)}`);
    });
    console.log('');
  });

  // Summary
  const byType = {};
  results.forEach(r => {
    r.issues.forEach(i => {
      byType[i.type] = (byType[i.type] || 0) + 1;
    });
  });

  console.log('=== ISSUE SUMMARY ===');
  Object.entries(byType).forEach(([type, count]) => {
    console.log(`${type}: ${count} themes`);
  });

  // Save to file
  const reportPath = path.join(__dirname, '..', 'theme-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nFull report saved to: theme-audit-report.json`);

  return results;
}

// Run audit
auditAllThemes();
