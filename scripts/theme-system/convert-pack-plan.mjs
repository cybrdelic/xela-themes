import fs from 'node:fs';

const packs = JSON.parse(fs.readFileSync(new URL('../../theme-packs.json', import.meta.url), 'utf8'));
const outputLines = [
  'export const manualPackPlan = ['
];

packs.forEach((pack, index) => {
  outputLines.push('  {');
  outputLines.push(`    id: '${pack.id}',`);
  outputLines.push(`    label: '${pack.label.replace(/'/g, "\\'")}',`);
  outputLines.push(`    description: '${pack.description.replace(/'/g, "\\'")}',`);
  outputLines.push('    themeIds: [');
  pack.themes.forEach((theme, themeIndex) => {
    const suffix = themeIndex === pack.themes.length - 1 ? '' : ',';
    outputLines.push(`      '${theme.id}'${suffix}`);
  });
  outputLines.push('    ]');
  outputLines.push(index === packs.length - 1 ? '  }' : '  },');
});

outputLines.push('];');

fs.writeFileSync(new URL('pack-plan.manual.js', import.meta.url), outputLines.join('\n'));
