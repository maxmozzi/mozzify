const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../src/images');
const OUTPUT_FILE = path.join(__dirname, '../src/data/generated-products.ts');

const CATEGORY_MAP = {
    'hoodies': 'Hoodies',
    'tshirt': 'T-Shirts',
    't-shirts': 'T-Shirts',
    'polo': 'Polo',
    'shorts': 'Shorts',
    'sweater': 'Sweater',
    'sweatshirt': 'Sweatshirts',
    'iphone_case': 'iPhone Case',
    'jeans': 'Jeans',
    'shirts': 'Shirts',
    'belt': 'Belt',
    'shoes': 'Shoes',
    'jacket': 'Jacket',
    'sets': 'Sets'
};

function formatBrandName(folderName) {
    if (folderName.toLowerCase() === 'amiparis') return 'Ami Paris';
    if (folderName.toLowerCase() === 'amiri') return 'Amiri';
    return folderName.charAt(0).toUpperCase() + folderName.slice(1);
}

function generate() {
    const products = [];
    const imports = [];
    let importCounter = 0;

    // Filter out special directories that are not brands
    const excludedDirs = ['HomePage', 'brickenstones'];

    // Get all brand directories
    const brands = fs.readdirSync(IMAGES_DIR);

    brands.forEach(brandDir => {
        const brandPath = path.join(IMAGES_DIR, brandDir);
        if (!fs.statSync(brandPath).isDirectory() || excludedDirs.includes(brandDir)) return;

        const brandName = formatBrandName(brandDir);

        // Get categories for each brand
        const contents = fs.readdirSync(brandPath);

        contents.forEach(item => {
            const itemPath = path.join(brandPath, item);
            if (!fs.statSync(itemPath).isDirectory()) return;

            // Check if this directory contains images directly (2-level: Brand/Product)
            // or if it contains subdirectories (3-level: Brand/Category/Product)
            const subItems = fs.readdirSync(itemPath);
            const hasImagesDirectly = subItems.some(f => f.endsWith('.webp'));

            if (hasImagesDirectly) {
                // CASE 1: 2-Level Structure (Brand/Product)
                // 'item' is the Product Code, Brand is the Category context essentially
                // We'll treat Brand as Category for these, or use a default 'Collection' category

                const productCode = item;
                const categoryName = brandDir.toLowerCase() === 'bestsellers' ? 'Best Sellers' : brandName;

                processProduct(brandDir, brandName, categoryName, productCode, itemPath);

            } else {
                // CASE 2: 3-Level Structure (Brand/Category/Product)
                // 'item' is the Category
                const categoryDir = item;

                // Normalize Category Name
                const categoryName = CATEGORY_MAP[categoryDir.toLowerCase()] ||
                    categoryDir.charAt(0).toUpperCase() + categoryDir.slice(1);

                const productCodes = subItems;

                productCodes.forEach(code => {
                    const productPath = path.join(itemPath, code);
                    // Must be a directory in 3-level structure
                    if (!fs.statSync(productPath).isDirectory()) return;

                    processProduct(brandDir, brandName, categoryName, code, productPath);
                });
            }
        });
    });

    function processProduct(brandDir, brandName, categoryName, code, productPath) {
        const files = fs.readdirSync(productPath);
        const webpFiles = files.filter(f => f.endsWith('.webp'));

        if (webpFiles.length === 0) return;

        const productId = code;

        // Look for front/back images
        const front600 = webpFiles.find(f => f.includes('front-600'));
        const back600 = webpFiles.find(f => f.includes('back-600'));

        // Fallbacks if standard naming isn't used
        const mainImgFile = front600 || webpFiles[0];
        const hoverImgFile = back600 || front600 || webpFiles[0]; // Fallback to front if back missing

        // Gallery: prefer 750px images, fallback to all webp
        const galleryFiles = webpFiles.filter(f => f.includes('-750') || f.includes('Detail') || f.includes('detail'));
        const finalGallery = galleryFiles.length > 0 ? galleryFiles : webpFiles;

        const importPrefix = `Img_${importCounter++}`;
        const mainImportName = `${importPrefix}_Main`;
        const hoverImportName = `${importPrefix}_Hover`;

        // Construct relative path for import
        // Need to reconstruct relative string based on productPath vs IMAGES_DIR
        // Or simpler: just use regex or substring to get path relative to 'src/images'

        // Quick/Dirty relativity:
        // productPath is e.g. .../src/images/bestsellers/PROD001
        // We need 'bestsellers/PROD001/file.webp'

        const relativeToImages = path.relative(IMAGES_DIR, productPath).split(path.sep).join('/');

        imports.push(`import ${mainImportName} from '@/images/${relativeToImages}/${mainImgFile}';`);
        imports.push(`import ${hoverImportName} from '@/images/${relativeToImages}/${hoverImgFile}';`);

        const galleryImports = finalGallery.map((f, idx) => {
            const name = `${importPrefix}_Gal_${idx}`;
            imports.push(`import ${name} from '@/images/${relativeToImages}/${f}';`);
            return name;
        });

        // Generate consistent slug: brand-category-id
        // Normalize slug parts to be url-safe
        const safeBrand = brandDir.toLowerCase().replace(/_/g, '-');
        const safeCat = categoryName.toLowerCase().replace(/ /g, '-').replace(/_/g, '-');
        const safeId = code.toLowerCase();

        // Unique slug to identify bestsellers specifically if needed
        const slug = `${safeBrand}-${safeCat}-${safeId}`;

        products.push({
            id: productId,
            title: `${brandName} ${code}`, // Simplified title for 2-level
            price: 250, // Default price
            image: mainImportName,
            hoverImage: hoverImportName,
            gallery: `[${galleryImports.join(', ')}]`,
            category: categoryName,
            brand: brandName,
            slug: slug
        });
    }

    const fileContent = `import { StaticImageData } from 'next/image';

// Automatically generated product data
${imports.join('\n')}

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
}

export const products: Product[] = [
${products.map(p => `    {
        id: '${p.id}',
        title: '${p.title}',
        price: ${p.price},
        image: ${p.image},
        hoverImage: ${p.hoverImage},
        gallery: ${p.gallery},
        category: '${p.category}',
        brand: '${p.brand}',
        slug: '${p.slug}'
    }`).join(',\n')}
];
`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`Generated ${products.length} products to ${OUTPUT_FILE}`);
}

generate();
