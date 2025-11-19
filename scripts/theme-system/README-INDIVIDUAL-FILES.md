# Theme Configuration - Individual Files

## Overview

The XELA themes project has been refactored so that **each theme is now stored in its own file**. This makes the codebase much more maintainable and prevents any single file from becoming too large.

## Structure

```
scripts/theme-system/
├── configs/                    # Individual theme config files
│   ├── xela-black.js
│   ├── xela-arctic.js
│   ├── xela-surgical.js
│   └── ... (131 total themes)
├── load-all-themes.mjs        # Auto-loader script
├── theme-config.mjs           # Main config (loads all themes)
├── build-themes.mjs           # Build script
└── split-themes.mjs           # Utility to split themes into files
```

## Adding a New Theme

### Option 1: Create a new file manually

1. Create a new file in `scripts/theme-system/configs/` named `xela-{theme-id}.js`

2. Use this template:

```javascript
/**
 * Theme: XELA My Theme — Description
 * Type: dark or light
 */

import { getHtmlColorScheme } from '../html-tokens.js';
import { withAlpha } from '../roles.js';

export default {
  id: 'xela-my-theme',
  name: 'XELA My Theme — Description',
  type: 'dark',
  roles: {
      "surface0": "#000000",
      "surface1": "#0A0A0A",
      // ... etc
  },
  colorOverrides: {
      "editor.background": "#000000",
      // ... etc
  },
  tokens: function(c) {
      return {
        comment: '#888888',
        keyword: '#FF00FF',
        // ... etc
      };
  },
  htmlScheme: getHtmlColorScheme('dark','dark')
};
```

3. Build themes: `node scripts/theme-system/build-themes.mjs`

### Option 2: Add to an existing collection (then split)

If you prefer to work with collections:

1. Add your theme to one of the collection files (e.g., `theme-config-premium.js`)
2. Run the split script: `node scripts/theme-system/split-themes.mjs`
3. This will extract your new theme into its own file in `configs/`

## How It Works

1. **Individual Files**: Each theme is stored in `scripts/theme-system/configs/{theme-id}.js`
2. **Auto-Loader**: `load-all-themes.mjs` dynamically imports all theme files from the `configs` directory
3. **Main Config**: `theme-config.mjs` exports the combined theme array
4. **Build Process**: `build-themes.mjs` uses the auto-loaded themes to generate the final theme JSON files

## Benefits

✅ **No more huge files** - The largest config files were 4,000+ lines
✅ **Easy to find themes** - Each theme is in its own clearly named file
✅ **Better git diffs** - Changes to one theme don't affect others
✅ **Easier collaboration** - Multiple people can work on different themes without conflicts
✅ **Simple to add themes** - Just create a new file

## Legacy Files

The old collection files (`theme-config-*.js`) are kept for reference but are no longer used by the build system. You can safely delete them if desired, or keep them as backups.

## Commands

```bash
# Build all themes
node scripts/theme-system/build-themes.mjs

# List all loaded themes
node scripts/theme-system/load-all-themes.mjs

# Split themes from collections into individual files
node scripts/theme-system/split-themes.mjs
```

## File Naming Convention

- File names should be: `xela-{theme-id}.js`
- Theme IDs should be kebab-case (lowercase with hyphens)
- Example: `xela-cyberpunk-2077.js` for theme ID `xela-cyberpunk-2077`
