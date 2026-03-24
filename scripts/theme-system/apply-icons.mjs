#!/usr/bin/env node
/**
 * apply-icons.mjs
 * Applies a pre-generated xela icon set to Windows.
 * Sets file-type icons via HKCU registry and folder icons via desktop.ini.
 *
 * Usage:
 *   node apply-icons.mjs --theme "XELA Arctic"
 *   node apply-icons.mjs          (uses currently applied WT scheme)
 *   node apply-icons.mjs --restore (remove all xela icon overrides)
 */

import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import {
  resolveWindowsTerminalSettingsPath,
  readWindowsTerminalSettingsFile,
  resolveEffectiveWindowsTerminalSchemeName
} from './windows-terminal-utils.mjs';

// ---------------------------------------------------------------------------
// File type → icon id mapping
// ---------------------------------------------------------------------------

const FILE_TYPE_MAP = {
  js:     ['.js', '.mjs', '.cjs'],
  ts:     ['.ts', '.mts', '.cts'],
  jsx:    ['.jsx', '.tsx'],
  py:     ['.py', '.pyw'],
  html:   ['.html', '.htm'],
  css:    ['.css', '.scss', '.sass', '.less'],
  json:   ['.json', '.jsonc'],
  md:     ['.md', '.mdx'],
  txt:    ['.txt', '.log'],
  pdf:    ['.pdf'],
  db:     ['.sql', '.db', '.sqlite', '.sqlite3'],
  env:    ['.ini', '.toml', '.yaml', '.yml'],
  git:    ['.patch', '.diff'],
  lock:   ['.lock'],
  zip:    ['.zip', '.tar', '.gz', '.rar', '.7z'],
  img:    ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.tiff', '.ico'],
  video:  ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
  audio:  ['.mp3', '.wav', '.flac', '.aac', '.ogg'],
  exe:    ['.exe', '.msi'],
  generic: ['.stl', '.obj', '.fbx', '.gltf', '.glb', '.3ds', '.blend'],
};

// System folders: icon-id → path resolver
function getSystemFolders(env = process.env) {
  const home = env.USERPROFILE || env.HOME || '';
  const folders = [
    { id: 'documents',   path: path.join(home, 'Documents') },
    { id: 'downloads',   path: path.join(home, 'Downloads') },
    { id: 'desktop',     path: path.join(home, 'Desktop') },
    { id: 'pictures',    path: path.join(home, 'Pictures') },
    { id: 'music',       path: path.join(home, 'Music') },
    { id: 'projects',    path: path.join(home, 'projects') },
  ];
  return folders.filter((f) => fs.existsSync(f.path));
}

// ---------------------------------------------------------------------------
// Registry helpers
// ---------------------------------------------------------------------------

function regAdd(key, name, value, type = 'REG_SZ') {
  const result = spawnSync('reg.exe', [
    'add', key,
    '/v', name,
    '/t', type,
    '/d', value,
    '/f'
  ], { stdio: 'pipe' });
  if (result.status !== 0) {
    throw new Error(`reg add failed for ${key}\\${name}: ${result.stderr?.toString()}`);
  }
}

function regAddDefault(key, value) {
  const result = spawnSync('reg.exe', [
    'add', key,
    '/ve',
    '/t', 'REG_SZ',
    '/d', value,
    '/f'
  ], { stdio: 'pipe' });
  if (result.status !== 0) {
    throw new Error(`reg add failed for ${key} default: ${result.stderr?.toString()}`);
  }
}

function regDelete(key) {
  spawnSync('reg.exe', ['delete', key, '/f'], { stdio: 'ignore' });
}

// ---------------------------------------------------------------------------
// Folder icon helpers
// ---------------------------------------------------------------------------

function setFolderIcon(folderPath, icoPath) {
  const desktopIni = path.join(folderPath, 'desktop.ini');
  const content = [
    '[.ShellClassInfo]',
    `IconResource=${icoPath},0`,
    `IconFile=${icoPath}`,
    'IconIndex=0',
    '[ViewState]',
    'Mode=',
    'Vid=',
    'FolderType=Generic',
    ''
  ].join('\r\n');

  // Remove existing hidden/system attributes so we can write
  spawnSync('attrib', ['-H', '-S', desktopIni], { stdio: 'ignore' });
  fs.writeFileSync(desktopIni, content, 'utf8');

  // Mark folder as system (needed for Explorer to read desktop.ini)
  // and desktop.ini as hidden+system
  spawnSync('attrib', ['+S', folderPath], { stdio: 'ignore' });
  spawnSync('attrib', ['+H', '+S', desktopIni], { stdio: 'ignore' });
}

