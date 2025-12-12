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

  if (addedCount === 0) {
    return { fixed: false, added: [] };
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

  // Insert before closing brace
  lines.splice(colorsEnd, 0, ...newProps);

  // Write back
  fs.writeFileSync(themePath, lines.join('\n'), 'utf8');

  return { fixed: true, added, count: addedCount };
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
      console.log(`✅ ${name} - Added ${result.count} properties`);
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

  console.log('\n✨ Auto-fix complete!\n');

  if (fixedCount > 0) {
    console.log('💡 Run "npm run test:completeness" to verify fixes\n');
  }
}

main();
