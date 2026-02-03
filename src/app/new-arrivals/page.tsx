import ProductListing from '@/components/products/product-listing';
import { products } from '@/data/generated-products';

export default function NewArrivalsPage() {
    // Take first 10 products
    const items = products.slice(0, 10);

    // Get available categories for the filter
    const availableCategories = Array.from(new Set(items.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={items}
                allProductsSource={products}
                title="New Arrivals"
                availableCategories={availableCategories}
                showBrandFilter={true}
                isGlobalView={true}
                showCategoryCarousel={true}
            />
        </div>
    );
}
