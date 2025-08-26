#!/usr/bin/env node
// Migration script to show differences between old manual themes and new generated ones
import fs from 'fs';
import path from 'path';

const themesDir = './themes';

function compareThemes() {
  const files = fs.readdirSync(themesDir).filter(f => f.endsWith('-color-theme.json'));

  files.forEach(file => {
    const filePath = path.join(themesDir, file);
    const theme = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (theme.xGenerated) {
      console.log(`✓ ${file} - Generated theme`);
    } else {
      console.log(`⚠ ${file} - Manual theme (consider migrating to generation system)`);
    }
  });
}

compareThemes();
