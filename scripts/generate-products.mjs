import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../src/images');
const OUTPUT_FILE = path.join(__dirname, '../src/data/generated-products.ts');

function getProductFolders(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    let hasImages = false;
    // Collect ALL images in this folder
    const images = [];

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getProductFolders(filePath, fileList);
        } else {
            if (/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
                hasImages = true;
                images.push(file);
            }
        }
    });

    if (hasImages && images.length > 0) {
        // Calculate relative path from src/images for metadata
        const relativePath = path.relative(IMAGES_DIR, dir);

        // Push EACH image as a potential product variant
        images.forEach((img) => {
            fileList.push({
                dirPath: dir,
                relativePath,
                imageFile: img
            });
        });
    }

    return fileList;
}

function generateData() {
    console.log('Scanning images directory...');
    if (!fs.existsSync(IMAGES_DIR)) {
        console.error(`Directory not found: ${IMAGES_DIR}`);
        return;
    }

    const productFiles = getProductFolders(IMAGES_DIR);
    console.log(`Found ${productFiles.length} product images.`);

    const products = productFiles.map((folder, index) => {
        const parts = folder.relativePath.split(path.sep);

        // Heuristic mapping based on observed structure:
        // src/images/Man/Hoodies/... -> parts = ['Man', 'Hoodies', ...]
        let gender = parts[0] || 'Unisex';
        let category = parts.length > 1 ? parts[1] : 'General';
        let brand = 'Mozzify';
        let title = parts[parts.length - 1]; // Default title is the folder name

        // Try to detect Brand
        if (parts.length >= 3) {
            if (parts.length === 3) {
                // Man/Pants/Nike
                brand = parts[2];
                title = `${brand} ${category}`; // "Nike Pants"
            } else if (parts.length >= 4) {
                brand = parts[2];
                title = parts[3]; // "PRL_black..."
            }
        }

        // Clean up Title
        title = title.replace(/_/g, ' ').replace(/-/g, ' ');
        // Extract potential price from title suffix e.g., "35E" -> 35
        let price = 0;
        const priceMatch = title.match(/(\d+)E$/i);
        if (priceMatch) {
            price = parseInt(priceMatch[1], 10);
            title = title.replace(/\s*\d+E$/i, ''); // Remove price from title
        } else {
            // Random premium price if not found
            const prices = [79, 89, 99, 119, 129, 149];
            price = prices[index % prices.length];
        }

        // Import path construction
        const importPath = `../images/${folder.relativePath.replace(/\\/g, '/')}/${folder.imageFile}`;

        return {
            id: `prod-${index}`,
            title: title.trim(),
            brand: brand.replace(/_/g, ' '),
            gender: gender,
            category: category,    // e.g. "Hoodies"
            price: price,
            importPath: importPath,
            variableName: `img_${index}`
        };
    });

    // Generate File Content
    const imports = products.map(p => `import ${p.variableName} from '${p.importPath}';`).join('\n');

    const arrayContent = products.map(p => `  {
    id: '${p.id}',
    title: "${p.title}",
    price: ${p.price},
    image: ${p.variableName},
    category: "${p.category}", // e.g. "Hoodies"
    gender: "${p.gender}",    // e.g. "Man"
    brand: "${p.brand}"
  }`).join(',\n');

    const fileContent = `// Auto-generated product list
${imports}

export const products = [
${arrayContent}
];
`;

    // Ensure directory exists
    const outDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`Successfully generated ${products.length} products in ${OUTPUT_FILE}`);
}

generateData();
