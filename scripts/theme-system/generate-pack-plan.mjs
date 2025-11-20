import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const manualPlanPath = path.join(rootDir, 'scripts', 'theme-system', 'pack-plan.manual.js');
const manualPackPlan = fs.existsSync(manualPlanPath)
  ? (await import(pathToFileURL(manualPlanPath).href)).manualPackPlan
  : null;

const normalize = (value) => value.toLowerCase();
const deriveId = (themePath) => {
  const match = /xela-(.+)-color-theme\.json$/i.exec(themePath);
  return match ? `xela-${match[1]}` : path.basename(themePath).replace(/\.json$/i, '');
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const createMatcher = (keyword) => {
  if (keyword instanceof RegExp) {
    return keyword;
  }
  const safe = escapeRegex(keyword);
  if (/[^a-z0-9]/i.test(keyword)) {
    return new RegExp(safe, 'i');
  }
  return new RegExp(`\\b${safe}\\b`, 'i');
};

const buildMatchers = (values = []) => values.map(createMatcher);
const countMatches = (matchers, text) =>
  matchers.reduce((score, matcher) => (matcher.test(text) ? score + 1 : score), 0);

const packDefinitions = manualPackPlan
  ? []
  : [
  {
    id: 'xela-oled-obsidian',
    label: 'XELA OLED Obsidian Pack',
    description: 'Pure black, OLED, graphite, and ink-inspired palettes built for contrast purists.',
    priority: 80,
    keywords: [
      'amoled',
      'pure oled',
      'oled perfect',
      'obsidian',
      'void',
      'abyss',
      'shadow realm',
      'noir',
      'carbon fiber',
      'black glass',
      'void mist',
      'cosmic void'
    ],
    excludeKeywords: [
      'graphite',
      'paper',
      'reader',
      'e-ink',
      'atelier',
      'studio',
      'pastel',
      'garden',
      'forest',
      'sunrise',
      'sunset',
      'cupertino',
      'arctic',
      'polar',
      'botanical',
      'sage',
      'stone',
      'terra',
      'ramen',
      'startup',
      'neon',
      'cyber',
      'matrix',
      'plasma',
      'digital',
      'rain',
      'storm',
      'coastal',
      'ocean',
      'aurora',
      'velvet',
      'midnight',
      'golden',
      'espresso',
      'coffee'
    ],
    segments: [
      {
        id: 'obsidian-core',
        label: 'XELA Obsidian Core',
        description: 'Flagship OLED blacks, mission-critical noir workhorses.'
      },
      {
        id: 'obsidian-spectrum',
        label: 'XELA Obsidian Spectrum',
        description: 'Experimental black glass, neon noir, and iridescent contrast studies.'
      },
      {
        id: 'obsidian-archive',
        label: 'XELA Obsidian Archive',
        description: 'Legacy noir experiments, limited drops, and storytelling dark modes.'
      }
    ]
  },
  {
    id: 'xela-midnight-celestial',
    label: 'XELA Midnight Celestial Pack',
    description: 'Deep indigo, lunar, nebular, and starlit palettes for nocturnal work.',
    priority: 70,
    keywords: [
      'midnight',
      'night vision',
      'aurora',
      'northern lights',
      'cosmic',
      'nebula',
      'stellar',
      'galaxy',
      'twilight',
      'velvet',
      'tokyo neon',
      'shibuya'
    ],
    segments: [
      {
        id: 'midnight-voyage',
        label: 'XELA Midnight Voyage',
        description: 'Aurora expeditions, cosmic wayfinding, and meditative night skies.'
      },
      {
        id: 'midnight-pulse',
        label: 'XELA Midnight Pulse',
        description: 'Neon cities, electric rain, and high-energy nocturnal palettes.'
      }
    ]
  },
  {
    id: 'xela-graphite-minimal',
    label: 'XELA Graphite Minimal Pack',
    description: 'Greyscale, mono, and zen minimalist palettes that remove every distraction.',
    priority: 75,
    keywords: [
      'graphite',
      'minimal',
      'monastic',
      'monochrome',
      'borderless',
      'focus',
      'zen',
      'linen',
      'pewter',
      'graph paper',
      'chalk',
      'slate',
      'porcelain',
      'ivory',
      'pearl',
      'smoke',
      'mono',
      'clean slate',
      'deep focus',
      'e-ink',
      'inkwell',
      'paper white',
      'reader mode',
      'eye care',
      'titanium',
      'tungsten',
      'charcoal'
    ],
    segments: [
      {
        id: 'graphite-focus',
        label: 'XELA Graphite Focus',
        description: 'High-contrast monochrome workhorses for deep concentration.'
      },
      {
        id: 'graphite-atelier',
        label: 'XELA Graphite Atelier',
        description: 'Designer-grade greys, editorial whites, and typographic precision.'
      },
      {
        id: 'graphite-zen',
        label: 'XELA Graphite Zen',
        description: 'Soft grayscale palettes tuned for wellness and mindful coding.'
      }
    ]
  },
  {
    id: 'xela-paper-studio-light',
    label: 'XELA Paper Studio Light Pack',
    description: 'Notebook, manuscript, and daylight studio palettes tuned for calm clarity.',
    priority: 60,
    keywords: [
      'paper',
      'reader',
      'writer',
      'notebook',
      'journal',
      'manuscript',
      'scribe',
      'publisher',
      'desk',
      'workspace',
      'cafe',
      'café',
      'espresso',
      'atelier',
      'studio',
      'stone garden',
      'coffee'
    ]
  },
  {
    id: 'xela-cupertino-luminous',
    label: 'XELA Cupertino Luminous Pack',
    description: 'Aqua, macOS, and Apple system palettes with luminous glass aesthetics.',
    priority: 65,
    keywords: [
      'cupertino',
      'aqua',
      'apple',
      'mac',
      'facetime',
      'imessage',
      'continuity',
      'retina',
      'pro display',
      'monterey',
      'sonoma',
      'studio display',
      'cupertino prism',
      'space gray'
    ]
  },
  {
    id: 'xela-pastel-botanical',
    label: 'XELA Pastel & Botanical Pack',
    description: 'Soft lavender, floral, and plant-inspired palettes for gentle creative flow.',
    priority: 55,
    keywords: [
      'pastel',
      'botanical',
      'flora',
      'bloom',
      'lavender',
      'rose',
      'sage',
      'garden',
      'seraphine',
      'orchid',
      'quartz',
      'mint cream',
      'cream',
      'blossom',
      'ballet',
      'peony',
      'meadow'
    ]
  },
  {
    id: 'xela-forest-earth',
    label: 'XELA Forest & Earth Pack',
    description: 'Verdant forest, moss, stone, and earthen palettes grounded in nature.',
    priority: 50,
    keywords: [
      'forest',
      'cedar',
      'canopy',
      'cathedral',
      'wood',
      'timber',
      'moss',
      'stone',
      'terra',
      'earth',
      'ember',
      'volcanic',
      'forge',
      'sagebrush',
      'oak',
      'grove',
      'evergreen'
    ]
  },
  {
    id: 'xela-coastal-atmosphere',
    label: 'XELA Coastal Atmosphere Pack',
    description: 'Oceanic, polar, and mist-filled atmosphere palettes for airy focus.',
    priority: 45,
    keywords: [
      'ocean',
      'depth',
      'marine',
      'tide',
      'sea',
      'fjord',
      'lagoon',
      'reef',
      'arctic',
      'polar',
      'glacier',
      'aurora',
      'borealis',
      'mist',
      'coast',
      'wave',
      'currents',
      'ice'
    ],
    segments: [
      {
        id: 'coastal-drift',
        label: 'XELA Coastal Drift',
        description: 'Ocean currents, abyssal gradients, and maritime blues.'
      },
      {
        id: 'polar-mist',
        label: 'XELA Polar Mist',
        description: 'Glacial glass, aurora mists, and polar daylight palettes.'
      }
    ]
  },
  {
    id: 'xela-sunrise-warm',
    label: 'XELA Sunrise Warmth Pack',
    description: 'Golden hour, ember, canyon, and desert palettes with warm energy.',
    priority: 40,
    keywords: [
      'sunrise',
      'sunset',
      'horizon',
      'golden',
      'ember',
      'solar',
      'sonoran',
      'desert',
      'mirage',
      'dawn',
      'daybreak',
      'honey',
      'canyon',
      'aurora glow',
      'volcano',
      'sun',
      'blaze',
      'mojave'
    ]
  },
  {
    id: 'xela-neon-grid',
    label: 'XELA Neon Grid Pack',
    description: 'Synthwave, outrun, and neon grid palettes for high-energy sessions.',
    priority: 35,
    keywords: ['neon', 'synthwave', 'outrun', 'grid', 'wireframe', 'vector', 'retrowave', 'laser', 'tron', 'hyperdrive', 'vaporwave', 'glitch', 'arcade']
  },
  {
    id: 'xela-cyber-future',
    label: 'XELA Cyber Future Pack',
    description: 'Cyberpunk, matrix, AI, and data-stream palettes for futuristic stacks.',
    priority: 38,
    keywords: [
      'cyber',
      'matrix',
      'digital',
      'quantum',
      'flux',
      'neural',
      'circuit',
      'ai',
      'network',
      'proto',
      'plasma',
      'terminalist',
      'data',
      'terminalist',
      'matrix rain',
      'digital rain'
    ]
  },
  {
    id: 'xela-retro-print',
    label: 'XELA Retro Print Pack',
    description: 'Retro tech, brutalist, and typographic palettes with nostalgic flair.',
    priority: 30,
    keywords: ['retro', 'terminal', 'amber', 'bauhaus', 'brutalist', 'barbie', 'ink print', 'typography', 'wwdc', 'garage', 'nostalgia', 'analog', 'tape', 'classic', 'heritage', 'vintage', 'mr. robot']
  },
  {
    id: 'xela-pro-studio',
    label: 'XELA Pro Studio Pack',
    description: 'Blueprint, drafting, finance, and studio-grade palettes for professional teams.',
    priority: 32,
    keywords: ['studio', 'blueprint', 'boardroom', 'data', 'analyst', 'trader', 'finance', 'quant', 'executive', 'ux', 'designer', 'laboratory', 'lab', 'engineer', 'medical', 'surgical', 'publisher', 'professional', 'office', 'enterprise'],
    segments: [
      {
        id: 'studio-laboratory',
        label: 'XELA Studio Laboratory',
        description: 'Blueprints, drafting tables, and experimental lab palettes.'
      },
      {
        id: 'studio-executive',
        label: 'XELA Studio Executive',
        description: 'Boardroom, finance, and enterprise-ready control room palettes.'
      }
    ]
  },
  {
    id: 'xela-startup-lab',
    label: 'XELA Startup Lab Pack',
    description: 'Pitch decks, product sprints, hackathons, and entrepreneurial palettes.',
    priority: 34,
    keywords: ['startup', 'pitch', 'deck', 'product', 'mvp', 'hackathon', 'garage', 'yc', 'ramen', 'pivot', 'investor', 'venture', 'founder', 'sprint', 'accelerator', 'demo', 'prototype', 'lab', 'incubator']
  },
  {
    id: 'xela-experimental-spectrum',
    label: 'XELA Experimental Spectrum Pack',
    description: 'Iridescent, holographic, and AI-inspired palettes pushing VS Code aesthetics.',
    priority: 33,
    keywords: ['holographic', 'iridescence', 'dimensional', 'spectrum', 'prism', 'quantum flux', 'probability', 'lattice', 'glass', 'shift', 'prismatic', 'hyper', 'lantern']
  }
];

const fallbackPack = {
  id: 'xela-heritage-vault',
  label: 'XELA Heritage Vault Pack',
  description: 'Legacy favorites, seasonal experiments, and eclectic palettes awaiting future curation.',
  keywords: [],
  segments: [
    {
      id: 'heritage-classics',
      label: 'XELA Heritage Classics',
      description: 'Cult favorites and foundational palettes preserved from earlier eras.'
    },
    {
      id: 'heritage-legends',
      label: 'XELA Heritage Legends',
      description: 'Celebrated experiments, seasonal specials, and community darlings.'
    },
    {
      id: 'heritage-archive',
      label: 'XELA Heritage Archive',
      description: 'Eclectic concepts, prototypes, and nostalgic throwbacks awaiting curation.'
    }
  ]
};

const enhanceDefinition = (def, index) => ({
  ...def,
  priority: def.priority ?? packDefinitions.length - index,
  matchers: buildMatchers(def.keywords ?? []),
  excludeMatchers: buildMatchers(def.excludeKeywords ?? []),
  themes: []
});

const packs = manualPackPlan
  ? null
  : new Map(
      [...packDefinitions, fallbackPack].map((def, index) => [def.id, enhanceDefinition(def, index)])
    );

const themes = pkg.contributes.themes.map((theme) => ({
  id: deriveId(theme.path),
  label: theme.label,
  path: theme.path
}));

const manualOverrides = manualPackPlan
  ? {}
  : {
  'xela-cupertino-prism': 'xela-cupertino-luminous',
  'xela-startup-hackathon-sprint': 'xela-startup-lab',
  'xela-graphite-pro': 'xela-graphite-minimal',
  'xela-pear': 'xela-graphite-minimal',
  'xela-eink-pro': 'xela-graphite-minimal',
  'xela-e-ink-sepia': 'xela-graphite-minimal',
  'xela-midnight': 'xela-midnight-celestial',
  'xela-midnight-oil': 'xela-midnight-celestial',
  'xela-solar-ink': 'xela-sunrise-warm',
  'xela-titanium': 'xela-graphite-minimal',
  'xela-polar-lumen': 'xela-coastal-atmosphere',
  'xela-matrix-rain': 'xela-cyber-future',
  'xela-digital-rain': 'xela-cyber-future',
  'xela-plasma-storm': 'xela-cyber-future',
  'xela-vapor': 'xela-neon-grid',
  'xela-storm-grey': 'xela-graphite-minimal',
  'xela-ramen-profitable': 'xela-startup-lab',
  'xela-sanaa-lantern': 'xela-experimental-spectrum',
  'xela-inkwell-sepia': 'xela-graphite-minimal'
};

const findPackId = (theme) => {
  const override = manualOverrides[theme.id];
  if (override) {
    return override;
  }

  const searchTarget = normalize(`${theme.label} ${theme.id}`);
  let bestPackId = fallbackPack.id;
  let bestScore = 0;
  let bestPriority = -Infinity;

  for (const def of packDefinitions) {
    const pack = packs.get(def.id);
    if (!pack?.matchers.length) {
      continue;
    }
    if (pack.excludeMatchers?.length && pack.excludeMatchers.some((matcher) => matcher.test(searchTarget))) {
      continue;
    }
    const score = countMatches(pack.matchers, searchTarget);
    if (score === 0) {
      continue;
    }
    const priority = pack.priority ?? 0;
    if (score > bestScore || (score === bestScore && priority > bestPriority)) {
      bestPackId = def.id;
      bestScore = score;
      bestPriority = priority;
    }
  }

  return bestScore > 0 ? bestPackId : fallbackPack.id;
};

const writeOutputs = (summary) => {
  const jsonPath = path.join(rootDir, 'scripts', 'theme-system', 'theme-packs.json');
  fs.writeFileSync(jsonPath, JSON.stringify(summary, null, 2) + '\n');

  const runtimePacksPath = path.join(rootDir, 'theme-packs.json');
  fs.writeFileSync(runtimePacksPath, JSON.stringify(summary, null, 2) + '\n');

  const mdLines = [
    '# XELA Theme Pack Plan',
    '',
    'This document is auto-generated by `scripts/theme-system/generate-pack-plan.mjs` and lists every pack and the themes it currently contains.',
    '',
    '| Pack | Themes | Description |',
    '|------|--------|-------------|',
    ...summary.map((pack) => `| ${pack.label} | ${pack.themeCount} | ${pack.description} |`),
    ''
  ];

  for (const pack of summary) {
    mdLines.push(`## ${pack.label} (ID: ${pack.id}, ${pack.themeCount} themes)`);
    mdLines.push('');
    mdLines.push(pack.description);
    mdLines.push('');
    mdLines.push('| Theme ID | Display Name |');
    mdLines.push('|----------|--------------|');
    for (const theme of pack.themes) {
      mdLines.push(`| ${theme.id} | ${theme.label} |`);
    }
    mdLines.push('');
  }

  const mdPath = path.join(rootDir, 'docs', 'THEME-PACKS.md');
  fs.writeFileSync(mdPath, mdLines.join('\n'));

  console.log(`Generated ${summary.length} pack definitions →`);
  for (const pack of summary) {
    console.log(` • ${pack.label}: ${pack.themeCount} themes`);
  }
};

if (manualPackPlan) {
  const themeMap = new Map(themes.map((theme) => [theme.id, theme]));
  const assignedIds = new Set();
  const manualSummary = manualPackPlan.map((pack) => {
    const packThemes = pack.themeIds.map((themeId) => {
      const theme = themeMap.get(themeId);
      if (!theme) {
        throw new Error(`Manual pack plan references unknown theme id: ${themeId}`);
      }
      if (assignedIds.has(themeId)) {
        throw new Error(`Theme ${themeId} assigned multiple times in manual pack plan.`);
      }
      assignedIds.add(themeId);
      return theme;
    });
    return {
      id: pack.id,
      label: pack.label,
      description: pack.description,
      themeCount: packThemes.length,
      themes: packThemes
    };
  });

  const unassigned = themes.filter((theme) => !assignedIds.has(theme.id));
  if (unassigned.length > 0) {
    throw new Error(`Manual pack plan is missing ${unassigned.length} themes (e.g., ${unassigned[0].id}).`);
  }

  writeOutputs(manualSummary);
  process.exit(0);
}

for (const theme of themes) {
  const packId = findPackId(theme);
  packs.get(packId).themes.push(theme);
}

const MAX_THEMES_PER_PACK = 10;

const packSummary = Array.from(packs.values()).map((pack) => ({
  id: pack.id,
  label: pack.label,
  description: pack.description,
  segments: pack.segments ?? [],
  themeCount: pack.themes.length,
  themes: pack.themes.sort((a, b) => a.label.localeCompare(b.label))
}));

const chunkedSummary = [];

for (const pack of packSummary) {
  if (pack.themes.length <= MAX_THEMES_PER_PACK) {
    chunkedSummary.push(pack);
    continue;
  }

  const chunks = Math.ceil(pack.themes.length / MAX_THEMES_PER_PACK);
  for (let index = 0; index < chunks; index += 1) {
    const start = index * MAX_THEMES_PER_PACK;
    const end = start + MAX_THEMES_PER_PACK;
    const themesSlice = pack.themes.slice(start, end);
    const segment = pack.segments[index];
    const segmentId = segment?.id ?? `series-${index + 1}`;
    const segmentLabel = segment?.label ?? `${pack.label} — Set ${index + 1}`;
    const segmentDescription = segment?.description ?? `${pack.description} (set ${index + 1}/${chunks}).`;
    chunkedSummary.push({
      id: `${pack.id}-${segmentId}`,
      label: segmentLabel,
      description: segmentDescription,
      themeCount: themesSlice.length,
      themes: themesSlice
    });
  }
}

writeOutputs(chunkedSummary);
