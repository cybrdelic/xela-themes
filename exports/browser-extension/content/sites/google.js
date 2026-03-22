export function buildCss(p) {
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
