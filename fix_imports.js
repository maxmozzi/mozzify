
const fs = require('fs');
const path = require('path');

const PRODUCTS_DATA_PATH = path.join(process.cwd(), 'src/data/generated-products.ts');
const IMAGES_ROOT = path.join(process.cwd(), 'src/images/products');

// Map: filename.toLowerCase() -> set of relative paths (e.g. "Brand/Category/filename.webp")
const fileMap = new Map();

function scanDir(dir, relativePath = '') {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const relPath = path.join(relativePath, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanDir(fullPath, relPath);
        } else {
            const key = item.toLowerCase();
            if (!fileMap.has(key)) {
                fileMap.set(key, []);
            }
            fileMap.get(key).push(relPath.replace(/\\/g, '/'));
        }
    }
}

console.log('Scanning images...');
if (fs.existsSync(IMAGES_ROOT)) {
    scanDir(IMAGES_ROOT);
} else {
    console.error(`Images root not found: ${IMAGES_ROOT}`);
    process.exit(1);
}
console.log(`Found ${fileMap.size} unique filenames.`);

let content = fs.readFileSync(PRODUCTS_DATA_PATH, 'utf-8');
let lines = content.split('\n');
let fixedLines = [];
let changes = 0;

const importRegex = /import\s+(.+?)\s+from\s+['"]@\/images\/products\/(.+?)['"];/;

for (let line of lines) {
    const match = line.match(importRegex);
    if (match) {
        const [fullLine, varName, importPath] = match;
        // importPath is like "Brand/Category/filename.webp"
        const parts = importPath.split('/');
        const filename = parts[parts.length - 1];
        const key = filename.toLowerCase();

        if (fileMap.has(key)) {
            const candidates = fileMap.get(key);
            // If only one candidate, easy fix
            // If multiple, try to match Brand (first part of path)
            let bestMatch = null;

            // Current Brand
            const currentBrand = parts[0].toLowerCase();

            if (candidates.length === 1) {
                bestMatch = candidates[0];
            } else {
                // Try to find same brand
                bestMatch = candidates.find(c => c.toLowerCase().startsWith(currentBrand + '/'));
            }

            if (bestMatch) {
                const newImportPath = `@/images/products/${bestMatch}`;
                if (newImportPath !== `@/images/products/${importPath}`) {
                    // Fix it!
                    const newLine = line.replace(`@/images/products/${importPath}`, newImportPath);
                    fixedLines.push(newLine);
                    changes++;
                    // console.log(`Fixed: ${importPath} -> ${bestMatch}`);
                } else {
                    fixedLines.push(line);
                }
            } else {
                console.warn(`Ambiguous or lost file: ${filename} (found ${candidates.length} matches)`);
                fixedLines.push(line);
            }
        } else {
            // File not found in scan
            // console.warn(`File not found on disk: ${filename}`);
            fixedLines.push(line);
        }
    } else {
        fixedLines.push(line);
    }
}

console.log(`Updated ${changes} imports.`);
fs.writeFileSync(PRODUCTS_DATA_PATH, fixedLines.join('\n'));
