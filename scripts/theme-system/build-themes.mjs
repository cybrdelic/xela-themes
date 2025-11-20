#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { buildCompleteColors } from './color-mapping.js';
import { getEnhancedHtmlTokens } from './html-tokens.js';
import { themes } from './theme-config.mjs';
import { buildBaseTokens } from './token-base.js';

const outDir = path.resolve('./themes');

const requestedIds = process.argv.slice(2);
const requestedSet = new Set(requestedIds);
const activeThemes = requestedSet.size
  ? themes.filter(t => requestedSet.has(t.id))
  : themes;

if (requestedSet.size && activeThemes.length === 0) {
  console.error('No matching themes for ids:', [...requestedSet].join(', '));
  process.exit(1);
}

const missing = requestedIds.filter(id => !themes.find(t => t.id === id));
if (missing.length) {
  console.warn('⚠️  Missing theme definitions for:', missing.join(', '));
}

function build(){
  activeThemes.forEach(t => {
    const htmlTokens = getEnhancedHtmlTokens(t.htmlScheme);
    const roles = t.roles; // surfaces + text + accents etc.
    const baseTokens = buildBaseTokens(t.tokens(roles));

    // Use comprehensive color mapping with optional per-theme overrides
    const colors = buildCompleteColors(roles, t.colorOverrides || {});

    const semanticHighlighting = t.semanticHighlighting !== undefined ? t.semanticHighlighting : true;
    const semanticTokens = t.semanticTokens || null;

    const json = {
      $schema: 'vscode://schemas/color-theme',
      name: t.name,
      type: t.type,
      semanticHighlighting,
      xGenerated: true,
      colors,
      tokenColors: [...baseTokens, ...htmlTokens]
    };

    if (semanticTokens) {
      json.semanticTokenColors = semanticTokens;
    }

    const file = path.join(outDir, `${t.id}-color-theme.json`);
    fs.writeFileSync(file, JSON.stringify(json,null,2));
    console.log('Generated', file);
  });
}

build();
