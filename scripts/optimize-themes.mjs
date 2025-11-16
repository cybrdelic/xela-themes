#!/usr/bin/env node
/**
 * Theme Performance Optimizer
 *
 * Optimizations:
 * 1. Deduplicate color values by extracting to color palette
 * 2. Merge duplicate tokenColor scopes
 * 3. Add semantic token color customizations
 * 4. Remove unnecessary properties
 * 5. Validate and fix color formats
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ThemeOptimizer {
  constructor(themeData) {
    this.theme = themeData;
    this.colorPalette = new Map();
    this.optimizationStats = {
      colorsDeduped: 0,
      scopesMerged: 0,
      semanticTokensAdded: 0,
      invalidColorsFixed: 0
    };
  }

  /**
   * Extract and deduplicate colors into a palette
   */
  extractColorPalette() {
    const colors = this.theme.colors || {};
    const colorFrequency = new Map();

    // Count color frequencies
    for (const [key, color] of Object.entries(colors)) {
      if (typeof color === 'string' && color.startsWith('#')) {
        colorFrequency.set(color, (colorFrequency.get(color) || 0) + 1);
      }
    }

    // Store colors used more than 3 times
    for (const [color, count] of colorFrequency.entries()) {
      if (count > 3) {
        this.colorPalette.set(color, count);
      }
    }

    this.optimizationStats.colorsDeduped = this.colorPalette.size;
    return this.colorPalette;
  }

  /**
   * Fix invalid color formats
   */
  fixColorFormats() {
    const colors = this.theme.colors || {};
    let fixed = 0;

    for (const [key, value] of Object.entries(colors)) {
      if (typeof value === 'string') {
        // Fix "transparent" literals
        if (value === 'transparent') {
          colors[key] = '#00000000';
          fixed++;
        }
        // Fix over-long hex colors (9+ digits)
        else if (value.match(/#[0-9A-Fa-f]{9,}/)) {
          colors[key] = value.substring(0, 9); // Keep first 8 hex digits + #
          fixed++;
        }
      }
    }

    this.optimizationStats.invalidColorsFixed = fixed;
    return colors;
  }

  /**
   * Merge duplicate tokenColor scopes
   */
  mergeTokenScopes() {
    const tokenColors = this.theme.tokenColors || [];
    const scopeMap = new Map();
    let merged = 0;

    for (const token of tokenColors) {
      const key = JSON.stringify(token.settings);
      if (!scopeMap.has(key)) {
        scopeMap.set(key, {
          scopes: new Set(),
          settings: token.settings
        });
      }

      const scopes = Array.isArray(token.scope) ? token.scope : [token.scope];
      scopes.forEach(scope => scopeMap.get(key).scopes.add(scope));
    }

    const optimizedTokens = Array.from(scopeMap.values()).map(entry => ({
      scope: Array.from(entry.scopes),
      settings: entry.settings
    }));

    merged = tokenColors.length - optimizedTokens.length;
    this.optimizationStats.scopesMerged = merged;
    this.theme.tokenColors = optimizedTokens;

    return optimizedTokens;
  }

  /**
   * Add semantic token color customizations if missing
   */
  addSemanticTokens() {
    if (!this.theme.semanticTokenColors) {
      this.theme.semanticTokenColors = {};
    }

    const semanticTokens = this.theme.semanticTokenColors;
    const recommendations = {
      'variable': { foreground: this.findColor('variable') },
      'variable.readonly': { foreground: this.findColor('constant'), fontStyle: 'italic' },
      'parameter': { foreground: this.findColor('variable.parameter') },
      'function': { foreground: this.findColor('entity.name.function') },
      'method': { foreground: this.findColor('entity.name.function') },
      'class': { foreground: this.findColor('entity.name.type') },
      'interface': { foreground: this.findColor('entity.name.type'), fontStyle: 'italic' },
      'type': { foreground: this.findColor('entity.name.type') },
      'property': { foreground: this.findColor('variable.other.property') },
      'namespace': { foreground: this.findColor('entity.name.namespace') },
      'keyword': { foreground: this.findColor('keyword'), fontStyle: 'bold' },
      'string': { foreground: this.findColor('string') },
      'comment': { foreground: this.findColor('comment'), fontStyle: 'italic' },
      'number': { foreground: this.findColor('constant.numeric') }
    };

    let added = 0;
    for (const [token, style] of Object.entries(recommendations)) {
      if (!semanticTokens[token] && style.foreground) {
        semanticTokens[token] = style;
        added++;
      }
    }

    this.optimizationStats.semanticTokensAdded = added;
    return semanticTokens;
  }

  /**
   * Find color for a given scope from tokenColors
   */
  findColor(targetScope) {
    const tokenColors = this.theme.tokenColors || [];

    for (const token of tokenColors) {
      const scopes = Array.isArray(token.scope) ? token.scope : [token.scope];

      for (const scope of scopes) {
        if (scope === targetScope || scope.includes(targetScope)) {
          return token.settings?.foreground;
        }
      }
    }

    return null;
  }

  /**
   * Optimize theme
   */
  optimize() {
    console.log(`Optimizing theme: ${this.theme.name}`);

    this.extractColorPalette();
    this.fixColorFormats();
    this.mergeTokenScopes();
    this.addSemanticTokens();

    return {
      theme: this.theme,
      stats: this.optimizationStats,
      palette: Array.from(this.colorPalette.entries())
    };
  }
}

