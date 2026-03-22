// XELA Themes — content script (bundled, no imports)
// Injects via document.adoptedStyleSheets (never in DOM, immune to SPA stripping)
// Runs at document_start to beat the site's own CSS load

// --- Site adapters (inlined) ---
function githubCss(p) {
  return `
/* Force GitHub color mode */
html { color-scheme: ${p._type === 'light' ? 'light' : 'dark'} !important; }

/* Override Primer design tokens */
html, [data-color-mode] {
  --color-canvas-default:        ${p.bg} !important;
  --color-canvas-subtle:         ${p.bgAlt} !important;
  --color-canvas-inset:          ${p.bgElevated} !important;
  --color-canvas-overlay:        ${p.bgFloating} !important;
  --color-fg-default:            ${p.text} !important;
  --color-fg-muted:              ${p.textMuted} !important;
  --color-fg-subtle:             ${p.textSoft} !important;
  --color-border-default:        ${p.border} !important;
  --color-border-muted:          ${p.border} !important;
  --color-border-subtle:         ${p.border} !important;
  --color-accent-fg:             ${p.link} !important;
  --color-accent-emphasis:       ${p.accent} !important;
  --color-accent-muted:          ${p.selection} !important;
  --color-success-fg:            ${p.success} !important;
  --color-attention-fg:          ${p.warning} !important;
  --color-danger-fg:             ${p.error} !important;
  --color-btn-bg:                ${p.buttonBg} !important;
  --color-btn-text:              ${p.buttonFg} !important;
  --color-btn-border:            ${p.border} !important;
  --color-btn-hover-bg:          ${p.accentAlt} !important;
  --color-btn-primary-bg:        ${p.accent} !important;
  --color-btn-primary-text:      ${p.buttonFg} !important;
  --color-input-bg:              ${p.inputBg} !important;
  --color-input-contrast:        ${p.inputBg} !important;
  --color-neutral-muted:         ${p.bgElevated} !important;
  --color-neutral-subtle:        ${p.bgAlt} !important;
  --bgColor-default:             ${p.bg} !important;
  --bgColor-muted:               ${p.bgAlt} !important;
  --bgColor-inset:               ${p.bgElevated} !important;
  --fgColor-default:             ${p.text} !important;
  --fgColor-muted:               ${p.textMuted} !important;
  --fgColor-link:                ${p.link} !important;
  --borderColor-default:         ${p.border} !important;
  --borderColor-muted:           ${p.border} !important;
}

/* Fallback element rules */
body, .AppHeader, .Header { background: ${p.bg} !important; color: ${p.text} !important; }
.markdown-body { color: ${p.text} !important; }
.markdown-body pre, .markdown-body code { background: ${p.codeBg} !important; }
`;
}

function googleCss(p) {
  return `
html, body {
  --gm3-sys-color-background:               ${p.bg} !important;
  --gm3-sys-color-on-background:            ${p.text} !important;
  --gm3-sys-color-surface:                  ${p.bgAlt} !important;
  --gm3-sys-color-surface-variant:          ${p.bgElevated} !important;
  --gm3-sys-color-on-surface:               ${p.text} !important;
  --gm3-sys-color-on-surface-variant:       ${p.textSoft} !important;
  --gm3-sys-color-outline:                  ${p.border} !important;
  --gm3-sys-color-outline-variant:          ${p.border} !important;
  --gm3-sys-color-primary:                  ${p.accent} !important;
  --gm3-sys-color-on-primary:               ${p.buttonFg} !important;
  --gm3-sys-color-surface-container-high:   ${p.bgElevated} !important;
  --gm3-sys-color-surface-container:        ${p.bgAlt} !important;
  --gm3-sys-color-surface-container-low:    ${p.bg} !important;
}

body, #searchform, .sfbg, #appbar, #top_nav { background: ${p.bg} !important; color: ${p.text} !important; }
.RNNXgb, .a4bIc, .gLFyf, .APjFqb, .A8SBwf {
  background: ${p.inputBg} !important;
  color: ${p.inputFg} !important;
  border-color: ${p.inputBorder} !important;
}
.MjjYud, .tF2Cxc, .g { background: ${p.bgAlt} !important; color: ${p.text} !important; }
a:link, a:visited { color: ${p.link} !important; }
`;
}