function removeFolderIcon(folderPath) {
  const desktopIni = path.join(folderPath, 'desktop.ini');
  if (!fs.existsSync(desktopIni)) return;
  spawnSync('attrib', ['-H', '-S', desktopIni], { stdio: 'ignore' });
  spawnSync('attrib', ['-S', folderPath], { stdio: 'ignore' });
  fs.unlinkSync(desktopIni);
}

// ---------------------------------------------------------------------------
// Shell / desktop icon helpers (CLSID-based)
// ---------------------------------------------------------------------------

const SHELL_CLSID_MAP = [
  {
    id: 'this-pc',
    label: 'This PC',
    clsid: '{20D04FE0-3AEA-1069-A2D8-08002B30309D}',
    values: [{ name: null, iconId: 'this-pc' }]
  },
  {
    id: 'network',
    label: 'Network',
    clsid: '{F02C1A0D-BE21-4350-88B0-7367FC96EF3C}',
    values: [{ name: null, iconId: 'network' }]
  },
  {
    id: 'user-folder',
    label: 'User Folder',
    clsid: '{59031a47-3f72-44a7-89c5-5595fe6b30ee}',
    values: [{ name: null, iconId: 'user-folder' }]
  },
  {
    id: 'recycle-bin',
    label: 'Recycle Bin',
    clsid: '{645FF040-5081-101B-9F08-00AA002F954E}',
    values: [
      { name: null,    iconId: 'recycle-empty' },
      { name: 'empty', iconId: 'recycle-empty' },
      { name: 'full',  iconId: 'recycle-full'  }
    ]
  },
  {
    id: 'videos',
    label: 'Videos',
    clsid: '{A0953C92-50DC-43BF-BE83-3742FED03C9C}',
    values: [{ name: null, iconId: 'videos' }]
  },
  {
    id: 'libraries',
    label: 'Libraries',
    clsid: '{031E4825-7B94-4dc3-B131-E946B44C8DD5}',
    values: [{ name: null, iconId: 'libraries' }]
  },
  {
    id: 'onedrive',
    label: 'OneDrive',
    clsid: '{018D5C66-4533-4307-9B53-224DE2ED1FE6}',
    values: [{ name: null, iconId: 'onedrive' }]
  },
  {
    id: 'quick-access',
    label: 'Quick Access',
    clsid: '{679f85cb-0220-4080-b29b-5540cc05aab6}',
    values: [{ name: null, iconId: 'quick-access' }]
  }
];

function applyShellIcons(icons) {
  let count = 0;
  for (const entry of SHELL_CLSID_MAP) {
    const key = `HKCU\\Software\\Classes\\CLSID\\${entry.clsid}\\DefaultIcon`;
    for (const { name, iconId } of entry.values) {
      const icoPath = icons[iconId];
      if (!icoPath || !fs.existsSync(icoPath)) continue;
      try {
        if (name) {
          regAdd(key, name, `${icoPath},0`);
        } else {
          regAddDefault(key, `${icoPath},0`);
        }
        count++;
      } catch (err) {
        console.warn(`  warn: ${entry.label}: ${err.message}`);
      }
    }
  }
  console.log(`  Shell icons: ${count} CLSID values set`);
}

function applyDriveIcons(icons) {
  const icoPath = icons['drive'];
  if (!icoPath || !fs.existsSync(icoPath)) return;
  const driveKey = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\DriveIcons';
  // Apply to all common drive letters
  for (const letter of ['C', 'D', 'E', 'F']) {
    try {
      regAddDefault(`${driveKey}\\${letter}\\DefaultIcon`, `${icoPath},0`);
    } catch {
      // Drive may not exist — silently skip
    }
  }
  console.log(`  Drive icons: set`);
}

function removeDriveIcons() {
  const driveKey = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\DriveIcons';
  for (const letter of ['C', 'D', 'E', 'F']) {
    regDelete(`${driveKey}\\${letter}\\DefaultIcon`);
  }
}

function removeShellIcons() {
  for (const entry of SHELL_CLSID_MAP) {
    regDelete(`HKCU\\Software\\Classes\\CLSID\\${entry.clsid}\\DefaultIcon`);
  }
  removeDriveIcons();
}

// ---------------------------------------------------------------------------
// Explorer refresh
// ---------------------------------------------------------------------------

