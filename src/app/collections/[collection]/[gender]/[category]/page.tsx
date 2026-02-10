
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
    't-shirts': 'T-Shirts',
    'iphone_case': 'iPhone Case',
    'sweatshirt': 'Sweatshirts',
    'sweatshirts': 'Sweatshirts',
    'polo': 'Polos',
    'polos': 'Polos',
    'shorts': 'Shorts',
    'short': 'Shorts',
    'jeans': 'Jeans',
    'sweater': 'Sweaters',
    'sweaters': 'Sweaters',
    'jacket': 'Jackets',
    'jackets': 'Jackets',
    'sets': 'Sets',
    'shoes': 'Shoes',
    'hoodies': 'Hoodies',
    'hoodie': 'Hoodies',
    'bags': 'Bags',
    'belts': 'Belts',
    'caps': 'Caps',
    'hats': 'Hats',
    'wallets': 'Wallets',
    'scarves': 'Scarves',
    'ski_mask': 'Ski Mask',
    'sunglasses': 'Sunglasses'
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
    // Use the normalized mapping for consistency
    const systemCategory = CATEGORY_MAP[category.toLowerCase()] || category.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const targetGender = GENDER_MAP[gender] || gender;

    // 2. Filter by Gender
    const genderPool = products.filter(p => {
        const productGender = p.gender || 'unisex';
        return targetGender === 'unisex' ? true : (productGender === targetGender || productGender === 'unisex');
    });

    // 3. Filter by Collection Context (Optional if we want to narrow down, but usually we want full category)
    // For specific subcategory pages, we usually ignore the "Best Seller/Sale" collection wrapper 
    // and show ALL products of that category, but we still respect the collection pool if it's restrictive.
    // However, the user wants 10 items, so we'll fallback to genderPool if needed.

    // 4. Final Filter
    const normalizedParam = category.toLowerCase().replace(/[\s\-_]/g, '');
    const singularParam = normalizedParam.endsWith('s') ? normalizedParam.slice(0, -1) : normalizedParam;

    // STRICT: Only match the 'category' property. Ignore tags to prevent muddled categories.
    const finalProducts = genderPool.filter(p => {
        const prodCat = (p.category || '').toLowerCase();
        const normProdCat = prodCat.replace(/[\s\-_]/g, '');

        // 1. Direct normalized match on Category property
        if (normProdCat === normalizedParam || normProdCat === singularParam) {
            // Special check: if we are looking for tshirts, don't return sweatshirts
            if (normalizedParam === 'tshirts' && normProdCat.includes('sweat')) return false;
            return true;
        }

        // 2. Exact match variations for T-Shirts/Sweatshirts
        if (normalizedParam === 'tshirt' || normalizedParam === 'tshirts') {
            if (prodCat === 't-shirt' || prodCat === 't-shirts' || prodCat === 'tshirts') return true;
        }
        if (normalizedParam === 'sweatshirt' || normalizedParam === 'sweatshirts') {
            if (prodCat === 'sweatshirt' || prodCat === 'sweatshirts') return true;
        }

        return false;
    }).slice(0, 10);

    if (finalProducts.length === 0) {
        return notFound();
    }

    // Get available categories for the sidebar (all categories in the gender pool)
    const availableCategories = Array.from(new Set(genderPool.map(p => p.category).filter(Boolean))).sort() as string[];

    // 5. Resolve actual category for display and filtering
    const displayCategory = systemCategory;
    const initialCategoryFilter = systemCategory;

    return (
        <main className="min-h-screen">
            <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
                <ProductListing
                    initialProducts={finalProducts}
                    allProductsSource={genderPool}
                    title={displayCategory}
                    initialCategory={initialCategoryFilter}
                    availableCategories={availableCategories}
                    showCategoryCarousel={false}
                />
            </div>
        </main>
    );
}
