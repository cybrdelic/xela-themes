/**
 * XELA Themes — Blender Render Progress Dashboard
 * Live dashboard server for monitoring the promo video render.
 *
 * Usage:
 *   node blender/dashboard.mjs
 *   node blender/dashboard.mjs --port 7420 --log <path>
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const getArg = (flag, def) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};

const PORT     = parseInt(getArg('--port', '7420'), 10);
const LOG_FILE = getArg('--log', '/tmp/dashboard.log');
const TOTAL_FRAMES = 450;
const RENDER_DIR   = path.join(__dirname, 'render');

// ---------------------------------------------------------------------------
// Log parser
// ---------------------------------------------------------------------------

function parseLog() {
  let raw = '';
  try { raw = fs.readFileSync(LOG_FILE, 'utf8'); } catch { /* not started yet */ }

  const lines = raw.split('\n').filter(Boolean);

  // Fra:NNN Mem:... | Time:HH:MM:SS | Remaining:HH:MM:SS | ... | Sample N/S
  let currentFrame = 0;
  let timeStr      = '—';
  let remainStr    = '—';
  let sample       = '—';
  let memMB        = 0;
  let phase        = 'Waiting…';
  let done         = false;
  let mp4Path      = null;

  // Scan all Fra: lines — last one wins
  for (const line of lines) {
    const fraMatch = line.match(/^Fra:(\d+)/);
    if (!fraMatch) continue;

    const f = parseInt(fraMatch[1], 10);
    if (f > currentFrame) currentFrame = f;

    const timeMatch      = line.match(/Time:([\d:]+)/);
    const remainMatch    = line.match(/Remaining:([\d:]+)/);
    const sampleMatch    = line.match(/Sample (\d+\/\d+)/);
    const phaseMatch     = line.match(/\| ([^|]+)$/);
    const memMatch       = line.match(/Mem:([\d.]+)M/);

    if (timeMatch)   timeStr   = timeMatch[1];
    if (remainMatch) remainStr = remainMatch[1];
    if (sampleMatch) sample    = sampleMatch[1];
    if (phaseMatch)  phase     = phaseMatch[1].trim();
    if (memMatch)    memMB     = parseFloat(memMatch[1]);
  }

  // Check for mp4 stitch complete
  if (raw.includes('xela_promo.mp4')) {
    done    = true;
    mp4Path = path.join(RENDER_DIR, 'xela_promo.mp4');
  }
  if (raw.includes('Blender quit') && currentFrame >= TOTAL_FRAMES - 2) {
    done = true;
  }

  // Count rendered PNGs as ground truth
  let pngCount = 0;
  try {
    pngCount = fs.readdirSync(RENDER_DIR).filter(f => f.endsWith('.png') && f !== 'preview.png').length;
  } catch { /* render dir may not exist yet */ }

  const frame   = Math.max(currentFrame, pngCount);
  const percent = Math.min(100, Math.round((frame / TOTAL_FRAMES) * 100));

  // Estimate time remaining from avg frame time
  let etaStr = remainStr !== '—' ? remainStr : '—';
  const recentLines = lines.slice(-30);

  return {
    frame, percent, timeStr, remainStr: etaStr,
    sample, phase, memMB, done, mp4Path,
    recentLines: lines.slice(-12),
    pngCount,
  };
}

// ---------------------------------------------------------------------------
// HTML dashboard
// ---------------------------------------------------------------------------

