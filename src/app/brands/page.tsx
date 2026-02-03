'use client';

import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

export default function BrandsPage() {
    // Show all products, but maybe sorted by brand or just a list
    // For now, listing all products under "Brands" title
    const availableCategories = Array.from(new Set(allProducts.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={allProducts}
                allProductsSource={allProducts}
                title="Brands"
                availableCategories={availableCategories}
                showBrandFilter={true}
                isGlobalView={true}
                showCategoryCarousel={true}
            />
        </div>
    );
}
