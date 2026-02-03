'use client';

import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

export default function SportsPage() {
    // Filter for sports related categories if possible, or just a placeholder for "Sports"
    // Assuming "Activewear", "Gym", "Running", "Football" etc. are categories
    // But since data might be limited, we show all or filter if we knew the tags
    const sportsCategories = ['Gym', 'Running', 'Football', 'Activewear'];
    const sportsProducts = allProducts.filter(p => sportsCategories.includes(p.category) || p.tags?.some(t => sportsCategories.includes(t)));

    // Fallback to all if empty for demo
    const items = sportsProducts.length > 0 ? sportsProducts : allProducts;

    const availableCategories = Array.from(new Set(items.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={items}
                allProductsSource={allProducts}
                title="Sports"
                availableCategories={availableCategories}
                showBrandFilter={true}
                isGlobalView={true}
                showCategoryCarousel={true}
            />
        </div>
    );
}
