export function buildCss(p) {
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
