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
    // Keeping it simple as per user request: "no cambies los nombres"
    // Just capitalize first letter, or return as is if preferred.
    // Given the request, I'll just capitalization of the first letter for consistency.
    return folderName.charAt(0).toUpperCase() + folderName.slice(1);
}

function generate() {
    const products = [];
    const imports = [];
    let importCounter = 0;

    // Filter out special directories that are not brands
    const excludedDirs = ['HomePage', 'brickenstones'];

    const MAX_TOTAL_PRODUCTS = 250; // High limit, but we'll cap per category
    const MAX_PER_CATEGORY = 10;
    const categoryCounts = {};
    let totalProducts = 0;

    // 1. Process standard products
    const brands = fs.readdirSync(IMAGES_DIR);

    brands.forEach(brandDir => {
        if (totalProducts >= MAX_TOTAL_PRODUCTS) return;

        const brandPath = path.join(IMAGES_DIR, brandDir);
        if (!fs.statSync(brandPath).isDirectory() || excludedDirs.includes(brandDir)) return;

        const brandName = formatBrandName(brandDir);
        const contents = fs.readdirSync(brandPath);

        contents.forEach(item => {
            if (totalProducts >= MAX_TOTAL_PRODUCTS) return;

            const itemPath = path.join(brandPath, item);
            if (!fs.statSync(itemPath).isDirectory()) return;

            const subItems = fs.readdirSync(itemPath);
            const hasImagesDirectly = subItems.some(f => f.endsWith('.webp'));

            if (hasImagesDirectly) {
                const productCode = item;
                const categoryName = brandDir.toLowerCase() === 'bestsellers' ? 'Best Sellers' : brandName;

                if ((categoryCounts[categoryName] || 0) >= MAX_PER_CATEGORY) return;

                processProduct(brandDir, brandName, categoryName, productCode, itemPath, 'products');
                categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
                totalProducts++;
            } else {
                const categoryDir = item;
                const categoryName = CATEGORY_MAP[categoryDir.toLowerCase()] ||
                    categoryDir.charAt(0).toUpperCase() + categoryDir.slice(1);

                const productCodes = subItems;

                for (const code of productCodes) {
                    if (totalProducts >= MAX_TOTAL_PRODUCTS) break;
                    if ((categoryCounts[categoryName] || 0) >= MAX_PER_CATEGORY) break;

                    const productPath = path.join(itemPath, code);
                    if (!fs.statSync(productPath).isDirectory()) continue;

                    processProduct(brandDir, brandName, categoryName, code, productPath, 'products');
                    categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
                    totalProducts++;
                }
            }
        });
    });

    // 2. Process curated bestsellers if they exist
    const CURATED_BEST_DIR = path.join(__dirname, '../src/images/curated/bestsellers');
    if (fs.existsSync(CURATED_BEST_DIR)) {
        const curatedItems = fs.readdirSync(CURATED_BEST_DIR);
        curatedItems.forEach(code => {
            if ((categoryCounts['Best Sellers'] || 0) >= MAX_PER_CATEGORY) return;

            const productPath = path.join(CURATED_BEST_DIR, code);
            if (!fs.statSync(productPath).isDirectory()) return;

            const brandMatch = code.split('-')[0];
            const brandName = brandMatch ? formatBrandName(brandMatch) : 'Premium';

            processProduct('curated/bestsellers', brandName, 'Best Sellers', code, productPath, 'curated/bestsellers');
            categoryCounts['Best Sellers'] = (categoryCounts['Best Sellers'] || 0) + 1;
            totalProducts++;
        });
    }

    function processProduct(brandDir, brandName, categoryName, code, productPath, sourceRoot = 'products') {
        const files = fs.readdirSync(productPath);
        const webpFiles = files.filter(f => f.endsWith('.webp'));

        if (webpFiles.length === 0) return;

        const productId = code;

        let mainImgFile = webpFiles.find(f => f.toLowerCase() === 'front.webp');
        if (!mainImgFile) mainImgFile = webpFiles.find(f => f.toLowerCase().includes('front'));
        if (!mainImgFile) mainImgFile = webpFiles[0];

        let hoverImgFile = webpFiles.find(f => f.toLowerCase() === 'back.webp');
        if (!hoverImgFile) hoverImgFile = webpFiles.find(f => f.toLowerCase().includes('back'));
        if (!hoverImgFile) hoverImgFile = mainImgFile;

        const galleryOrder = ['front.webp', 'back.webp', 'detail1.webp', 'detail2.webp', 'detail3.webp', 'detail4.webp'];
        let galleryFiles = [];

        galleryOrder.forEach(name => {
            const found = webpFiles.find(f => f.toLowerCase() === name);
            if (found) galleryFiles.push(found);
        });

        if (galleryFiles.length === 0) {
            galleryFiles = webpFiles.filter(f => f.toLowerCase().includes('detail'));
            if (mainImgFile && !galleryFiles.includes(mainImgFile)) galleryFiles.unshift(mainImgFile);
            if (hoverImgFile && hoverImgFile !== mainImgFile && !galleryFiles.includes(hoverImgFile)) galleryFiles.splice(1, 0, hoverImgFile);
        }

        galleryFiles = [...new Set(galleryFiles)];

        const importPrefix = `Img_${importCounter++}`;
        const mainImportName = `${importPrefix}_Main`;
        const hoverImportName = `${importPrefix}_Hover`;

        // Calculate relative path from src/images
        const IMAGES_ROOT = path.join(__dirname, '../src/images');
        const relativeToImages = path.relative(IMAGES_ROOT, productPath).split(path.sep).join('/');

        imports.push(`import ${mainImportName} from '@/images/${relativeToImages}/${mainImgFile}';`);
        imports.push(`import ${hoverImportName} from '@/images/${relativeToImages}/${hoverImgFile}';`);

        const galleryImports = galleryFiles.map((f, idx) => {
            const name = `${importPrefix}_Gal_${idx}`;
            imports.push(`import ${name} from '@/images/${relativeToImages}/${f}';`);
            return name;
        });

        const safeBrand = brandName.toLowerCase().replace(/_/g, '-');
        const safeCat = categoryName.toLowerCase().replace(/ /g, '-').replace(/_/g, '-');
        const safeId = code.toLowerCase();
        const slug = `${safeBrand}-${safeCat}-${safeId}`;

        // Best Seller logic
        const isBestSeller = categoryName === 'Best Sellers' || sourceRoot.includes('bestsellers') || Math.random() < 0.2;
        const finalTags = [brandName, categoryName];
        if (isBestSeller) finalTags.push('Best Sellers');

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
            tags: finalTags
        });
    }

    // 3. Export all brand names for the brands page
    const allBrandFolders = fs.readdirSync(IMAGES_DIR)
        .filter(dir => fs.statSync(path.join(IMAGES_DIR, dir)).isDirectory() && !excludedDirs.includes(dir));

    const brandDisplayNames = allBrandFolders.map(dir => formatBrandName(dir)).sort();

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

export const BRANDS = ${JSON.stringify(brandDisplayNames)};

export const BRAND_SAMPLE_IMAGES: Record<string, StaticImageData> = {
${brandDisplayNames.map(b => {
        const p = products.find(prod => prod.brand === b);
        return p ? `    '${b}': ${p.image}` : '';
    }).filter(Boolean).join(',\n')}
};
`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`Generated ${products.length} products to ${OUTPUT_FILE}`);
}

generate();
