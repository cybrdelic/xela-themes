import fs from 'fs';
import path from 'path';
import { spawnSync } from 'node:child_process';

const personalizationIndexPath = path.resolve('./exports/windows-personalization/xela-windows-personalization-index.json');
const personalizationThemesDir = path.resolve('./exports/windows-personalization/themes');
const personalizationWallpapersDir = path.resolve('./exports/windows-personalization/wallpapers');

function hexToRgb(hex) {
  const clean = String(hex || '#000000').replace(/^#/, '');
  const normalized = clean.length === 3
    ? clean.split('').map((value) => value + value).join('')
    : clean.slice(0, 6);
  const int = Number.parseInt(normalized || '000000', 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

function clampByte(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function mixColor(a, b, amount) {
  const left = hexToRgb(a);
  const right = hexToRgb(b);
  return rgbToHex({
    r: clampByte(left.r + (right.r - left.r) * amount),
    g: clampByte(left.g + (right.g - left.g) * amount),
    b: clampByte(left.b + (right.b - left.b) * amount)
  });
}

function multiplyColor(hex, factor) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex({
    r: clampByte(r * factor),
    g: clampByte(g * factor),
    b: clampByte(b * factor)
  });
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function rgbString(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `${r} ${g} ${b}`;
}

function colorizationValue(hex, alpha = 'C4') {
  return `0X${alpha}${String(hex || '#000000').replace(/^#/, '').toUpperCase()}`;
}

function bgrDword(hex, alpha = 0xFF) {
  const { r, g, b } = hexToRgb(hex);
  return ((alpha & 0xFF) << 24) | ((b & 0xFF) << 16) | ((g & 0xFF) << 8) | (r & 0xFF);
}

function buildAccentPalette(accentHex, backgroundHex, foregroundHex) {
  const swatches = [
    mixColor(accentHex, '#FFFFFF', 0.70),
    mixColor(accentHex, '#FFFFFF', 0.46),
    mixColor(accentHex, '#FFFFFF', 0.18),
    accentHex,
    mixColor(accentHex, backgroundHex, 0.18),
    mixColor(accentHex, backgroundHex, 0.36),
    mixColor(accentHex, backgroundHex, 0.56),
    mixColor(accentHex, foregroundHex, 0.08)
  ];

  const bytes = [];
  for (const color of swatches) {
    const { r, g, b } = hexToRgb(color);
    bytes.push(b, g, r, 0);
  }
  return bytes;
}

function themeSignature(theme) {
  return `${theme?.name || ''} ${theme?.vscodeName || ''}`.toLowerCase();
}

function resolveAccentProfile(theme, options = {}) {
  const scheme = theme.scheme;
  const mode = theme.mode || inferThemeMode(scheme);
  const interactiveAccent = scheme.blue || scheme.cyan || scheme.purple || scheme.foreground;
  const buttonFace = options.buttonFace || (
    mode === 'light'
      ? mixColor(scheme.background, scheme.white, 0.16)
      : mixColor(scheme.background, scheme.white, 0.12)
  );
  const buttonShadow = options.buttonShadow || mixColor(scheme.background, scheme.black, 0.4);
  const signature = themeSignature(theme);

  if (/(platinum|finder|classic mac|macos classic|system 7|charcoal finder)/i.test(signature)) {
    const shellAccent = buttonFace;
    return {
      interactiveAccent,
      shellAccent,
      shellInactive: mixColor(shellAccent, buttonShadow, 0.28),
      shellStart: mixColor(shellAccent, buttonShadow, 0.18)
    };
  }

  if (/(aqua|cupertino|monterey|retina|wwdc|os x|mac os x|apple)/i.test(signature)) {
    const shellAccent = mixColor(interactiveAccent, buttonFace, mode === 'light' ? 0.58 : 0.34);
    return {
      interactiveAccent,
      shellAccent,
      shellInactive: mixColor(shellAccent, scheme.background, 0.24),
      shellStart: mixColor(shellAccent, buttonFace, mode === 'light' ? 0.14 : 0.10)
    };
  }

  return {
    interactiveAccent,
    shellAccent: interactiveAccent,
    shellInactive: mixColor(interactiveAccent, scheme.background, 0.30),
    shellStart: mixColor(interactiveAccent, scheme.background, mode === 'light' ? 0.12 : 0.20)
  };
}

function setRegistryDword(key, name, value) {
  const result = spawnSync('reg.exe', ['add', key, '/v', name, '/t', 'REG_DWORD', '/d', String(value >>> 0), '/f'], {
    stdio: 'ignore'
  });
  if (result.status !== 0) {
    throw new Error(`Failed to set ${name} in ${key}.`);
  }
}

function setRegistryBinary(key, name, bytes) {
  const pathLiteral = `Registry::${key.replace(/\\/g, '\\\\')}`;
  const byteList = bytes.map((value) => `0x${value.toString(16).padStart(2, '0')}`).join(',');
  const script = [
    `$path = '${pathLiteral}'`,
    `if (-not (Test-Path $path)) { New-Item -Path $path -Force | Out-Null }`,
    `$value = [byte[]](${byteList})`,
    `New-ItemProperty -Path $path -Name '${name}' -PropertyType Binary -Value $value -Force | Out-Null`
  ].join('; ');
  const result = spawnSync('powershell.exe', ['-NoProfile', '-Command', script], {
    stdio: 'ignore'
  });
  if (result.status !== 0) {
    throw new Error(`Failed to set ${name} in ${key}.`);
  }
}

function buildWallpaperPixel(x, y, width, height, scheme) {
  const nx = x / Math.max(1, width - 1);
  const ny = y / Math.max(1, height - 1);
  const isDark = luminance(scheme.background) <= 0.45;

  // Neumorphic directional light from top-left — brightens that corner
  const lightBloom = Math.max(0, 1 - Math.hypot(nx * 0.85, ny * 1.15)) ** 1.8;
  // Neumorphic shadow cast from bottom-right — darkens that corner
  const shadowBloom = Math.max(0, 1 - Math.hypot((1 - nx) * 0.85, (1 - ny) * 1.15)) ** 1.8;

  // Three layered radial glows at different positions for depth
  const glowCenter = Math.max(0, 1 - Math.hypot(nx - 0.50, ny - 0.42) * 1.55) ** 1.5;
  const glowLeft   = Math.max(0, 1 - Math.hypot(nx - 0.20, ny - 0.26) * 2.10) ** 2.2;
  const glowRight  = Math.max(0, 1 - Math.hypot(nx - 0.80, ny - 0.74) * 2.10) ** 2.2;

  // Directional sweeps: forward (TL→BR) and backward (TR→BL) for cross-gradient
  const diagFwd = (nx + ny) * 0.5;
  const diagBwd = ((1 - nx) + ny) * 0.5;

  // Horizon accent band
  const horizon = Math.max(0, 1 - Math.abs(ny - 0.58) / 0.20) ** 2.0;

  // Strength multiplier — dark themes get full saturation, light themes are softer
  const s = isDark ? 1.0 : 0.58;

  let color = scheme.background;
  // Forward diagonal — primary color spread (blue tones)
  color = mixColor(color, scheme.blue   || scheme.purple,                    0.24 * s * diagFwd);
  // Central glow — secondary accent for depth (purple/magenta)
  color = mixColor(color, scheme.purple || scheme.blue,                      0.20 * s * glowCenter);
  // Backward diagonal — cross-fade with tertiary (cyan/green)
  color = mixColor(color, scheme.cyan   || scheme.green,                     0.14 * s * diagBwd * 0.7);
  // Horizon line accent
  color = mixColor(color, scheme.cyan   || scheme.blue,                      0.16 * s * horizon);
  // Upper-left secondary glow (bright blue)
  color = mixColor(color, scheme.brightBlue || scheme.blue,                  0.13 * s * glowLeft);
  // Lower-right warm/cool counter-accent (yellow or red)
  color = mixColor(color, scheme.yellow || scheme.red || scheme.foreground,  0.11 * s * glowRight);
  // Neumorphic highlight — top-left brightening simulates light source
  color = mixColor(color, isDark ? scheme.brightWhite : '#FFFFFF',           0.18 * lightBloom);

  // Vignette: darken edges, keep center luminous
  const vignette = 0.76 + 0.24 * Math.max(0, 1 - Math.hypot(nx - 0.50, ny - 0.44) * 1.08);
  // Neumorphic shadow: subtle darkening of bottom-right corner
  const shadowFactor = 1.0 - (isDark ? 0.12 : 0.06) * shadowBloom;
  return multiplyColor(color, vignette * shadowFactor);
}

export function inferThemeMode(scheme) {
  return luminance(scheme.background) > 0.45 ? 'light' : 'dark';
}

export function sanitizeThemeFileName(value) {
  return String(value || 'xela-theme')
    .replace(/[^a-z0-9._-]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function sanitizeWindowsThemeText(value) {
  return String(value || '')
    .replace(/[\u2018\u2019\u2032]/g, "'")
    .replace(/[\u201C\u201D\u2033]/g, '"')
    .replace(/[\u2013\u2014\u2015]/g, '-')
    .replace(/[\u2022\u00B7]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/\u00A0/g, ' ')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function writeWallpaperBmp(outputPath, scheme, width = 1920, height = 1080) {
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const pixelArraySize = rowSize * height;
  const fileSize = 54 + pixelArraySize;
  const buffer = Buffer.alloc(fileSize);

  buffer.write('BM', 0, 2, 'ascii');
  buffer.writeUInt32LE(fileSize, 2);
  buffer.writeUInt32LE(54, 10);
  buffer.writeUInt32LE(40, 14);
  buffer.writeInt32LE(width, 18);
  buffer.writeInt32LE(height, 22);
  buffer.writeUInt16LE(1, 26);
  buffer.writeUInt16LE(24, 28);
  buffer.writeUInt32LE(pixelArraySize, 34);
  buffer.writeInt32LE(2835, 38);
  buffer.writeInt32LE(2835, 42);

  let offset = 54;
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const pixel = hexToRgb(buildWallpaperPixel(x, y, width, height, scheme));
      buffer[offset++] = pixel.b;
      buffer[offset++] = pixel.g;
      buffer[offset++] = pixel.r;
    }
    while ((offset - 54) % rowSize !== 0) {
      buffer[offset++] = 0;
    }
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buffer);
}

export function buildThemeFileContent(theme, wallpaperPath) {
  const scheme = theme.scheme;
  const mode = theme.mode || inferThemeMode(scheme);
  const displayName = sanitizeWindowsThemeText(theme.name);
  const sourceName = sanitizeWindowsThemeText(theme.vscodeName);
  const windowColor = mode === 'light' ? scheme.brightWhite : mixColor(scheme.background, scheme.white, 0.08);
  const buttonFace = mode === 'light' ? mixColor(scheme.background, scheme.white, 0.16) : mixColor(scheme.background, scheme.white, 0.12);
  // Neumorphic shadow layers: ambient shadow, deep shadow, outer frame
  const buttonShadow    = mixColor(scheme.background, scheme.black, mode === 'light' ? 0.20 : 0.38);
  const buttonDeepShadow = mixColor(scheme.background, scheme.black, mode === 'light' ? 0.36 : 0.60);
  const outerFrame      = mixColor(buttonDeepShadow, scheme.black,  mode === 'light' ? 0.18 : 0.28);
  // Neumorphic highlight layers: ambient light, specular highlight
  const buttonLight    = mixColor(buttonFace, mode === 'light' ? '#FFFFFF' : (scheme.brightWhite || scheme.white), 0.26);
  const buttonHilight  = mode === 'light'
    ? mixColor(buttonFace, '#FFFFFF', 0.62)
    : mixColor(buttonFace, scheme.brightWhite || scheme.white, 0.50);
  const infoWindow = mode === 'light'
    ? mixColor(scheme.yellow, scheme.white, 0.65)
    : mixColor(scheme.foreground, scheme.yellow, 0.15);
  const infoText = mode === 'light' ? scheme.black : scheme.foreground;
  const {
    interactiveAccent,
    shellAccent
  } = resolveAccentProfile(theme, { buttonFace, buttonShadow });
  // Title bar: saturated accent start → pale fade end (dramatic gradient)
  const activeTitle = mode === 'light'
    ? mixColor(interactiveAccent, scheme.background, 0.06)
    : interactiveAccent;
  const activeTitleGradient = mode === 'light'
    ? mixColor(interactiveAccent, '#FFFFFF', 0.52)
    : mixColor(interactiveAccent, scheme.brightWhite || scheme.white, 0.42);
  const inactiveTitle = mixColor(interactiveAccent, scheme.background, 0.62);
  const inactiveTitleGradient = mixColor(
    inactiveTitle,
    mode === 'light' ? (scheme.white || '#FFFFFF') : (scheme.brightBlack || scheme.black),
    0.24
  );

  return `; XELA Windows Personalization Theme\r
; Generated from ${sourceName}\r
\r
[Theme]\r
DisplayName=${displayName}\r
\r
[Control Panel\\Desktop]\r
Wallpaper=${wallpaperPath}\r
TileWallpaper=0\r
WallpaperStyle=10\r
Pattern=\r
\r
[Control Panel\\Colors]\r
ActiveTitle=${rgbString(activeTitle)}\r
Background=${rgbString(scheme.background)}\r
Hilight=${rgbString(interactiveAccent)}\r
HilightText=${rgbString(mode === 'light' ? scheme.black : scheme.brightWhite)}\r
TitleText=${rgbString(mode === 'light' ? scheme.black : scheme.brightWhite)}\r
Window=${rgbString(windowColor)}\r
WindowText=${rgbString(mode === 'light' ? scheme.black : scheme.foreground)}\r
Scrollbar=${rgbString(buttonFace)}\r
InactiveTitle=${rgbString(inactiveTitle)}\r
Menu=${rgbString(buttonFace)}\r
WindowFrame=${rgbString(outerFrame)}\r
MenuText=${rgbString(mode === 'light' ? scheme.black : scheme.foreground)}\r
ActiveBorder=${rgbString(interactiveAccent)}\r
InactiveBorder=${rgbString(buttonDeepShadow)}\r
AppWorkspace=${rgbString(mixColor(scheme.background, scheme.black, 0.25))}\r
ButtonFace=${rgbString(buttonFace)}\r
ButtonShadow=${rgbString(buttonShadow)}\r
GrayText=${rgbString(mode === 'light' ? mixColor(scheme.brightBlack, scheme.black, 0.3) : scheme.brightBlack)}\r
ButtonText=${rgbString(mode === 'light' ? scheme.black : scheme.foreground)}\r
InactiveTitleText=${rgbString(mixColor(scheme.foreground, scheme.background, 0.35))}\r
ButtonHilight=${rgbString(buttonHilight)}\r
ButtonDkShadow=${rgbString(buttonDeepShadow)}\r
ButtonLight=${rgbString(buttonLight)}\r
InfoText=${rgbString(infoText)}\r
InfoWindow=${rgbString(infoWindow)}\r
GradientActiveTitle=${rgbString(activeTitleGradient)}\r
GradientInactiveTitle=${rgbString(inactiveTitleGradient)}\r
\r
[Control Panel\\Cursors]\r
DefaultValue=Windows default\r
\r
[VisualStyles]\r
Path=%SystemRoot%\\resources\\Themes\\Aero\\Aero.msstyles\r
ColorStyle=NormalColor\r
Size=NormalSize\r
ColorizationColor=${colorizationValue(shellAccent)}\r
Transparency=1\r
\r
[Sounds]\r
SchemeName=\r
\r
[MasterThemeSelector]\r
MTSM=DABJDKT\r
`;
}

export function writeWindowsThemeFile(outputPath, theme, wallpaperPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buildThemeFileContent(theme, wallpaperPath), 'utf8');
}

export function loadWindowsPersonalizationIndex() {
  if (!fs.existsSync(personalizationIndexPath)) {
    throw new Error('Windows personalization index not found. Run `npm run build:windows-personalization` first.');
  }
  return JSON.parse(fs.readFileSync(personalizationIndexPath, 'utf8'));
}

export function resolveWindowsPersonalizationTheme(input, index) {
  if (!input) {
    return null;
  }

  const query = String(input).toLowerCase().trim();
  const candidates = (index?.themes || []).filter((theme) => {
    const values = [theme.id, theme.name, theme.vscodeName]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());
    return values.some((value) => value === query || value.includes(query));
  });

  if (candidates.length === 1) {
    return candidates[0];
  }
  if (candidates.length > 1) {
    throw new Error(`Ambiguous Windows theme "${input}". Matches: ${candidates.slice(0, 5).map((theme) => theme.name).join(', ')}`);
  }
  throw new Error(`Unknown Windows personalization theme "${input}".`);
}

export function resolveWindowsPersonalizationTargetRoot(customPath, env = process.env) {
  if (customPath) {
    return path.resolve(customPath);
  }
  if (env.LOCALAPPDATA) {
    return path.join(env.LOCALAPPDATA, 'XelaThemes', 'windows-personalization');
  }
  return path.resolve('./exports/windows-personalization-installed');
}

export function applyWindowsPersonalizationMode(theme) {
  const value = inferThemeMode(theme.scheme) === 'light' ? '1' : '0';
  const key = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize';
  for (const name of ['AppsUseLightTheme', 'SystemUsesLightTheme']) {
    setRegistryDword(key, name, Number(value));
  }
  setRegistryDword(key, 'EnableTransparency', 1);
}

export function applyWindowsAccent(theme) {
  const scheme = theme.scheme;
  const mode = inferThemeMode(scheme);
  const buttonFace = mode === 'light' ? mixColor(scheme.background, scheme.white, 0.16) : mixColor(scheme.background, scheme.white, 0.12);
  const buttonShadow = mixColor(scheme.background, scheme.black, 0.4);
  const {
    shellAccent,
    shellInactive,
    shellStart
  } = resolveAccentProfile(theme, { buttonFace, buttonShadow });

  const dwmKey = 'HKCU\\Software\\Microsoft\\Windows\\DWM';
  setRegistryDword(dwmKey, 'AccentColor', bgrDword(shellAccent, 0xFF));
  setRegistryDword(dwmKey, 'ColorizationColor', bgrDword(shellAccent, 0xC4));
  setRegistryDword(dwmKey, 'ColorizationAfterglow', bgrDword(shellAccent, 0xC4));
  setRegistryDword(dwmKey, 'AccentColorInactive', bgrDword(shellInactive, 0xFF));
  setRegistryDword(dwmKey, 'ColorPrevalence', 1);
  setRegistryDword(dwmKey, 'EnableWindowColorization', 1);

  const personalizeKey = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize';
  setRegistryDword(personalizeKey, 'ColorPrevalence', 1);

  const explorerKey = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Accent';
  setRegistryDword(explorerKey, 'AccentColorMenu', bgrDword(shellAccent, 0xFF));
  setRegistryDword(explorerKey, 'StartColorMenu', bgrDword(shellStart, 0xFF));
  try {
    setRegistryBinary(explorerKey, 'AccentPalette', buildAccentPalette(shellAccent, scheme.background, scheme.foreground));
  } catch {
    // Some Windows configurations reject palette writes while still accepting the live accent keys.
  }
}

export function applyWindowsShell(theme) {
  const explorerKey = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced';
  const searchKey = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search';

  const mode = inferThemeMode(theme.scheme);
  const isClassic = /mac|platinum|finder|classic|retro|macos|monterey|cupertino|bauhaus|swiss|scandinavian/i.test(theme.name || '');

  const settings = [
    [searchKey,   'SearchboxTaskbarMode', 1],
    [explorerKey, 'ShowTaskViewButton',   0],
    [explorerKey, 'TaskbarDa',            0], // Widgets
    [explorerKey, 'TaskbarMn',            0], // Chat/Teams
    [explorerKey, 'TaskbarAl',            mode === 'light' || isClassic ? 0 : 1],
    [explorerKey, 'UseCompactMode',       1],
  ];

  for (const [key, name, value] of settings) {
    try {
      setRegistryDword(key, name, value);
    } catch {
      // Key may not exist on this Windows version — skip silently
    }
  }
}

export function launchWindowsThemeFile(themePath) {
  const result = spawnSync('cmd.exe', ['/c', 'start', '', themePath], {
    windowsHide: true,
    detached: true,
    stdio: 'ignore'
  });
  if (result.status !== 0) {
    throw new Error(`Failed to launch theme file: ${themePath}`);
  }
}

export const windowsPersonalizationPaths = {
  indexPath: personalizationIndexPath,
  themesDir: personalizationThemesDir,
  wallpapersDir: personalizationWallpapersDir
};
