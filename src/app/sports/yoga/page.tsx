'use client';

import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

export default function YogaPage() {
    const category = 'Yoga';
    const items = allProducts.filter(p => p.category === category || p.tags?.includes(category));
    const availableCategories = Array.from(new Set(items.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={items}
                allProductsSource={allProducts}
                title="Yoga"
                availableCategories={availableCategories}
                showBrandFilter={true}
                isGlobalView={false}
                showCategoryCarousel={false}
            />
        </div>
    );
}
