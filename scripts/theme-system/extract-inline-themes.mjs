#!/usr/bin/env node
/**
 * Extract inline themes from theme-config.js to individual files
 * These are the 13 themes defined directly in theme-config.js
 */

import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Read the theme-config.js file
const configPath = path.join(__dirname, 'theme-config.js');
const configContent = fs.readFileSync(configPath, 'utf8');

// Extract the array of inline themes (before the ...additionalThemes spread)
const themeArrayMatch = configContent.match(/export const themes = \[([\s\S]*?)\.\.\.(additionalThemes|finalThemes)/);

if (!themeArrayMatch) {
  console.error('Could not find inline themes in theme-config.js');
  process.exit(1);
}

const themeArrayContent = themeArrayMatch[1];

// Split by top-level object boundaries
const themeObjects = [];
let currentTheme = '';
let braceCount = 0;
let inTheme = false;

for (let i = 0; i < themeArrayContent.length; i++) {
  const char = themeArrayContent[i];

  if (char === '{' && !inTheme) {
    inTheme = true;
    braceCount = 1;
    currentTheme = '{';
  } else if (inTheme) {
    currentTheme += char;
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;

    if (braceCount === 0) {
      themeObjects.push(currentTheme);
      currentTheme = '';
      inTheme = false;
    }
  }
}

console.log(`Found ${themeObjects.length} inline themes`);

// For each theme object, extract ID and write to file
themeObjects.forEach((themeStr, index) => {
  // Extract theme ID
  const idMatch = themeStr.match(/id:\s*['"]([^'"]+)['"]/);
  if (!idMatch) {
    console.warn(`Could not extract ID from theme ${index + 1}`);
    return;
  }

  const themeId = idMatch[1];
  const nameMatch = themeStr.match(/name:\s*['"]([^'"]+)['"]/);
  const typeMatch = themeStr.match(/type:\s*['"]([^'"]+)['"]/);

  const themeName = nameMatch ? nameMatch[1] : 'Unknown';
  const themeType = typeMatch ? typeMatch[1] : 'dark';

  // Create the file content
  const content = `/**
 * Theme: ${themeName}
 * Type: ${themeType}
 * Originally inline in theme-config.js
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default ${themeStr};
`;

  const outputPath = path.join(__dirname, 'configs', `${themeId}.js`);
  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`✓ Created ${themeId}.js`);
});

console.log(`\n✅ Successfully extracted ${themeObjects.length} inline themes`);
