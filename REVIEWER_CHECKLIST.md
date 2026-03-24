# Reviewer checklist

- [ ] Code builds and passes linting
- [ ] No noisy `console.log` in production paths
- [ ] Core logic has unit tests (state->roles, sanitization, palette parsing)
- [ ] No large (>500 LOC) single-file changes without modularization
- [ ] Accessibility checks applied (contrast, keyboard nav)
- [ ] CI is set up and green
- [ ] Security scan performed (no secrets)
