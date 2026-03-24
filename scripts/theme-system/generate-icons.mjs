#!/usr/bin/env node
/**
 * generate-icons.mjs
 * Generates a themed Windows icon set using OpenAI DALL-E 3.
 * Each icon is generated individually for clean, properly-contained results.
 *
 * Usage:
 *   node generate-icons.mjs --theme "XELA Arctic"
 *   node generate-icons.mjs          (uses currently applied WT scheme)
 *   node generate-icons.mjs --list   (list available themes)
 *   node generate-icons.mjs --force  (regenerate even if cached)
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { URL } from 'url';
import {
  loadWindowsTerminalSchemes,
  resolveWindowsTerminalSettingsPath,
  readWindowsTerminalSettingsFile,
  resolveEffectiveWindowsTerminalSchemeName
} from './windows-terminal-utils.mjs';

// ---------------------------------------------------------------------------
// Icon definitions
// ---------------------------------------------------------------------------

export const ICONS = [
  // Folders
  { id: 'folder',        label: 'generic folder'                        },
  { id: 'documents',     label: 'documents folder'                      },
  { id: 'downloads',     label: 'downloads folder with arrow'           },
  { id: 'desktop',       label: 'desktop computer folder'               },
  { id: 'pictures',      label: 'pictures and photos folder'            },
  { id: 'projects',      label: 'code and projects folder'              },
  { id: 'music',         label: 'music folder with note'                },
  { id: 'folder-open',   label: 'open expanded folder'                  },
  // Code files
  { id: 'js',            label: 'JavaScript file with JS lettering'     },
  { id: 'ts',            label: 'TypeScript file with TS lettering'     },
  { id: 'jsx',           label: 'React component JSX file'              },
  { id: 'py',            label: 'Python file with snake or py symbol'   },
  { id: 'html',          label: 'HTML file with angle brackets'         },
  { id: 'css',           label: 'CSS stylesheet file'                   },
  { id: 'json',          label: 'JSON data file with curly braces'      },
  // Docs / data
  { id: 'md',            label: 'Markdown document file'                },
  { id: 'txt',           label: 'plain text file'                       },
  { id: 'pdf',           label: 'PDF document file'                     },
  { id: 'db',            label: 'database file with cylinder'           },
  { id: 'env',           label: 'config or environment file with gear'  },
  { id: 'git',           label: 'git version control file'              },
  { id: 'lock',          label: 'lock file with padlock'                },
  // Binary / misc
  { id: 'zip',           label: 'compressed zip archive file'           },
  { id: 'img',           label: 'image file with picture frame'         },
  { id: 'video',         label: 'video file with play button'           },
  { id: 'audio',         label: 'audio file with waveform'              },
  { id: 'exe',           label: 'Windows executable file'               },
  { id: 'generic',       label: 'generic unknown file'                  },
];

export const SHELL_ICONS = [
  { id: 'recycle-empty', label: 'empty recycle bin trash can'           },
  { id: 'recycle-full',  label: 'full recycle bin with paper trash'     },
  { id: 'this-pc',       label: 'This PC computer monitor'              },
  { id: 'network',       label: 'network globe connected'               },
  { id: 'user-folder',   label: 'user home folder with person'          },
  { id: 'videos',        label: 'videos folder with film strip'         },
  { id: 'libraries',     label: 'libraries folder with books'           },
  { id: 'onedrive',      label: 'OneDrive cloud storage'                },
  { id: 'quick-access',  label: 'quick access star pin'                 },
  { id: 'drive',         label: 'hard drive disk C drive'               },
];

const ALL_ICONS = [...ICONS, ...SHELL_ICONS];

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

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

function sanitizeId(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === 'https:' ? https : http;
    mod.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(downloadBuffer(res.headers.location));
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Build a Windows ICO from an array of PNG buffers (one per size).
 */
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dataOffset = headerSize + count * dirEntrySize;
  const totalSize = dataOffset + pngBuffers.reduce((s, b) => s + b.length, 0);
  const ico = Buffer.alloc(totalSize);

  ico.writeUInt16LE(0, 0);
  ico.writeUInt16LE(1, 2);
  ico.writeUInt16LE(count, 4);

  let offset = dataOffset;
  for (let i = 0; i < count; i++) {
    const png = pngBuffers[i];
    const w = png.readUInt32BE(16);
    const h = png.readUInt32BE(20);
    const entry = headerSize + i * dirEntrySize;
    ico.writeUInt8(w >= 256 ? 0 : w, entry);
    ico.writeUInt8(h >= 256 ? 0 : h, entry + 1);
    ico.writeUInt8(0, entry + 2);
    ico.writeUInt8(0, entry + 3);
    ico.writeUInt16LE(1, entry + 4);
    ico.writeUInt16LE(32, entry + 6);
    ico.writeUInt32LE(png.length, entry + 8);
    ico.writeUInt32LE(offset, entry + 12);
    png.copy(ico, offset);
    offset += png.length;
  }
  return ico;
}

