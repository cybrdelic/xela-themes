#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { buildCompleteColors } from './color-mapping.js';
import { getEnhancedHtmlTokens } from './html-tokens.js';
import { themes } from './theme-config.js';
import { buildBaseTokens } from './token-base.js';

const outDir = path.resolve('./themes');

function build(){
  themes.forEach(t => {
    const htmlTokens = getEnhancedHtmlTokens(t.htmlScheme);
    const roles = t.roles; // surfaces + text + accents etc.
    const baseTokens = buildBaseTokens(t.tokens(roles));

    // Use comprehensive color mapping that covers all VS Code color keys
    const colors = buildCompleteColors(roles);

    const json = {
      $schema: 'vscode://schemas/color-theme',
      name: t.name,
      type: t.type,
      semanticHighlighting: true,
      xGenerated: true,
      colors,
      tokenColors: [...baseTokens, ...htmlTokens],
      semanticTokenColors: {
        function: '#00F5A0',
        string: '#22C55E',
        number: '#FFD166',
        keyword: '#FFD166',
        type: '#D8C8FF'
      }
    };

    const file = path.join(outDir, `${t.id}-color-theme.json`);
    fs.writeFileSync(file, JSON.stringify(json,null,2));
    console.log('Generated', file);
  });
}

build();
