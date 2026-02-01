import { notFound } from 'next/navigation';
import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

// Helper to normalize strings for display
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

export default async function BrandPage({
    params
}: {
    params: Promise<{ brand: string }>
}) {
    const { brand } = await params;
    const normalizedParam = normalizeText(brand);

    // 1. Try to find products by Brand
    let filteredProducts = allProducts.filter(p =>
        normalizeText(p.brand).toLowerCase() === normalizedParam.toLowerCase()
    );
    let title = normalizedParam;
    let isBrand = true;
    let isCategory = false;

    // 2. If no products found by Brand, try Category
    if (filteredProducts.length === 0) {
        filteredProducts = allProducts.filter(p =>
            normalizeText(p.category).toLowerCase() === normalizedParam.toLowerCase()
        );
        isBrand = false;

        if (filteredProducts.length > 0) {
            isCategory = true;
        }
    }

    if (filteredProducts.length === 0) {
        return notFound();
    }

    // Get available categories for this brand for the filter
    const availableCategories = Array.from(new Set(allProducts.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={filteredProducts}
                title={title}
                initialBrand={isBrand ? normalizedParam : ''}
                initialCategory={isCategory ? normalizedParam : ''}
                availableCategories={availableCategories}
                showBrandFilter={!isBrand} // Show brand filter if we are viewing a category (e.g. /hoodies)
                isGlobalView={isCategory}
            />
        </div>
    );
}