function buildIconPrompt(icon, scheme, themeName) {
  const colors = [
    scheme.background, scheme.foreground,
    scheme.blue, scheme.purple, scheme.cyan,
    scheme.green, scheme.yellow, scheme.red,
    scheme.brightWhite, scheme.brightBlack
  ].filter(Boolean).slice(0, 8).join(', ');

  return (
    `Single Windows icon on a transparent background. ` +
    `The icon depicts: ${icon.label}. ` +
    `Icon is centered, isolated, and fills roughly 65% of the frame with generous clear space around it. ` +
    `Uses ONLY these colors for the icon itself: ${colors}. ` +
    `Style: bold geometric flat design. No text. No gradients. No shadows. No outer frame. No sticker plate. No square tile behind the icon. ` +
    `Theme aesthetic: ${themeName}.`
  );
}

/**
 * Decode the first generated image from the OpenAI image response.
 */
function getGeneratedImageBuffer(response) {
  const image = response?.data?.[0];
  if (!image) {
    throw new Error('Image API returned no images.');
  }

  if (image.b64_json) {
    return Buffer.from(image.b64_json, 'base64');
  }

  if (image.url) {
    return downloadBuffer(image.url);
  }

  throw new Error('Image API returned no usable image payload.');
}

function colorDistance(a, b) {
  return Math.max(
    Math.abs(a.r - b.r),
    Math.abs(a.g - b.g),
    Math.abs(a.b - b.b)
  );
}

/**
 * Remove a uniform backdrop that leaks through even after requesting transparency.
 * This catches white plates and near-solid colored tiles by flood-filling from edges.
 */
