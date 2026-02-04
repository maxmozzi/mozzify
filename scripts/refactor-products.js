
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../src/images/products');
const OUTPUT_FILE = path.join(__dirname, '../src/data/generated-products.ts');

if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Directory not found: ${IMAGES_DIR}`);
    process.exit(1);
}

const brands = fs.readdirSync(IMAGES_DIR).filter(f => fs.statSync(path.join(IMAGES_DIR, f)).isDirectory());

let importStatements = [];
let productEntries = [];
let importCounter = 0;


// Track global category counts
const categoryCounts = {};

brands.forEach(brand => {
    const brandPath = path.join(IMAGES_DIR, brand);
    const categories = fs.readdirSync(brandPath).filter(f => fs.statSync(path.join(brandPath, f)).isDirectory());

    categories.forEach(category => {
        // Normalize: iphone_case -> Iphone Case, tshirt -> Tshirt
        const catName = category
            .replace(/_/g, ' ')
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');

        const categoryPath = path.join(brandPath, category);
        const productFolders = fs.readdirSync(categoryPath).filter(f => fs.statSync(path.join(categoryPath, f)).isDirectory());

        productFolders.forEach(productFolder => {
            // Check global limit for this category
            if ((categoryCounts[catName] || 0) >= 10) return;

            const productDirPath = path.join(categoryPath, productFolder);
            const files = fs.readdirSync(productDirPath)
                .filter(f => /\.(webp|png|jpg|jpeg)$/i.test(f))
                .map(f => path.join(productDirPath, f));

            if (files.length === 0) return;

            // Increment count for this category
            categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;

            importCounter++;
            const slug = `${brand.toLowerCase()}-${category.toLowerCase()}-${productFolder.toLowerCase().replace(/\s+/g, '-')}`.replace(/[^a-z0-9-]/g, '-');

            // Find best images
            const frontImage = files.find(f => f.toLowerCase().includes('front')) || files[0];
            const hoverImage = files.find(f => f.toLowerCase().includes('back') || (f !== frontImage)) || files[0];

            // Create imports
            const mainImportName = `Img_${importCounter}_Main`;
            const hoverImportName = `Img_${importCounter}_Hover`;

            importStatements.push(`import ${mainImportName} from '@/images/products/${brand}/${category}/${productFolder}/${path.basename(frontImage)}';`);
            importStatements.push(`import ${hoverImportName} from '@/images/products/${brand}/${category}/${productFolder}/${path.basename(hoverImage)}';`);

            const galleryImports = [];
            files.slice(0, 4).forEach((file, idx) => {
                const gName = `Img_${importCounter}_Gal_${idx}`;
                importStatements.push(`import ${gName} from '@/images/products/${brand}/${category}/${productFolder}/${path.basename(file)}';`);
                galleryImports.push(gName);
            });

            // Clean Title
            let cleanTitle = productFolder
                .replace(/_/g, ' ')
                .replace(/-/g, ' ')
                .split(' ')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');

            productEntries.push(`
    {
        id: '${slug}',
        title: "${cleanTitle}",
        price: ${Math.floor(Math.random() * (250 - 45 + 1) + 45)},
        image: ${mainImportName},
        hoverImage: ${hoverImportName},
        gallery: [${galleryImports.join(', ')}],
        category: "${catName}",
        brand: "${brand}",
        slug: "${slug}",
        gender: "unisex",
        tags: ["${brand}", "${catName}"]
    }`);
        });
    });
});

const content = `// AUTO-GENERATED FILE - DO NOT EDIT
import { StaticImageData } from 'next/image';
import { Product } from '@/types/product';

${importStatements.join('\n')}

export const products: any[] = [
${productEntries.join(',\n')}
];
`;

fs.writeFileSync(OUTPUT_FILE, content);
console.log(`Successfully generated ${productEntries.length} products to ${OUTPUT_FILE}`);
