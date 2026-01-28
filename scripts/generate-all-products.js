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
        const categories = fs.readdirSync(brandPath);

        categories.forEach(categoryDir => {
            const categoryPath = path.join(brandPath, categoryDir);
            if (!fs.statSync(categoryPath).isDirectory()) return;

            // Normalize Category Name
            const categoryName = CATEGORY_MAP[categoryDir.toLowerCase()] ||
                categoryDir.charAt(0).toUpperCase() + categoryDir.slice(1);

            // Get products
            const productCodes = fs.readdirSync(categoryPath);

            productCodes.forEach(code => {
                const productPath = path.join(categoryPath, code);
                if (!fs.statSync(productPath).isDirectory()) return;

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

                imports.push(`import ${mainImportName} from '@/images/${brandDir}/${categoryDir}/${code}/${mainImgFile}';`);
                imports.push(`import ${hoverImportName} from '@/images/${brandDir}/${categoryDir}/${code}/${hoverImgFile}';`);

                const galleryImports = finalGallery.map((f, idx) => {
                    const name = `${importPrefix}_Gal_${idx}`;
                    imports.push(`import ${name} from '@/images/${brandDir}/${categoryDir}/${code}/${f}';`);
                    return name;
                });

                // Generate consistent slug: brand-category-id
                // Normalize slug parts to be url-safe
                const safeBrand = brandDir.toLowerCase().replace(/_/g, '-');
                const safeCat = categoryDir.toLowerCase().replace(/_/g, '-');
                const safeId = code.toLowerCase();
                const slug = `${safeBrand}-${safeCat}-${safeId}`;

                products.push({
                    id: productId,
                    title: `${brandName} ${categoryName} ${code}`,
                    price: 250, // Default price
                    image: mainImportName,
                    hoverImage: hoverImportName,
                    gallery: `[${galleryImports.join(', ')}]`,
                    category: categoryName,
                    brand: brandName,
                    slug: slug
                });
            });
        });
    });

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