async function removeEdgePlateBackground(sharpLib, pngBuffer, tolerance = 26, alphaFloor = 20) {
  const { data, info } = await sharpLib(pngBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const buf = Buffer.from(data);
  const edgeSamples = [];

  const pushSample = (x, y) => {
    const off = (y * width + x) * 4;
    const alpha = buf[off + 3];
    if (alpha <= alphaFloor) {
      buf[off + 3] = 0;
      return;
    }
    edgeSamples.push({ r: buf[off], g: buf[off + 1], b: buf[off + 2] });
  };

  for (let x = 0; x < width; x++) {
    pushSample(x, 0);
    pushSample(x, height - 1);
  }
  for (let y = 1; y < height - 1; y++) {
    pushSample(0, y);
    pushSample(width - 1, y);
  }

  if (edgeSamples.length === 0) {
    return sharpLib(buf, { raw: { width, height, channels: 4 } }).png().toBuffer();
  }

  const bg = edgeSamples.reduce((acc, sample) => ({
    r: acc.r + sample.r,
    g: acc.g + sample.g,
    b: acc.b + sample.b
  }), { r: 0, g: 0, b: 0 });
  bg.r = Math.round(bg.r / edgeSamples.length);
  bg.g = Math.round(bg.g / edgeSamples.length);
  bg.b = Math.round(bg.b / edgeSamples.length);

  const consistentEdges = edgeSamples.filter((sample) => colorDistance(sample, bg) <= tolerance).length;
  if (consistentEdges / edgeSamples.length < 0.65) {
    return sharpLib(buf, { raw: { width, height, channels: 4 } }).png().toBuffer();
  }

  const visited = new Uint8Array(width * height);
  const queue = [];

  for (let x = 0; x < width; x++) {
    queue.push(x, 0, x, height - 1);
  }
  for (let y = 1; y < height - 1; y++) {
    queue.push(0, y, width - 1, y);
  }

  let qi = 0;
  while (qi < queue.length) {
    const x = queue[qi++];
    const y = queue[qi++];
    const pidx = y * width + x;
    if (visited[pidx]) continue;
    visited[pidx] = 1;
    const off = pidx * 4;
    const r = buf[off], g = buf[off + 1], b = buf[off + 2];
    if (buf[off + 3] <= alphaFloor) {
      buf[off + 3] = 0;
    } else if (colorDistance({ r, g, b }, bg) <= tolerance) {
      buf[off + 3] = 0;
    } else {
      continue;
    }

    if (x > 0)         queue.push(x - 1, y);
    if (x < width - 1) queue.push(x + 1, y);
    if (y > 0)         queue.push(x, y - 1);
    if (y < height - 1) queue.push(x, y + 1);
  }

  return sharpLib(buf, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

/**
 * Recenter and normalize the icon art so ICO exports don't include huge margins
 * or edge halos. Keeps a predictable transparent padding band around the icon.
 */
async function normalizeIconCanvas(sharpLib, pngBuffer, alphaFloor = 20) {
  const { data, info } = await sharpLib(pngBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const buf = Buffer.from(data);
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = buf[(y * width + x) * 4 + 3];
      if (alpha <= alphaFloor) {
        buf[(y * width + x) * 4 + 3] = 0;
        continue;
      }
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX || maxY < minY) {
    return sharpLib(buf, { raw: { width, height, channels: 4 } }).png().toBuffer();
  }

  const trimmedWidth = maxX - minX + 1;
  const trimmedHeight = maxY - minY + 1;
  const trimmed = await sharpLib(buf, { raw: { width, height, channels: 4 } })
    .extract({ left: minX, top: minY, width: trimmedWidth, height: trimmedHeight })
    .png()
    .toBuffer();

  const canvasSize = 1024;
  const padding = 132;
  const innerSize = canvasSize - padding * 2;
  const metadata = await sharpLib(trimmed).metadata();
  const scale = Math.min(innerSize / metadata.width, innerSize / metadata.height, 1);
  const resizedWidth = Math.max(1, Math.round(metadata.width * scale));
  const resizedHeight = Math.max(1, Math.round(metadata.height * scale));
  const left = Math.floor((canvasSize - resizedWidth) / 2);
  const top = Math.floor((canvasSize - resizedHeight) / 2);

  const centered = await sharpLib(trimmed)
    .resize(resizedWidth, resizedHeight, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  return sharpLib({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: centered, left, top }])
    .png()
    .toBuffer();
}

/**
 * Generate a single icon, returning a transparent PNG buffer.
 */
async function generateIcon(openai, sharpLib, icon, scheme, themeName) {
  const prompt = buildIconPrompt(icon, scheme, themeName);
  const response = await openai.images.generate({
    model: 'gpt-image-1.5',
    prompt,
    size: '1024x1024',
    quality: 'medium',
    background: 'transparent',
    output_format: 'png',
    n: 1,
  });
  const rawPng = await getGeneratedImageBuffer(response);
  const cleaned = await removeEdgePlateBackground(sharpLib, rawPng);
  return normalizeIconCanvas(sharpLib, cleaned);
}

/**
 * Convert a 1024x1024 PNG buffer into a multi-size ICO buffer.
 */
async function pngToIco(sharp, pngBuffer) {
  const sizes = [256, 48, 32, 16];
  const pngs = await Promise.all(
    sizes.map((size) =>
      sharp(pngBuffer)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
    )
  );
  return buildIco(pngs);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  loadEnv();

  const args = process.argv.slice(2);

  if (args.includes('--list')) {
    const schemes = loadWindowsTerminalSchemes();
    schemes.forEach((s) => console.log(s.name));
    process.exit(0);
  }

  const themeArg = args.includes('--theme') ? args[args.indexOf('--theme') + 1] : null;
  const force = args.includes('--force');
  const onlyShell = args.includes('--shell-only');
  const skipShell = args.includes('--no-shell');

  // Resolve scheme
  const schemes = loadWindowsTerminalSchemes();
  const schemesByName = new Map(schemes.map((s) => [s.name.toLowerCase(), s]));

  let scheme, themeName;

  if (themeArg) {
    scheme = schemesByName.get(themeArg.toLowerCase())
      || [...schemesByName.values()].find((s) => s.name.toLowerCase().includes(themeArg.toLowerCase()));
    if (!scheme) {
      console.error(`Theme not found: ${themeArg}`);
      console.error('Run with --list to see available themes.');
      process.exit(1);
    }
    themeName = scheme.name;
  } else {
    const settingsPath = resolveWindowsTerminalSettingsPath(null);
    if (!settingsPath) {
      console.error('No --theme given and Windows Terminal settings not found.');
      process.exit(1);
    }
    const { settings } = readWindowsTerminalSettingsFile(settingsPath);
    const currentName = resolveEffectiveWindowsTerminalSchemeName(settings);
    if (!currentName) {
      console.error('No --theme given and no active scheme found in Windows Terminal settings.');
      process.exit(1);
    }
    scheme = schemesByName.get(currentName.toLowerCase());
    if (!scheme) {
      console.error(`Active scheme "${currentName}" not found in xela schemes.`);
      process.exit(1);
    }
    themeName = scheme.name;
  }

  const themeId = sanitizeId(themeName);
  const outDir = path.resolve(`./exports/windows-icons/${themeId}`);
  const iconsDir = path.join(outDir, 'icons');
  const manifestPath = path.join(outDir, 'icons-manifest.json');

  // Load existing manifest if present
  const existingManifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : { themeName, themeId, icons: {} };

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY not set. Add it to .env or set the environment variable.');
    process.exit(1);
  }

  let OpenAI;
  try {
    const mod = await import('openai');
    OpenAI = mod.default;
  } catch {
    console.error('openai package not found. Run: npm install openai');
    process.exit(1);
  }

  let sharp;
  try {
    const mod = await import('sharp');
    sharp = mod.default;
  } catch {
    console.error('sharp package not found. Run: npm install sharp');
    process.exit(1);
  }

  fs.mkdirSync(iconsDir, { recursive: true });

  const openai = new OpenAI({ apiKey });
  const iconsToGenerate = (onlyShell ? SHELL_ICONS : skipShell ? ICONS : ALL_ICONS)
    .filter((icon) => force || !existingManifest.icons[icon.id] || !fs.existsSync(existingManifest.icons[icon.id]));

  if (iconsToGenerate.length === 0) {
    console.log(`All icons already generated for "${themeName}". Use --force to regenerate.`);
    console.log(`Icons at: ${iconsDir}`);
    process.exit(0);
  }

  console.log(`Generating ${iconsToGenerate.length} icons for: ${themeName}`);
  console.log(`Output: ${iconsDir}`);
  console.log(`(${ALL_ICONS.length - iconsToGenerate.length} already cached)\n`);

  // Generate icons in batches of 3 to avoid rate limiting
  const BATCH = 3;
  const manifest = { ...existingManifest };

  for (let i = 0; i < iconsToGenerate.length; i += BATCH) {
    const batch = iconsToGenerate.slice(i, i + BATCH);

    await Promise.all(batch.map(async (icon) => {
      const icoPath = path.join(iconsDir, `${icon.id}.ico`);
      try {
        const pngBuffer = await generateIcon(openai, sharp, icon, scheme, themeName);
        const icoBuffer = await pngToIco(sharp, pngBuffer);
        fs.writeFileSync(icoPath, icoBuffer);
        manifest.icons[icon.id] = icoPath;
        process.stdout.write(`  [${i + batch.indexOf(icon) + 1}/${iconsToGenerate.length}] ${icon.id}.ico\n`);
      } catch (err) {
        process.stdout.write(`  [!] ${icon.id}: ${err.message}\n`);
      }
    }));

    // Save manifest after each batch so progress is preserved on failure
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  }

  console.log(`\nDone. ${Object.keys(manifest.icons).length} icons total.`);
  console.log(`Run apply-icons.mjs --theme "${themeName}" to apply.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
