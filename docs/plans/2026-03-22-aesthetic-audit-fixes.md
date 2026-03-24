# Aesthetic Audit Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all 27 aesthetic issues identified across Windows Terminal ANSI colors, Windows Personalization wallpapers/.theme files, and the browser extension CSS adapters for ChatGPT, LinkedIn, and GitHub.

**Architecture:** Three independent fix layers — (1) color-mapping pipeline fixes that rebuild downstream exports, (2) windows-personalization wallpaper/theme fixes, (3) browser extension content.js + source adapter sync. Each layer has verification commands.

**Tech Stack:** Node.js ESM, `scripts/theme-system/color-mapping.js` (VS Code + Terminal color generator), `scripts/theme-system/windows-personalization-utils.mjs` (BMP writer + .theme generator), `exports/browser-extension/content/content.js` (standalone bundled content script), `exports/browser-extension/content/sites/*.js` (source adapters, ES module stubs).

**Issues addressed:** WT-1 WT-2 WT-3 WT-4 WT-5 | WP-1 WP-2 WP-3 WP-4 WP-5 | CG-2 CG-3 CG-4 CG-5 | GH-2 GH-3 GH-5 | LI-2 LI-3 LI-4 LI-5 | XC-1 XC-2

---

## Task 1: Fix ANSI Color Mapping in color-mapping.js

Addresses: WT-1 (magenta=red on 140/193 themes), WT-2 (ansiBlack near-white on 54 light themes), WT-3 (bright variants use alpha), WT-4 (no explicit selectionBackground), WT-5 (cyan/brightCyan identical on some themes).

**Files:**
- Modify: `scripts/theme-system/color-mapping.js:3` (imports)
- Modify: `scripts/theme-system/color-mapping.js:54-56` (top of buildCompleteColors)
- Modify: `scripts/theme-system/color-mapping.js:321-339` (terminal ANSI block)

**Step 1: Update the import line**

`color-mapping.js` line 3 currently imports:
```js
import { withAlpha, enforceContrast } from './roles.js';
```
Change to:
```js
import { withAlpha, enforceContrast, getLuminance, lighten } from './roles.js';
```

**Step 2: Add `isLight` flag at top of buildCompleteColors**

After `const r = roles;` (line 55), add:
```js
const isLight = getLuminance(r.surface0 || '#000000') > 0.45;
```

**Step 3: Replace the entire terminal ANSI block (lines 321–339)**

Find the comment `// Terminal` and replace the 16-line ANSI block with:
```js
    // Terminal
    'terminal.background': r.surface0,
    'terminal.foreground': enforceContrast(r.textPrimary, r.surface0, CONTRAST.AA),
    'terminalCursor.foreground': enforceContrast(r.accentPrimary, r.surface0, CONTRAST.UI),
    'terminal.selectionBackground': r.accentSelection,
    'terminal.ansiBlack':   isLight ? '#1A1A1A' : r.surface0,
    'terminal.ansiRed':     r.accentError,
    'terminal.ansiGreen':   r.accentSuccess,
    'terminal.ansiYellow':  r.accentWarn,
    'terminal.ansiBlue':    r.accentInfo,
    'terminal.ansiMagenta': r.accentPrimaryAlt || r.accentPrimary,
    'terminal.ansiCyan':    r.accentPrimary,
    'terminal.ansiWhite':   r.textSecondary,
    'terminal.ansiBrightBlack':   r.textMuted,
    'terminal.ansiBrightRed':     lighten(r.accentError,   0.15),
    'terminal.ansiBrightGreen':   lighten(r.accentSuccess, 0.15),
    'terminal.ansiBrightYellow':  lighten(r.accentWarn,    0.15),
    'terminal.ansiBrightBlue':    lighten(r.accentInfo,    0.15),
    'terminal.ansiBrightMagenta': lighten(r.accentPrimaryAlt || r.accentPrimary, 0.15),
    'terminal.ansiBrightCyan':    lighten(r.accentPrimaryAlt || r.accentPrimary, 0.15),
    'terminal.ansiBrightWhite':   r.textPrimary,
```

