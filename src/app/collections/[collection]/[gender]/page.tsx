
import { products } from '@/data/generated-products';
import CollectionListing from '@/components/collections/collection-listing';
import { GridProduct } from '@/types/product';

// Map URL slugs to internal data values
const COLLECTION_MAP: Record<string, string> = {
    'best-sellers': 'Best Sellers',
    'new-arrivals': 'New Arrivals',
    'sale': 'Sale',
    'must-have': 'Must Have',
    // Add more as needed, or use a loose text matching strategy
};

const GENDER_MAP: Record<string, string> = {
    'mens': 'men',
    'womens': 'women',
    'unisex': 'unisex'
};

interface PageProps {
    params: Promise<{
        collection: string;
        gender: string;
    }>;
    searchParams: Promise<{
        collections?: string; // This corresponds to the subcategory filter (e.g. ?collections=hoodies)
    }>;
}

export default async function CollectionPage(props: PageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const { collection, gender } = params;
    const subcategoryFilter = searchParams.collections?.toLowerCase();


    // 1. Resolve Collection Name
    let targetCollection = COLLECTION_MAP[collection] || collection.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    // 2. Full pool for this gender (Men/Women/Unisex)
    const targetGender = GENDER_MAP[gender];
    const genderPool = products.filter(p => {
        const productGender = p.gender || 'unisex';
        return targetGender === 'unisex' ? true : (productGender === targetGender || productGender === 'unisex');
    });

    // 3. Define the "Collection Context"
    // First, try to find products with actual tags for this collection
    let taggedProducts = genderPool.filter(p => {
        const hasTag = p.tags?.some((t: string) => t.toLowerCase() === targetCollection.toLowerCase());
        const isCategory = p.category?.toLowerCase() === targetCollection.toLowerCase();
        return hasTag || isCategory;
    });

    // If no products are tagged (e.g. mock collections), use fallback slices
    let collectionPool = taggedProducts;
    if (collectionPool.length === 0) {
        if (collection === 'new-arrivals') collectionPool = genderPool.slice(0, 50);
        else if (collection === 'sale') collectionPool = genderPool.filter(p => p.price < 1500).slice(0, 50);
        else if (collection === 'must-have') collectionPool = genderPool.slice(50, 100);
        else if (collection === 'best-sellers') collectionPool = genderPool.slice(100, 150);
        else collectionPool = genderPool.slice(0, 50);
    }

    // 3.1 Special Handling for "Clothing" collection to exclude accessories/shoes
    if (collection === 'clothing') {
        const excludedCategories = ['shoes', 'belt', 'iphone case', 'accessory'];
        collectionPool = genderPool.filter(p => {
            const cat = (p.category || '').toLowerCase();
            return !excludedCategories.some(excluded => cat.includes(excluded));
        });
    }

    // 3.2 Special Handling for "Shoes" collection to ONLY include shoe-related categories
    if (collection === 'shoes') {
        const shoeCategories = ['shoe', 'sneaker', 'boot', 'loafer', 'slide'];
        collectionPool = genderPool.filter(p => {
            const cat = (p.category || '').toLowerCase();
            return shoeCategories.some(shoeCat => cat.includes(shoeCat));
        });
    }

    // 3.3 Special Handling for "Sports" collection
    if (collection === 'sports') {
        const sportsCategories = ['running', 'gym', 'football', 'basketball', 'training', 'sports'];
        collectionPool = genderPool.filter(p => {
            const cat = (p.category || '').toLowerCase();
            return sportsCategories.some(sportCat => cat.includes(sportCat));
        });
    }

    // 3.4 Special Handling for "Accessories" collection
    if (collection === 'accessories') {
        const accCategories = ['bag', 'belt', 'cap', 'hat', 'wallet', 'scarf', 'mask', 'sunglass'];
        collectionPool = genderPool.filter(p => {
            const cat = (p.category || '').toLowerCase();
            return accCategories.some(acc => cat.includes(acc));
        });
    }

    // 4. Final Filtering
    // If user selected a subcategory (e.g. Hoodies), we search the WHOLE genderPool 
    // to ensure we find 10 products of that specific type.
    const filteredProducts = (subcategoryFilter
        ? genderPool.filter(p => {
            const prodCat = (p.category || '').toLowerCase();
            const normProdCat = prodCat.replace(/[\s\-_]/g, '');
            const normalizedParam = subcategoryFilter.replace(/[\s\-_]/g, '');
            const singularParam = normalizedParam.endsWith('s') ? normalizedParam.slice(0, -1) : normalizedParam;

            // 1. Direct normalized match on Category property
            if (normProdCat === normalizedParam || normProdCat === singularParam) {
                // Special check: if we are looking for tshirts, don't return sweatshirts
                if (normalizedParam === 'tshirts' && normProdCat.includes('sweat')) return false;
                return true;
            }

            // 2. Robust check for variations (Strict)
            if (normalizedParam === 'tshirt' || normalizedParam === 'tshirts') {
                if (prodCat === 'shirt' || prodCat === 'shirts') return false; // Strict exclusion
                return prodCat === 't-shirt' || prodCat === 't-shirts' || prodCat === 'tshirts';
            }
            if (normalizedParam === 'shirt' || normalizedParam === 'shirts') {
                if (prodCat.includes('t-shirt') || prodCat.includes('tshirt')) return false; // Strict exclusion
                return prodCat === 'shirt' || prodCat === 'shirts';
            }
            if (normalizedParam === 'sweatshirt' || normalizedParam === 'sweatshirts') {
                return prodCat === 'sweatshirt' || prodCat === 'sweatshirts';
            }

            return false;
        })
        : collectionPool
    ).slice(0, 10); // LIMIT TO 10 AS REQUESTED

    // 5. baseProducts for the Carousel/Drawer
    // We want the carousel to show categories available in this "Collection" context
    const baseProducts = collectionPool.length > 0 ? collectionPool : genderPool.slice(0, 100);

    return (
        <main className="pt-20 pb-16 min-h-screen">
            <CollectionListing
                initialProducts={filteredProducts}
                baseProducts={baseProducts}
                collectionTitle={targetCollection}
                gender={gender}
                activeSubcategory={subcategoryFilter}
                collectionSlug={collection}
            />
        </main>
    );
}
