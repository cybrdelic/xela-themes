/**
 * XELA Themes — Puppeteer Promo Recorder (Three.js version)
 * Starts local server, captures frames, stitches MP4.
 *
 * Usage:
 *   node blender/record-promo.mjs
 *   node blender/record-promo.mjs --fps 30 --duration 30
 */

import puppeteer    from 'puppeteer';
import { execSync, exec } from 'child_process';
import fs           from 'fs';
import path         from 'path';
import { fileURLToPath } from 'url';
import { createServer }  from './promo-web/server.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args      = process.argv.slice(2);
const getArg    = (f, d) => { const i = args.indexOf(f); return i !== -1 ? args[i+1] : d; };
const FPS       = parseInt(getArg('--fps',      '30'),  10);
const DURATION  = parseFloat(getArg('--duration','30'));   // 30s = 6 shots × 5s each
const WIDTH     = 1920;
const HEIGHT    = 1080;
const FRAMES    = Math.ceil(FPS * DURATION);
const OUT_DIR   = path.join(__dirname, '..', 'render', 'web');
const MP4       = path.join(__dirname, '..', 'render', 'xela_promo_web.mp4');

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.png')).forEach(f =>
  fs.unlinkSync(path.join(OUT_DIR, f)));

console.log('\n  XELA Promo Recorder — Three.js edition');
console.log('  ─────────────────────────────────────────');
console.log(`  Resolution : ${WIDTH}×${HEIGHT}`);
console.log(`  FPS        : ${FPS}`);
console.log(`  Duration   : ${DURATION}s  (${FRAMES} frames)`);
console.log(`  Shots      : 10 cinematic camera positions`);
console.log(`  Themes     : all 207+ cycling every 1.8s\n`);

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = 7422;
const { server, url } = await createServer(PORT);

// ── Launch Puppeteer ──────────────────────────────────────────────────────────
const browser = await puppeteer.launch({
  headless: true,
  args: [
    '--no-sandbox', '--disable-setuid-sandbox',
    `--window-size=${WIDTH},${HEIGHT}`,
    '--force-device-scale-factor=1',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-renderer-backgrounding',
    '--run-all-compositor-stages-before-draw',
    '--enable-unsafe-webgpu',
    '--enable-gpu',
    '--ignore-gpu-blocklist',
  ],
  defaultViewport: { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
page.on('console', m => { if (m.type() === 'error') console.error('  PAGE:', m.text()); });

// Navigate to local server
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

// Wait for Three.js to initialise (canvas present + themes loaded)
await page.waitForFunction(
  () => document.querySelector('canvas') !== null, { timeout: 15000 }
);
await new Promise(r => setTimeout(r, 2000)); // extra settle time

// ── Capture frames ────────────────────────────────────────────────────────────
console.log('  Capturing frames…\n');
const t0 = Date.now();

for (let i = 0; i < FRAMES; i++) {
  const pad  = String(i + 1).padStart(5, '0');
  const file = path.join(OUT_DIR, `frame_${pad}.png`);
  await page.screenshot({ path: file, type: 'png' });

  if (i % FPS === 0 || i === FRAMES - 1) {
    const pct     = Math.round(((i+1)/FRAMES)*100);
    const elapsed = ((Date.now()-t0)/1000).toFixed(1);
    const bar     = '█'.repeat(Math.round(pct/5)) + '░'.repeat(20-Math.round(pct/5));
    process.stdout.write(`\r  [${bar}] ${pct}%  ${i+1}/${FRAMES} frames  ${elapsed}s elapsed   `);
  }
}

console.log('\n');
await browser.close();
server.close();

// ── Stitch MP4 ────────────────────────────────────────────────────────────────
console.log('  Stitching MP4…');
const ffCmd = [
  'ffmpeg', '-y',
  '-framerate', FPS,
  '-start_number', '1',
  '-i', `"${path.join(OUT_DIR, 'frame_%05d.png')}"`,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '16',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  `"${MP4}"`,
].join(' ');

try {
  execSync(ffCmd, { stdio: 'inherit' });
  console.log(`\n  ✔ Saved: ${MP4}`);
  if (process.platform === 'win32') exec(`start "" "${MP4}"`);
  else if (process.platform === 'darwin') exec(`open "${MP4}"`);
  else exec(`xdg-open "${MP4}"`);
} catch(e) {
  console.error('  ffmpeg failed:', e.message);
}
