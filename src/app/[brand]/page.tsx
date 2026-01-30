import { notFound } from 'next/navigation';
import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

// Helper to normalize strings for display
const normalizeText = (text: string): string => {
    if (!text) return '';
    if (text.toLowerCase() === 'ami-paris' || text.toLowerCase() === 'amiparis') return 'Ami Paris';
    if (text.toLowerCase() === 'amiri') return 'Amiri';
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export default async function BrandPage({
    params
}: {
    params: Promise<{ brand: string }>
}) {
    const { brand } = await params;
    const normalizedBrand = normalizeText(brand);

    // Verify if brand exists
    const brandProducts = allProducts.filter(p =>
        normalizeText(p.brand).toLowerCase() === normalizedBrand.toLowerCase()
    );

    if (brandProducts.length === 0) {
        return notFound();
    }

    // Get available categories for this brand for the filter
    const availableCategories = Array.from(new Set(brandProducts.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={brandProducts}
                title={normalizedBrand}
                initialBrand={normalizedBrand}
                availableCategories={availableCategories}
                showBrandFilter={false} // Already in brand page
            />
        </div>
    );
}
