const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../src/images');
const OUTPUT_FILE = path.join(__dirname, '../src/data/generated-products.ts');
const PRODUCT_LIMIT = 150; // Increased to ensure coverage for all categories

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

    // Recurse
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

for (const productDir of productFolders) {
    if (productEntries.length >= PRODUCT_LIMIT) break;

    // Determine structure relative to IMAGES_DIR
    const relativePath = path.relative(IMAGES_DIR, productDir);
    const parts = relativePath.split(path.sep);

    // Filter out root matches if any
    if (parts.length === 0) continue;

    let brand, category, title;

    // New structure: products/[brand]/[category]/[id] OR curated/[bestseller/sale]/[id]
    // OR deeper: curated/sports/football/jordan/trucksuits/jordan-trucksuits-001

    // Strategy: Look at the folder name itself as the ID/Title source, 
    // and its parent folders for Category/Brand

    const folderName = parts[parts.length - 1]; // e.g. amiparis-hoodie-001 or jordan-trucksuits-001

    if (parts[0] === 'products') {
        // Standard: products/amiparis/hoodies/amiparis-hoodie-001
        if (parts.length >= 4) {
            brand = parts[1];
            category = parts[2];
            title = folderName;
        } else if (parts.length === 3) {
            brand = parts[1];
            category = parts[2];
            title = folderName;
        } else {
            continue;
        }
    } else if (parts[0] === 'curated') {
        // Complex: curated/sports/football/jordan/trucksuits/jordan-trucksuits-001
        // OR: curated/bestsellers/amiparis-hoodie-001

        if (parts[1] === 'sports') {
            // curated/sports/[sport]/[brand]/[category]/[id]
            // or curated/sports/[sport]/[category]/[id]
            // We need to valid parts length. 
            // Let's rely on the folder name for title and try to extract others.

            // Simple fallback: 
            // Brand = try to extract from folder name or parent
            // Category = parent folder name

            const parentFolder = parts[parts.length - 2];
            category = parentFolder; // e.g. trucksuits
            title = folderName;

            // Try to extract brand from title (jordan-trucksuits...)
            const titleParts = folderName.split('-');
            brand = titleParts[0]; // jordan

            // Override category if it's a sport name, maybe go one level up
            // specific fix for the user's issue:
            // curated/sports/football/jordan/trucksuits/jordan-trucksuits-001
            // parts: [curated, sports, football, jordan, trucksuits, jordan-trucksuits-001]
            if (parts.includes('jordan')) brand = 'Jordan';

        } else {
            // curated/bestsellers/xxx
            const type = parts[1];
            category = type === 'bestsellers' ? 'Best Sellers' : type;
            title = folderName;
            const titleParts = folderName.split('-');
            brand = titleParts[0];
        }
    } else {
        continue;
    }

    // Get Images
    const files = fs.readdirSync(productDir)
        .filter(f => VALID_EXTS.includes(path.extname(f).toLowerCase()));

    if (files.length === 0) continue;

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
    const formatStr = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ') : 'General';
    const displayBrand = formatStr(brand);

    // Normalize Category
    let displayCategory = formatStr(category);
    // Fix specific categories to match frontend Map
    if (displayCategory.toLowerCase().includes('shirt') && !displayCategory.toLowerCase().includes('t-shirt') && !displayCategory.toLowerCase().includes('sweat')) displayCategory = 'T-Shirts';
    if (category.toLowerCase() === 'tshirts' || category.toLowerCase() === 'tshirt') displayCategory = 'T-Shirts';
    if (category.toLowerCase() === 'hoodies') displayCategory = 'Hoodies';
    // ... add more as needed

    const displayTitle = formatStr(title).replace(/(\d{3,}|\.webp|\.jpg)/g, '').trim() || `${displayBrand} Item`;

    // Price logic with Sale
    const basePrice = 50 + Math.floor(Math.random() * 200);
    let price = basePrice;
    let compareAtPrice = undefined;

    // 20% chance of being on sale
    const isSale = Math.random() < 0.2;
    if (isSale) {
        compareAtPrice = Math.floor(basePrice * 1.2) + 10; // Original price higher
        // price remains basePrice (the discounted one)
    }

    // Sports Tags Logic
    const sportTags = ['football', 'basketball', 'running', 'gym'];
    const assignedSports = [];

    // If path contains sport name, force it
    let forcedSport = null;
    if (parts.includes('sports')) {
        if (parts.includes('football')) forcedSport = 'football';
        else if (parts.includes('basketball')) forcedSport = 'basketball';
        else if (parts.includes('running')) forcedSport = 'running';
        else if (parts.includes('gym')) forcedSport = 'gym';
    }

    if (forcedSport) {
        assignedSports.push(forcedSport);
    } else {
        // Random distribution for others
        const numSports = 1 + Math.floor(Math.random() * 2);
        const shuffledSports = [...sportTags].sort(() => 0.5 - Math.random());
        for (let i = 0; i < numSports; i++) {
            assignedSports.push(shuffledSports[i]);
        }
    }

    // Build finalized tags
    const finalTags = [displayBrand, displayCategory, ...assignedSports];

    // Extract implicit type from folder name parts (e.g. amiparis-hoodie-001 -> hoodie -> Hoodies)
    if (folderName) {
        const parts = folderName.split('-');
        if (parts.length > 1) {
            const potentialType = parts[1].toLowerCase();
            // Map common types
            const typeMap = {
                'hoodie': 'Hoodies',
                'hoodies': 'Hoodies',
                'sweater': 'Sweaters',
                'sweaters': 'Sweaters',
                'sweatshirt': 'Sweatshirts',
                'sweatshirts': 'Sweatshirts',
                'polo': 'Polos',
                'polos': 'Polos',
                'short': 'Shorts',
                'shorts': 'Shorts',
                'pant': 'Pants',
                'pants': 'Pants',
                'tank': 'Tanks',
                'tanks': 'Tanks',
                'tee': 'T-Shirts',
                'tshirt': 'T-Shirts',
                'tshirts': 'T-Shirts',
                'shirt': 'T-Shirts',
                'jacket': 'Jackets',
                'jackets': 'Jackets',
                'jeans': 'Jeans',
                'denim': 'Jeans'
            };

            if (typeMap[potentialType]) {
                const typeTag = typeMap[potentialType];
                if (!finalTags.includes(typeTag)) {
                    finalTags.push(typeTag);
                }
            }
        }
    }

    // 50% chance to be a Best Seller (simulated for demo)
    const isBestSeller = category === 'Best Sellers' || parts[1] === 'bestsellers' || Math.random() < 0.5;

    if (isBestSeller) {
        if (!finalTags.includes('Best Sellers')) finalTags.push('Best Sellers');
        // Randomly assign types to Best Sellers to ensure we hav coverage for all carousel categories
        const demoTypes = ['T-Shirts', 'Hoodies', 'Sweatshirts', 'Sweaters', 'Jackets', 'Polos', 'Pants', 'Shorts', 'Sneakers', 'Boots', 'Loafers', 'Slides', 'Trucksuits', 'Accessories', 'Shoes'];

        // Pick 3 random types to ensure overlap and hit 10 products per cat
        for (let k = 0; k < 3; k++) {
            const randomType = demoTypes[Math.floor(Math.random() * demoTypes.length)];
            if (!finalTags.includes(randomType)) {
                finalTags.push(randomType);
            }
        }
    } else {
        // Randomly assign Shoe types to other products to populate Shoes page for testing
        // 40% chance to be a shoe if not already
        if (Math.random() < 0.4) {
            const shoeTypes = ['Sneakers', 'Boots', 'Loafers', 'Slides'];
            // Pick 2 random shoe types
            for (let k = 0; k < 2; k++) {
                const randomShoe = shoeTypes[Math.floor(Math.random() * shoeTypes.length)];
                if (!finalTags.includes(randomShoe)) finalTags.push(randomShoe);
            }
            if (!finalTags.includes('Shoes')) finalTags.push('Shoes');
        }
    }

    // FINAL FIX: Ensure "Shoes" tag if any shoe-type is present
    const shoeKeywords = ['Sneakers', 'Boots', 'Loafers', 'Slides'];
    if (finalTags.some(t => shoeKeywords.includes(t)) && !finalTags.includes('Shoes')) {
        finalTags.push('Shoes');
    }

    if (isSale) {
        finalTags.push('sale');
    }

    // Slug & ID Generation (Ensure Uniqueness)
    // Add importCounter to slug/id to guarantee uniqueness even if names collide
    const rawSlug = `${brand}-${category}-${title}`;
    const cleanSlug = rawSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    const uniqueId = `${cleanSlug}-${importCounter}`; // GUARANTEE UNIQUENESS

    productEntries.push(`    {
        id: '${uniqueId}', 
        title: "${displayTitle}",
        price: ${price},
        ${compareAtPrice ? `compareAtPrice: ${compareAtPrice},` : ''}
        image: ${mainImportName},
        hoverImage: ${hoverImportName},
        gallery: [${galleryImports.join(', ')}],
        category: "${displayCategory}",
        brand: "${displayBrand}",
        slug: "${uniqueId}", // Use uniqueId as slug too
        gender: "unisex", 
        tags: ${JSON.stringify(finalTags)}
    }`);
}

const fileContent = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated by scripts/regenerate-products-v2.js
 */
import { Product } from '@/types/product';

${importStatements.join('\n')}

export const products: Product[] = [
${productEntries.join(',\n')}
];
`;

fs.writeFileSync(OUTPUT_FILE, fileContent);
console.log(`Successfully generated ${productEntries.length} products to ${OUTPUT_FILE}`);
