# XELA Themes - Refactored Module Structure

This document describes the new modular structure created during the codebase cleanup.

## Directory Structure

```
src/
├── lib/                          # Shared utilities library
│   ├── index.js                  # Central exports (42 items)
│   ├── color-utils.js            # Color conversion & WCAG utilities
│   ├── theme-validator.js        # Palette accessibility validation
│   ├── palette-generator.js      # Accessible palette generation
│   ├── theme-builder.js          # VS Code theme JSON generation
│   └── palettes/                 # Retro palette collection (58 palettes)
│       ├── index.js              # Combined exports + utility functions
│       ├── vintage-computing.js  # C64, Apple II, ZX Spectrum, CGA, etc.
│       ├── classic-os.js         # Windows 3.1/95/XP, Mac OS, Ubuntu
│       ├── classic-ide.js        # Turbo Pascal, Monokai, Nord, etc.
│       ├── design-movement.js    # Art Deco, Bauhaus, Vaporwave, etc.
│       ├── retro-terminal.js     # Green/Amber Phosphor, VT220, etc.
│       ├── retro-games.js        # Game Boy, NES, SNES, etc.
│       ├── classic-app.js        # Winamp, ICQ, mIRC, etc.
│       └── brand.js              # Microsoft, Apple, IBM, etc.
│
└── theme-fuzzer/                 # Theme fuzzer system
    ├── fuzzer-extension-refactored.js  # Main VS Code integration
    ├── settings-manager.js       # VS Code settings manipulation
    ├── theme-generator.js        # Batch theme generation
    ├── file-operations.js        # Theme export & save operations
    └── fuzzer-refactored.js      # Core fuzzer using lib modules
```

## Key Modules

### `src/lib/color-utils.js`
Color manipulation and WCAG accessibility utilities:
- `hexToRgb`, `rgbToHex`, `hslToRgb`, `rgbToHsl`
- `hexToHsl`, `hslToHex`
- `getLuminance`, `getContrastRatio`
- `meetsContrastAA`, `meetsContrastAAA`, `meetsContrastUI`
- `generateAccessibleColor`, `adjustColorForContrast`
- `lighten`, `darken`, `saturate`, `desaturate`, `mix`
- `withAlpha`

### `src/lib/theme-validator.js`
Theme accessibility validation:
- `validatePalette(palette)` - Full WCAG validation
- `checkContrast(fg, bg, required)` - Contrast checking
- `getAccessibilityReport(palette)` - Detailed report

### `src/lib/palette-generator.js`
Accessible palette generation:
- `generateAccessiblePalette(type)` - Random accessible palette
- `generateValidPalette(type)` - Validated palette generation
- `generateRetroInspiredPalette(retroPalette)` - Retro-based generation
- `generateValidRetroPalette(retroPalette)` - Validated retro palette

### `src/lib/theme-builder.js`
VS Code theme JSON generation:
- `generateThemeJson(palette, type, name)` - Complete theme generation
- `buildSemanticTokenColors(tokens)` - Semantic token configuration
- `buildExtendedTokenColors(tokens)` - TextMate token configuration

### `src/lib/palettes/index.js`
Palette collection and utilities:
- `retroPalettes` - All 58 palettes combined
- `getPalettesByCategory(category)` - Filter by category
- `getDarkPalettes()` / `getLightPalettes()` - Filter by type
- `getRandomPalette(type?)` - Random selection
- `extractAccentColors(palette)` - Get accent-worthy colors
- `getCategories()` - List all categories
- `getPaletteById(id)` - Lookup by ID
- `searchPalettes(term)` - Search by name/category

## Usage Examples

### Import from Central Library
```javascript
import {
  hexToRgb,
  getContrastRatio,
  validatePalette,
  generateAccessiblePalette,
  generateThemeJson,
  retroPalettes,
  getRandomPalette
} from './src/lib/index.js';
```

### Import Specific Modules
```javascript
import { hexToRgb, getContrastRatio } from './src/lib/color-utils.js';
import { validatePalette } from './src/lib/theme-validator.js';
import { retroPalettes } from './src/lib/palettes/index.js';
```

### Import Specific Palette Categories
```javascript
import { vintageComputingPalettes } from './src/lib/palettes/vintage-computing.js';
import { classicIdePalettes } from './src/lib/palettes/classic-ide.js';
```

## Migration Guide

### From `fuzzer.js`
```javascript
// Old
import { hexToRgb, generateValidPalette } from './fuzzer.js';

// New
import { hexToRgb, generateValidPalette } from '../lib/index.js';
```

### From `retro-palettes.js`
```javascript
// Old
import retroPalettes, { getRandomPalette } from './retro-palettes.js';

// New
import { retroPalettes, getRandomPalette } from '../lib/palettes/index.js';
```

## Benefits of New Structure

1. **Smaller files** - Each module focuses on one concern
2. **Better imports** - Import only what you need
3. **Easier testing** - Isolated modules are easier to test
4. **Clear dependencies** - Explicit import chains
5. **Category organization** - Palettes grouped logically
6. **Central exports** - One import for common needs
7. **Backwards compatible** - Old files still work (with deprecation warnings)
