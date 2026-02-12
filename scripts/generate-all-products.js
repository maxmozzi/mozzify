const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../src/images/products');
const ASSETS_DIR = path.join(__dirname, '../src/images/brand-assets');
const OUTPUT_FILE = path.join(__dirname, '../src/data/generated-products.ts');

const BRAND_ASSET_IMPORT_MAP = {
    'amiparis': 'ami',
    'amiri': 'amir',
    'arcteryx': 'arc',
    'balenciaga': 'balen',
    'bape': 'bap',
    'burberry': 'burberr',
    'casablanca': 'casab',
    'celine': 'celin',
    'calvinklein': 'ck',
    'essentials': 'essential',
    'jacquemus': 'jacque',
    'jordan': 'jord',
    'lacoste': 'laco',
    'loewe': 'loew',
    'louisvuitton': 'lv',
    'miumiu': 'miu'
};

const CATEGORY_MAP = {
    'hoodies': 'Hoodies',
    'tshirt': 'T-Shirts',
    'tshirts': 'T-Shirts',
    't-shirt': 'T-Shirts',
    't-shirts': 'T-Shirts',
    'polo': 'Polos',
    'polos': 'Polos',
    'shorts': 'Shorts',
    'sweater': 'Sweaters',
    'sweaters': 'Sweaters',
    'sweatshirt': 'Sweatshirts',
    'sweatshirts': 'Sweatshirts',
    'iphone_case': 'iPhone Case',
    'jeans': 'Jeans',
    'shirts': 'Shirts',
    'belt': 'Belts',
    'shoes': 'Shoes',
    'jacket': 'Jackets',
    'jackets': 'Jackets',
    'sets': 'Sets',
    'pants': 'Pants',
    'suits': 'Suits',
    'tracksuits': 'Tracksuits',
    'knitwear': 'Knitwear'
};

const BRAND_NAME_FIXES = {
    'amiparis': 'Ami Paris',
    'amiri': 'Amiri',
    'arcteryx': "Arc'teryx",
    'balenciaga': 'Balenciaga',
    'bape': 'Bape',
    'burberry': 'Burberry',
    'calvinklein': 'Calvin Klein',
    'casablanca': 'Casablanca',
    'celine': 'Celine',
    'cgoose': 'Canada Goose',
    'di': 'Dior',
    'essentials': 'Essentials',
    'gucci': 'Gucci',
    'jacquemus': 'Jacquemus',
    'jordan': 'Jordan',
    'lacoste': 'Lacoste',
    'loewe': 'Loewe',
    'louisvuitton': 'Louis Vuitton',
    'miumiu': 'Miu Miu',
    'moncler': 'Moncler',
    'nike': 'Nike',
    'offwhite': 'Off-White',
    'palmangels': 'Palm Angels',
    'patagonia': 'Patagonia',
    'philipplein': 'Philipp Plein',
    'poloralphlauren': 'Polo Ralph Lauren',
    'prada': 'Prada',
    'stoneisland': 'Stone Island',
    'stussy': 'Stussy',
    'thenorthface': 'The North Face',
    'trap': 'Trapstar'
};

function formatBrandName(folderName) {
    const slug = folderName.toLowerCase();
    if (BRAND_NAME_FIXES[slug]) return BRAND_NAME_FIXES[slug];
    return folderName.charAt(0).toUpperCase() + folderName.slice(1);
}

