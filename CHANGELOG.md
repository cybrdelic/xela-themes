# Changelog

## 0.3.4
- Fix Windows Personalization: correct dark tooltip contrast, GrayText blends toward true black.
- Fix Windows Personalization: 1920x1080 wallpapers, [Sounds] section, correct dark tooltip.
- Fix Windows Terminal: use darken for bright ANSI on light themes, opaque selectionBackground, distinct brightCyan.
- Fix Windows Terminal: correct ANSI magenta/red collision, ansiBlack on light themes, remove alpha from bright variants, add selectionBackground.
- Fix browser extension: drop `world:MAIN` so `chrome.*` APIs are available in content script.
- Fix browser extension: bundle site adapters inline, remove module type from content script.
- Fix browser extension: add tabs permission, module type, web_accessible_resources, replaceState intercept.

## 0.3.0
- Add XELA browser extension v1 (Manifest V3): adoptedStyleSheets theme engine with per-site CSS token mapping.
- Add popup theme picker UI for the browser extension.
- Add content script with adoptedStyleSheets harness and SPA route-change support.
- Add background service worker for cross-tab theme broadcast.
- Add per-site CSS adapters (ChatGPT and more) with proper token mapping.
- Add build script that generates `themes.json` from theme index.
- Add Windows Terminal theme generation: ANSI/bright color mapping, presets, install/select scripts.
- Add Windows Personalization generation: wallpapers, accent colors, [Sounds], install/select scripts.
- Add new themes: Jarvis Command, Portfolio Grid, Resonance Studio, Runtime Forge, Shadernetic Flux, Signal Watch.
- Add custom themes: XELA Lakers, XELA Light, XELA Robot.
- Add accessibility scripts: auto-fix-contrast and fuzzer.
- Add `bin/xela-themes.mjs` CLI entry point.
- Add `src/logging.js` and theme-editor panel.
- Add Blender promo scripts and web preview server.
- Add `.github/workflows/ci.yml`, `.eslintrc.json`, `.prettierrc`, CONTRIBUTING.md, REVIEWER_CHECKLIST.md.
- Refactor theme-builder, palette-generator, and fuzzer for extension compatibility.
- Update .gitignore to exclude generated outputs and tool caches.

## 0.2.0
- Add landing page with WebGL renderer and optimized isometric theme showcase.
- Add new themes: Proto Grid, Zen Garden, Vapor (enhanced), Terra (enhanced), Zen Code.
- Add XELA Y2K Skeuomorphic Dark theme.
- Update all color themes: improved selection backgrounds, aesthetics, and consistency.
- Remove semantic token colors from themes for cleaner token scope.
- Fix invalid color formats in Borderless Minimal theme.
- Improve CI: workflow on master pushes, publish controls, friendly npm release scripts.
- Cleanup: remove deprecated, temporary, and generated files.

## 0.1.4
- Trigger automated Marketplace publish (no functional changes).

## 0.1.3
- Add automated publish on tag push & marketplace badges.
- Prepare release notes automation.

## 0.1.2
- Change extension publisher to `cybrdelic` for Marketplace release.

## 0.1.1
- Rename and rebrand to XELA across code, themes, and docs.
- Add comprehensive Markdown token colors to all themes.
- Fix schema issue in Graph Paper theme.
- Update preset path to `presets/xela-black.settings.jsonc`.
- Update workflows and packaging scripts; one-command package-and-install.

## 0.1.0
- Initial boilerplate with `XELA Dark` theme.