function refreshExplorer() {
  const ps = [
    'Add-Type -TypeDefinition @"',
    'using System;',
    'using System.Runtime.InteropServices;',
    'public class XelaShell {',
    '  [DllImport("shell32.dll")]',
    '  public static extern void SHChangeNotify(uint eventId, uint flags, IntPtr item1, IntPtr item2);',
    '}',
    '"@',
    '[XelaShell]::SHChangeNotify(0x08000000, 0x0000, [IntPtr]::Zero, [IntPtr]::Zero)'
  ].join('\n');

  spawnSync('powershell.exe', ['-NoProfile', '-Command', ps], { stdio: 'ignore' });
}

// ---------------------------------------------------------------------------
// Restore (remove all overrides)
// ---------------------------------------------------------------------------

function restore() {
  console.log('Removing xela file type icon overrides...');
  for (const exts of Object.values(FILE_TYPE_MAP)) {
    for (const ext of exts) {
      regDelete(`HKCU\\Software\\Classes\\${ext}\\DefaultIcon`);
    }
  }
  // Remove generic folder override
  regDelete('HKCU\\Software\\Classes\\Folder\\DefaultIcon');

  console.log('Removing folder desktop.ini overrides...');
  for (const folder of getSystemFolders()) {
    removeFolderIcon(folder.path);
  }

  console.log('Removing shell/desktop icon overrides...');
  removeShellIcons();

  refreshExplorer();
  console.log('Restored. Restart File Explorer if icons still appear.');
}

// ---------------------------------------------------------------------------
// Apply
// ---------------------------------------------------------------------------

function sanitizeId(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function loadEnv() {
  const envPath = path.resolve('.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}

async function apply(manifest) {
  const { themeName, icons } = manifest;
  console.log(`Applying icons for: ${themeName}`);

  let fileTypeCount = 0;
  let folderCount = 0;
  let errorCount = 0;

  // File type icons
  for (const [iconId, exts] of Object.entries(FILE_TYPE_MAP)) {
    const icoPath = icons[iconId];
    if (!icoPath || !fs.existsSync(icoPath)) continue;
    for (const ext of exts) {
      try {
        regAddDefault(`HKCU\\Software\\Classes\\${ext}\\DefaultIcon`, `${icoPath},0`);
        fileTypeCount++;
      } catch (err) {
        console.warn(`  warn: ${ext}: ${err.message}`);
        errorCount++;
      }
    }
  }
  console.log(`  File type icons: ${fileTypeCount} extensions set`);

  // Generic folder icon (all folders)
  const folderIco = icons['folder'];
  if (folderIco && fs.existsSync(folderIco)) {
    try {
      regAddDefault('HKCU\\Software\\Classes\\Folder\\DefaultIcon', `${folderIco},0`);
      console.log(`  Generic folder icon: set`);
    } catch (err) {
      console.warn(`  warn: folder icon: ${err.message}`);
      errorCount++;
    }
  }

  // System folder icons via desktop.ini
  for (const folder of getSystemFolders()) {
    const icoPath = icons[folder.id];
    if (!icoPath || !fs.existsSync(icoPath)) continue;
    try {
      setFolderIcon(folder.path, icoPath);
      console.log(`  ${folder.id}: ${folder.path}`);
      folderCount++;
    } catch (err) {
      console.warn(`  warn: ${folder.id}: ${err.message}`);
      errorCount++;
    }
  }
  console.log(`  System folder icons: ${folderCount} folders set`);

  // Shell / desktop icons
  applyShellIcons(icons);
  applyDriveIcons(icons);

  refreshExplorer();
  console.log(`\nDone${errorCount > 0 ? ` (${errorCount} warnings)` : ''}. Icons active — reopen File Explorer windows to see changes.`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  loadEnv();
  const args = process.argv.slice(2);

  if (args.includes('--restore')) {
    restore();
    return;
  }

  const themeArg = args.includes('--theme')
    ? args[args.indexOf('--theme') + 1]
    : null;

  let themeName = themeArg;

  if (!themeName) {
    const settingsPath = resolveWindowsTerminalSettingsPath(null);
    if (settingsPath) {
      const { settings } = readWindowsTerminalSettingsFile(settingsPath);
      themeName = resolveEffectiveWindowsTerminalSchemeName(settings);
    }
  }

  if (!themeName) {
    console.error('No --theme given and no active scheme found.');
    process.exit(1);
  }

  const themeId = sanitizeId(themeName);
  const manifestPath = path.resolve(`./exports/windows-icons/${themeId}/icons-manifest.json`);

  if (!fs.existsSync(manifestPath)) {
    console.error(`Icons not generated for "${themeName}".`);
    console.error(`Run: node scripts/theme-system/generate-icons.mjs --theme "${themeName}"`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  await apply(manifest);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
