const fs = require('fs');
const path = require('path');

// Target file
const OUTPUT_FILE = path.join(__dirname, '../src/data/generated-products.ts');

// Image paths relative to src/images
// We will generate the imports in the TS file.
// Cambair burberry por la marca
const BASE_IMG_PATH = '@/images/burberry/hoodies/WSC-12BB808302';

const products = [
    { id: '1', name: 'Burberry Hoodie Test 1' },
    { id: '2', name: 'Burberry Hoodie Test 2' },
    { id: '3', name: 'Burberry Hoodie Test 3' },
    { id: '4', name: 'Burberry Hoodie Test 4' },
];

const fileContent = `import { StaticImageData } from 'next/image';

// Import references
import Front600 from '${BASE_IMG_PATH}/front-600x750.webp';
import Back600 from '${BASE_IMG_PATH}/back-600x750.webp';
import Front750 from '${BASE_IMG_PATH}/front-750x930.webp';
import Back750 from '${BASE_IMG_PATH}/back-750x930.webp';

export interface Product {
    id: string;
    title: string;
    price: number;
    image: StaticImageData; // Main listing image (600x750)
    hoverImage: StaticImageData; // Hover listing image (600x750)
    gallery: StaticImageData[]; // Detail images (750x930)
    category: string;
    brand: string;
    slug: string;
}

export const products: Product[] = [
${products.map(p => `    {
        id: '${p.id}',
        title: '${p.name}',
        price: 850,
        image: Front600,
        hoverImage: Back600,
        gallery: [Front750, Back750],
        category: 'Hoodies',
        brand: 'Burberry',
        slug: 'mock-product-${p.id}'
    }`).join(',\n')}
];
`;

fs.writeFileSync(OUTPUT_FILE, fileContent);
console.log('Test products generated successfully!');
