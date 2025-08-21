#!/usr/bin/env node
/**
 * Simple release helper.
 * Usage: npm run release:tag -- <version>
 */
const { execSync } = require('child_process');
const fs = require('fs');

const v = process.argv[2];
if (!v) {
  console.error('Usage: npm run release:tag -- <version>');
  process.exit(1);
}
if(!/^\d+\.\d+\.\d+$/.test(v)) {
  console.error('Version must be semver like 1.2.3');
  process.exit(1);
}

const pkgPath = 'package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const old = pkg.version;
pkg.version = v;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`Version bumped: ${old} -> ${v}`);
execSync('git add package.json', { stdio: 'inherit' });
execSync(`git commit -m "chore(release): ${v}"`, { stdio: 'inherit' });
execSync(`git tag v${v}` , { stdio: 'inherit' });
execSync('git push origin master --follow-tags', { stdio: 'inherit' });
console.log('Release commit and tag pushed.');
