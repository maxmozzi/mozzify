import { notFound } from 'next/navigation';
import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

// Helper to normalize strings for display (e.g. "amiri" -> "Amiri")
const normalizeText = (text: string): string => {
    if (!text) return '';
    if (text.toLowerCase() === 'ami-paris' || text.toLowerCase() === 'amiparis') return 'Ami Paris';
    if (text.toLowerCase() === 'amiri') return 'Amiri';

    // Manual map for special categories
    const categoryMap: { [key: string]: string } = {
        'iphone_case': 'iPhone Case',
        'tshirt': 'T-Shirts',
        't-shirts': 'T-Shirts',
    };

    return categoryMap[text.toLowerCase()] ||
        text.charAt(0).toUpperCase() + text.slice(1);
};

export default async function SmartCategoryPage({
    params
}: {
    params: Promise<{ brand: string; category: string }>
}) {
    // In this generic route:
    // param 'brand' is the first segment
    // param 'category' is the second segment
    const { brand: param1, category: param2 } = await params;

    const isParam2All = param2.toLowerCase() === 'all';

    // Determine if param1 is a known brand or a known category
    // We scan all products to see if param1 matches any 'brand' field or 'category' field
    const normalizedParam1 = normalizeText(param1);

    const isBrand = allProducts.some(p => normalizeText(p.brand || '').toLowerCase() === normalizedParam1.toLowerCase());
    const isCategory = allProducts.some(p => normalizeText(p.category || '').toLowerCase() === normalizedParam1.toLowerCase());

    let filteredProducts = [];
    let pageTitle = '';
    let initialBrand = '';
    let initialCategory = '';
    let showBrandFilter = false;
    let isGlobalCategoryView = false;

    if (isParam2All) {
        if (isBrand) {
            // CASE: /amiri/all -> Brand All View
            // User wants all products of this brand (any category)
            filteredProducts = allProducts.filter(p =>
                normalizeText(p.brand || '').toLowerCase() === normalizedParam1.toLowerCase()
            );
            pageTitle = `${normalizedParam1} - All Products`;
            initialBrand = normalizedParam1;
            showBrandFilter = false; // Already filtered by brand

        } else {
            // CASE: /hoodies/all -> Global Category View (existing logic)
            // User wants all hoodies (any brand)
            filteredProducts = allProducts.filter(p =>
                normalizeText(p.category || '').toLowerCase() === normalizedParam1.toLowerCase()
            );
            pageTitle = `${normalizedParam1}`;
            initialCategory = normalizedParam1;
            showBrandFilter = true; // Allow filtering by brand
            isGlobalCategoryView = true;
        }
    } else {
        // CASE: /amiri/hoodies -> Specific Brand + Category
        // Standard existing logic
        const targetBrand = normalizeText(param1);
        const targetCategory = normalizeText(param2);

        filteredProducts = allProducts.filter(p =>
            normalizeText(p.brand || '').toLowerCase() === targetBrand.toLowerCase() &&
            normalizeText(p.category || '').toLowerCase() === targetCategory.toLowerCase()
        );

        pageTitle = `${targetBrand} ${targetCategory}`;
        initialBrand = targetBrand;
        initialCategory = targetCategory;
        showBrandFilter = false;
    }

    if (filteredProducts.length === 0) {
        // Fallback check: if the path implies a valid structure but is just empty, we might show empty state.
        // But if completely invalid, 404.
        const entityExists = isBrand || isCategory;
        if (!entityExists) return notFound();
    }

    // Get all available brands/categories for the filter sidebars (if needed)
    const availableCategories = Array.from(new Set(allProducts.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={filteredProducts}
                allProductsSource={allProducts}
                title={pageTitle}
                initialBrand={initialBrand}
                initialCategory={initialCategory}
                availableCategories={availableCategories}
                showBrandFilter={showBrandFilter}
                isGlobalView={isGlobalCategoryView}
            />
        </div>
    );
}
