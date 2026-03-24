// XELA Themes — content script (bundled, no imports)
// Injects via document.adoptedStyleSheets (never in DOM, immune to SPA stripping)
// Runs at document_start to beat the site's own CSS load

// --- Site adapters (inlined) ---
function githubCss(p) {
  return `
/* Force GitHub color mode */
html { color-scheme: ${p._type === 'light' ? 'light' : 'dark'} !important; }

/* Override Primer design tokens */
html, [data-color-mode], [data-color-mode="dark"], [data-color-mode="light"],
[data-dark-theme], [data-light-theme] {
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
  --color-header-bg:             ${p.bgAlt} !important;
  --color-header-text:           ${p.text} !important;
  --color-sidenav-selected-bg:   ${p.selection} !important;
  --color-menu-bg-active:        ${p.bgElevated} !important;
  --color-overlay-bg:            ${p.bgFloating} !important;
  --color-shadow-large:          rgba(0,0,0,0.3) !important;
  --color-shadow-medium:         rgba(0,0,0,0.2) !important;
  --color-shadow-small:          rgba(0,0,0,0.1) !important;
  --color-scale-gray-0:          ${p.bg} !important;
  --color-scale-gray-1:          ${p.bgAlt} !important;
  --color-scale-gray-2:          ${p.bgElevated} !important;
  --color-scale-gray-3:          ${p.border} !important;
  --color-scale-gray-4:          ${p.textMuted} !important;
  --color-scale-gray-9:          ${p.text} !important;
  --bgColor-default:             ${p.bg} !important;
  --bgColor-muted:               ${p.bgAlt} !important;
  --bgColor-inset:               ${p.bgElevated} !important;
  --bgColor-emphasis:            ${p.accent} !important;
  --bgColor-overlay:             ${p.bgFloating} !important;
  --fgColor-default:             ${p.text} !important;
  --fgColor-muted:               ${p.textMuted} !important;
  --fgColor-link:                ${p.link} !important;
  --borderColor-default:         ${p.border} !important;
  --borderColor-muted:           ${p.border} !important;
  --borderColor-emphasis:        ${p.accent} !important;
  --control-bgColor-rest:        ${p.buttonBg} !important;
  --control-bgColor-hover:       ${p.accentAlt} !important;
  --control-fgColor-rest:        ${p.buttonFg} !important;
  --control-borderColor-rest:    ${p.border} !important;
  --controlTrack-bgColor-rest:   ${p.bgElevated} !important;
}

/* Base page */
body, .AppHeader, .Header { background: ${p.bg} !important; color: ${p.text} !important; }

/* Top nav / header */
.AppHeader { border-bottom: 1px solid ${p.border} !important; }
.AppHeader-globalBar { background: ${p.bgAlt} !important; }
.AppHeader-localBar { background: ${p.bg} !important; border-bottom: 1px solid ${p.border} !important; }
.Header-link, .AppHeader-link { color: ${p.text} !important; }
.header-search-input, [data-target="qbsearch-input.inputButton"] {
  background: ${p.inputBg} !important;
  color: ${p.text} !important;
  border-color: ${p.border} !important;
}

/* Sidebars, panels */
.Layout-sidebar, .js-repo-sidebar, .repository-content aside,
[data-view-component="true"].Layout { background: ${p.bg} !important; }
.BorderGrid-cell { border-color: ${p.border} !important; }
.SideNav-item { color: ${p.textMuted} !important; }
.SideNav-item:hover, .SideNav-item[aria-current] {
  background: ${p.bgElevated} !important;
  color: ${p.text} !important;
}

/* File tree / code browser */
.PRIVATE_TreeView-item, .TreeView-item {
  background: ${p.bg} !important;
  color: ${p.text} !important;
}
.PRIVATE_TreeView-item:hover { background: ${p.bgElevated} !important; }
.PRIVATE_TreeView-item[aria-selected="true"] { background: ${p.selection} !important; }
.react-directory-filename-column { color: ${p.text} !important; }
.Box.file-navigation-option { background: ${p.bgAlt} !important; }

/* Code / diff view */
.markdown-body { color: ${p.text} !important; background: ${p.bg} !important; }
.markdown-body pre, .markdown-body code { background: ${p.codeBg} !important; color: ${p.text} !important; }
.blob-wrapper, .blob-code, .blob-num {
  background: ${p.bg} !important;
  color: ${p.text} !important;
  border-color: ${p.border} !important;
}
.blob-num { color: ${p.textMuted} !important; }
.blob-code-inner { color: ${p.text} !important; }
.diff-table { background: ${p.bg} !important; }
.blob-code-addition { background: ${p.success}22 !important; }
.blob-code-deletion { background: ${p.error}22 !important; }
.blob-code-hunk { background: ${p.bgElevated} !important; color: ${p.textMuted} !important; }
.file-header { background: ${p.bgAlt} !important; border-color: ${p.border} !important; color: ${p.text} !important; }

/* Command palette */
.prc-Overlay-Overlay, .prc-Dialog-Dialog,
[data-testid="dialog-overlay"], .Overlay-backdrop--center {
  background: rgba(0,0,0,0.5) !important;
}
.prc-ActionList-ActionList, .ActionList,
[data-testid="query-builder-container"],
.command-palette-page-stack {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
}
.prc-ActionList-Item-Label, .ActionList-item-label { color: ${p.text} !important; }
.prc-ActionList-Item-Description, .ActionList-item-description { color: ${p.textMuted} !important; }
.prc-ActionList-item:hover, .ActionList-item:hover,
.prc-ActionList-item[aria-selected="true"] {
  background: ${p.bgElevated} !important;
}
[data-testid="command-palette-input"], .QueryBuilder-InputContainer {
  background: ${p.inputBg} !important;
  color: ${p.text} !important;
  border-color: ${p.border} !important;
}

/* Dropdowns / menus */
.dropdown-menu, .SelectMenu, .SelectMenu-list,
.auto-complete-results, .suggestionList,
[role="menu"], [role="listbox"],
.prc-SelectPanel-SelectPanel {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important;
}
.dropdown-item, .SelectMenu-item, .auto-complete-item,
[role="menuitem"], [role="option"] {
  color: ${p.text} !important;
}
.dropdown-item:hover, .SelectMenu-item:hover,
[role="menuitem"]:hover, [role="option"]:hover,
[role="option"][aria-selected="true"] {
  background: ${p.bgElevated} !important;
  color: ${p.text} !important;
}
.SelectMenu-divider, .dropdown-divider { border-color: ${p.border} !important; }
.SelectMenu-header { background: ${p.bgAlt} !important; color: ${p.text} !important; border-color: ${p.border} !important; }
.SelectMenu-filter { background: ${p.bgAlt} !important; }
.SelectMenu-input { background: ${p.inputBg} !important; color: ${p.text} !important; border-color: ${p.border} !important; }

/* Modals / dialogs */
.Box-overlay, .Overlay, .modal-backdrop { background: rgba(0,0,0,0.5) !important; }
.Box-overlay--modal, .Overlay-body, dialog {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
  box-shadow: 0 16px 48px rgba(0,0,0,0.4) !important;
}
.Overlay-header { background: ${p.bgAlt} !important; border-color: ${p.border} !important; color: ${p.text} !important; }
.Overlay-footer { background: ${p.bgAlt} !important; border-color: ${p.border} !important; }

/* Hover cards / tooltips / popovers */
.Popover-message, .tooltip, .tooltipped::after,
.prc-Tooltip-Tooltip, [data-testid="hover-card-container"] {
  background: ${p.bgFloating} !important;
  color: ${p.text} !important;
  border-color: ${p.border} !important;
}
.hovercard-content { background: ${p.bgFloating} !important; border-color: ${p.border} !important; }
.user-hovercard { background: ${p.bgFloating} !important; border-color: ${p.border} !important; }

/* Notifications / alerts */
.flash, .flash-notice { background: ${p.bgElevated} !important; color: ${p.text} !important; border-color: ${p.border} !important; }
.flash-warn { background: ${p.warning}22 !important; border-color: ${p.warning} !important; }
.flash-error { background: ${p.error}22 !important; border-color: ${p.error} !important; }
.flash-success { background: ${p.success}22 !important; border-color: ${p.success} !important; }
.js-notification-shelf { background: ${p.bgAlt} !important; border-color: ${p.border} !important; }

/* PR review / comments */
.timeline-comment, .review-comment, .inline-comment {
  background: ${p.bgElevated} !important;
  border-color: ${p.border} !important;
}
.timeline-comment-header { background: ${p.bgAlt} !important; border-color: ${p.border} !important; color: ${p.text} !important; }
.review-thread-component { background: ${p.bgFloating} !important; }
.discussion-timeline .timeline-comment-wrapper { background: ${p.bgElevated} !important; }

/* Issues / PR list */
.Box, .Box-row { background: ${p.bg} !important; border-color: ${p.border} !important; color: ${p.text} !important; }
.Box-row:hover { background: ${p.bgAlt} !important; }
.IssueLabel { border-width: 1px !important; }

/* Inputs, textareas, selects */
input, textarea, select, .CodeMirror,
[role="textbox"], .comment-form-textarea {
  background: ${p.inputBg} !important;
  color: ${p.text} !important;
  border-color: ${p.border} !important;
}
input:focus, textarea:focus { border-color: ${p.accent} !important; }
.form-control { background: ${p.inputBg} !important; color: ${p.text} !important; border-color: ${p.border} !important; }

/* Buttons */
.btn { background: ${p.buttonBg} !important; color: ${p.buttonFg} !important; border-color: ${p.border} !important; }
.btn-primary { background: ${p.accent} !important; border-color: ${p.accent} !important; color: ${p.buttonFg} !important; }
.btn-danger { background: ${p.error} !important; border-color: ${p.error} !important; color: #fff !important; }
.btn:hover { background: ${p.accentAlt} !important; }

/* Tab nav */
.UnderlineNav-item, .tabnav-tab { color: ${p.textMuted} !important; border-color: transparent !important; }
.UnderlineNav-item:hover, .tabnav-tab:hover { color: ${p.text} !important; }
.UnderlineNav-item[aria-current], .tabnav-tab.selected {
  color: ${p.text} !important;
  border-bottom-color: ${p.accent} !important;
}

/* Counters / badges */
.Counter { background: ${p.bgElevated} !important; color: ${p.textMuted} !important; }

/* Search / quick open overlay */
.search-results-container { background: ${p.bgFloating} !important; border-color: ${p.border} !important; }
.search-result { background: ${p.bgFloating} !important; color: ${p.text} !important; }
.search-result:hover, .search-result.navigation-focus { background: ${p.bgElevated} !important; }

/* Footer */
.footer { background: ${p.bgAlt} !important; color: ${p.textMuted} !important; border-color: ${p.border} !important; }
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
  --gm3-sys-color-primary-container:        ${p.selection} !important;
  --gm3-sys-color-on-primary-container:     ${p.text} !important;
  --gm3-sys-color-secondary:                ${p.accentAlt} !important;
  --gm3-sys-color-on-secondary:             ${p.buttonFg} !important;
  --gm3-sys-color-secondary-container:      ${p.bgElevated} !important;
  --gm3-sys-color-on-secondary-container:   ${p.text} !important;
  --gm3-sys-color-surface-container-highest: ${p.bgFloating} !important;
  --gm3-sys-color-surface-container-high:   ${p.bgElevated} !important;
  --gm3-sys-color-surface-container:        ${p.bgAlt} !important;
  --gm3-sys-color-surface-container-low:    ${p.bg} !important;
  --gm3-sys-color-surface-container-lowest: ${p.bg} !important;
  --gm3-sys-color-inverse-surface:          ${p.text} !important;
  --gm3-sys-color-inverse-on-surface:       ${p.bg} !important;
  --gm3-sys-color-scrim:                    rgba(0,0,0,0.5) !important;
}

/* Base */
body, #searchform, .sfbg, #appbar, #top_nav, #hdtb,
.UUbT9, #cnt, #rcnt, #center_col, #rhs, #botstuff {
  background: ${p.bg} !important;
  color: ${p.text} !important;
}

/* Top bar / nav */
#gb, #gbz, #gbg, .gb_qe, .gb_se {
  background: ${p.bgAlt} !important;
  border-bottom: 1px solid ${p.border} !important;
}
.gb_qe a, .gb_1d, .gb_ef { color: ${p.text} !important; }

/* Search box */
.RNNXgb, .a4bIc, .gLFyf, .APjFqb, .A8SBwf,
form[role="search"], .SDkEP, .Ax4B8,
[data-hveid] form, .search-box {
  background: ${p.inputBg} !important;
  color: ${p.inputFg} !important;
  border-color: ${p.inputBorder} !important;
}
.gLFyf, .APjFqb { color: ${p.inputFg} !important; caret-color: ${p.accent} !important; }
.RNNXgb:hover, .A8SBwf:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important; }

/* Autocomplete dropdown */
.aajZCb, .sbdd_a, ul[role="listbox"],
.erkvQe, .pcHVKc, .OBMEnb {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3) !important;
}
.sbct, .sbct td, li[role="presentation"] {
  background: ${p.bgFloating} !important;
  color: ${p.text} !important;
}
.sbct:hover, li[role="presentation"]:hover,
.sbhl, [aria-selected="true"] {
  background: ${p.bgElevated} !important;
}
.sbqs_c, .pcHVKc b { color: ${p.textMuted} !important; }

/* Search results */
.MjjYud, .tF2Cxc, .g, .rc, .srKDX,
.hlcw0c, .v7W49e, .IsZvec, .N54PNb, .yuRUbf {
  background: ${p.bgAlt} !important;
  color: ${p.text} !important;
}
.tF2Cxc { border-color: ${p.border} !important; }
h3, .LC20lb, .DKV0Md { color: ${p.link} !important; }
.VuuXrf, .qLRx3b, cite, .tjvcx { color: ${p.success} !important; }
.st, .VwiC3b, .lyLwlc { color: ${p.textMuted} !important; }
a:link { color: ${p.link} !important; }
a:visited { color: ${p.textMuted} !important; }

/* Knowledge panel / info cards */
.kno-rdesc, .kno-ecr-st, .SPZz6b, .wDYxhc,
.osrp-blk, .I6TXqe, .Wnoohf, .yp1CPe,
.xGj6Pb, .kno-ftr {
  background: ${p.bgElevated} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
}
.kno-title, .qrShPb { color: ${p.text} !important; }
.kno-sh { color: ${p.textMuted} !important; }

/* Top stories / news cards */
.WlydOe, .JJZKK, .nChh6e, .S1FAPd, .r5a77b,
.ftSUBd, .Dbxj2 {
  background: ${p.bgAlt} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
}

/* Image search */
#irc_bg, #irc-su, .irc_c { background: ${p.bg} !important; }
.irc_msc { background: ${p.bgAlt} !important; border-color: ${p.border} !important; }

/* Tabs / filter chips */
#hdtb-msb, .oBQgpc, .T47uwc, .rQEFy,
[jsname="haAclf"], .YmvwI {
  background: ${p.bg} !important;
  border-color: ${p.border} !important;
}
.oBQgpc .item, .T47uwc a, .rQEFy a { color: ${p.textMuted} !important; }
.oBQgpc .item.HzV7m-pbTTYe, .rQEFy a.rQEFy {
  color: ${p.text} !important;
  border-bottom-color: ${p.accent} !important;
}

/* Settings panel / tools panel */
#hdtb-tls, .OOHai, .rVLSBd, .LJ7wUe {
  background: ${p.bgAlt} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
}

/* Footer */
#footcnt, #footer, .TuS8Ad {
  background: ${p.bgAlt} !important;
  border-color: ${p.border} !important;
  color: ${p.textMuted} !important;
}
`;
}

