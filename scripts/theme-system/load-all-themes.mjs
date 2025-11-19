#!/usr/bin/env node
/**
 * Auto-Loader for Theme Configs
 * Dynamically imports all theme config files from the configs directory
 */

import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const configsDir = path.join(__dirname, 'configs');

/**
 * Load all theme configurations from individual files
 * @returns {Promise<Array>} Array of all theme configurations
 */
export async function loadAllThemes() {
  const themes = [];

  if (!fs.existsSync(configsDir)) {
    console.warn('⚠️  Configs directory does not exist:', configsDir);
    return themes;
  }

  const files = fs.readdirSync(configsDir)
    .filter(file => file.endsWith('.js'))
    .sort(); // Sort alphabetically for consistent ordering

  console.log(`📦 Loading ${files.length} theme config files...`);

  for (const file of files) {
    const filePath = path.join(configsDir, file);
    try {
      // Dynamic import using file:// URL
      const fileUrl = url.pathToFileURL(filePath).href;
      const module = await import(fileUrl);

      if (module.default) {
        themes.push(module.default);
      } else {
        console.warn(`⚠️  No default export in ${file}`);
      }
    } catch (error) {
      console.error(`❌ Error loading ${file}:`, error.message);
    }
  }

  console.log(`✅ Successfully loaded ${themes.length} themes`);
  return themes;
}

// If run directly, show loaded themes
if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  const themes = await loadAllThemes();
  console.log('\nLoaded themes:');
  themes.forEach(theme => {
    console.log(`  - ${theme.id}: ${theme.name}`);
  });
}
