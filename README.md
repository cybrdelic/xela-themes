# XELA Themes Extension

[![Version](https://img.shields.io/visual-studio-marketplace/v/cybrdelic.xela-themes?color=blue&label=VS%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=cybrdelic.xela-themes)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/cybrdelic.xela-themes)](https://marketplace.visualstudio.com/items?itemName=cybrdelic.xela-themes)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/cybrdelic.xela-themes)](https://marketplace.visualstudio.com/items?itemName=cybrdelic.xela-themes)
[![CI](https://github.com/cybrdelic/xela-themes/actions/workflows/publish.yml/badge.svg)](https://github.com/cybrdelic/xela-themes/actions/workflows/publish.yml)

World-class theme boilerplate with fast local iteration and packaging.

## What’s included
- Themes: XELA Dark, XELA Black (pure-black UI surfaces).
- Packaging via @vscode/vsce and a robust install script.
- Optional CI workflow for publishing.

## Dev workflow

### 🚀 Quick Start (Recommended)
```bash
npm install
npm run dev:check    # Verify everything is set up correctly
npm run dev:help     # See full workflow guide
```
**Press F5** to launch Extension Development Host → Edit themes → **Developer: Reload Window** to see changes instantly!

### 📝 Detailed Steps

1) **Edit themes**
   - Add a new file under `themes/` (e.g. `xela-mytheme-color-theme.json`).
   - Validate keys against VS Code color schema; prefer transparent overlays where required.
   - Auto-save is enabled for fast iteration.

2) **Wire up contributes**
   - In `package.json` add an entry under `contributes.themes`:
     - label: Display name in the picker (e.g., "XELA MyTheme").
     - uiTheme: `vs-dark` | `vs-light` | `hc-black`.
     - path: `./themes/<file>.json`.

3) **Test instantly** ⚡
   - **Press F5** to launch Extension Development Host with clean, isolated environment.
   - In the host window, open Command Palette → **Preferences: Color Theme** → pick your theme.
   - Edit theme files → **Developer: Reload Window** in the test instance to see changes.
   - No packaging or installation needed during development!

4) **Available launch configs:**
   - `Run Extension` - Standard development with temp profile
   - `Run Extension (Clean Profile)` - Completely isolated test environment
   - `Debug Extension (Isolated)` - For debugging with clean state

### 🛠️ Development Scripts
```bash
npm run dev              # Shows quick start guide
npm run dev:help         # Shows detailed workflow
npm run dev:check        # Verifies development environment
npm run dev:clean        # Cleans test environment
npm run test:themes      # Guide for testing themes
```

### 📦 Package and Install (Final Testing)
```bash
npm run package-and-install
```
- Use this only for final testing or sharing with others.
- During development, use F5 workflow instead!

## DX preset (optional per-project)
- Use the full preset at `presets/xela-black.settings.jsonc` (copy into your repo’s `.vscode/settings.json`).
- Open this repo and VS Code will suggest recommended extensions from `.vscode/extensions.json`.

## Publish (optional)
1) (One-time) Create publisher if you don’t have it yet:
```
vsce create-publisher cybrdelic
vsce login cybrdelic
```
2) Bump version in `package.json` (already at 0.1.2 for publisher switch).
3) Publish:
```
npx @vscode/vsce publish
```
4) Install from Marketplace (after publish):
```
code --install-extension cybrdelic.xela-themes
```
Or install locally-built `.vsix` from `npm run package`.

### CI Auto-Publish
Pushing a tag like `v0.1.2` triggers the workflow in `.github/workflows/publish.yml` to build and publish automatically (requires `VSCE_TOKEN` secret containing a Personal Access Token created via `vsce create-pat`). Manual dispatch still works via the Actions tab.