const HTML = /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>XELA Render Dashboard</title>
<style>
  :root {
    --bg:       #07070d;
    --surface:  #0e0e18;
    --border:   #1a1a2e;
    --accent:   #008cff;
    --cyan:     #00d9d9;
    --violet:   #8c33ff;
    --amber:    #ffa600;
    --green:    #00e573;
    --red:      #ff3838;
    --text:     #d9e0f2;
    --muted:    #5a6080;
    --glow-b:   0 0 18px #008cff88, 0 0 40px #008cff33;
    --glow-c:   0 0 18px #00d9d988, 0 0 40px #00d9d933;
    --glow-v:   0 0 18px #8c33ff88, 0 0 40px #8c33ff33;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'SF Mono', 'Cascadia Code', 'Consolas', monospace;
    min-height: 100vh;
    padding: 32px 24px;
    overflow-x: hidden;
  }

  /* ── Scanline overlay ── */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,.08) 2px,
      rgba(0,0,0,.08) 4px
    );
    pointer-events: none;
    z-index: 100;
  }

  header {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 36px;
  }
  .logo {
    font-size: 11px; font-weight: 700; letter-spacing: .25em;
    text-transform: uppercase; color: var(--muted);
  }
  h1 {
    font-size: 22px; font-weight: 700; letter-spacing: .04em;
    color: var(--text);
  }
  h1 span { color: var(--accent); text-shadow: var(--glow-b); }
  .pill {
    margin-left: auto;
    font-size: 10px; font-weight: 700; letter-spacing: .15em;
    text-transform: uppercase;
    padding: 4px 12px; border-radius: 99px;
    border: 1px solid var(--border);
    color: var(--muted);
    transition: all .3s;
  }
  .pill.live  { border-color: var(--green); color: var(--green);
                box-shadow: 0 0 10px #00e57344; animation: pulse 2s infinite; }
  .pill.done  { border-color: var(--accent); color: var(--accent);
                box-shadow: var(--glow-b); }

  @keyframes pulse {
    0%,100% { opacity: 1; } 50% { opacity: .5; }
  }

  /* ── Cards grid ── */
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px 22px;
    position: relative;
    overflow: hidden;
    transition: border-color .3s;
  }
  .card::after {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: .5;
  }
  .card.cyan::after  { background: linear-gradient(90deg, transparent, var(--cyan), transparent); }
  .card.violet::after{ background: linear-gradient(90deg, transparent, var(--violet), transparent); }
  .card.green::after { background: linear-gradient(90deg, transparent, var(--green), transparent); }
  .card.amber::after { background: linear-gradient(90deg, transparent, var(--amber), transparent); }

  .card-label {
    font-size: 9px; font-weight: 700; letter-spacing: .2em;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 8px;
  }
  .card-value {
    font-size: 32px; font-weight: 700; letter-spacing: -.01em;
    color: var(--accent); text-shadow: var(--glow-b);
    transition: all .4s;
  }
  .card.cyan   .card-value { color: var(--cyan);   text-shadow: var(--glow-c); }
  .card.violet .card-value { color: var(--violet);  text-shadow: var(--glow-v); }
  .card.green  .card-value { color: var(--green);   text-shadow: 0 0 18px #00e57388; }
  .card.amber  .card-value { color: var(--amber);   text-shadow: 0 0 18px #ffa60088; }
  .card-sub {
    font-size: 11px; color: var(--muted); margin-top: 4px;
  }

  /* ── Progress bar ── */
  .bar-wrap {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 24px 24px 20px;
    margin-bottom: 24px;
    position: relative; overflow: hidden;
  }
  .bar-wrap::after {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, var(--accent), var(--cyan), var(--violet));
    opacity: .7;
  }
  .bar-header {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 14px;
  }
  .bar-title { font-size: 11px; font-weight: 700; letter-spacing: .15em;
               text-transform: uppercase; color: var(--muted); }
  .bar-pct   { font-size: 28px; font-weight: 700;
               background: linear-gradient(90deg, var(--accent), var(--cyan));
               -webkit-background-clip: text; -webkit-text-fill-color: transparent;
               filter: drop-shadow(0 0 8px #008cff66); }
  .bar-track {
    height: 8px; background: var(--border); border-radius: 99px; overflow: hidden;
    position: relative;
  }
  .bar-fill {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, var(--accent), var(--cyan), var(--violet));
    box-shadow: 0 0 16px #008cff66, 0 0 32px #00d9d933;
    transition: width .8s cubic-bezier(.4,0,.2,1);
    position: relative;
  }
  .bar-fill::after {
    content: '';
    position: absolute; right: 0; top: 50%;
    transform: translateY(-50%);
    width: 16px; height: 16px; border-radius: 50%;
    background: white;
    box-shadow: 0 0 12px var(--accent), 0 0 24px var(--cyan);
    animation: barGlow 1.2s ease-in-out infinite alternate;
  }
  @keyframes barGlow {
    from { opacity: .7; transform: translateY(-50%) scale(1);   }
    to   { opacity: 1;  transform: translateY(-50%) scale(1.4); }
  }

  /* Frame ticker */
  .frame-ticker {
    display: flex; gap: 8px; margin-top: 12px; align-items: center;
    font-size: 11px; color: var(--muted);
  }
  .frame-ticker strong { color: var(--text); font-size: 13px; }

  /* ── Phase / log ── */
  .lower { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  .log-wrap {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 20px;
    overflow: hidden;
  }
  .log-wrap::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--violet), transparent);
    opacity: .5;
  }
  .log-title {
    font-size: 9px; font-weight: 700; letter-spacing: .2em;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 12px;
  }
  .log-line {
    font-size: 10px; line-height: 1.7; color: var(--muted);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    transition: color .2s;
  }
  .log-line.fresh { color: var(--text); }
  .log-line.fra   { color: var(--cyan); }
  .log-line.saved { color: var(--green); }
  .log-line.error { color: var(--red); }

  /* Phase card */
  .phase-wrap {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 20px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .phase-label {
    font-size: 9px; font-weight: 700; letter-spacing: .2em;
    text-transform: uppercase; color: var(--muted); margin-bottom: 10px;
  }
  .phase-value {
    font-size: 14px; color: var(--cyan); word-break: break-word;
    text-shadow: var(--glow-c); line-height: 1.5;
  }
  .phase-dots { margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap; }
  .dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--border); transition: all .4s;
  }
  .dot.done-dot  { background: var(--green); box-shadow: 0 0 8px var(--green); }
  .dot.active-dot{ background: var(--accent); box-shadow: 0 0 10px var(--accent);
                   animation: pulse 1s infinite; }

  /* done overlay */
  .done-banner {
    display: none;
    position: fixed; inset: 0;
    background: rgba(7,7,13,.92);
    z-index: 200;
    align-items: center; justify-content: center;
    flex-direction: column; gap: 20px;
    text-align: center;
  }
  .done-banner.show { display: flex; animation: fadeIn .6s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .done-title {
    font-size: 40px; font-weight: 800;
    background: linear-gradient(90deg, var(--accent), var(--cyan), var(--violet));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 20px #008cff88);
  }
  .done-sub { font-size: 14px; color: var(--muted); }
  .done-btn {
    margin-top: 8px; padding: 12px 32px;
    background: linear-gradient(90deg, var(--accent), var(--violet));
    color: white; border: none; border-radius: 8px;
    font-size: 13px; font-weight: 700; letter-spacing: .1em;
    cursor: pointer; text-transform: uppercase;
    box-shadow: var(--glow-b);
    transition: transform .2s, box-shadow .2s;
  }
  .done-btn:hover { transform: scale(1.04); box-shadow: 0 0 30px #008cffaa; }

  footer {
    margin-top: 28px; font-size: 10px; color: var(--muted);
    text-align: center; letter-spacing: .05em;
  }
  footer span { color: var(--accent); }
</style>
</head>
<body>

<header>
  <div>
    <div class="logo">XELA Themes · Blender 4.5</div>
    <h1>Promo <span>Render</span> Dashboard</h1>
  </div>
  <div class="pill" id="statusPill">Connecting…</div>
</header>

<div class="bar-wrap">
  <div class="bar-header">
    <span class="bar-title">Overall Progress</span>
    <span class="bar-pct" id="pct">0%</span>
  </div>
  <div class="bar-track">
    <div class="bar-fill" id="barFill" style="width:0%"></div>
  </div>
  <div class="frame-ticker">
    Frame <strong id="frameNum">0</strong> / 450 &nbsp;·&nbsp;
    <strong id="pngCount">0</strong> PNGs saved &nbsp;·&nbsp;
    <span id="sample">—</span>
  </div>
</div>

<div class="grid">
  <div class="card">
    <div class="card-label">Frame</div>
    <div class="card-value" id="cardFrame">—</div>
    <div class="card-sub">of 450 total</div>
  </div>
  <div class="card cyan">
    <div class="card-label">Elapsed</div>
    <div class="card-value" id="cardElapsed">—</div>
    <div class="card-sub">render time</div>
  </div>
  <div class="card violet">
    <div class="card-label">Remaining</div>
    <div class="card-value" id="cardRemain">—</div>
    <div class="card-sub">estimated</div>
  </div>
  <div class="card green">
    <div class="card-label">Memory</div>
    <div class="card-value" id="cardMem">—</div>
    <div class="card-sub">peak MB</div>
  </div>
  <div class="card amber">
    <div class="card-label">Samples</div>
    <div class="card-value" id="cardSample">—</div>
    <div class="card-sub">per frame</div>
  </div>
  <div class="card">
    <div class="card-label">Resolution</div>
    <div class="card-value" style="font-size:20px">960×540</div>
    <div class="card-sub">preview quality</div>
  </div>
</div>

<div class="lower">
  <div class="phase-wrap">
    <div>
      <div class="phase-label">Current Phase</div>
      <div class="phase-value" id="phase">Waiting for Blender…</div>
    </div>
    <div class="phase-dots" id="dots">
      ${Array.from({length: 30}, (_, i) => `<div class="dot" id="dot${i}"></div>`).join('')}
    </div>
  </div>
  <div class="log-wrap" style="position:relative">
    <div class="log-title">Blender Output</div>
    <div id="logLines"></div>
  </div>
</div>

<footer>XELA Themes · <span>xela-themes-promo.py</span> · Cycles renderer · 32 samples · ffmpeg stitch on completion</footer>

<div class="done-banner" id="doneBanner">
  <div class="done-title">Render Complete</div>
  <div class="done-sub" id="doneSubtitle">xela_promo.mp4 is ready</div>
  <button class="done-btn" onclick="document.getElementById('doneBanner').classList.remove('show')">Dismiss</button>
</div>

<script>
const TOTAL = 450;
let lastFrame = -1;
let doneSeen  = false;

function classify(line) {
  if (/^Fra:/.test(line))           return 'fra';
  if (/Saved:/.test(line))          return 'saved';
  if (/error|Error|fail/i.test(line)) return 'error';
  return '';
}

async function tick() {
  try {
    const res = await fetch('/api/progress');
    const d   = await res.json();
    const pct = d.percent;

    document.getElementById('pct').textContent      = pct + '%';
    document.getElementById('barFill').style.width  = pct + '%';
    document.getElementById('frameNum').textContent = d.frame;
    document.getElementById('pngCount').textContent = d.pngCount;
    document.getElementById('sample').textContent   = d.sample !== '—' ? 'Sample ' + d.sample : '—';
    document.getElementById('cardFrame').textContent  = d.frame;
    document.getElementById('cardElapsed').textContent= d.timeStr;
    document.getElementById('cardRemain').textContent = d.remainStr;
    document.getElementById('cardMem').textContent    = d.memMB ? Math.round(d.memMB) : '—';
    document.getElementById('cardSample').textContent = d.sample;
    document.getElementById('phase').textContent      = d.phase;

    // Status pill
    const pill = document.getElementById('statusPill');
    if (d.done) {
      pill.className = 'pill done'; pill.textContent = 'Complete';
    } else if (d.frame > 0) {
      pill.className = 'pill live'; pill.textContent = 'Rendering';
    } else {
      pill.className = 'pill'; pill.textContent = 'Waiting';
    }

    // Dots
    const dotCount = 30;
    const doneDots = Math.round((d.frame / TOTAL) * dotCount);
    for (let i = 0; i < dotCount; i++) {
      const el = document.getElementById('dot' + i);
      if (!el) continue;
      if (i < doneDots - 1)    el.className = 'dot done-dot';
      else if (i === doneDots - 1) el.className = 'dot active-dot';
      else                     el.className = 'dot';
    }

    // Log lines
    const logEl = document.getElementById('logLines');
    logEl.innerHTML = d.recentLines.map((l, i) => {
      const cls = classify(l) + (i === d.recentLines.length - 1 ? ' fresh' : '');
      return '<div class="log-line ' + cls + '">' +
        l.replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</div>';
    }).join('');

    // Done banner
    if (d.done && !doneSeen) {
      doneSeen = true;
      const sub = d.mp4Path
        ? 'xela_promo.mp4 saved — opening in video player'
        : 'PNG sequence complete — check render/ folder';
      document.getElementById('doneSubtitle').textContent = sub;
      document.getElementById('doneBanner').classList.add('show');
    }
  } catch(e) {
    document.getElementById('phase').textContent = 'Server unreachable — retrying…';
  }
}

tick();
setInterval(tick, 2000);
</script>
</body>
</html>`;

// ---------------------------------------------------------------------------
// HTTP server
// ---------------------------------------------------------------------------

const server = http.createServer((req, res) => {
  if (req.url === '/api/progress') {
    const data = parseLog();
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(JSON.stringify(data));
    return;
  }

  // Serve dashboard HTML
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(HTML);
});

server.listen(PORT, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${PORT}`;
  console.log(`\n  XELA Render Dashboard → ${url}\n`);
  console.log(`  Log: ${LOG_FILE}`);
  console.log(`  Polling every 2s. Ctrl+C to stop.\n`);

  // Auto-open browser
  const open = process.platform === 'win32'
    ? `start "" "${url}"`
    : process.platform === 'darwin'
      ? `open "${url}"`
      : `xdg-open "${url}"`;
  exec(open);
});