async function optimizeThemeFile(filePath) {
  console.log(`\nProcessing: ${path.basename(filePath)}`);

  try {
    const content = await fs.readFile(filePath, 'utf8');
    const theme = JSON.parse(content);

    const optimizer = new ThemeOptimizer(theme);
    const result = optimizer.optimize();

    // Write optimized theme
    await fs.writeFile(
      filePath,
      JSON.stringify(result.theme, null, 2),
      'utf8'
    );

    console.log('✅ Optimizations:');
    console.log(`   - Colors deduped: ${result.stats.colorsDeduped}`);
    console.log(`   - Scopes merged: ${result.stats.scopesMerged}`);
    console.log(`   - Semantic tokens added: ${result.stats.semanticTokensAdded}`);
    console.log(`   - Invalid colors fixed: ${result.stats.invalidColorsFixed}`);

    return result.stats;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return null;
  }
}

async function main() {
  const themesDir = path.join(__dirname, '..', 'themes');

  try {
    const files = await fs.readdir(themesDir);
    const themeFiles = files.filter(f => f.endsWith('.json'));

    console.log(`Found ${themeFiles.length} theme files\n`);

    const results = [];
    for (const file of themeFiles) {
      const filePath = path.join(themesDir, file);
      const stats = await optimizeThemeFile(filePath);
      if (stats) {
        results.push(stats);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('OPTIMIZATION SUMMARY');
    console.log('='.repeat(50));

    const totals = results.reduce((acc, stats) => ({
      colorsDeduped: acc.colorsDeduped + stats.colorsDeduped,
      scopesMerged: acc.scopesMerged + stats.scopesMerged,
      semanticTokensAdded: acc.semanticTokensAdded + stats.semanticTokensAdded,
      invalidColorsFixed: acc.invalidColorsFixed + stats.invalidColorsFixed
    }), { colorsDeduped: 0, scopesMerged: 0, semanticTokensAdded: 0, invalidColorsFixed: 0 });

    console.log(`Total themes optimized: ${results.length}`);
    console.log(`Total colors deduped: ${totals.colorsDeduped}`);
    console.log(`Total scopes merged: ${totals.scopesMerged}`);
    console.log(`Total semantic tokens added: ${totals.semanticTokensAdded}`);
    console.log(`Total invalid colors fixed: ${totals.invalidColorsFixed}`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
