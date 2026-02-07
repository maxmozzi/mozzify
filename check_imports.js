
const fs = require('fs');
const path = require('path');

const PRODUCTS_DATA_PATH = path.join(process.cwd(), 'src/data/generated-products.ts');
const IMAGES_ROOT = path.join(process.cwd(), 'src/images/products');

const content = fs.readFileSync(PRODUCTS_DATA_PATH, 'utf-8');
const lines = content.split('\n');

let missingCount = 0;
const missingFiles = [];

const importRegex = /import\s+(.+?)\s+from\s+['"]@\/images\/products\/(.+?)['"];/;

console.log('Checking imports...');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(importRegex);
    if (match) {
        const [fullLine, varName, relativePath] = match;
        const fullPath = path.join(IMAGES_ROOT, relativePath);

        if (!fs.existsSync(fullPath)) {
            console.error(`Line ${i + 1}: Missing file for ${varName}: ${relativePath}`);
            missingFiles.push({ line: i + 1, varName, relativePath });
            missingCount++;
        }
    }
}

console.log(`Found ${missingCount} missing files.`);

if (missingCount > 0) {
    // Try to suggest fixes?
    // We can scan the images root again and suggest the closest match.

    const fileMap = new Map(); // filename -> relativePath

    function scanFolders(dir, relVal = '') {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const relPath = path.join(relVal, item);
            if (fs.statSync(fullPath).isDirectory()) {
                scanFolders(fullPath, relPath);
            } else {
                fileMap.set(item.toLowerCase(), relPath.replace(/\\/g, '/'));
            }
        }
    }

    console.log('Scanning for suggestions...');
    if (fs.existsSync(IMAGES_ROOT)) scanFolders(IMAGES_ROOT);

    missingFiles.forEach(miss => {
        const filename = path.basename(miss.relativePath).toLowerCase();
        if (fileMap.has(filename)) {
            console.log(`Suggestion for ${miss.varName}: ${fileMap.get(filename)}`);
        } else {
            console.log(`No suggestion for ${miss.varName} (${filename})`);
        }
    });
}
