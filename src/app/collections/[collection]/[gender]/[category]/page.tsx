
import { products } from '@/data/generated-products';
import ProductListing from '@/components/products/product-listing';
import { notFound } from 'next/navigation';

// Map URL slugs to internal data values
const COLLECTION_MAP: Record<string, string> = {
    'best-sellers': 'Best Sellers',
    'new-arrivals': 'New Arrivals',
    'sale': 'Sale',
    'must-have': 'Must Have',
};

const GENDER_MAP: Record<string, string> = {
    'mens': 'men',
    'womens': 'women',
    'unisex': 'unisex'
};

const CATEGORY_MAP: Record<string, string> = {
    'tshirt': 'T-Shirts',
    'iphone_case': 'iPhone Case',
    'sweatshirt': 'Sweatshirts',
    'polo': 'Polo',
    'shorts': 'Shorts',
    'jeans': 'Jeans',
    'sweater': 'Sweater',
    'jacket': 'Jacket',
    'sets': 'Sets',
    'shoes': 'Shoes',
    'hoodies': 'Hoodies'
};

interface PageProps {
    params: Promise<{
        collection: string;
        gender: string;
        category: string;
    }>;
}

export default async function CategoryCollectionPage(props: PageProps) {
    const params = await props.params;
    const { collection, gender, category } = params;

    // 1. Resolve Names
    let targetCollection = COLLECTION_MAP[collection] || collection.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    let targetCategory = CATEGORY_MAP[category.toLowerCase()] || category.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const targetGender = GENDER_MAP[gender] || gender;

    // 2. Filter by Gender
    const genderPool = products.filter(p => {
        const productGender = p.gender || 'unisex';
        return targetGender === 'unisex' ? true : (productGender === targetGender || productGender === 'unisex');
    });

    // 3. Filter by Collection Context
    let collectionPool = genderPool.filter(p => {
        const hasTag = p.tags?.some((t: string) => t.toLowerCase() === targetCollection.toLowerCase());
        const isCategory = p.category?.toLowerCase() === targetCollection.toLowerCase();
        return hasTag || isCategory;
    });

    // Fallback logic for virtual collections (Standard behavior in this app)
    if (collectionPool.length === 0) {
        if (collection === 'new-arrivals') collectionPool = genderPool.slice(0, 100);
        else if (collection === 'sale') collectionPool = genderPool.filter(p => p.price < 1500).slice(0, 100);
        else if (collection === 'must-have') collectionPool = genderPool.slice(50, 150);
        else if (collection === 'best-sellers') collectionPool = genderPool.slice(100, 200);
        else collectionPool = genderPool; // For 'clothing' etc.
    }

    // Special Handling for "Clothing"
    if (collection === 'clothing') {
        const excludedCategories = ['shoes', 'belt', 'iphone case', 'accessory'];
        collectionPool = genderPool.filter(p => {
            const cat = (p.category || '').toLowerCase();
            return !excludedCategories.some(excluded => cat.includes(excluded));
        });
    }

    // Special Handling for "Shoes"
    if (collection === 'shoes') {
        const shoeCategories = ['shoe', 'sneaker', 'boot', 'loafer', 'slide'];
        collectionPool = genderPool.filter(p => {
            const cat = (p.category || '').toLowerCase();
            return shoeCategories.some(shoeCat => cat.includes(shoeCat));
        });
    }

    // Special Handling for "Sports"
    if (collection === 'sports') {
        const sportsCategories = ['running', 'gym', 'football', 'basketball', 'training', 'sports'];
        collectionPool = genderPool.filter(p => {
            const cat = (p.category || '').toLowerCase();
            return sportsCategories.some(sportCat => cat.includes(sportCat));
        });
    }

    // 4. Resolve the requested category name for display
    let displayCategory = CATEGORY_MAP[category.toLowerCase()] ||
        category.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    // 5. Final Filter
    // We follow the parent page's subcategory filtering logic for consistency.
    // We search the WHOLE genderPool to ensure we find 10 products of that type.
    const normalizedParam = category.toLowerCase().replace(/[\s\-_]/g, '');

    const finalProducts = genderPool.filter(p => {
        const prodCat = (p.category || '').toLowerCase();
        const normProdCat = prodCat.replace(/[\s\-_]/g, '');
        const prodTags = (p.tags || []).map(t => t.toLowerCase().replace(/[\s\-_]/g, ''));

        // 1. Direct normalized match (e.g. "tshirt" === "tshirt")
        if (normProdCat === normalizedParam || prodTags.includes(normalizedParam)) {
            // Special check: if we are looking for tshirt, don't return sweatshirt
            if (normalizedParam === 'tshirt' && normProdCat.includes('sweat')) return false;
            return true;
        }

        // 2. Extra robust check for T-Shirt variations
        if (normalizedParam === 'tshirt') {
            return prodCat === 't-shirt' || prodCat === 't-shirts' ||
                prodCat.includes('t-shirt') || prodCat.includes('tshirt');
        }

        // 3. Extra robust check for Sweatshirt variations
        if (normalizedParam === 'sweatshirt') {
            return prodCat.includes('sweatshirt');
        }

        return false;
    }).slice(0, 10);

    if (finalProducts.length === 0) {
        return notFound();
    }

    // Get available categories for the sidebar (all categories in the gender pool)
    const availableCategories = Array.from(new Set(genderPool.map(p => p.category).filter(Boolean))).sort() as string[];

    return (
        <main className="min-h-screen">
            <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
                <ProductListing
                    initialProducts={finalProducts}
                    allProductsSource={genderPool}
                    title={displayCategory}
                    initialCategory={displayCategory}
                    availableCategories={availableCategories}
                    showCategoryCarousel={false}
                />
            </div>
        </main>
    );
}
