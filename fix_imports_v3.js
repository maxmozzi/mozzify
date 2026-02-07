
const fs = require('fs');
const path = require('path');

const PRODUCTS_DATA_PATH = path.join(process.cwd(), 'src/data/generated-products.ts');
const IMAGES_ROOT = path.join(process.cwd(), 'src/images/products');

// 1. Index all FILES in src/images/products
// Map: filename.toLowerCase() -> [ relativePath1, relativePath2, ... ]
const fileMap = new Map();

function scanFiles(dir, relativePath = '') {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const relPath = path.join(relativePath, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanFiles(fullPath, relPath);
        } else {
            const key = item.toLowerCase();
            if (!fileMap.has(key)) {
                fileMap.set(key, []);
            }
            fileMap.get(key).push(relPath.replace(/\\/g, '/'));
        }
    }
}

console.log('Scanning image files...');
if (fs.existsSync(IMAGES_ROOT)) {
    scanFiles(IMAGES_ROOT);
} else {
    console.error(`Images root not found: ${IMAGES_ROOT}`);
    process.exit(1);
}
console.log(`Indexed ${fileMap.size} unique filenames.`);

// 2. Parse generated-products.ts to associate ImportVar -> { Brand, ID, CurrentFilename }
const content = fs.readFileSync(PRODUCTS_DATA_PATH, 'utf-8');
const lines = content.split('\n');

const varContext = new Map(); // Img_X -> { brand, id, filename }

// Regex to capture ID and Brand from product block
// We parse line by line to maintain state
let currentProduct = { id: '', brand: '' };
const importDefs = new Map(); // Img_X -> filename (from import line)

// First pass: Collect explicit import definitions to know filenames
for (let line of lines) {
    const match = line.match(/import\s+(Img_\w+)\s+from\s+['"](.+?)\/([^/]+)['"];/);
    if (match) {
        importDefs.set(match[1], match[3]);
    }
}

// Second pass: Associate vars with Product Context
for (let line of lines) {
    // Check for ID
    const idMatch = line.match(/^\s*id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
        currentProduct.id = idMatch[1];
    }
    // Check for Brand
    const brandMatch = line.match(/^\s*brand:\s*['"]([^'"]+)['"]/);
    if (brandMatch) {
        currentProduct.brand = brandMatch[1];
    }

    // Check for Image Vars usage in object
    // image: Img_..., hoverImage: Img_..., gallery: [Img_...]
    const varMatches = line.match(/(Img_\w+)/g);
    if (varMatches) {
        // Associate these vars with current context
        // Note: 'brand' comes after 'image' usually in the file structure?
        // Let's check file structure.
        // File: id, title, price, image, ..., brand
        // So when we see 'image', 'brand' might be empty yet for THIS product?
        // Or 'brand' is defined later?
        // Actually, if we miss brand, we rely on ID.
        // We can scan the block first?
        // State machine is tricky if fields are unordered. 
        // But usually keys are consistent.

        // Better: Store vars in a temp list, flush when block ends
        // But we need to know the brand.

        // Let's assume consistent order or do a block capture regex.
    }
}

// Block capture regex approach is safer for context
const productRegex = /\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?brand:\s*['"]([^'"]+)['"][\s\S]*?\}/g;
let match;
const fullText = content;

// Reset varContext
while ((match = productRegex.exec(fullText)) !== null) {
    const block = match[0];
    const id = match[1];
    const brand = match[2];

    const varMatches = block.match(/(Img_\w+)/g);
    if (varMatches) {
        varMatches.forEach(v => {
            if (importDefs.has(v)) {
                varContext.set(v, {
                    id: id,
                    brand: brand,
                    filename: importDefs.get(v)
                });
            }
        });
    }
}

console.log(`Associated ${varContext.size} variables with product context.`);

// 3. Resolve best paths
const fixes = new Map(); // Var -> NewPath

for (const [varName, ctx] of varContext.entries()) {
    const candidates = fileMap.get(ctx.filename.toLowerCase());
    if (!candidates) {
        // console.warn(`No file found for ${varName} (${ctx.filename})`);
        continue;
    }

    // Score candidates
    let bestCand = null;
    let bestScore = -1;

    const brandLower = ctx.brand.toLowerCase();
    const idParts = ctx.id.toLowerCase().split(/[-_]/).filter(p => p.length > 2); // Split ID into meaningful parts

    for (const cand of candidates) {
        let score = 0;
        const candLower = cand.toLowerCase();

        // 1. Brand Match (Critical)
        if (candLower.startsWith(brandLower + '/')) {
            score += 100;
        } else {
            // Wrong brand? Big penalty or skip?
            // Some brands might have different folder names? e.g. "Ami Paris" -> "amiparis"
            // Let's allow loose match
            if (candLower.includes(brandLower)) score += 50;
        }

        // 2. ID Match (Leaf folder should match ID parts)
        // Check if path contains parts of the ID
        let partsMatched = 0;
        for (const part of idParts) {
            if (candLower.includes(part)) {
                score += 10;
                partsMatched++;
            }
        }

        // 3. Category/Folder heuristic
        // If candidate path has "products/Brand/Category/Product/file", detailed paths are better?
        // Implicitly handled by matching more words.

        if (score > bestScore) {
            bestScore = score;
            bestCand = cand;
        }
    }

    if (bestCand && bestScore > 50) { // Threshold to avoid garbage matches
        fixes.set(varName, bestCand);
    }
}

// 4. Apply fixes
const newLines = [];
let changeCount = 0;

for (let line of lines) {
    const match = line.match(/^import\s+(Img_\w+)\s+from\s+['"](.+)['"];/);
    if (match) {
        const varName = match[1];
        const oldPath = match[2];

        if (fixes.has(varName)) {
            const newRelPath = fixes.get(varName);
            const newFullPath = `@/images/products/${newRelPath}`;

            if (newFullPath !== oldPath) {
                newLines.push(`import ${varName} from '${newFullPath}';`);
                changeCount++;
            } else {
                newLines.push(line);
            }
        } else {
            newLines.push(line);
        }
    } else {
        newLines.push(line);
    }
}

console.log(`V3 Updated ${changeCount} imports.`);
fs.writeFileSync(PRODUCTS_DATA_PATH, newLines.join('\n'));
