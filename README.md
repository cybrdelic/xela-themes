# XELA Themes Extension

World-class theme boilerplate with fast local iteration and packaging.

## What’s included
- Themes: XELA Dark, XELA Black (pure-black UI surfaces).
- Packaging via @vscode/vsce and a robust install script.
- Optional CI workflow for publishing.

## Dev workflow
1) Edit themes
- Add a new file under `themes/` (e.g. `xela-mytheme-color-theme.json`).
- Validate keys against VS Code color schema; prefer transparent overlays where required.

2) Wire up contributes
- In `package.json` add an entry under `contributes.themes`:
	- label: Display name in the picker (e.g., "XELA MyTheme").
	- uiTheme: `vs-dark` | `vs-light` | `hc-black`.
	- path: `./themes/<file>.json`.

3) Test locally
- Press F5 to launch Extension Development Host.
- In the host window, open Command Palette → Color Theme → pick "XELA Black" or "XELA Dark".

4) Package and install locally
```
npm i
npm run package-and-install
```
- This produces a `.vsix` and installs the newest one via the VS Code CLI.

5) Iterate quickly
- Edit JSON → re-run `npm run package-and-install` to apply changes.
- Or reload the Dev Host (Developer: Reload Window) when running via F5.

## DX preset (optional per-project)
- Use the full preset at `presets/xela-black.settings.jsonc` (copy into your repo’s `.vscode/settings.json`).
- Open this repo and VS Code will suggest recommended extensions from `.vscode/extensions.json`.

## Publish (optional)
1) Create a publisher and login: `vsce create-publisher <you>` and `vsce login <you>`.
2) Bump version in `package.json`.
3) Publish:
```
npx @vscode/vsce publish
```
Or upload the generated `.vsix` from `npm run package`.