**Step 4: Verify the fix compiles (smoke build)**

```bash
node -e "import('./scripts/theme-system/color-mapping.js').then(m => console.log('OK', typeof m.buildCompleteColors))"
```
Expected: `OK function`

**Step 5: Write a verification script and run it**

```bash
node -e "
import('./scripts/theme-system/build-windows-terminal.mjs').then(() => {
  const fs = await import('fs');
  // use sync after build
}).catch(console.error);
"
```

Actually just run the build and check the output counts inline:
```bash
node scripts/theme-system/build-windows-terminal.mjs 2>&1 | tail -1
```
Expected: `Generated 193 Windows Terminal schemes in ...`

**Step 6: Verify magenta != red in output**

```bash
node -e "
const schemes = JSON.parse(require('fs').readFileSync('./exports/windows-terminal/xela-windows-terminal-schemes.json','utf8'));
const bad = schemes.filter(s => s.purple === s.red);
console.log('magenta==red:', bad.length, '(expect 0)');
const lightBad = schemes.filter(s => {
  const c = parseInt((s.black||'#000').replace('#',''),16);
  const r=(c>>16)&255,g=(c>>8)&255,b=c&255;
  const f=x=>{x/=255;return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4)};
  return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b) > 0.3;
});
console.log('bright ansiBlack:', lightBad.length, '(expect 0)');
"
```
Expected: both lines show 0.

**Step 7: Commit**

```bash
git add scripts/theme-system/color-mapping.js exports/windows-terminal/
git commit -m "fix(terminal): correct ANSI magenta, ansiBlack on light themes, remove alpha from bright variants"
```

---

## Task 2: Fix Wallpaper Resolution and .theme File Improvements

Addresses: WP-1 (256×144 → 1920×1080), WP-3 (dark tooltip too dark), WP-4 (GrayText contrast), WP-5 (add [Sounds] section).

**Files:**
- Modify: `scripts/theme-system/windows-personalization-utils.mjs:236` (writeWallpaperBmp defaults)
- Modify: `scripts/theme-system/windows-personalization-utils.mjs:287` (infoWindow dark formula)
- Modify: `scripts/theme-system/windows-personalization-utils.mjs:337` (GrayText)
- Modify: `scripts/theme-system/windows-personalization-utils.mjs:358` (add [Sounds] before closing)

**Step 1: Fix wallpaper resolution (WP-1)**

In `writeWallpaperBmp`, line 236:
```js
// Before:
export function writeWallpaperBmp(outputPath, scheme, width = 256, height = 144) {

// After:
export function writeWallpaperBmp(outputPath, scheme, width = 1920, height = 1080) {
```

**Step 2: Fix dark tooltip infoWindow (WP-3)**

Line 287 in `buildThemeFileContent`:
```js
// Before:
const infoWindow = mode === 'light' ? mixColor(scheme.yellow, scheme.white, 0.65) : mixColor(scheme.background, scheme.yellow, 0.2);

// After:
const infoWindow = mode === 'light'
  ? mixColor(scheme.yellow, scheme.white, 0.65)
  : mixColor(scheme.foreground, scheme.yellow, 0.15);
```
This blends 15% yellow into the foreground (usually near-white) giving a warm cream tooltip that reads well on dark backgrounds.

**Step 3: Fix GrayText contrast for light themes (WP-4)**

Line ~337 (the `GrayText=` line in the template string):
```js
// Before:
GrayText=${rgbString(scheme.brightBlack)}\r

// After:
GrayText=${rgbString(mode === 'light' ? mixColor(scheme.brightBlack, scheme.black, 0.3) : scheme.brightBlack)}\r
```
Darkens brightBlack by 30% on light themes to ensure contrast against light button faces.

