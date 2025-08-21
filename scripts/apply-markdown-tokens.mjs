import { parse } from 'jsonc-parser';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

// This script augments each theme with comprehensive Markdown tokenColors.
// It only adds missing scopes and preserves existing ones.

const root = dirname(new URL(import.meta.url).pathname);
const themesDir = join(root, '..', 'themes');

// Canonical Markdown token colors shared across the XELA palette
// Note: Scopes are aligned with VS Code's default Markdown TextMate grammar
const markdownTokens = [
  { scope: ["markup.heading","entity.name.section","punctuation.definition.heading.markdown"], settings: { fontStyle: "bold" } },
  { scope: ["heading.1.markdown","markup.heading.setext.1.markdown"], settings: { foreground: "#F2C97D", fontStyle: "bold" } },
  { scope: ["heading.2.markdown","markup.heading.setext.2.markdown"], settings: { foreground: "#FF88C2", fontStyle: "bold" } },
  { scope: ["heading.3.markdown"], settings: { foreground: "#00F5A0", fontStyle: "bold" } },
  { scope: ["heading.4.markdown"], settings: { foreground: "#C8B0FF", fontStyle: "bold" } },
  { scope: ["heading.5.markdown"], settings: { foreground: "#F7B883", fontStyle: "bold" } },
  { scope: ["heading.6.markdown"], settings: { foreground: "#EADCB2", fontStyle: "bold" } },

  { scope: ["markup.heading","markup.heading.markdown","markup.heading.setext"], settings: { fontStyle: "bold" } },
  { scope: ["punctuation.definition.heading.markdown"], settings: { foreground: "#A6AAB4" } },

  { scope: ["markup.bold","markup.bold.markdown"], settings: { foreground: "#F5F2E8", fontStyle: "bold" } },
  { scope: ["punctuation.definition.bold.markdown"], settings: { foreground: "#FFD166" } },

  { scope: ["markup.italic","markup.italic.markdown"], settings: { foreground: "#EADCB2", fontStyle: "italic" } },
  { scope: ["punctuation.definition.italic.markdown"], settings: { foreground: "#FFD16688" } },

  { scope: ["markup.strikethrough"], settings: { foreground: "#A6ACBA", fontStyle: "strikethrough" } },
  { scope: ["markup.inserted"], settings: { foreground: "#79E49A" } },
  { scope: ["markup.deleted"], settings: { foreground: "#FF5A87" } },
  { scope: ["markup.changed"], settings: { foreground: "#FFD166" } },

  { scope: ["markup.underline.link","markup.underline.link.markdown","markup.link","meta.link","meta.link.inline","meta.link.reference"], settings: { foreground: "#4CFFCA", fontStyle: "underline" } },
  { scope: ["string.other.link.title.markdown"], settings: { foreground: "#F7F8FA" } },
  { scope: ["string.other.link.description.markdown"], settings: { foreground: "#D8C8FF" } },
  { scope: ["constant.other.reference.link.markdown"], settings: { foreground: "#A6AAB4" } },

  { scope: ["markup.inline.raw","markup.raw.inline"], settings: { foreground: "#EADCB2" } },
  { scope: ["markup.fenced_code.block.markdown","markup.fenced_code","markup.raw.block"], settings: { foreground: "#EADCB2" } },
  { scope: ["punctuation.definition.raw.markdown","punctuation.definition.fenced.markdown"], settings: { foreground: "#A6AAB4" } },
  { scope: ["fenced_code.block.language"], settings: { foreground: "#A6AAB4" } },

  { scope: ["meta.embedded.block.frontmatter","meta.front-matter","punctuation.definition.metadata.markdown"], settings: { foreground: "#8E93A6" } },

  { scope: ["markup.quote","markup.quote.markdown"], settings: { foreground: "#A6AAB4", fontStyle: "italic" } },
  { scope: ["punctuation.definition.quote.begin.markdown"], settings: { foreground: "#FFD166" } },
  { scope: ["meta.separator.markdown"], settings: { foreground: "#242a31" } },

  { scope: ["markup.list","markup.list.numbered","markup.list.unnumbered"], settings: { foreground: "#FFD166" } },
  { scope: ["punctuation.definition.list.begin.markdown"], settings: { foreground: "#FFD166" } },

  { scope: ["markup.table"], settings: { foreground: "#EDEFF2" } },
  { scope: ["markup.table.header"], settings: { foreground: "#D8C8FF", fontStyle: "bold" } },
  { scope: ["punctuation.definition.table.markdown","meta.table.separator.markdown"], settings: { foreground: "#242a31" } },

  { scope: ["markup.input.checkbox"], settings: { foreground: "#00F5A0" } },
  { scope: ["meta.image.inline","meta.image.reference"], settings: { foreground: "#4CFFCA" } }
];

function normalizeScopes(scope) {
  if (!scope) return [];
  if (Array.isArray(scope)) return scope.map(String);
  if (typeof scope === 'string') return [scope];
  return [];
}

function buildExistingScopeSet(tokenColors) {
  const set = new Set();
  for (const entry of tokenColors || []) {
    const scopes = normalizeScopes(entry.scope);
    for (const sc of scopes) set.add(sc);
  }
  return set;
}

function addMissingMarkdownTokens(themeObj) {
  if (!Array.isArray(themeObj.tokenColors)) themeObj.tokenColors = [];
  const existing = buildExistingScopeSet(themeObj.tokenColors);
  const additions = [];

  for (const token of markdownTokens) {
    const scopes = normalizeScopes(token.scope);
    const missing = scopes.some(sc => !existing.has(sc));
    if (missing) {
      additions.push(token);
      for (const sc of scopes) existing.add(sc);
    }
  }

  if (additions.length) {
    themeObj.tokenColors.push(...additions);
    return additions.length;
  }
  return 0;
}

function processThemeFile(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const json = parse(raw);
  if (!json || typeof json !== 'object') {
    console.warn(`Skipping unparsable theme: ${filePath}`);
    return { updated: false, added: 0 };
  }
  const added = addMissingMarkdownTokens(json);
  if (added > 0) {
    // Write pretty JSON (dropping comments). Intentionally preserve key order as much as possible.
    writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
    return { updated: true, added };
  }
  return { updated: false, added: 0 };
}

function run() {
  const files = readdirSync(themesDir).filter(f => f.endsWith('.json'));
  let totalAdded = 0;
  let updatedFiles = 0;
  for (const f of files) {
    const fp = join(themesDir, f);
    const { updated, added } = processThemeFile(fp);
    if (updated) {
      updatedFiles += 1;
      totalAdded += added;
      console.log(`Updated ${f}: +${added} markdown token rules`);
    } else {
      console.log(`No changes: ${f}`);
    }
  }
  console.log(`\nDone. Updated ${updatedFiles} theme(s), added ${totalAdded} token rule(s).`);
}

run();
