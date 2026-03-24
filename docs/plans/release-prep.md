# XELA Themes — Release Prep Checklist

**Current version:** `0.3.4`
**Branch:** `master`
**Status as of:** 2026-03-22

---

## Test Status

| Suite | Result |
|-------|--------|
| `npm test` (smoke / themes) | **PASS** — 207 files |

---

## What Changed Since Last Release

### Browser Extension (EXPERIMENTAL — not included in this release)

> **Decision:** The browser extension is experimental and opt-in only. It will NOT be bundled or promoted in the v0.4.0 VS Code Marketplace release. It lives in `exports/browser-extension/` for manual sideloading only. Remove from release steps accordingly.



| Commit | Change |
|--------|--------|
| `f25c261` | Drop `world:MAIN` — chrome.* APIs now accessible in content script |
| `c344caf` | Bundle site adapters inline, remove `module` type from content script |
| `c528b3c` | Add `tabs` permission, `module` type, `web_accessible_resources`, `replaceState` intercept |
| `fe32c78` | XELA browser extension v1 — `adoptedStyleSheets` + per-site token mapping |
| `fbeacf3` | Popup theme picker UI |
| `bd9983a` | Fix MutationObserver to detect SPA re-renders |

**Files modified:** `exports/browser-extension/content/content.js`, `sites/chatgpt.js`, `manifest.json`

### Windows Terminal (ANSI / color fixes)

| Commit | Change |
|--------|--------|
| `83fda5d` | Use `darken` for bright ANSI on light themes, opaque `selectionBackground`, distinct `brightCyan` |
| `af8ad61` | Fix ANSI magenta/red collision, `ansiBlack` on light themes, remove alpha from bright variants, add `selectionBackground` |

### Windows Personalization

| Commit | Change |
|--------|--------|
| `abad2ec` | Correct dark tooltip contrast, fix GrayText blend toward true black |
| `8dbf311` | 1920x1080 wallpapers, fix dark tooltip, GrayText contrast, add `[Sounds]` section |

### New Themes (untracked — must be committed)

| File | In `package.json` contributes? |
|------|-------------------------------|
| `xela-jarvis-command-color-theme.json` | YES |
| `xela-runtime-forge-color-theme.json` | YES |
| `xela-shadernetic-flux-color-theme.json` | YES |
| `xela-signal-watch-color-theme.json` | YES |
| `xela-portfolio-grid-color-theme.json` | YES |
| `xela-resonance-studio-color-theme.json` | YES |
| `xela-custom-xela-lakers-color-theme.json` | YES |
| `xela-custom-xela-light-color-theme.json` | YES |
| `xela-custom-xela-robot-color-theme.json` | YES |
| `xela-park-ranger.json` | **NO — MISSING** |

### Modified Core Files

- `extension.js` — extension activation / command handling
- `src/lib/palette-generator.js` — palette logic
- `src/lib/theme-builder.js` — theme builder
- `src/theme-fuzzer/fuzzer-extension-refactored.js`
- `src/theme-fuzzer/theme-generator.js`
- `theme-packs.json`
- `scripts/theme-system/build-extension.mjs`
- `scripts/theme-system/pack-plan.manual.js`
- `scripts/theme-system/roles.js`
- All `themes/*.json` files (bulk property updates)

---

## Issues to Fix Before Release

### 1. `xela-park-ranger.json` not registered

The file exists at `themes/xela-park-ranger.json` but has **zero occurrences** in `package.json` contributes.

**Fix options (pick one):**
- Run `npm run update:package` — auto-syncs all themes in `themes/` into contributes
- Or manually add the entry to `package.json`

> Note: `prepackage` already runs `update:package` before `npm run package`, so this will be caught automatically if the fix is done via `update:package` first.

### 2. Version bump

Current: `0.3.4`. The release includes:
- New browser extension (major new feature)
- 6 new themes
- Multiple terminal/personalization bug fixes

**Recommended:** bump to `0.4.0` (new browser extension warrants a minor bump).

### 3. Untracked new files to include

These new files need to be staged and committed:

```
.eslintrc.json
.prettierrc
CONTRIBUTING.md
REVIEWER_CHECKLIST.md
bin/
docs/
scripts/accessibility/auto-fix-contrast.cjs
scripts/accessibility/fuzzer.cjs
scripts/theme-system/apply-icons.mjs
scripts/theme-system/browser-theme-data.mjs
scripts/theme-system/browser-theme-utils.mjs
scripts/theme-system/build-browser-themes.mjs
scripts/theme-system/build-windows-personalization.mjs
scripts/theme-system/build-windows-terminal.mjs
scripts/theme-system/configs/
scripts/theme-system/generate-icons.mjs
scripts/theme-system/install-*.mjs
scripts/theme-system/list-*.mjs
scripts/theme-system/select-*.mjs
scripts/theme-system/test-*.mjs
scripts/theme-system/windows-terminal-*.mjs
src/logging.js
src/theme-editor/
themes/xela-custom-xela-lakers-color-theme.json
themes/xela-custom-xela-light-color-theme.json
themes/xela-custom-xela-robot-color-theme.json
themes/xela-jarvis-command-color-theme.json
themes/xela-park-ranger.json
themes/xela-portfolio-grid-color-theme.json
themes/xela-resonance-studio-color-theme.json
themes/xela-runtime-forge-color-theme.json
themes/xela-shadernetic-flux-color-theme.json
themes/xela-signal-watch-color-theme.json
```

> **Do NOT commit:** `.env` (already in `.vscodeignore` and `.gitignore`, but verify `.gitignore` excludes it)

---

## Release Steps (in order)

```
1.  npm run update:package          # sync all themes into package.json contributes (fixes park-ranger)
2.  # Bump version in package.json: 0.3.4 -> 0.4.0
3.  npm test                        # confirm still green
4.  git add <specific files>        # stage modified + new files (avoid .env)
5.  git commit -m "release: v0.4.0 — browser extension v1, 6 new themes, terminal/personalization fixes"
6.  npm run package                 # builds VSIX (runs prepackage: build:themes, update:package, test)
7.  npm run install:vsix            # install locally and smoke-test in VS Code
8.  git tag v0.4.0
9.  git push origin master --tags
10. npm run publish:force           # trigger CI publish to VS Code Marketplace
```

---

## .vscodeignore Coverage (verified OK)

| Excluded | Status |
|----------|--------|
| `scripts/**` | Excluded |
| `exports/` | Excluded |
| `.env` | Excluded |
| `node_modules/**` | Excluded |
| `accessibility-reports/**` | Excluded |
| `docs/**` | Excluded |
| `test-files/**`, `test-workspace/**` | Excluded |

`bin/` is **included** (needed for the CLI binary).

---

## Questions to Resolve

- Should `xela-park-ranger.json` keep its non-standard filename (no `-color-theme` suffix)?
- Are the `xela-custom-*` themes meant for public release or personal use only?
- Is the browser extension ready for end-users, or experimental/opt-in only?