function generate() {
    const products = [];
    const imports = [];
    let importCounter = 0;
    const processedIds = new Set();

    const excludedDirs = ['HomePage', 'brickenstones'];

    const MAX_TOTAL_PRODUCTS = 1000;
    const MAX_PER_CATEGORY = 10;
    const MAX_PER_BRAND = 10;

    // Track discovered products to select later
    const discoveredByBrand = {}; // { BrandName: { CategoryName: [ { brandDir, brandName, categoryName, code, productPath, sourceRoot } ] } }

    // 1. Process standard products
    const brands = fs.readdirSync(IMAGES_DIR);

    brands.forEach(brandDir => {
        const brandName = formatBrandName(brandDir);
        const brandPath = path.join(IMAGES_DIR, brandDir);

        if (!fs.statSync(brandPath).isDirectory() || excludedDirs.includes(brandDir)) return;

        if (!discoveredByBrand[brandName]) discoveredByBrand[brandName] = {};

        const contents = fs.readdirSync(brandPath);

        contents.forEach(item => {
            const itemPath = path.join(brandPath, item);
            if (!fs.statSync(itemPath).isDirectory()) return;

            const subItems = fs.readdirSync(itemPath);
            const hasImagesDirectly = subItems.some(f => f.endsWith('.webp'));

            if (hasImagesDirectly) {
                const productCode = item;
                const categoryName = brandDir.toLowerCase() === 'bestsellers' ? 'Best Sellers' : brandName;

                if (!discoveredByBrand[brandName][categoryName]) discoveredByBrand[brandName][categoryName] = [];
                discoveredByBrand[brandName][categoryName].push({
                    brandDir, brandName, categoryName, code: productCode, productPath: itemPath, sourceRoot: 'products'
                });
            } else {
                const categoryDir = item;
                const categoryName = CATEGORY_MAP[categoryDir.toLowerCase()] ||
                    categoryDir.charAt(0).toUpperCase() + categoryDir.slice(1);

                if (!discoveredByBrand[brandName][categoryName]) discoveredByBrand[brandName][categoryName] = [];

                for (const code of subItems) {
                    const productPath = path.join(itemPath, code);
                    if (!fs.statSync(productPath).isDirectory()) continue;

                    discoveredByBrand[brandName][categoryName].push({
                        brandDir, brandName, categoryName, code, productPath, sourceRoot: 'products'
                    });
                }
            }
        });
    });

    // 2. Process curated bestsellers if they exist
    const CURATED_BEST_DIR = path.join(__dirname, '../src/images/curated/bestsellers');
    if (fs.existsSync(CURATED_BEST_DIR)) {
        const curatedItems = fs.readdirSync(CURATED_BEST_DIR);
        curatedItems.forEach(code => {
            const productPath = path.join(CURATED_BEST_DIR, code);
            if (!fs.statSync(productPath).isDirectory()) return;

            const brandMatch = code.split('-')[0];
            const brandName = brandMatch ? formatBrandName(brandMatch) : 'Premium';
            const categoryName = 'Best Sellers';

            if (!discoveredByBrand[brandName]) discoveredByBrand[brandName] = {};
            if (!discoveredByBrand[brandName][categoryName]) discoveredByBrand[brandName][categoryName] = [];

            discoveredByBrand[brandName][categoryName].push({
                brandDir: 'curated/bestsellers', brandName, categoryName, code, productPath, sourceRoot: 'curated/bestsellers'
            });
        });
    }

    // 3. Select exactly MAX_PER_BRAND products per brand with round-robin variety
    const selectedProducts = [];
    Object.keys(discoveredByBrand).forEach(brandName => {
        const categories = Object.keys(discoveredByBrand[brandName]);
        const brandSelected = [];
        let added = true;

        // Deep copy of category lists for picking
        const categoryQueues = {};
        categories.forEach(cat => {
            categoryQueues[cat] = [...discoveredByBrand[brandName][cat]];
        });

        while (brandSelected.length < MAX_PER_BRAND && added) {
            added = false;
            categories.forEach(cat => {
                if (brandSelected.length < MAX_PER_BRAND && categoryQueues[cat].length > 0) {
                    brandSelected.push(categoryQueues[cat].shift());
                    added = true;
                }
            });
        }
        selectedProducts.push(...brandSelected);
    });

    // 4. Process only selected products
    selectedProducts.forEach(p => {
        if (products.length >= MAX_TOTAL_PRODUCTS) return;
        processProduct(p.brandDir, p.brandName, p.categoryName, p.code, p.productPath, p.sourceRoot);
    });

    function processProduct(brandDir, brandName, categoryName, code, productPath, sourceRoot = 'products') {
        const safeBrand = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const safeCat = categoryName.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
        const safeId = code.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
        const productId = `${safeBrand}-${safeCat}-${safeId}`;

        // De-duplication check
        if (processedIds.has(productId)) {
            console.log(`Skipping duplicate product: ${productId}`);
            return;
        }
        processedIds.add(productId);

        const files = fs.readdirSync(productPath);
        const webpFiles = files.filter(f => f.endsWith('.webp'));

        if (webpFiles.length === 0) return;

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

        const IMAGES_ROOT = path.join(__dirname, '../src/images');
        const relativeToImages = path.relative(IMAGES_ROOT, productPath).split(path.sep).join('/');

        imports.push(`import ${mainImportName} from '@/images/${relativeToImages}/${mainImgFile}';`);
        imports.push(`import ${hoverImportName} from '@/images/${relativeToImages}/${hoverImgFile}';`);

        const galleryImports = galleryFiles.map((f, idx) => {
            const name = `${importPrefix}_Gal_${idx}`;
            imports.push(`import ${name} from '@/images/${relativeToImages}/${f}';`);
            return name;
        });

        const slug = productId;

        const isBestSeller = categoryName === 'Best Sellers' || sourceRoot.includes('bestsellers') || (importCounter % 15 === 0);
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

    // 5. Process Brand Assets (Editorial/Premium Images)
    const allBrandFolders = fs.readdirSync(IMAGES_DIR)
        .filter(dir => fs.statSync(path.join(IMAGES_DIR, dir)).isDirectory() && !excludedDirs.includes(dir));

    const brandDisplayNames = allBrandFolders.map(dir => formatBrandName(dir)).sort();

    const brandAssetImports = [];
    const brandAssetMap = {};
    const editorialAssets = [];

    // First collect all available editorial assets
    allBrandFolders.forEach(folder => {
        const assetFolder = BRAND_ASSET_IMPORT_MAP[folder.toLowerCase()];
        if (assetFolder) {
            const possibleThumbnail = path.join(ASSETS_DIR, assetFolder, 'thumbnail.webp');
            if (fs.existsSync(possibleThumbnail)) {
                const importName = `Asset_${folder.replace(/[^a-zA-Z0-9]/g, '_')}`;
                brandAssetImports.push(`import ${importName} from '@/images/brand-assets/${assetFolder}/thumbnail.webp';`);
                editorialAssets.push(importName);
                brandAssetMap[formatBrandName(folder)] = importName;
            }
        }
    });

    // Then fill in the gaps for all brands
    brandDisplayNames.forEach((brandName, index) => {
        if (!brandAssetMap[brandName]) {
            // Priority 1: Use first product image
            const p = products.find(prod => prod.brand === brandName);
            if (p) {
                brandAssetMap[brandName] = p.image;
            } else {
                // Priority 2: Use an image from another brand (cyclic fallback)
                const fallbackImg = editorialAssets[index % editorialAssets.length] ||
                    (products[0] ? products[0].image : null);

                if (fallbackImg) {
                    brandAssetMap[brandName] = fallbackImg;
                }
            }
        }
    });

    const fileContent = `import { StaticImageData } from 'next/image';

// Automatically generated product data
${imports.join('\n')}

// Brand Editorial Assets
${brandAssetImports.join('\n')}

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
        id: ${JSON.stringify(p.id)},
        title: ${JSON.stringify(p.title)},
        price: ${p.price},
        image: ${p.image},
        hoverImage: ${p.hoverImage},
        gallery: ${p.gallery},
        category: ${JSON.stringify(p.category)},
        brand: ${JSON.stringify(p.brand)},
        slug: ${JSON.stringify(p.slug)},
        gender: ${JSON.stringify(p.gender)},
        tags: [${p.tags.map(t => JSON.stringify(t)).join(', ')}]
    }`).join(',\n')}
];

export const BRANDS = ${JSON.stringify(brandDisplayNames)};

export const BRAND_ASSETS: Record<string, StaticImageData> = {
${brandDisplayNames.map(name => `    ${JSON.stringify(name)}: ${brandAssetMap[name]}`).join(',\n')}
};

export const BRAND_SAMPLE_IMAGES: Record<string, StaticImageData> = {
${brandDisplayNames.map(name => {
        const p = products.find(prod => prod.brand === name);
        return p ? `    ${JSON.stringify(name)}: ${p.image}` : '';
    }).filter(Boolean).join(',\n')}
};
`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`Generated ${products.length} products (strictly limited to ${MAX_PER_BRAND} per brand) to ${OUTPUT_FILE}`);
}

generate();
