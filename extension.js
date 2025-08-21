// XELA preset commands with robust logging and safeguards.

const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const { parse, parseTree, modify, applyEdits } = require('jsonc-parser');

let output;
function getChannel() {
  if (!output) output = vscode.window.createOutputChannel('XELA');
  return output;
}
function log(msg, data) {
  const ch = getChannel();
  const time = new Date().toISOString();
  ch.appendLine(`[${time}] ${msg}`);
  if (data !== undefined) {
    try {
      ch.appendLine(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    } catch {
      ch.appendLine(String(data));
    }
  }
}

/** @param {vscode.ExtensionContext} context */
function activate(context) {
  const showLogs = vscode.commands.registerCommand('xela.showLogs', () => {
    getChannel().show(true);
  });

  const applyAdditive = vscode.commands.registerCommand('xela.applyPreset.additive', async () => {
    try {
      await applyPreset({ overwrite: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage(`XELA preset failed: ${msg}`);
      log('applyPreset(additive) failed', err);
      getChannel().show(true);
    }
  });

  const applyOverwrite = vscode.commands.registerCommand('xela.applyPreset.overwrite', async () => {
    try {
      await applyPreset({ overwrite: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage(`XELA preset failed: ${msg}`);
      log('applyPreset(overwrite) failed', err);
      getChannel().show(true);
    }
  });

  // Global (User) settings variants
  const applyGlobalAdditive = vscode.commands.registerCommand('xela.applyPreset.globalAdditive', async () => {
    try {
      await applyPresetGlobal({ overwrite: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage(`XELA preset (global) failed: ${msg}`);
      log('applyPresetGlobal(additive) failed', err);
      getChannel().show(true);
    }
  });

  const applyGlobalOverwrite = vscode.commands.registerCommand('xela.applyPreset.globalOverwrite', async () => {
    try {
      await applyPresetGlobal({ overwrite: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage(`XELA preset (global) failed: ${msg}`);
      log('applyPresetGlobal(overwrite) failed', err);
      getChannel().show(true);
    }
  });

  const openPreset = vscode.commands.registerCommand('xela.openPreset', async () => {
    try {
      const presetPath = path.join(context.extensionPath, 'presets', 'xela-black.settings.jsonc');
      log('Open preset request', { presetPath });
      const uri = vscode.Uri.file(presetPath);
      vscode.window.showTextDocument(uri, { preview: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      vscode.window.showErrorMessage(`Failed to open preset: ${msg}`);
      log('openPreset failed', err);
      getChannel().show(true);
    }
  });

  context.subscriptions.push(showLogs, applyAdditive, applyOverwrite, applyGlobalAdditive, applyGlobalOverwrite, openPreset);
}

async function pickWorkspaceFolder() {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) return undefined;

  // If only one folder is open, try to be smarter about targeting a project folder inside (e.g., 'xela').
  if (folders.length === 1) {
    const only = folders[0];
    // Prefer the folder that contains the active editor file
    const active = vscode.window.activeTextEditor?.document?.uri;
    if (active) {
      const wf = vscode.workspace.getWorkspaceFolder(active);
      if (wf) return wf;
    }

    // Enumerate immediate child directories that look like projects
    try {
      const entries = await fs.promises.readdir(only.uri.fsPath, { withFileTypes: true });
      const candidates = [];
      for (const d of entries) {
        if (!d.isDirectory()) continue;
        const full = path.join(only.uri.fsPath, d.name);
        const hasPkg = await fileExists(path.join(full, 'package.json'));
        const hasVS = await fileExists(path.join(full, '.vscode'));
        if (hasPkg || hasVS) candidates.push({ name: d.name, fsPath: full });
      }
      // Put 'xela' at the top if present
      candidates.sort((a, b) => {
        if (a.name.toLowerCase() === 'xela') return -1;
        if (b.name.toLowerCase() === 'xela') return 1;
        return a.name.localeCompare(b.name);
      });
      const items = [
        { label: `$(folder) ${only.name} (workspace root)`, description: only.uri.fsPath, kind: 'root' },
        ...candidates.map(c => ({ label: c.name, description: c.fsPath, kind: 'child' }))
      ];
      const picked = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select where to apply the XELA preset (workspace root or a child project)'
      });
      if (!picked) return undefined;
      if (picked.kind === 'root') return only;
      // Return a pseudo WorkspaceFolder-like object for a child path
      return { name: picked.label, index: 1, uri: vscode.Uri.file(picked.description) };
    } catch (e) {
      log('Failed to enumerate child folders', e);
      return only;
    }
  }

  // Multi-root workspace: prefer the folder of the active editor
  const active = vscode.window.activeTextEditor?.document?.uri;
  if (active) {
    const wf = vscode.workspace.getWorkspaceFolder(active);
    if (wf) return wf;
  }
  const selection = await vscode.window.showQuickPick(
    folders.map(f => ({ label: f.name, description: f.uri.fsPath })),
  { placeHolder: 'Select the workspace folder to apply the XELA preset' }
  );
  if (!selection) return undefined;
  return folders.find(f => f.name === selection.label);
}

async function fileExists(p) {
  try {
    await fs.promises.access(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function applyPreset({ overwrite }) {
  log('Begin applyPreset', { overwrite });

  const ext = vscode.extensions.getExtension('cybrdelic.xela-themes');
  if (!ext) {
  throw new Error('Extension metadata not found (cybrdelic.xela-themes). Is the extension installed?');
  }
  const presetPath = path.join(ext.extensionPath, 'presets', 'xela-black.settings.jsonc');
  const presetUri = vscode.Uri.file(presetPath);
  const presetRaw = (await vscode.workspace.fs.readFile(presetUri)).toString();
  let preset;
  try {
    preset = parse(presetRaw);
  } catch (e) {
    log('Failed to parse preset JSONC', e);
    throw new Error('Preset file is invalid JSONC.');
  }

  const folder = await pickWorkspaceFolder();
  if (!folder) {
  throw new Error('No workspace folder selected/open. Open a folder to apply the XELA preset.');
  }

  const wsRoot = folder.uri.fsPath;
  const vsDir = path.join(wsRoot, '.vscode');
  const settingsPath = path.join(vsDir, 'settings.json');
  log('Target workspace + settings', { wsRoot, settingsPath });

  await vscode.window.withProgress(
  { location: vscode.ProgressLocation.Notification, title: 'Applying XELA preset…', cancellable: false },
    async () => {
      try {
        await fs.promises.mkdir(vsDir, { recursive: true });
        let current = '{}';
        try {
          current = await fs.promises.readFile(settingsPath, 'utf8');
        } catch {
          // new file
        }

        // If current JSON is invalid, back it up and start fresh
        let root = undefined;
        try {
          root = parseTree(current);
        } catch (e) {
          const backup = settingsPath + '.bak';
          await fs.promises.writeFile(backup, current, 'utf8');
          log('Invalid settings.json detected; backed up and starting from empty', { backup });
          current = '{}';
          root = parseTree(current);
        }

        let changed = 0, kept = 0;
        for (const [key, value] of Object.entries(preset)) {
          const pathSegments = [key];
          const exists = !!(root && typeof root.getChild === 'function' && root.getChild('properties')?.children?.find(ch => ch.children?.[0]?.value === key));
          if (exists && !overwrite) {
            kept++;
            log('Keeping existing setting (additive mode)', { key });
            continue;
          }
          const newEdits = modify(current, pathSegments, value, {
            formattingOptions: { insertSpaces: true, tabSize: 2, eol: '\n' }
          });
          current = applyEdits(current, newEdits);
          changed++;
          // Update root for subsequent lookups
          root = parseTree(current);
          log('Applied setting', { key });
        }

        await fs.promises.writeFile(settingsPath, current, 'utf8');
        log('Preset application complete', { changed, kept });
  vscode.window.showInformationMessage(`XELA preset applied (${overwrite ? 'overwrite' : 'additive'}). Updated: ${changed}, kept: ${kept}.`);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        log('Error while applying preset', { error: msg });
        throw e;
      }
    }
  );
}

async function applyPresetGlobal({ overwrite }) {
  log('Begin applyPresetGlobal', { overwrite });

  const ext = vscode.extensions.getExtension('cybrdelic.xela-themes');
  if (!ext) {
  throw new Error('Extension metadata not found (cybrdelic.xela-themes). Is the extension installed?');
  }
  const presetPath = path.join(ext.extensionPath, 'presets', 'xela-black.settings.jsonc');
  const presetUri = vscode.Uri.file(presetPath);
  const presetRaw = (await vscode.workspace.fs.readFile(presetUri)).toString();
  let preset;
  try {
    preset = parse(presetRaw);
  } catch (e) {
    log('Failed to parse preset JSONC', e);
    throw new Error('Preset file is invalid JSONC.');
  }

  await vscode.window.withProgress(
  { location: vscode.ProgressLocation.Notification, title: 'Applying XELA preset to User Settings…', cancellable: false },
    async () => {
      const cfg = vscode.workspace.getConfiguration();
      let changed = 0, kept = 0;

      for (const [key, value] of Object.entries(preset)) {
        try {
          const inspected = cfg.inspect(key);
          const existsGlobally = inspected && inspected.globalValue !== undefined;
          if (existsGlobally && !overwrite) {
            kept++;
            log('Keeping existing user setting (additive mode)', { key });
            continue;
          }
          await cfg.update(key, value, vscode.ConfigurationTarget.Global);
          changed++;
          log('Applied user setting', { key });
        } catch (e) {
          log('Failed to apply user setting', { key, error: e instanceof Error ? e.message : String(e) });
          // continue to next key
        }
      }

  log('Global preset application complete', { changed, kept });
  vscode.window.showInformationMessage(`XELA preset applied to User Settings (${overwrite ? 'overwrite' : 'additive'}). Updated: ${changed}, kept: ${kept}.`);
    }
  );
}

// no file-path fallback needed with Configuration API

function deactivate() {}

module.exports = { activate, deactivate };
