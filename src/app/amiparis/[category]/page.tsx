import { notFound } from 'next/navigation';
import ProductGrid from '@/components/home/product-grid';
import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

// Helper to normalize category names for URL
const normalizeCategory = (categorySlug: string): string => {
    const categoryMap: { [key: string]: string } = {
        'hoodies': 'Hoodies',
        'tshirts': 'T-Shirts',
        'tshirt': 'T-Shirts',
        'polo': 'Polo',
        'shorts': 'Shorts',
        'sweater': 'Sweater',
        'sweatshirts': 'Sweatshirts',
        'sweatshirt': 'Sweatshirts',
        'iphone_case': 'iPhone Case',
        'iphone-case': 'iPhone Case',
    };

    return categoryMap[categorySlug.toLowerCase()] ||
        categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
};

// Get available categories for Ami Paris
const getAmiCategories = (): string[] => {
    const amiProducts = allProducts.filter(p =>
        p.brand?.toLowerCase() === 'ami paris'
    );

    const uniqueCategories = new Set(
        amiProducts
            .map(p => p.category)
            .filter(Boolean) as string[]
    );

    return Array.from(uniqueCategories).sort();
};

export default async function AmiCategoryPage({
    params
}: {
    params: Promise<{ category: string }>
}) {
    const { category } = await params;
    const normalizedCategory = normalizeCategory(category);

    // Initial filter for the brand and category
    const initialItems = allProducts.filter(p =>
        p.brand?.toLowerCase() === 'ami paris' &&
        p.category?.toLowerCase() === normalizedCategory.toLowerCase()
    );

    // Get all Ami Paris products for the full-featured listing
    const brandProducts = allProducts.filter(p =>
        p.brand?.toLowerCase() === 'ami paris'
    );

    if (initialItems.length === 0 && brandProducts.length === 0) {
        return notFound();
    }

    const availableCategories = getAmiCategories();

    return (
        <div style={{ paddingTop: '80px' }}>
            <div style={{ paddingBottom: '4rem' }}>
                <ProductListing
                    initialProducts={brandProducts}
                    title={`Ami Paris ${normalizedCategory}`}
                    initialBrand="Ami Paris"
                    initialCategory={normalizedCategory}
                    availableCategories={availableCategories}
                    initialFilteredProducts={initialItems}
                />
                {initialItems.length === 0 && (
                    <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <p>No products found for {normalizedCategory}.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
