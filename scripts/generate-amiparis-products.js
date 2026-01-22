const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../src/images/amiparis');
const OUTPUT_FILE = path.join(__dirname, '../src/data/generated-products.ts');

const CATEGORY_MAP = {
    'hoodies': 'Hoodies',
    'tshirt': 'T-Shirts',
    'polo': 'Polo',
    'shorts': 'Shorts',
    'sweater': 'Sweater',
    'sweatshirt': 'Sweatshirts',
    'iphone_case': 'iPhone Case'
};

function generate() {
    const products = [];
    const imports = [];
    let importCounter = 0;

    const categories = fs.readdirSync(IMAGES_DIR);

    categories.forEach(categoryDir => {
        const categoryPath = path.join(IMAGES_DIR, categoryDir);
        if (!fs.statSync(categoryPath).isDirectory()) return;

        const productCodes = fs.readdirSync(categoryPath);

        productCodes.forEach(code => {
            const productPath = path.join(categoryPath, code);
            if (!fs.statSync(productPath).isDirectory()) return;

            const files = fs.readdirSync(productPath);
            const webpFiles = files.filter(f => f.endsWith('.webp'));

            if (webpFiles.length === 0) return;

            const categoryName = CATEGORY_MAP[categoryDir] || categoryDir;
            const productId = code;

            // Look for front/back images
            const front600 = webpFiles.find(f => f.includes('front-600'));
            const back600 = webpFiles.find(f => f.includes('back-600'));
            const front750 = webpFiles.find(f => f.includes('front-750'));
            const back750 = webpFiles.find(f => f.includes('back-750'));

            // If we don't have front/back with specific sizes, just grab what we have
            const mainImgFile = front600 || webpFiles[0];
            const hoverImgFile = back600 || front600 || webpFiles[0];

            // Gallery: collect all -750 or just all if not available
            const galleryFiles = webpFiles.filter(f => f.includes('-750'));
            const finalGallery = galleryFiles.length > 0 ? galleryFiles : webpFiles;

            const importPrefix = `Img_${importCounter++}`;
            const mainImportName = `${importPrefix}_Main`;
            const hoverImportName = `${importPrefix}_Hover`;

            imports.push(`import ${mainImportName} from '@/images/amiparis/${categoryDir}/${code}/${mainImgFile}';`);
            imports.push(`import ${hoverImportName} from '@/images/amiparis/${categoryDir}/${code}/${hoverImgFile}';`);

            const galleryImports = finalGallery.map((f, idx) => {
                const name = `${importPrefix}_Gal_${idx}`;
                imports.push(`import ${name} from '@/images/amiparis/${categoryDir}/${code}/${f}';`);
                return name;
            });

            products.push({
                id: productId,
                title: `Ami Paris ${categoryName} ${code}`,
                price: 250, // Default price
                image: mainImportName,
                hoverImage: hoverImportName,
                gallery: `[${galleryImports.join(', ')}]`,
                category: categoryName,
                brand: 'Ami Paris',
                slug: `ami-paris-${categoryDir}-${code.toLowerCase()}`
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
