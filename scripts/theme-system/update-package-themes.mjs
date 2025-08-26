#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the current package.json
const packageJsonPath = path.resolve(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get all theme files
const themesDir = path.resolve(__dirname, '../../themes');
const themeFiles = fs.readdirSync(themesDir)
  .filter(file => file.endsWith('-color-theme.json'))
  .sort();

console.log(`Found ${themeFiles.length} theme files`);

// Generate theme entries for package.json
const themeEntries = themeFiles.map(file => {
  const themePath = `./themes/${file}`;

  // Read the theme file to get the display name
  const themeFilePath = path.join(themesDir, file);
  const themeContent = JSON.parse(fs.readFileSync(themeFilePath, 'utf8'));
  const label = themeContent.name || file.replace('-color-theme.json', '');
  const uiTheme = themeContent.type === 'light' ? 'vs' : 'vs-dark';

  return {
    label,
    uiTheme,
    path: themePath
  };
});

// Update package.json
packageJson.contributes.themes = themeEntries;

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log(`Updated package.json with ${themeEntries.length} themes`);
console.log('Theme list updated successfully!');
