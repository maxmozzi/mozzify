import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

export default function WomenPage() {
    // Note: We are showing all products as a fallback since gender data is missing
    const availableCategories = Array.from(new Set(allProducts.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={allProducts}
                allProductsSource={allProducts}
                title="Women's Collection"
                availableCategories={availableCategories}
                showBrandFilter={true}
                isGlobalView={true}
            />
        </div>
    );
}
