import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const screenshotsDir = path.join(__dirname, '..', 'screenshots-vscode');
const outputFile = path.join(__dirname, '..', 'landing', 'themes-manifest.json');

function slugToTitle(slug) {
    return slug
        .replace(/^xela_/, '')
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function generateManifest() {
    const themes = [];

    if (!fs.existsSync(screenshotsDir)) {
        console.error('Screenshots directory not found:', screenshotsDir);
        process.exit(1);
    }

    const dirs = fs.readdirSync(screenshotsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .sort();

    console.log(`Found ${dirs.length} theme directories`);

    dirs.forEach(dirName => {
        const themePath = path.join(screenshotsDir, dirName);
        const files = fs.readdirSync(themePath)
            .filter(file => file.endsWith('.png'))
            .sort();

        if (files.length === 0) {
            console.warn(`No screenshots found in ${dirName}`);
            return;
        }

        const screenshots = files.map(file => ({
            filename: file,
            path: `/screenshots-vscode/${dirName}/${file}`,
            type: file.includes('code') ? 'code' :
                  file.includes('html') ? 'html' :
                  file.includes('markdown') ? 'markdown' :
                  file.includes('search') ? 'search' :
                  file.includes('suggest') ? 'suggest' :
                  file.includes('terminal') ? 'terminal' :
                  file.includes('settings') ? 'settings' :
                  file.includes('command') ? 'command' : 'other'
        }));

        const theme = {
            id: dirName,
            name: slugToTitle(dirName),
            slug: dirName,
            screenshots: screenshots,
            thumbnail: screenshots[0].path,
            screenshotCount: screenshots.length
        };

        themes.push(theme);
    });

    const manifest = {
        generated: new Date().toISOString(),
        count: themes.length,
        themes: themes
    };

    fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
    console.log(`✅ Generated manifest with ${themes.length} themes`);
    console.log(`📄 Saved to: ${outputFile}`);
}

generateManifest();