**Step 4: Add [Sounds] section (WP-5)**

At the end of `buildThemeFileContent`, just before the closing backtick, add:
```js
[Sounds]\r
SchemeName=\r
\r
[MasterThemeSelector]\r
MTSM=DABJDKT\r
`
```
Note: The existing `[MasterThemeSelector]` block is already at the end. Insert the `[Sounds]` block BEFORE `[MasterThemeSelector]`.

The final tail of the template string should read:
```
...ColorizationColor=...\r
Transparency=1\r
\r
[Sounds]\r
SchemeName=\r
\r
[MasterThemeSelector]\r
MTSM=DABJDKT\r
`;
```

**Step 5: Verify changes compile**

```bash
node -e "import('./scripts/theme-system/windows-personalization-utils.mjs').then(m => console.log('OK', typeof m.writeWallpaperBmp))"
```
Expected: `OK function`

**Step 6: Commit**

```bash
git add scripts/theme-system/windows-personalization-utils.mjs
git commit -m "fix(personalization): 1920x1080 wallpapers, fix dark tooltip, GrayText contrast, add Sounds section"
```

---

## Task 3: Fix Pre-Generated .theme Files Having Dev-Machine Absolute Paths (WP-2)

The install script (`install-windows-personalization.mjs:76`) already regenerates `.theme` files with correct installed paths, so the install workflow is fine. The issue is that the pre-built `.theme` files in `exports/windows-personalization/themes/` embed the developer's absolute paths. Fix: stop generating `.theme` files during the export build — they're rebuilt at install time anyway.

**Files:**
- Modify: `scripts/theme-system/build-windows-personalization.mjs:30-41` (remove writeWindowsThemeFile call and themeFile from record)

**Step 1: Remove writeWindowsThemeFile from build script**

In `build-windows-personalization.mjs`, the `.map()` block that processes each theme (lines ~30–55). Remove:
1. The `writeWindowsThemeFile(themeFilePath, record, wallpaperPath)` call
2. The `themeFile: themeFilePath` line in the returned record
3. The `themeFilePath` variable declaration (and its `path.join(...)`)

The record returned from the map should now be:
```js
return {
  id: theme.id,
  name: theme.name,
  vscodeName: theme.vscodeName || theme.name,
  description: theme.description || '',
  source: theme.source,
  packIds: theme.packIds || [],
  packLabels: theme.packLabels || [],
  mode: record.mode,
  wallpaperFile: wallpaperPath
};
```

**Step 2: Remove the themes output directory setup**

Remove the `fs.mkdirSync(windowsPersonalizationPaths.themesDir, ...)` call at the top of `build()` since we no longer write .theme files.

**Step 3: Remove stale pre-generated .theme files**

```bash
rm -f exports/windows-personalization/themes/*.theme
```

**Step 4: Update windowsPersonalizationPaths if themesDir is no longer needed**

In `windows-personalization-utils.mjs`, the `windowsPersonalizationPaths` export still includes `themesDir`. Keep it (the install script creates it on demand) but it no longer needs to exist pre-build.

**Step 5: Verify build still produces correct index**

```bash
node scripts/theme-system/build-windows-personalization.mjs 2>&1 | tail -2
```
Expected: output mentions themes generated, no errors.

Verify index has no `themeFile` key:
```bash
node -e "const i = JSON.parse(require('fs').readFileSync('./exports/windows-personalization/xela-windows-personalization-index.json','utf8')); console.log('themeFile in record:', 'themeFile' in (i.themes[0]||{}));"
```
Expected: `themeFile in record: false`

**Step 6: Commit**

```bash
git add scripts/theme-system/build-windows-personalization.mjs exports/windows-personalization/
git commit -m "fix(personalization): remove dev-path-baked .theme files from export build; install script generates them at correct path"
```

---

## Task 4: Rebuild Windows Terminal + Personalization Exports

