#!/usr/bin/env node
/**
 * CI trigger helper.
 * Flags:
 *  --dry       Dispatch dry run (force publish path but skip marketplace publish)
 *  --publish   Dispatch force publish real run
 *  --logs      Show latest run summaries
 */
const { execSync } = require('child_process');

function sh(cmd){ return execSync(cmd,{stdio:'pipe'}).toString().trim(); }

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const pub = args.includes('--publish');
const logs = args.includes('--logs');

if ([dry,pub,logs].filter(Boolean).length !== 1){
  console.error('Use exactly one flag: --dry | --publish | --logs');
  process.exit(1);
}

if (dry || pub){
  const force = 'force_publish=true';
  const dr = dry ? '-f dry_run=true' : '-f dry_run=false';
  console.log(`Dispatching workflow (dry=${dry})...`);
  try {
    execSync(`gh workflow run publish.yml -f ${force} ${dr}`, { stdio: 'inherit' });
  } catch(e){ process.exit(e.status || 1); }
  console.log('Dispatched. Use: npm run ci:logs');
  process.exit(0);
}

if (logs){
  try {
    const out = sh('gh run list --workflow=publish.yml --limit 1');
    const idMatch = out.match(/\s(\d+)\s*$/m) || out.match(/\b(\d{6,})\b/);
    if(!idMatch){ console.error('Could not extract run ID. Raw:\n'+out); process.exit(1); }
    const id = idMatch[1];
    console.log('Latest run id:', id);
    const log = sh(`gh run view ${id} --log`);
    // Extract Build & Publish summaries
    const segments = log.split(/\r?\n/).filter(l => /Build Summary|Publish Summary|Dry run enabled|VSCE_TOKEN:|Version:|Ref Tag:/.test(l));
    console.log('\n--- Filtered Summary ---');
    console.log(segments.join('\n'));
  } catch(e){
    console.error('Failed to fetch logs:', e.message);
    process.exit(e.status || 1);
  }
}
