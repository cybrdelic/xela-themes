# XELA Themes

[![Version](https://img.shields.io/visual-studio-marketplace/v/cybrdelic.xela-themes?color=blue&label=VS%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=cybrdelic.xela-themes)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/cybrdelic.xela-themes)](https://marketplace.visualstudio.com/items?itemName=cybrdelic.xela-themes)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/cybrdelic.xela-themes)](https://marketplace.visualstudio.com/items?itemName=cybrdelic.xela-themes)
[![CI](https://github.com/cybrdelic/xela-themes/actions/workflows/publish.yml/badge.svg)](https://github.com/cybrdelic/xela-themes/actions/workflows/publish.yml)

🎨 **Professional-grade VS Code theme collection with 43 revolutionary designs and automated generation system.**

## What's included
- **43 extraordinary themes**: From classic XELA Dark/Black to cutting-edge Neural Network, Quantum Flux, Holographic Spectrum, and Cosmic Aurora
- **Advanced theme generation system**: Centralized palette, role-based color mapping, and comprehensive automation
- **Superior HTML/XML syntax highlighting**: Industry-leading token definitions for tags, attributes, entities, and embedded content
- **Automated testing and validation**: Ensures theme consistency, quality, and completeness
- **Professional packaging**: @vscode/vsce integration with robust install scripts
- **Optional CI workflow**: Streamlined publishing and distribution

## Dev workflow

### Modern Theme Generation (Recommended)
1) **Edit theme configuration**
   - Add themes to `scripts/theme-system/theme-config*.js` files
   - Use central color palette from `scripts/theme-system/palette.js`
   - Define roles and token mappings via the advanced archetype system

2) **Build and test themes**
   ```
   npm run build:test
   ```
   Generates all 43 theme JSONs and validates them.

3) **Update package.json**
   ```
   npm run update:package
   ```
   Automatically syncs all themes to package.json manifest.

4) **Test locally**
   ```
   npm run rebuild
   ```
   Builds themes + packages + installs the extension locally.

5) **Package for distribution**
   ```
   npm run package
   ```
   Themes are auto-built before packaging via the prepackage hook.

### Legacy Manual Editing (Deprecated)
- Direct JSON editing in `themes/` is no longer recommended
- Use the generation system for consistency and maintainability

## Theme System Architecture

- **`palette.js`**: Central color primitives and utilities
- **`roles.js`**: Role definitions and color manipulation helpers
- **`theme-config.js`**: Theme definitions with role mappings
- **`token-base.js`**: Base token templates for syntax highlighting
- **`html-tokens.js`**: Specialized HTML/XML token generation
- **`build-themes.mjs`**: Main build script that generates all theme JSONs
- **`test-build.mjs`**: Validation and testing for generated themes

## DX preset (optional per-project)
- Use the full preset at `presets/xela-black.settings.jsonc` (copy into your repo's `.vscode/settings.json`).
- Open this repo and VS Code will suggest recommended extensions from `.vscode/extensions.json`.

## Publish (optional)
1) (One-time) Create publisher if you don't have it yet:
```
vsce create-publisher cybrdelic
vsce login cybrdelic
```
2) Bump version in `package.json`.
3) Publish:
```
npx @vscode/vsce publish
```
4) Install from Marketplace (after publish):
```
code --install-extension cybrdelic.xela-themes
```

### CI Auto-Publish
Pushing a tag like `v0.1.2` triggers the workflow in `.github/workflows/publish.yml` to build and publish automatically (requires `VSCE_TOKEN` secret containing a Personal Access Token created via `vsce create-pat`). Manual dispatch still works via the Actions tab.
