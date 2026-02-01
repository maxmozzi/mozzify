"use client";

import { useMemo } from 'react';
import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

export default function BestsellersPage() {
    // Filter products from 'bestsellers' folder
    const bestsellers = useMemo(() => {
        return allProducts.filter(
            p => p.brand === 'Bestsellers' || p.category === 'Best Sellers'
        );
    }, []);

    const availableCategories = useMemo(() => {
        return Array.from(new Set(bestsellers.map(p => p.category))).sort();
    }, [bestsellers]);

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={bestsellers}
                allProductsSource={bestsellers}
                title="Best Sellers"
                availableCategories={availableCategories}
                showBrandFilter={false} // Since they are all 'bestsellers'
                isGlobalView={true}
            />
        </div>
    );
}
