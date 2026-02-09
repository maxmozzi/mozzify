const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../src/images/products');
const OUTPUT_FILE = path.join(__dirname, '../src/data/generated-products.ts');

const CATEGORY_MAP = {
    'hoodies': 'Hoodies',
    'tshirt': 'T-Shirts',
    'tshirts': 'T-Shirts',
    't-shirt': 'T-Shirts',
    't-shirts': 'T-Shirts',
    'polo': 'Polo',
    'polos': 'Polo',
    'shorts': 'Shorts',
    'sweater': 'Sweater',
    'sweaters': 'Sweater',
    'sweatshirt': 'Sweatshirts',
    'sweatshirts': 'Sweatshirts',
    'iphone_case': 'iPhone Case',
    'jeans': 'Jeans',
    'shirts': 'Shirts',
    'belt': 'Belt',
    'shoes': 'Shoes',
    'jacket': 'Jacket',
    'jackets': 'Jacket',
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

    const MAX_TOTAL_PRODUCTS = 150;
    let totalProducts = 0;

    // Get all brand directories
    const brands = fs.readdirSync(IMAGES_DIR);

    brands.forEach(brandDir => {
        if (totalProducts >= MAX_TOTAL_PRODUCTS) return;

        const brandPath = path.join(IMAGES_DIR, brandDir);
        if (!fs.statSync(brandPath).isDirectory() || excludedDirs.includes(brandDir)) return;

        const brandName = formatBrandName(brandDir);

        // Get categories for each brand
        const contents = fs.readdirSync(brandPath);

        contents.forEach(item => {
            if (totalProducts >= MAX_TOTAL_PRODUCTS) return;

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
                totalProducts++;

            } else {
                // CASE 2: 3-Level Structure (Brand/Category/Product)
                // 'item' is the Category
                const categoryDir = item;

                // Normalize Category Name
                const categoryName = CATEGORY_MAP[categoryDir.toLowerCase()] ||
                    categoryDir.charAt(0).toUpperCase() + categoryDir.slice(1);

                const productCodes = subItems;
                let categoryCount = 0;

                for (const code of productCodes) {
                    if (totalProducts >= MAX_TOTAL_PRODUCTS) break;
                    if (categoryCount >= 3) break; // LIMIT TO 3 PER CATEGORY to spread out the 150

                    const productPath = path.join(itemPath, code);
                    // Must be a directory in 3-level structure
                    if (!fs.statSync(productPath).isDirectory()) continue;

                    processProduct(brandDir, brandName, categoryName, code, productPath);
                    categoryCount++;
                    totalProducts++;
                }
            }
        });
    });

    function processProduct(brandDir, brandName, categoryName, code, productPath) {
        const files = fs.readdirSync(productPath);
        const webpFiles = files.filter(f => f.endsWith('.webp'));

        if (webpFiles.length === 0) return;

        const productId = code;

        // 1. Main Image: front.webp
        // Fallback to any 'front' or first file if missing
        let mainImgFile = webpFiles.find(f => f.toLowerCase() === 'front.webp');
        if (!mainImgFile) mainImgFile = webpFiles.find(f => f.toLowerCase().includes('front'));
        if (!mainImgFile) mainImgFile = webpFiles[0];

        // 2. Hover Image: back.webp
        // Fallback to 'back' containing, or Main Image if missing
        let hoverImgFile = webpFiles.find(f => f.toLowerCase() === 'back.webp');
        if (!hoverImgFile) hoverImgFile = webpFiles.find(f => f.toLowerCase().includes('back'));
        if (!hoverImgFile) hoverImgFile = mainImgFile;

        // 3. Gallery: [front, back, detail1, detail2, detail3, detail4]
        // Order matters: Main -> Back -> Details
        const galleryOrder = ['front.webp', 'back.webp', 'detail1.webp', 'detail2.webp', 'detail3.webp', 'detail4.webp'];

        let galleryFiles = [];

        // Try strict naming first
        galleryOrder.forEach(name => {
            const found = webpFiles.find(f => f.toLowerCase() === name);
            if (found) galleryFiles.push(found);
        });

        // If strict naming yielded nothing (e.g. old files not renamed?), fallback to 'detail' search
        if (galleryFiles.length === 0) {
            galleryFiles = webpFiles.filter(f => f.toLowerCase().includes('detail'));
            // Add main/hover if not present
            if (mainImgFile && !galleryFiles.includes(mainImgFile)) galleryFiles.unshift(mainImgFile);
            if (hoverImgFile && hoverImgFile !== mainImgFile && !galleryFiles.includes(hoverImgFile)) galleryFiles.splice(1, 0, hoverImgFile);
        } else {
            // Ensure we have at least main image in gallery if it exists
            // (Though 'front.webp' is in galleryOrder so it should be there)
        }

        // De-duplicate just in case
        galleryFiles = [...new Set(galleryFiles)];


        const importPrefix = `Img_${importCounter++}`;
        const mainImportName = `${importPrefix}_Main`;
        const hoverImportName = `${importPrefix}_Hover`;

        const relativeToImages = path.relative(IMAGES_DIR, productPath).split(path.sep).join('/');

        imports.push(`import ${mainImportName} from '@/images/products/${relativeToImages}/${mainImgFile}';`);
        imports.push(`import ${hoverImportName} from '@/images/products/${relativeToImages}/${hoverImgFile}';`);

        const galleryImports = galleryFiles.map((f, idx) => {
            const name = `${importPrefix}_Gal_${idx}`;
            imports.push(`import ${name} from '@/images/products/${relativeToImages}/${f}';`);
            return name;
        });

        // Construct Slug
        const safeBrand = brandDir.toLowerCase().replace(/_/g, '-');
        const safeCat = categoryName.toLowerCase().replace(/ /g, '-').replace(/_/g, '-');
        const safeId = code.toLowerCase();
        const slug = `${safeBrand}-${safeCat}-${safeId}`;

        products.push({
            id: productId,
            title: `${brandName} ${code}`,
            price: 250,
            image: mainImportName,
            hoverImage: hoverImportName,
            gallery: `[${galleryImports.join(', ')}]`,
            category: categoryName,
            brand: brandName,
            slug: slug,
            gender: 'unisex',
            tags: [brandName, categoryName]
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
    gender: 'men' | 'women' | 'unisex';
    tags: string[];
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
        slug: '${p.slug}',
        gender: '${p.gender}',
        tags: [${p.tags.map(t => `'${t}'`).join(', ')}]
    }`).join(',\n')}
];
`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`Generated ${products.length} products to ${OUTPUT_FILE}`);
}

generate();