function chatgptCss(p) {
  return `
:root {
  --token-main-surface-primary:       ${p.bg} !important;
  --token-main-surface-secondary:     ${p.bgAlt} !important;
  --token-main-surface-tertiary:      ${p.bgElevated} !important;
  --token-sidebar-surface-primary:    ${p.bgAlt} !important;
  --token-sidebar-surface-secondary:  ${p.bgElevated} !important;
  --token-message-surface:            ${p.bgElevated} !important;
  --token-text-primary:               ${p.text} !important;
  --token-text-secondary:             ${p.textSoft} !important;
  --token-text-tertiary:              ${p.textMuted} !important;
  --token-text-quaternary:            ${p.textMuted} !important;
  --token-text-error:                 ${p.error} !important;
  --token-text-positive:              ${p.success} !important;
  --token-text-warning:               ${p.warning} !important;
  --token-border-light:               ${p.border} !important;
  --token-border-medium:              ${p.border} !important;
  --token-border-heavy:               ${p.border} !important;
  --token-brand-purple:               ${p.accent} !important;
  --token-brand-green:                ${p.success} !important;
  --token-input-bg:                   ${p.inputBg} !important;
  --token-button-bg:                  ${p.buttonBg} !important;
  --token-button-text:                ${p.buttonFg} !important;
  --background-token-main-surface-primary:    ${p.bg} !important;
  --background-token-sidebar-surface-primary: ${p.bgAlt} !important;
  --background-token-main-surface-secondary:  ${p.bgAlt} !important;
  --surface-primary:                  ${p.bg} !important;
  --surface-secondary:                ${p.bgAlt} !important;
  --surface-tertiary:                 ${p.bgElevated} !important;
  --text-primary:                     ${p.text} !important;
  --text-secondary:                   ${p.textSoft} !important;
  --text-tertiary:                    ${p.textMuted} !important;
  --composer-surface:                 ${p.inputBg} !important;
  --composer-border:                  ${p.inputBorder} !important;
  --xela-chatgpt-overlay:             rgba(0,0,0,0.62) !important;
}

/* Base */
html, body, #__next, main,
[class*="bg-token-main-surface-primary"] {
  background: ${p.bg} !important;
  color: ${p.text} !important;
}

/* Sidebar / nav */
nav, aside,
[class*="bg-token-sidebar-surface-primary"] {
  background: ${p.bgAlt} !important;
  color: ${p.text} !important;
}
[class*="bg-token-sidebar-surface-secondary"] {
  background: ${p.bgElevated} !important;
}

/* Conversation list items */
[class*="bg-token-sidebar"] { background: inherit !important; }
[class*="hover:bg-token-sidebar"]:hover,
[aria-current="page"],
[aria-selected="true"] {
  background: ${p.bgElevated} !important;
}
a[class*="group"] { color: ${p.text} !important; }
a[class*="group"]:hover { background: ${p.bgElevated} !important; }

/* Chat area */
[class*="bg-token-main-surface-secondary"] { background: ${p.bgAlt} !important; }
[class*="bg-token-main-surface-tertiary"] { background: ${p.bgElevated} !important; }
[class*="text-token-text-primary"] { color: ${p.text} !important; }
[class*="text-token-text-secondary"] { color: ${p.textSoft} !important; }
[class*="text-token-text-tertiary"] { color: ${p.textMuted} !important; }
[class*="border-token-border-light"] { border-color: ${p.border} !important; }
[class*="border-token-border-medium"] { border-color: ${p.border} !important; }

/* Message bubbles */
[data-message-author-role] { color: ${p.text} !important; }
[data-message-author-role="assistant"] {
  background: transparent !important;
}
[data-message-author-role="user"] > div:first-child,
[data-message-author-role="user"] [class*="rounded-3xl"] {
  background: ${p.bgElevated} !important;
  border: 1px solid ${p.border} !important;
}

/* Assistant message surface */
[data-message-author-role="assistant"] .markdown { color: ${p.text} !important; }
[data-message-author-role="user"] .whitespace-pre-wrap { color: ${p.text} !important; }

/* Code blocks */
pre, pre code,
[data-testid*="code"],
.hljs, [class*="language-"], [class*="code-block"] {
  background: ${p.codeBg} !important;
  color: ${p.text} !important;
  border-color: ${p.border} !important;
}
code:not(pre code),
kbd {
  background: ${p.bgElevated} !important;
  color: ${p.text} !important;
  border: 1px solid ${p.border} !important;
}
pre .hljs, pre code { background: transparent !important; }
[class*="codeBlock"], [class*="code-header"] {
  background: ${p.bgElevated} !important;
  color: ${p.textMuted} !important;
}

/* Input area */
#prompt-textarea,
[data-testid="chat-input"],
[class*="ProseMirror"][contenteditable="true"],
[data-testid="composer-root"] {
  background: ${p.inputBg} !important;
  color: ${p.inputFg} !important;
  border-color: ${p.inputBorder} !important;
}
#prompt-textarea::placeholder,
[class*="ProseMirror"][contenteditable="true"]::before {
  color: ${p.textMuted} !important;
}
[data-testid="composer-root"],
form:has(#prompt-textarea) {
  background: ${p.inputBg} !important;
  border: 1px solid ${p.inputBorder} !important;
  box-shadow: none !important;
}

/* Buttons */
[data-testid="send-button"],
[role="dialog"] button[class*="btn-primary"] {
  background: ${p.accent} !important;
  color: ${p.buttonFg} !important;
  border-color: ${p.accent} !important;
}
button[class*="btn-neutral"],
[data-testid="composer-root"] button:not([data-testid="send-button"]),
[data-testid="model-switcher-dropdown-button"] {
  background: ${p.buttonBg} !important;
  color: ${p.buttonFg} !important;
  border-color: ${p.border} !important;
}

/* Dropdowns / menus / popovers */
[role="menu"], [role="listbox"], [role="dialog"],
[data-radix-popper-content-wrapper],
[data-testid="overflow-menu"],
.popover, [class*="dropdown"] {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4) !important;
}
[role="menuitem"], [role="option"] {
  color: ${p.text} !important;
}
[role="menuitem"]:hover, [role="option"]:hover,
[role="option"][data-highlighted] {
  background: ${p.bgElevated} !important;
}

/* Model selector */
[data-testid="model-switcher-dropdown-button"],
[data-testid="model-selector"] {
  background: ${p.buttonBg} !important;
  color: ${p.text} !important;
  border-color: ${p.border} !important;
}
[data-testid="model-switcher-popover"] {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
}

/* Settings modal */
[data-testid="settings-dialog"], [data-testid="settings-modal"],
[role="dialog"][class*="settings"] {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
}

/* Modals / overlays */
[data-state="open"][role="dialog"],
[class*="modal"], .ReactModal__Content {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
}
[data-radix-popper-content-wrapper] [role="dialog"] {
  background: ${p.bgFloating} !important;
}
[data-state="open"][data-overlay],
[class*="overlay"][class*="fixed"],
.ReactModal__Overlay {
  background: rgba(0,0,0,0.6) !important;
}

/* User avatar area / account menu */
[data-testid="profile-button"], [data-testid="user-menu"] {
  background: transparent !important;
  color: ${p.text} !important;
}

/* File attachment area */
[class*="attachment"], [data-testid="file-attachment"] {
  background: ${p.bgElevated} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
}

/* Tool call / function blocks */
[class*="tool-call"], [class*="tool_call"],
[data-testid*="tool"], [class*="function-call"] {
  background: ${p.bgElevated} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
}

/* Scrollbar */
* { scrollbar-color: ${p.accent} ${p.bgAlt}; }
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: ${p.bgAlt}; }
::-webkit-scrollbar-thumb { background: ${p.border}; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: ${p.accent}; }

/* Dividers / separators */
hr, [class*="divider"], [class*="separator"] {
  border-color: ${p.border} !important;
}

/* Markdown in messages */
.markdown h1, .markdown h2, .markdown h3 { color: ${p.text} !important; }
.markdown a { color: ${p.link} !important; }
.markdown blockquote { border-left-color: ${p.border} !important; color: ${p.textMuted} !important; }
.markdown table th, .markdown table td { border-color: ${p.border} !important; }
.markdown table th { background: ${p.bgElevated} !important; }
.markdown table tr:nth-child(even) { background: ${p.bgAlt} !important; }
`;
}

