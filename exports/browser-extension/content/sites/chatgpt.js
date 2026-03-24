export function buildCss(p) {
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
}

html, body, #__next, main,
[class*="bg-token-main-surface-primary"] {
  background: ${p.bg} !important;
  color: ${p.text} !important;
}

nav, aside,
[class*="bg-token-sidebar-surface-primary"] {
  background: ${p.bgAlt} !important;
  color: ${p.text} !important;
}
[class*="bg-token-sidebar-surface-secondary"] { background: ${p.bgElevated} !important; }
[class*="bg-token-sidebar"] { background: inherit !important; }
[class*="hover:bg-token-sidebar"]:hover,
[aria-current="page"],
[aria-selected="true"] { background: ${p.bgElevated} !important; }

[class*="bg-token-main-surface-secondary"] { background: ${p.bgAlt} !important; }
[class*="bg-token-main-surface-tertiary"] { background: ${p.bgElevated} !important; }
[class*="text-token-text-primary"] { color: ${p.text} !important; }
[class*="text-token-text-secondary"] { color: ${p.textSoft} !important; }
[class*="text-token-text-tertiary"] { color: ${p.textMuted} !important; }
[class*="border-token-border-light"] { border-color: ${p.border} !important; }
[class*="border-token-border-medium"] { border-color: ${p.border} !important; }

[data-message-author-role] { color: ${p.text} !important; }
[data-message-author-role="user"] > div:first-child,
[data-message-author-role="user"] [class*="rounded-3xl"] {
  background: ${p.bgElevated} !important;
  border: 1px solid ${p.border} !important;
}

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

#prompt-textarea,
[data-testid="chat-input"],
[class*="ProseMirror"][contenteditable="true"],
[data-testid="composer-root"] {
  background: ${p.inputBg} !important;
  color: ${p.inputFg} !important;
  border-color: ${p.inputBorder} !important;
}
[data-testid="composer-root"],
form:has(#prompt-textarea) {
  background: ${p.inputBg} !important;
  border: 1px solid ${p.inputBorder} !important;
  box-shadow: none !important;
}

[data-testid="send-button"],
[role="dialog"] button[class*="btn-primary"] {
  background: ${p.accent} !important;
  color: ${p.buttonFg} !important;
  border-color: ${p.accent} !important;
}
[data-testid="model-switcher-dropdown-button"] {
  background: ${p.buttonBg} !important;
  color: ${p.buttonFg} !important;
  border-color: ${p.border} !important;
}

[role="menu"], [role="listbox"], [role="dialog"],
[data-radix-popper-content-wrapper],
[data-testid="overflow-menu"],
.popover, [class*="dropdown"] {
  background: ${p.bgFloating} !important;
  border-color: ${p.border} !important;
  color: ${p.text} !important;
}
[role="menuitem"], [role="option"] { color: ${p.text} !important; }
[role="menuitem"]:hover, [role="option"]:hover,
[role="option"][data-highlighted] { background: ${p.bgElevated} !important; }

[data-state="open"][data-overlay],
[class*="overlay"][class*="fixed"],
.ReactModal__Overlay { background: rgba(0,0,0,0.6) !important; }
`;
}
