'use client';

import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

export default function FootballPage() {
    // In a real app we might filter more strictly, but for now filtering by category/tag
    const category = 'Football';
    const items = allProducts.filter(p => p.category === category || p.tags?.includes(category));

    // For specific sport pages, we might not need further sub-categories unless defined, 
    // but passing available categories from the filtered set is good practice.
    const availableCategories = Array.from(new Set(items.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={items}
                allProductsSource={allProducts} // Pass all for global search if needed, but usually redundant here
                title="Football"
                availableCategories={availableCategories}
                showBrandFilter={true}
                isGlobalView={false}
                showCategoryCarousel={false} // No carousel inside specific sport page
            />
        </div>
    );
}
