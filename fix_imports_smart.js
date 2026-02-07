
const fs = require('fs');
const path = require('path');

const PRODUCTS_DATA_PATH = path.join(process.cwd(), 'src/data/generated-products.ts');
const IMAGES_ROOT = path.join(process.cwd(), 'src/images/products');

// 1. Index all directories in src/images/products
// Map: Name -> RelativePath
const folderMap = new Map();

function scanFolders(dir, relativePath = '') {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const relPath = path.join(relativePath, item);
        let stat;
        try {
            stat = fs.statSync(fullPath);
        } catch (e) {
            continue;
        }
        if (stat.isDirectory()) {
            folderMap.set(item.toLowerCase(), relPath.replace(/\\/g, '/'));
            scanFolders(fullPath, relPath);
        }
    }
}

console.log('Scanning image folders...');
if (fs.existsSync(IMAGES_ROOT)) {
    scanFolders(IMAGES_ROOT);
} else {
    console.error(`Images root not found: ${IMAGES_ROOT}`);
    process.exit(1);
}
console.log(`Indexed ${folderMap.size} folders.`);

// 2. Map Image Variables to Target Folder Names
const content = fs.readFileSync(PRODUCTS_DATA_PATH, 'utf-8');
const varToFolder = new Map();

// Regex to capture full product object text roughly
// We will iterate line by line to build context: inside object -> capture ID -> capture Images
const lines = content.split('\n');
let currentId = null;
let currentTargetFolder = null;

for (let line of lines) {
    // Check for ID
    const idMatch = line.match(/^\s*id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
        currentId = idMatch[1];
        // Heuristic: Find matching folder in map
        // ID: 'amiparis-tshirt-amiparis-tshirt-001'
        // Folder: 'amiparis-tshirt-001'
        // Let's iterate all known folders and pick best match
        let bestMatch = '';
        const lowerId = currentId.toLowerCase();

        for (const [folderName, relPath] of folderMap.entries()) {
            // If ID contains folder name (e.g. amiparis-tshirt-001)
            // Prioritize longer matches to be specific
            if (lowerId.includes(folderName) && folderName.length > bestMatch.length) {
                bestMatch = folderName;
            }
        }
        currentTargetFolder = bestMatch ? folderMap.get(bestMatch) : null;
    }

    // Check for Image Vars
    // image: Img_..., hoverImage: Img_..., gallery: [Img_..., Img_...]
    if (currentTargetFolder) {
        const varMatches = line.match(/(Img_\w+)/g);
        if (varMatches) {
            for (const v of varMatches) {
                varToFolder.set(v, currentTargetFolder);
            }
        }
    }

    // Reset if object ends? Formatting is usually consistent with lines
    if (line.trim() === '},') {
        currentId = null;
        currentTargetFolder = null;
    }
}

console.log(`Mapped ${varToFolder.size} variables to new paths.`);

// 3. Rewrite Imports
const fixedLines = [];
let changes = 0;

for (let line of lines) {
    const match = line.match(/^import\s+(Img_\w+)\s+from\s+['"](.+)['"];/);
    if (match) {
        const varName = match[1];
        const oldPath = match[2];
        const filename = path.basename(oldPath);

        if (varToFolder.has(varName)) {
            const relativeFolder = varToFolder.get(varName);
            const newPath = `@/images/products/${relativeFolder}/${filename}`;

            if (newPath !== oldPath) {
                fixedLines.push(`import ${varName} from '${newPath}';`);
                changes++;
            } else {
                fixedLines.push(line);
            }
        } else {
            fixedLines.push(line);
        }
    } else {
        fixedLines.push(line);
    }
}

console.log(`Smart Updated ${changes} imports.`);
fs.writeFileSync(PRODUCTS_DATA_PATH, fixedLines.join('\n'));