function chatgptCss(p) {
  return `
:root {
  --token-main-surface-primary:       ${p.bg} !important;
  --token-main-surface-secondary:     ${p.bgAlt} !important;
  --token-sidebar-surface-primary:    ${p.bgAlt} !important;
  --token-sidebar-surface-secondary:  ${p.bgElevated} !important;
  --token-message-surface:            ${p.bgElevated} !important;
  --token-text-primary:               ${p.text} !important;
  --token-text-secondary:             ${p.textSoft} !important;
  --token-text-tertiary:              ${p.textMuted} !important;
  --token-text-error:                 ${p.error} !important;
  --token-border-light:               ${p.border} !important;
  --token-border-medium:              ${p.border} !important;
  --token-border-heavy:               ${p.border} !important;
  --token-brand-purple:               ${p.accent} !important;
  --token-input-bg:                   ${p.inputBg} !important;
  --background-token-main-surface-primary:    ${p.bg} !important;
  --background-token-sidebar-surface-primary: ${p.bgAlt} !important;
}

html, body, #__next, main { background: ${p.bg} !important; color: ${p.text} !important; }
nav, aside, [class*="sidebar"] { background: ${p.bgAlt} !important; }
[class*="bg-token-main-surface-primary"] { background: ${p.bg} !important; }
[class*="bg-token-main-surface-secondary"] { background: ${p.bgAlt} !important; }
[class*="bg-token-sidebar"] { background: ${p.bgAlt} !important; }
[class*="text-token-text-primary"] { color: ${p.text} !important; }
[class*="text-token-text-secondary"] { color: ${p.textSoft} !important; }
pre, code, [class*="bg-black"] { background: ${p.codeBg} !important; color: ${p.text} !important; }
textarea, input { background: ${p.inputBg} !important; color: ${p.inputFg} !important; border-color: ${p.inputBorder} !important; }
`;
}

function linkedinCss(p) {
  return `
:root {
  --color-background-canvas:    ${p.bg} !important;
  --color-background-container: ${p.bgAlt} !important;
  --color-text:                 ${p.text} !important;
  --color-text-low-emphasis:    ${p.textMuted} !important;
  --color-brand-accent-2:       ${p.accent} !important;
}

html, body,
.scaffold-layout__main,
.scaffold-layout__sidebar,
.scaffold-layout__aside,
.global-nav__content,
.authentication-outlet { background: ${p.bg} !important; color: ${p.text} !important; }

.artdeco-card,
.feed-shared-update-v2,
.pv-top-card,
.msg-thread,
.msg-overlay-list-bubble { background: ${p.bgElevated} !important; border-color: ${p.border} !important; }

.global-nav { background: ${p.bgAlt} !important; border-color: ${p.border} !important; }

input, textarea, select,
.search-global-typeahead__input,
input.artdeco-text-input--input,
.msg-form__contenteditable { background: ${p.inputBg} !important; color: ${p.inputFg} !important; border-color: ${p.inputBorder} !important; }

a, a:visited { color: ${p.link} !important; }
.artdeco-button--primary { background: ${p.buttonBg} !important; color: ${p.buttonFg} !important; border-color: ${p.buttonBg} !important; }
`;
}

const STORAGE_KEY = 'xela_theme_id';
const DEFAULT_THEME_ID = 'xela-space-gray';

let sheet = null;
let currentThemeId = null;
let themes = null; // loaded lazily

// --- Site detection ---
function detectSite() {
  const h = location.hostname;
  if (h === 'github.com' || h.endsWith('.github.com')) return 'github';
  if (h === 'google.com' || h === 'www.google.com') return 'google';
  if (h === 'chatgpt.com' || h === 'chat.openai.com') return 'chatgpt';
  if (h === 'linkedin.com' || h === 'www.linkedin.com') return 'linkedin';
  return 'generic';
}

// --- Theme data loader ---
async function loadThemes() {
  if (themes) return themes;
  const url = chrome.runtime.getURL('themes.json');
  const res = await fetch(url);
  const data = await res.json();
  themes = new Map(data.themes.map(t => [t.id, t]));
  return themes;
}