After Tasks 1–3, regenerate all export artifacts so the fixes are reflected in the committed outputs.

**Step 1: Build Windows Terminal schemes**

```bash
npm run build:windows-terminal
```
Expected: `Generated 193 Windows Terminal schemes in ./exports/windows-terminal`

**Step 2: Build Windows Personalization (BMP wallpapers only now)**

```bash
npm run build:windows-personalization
```
Expected: `Generated 193 Windows personalization themes in ./exports/windows-personalization`
Note: This will take 1–3 minutes to render 193 × 1920×1080 wallpapers.

**Step 3: Spot-check a light-theme wallpaper BMP dimensions**

```bash
node -e "
const fs = require('fs');
const buf = fs.readFileSync('./exports/windows-personalization/wallpapers/xela-arctic-daylight.bmp');
console.log('Width:', buf.readInt32LE(18), 'Height:', buf.readInt32LE(22));
"
```
Expected: `Width: 1920 Height: 1080`

**Step 4: Spot-check a dark-theme terminal scheme magenta vs red**

```bash
node -e "
const s = JSON.parse(require('fs').readFileSync('./exports/windows-terminal/xela-windows-terminal-schemes.json','utf8'));
const t = s.find(x => x.name.includes('AMOLED'));
console.log('red:', t.red, 'magenta:', t.purple, 'same?', t.red === t.purple);
"
```
Expected: `same? false`

**Step 5: Commit updated exports**

```bash
git add exports/windows-terminal/ exports/windows-personalization/
git commit -m "chore: rebuild Windows Terminal + personalization exports with audit fixes"
```

---

## Task 5: Fix Browser Extension — Code Block Syntax Highlighting + Selection Override

Addresses: CG-2 (ChatGPT code blocks destroy syntax colors), GH-2 (GitHub blob-code-inner destroys syntax colors), GH-5 (::selection !important removes site-specific selection cues).

**Files:**
- Modify: `exports/browser-extension/content/content.js` (three targeted edits)

**Step 1: Fix GitHub blob-code-inner color override (GH-2)**

In `content.js`, find in `githubCss()`:
```js
.blob-code-inner { color: ${p.text} !important; }
```
Remove this line entirely. Syntax highlighting token colors (`.pl-k`, `.pl-c1`, etc.) should be preserved.

Also find in `githubCss()`:
```js
.markdown-body pre, .markdown-body code { background: ${p.codeBg} !important; }
```
Do NOT add `color` to this rule — it already correctly only sets background.

**Step 2: Fix ChatGPT hljs color override (CG-2)**

In `content.js`, find in `chatgptCss()`:
```js
pre, pre code,
[data-testid*="code"],
.hljs, [class*="language-"], [class*="code-block"] {
  background: ${p.codeBg} !important;
  color: ${p.text} !important;
  border-color: ${p.border} !important;
}
```
Remove the `color: ${p.text} !important;` line from this block. Keep `background` and `border-color`.

Also find:
```js
code:not(pre code),
kbd {
  background: ${p.bgElevated} !important;
  color: ${p.text} !important;
  border: 1px solid ${p.border} !important;
}
```
Keep `color` here (inline code/kbd should be themed) — only remove from the hljs/language containers.

**Step 3: Fix ::selection !important overriding site selection cues (GH-5)**