function linkedinCss(p) {
  return `
:root {
  --color-background-canvas:          ${p.bg} !important;
  --color-background-container:       ${p.bgAlt} !important;
  --color-background-container-tint:  ${p.bgElevated} !important;
  --color-background-scrim:           rgba(0,0,0,0.6) !important;
  --color-text:                       ${p.text} !important;
  --color-text-low-emphasis:          ${p.textMuted} !important;
  --color-text-on-dark:               ${p.text} !important;
  --color-brand-accent-2:             ${p.accent} !important;
  --color-action:                     ${p.accent} !important;
  --color-action-low-emphasis:        ${p.selection} !important;
  --color-border:                     ${p.border} !important;
  --color-border-low-emphasis:        ${p.border} !important;
  --color-signal-error:               ${p.error} !important;
  --color-signal-success:             ${p.success} !important;
  --color-signal-warning:             ${p.warning} !important;
}

/* Base */
html, body,
.scaffold-layout__main,
.scaffold-layout__sidebar,
.scaffold-layout__aside,
.global-nav__content,
.authentication-outlet { background: ${p.bg} !important; color: ${p.text} !important; }

/* Top navigation */
.global-nav {
  background: ${p.bgAlt} !important;
  border-bottom: 1px solid ${p.border} !important;
}
.global-nav__primary-items a,
.global-nav__secondary-items a,
.nav-item__icon { color: ${p.textMuted} !important; }
.global-nav__primary-items a:hover,
.global-nav__primary-items a[aria-current] { color: ${p.text} !important; }
.global-nav__primary-items a[aria-current]::after { background: ${p.accent} !important; }

/* Search box */
.search-global-typeahead__input,
.global-nav-search,
.search-global-typeahead {
  background: ${p.inputBg} !important;
  color: ${p.inputFg} !important;
  border-color: ${p.inputBorder} !important;
}

/* Search autocomplete dropdown */
.search-global-typeahead__overlay,
.basic-typeahead__dropdown,
[data-test-global-typeahead-list] {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important;
}
.search-global-typeahead__overlay li { color: ${p.text} !important; }
.search-global-typeahead__overlay li:hover,
.search-global-typeahead__overlay li[aria-selected="true"] {
  background: ${p.bgElevated} !important;
}

/* Feed cards */
.artdeco-card,
.feed-shared-update-v2,
.pv-top-card,
.scaffold-finite-scroll__content > li {
  background: ${p.bgElevated} !important;
  border-color: ${p.border} !important;
}

/* Profile / people cards */
.pv-top-card { background: ${p.bgElevated} !important; }
.pv-top-card--photo { border-color: ${p.bg} !important; }
.pv-shared-text-with-see-more span { color: ${p.text} !important; }
.pv-profile-section { background: ${p.bgElevated} !important; border-color: ${p.border} !important; }
.profile-rail-card { background: ${p.bgElevated} !important; border-color: ${p.border} !important; }

/* Hover cards */
.ember-hoverable-trigger__overlay, .artdeco-hover-card,
[data-test-hover-card] {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important;
}

/* Dropdown menus */
.artdeco-dropdown__content,
.artdeco-dropdown__content-inner,
[data-test-dropdown-content] {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important;
  color: ${p.text} !important;
}
.artdeco-dropdown__item { color: ${p.text} !important; }
.artdeco-dropdown__item:hover { background: ${p.bgElevated} !important; }
.artdeco-dropdown__separator { border-color: ${p.border} !important; }

/* Modals / dialogs */
.artdeco-modal, .artdeco-modal__content,
[data-test-modal], .ember-modal-dialog,
.ReactModal__Content {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
}
.artdeco-modal__header { background: ${p.bgAlt} !important; border-color: ${p.border} !important; color: ${p.text} !important; }
.artdeco-modal-overlay, .ReactModal__Overlay { background: rgba(0,0,0,0.6) !important; }

/* Messaging */
.msg-thread,
.msg-overlay-list-bubble,
.msg-overlay-bubble-header,
.msg-overlay-conversation-listitem,
.msg-s-message-group__meta,
.msg-form__contenteditable,
.msg-conversations-container {
  background: ${p.bgElevated} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
}
.msg-s-event-listitem__body { color: ${p.text} !important; }
.msg-s-event-listitem--other .msg-s-event-listitem__message-bubble {
  background: ${p.bgAlt} !important;
  color: ${p.text} !important;
}
.msg-s-event-listitem--self .msg-s-event-listitem__message-bubble {
  background: ${p.accent} !important;
  color: ${p.buttonFg} !important;
}
.msg-overlay-list-bubble { box-shadow: 0 4px 16px rgba(0,0,0,0.3) !important; }
.msg-overlay-bubble-header { background: ${p.bgAlt} !important; border-color: ${p.border} !important; }

/* Notification panel */
.notifications-container,
[data-test-notifications-list],
.artdeco-list__item--notification {
  background: ${p.bgElevated} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
}
.notification-badge { background: ${p.accent} !important; }

/* Inputs */
input, textarea, select,
input.artdeco-text-input--input,
.msg-form__contenteditable,
[contenteditable] {
  background: ${p.inputBg} !important;
  color: ${p.inputFg} !important;
  border-color: ${p.inputBorder} !important;
}
input:focus, textarea:focus { border-color: ${p.accent} !important; }

/* Buttons */
.artdeco-button--primary {
  background: ${p.accent} !important;
  color: ${p.buttonFg} !important;
  border-color: ${p.accent} !important;
}
.artdeco-button--secondary {
  background: transparent !important;
  color: ${p.accent} !important;
  border-color: ${p.accent} !important;
}
.artdeco-button--tertiary { color: ${p.accent} !important; }
.artdeco-button--muted { color: ${p.textMuted} !important; }
.artdeco-button:hover { background: ${p.bgElevated} !important; }

/* Links */
a, a:visited { color: ${p.link} !important; }
a:hover { color: ${p.accent} !important; }

/* Sidebar promo widgets */
.ad-banner-container,
.artdeco-card.pv-premium-upsell-prompt {
  background: ${p.bgElevated} !important;
  border-color: ${p.border} !important;
}

/* Job cards */
.job-card-container,
.jobs-search-results__list-item,
[data-job-id] {
  background: ${p.bgElevated} !important;
  border-color: ${p.border} !important;
}
.job-card-container:hover { background: ${p.bgAlt} !important; }
.job-card-list__title { color: ${p.link} !important; }
.job-card-container__company-name { color: ${p.textMuted} !important; }

/* Skills / endorsements / pills */
.artdeco-entity-lockup__title { color: ${p.text} !important; }
.artdeco-entity-lockup__subtitle { color: ${p.textMuted} !important; }

/* Scrollbar */
* { scrollbar-color: ${p.accent} ${p.bgAlt}; }
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: ${p.bgAlt}; }
::-webkit-scrollbar-thumb { background: ${p.border}; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: ${p.accent}; }

/* Dividers */
hr, .artdeco-divider { border-color: ${p.border} !important; }
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
  const site = detectSite();

  // Set color-mode attribute for sites that key off it (GitHub)
  document.documentElement.setAttribute('data-xela-theme', theme.id);
  document.documentElement.setAttribute('data-xela-site', site);
  if (site === 'github') {
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
