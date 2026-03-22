const STORAGE_KEY = 'xela_theme_id';
const PACK_KEY = 'xela_pack_id';
const DEFAULT_THEME_ID = 'xela-space-gray';

let themes = [];
let packs = [];
let currentThemeId = DEFAULT_THEME_ID;
let currentPackId = 'all';
let filterText = '';

async function init() {
  const url = chrome.runtime.getURL('themes.json');
  const data = await (await fetch(url)).json();
  themes = data.themes;
  packs = data.packs;

  const stored = await chrome.storage.sync.get([STORAGE_KEY, PACK_KEY]);
  currentThemeId = stored[STORAGE_KEY] || DEFAULT_THEME_ID;
  currentPackId = stored[PACK_KEY] || 'all';

  buildPackSelect();
  render();

  document.getElementById('search').addEventListener('input', e => { filterText = e.target.value; render(); });
  document.getElementById('pack').addEventListener('change', e => {
    currentPackId = e.target.value;
    chrome.storage.sync.set({ [PACK_KEY]: currentPackId });
    render();
  });
}

function buildPackSelect() {
  const sel = document.getElementById('pack');
  sel.innerHTML = `<option value="all">All Themes</option>` +
    packs.map(p => `<option value="${p.id}" ${p.id === currentPackId ? 'selected' : ''}>${esc(p.label)}</option>`).join('');
}

function getFiltered() {
  const packObj = packs.find(p => p.id === currentPackId);
  const filter = filterText.trim().toLowerCase();
  return themes.filter(t => {
    if (currentPackId !== 'all' && packObj && !packObj.availableThemeIds.includes(t.id)) return false;
    if (!filter) return true;
    return [t.name, t.id, ...(t.packLabels || [])].some(v => v.toLowerCase().includes(filter));
  });
}

function render() {
  const filtered = getFiltered();
  document.getElementById('meta').textContent = `${filtered.length} themes`;

  const list = document.getElementById('list');
  list.innerHTML = filtered.map(t => {
    const p = t.palette;
    const active = t.id === currentThemeId;
    return `<button class="theme-btn ${active ? 'active' : ''}" data-id="${t.id}"
      style="${active ? `--active-accent:${p.accent}` : ''}">
      <span class="swatches">
        <span class="swatch" style="background:${p.bg}"></span>
        <span class="swatch" style="background:${p.accent}"></span>
        <span class="swatch" style="background:${p.text}"></span>
      </span>
      <span>
        <div class="theme-name">${esc(t.name)}</div>
        <div class="theme-sub">${esc((t.packLabels || []).join(' · ') || t.type)}</div>
      </span>
    </button>`;
  }).join('');

  list.querySelectorAll('[data-id]').forEach(btn => {
    btn.addEventListener('click', () => selectTheme(btn.dataset.id));
  });

  const activeBtn = list.querySelector('.active');
  if (activeBtn) activeBtn.scrollIntoView({ block: 'nearest' });
}

async function selectTheme(themeId) {
  currentThemeId = themeId;
  await chrome.storage.sync.set({ [STORAGE_KEY]: themeId });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    chrome.tabs.sendMessage(tab.id, { type: 'XELA_SET_THEME', themeId }).catch(() => {});
  }

  render();
}

function esc(v) {
  return String(v || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

init();
