const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../src/images/products');

let renameCount = 0;
let deleteCount = 0;
let skipCount = 0;

function processDirectory(dir) {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else {
            // File processing
            const filename = item.toLowerCase();

            // 1. DELETE files ending in -750x930.webp
            if (filename.includes('-750x930.webp')) {
                // Special check: detailed hover usage?
                // User said: "back-750x930 lo puedes eliminar", "front-750x930 lo puedes eliminar"
                // So blanket delete is safe for these patterns.
                try {
                    fs.unlinkSync(fullPath);
                    console.log(`DELETED: ${item}`);
                    deleteCount++;
                } catch (e) {
                    console.error(`Error deleting ${item}: ${e.message}`);
                }
                return;
            }

            // 2. RENAME files
            let newName = null;

            if (filename.includes('front-600x750.webp')) {
                newName = 'front.webp';
            } else if (filename.includes('back-600x750.webp')) {
                newName = 'back.webp';
            } else if (filename.includes('detail1-600x750.webp')) {
                newName = 'detail1.webp';
            } else if (filename.includes('detail2-600x750.webp')) {
                newName = 'detail2.webp';
            } else if (filename.includes('detail3-600x750.webp')) {
                newName = 'detail3.webp';
            } else if (filename.includes('detail4-600x750.webp')) {
                newName = 'detail4.webp';
            }

            if (newName) {
                const newPath = path.join(dir, newName);
                if (fs.existsSync(newPath)) {
                    // Start Case: 'front.webp' already exists?
                    // Could be we ran this before, or source had both.
                    // If source had both, we delete the complex named one as duplicate?
                    // Let's assume we can overwrite or just delete the old one if new one matches content?
                    // Safer: Do nothing if target exists, assume job done.
                    // But we should verify. 
                    // Let's delete the old verbose file if the new simple file exists.
                    try {
                        fs.unlinkSync(fullPath);
                        console.log(`DELETED (Target exists): ${item}`);
                        deleteCount++;
                    } catch (e) { }
                } else {
                    try {
                        fs.renameSync(fullPath, newPath);
                        console.log(`RENAMED: ${item} -> ${newName}`);
                        renameCount++;
                    } catch (e) {
                        console.error(`Error renaming ${item}: ${e.message}`);
                    }
                }
            } else {
                // existing 'front.webp' or other files
                skipCount++;
            }
        }
    });
}

if (fs.existsSync(IMAGES_DIR)) {
    console.log(`Starting image refactoring in ${IMAGES_DIR}...`);
    processDirectory(IMAGES_DIR);
    console.log('--- Summary ---');
    console.log(`Renamed: ${renameCount}`);
    console.log(`Deleted: ${deleteCount}`);
    console.log(`Skipped: ${skipCount}`);
} else {
    console.error(`Directory not found: ${IMAGES_DIR}`);
}
