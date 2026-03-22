export function buildCss(p) {
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