// --- CSS builder ---
function buildSiteCss(theme) {
  const p = { ...theme.palette, _type: theme.type };
  const site = detectSite();
  const base = buildBaseCss(p);
  const siteSpecific =
    site === 'github'   ? githubCss(p) :
    site === 'google'   ? googleCss(p) :
    site === 'chatgpt'  ? chatgptCss(p) :
    site === 'linkedin' ? linkedinCss(p) : '';
  return base + siteSpecific;
}

function buildBaseCss(p) {
  return `
:root {
  color-scheme: ${p._type === 'light' ? 'light' : 'dark'};
  --xela-bg:           ${p.bg};
  --xela-bg-alt:       ${p.bgAlt};
  --xela-bg-elevated:  ${p.bgElevated};
  --xela-text:         ${p.text};
  --xela-text-muted:   ${p.textMuted};
  --xela-accent:       ${p.accent};
  --xela-border:       ${p.border};
  --xela-link:         ${p.link};
  --xela-selection:    ${p.selection};
  --xela-input-bg:     ${p.inputBg};
  --xela-input-fg:     ${p.inputFg};
  --xela-code-bg:      ${p.codeBg};
  --xela-button-bg:    ${p.buttonBg};
  --xela-button-fg:    ${p.buttonFg};
}
::selection { background: ${p.selection} !important; color: ${p.text} !important; }
* { scrollbar-color: ${p.accent} ${p.bg}; }
`;
}

// --- Injection via adoptedStyleSheets ---
function ensureSheet() {
  if (!sheet) {
    sheet = new CSSStyleSheet();
    document.adoptedStyleSheets = [...document.adoptedStyleSheets.filter(s => s !== sheet), sheet];
  }
}

async function applyTheme(themeId) {
  const map = await loadThemes();
  const theme = map.get(themeId) || map.get(DEFAULT_THEME_ID) || map.values().next().value;
  if (!theme) return;
  currentThemeId = theme.id;

  // Set color-mode attribute for sites that key off it (GitHub)
  document.documentElement.setAttribute('data-xela-theme', theme.id);
  if (detectSite() === 'github') {
    document.documentElement.setAttribute('data-color-mode', theme.type === 'light' ? 'light' : 'dark');
  }

  ensureSheet();
  sheet.replaceSync(buildSiteCss(theme));
  // Re-attach in case document.adoptedStyleSheets was reset by SPA
  if (!document.adoptedStyleSheets.includes(sheet)) {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }
}

// --- SPA navigation harness ---
function interceptHistory() {
  const origPush = history.pushState.bind(history);
  history.pushState = function (...args) {
    origPush(...args);
    reapply();
  };
  const origReplace = history.replaceState.bind(history);
  history.replaceState = function (...args) {
    origReplace(...args);
    reapply();
  };
  window.addEventListener('popstate', reapply);
}

function reapply() {
  if (currentThemeId) applyTheme(currentThemeId);
}

// --- MutationObserver: reattach sheet if adoptedStyleSheets gets cleared ---
let reapplyTimer = null;
function scheduleReapply() {
  if (!sheet) return;
  if (!document.adoptedStyleSheets.includes(sheet)) {
    clearTimeout(reapplyTimer);
    reapplyTimer = setTimeout(reapply, 50);
  }
}
const observer = new MutationObserver(scheduleReapply);

// --- Message listener: popup sends theme changes ---
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'XELA_SET_THEME') {
    applyTheme(msg.themeId);
  }
});

// --- Boot ---
async function boot() {
  const stored = await chrome.storage.sync.get(STORAGE_KEY);
  const themeId = stored[STORAGE_KEY] || DEFAULT_THEME_ID;
  await applyTheme(themeId);
  // Watch documentElement attributes (SPAs change class/data attrs on navigation)
  // and body childList (SPAs re-render body children on route change)
  observer.observe(document.documentElement, { attributes: true, childList: true, subtree: false });
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: false });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, { childList: true, subtree: false });
    }, { once: true });
  }
  interceptHistory();
}

boot();
