/**
 * Theme Configuration - Auto-loaded from individual files
 * This file now automatically loads all themes from the configs directory
 * Each theme is stored in its own file in scripts/theme-system/configs/
 */

import { loadAllThemes } from './load-all-themes.mjs';

// Load all themes dynamically
export const themes = await loadAllThemes();

console.log(`\n✅ Theme system loaded with ${themes.length} themes`);
