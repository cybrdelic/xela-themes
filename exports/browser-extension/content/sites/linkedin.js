export function buildCss(p) {
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
