const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../src/images/products');
const OUTPUT_FILE = path.join(__dirname, '../shopify_products.csv');

// Config
const MAX_TOTAL_PRODUCTS = 150;
const LIMIT_PER_CATEGORY = 3;

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const HEADERS = [
    'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Type', 'Tags', 'Published',
    'Option1 Name', 'Option1 Value', 'Variant Grams', 'Variant Inventory Tracker',
    'Variant Inventory Qty', 'Variant Price', 'Image Src', 'Image Position', 'Image Alt Text'
];

// Helper to escape CSV fields
const escapeCsv = (field) => {
    if (field === undefined || field === null) return '';
    const stringField = String(field);
    if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
};

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

function generateCsv() {
    let csvRows = [HEADERS.join(',')];
    let totalProducts = 0;

    const excludedDirs = ['HomePage', 'brickenstones'];

    if (!fs.existsSync(IMAGES_DIR)) {
        console.error(`Images directory not found: ${IMAGES_DIR}`);
        return;
    }

    const brands = fs.readdirSync(IMAGES_DIR);

    brands.forEach((brandDir) => {
        if (totalProducts >= MAX_TOTAL_PRODUCTS) return;

        const brandPath = path.join(IMAGES_DIR, brandDir);
        if (!fs.statSync(brandPath).isDirectory() || excludedDirs.includes(brandDir)) return;

        const brandName = formatBrandName(brandDir);
        const contents = fs.readdirSync(brandPath);

        contents.forEach((item) => {
            if (totalProducts >= MAX_TOTAL_PRODUCTS) return;

            const itemPath = path.join(brandPath, item);
            if (!fs.statSync(itemPath).isDirectory()) return;

            const subItems = fs.readdirSync(itemPath);
            const hasImagesDirectly = subItems.some((f) => f.endsWith('.webp'));

            if (hasImagesDirectly) {
                // CASE 1: 2-Level
                const productCode = item;
                const categoryName = brandDir.toLowerCase() === 'bestsellers' ? 'Best Sellers' : brandName;
                processProductToCsv(brandDir, brandName, categoryName, productCode, itemPath, csvRows);
                totalProducts++;
            } else {
                // CASE 2: 3-Level
                const categoryDir = item;
                const categoryName = CATEGORY_MAP[categoryDir.toLowerCase()] || categoryDir.charAt(0).toUpperCase() + categoryDir.slice(1);

                const productCodes = subItems;
                let categoryCount = 0;

                for (const code of productCodes) {
                    if (totalProducts >= MAX_TOTAL_PRODUCTS) break;
                    if (categoryCount >= LIMIT_PER_CATEGORY) break;

                    const productPath = path.join(itemPath, code);
                    if (!fs.statSync(productPath).isDirectory()) continue;

                    processProductToCsv(brandDir, brandName, categoryName, code, productPath, csvRows);
                    categoryCount++;
                    totalProducts++;
                }
            }
        });
    });

    fs.writeFileSync(OUTPUT_FILE, csvRows.join('\n'));
    console.log(`Generated CSV with ${totalProducts} products to ${OUTPUT_FILE}`);
}

function processProductToCsv(brandDir, brandName, categoryName, code, productPath, csvRows) {
    const files = fs.readdirSync(productPath);
    const webpFiles = files.filter(f => f.endsWith('.webp'));
    if (webpFiles.length === 0) return;

    // Detect Images (Same logic as generator)
    let mainImgFile = webpFiles.find(f => f.toLowerCase() === 'front.webp');
    if (!mainImgFile) mainImgFile = webpFiles.find(f => f.toLowerCase().includes('front'));
    if (!mainImgFile) mainImgFile = webpFiles[0];

    const galleryFiles = webpFiles.filter(f => f !== mainImgFile); // Simpler gallery logic for CSV export

    // Data Construction
    const safeBrand = brandDir.toLowerCase().replace(/_/g, '-');
    const safeCat = categoryName.toLowerCase().replace(/ /g, '-').replace(/_/g, '-');
    const safeId = code.toLowerCase();
    const handle = `${safeBrand}-${safeCat}-${safeId}`;
    const title = `${brandName} ${code}`;
    const price = '250.00';

    // Rows Construction
    // Row 1: First Variant (XS) + Main Image
    const row1 = [
        handle,
        title,
        '', // Body HTML
        brandName, // Vendor
        categoryName, // Type
        `${brandName},${categoryName},Unisex`, // Tags
        'TRUE', // Published
        'Size', // Option1 Name
        SIZES[0], // Option1 Value (XS)
        '500', // Grams
        'shopify', // Inventory Tracker
        '100', // Inventory Qty
        price,
        mainImgFile, // Image Src (Just filename for now as requested)
        '1', // Image Position
        title // Alt Text
    ];
    csvRows.push(row1.map(escapeCsv).join(','));

    // Remaining Variants (S, M, L...)
    for (let i = 1; i < SIZES.length; i++) {
        const variantRow = [
            handle,
            '', '', '', '', '', '', // Title, Body, Vendor, Type... skip
            '', // Option1 Name (can be empty on subsequent rows if implicit, but safer to repeat 'Size'?? No, usually repeat Handle)
            // Actually Shopify CSV format:
            // Handle, Title... Option1 Name, Option1 Value...
            // If Handle is same, it adds variant.
            'Size',
            SIZES[i],
            '500',
            'shopify',
            '100',
            price,
            '', '', '' // No image for variant rows unless variant-specific
        ];
        csvRows.push(variantRow.map(escapeCsv).join(','));
    }

    // Remaining Images (Gallery)
    // Add as extra rows with just Handle and Image columns
    let imgPos = 2;
    galleryFiles.forEach(img => {
        const imgRow = [
            handle,
            '', '', '', '', '', '',
            '', '', '', '', '', '', // Options/Variants empty
            img, // Image Src
            imgPos++,
            ''
        ];
        csvRows.push(imgRow.map(escapeCsv).join(','));
    });
}

generateCsv();
