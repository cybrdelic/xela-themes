// XELA Themes — content script
// Injects via document.adoptedStyleSheets (never in DOM, immune to SPA stripping)
// Runs at document_start to beat the site's own CSS load

import { buildCss as githubCss } from './sites/github.js';
import { buildCss as googleCss } from './sites/google.js';
import { buildCss as chatgptCss } from './sites/chatgpt.js';
import { buildCss as linkedinCss } from './sites/linkedin.js';

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