In `content.js`, find in `buildBaseCss()`:
```js
::selection { background: ${p.selection} !important; color: ${p.text} !important; }
```
Remove both `!important` flags:
```js
::selection { background: ${p.selection}; color: ${p.text}; }
```
This lets site-specific selection styles (e.g. GitHub's diff selection) take priority when relevant.

**Step 4: Verify the edits are syntactically correct**

```bash
node -e "
const fs = require('fs');
const c = fs.readFileSync('./exports/browser-extension/content/content.js', 'utf8');
console.log('blob-code-inner color gone:', !c.includes('.blob-code-inner { color:'));
console.log('hljs color line gone:', !c.includes('.hljs, [class*=\"language-\"], [class*=\"code-block\"] {\n  background: \${p.codeBg} !important;\n  color:'));
console.log('selection no !important:', !c.includes('::selection { background: \${p.selection} !important'));
"
```
Expected: all three `true`.

**Step 5: Commit**

```bash
git add exports/browser-extension/content/content.js
git commit -m "fix(extension): preserve syntax highlighting in code blocks; remove !important from ::selection"
```

---

## Task 6: Fix Browser Extension — ChatGPT Token Mapping

Addresses: CG-3 (border-light/medium/heavy all identical), CG-5 (modal overlay opacity not theme-aware), CG-4 (missing newer ChatGPT design tokens).

**Files:**
- Modify: `exports/browser-extension/content/content.js` (chatgptCss function only)

**Step 1: Fix border weight hierarchy (CG-3)**

In `chatgptCss()`, find the three border token lines in the `:root` block:
```js
  --token-border-light:               ${p.border} !important;
  --token-border-medium:              ${p.border} !important;
  --token-border-heavy:               ${p.border} !important;
```
Replace with:
```js
  --token-border-light:               ${p.border} !important;
  --token-border-medium:              ${p.border} !important;
  --token-border-heavy:               ${p.focus} !important;
```
`p.focus` is the keyboard-focus color — more vivid than `p.border`, gives heavy borders visual weight.

**Step 2: Add missing newer ChatGPT tokens to :root block (CG-4)**

After the `--composer-border` line (last existing custom property), add:
```js
  --token-surface-overlay-default:    ${p.bgFloating} !important;
  --token-icon-primary:               ${p.text} !important;
  --token-icon-secondary:             ${p.textMuted} !important;
  --token-prose-heading:              ${p.text} !important;
  --token-prose-body:                 ${p.text} !important;
  --token-prose-code:                 ${p.text} !important;
  --token-message-user:               ${p.bgElevated} !important;
  --token-message-assistant:          transparent !important;
  --token-sidebar-surface-tertiary:   ${p.bgElevated} !important;
  --token-main-surface-quaternary:    ${p.bgFloating} !important;
```

**Step 3: Make modal overlay opacity theme-aware (CG-5)**

In `chatgptCss()`, find:
```js
[data-state="open"][data-overlay],
[class*="overlay"][class*="fixed"],
.ReactModal__Overlay { background: rgba(0,0,0,0.6) !important; }
```
Replace with:
```js
[data-state="open"][data-overlay],
[class*="overlay"][class*="fixed"],
.ReactModal__Overlay { background: ${p._type === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.6)'} !important; }
```

**Step 4: Verify**

```bash
node -e "
const fs = require('fs');
const c = fs.readFileSync('./exports/browser-extension/content/content.js', 'utf8');
console.log('heavy border uses focus:', c.includes('--token-border-heavy:               \${p.focus}'));
console.log('overlay is theme-aware:', c.includes('p._type === \\'light\\''));
console.log('token-surface-overlay-default present:', c.includes('--token-surface-overlay-default'));
"
```
Expected: all `true`.

**Step 5: Commit**

```bash
git add exports/browser-extension/content/content.js
git commit -m "fix(extension/chatgpt): distinct border weights, theme-aware overlay opacity, add newer design tokens"
```

---

## Task 7: Fix Browser Extension — LinkedIn and Cross-Cutting

Addresses: LI-2 (self-message bubble uses raw accent), LI-3 (source adapter button mapping), LI-4 (missing LinkedIn CSS vars in source), LI-5 (unread bubble state), XC-2 (scrollbar track color inconsistent across sites).

**Files:**
- Modify: `exports/browser-extension/content/content.js` (linkedinCss + buildBaseCss)

**Step 1: Fix self-message bubble accent (LI-2)**

In `linkedinCss()`, find:
```js
.msg-s-event-listitem--self .msg-s-event-listitem__message-bubble {
  background: ${p.accent} !important;
  color: ${p.buttonFg} !important;
}
```
Replace with:
```js
.msg-s-event-listitem--self .msg-s-event-listitem__message-bubble {
  background: ${p.selection} !important;
  color: ${p.text} !important;
}
```
`p.selection` is the muted/tinted selection color — theme-coherent without using the full vivid accent.

**Step 2: Add unread/active message overlay styling (LI-5)**

After the `msg-overlay-bubble-header` background line, add:
```js
.msg-overlay-list-bubble__unread-count { background: ${p.accent} !important; color: ${p.buttonFg} !important; }
.msg-overlay-conversation-bubble--active .msg-overlay-bubble-header {
  background: ${p.bgElevated} !important;
  border-left: 2px solid ${p.accent} !important;
}
```

**Step 3: Fix scrollbar track consistency (XC-2)**

In `buildBaseCss()`, the base scrollbar uses `p.bg` as track:
```js
* { scrollbar-color: ${p.accent} ${p.bg}; }
```

In `chatgptCss()` and `linkedinCss()`, find:
```js
* { scrollbar-color: ${p.accent} ${p.bgAlt}; }
```
Change both site-specific scrollbar rules to use `${p.bg}` (same as base) so track color is consistent across all sites:
```js
* { scrollbar-color: ${p.accent} ${p.bg}; }
```

**Step 4: Verify**

```bash
node -e "
const fs = require('fs');
const c = fs.readFileSync('./exports/browser-extension/content/content.js', 'utf8');
const scrollbarMatches = (c.match(/scrollbar-color: \\\${p\.accent} \\\${p\.(bg|bgAlt)}/g) || []);
console.log('scrollbar rules:', scrollbarMatches);
// should all be p.bg, not p.bgAlt
console.log('all use p.bg:', scrollbarMatches.every(m => m.includes('p.bg}')));
console.log('self-bubble uses selection:', c.includes('msg-s-event-listitem--self') && c.includes('p.selection'));
"
```
Expected: all scrollbar rules use `p.bg`, self-bubble uses selection.

**Step 5: Commit**

```bash
git add exports/browser-extension/content/content.js
git commit -m "fix(extension/linkedin): muted self-message bubbles, unread active state, consistent scrollbar track color"
```

---

## Task 8: Sync Source Site Adapters with Bundled content.js (XC-1)

The source files in `exports/browser-extension/content/sites/` are 3–5× shorter than the inlined functions in `content.js`. They must be updated to match so they serve as a reliable source of truth. The canonical bundled file is `content.js`; extract each site's inlined function body back into the source adapter.

**Files:**
- Rewrite: `exports/browser-extension/content/sites/chatgpt.js`
- Rewrite: `exports/browser-extension/content/sites/github.js`
- Rewrite: `exports/browser-extension/content/sites/linkedin.js`

**Step 1: Extract chatgptCss() into sites/chatgpt.js**

`chatgptCss()` in `content.js` runs from line 385 to ~622. Extract the template literal body and wrap in the ES module export form. The file should be:
```js
export function buildCss(p) {
  return `<exact CSS from chatgptCss() in content.js>`;
}
```
Important: the `chatgptCss(p)` function in `content.js` uses `p._type` — the source adapter must also receive `p` with `_type` set. The function signature stays `buildCss(p)` to match existing convention.

Copy the entire template literal from `function chatgptCss(p) { return \`...\`; }` in `content.js` into `sites/chatgpt.js` as `export function buildCss(p) { return \`...\`; }`.

**Step 2: Extract githubCss() into sites/github.js**

Same process: `githubCss()` in `content.js` runs from line 7 to ~248. Extract into `sites/github.js`:
```js
export function buildCss(p) {
  return `<exact CSS from githubCss() in content.js>`;
}
```

**Step 3: Extract linkedinCss() into sites/linkedin.js**

`linkedinCss()` in `content.js` runs from line 625 to ~831. Extract into `sites/linkedin.js`:
```js
export function buildCss(p) {
  return `<exact CSS from linkedinCss() in content.js>`;
}
```

**Step 4: Add a comment header to each source adapter explaining its role**

At the top of each `sites/*.js` file, before the export:
```js
// XELA Themes — <site> site adapter (source)
// This file is the source of truth for <site>.com CSS theming.
// content.js inlines these functions directly (no import) for MV3 compatibility.
// When editing: update BOTH this file AND the corresponding function in content.js.
```

**Step 5: Verify source adapters parse as valid ES modules**

```bash
node --input-type=module < exports/browser-extension/content/sites/chatgpt.js && echo "chatgpt OK"
node --input-type=module < exports/browser-extension/content/sites/github.js  && echo "github OK"
node --input-type=module < exports/browser-extension/content/sites/linkedin.js && echo "linkedin OK"
```
Expected: all three print OK.

**Step 6: Verify line counts match bundled**

```bash
node -e "
const fs = require('fs');
const chatgptSrc = fs.readFileSync('./exports/browser-extension/content/sites/chatgpt.js','utf8').split('\n').length;
const githubSrc  = fs.readFileSync('./exports/browser-extension/content/sites/github.js','utf8').split('\n').length;
const linkedinSrc = fs.readFileSync('./exports/browser-extension/content/sites/linkedin.js','utf8').split('\n').length;
console.log('chatgpt source lines:', chatgptSrc, '(expect ~245)');
console.log('github source lines:', githubSrc,   '(expect ~250)');
console.log('linkedin source lines:', linkedinSrc,'(expect ~220)');
"
```

**Step 7: Commit**

```bash
git add exports/browser-extension/content/sites/
git commit -m "fix(extension): sync source site adapters with bundled content.js (XC-1)"
```

---

## Task 9: Fix GitHub SPA Flash + Rebuild Extension (GH-3)

Addresses: GH-3 (50ms debounce too short for GitHub React transitions).

**Files:**
- Modify: `exports/browser-extension/content/content.js` (scheduleReapply debounce)

**Step 1: Increase MutationObserver debounce**

In `content.js`, find:
```js
reapplyTimer = setTimeout(reapply, 50);
```
Change to:
```js
reapplyTimer = setTimeout(reapply, 150);
```

Also add a `<head>` style mutation observation to catch GitHub's stylesheet swaps. In `boot()`, after the two existing `observer.observe` calls, add:
```js
    observer.observe(document.head || document.documentElement, { childList: true, subtree: false });
```

**Step 2: Rebuild extension themes.json**

```bash
npm run build:extension
```
Expected: `Extension themes.json: N themes → ...`

**Step 3: Verify themes.json has expected shape**

```bash
node -e "
const d = JSON.parse(require('fs').readFileSync('./exports/browser-extension/themes.json','utf8'));
console.log('themes:', d.themes.length, 'packs:', d.packs.length);
console.log('first theme keys:', Object.keys(d.themes[0]));
console.log('first palette keys:', Object.keys(d.themes[0].palette));
"
```
Expected: themes count ≥ 193, palette includes `focus` key.

**Step 4: Commit**

```bash
git add exports/browser-extension/content/content.js exports/browser-extension/themes.json
git commit -m "fix(extension/github): increase SPA reapply debounce to 150ms, observe head for style mutations"
```

---

## Task 10: Final Verification Pass

**Step 1: Run all build commands clean**

```bash
npm run build:windows-terminal && npm run build:windows-personalization && npm run build:extension
```
Expected: no errors, scheme/theme counts reported.

**Step 2: Full audit verification script**

```bash
node -e "
const fs = require('fs');

// WT-1: magenta != red
const schemes = JSON.parse(fs.readFileSync('./exports/windows-terminal/xela-windows-terminal-schemes.json','utf8'));
const magBad = schemes.filter(s => s.purple === s.red).length;
console.assert(magBad === 0, 'WT-1 FAIL: '+magBad+' themes still have magenta=red');
console.log('WT-1 magenta!=red: PASS ('+schemes.length+' schemes)');

// WT-2: ansiBlack not near-white on light themes
const lum = h => { const c=parseInt((h||'#000').replace('#','').slice(0,6).padEnd(6,'0'),16),r=(c>>16)&255,g=(c>>8)&255,b=c&255,f=x=>{x/=255;return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);};
const blackBad = schemes.filter(s => lum(s.background)>0.4 && lum(s.black||'#000')>0.3).length;
console.assert(blackBad === 0, 'WT-2 FAIL: '+blackBad+' light themes have bright ansiBlack');
console.log('WT-2 ansiBlack on light themes: PASS');

// WP-1: wallpaper resolution
const wp = fs.readFileSync('./exports/windows-personalization/wallpapers/xela-arctic-daylight.bmp');
console.assert(wp.readInt32LE(18) === 1920, 'WP-1 FAIL: width is '+wp.readInt32LE(18));
console.assert(wp.readInt32LE(22) === 1080, 'WP-1 FAIL: height is '+wp.readInt32LE(22));
console.log('WP-1 wallpaper 1920x1080: PASS');

// WP-2: no themeFile in personalization index
const wpIdx = JSON.parse(fs.readFileSync('./exports/windows-personalization/xela-windows-personalization-index.json','utf8'));
console.assert(!('themeFile' in (wpIdx.themes[0]||{})), 'WP-2 FAIL: themeFile still in index');
console.log('WP-2 no hardcoded themeFile: PASS');

// XC-2: scrollbar consistency (no bgAlt in scrollbar-color rules)
const content = fs.readFileSync('./exports/browser-extension/content/content.js','utf8');
const bgAltScrollbars = (content.match(/scrollbar-color.*bgAlt/g)||[]).length;
console.assert(bgAltScrollbars === 0, 'XC-2 FAIL: '+bgAltScrollbars+' scrollbar rules still use bgAlt');
console.log('XC-2 scrollbar consistency: PASS');

// CG-2/GH-2: no color override on hljs containers
console.assert(!content.includes('.blob-code-inner { color:'), 'GH-2 FAIL: blob-code-inner color still present');
console.log('GH-2 blob-code-inner color removed: PASS');

console.log('\\nAll checks passed.');
"
```
Expected: all lines show PASS.

**Step 3: Final commit if any remaining changes**

```bash
git add -A
git status
```
If clean: done. If there are remaining uncommitted changes from verification rebuilds:
```bash
git add exports/
git commit -m "chore: final verification rebuild artifacts"
```

---

## Summary of Files Changed

| File | Tasks | Issues |
|------|-------|--------|
| `scripts/theme-system/color-mapping.js` | 1 | WT-1 WT-2 WT-3 WT-4 WT-5 |
| `scripts/theme-system/windows-personalization-utils.mjs` | 2 | WP-1 WP-3 WP-4 WP-5 |
| `scripts/theme-system/build-windows-personalization.mjs` | 3 | WP-2 |
| `exports/windows-terminal/*.json` | 4 | (rebuilt) |
| `exports/windows-personalization/wallpapers/*.bmp` | 4 | (rebuilt) |
| `exports/browser-extension/content/content.js` | 5 6 7 9 | CG-2 CG-3 CG-4 CG-5 GH-2 GH-3 GH-5 LI-2 LI-5 XC-2 |
| `exports/browser-extension/content/sites/chatgpt.js` | 8 | XC-1 |
| `exports/browser-extension/content/sites/github.js` | 8 | XC-1 |
| `exports/browser-extension/content/sites/linkedin.js` | 8 | XC-1 |
| `exports/browser-extension/themes.json` | 9 | (rebuilt) |
