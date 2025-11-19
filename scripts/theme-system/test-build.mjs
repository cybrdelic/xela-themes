#!/usr/bin/env node
// Simple test runner without external deps.
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themesDir = path.resolve(__dirname,'../../themes');

function readJSON(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }

function run(){
  const generated = fs.readdirSync(themesDir).filter(f=>f.endsWith('-color-theme.json'));
  assert(generated.length>0,'No generated theme files found. Run build-themes.');
  generated.forEach(f => {
    const full = path.join(themesDir,f);
    const json = readJSON(full);
    assert(json.tokenColors && json.tokenColors.length>20, 'tokenColors insufficient in '+f);
    const htmlTagToken = json.tokenColors.find(t=>Array.isArray(t.scope)?t.scope.includes('entity.name.tag.html'):t.scope==='entity.name.tag.html');
    assert(htmlTagToken, 'Missing HTML tag token in '+f);
  });
  console.log('All theme generation tests passed (',generated.length,'files ).');
}

run();
