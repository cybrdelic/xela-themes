#!/usr/bin/env node
/**
 * Development Environment Health Check
 * Verifies that the development setup is working correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 XELA Themes Development Environment Health Check\n');

const checks = [
  {
    name: 'Node modules installed',
    check: () => fs.existsSync('node_modules'),
    fix: 'Run: npm install'
  },
  {
    name: 'Launch configuration exists',
    check: () => fs.existsSync('.vscode/launch.json'),
    fix: 'File should exist automatically'
  },
  {
    name: 'Tasks configuration exists', 
    check: () => fs.existsSync('.vscode/tasks.json'),
    fix: 'File should exist automatically'
  },
  {
    name: 'Development settings exists',
    check: () => fs.existsSync('.vscode/settings.json'),
    fix: 'File should exist automatically'
  },
  {
    name: 'Package.json has dev scripts',
    check: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.scripts && pkg.scripts.dev && pkg.scripts['dev:help'];
    },
    fix: 'Development scripts should be in package.json'
  },
  {
    name: 'Extension can be packaged',
    check: () => {
      try {
        const { execSync } = require('child_process');
        execSync('npm run package', { stdio: 'pipe' });
        return fs.existsSync(path.join(process.cwd(), `xela-themes-${JSON.parse(fs.readFileSync('package.json', 'utf8')).version}.vsix`));
      } catch {
        return false;
      }
    },
    fix: 'Check npm run package for errors'
  }
];

let allPassed = true;

checks.forEach(({ name, check, fix }) => {
  const passed = check();
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${name}`);
  
  if (!passed) {
    console.log(`   💡 Fix: ${fix}`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 All checks passed! Your development environment is ready.');
  console.log('\n🚀 Quick start:');
  console.log('   1. Press F5 to launch Extension Development Host');
  console.log('   2. Edit themes in themes/ folder');
  console.log('   3. Use Developer: Reload Window to see changes');
  console.log('\n📚 Run "npm run dev:help" for detailed workflow guide');
} else {
  console.log('⚠️  Some checks failed. Please fix the issues above.');
}

console.log('');