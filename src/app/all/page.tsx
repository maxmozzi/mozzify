import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

export default function ShopAllPage() {
    // Get all available brands/categories for the filter sidebars
    const availableCategories = Array.from(new Set(allProducts.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={allProducts}
                allProductsSource={allProducts}
                title="Shop All"
                availableCategories={availableCategories}
                showBrandFilter={true}
                isGlobalView={true}
            />
        </div>
    );
}
