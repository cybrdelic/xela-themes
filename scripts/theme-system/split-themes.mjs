#!/usr/bin/env node
/**
 * Split Theme Configs - One Theme Per File
 * Converts large config files into individual theme config files
 */

import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Import all the theme collections
import { artisanThemes } from './theme-config-artisan.js';
import { additionalThemes } from './theme-config-batch2.js';
import { dynamicThemes } from './theme-config-dynamic.js';
import { eliteThemes } from './theme-config-elite.js';
import { experimentalThemes } from './theme-config-experimental.js';
import { finalThemes } from './theme-config-final.js';
import { popCultureThemes } from './theme-config-popculture.js';
import { premiumThemes } from './theme-config-premium.js';
import { professionalThemes } from './theme-config-professional.js';
import { refinedThemes } from './theme-config-refined.js';
import { specializedThemes } from './theme-config-specialized.js';
import { ultimateThemes } from './theme-config-ultimate.js';

// Also need to extract inline themes from theme-config.js
// For now, we'll handle the imported collections

const collections = [
  { name: 'artisan', themes: artisanThemes },
  { name: 'batch2', themes: additionalThemes },
  { name: 'dynamic', themes: dynamicThemes },
  { name: 'elite', themes: eliteThemes },
  { name: 'experimental', themes: experimentalThemes },
  { name: 'final', themes: finalThemes },
  { name: 'popculture', themes: popCultureThemes },
  { name: 'premium', themes: premiumThemes },
  { name: 'professional', themes: professionalThemes },
  { name: 'refined', themes: refinedThemes },
  { name: 'specialized', themes: specializedThemes },
  { name: 'ultimate', themes: ultimateThemes }
];

const outputDir = path.join(__dirname, 'configs');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let totalThemes = 0;

// Process each collection
collections.forEach(({ name, themes }) => {
  themes.forEach(theme => {
    const themeId = theme.id;
    const fileName = `${themeId}.js`;
    const filePath = path.join(outputDir, fileName);

    // Build the theme object string manually to properly handle functions
    let tokensFunc = 'null';
    if (theme.tokens) {
      const funcStr = theme.tokens.toString();
      // Remove function name if present (e.g., "tokens(c)" -> "(c)")
      tokensFunc = funcStr.replace(/^tokens/, 'function');
    }
    const htmlSchemeValue = theme.htmlScheme ? JSON.stringify(theme.htmlScheme) : 'null';

    // Properly indent nested objects
    const rolesStr = JSON.stringify(theme.roles, null, 4).replace(/\n/g, '\n  ');
    const colorOverridesStr = JSON.stringify(theme.colorOverrides || {}, null, 4).replace(/\n/g, '\n  ');

    // Generate the file content
    const content = `/**
 * Theme: ${theme.name}
 * Type: ${theme.type}
 * Auto-generated from ${name} collection
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: '${theme.id}',
  name: '${theme.name}',
  type: '${theme.type}',
  roles: ${rolesStr},
  colorOverrides: ${colorOverridesStr},
  tokens: ${tokensFunc},
  htmlScheme: ${htmlSchemeValue}
};
`;    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Created ${fileName}`);
    totalThemes++;
  });
});

console.log(`\n✅ Successfully split ${totalThemes} themes into individual files`);
console.log(`📁 Output directory: ${outputDir}`);
