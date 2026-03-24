#!/usr/bin/env node

/**
 * Automatic Theme Fixer
 * Adds missing common properties to all themes
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'themes');

// Common missing properties that can be auto-fixed
const AUTO_FIXES = {
  // Critical for Copilot chat text visibility
  'editorWidget.foreground': (theme) => {
    return theme.colors['editor.foreground'] || '#FFFFFF';
  },

  // Editor group border
  'editorGroup.border': (theme) => {
    return theme.colors['panel.border'] ||
           theme.colors['sideBar.border'] ||
           theme.colors['tab.border'] ||
           '#00000030';
  },

  // List selection colors
  'list.inactiveSelectionForeground': (theme) => {
    return theme.colors['list.activeSelectionForeground'] ||
           theme.colors['editor.foreground'] ||
           '#FFFFFF';
  },

  'list.focusForeground': (theme) => {
    return theme.colors['list.activeSelectionForeground'] ||
           theme.colors['editor.foreground'] ||
           '#FFFFFF';
  },

  // Secondary button colors
  'button.secondaryBackground': (theme) => {
    const bg = theme.colors['editor.background'] || '#000000';
    const border = theme.colors['button.background'];
    // Use a muted version or border color
    return theme.colors['input.background'] ||
           theme.colors['dropdown.background'] ||
           lightenDarken(bg, 20);
  },

  'button.secondaryForeground': (theme) => {
    return theme.colors['editor.foreground'] || '#FFFFFF';
  },

  // Notification center
  'notificationCenter.border': (theme) => {
    return theme.colors['notifications.border'] ||
           theme.colors['panel.border'] ||
           '#00000030';
  },

  'notificationCenterHeader.background': (theme) => {
    return theme.colors['panel.background'] ||
           theme.colors['sideBar.background'] ||
           '#000000';
  },

  'notifications.foreground': (theme) => {
    return theme.colors['editor.foreground'] || '#FFFFFF';
  },

  // Notification icons
  'notificationsErrorIcon.foreground': (theme) => {
    return theme.colors['editorError.foreground'] ||
           theme.colors['list.errorForeground'] ||
           '#FF0000';
  },

  'notificationsWarningIcon.foreground': (theme) => {
    return theme.colors['editorWarning.foreground'] ||
           theme.colors['list.warningForeground'] ||
           '#FFA500';
  },

  'notificationsInfoIcon.foreground': (theme) => {
    return theme.colors['editorInfo.foreground'] ||
           theme.colors['list.highlightForeground'] ||
           '#00AAFF';
  },

  // Sidebar
  'sideBarSectionHeader.foreground': (theme) => {
    return theme.colors['sideBar.foreground'] || theme.colors['editor.foreground'] || '#FFFFFF';
  },

  // Problems
  'problemsErrorIcon.foreground': (theme) => {
    return theme.colors['editorError.foreground'] || '#FF0000';
  },
  'problemsWarningIcon.foreground': (theme) => {
    return theme.colors['editorWarning.foreground'] || '#FFA500';
  },
  'problemsInfoIcon.foreground': (theme) => {
    return theme.colors['editorInfo.foreground'] || '#00AAFF';
  },

  // Testing
  'testing.iconFailed': (theme) => {
    return theme.colors['editorError.foreground'] || '#FF0000';
  },
  'testing.iconPassed': (theme) => {
    return '#00FF00'; // Default green
  },

  // Peek View
  'peekViewResult.background': (theme) => {
    return theme.colors['editor.background'] || '#1E1E1E';
  },
  'peekViewEditor.background': (theme) => {
    return theme.colors['editor.background'] || '#1E1E1E';
  },
  'peekView.border': (theme) => {
    return theme.colors['focusBorder'] || '#007ACC';
  },

  // Quick Input
  'quickInput.background': (theme) => {
    return theme.colors['editorWidget.background'] || theme.colors['sideBar.background'] || '#252526';
  },
  'quickInput.foreground': (theme) => {
    return theme.colors['editorWidget.foreground'] || theme.colors['editor.foreground'] || '#CCCCCC';
  },
  
  // Editor Indent Guides
  'editorIndentGuide.background1': (theme) => {
    return theme.colors['editorIndentGuide.background'] || '#404040';
  },
  'editorIndentGuide.activeBackground1': (theme) => {
    return theme.colors['editorIndentGuide.activeBackground'] || '#707070';
  },
  
  // Git
  'gitDecoration.addedResourceForeground': (theme) => {
    return '#81b88b'; // Default green-ish
  },
  
  // Selection
  'selection.background': (theme) => {
    return theme.colors['editor.selectionBackground'] || '#264f78';
  },
  
  // Focus Border
  'focusBorder': (theme) => {
    return theme.colors['activityBar.activeBorder'] || '#007fd4';
  },
};

const CONTRAST_PAIRS = [
  ['titleBar.activeBackground', 'titleBar.activeForeground'],
  ['activityBar.background', 'activityBar.foreground'],
  ['sideBar.background', 'sideBar.foreground'],
  ['sideBarSectionHeader.background', 'sideBarSectionHeader.foreground'],
  ['statusBar.background', 'statusBar.foreground'],
  ['statusBar.debuggingBackground', 'statusBar.debuggingForeground'],
  ['panel.background', 'panelTitle.activeForeground'],
  ['tab.activeBackground', 'tab.activeForeground'],
  ['tab.inactiveBackground', 'tab.inactiveForeground'],
  ['editor.background', 'editor.foreground'],
  ['editor.background', 'editorLineNumber.activeForeground'],
  ['editorWidget.background', 'editorWidget.foreground'],
  ['editorHoverWidget.background', 'editorWidget.foreground'],
  ['list.activeSelectionBackground', 'list.activeSelectionForeground'],
  ['list.inactiveSelectionBackground', 'list.inactiveSelectionForeground'],
  ['button.background', 'button.foreground'],
  ['button.secondaryBackground', 'button.secondaryForeground'],
  ['input.background', 'input.foreground'],
  ['badge.background', 'badge.foreground'],
  ['activityBarBadge.background', 'activityBarBadge.foreground'],
  ['terminal.background', 'terminal.foreground'],
  ['notifications.background', 'notifications.foreground'],
  ['notificationCenterHeader.background', 'notificationCenterHeader.foreground'],
  ['menu.background', 'menu.foreground'],
  ['menu.selectionBackground', 'menu.selectionForeground'],
  ['quickInput.background', 'quickInput.foreground']
];

function hexToRgb(hex) {
  const clean = hex.replace(/^#/, '').substring(0, 6);
  if (clean.length !== 6) return null;
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16)
  };
}

function getLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(fg, bg) {
  const lighter = Math.max(getLuminance(fg), getLuminance(bg));
  const darker = Math.min(getLuminance(fg), getLuminance(bg));
  return (lighter + 0.05) / (darker + 0.05);
}

function enforceContrast(fg, bg, minContrast = 4.5) {
  if (!fg || !bg || fg.length > 7 || bg.length > 7) return fg;
  if (getContrastRatio(fg, bg) >= minContrast) return fg;

  const blackRatio = getContrastRatio('#000000', bg);
  const whiteRatio = getContrastRatio('#FFFFFF', bg);
  const target = blackRatio >= whiteRatio ? '#000000' : '#FFFFFF';
  const targetRgb = hexToRgb(target);
  const start = hexToRgb(fg) || { r: 255, g: 255, b: 255 };

  if (Math.max(blackRatio, whiteRatio) >= minContrast) {
    return target;
  }

  for (let step = 1; step <= 20; step++) {
    const mixRatio = step / 20;
    const adjusted = '#' + [start.r, start.g, start.b].map((value, index) => {
      const targetValue = [targetRgb.r, targetRgb.g, targetRgb.b][index];
      return Math.round(value + (targetValue - value) * mixRatio).toString(16).padStart(2, '0');
    }).join('').toUpperCase();

    if (getContrastRatio(adjusted, bg) >= minContrast) {
      return adjusted;
    }
  }

  return target;
}

function lightenDarken(color, amount) {
  // Simple lighten/darken function
  if (!color || color === 'transparent') return '#00000030';

  let hex = color.replace('#', '');
  if (hex.length === 8) hex = hex.slice(0, 6); // Remove alpha
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }

  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);

  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));

  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function fixTheme(themePath) {
  const content = fs.readFileSync(themePath, 'utf8');
  let theme;

  try {
    // Parse JSONC (JSON with comments)
    // Use a regex that respects strings to avoid stripping // inside strings (like URLs)
    const stripped = content.replace(/("(\\.|[^\\"])*")|(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)/g, (match, str) => {
      if (str) return str; // It's a string, keep it
      return ''; // It's a comment, remove it
    });
    theme = JSON.parse(stripped);
  } catch (e) {
    console.error(`❌ Failed to parse ${path.basename(themePath)}: ${e.message}`);
    return { fixed: false, error: e.message };
  }

  if (!theme.colors) {
    console.error(`❌ No colors section in ${path.basename(themePath)}`);
    return { fixed: false, error: 'No colors section' };
  }

  let addedCount = 0;
  const added = [];
  let contrastAdjustedCount = 0;
  const contrastAdjusted = [];

  // Check and add missing properties
  for (const [prop, generator] of Object.entries(AUTO_FIXES)) {
    if (!theme.colors[prop]) {
      const value = generator(theme);
      if (value) {
        theme.colors[prop] = value;
        added.push(prop);
        addedCount++;
      }
    }
  }

  for (const [bgKey, fgKey] of CONTRAST_PAIRS) {
    const bg = theme.colors[bgKey];
    const fg = theme.colors[fgKey];
    if (!bg || !fg) continue;

    const adjusted = enforceContrast(fg, bg, 4.5);
    if (adjusted !== fg) {
      theme.colors[fgKey] = adjusted;
      contrastAdjusted.push(fgKey);
      contrastAdjustedCount++;
    }
  }

  if (addedCount === 0 && contrastAdjustedCount === 0) {
    return { fixed: false, added: [], contrastAdjusted: [] };
  }

  // Write back with proper formatting (preserve original structure)
  // Find the colors section and insert new properties
  let lines = content.split('\n');
  let colorsStart = -1;
  let colorsEnd = -1;
  let indent = '    ';
  let braceCount = 0;
  let insideColors = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (!insideColors) {
      if (line.includes('"colors"') && line.includes('{')) {
        colorsStart = i;
        insideColors = true;
        braceCount = 1;
        
        // Check if it closes on the same line
        const openIndex = line.indexOf('{');
        const afterOpen = line.substring(openIndex + 1);
        const openBraces = (afterOpen.match(/\{/g) || []).length;
        const closeBraces = (afterOpen.match(/\}/g) || []).length;
        braceCount += openBraces - closeBraces;
        
        if (braceCount === 0) {
             colorsEnd = i;
             break;
        }
      }
    } else {
      // We are inside colors
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      braceCount += openBraces - closeBraces;
      
      if (braceCount === 0) {
        colorsEnd = i;
        break;
      }
      
      // Try to detect indent from a property line
      if (indent === '    ' && line.trim().startsWith('"') && line.includes(':')) {
         indent = line.substring(0, line.indexOf('"'));
      }
    }
  }

  if (colorsStart === -1 || colorsEnd === -1) {
    console.error(`❌ Could not find colors section bounds in ${path.basename(themePath)}`);
    return { fixed: false, error: 'Could not parse colors section' };
  }

  // Check if colorsEnd line has content before '}'
  const endLine = lines[colorsEnd];
  const lastBraceIndex = endLine.lastIndexOf('}');
  const contentBeforeBrace = endLine.substring(0, lastBraceIndex).trim();
  
  if (contentBeforeBrace.length > 0 && !contentBeforeBrace.endsWith('{')) {
      // It's like "...prop": "val"}" or "...prop": "val"},"
      // We need to split this line.
      const before = endLine.substring(0, lastBraceIndex);
      const after = endLine.substring(lastBraceIndex);
      
      // Add comma to the property if missing
      let newBefore = before;
      if (!newBefore.trim().endsWith(',')) {
          newBefore += ',';
      }
      
      lines[colorsEnd] = newBefore; 
      
      // Deduce indentation for the closing brace from colorsStart
      const startIndent = lines[colorsStart].substring(0, lines[colorsStart].indexOf('"'));
      lines.splice(colorsEnd + 1, 0, startIndent + after);
      
      colorsEnd++; // The closing brace is now on the next line
  }

  // Check if the line before colorsEnd needs a comma
  let prevLineIdx = colorsEnd - 1;
  while (prevLineIdx > colorsStart && lines[prevLineIdx].trim() === '') {
    prevLineIdx--;
  }
  
  if (prevLineIdx > colorsStart) {
    const prevLine = lines[prevLineIdx];
    // If it's a property and doesn't end with comma, add it
    if (prevLine.trim().match(/"[^"]+"\s*:\s*"[^"]+"$/)) {
       lines[prevLineIdx] = prevLine + ',';
    }
  }

  // Insert new properties before the closing brace
  const newProps = added.map((prop, index) => {
    const value = theme.colors[prop];
    // No trailing comma on the very last item to satisfy strict JSON parsers
    const isLast = index === added.length - 1;
    const comma = isLast ? '' : ',';
    return `${indent}"${prop}": "${value}"${comma}`;
  });

  if (newProps.length > 0) {
    lines.splice(colorsEnd, 0, ...newProps);
    fs.writeFileSync(themePath, lines.join('\n'), 'utf8');
  } else {
    fs.writeFileSync(themePath, `${JSON.stringify(theme, null, 2)}\n`, 'utf8');
  }

  return { fixed: true, added, contrastAdjusted, count: addedCount, contrastCount: contrastAdjustedCount };
}

function main() {
  console.log('🔧 Auto-fixing common theme issues...\n');

  const themeFiles = fs.readdirSync(THEMES_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => path.join(THEMES_DIR, f));

  console.log(`Found ${themeFiles.length} theme files\n`);

  let fixedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  const results = [];

  for (const themePath of themeFiles) {
    const name = path.basename(themePath);
    const result = fixTheme(themePath);

    if (result.fixed) {
      const parts = [];
      if (result.count > 0) parts.push(`added ${result.count} properties`);
      if (result.contrastCount > 0) parts.push(`normalized ${result.contrastCount} contrast pairs`);
      console.log(`✅ ${name} - ${parts.join(', ')}`);
      fixedCount++;
      results.push({ name, ...result });
    } else if (result.error) {
      console.log(`❌ ${name} - ${result.error}`);
      errorCount++;
    } else {
      skippedCount++;
    }
  }

  console.log('\n' + '─'.repeat(80));
  console.log('\n📊 Summary:\n');
  console.log(`✅ Fixed: ${fixedCount}`);
  console.log(`⏭️  Skipped (no changes needed): ${skippedCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📈 Total: ${themeFiles.length}`);

  if (fixedCount > 0) {
    console.log('\n📝 Most commonly added properties:');
    const propCounts = {};
    results.forEach(r => {
      r.added.forEach(prop => {
        propCounts[prop] = (propCounts[prop] || 0) + 1;
      });
    });

    Object.entries(propCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([prop, count]) => {
        console.log(`   ${prop}: ${count} themes`);
      });
  }

  const contrastCounts = {};
  results.forEach(r => {
    (r.contrastAdjusted || []).forEach(prop => {
      contrastCounts[prop] = (contrastCounts[prop] || 0) + 1;
    });
  });

  if (Object.keys(contrastCounts).length > 0) {
    console.log('\n📝 Most commonly normalized contrast properties:');
    Object.entries(contrastCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([prop, count]) => {
        console.log(`   ${prop}: ${count} themes`);
      });
  }

  console.log('\n✨ Auto-fix complete!\n');

  if (fixedCount > 0) {
    console.log('💡 Run "npm run test:completeness" to verify fixes\n');
  }
}

main();
