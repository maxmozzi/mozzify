const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../src/images');
const OUTPUT_FILE = path.join(__dirname, '../src/data/generated-products.ts');

// Valid extensions
const VALID_EXTS = ['.webp', '.png', '.jpg', '.jpeg', '.svg'];

// Check if a directory contains any image files
function hasImages(dir) {
    if (!fs.existsSync(dir)) return false;
    const files = fs.readdirSync(dir);
    return files.some(f => VALID_EXTS.includes(path.extname(f).toLowerCase()));
}

// Recursive function to find all product folders (folders containing images)
function findProductFolders(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);

    // Check if this directory itself has images (it's a product folder)
    if (hasImages(dir)) {
        fileList.push(dir);
    }

    // Recursesd
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findProductFolders(fullPath, fileList);
        }
    });

    return fileList;
}

const productFolders = findProductFolders(IMAGES_DIR);

let importStatements = [];
let productEntries = [];
let importCounter = 0;

productFolders.forEach(productDir => {
    // Determine structure relative to IMAGES_DIR
    const relativePath = path.relative(IMAGES_DIR, productDir);
    const parts = relativePath.split(path.sep);

    // Filter out root matches if any
    if (parts.length === 0) return;

    let brand, category, title;

    if (parts.length === 1) {
        // Direct in images? Unlikely for products, maybe "HomePage"
        if (parts[0] === 'HomePage' || parts[0] === 'logo') return;
        brand = 'Mozzify';
        category = 'Misc';
        title = parts[0];
    } else if (parts.length === 2) {
        // Brand/Product (e.g., Bape/Product1)
        brand = parts[0];
        category = 'General'; // Or use brand as category?
        title = parts[1];
    } else if (parts.length >= 3) {
        // Brand/Category/Product (e.g., amiparis/hoodies/P1)
        brand = parts[0];
        category = parts[1];
        title = parts[parts.length - 1]; // Last part is product name
    }

    // Skip utility folders
    if (brand === 'HomePage' || brand === 'logo' || brand === 'warehouse' || brand === 'bestsellers') return;

    // Get Images
    const files = fs.readdirSync(productDir)
        .filter(f => VALID_EXTS.includes(path.extname(f).toLowerCase()));

    if (files.length === 0) return;

    // Sort to prioritize "front", "main", "home"
    files.sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        // Priority: front > home > main > others
        const getScore = (s) => {
            if (s.includes('front')) return 1;
            if (s.includes('home')) return 2;
            if (s.includes('main')) return 3;
            if (s.includes('product')) return 4;
            return 10;
        };
        return getScore(aLower) - getScore(bLower);
    });

    // Create Imports
    importCounter++;
    const mainImageFile = files[0];
    // Find hover image (second image or look for 'back'/'hover')
    const backImageFile = files.find(f => f.toLowerCase().includes('back') || f.toLowerCase().includes('hover')) || files[1] || mainImageFile;

    const mainImportName = `Img_${importCounter}_Main`;
    const hoverImportName = `Img_${importCounter}_Hover`;

    const getImportPath = (f) => '@/images/' + path.relative(IMAGES_DIR, path.join(productDir, f)).replace(/\\/g, '/');

    importStatements.push(`import ${mainImportName} from '${getImportPath(mainImageFile)}';`);
    if (mainImageFile !== backImageFile) {
        importStatements.push(`import ${hoverImportName} from '${getImportPath(backImageFile)}';`);
    } else {
        // Reuse main if no distinct back image
        importStatements.push(`const ${hoverImportName} = ${mainImportName};`);
    }

    // Gallery imports
    const galleryImports = files.map((f, idx) => {
        if (f === mainImageFile && idx === 0) return mainImportName; // reuse
        const name = `Img_${importCounter}_Gal_${idx}`;
        importStatements.push(`import ${name} from '${getImportPath(f)}';`);
        return name;
    });

    // Clean brand/category for display
    const formatStr = (s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
    const displayBrand = formatStr(brand);
    const displayCategory = formatStr(category);
    const displayTitle = formatStr(title).replace(/(\d{3,}|\.webp|\.jpg)/g, '').trim() || `${displayBrand} Item`;
    const price = 50 + Math.floor(Math.random() * 200);

    // Slug
    const slug = `${brand}-${category}-${title}`.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

    productEntries.push(`    {
        id: '${title}', // Use folder name as ID
        title: "${displayTitle}",
        price: ${price},
        image: ${mainImportName},
        hoverImage: ${hoverImportName},
        gallery: [${galleryImports.join(', ')}],
        category: "${displayCategory}",
        brand: "${displayBrand}",
        slug: "${slug}",
        tags: ["${displayBrand}", "${displayCategory}"]
    }`);
});

const fileContent = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated by scripts/regenerate-products-v2.js
 */
import { StaticImageData } from 'next/image';

${importStatements.join('\n')}

export interface Product {
    id: string;
    title: string;
    price: number;
    image: StaticImageData;
    hoverImage: StaticImageData;
    gallery: StaticImageData[];
    category: string;
    brand: string;
    slug: string;
    tags?: string[];
}

export const products: Product[] = [
${productEntries.join(',\n')}
];
`;

fs.writeFileSync(OUTPUT_FILE, fileContent);
console.log(`Successfully generated ${productEntries.length} products to ${OUTPUT_FILE}`);
