"use client";

import { useMemo } from 'react';
import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';
import { PAGE_CATEGORIES } from '@/data/category-config';

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
                showBrandFilter={true}
                isGlobalView={true}
                showCategoryCarousel={true}
                customCategories={PAGE_CATEGORIES.FULL_CATALOG.map(cat => ({
                    ...cat,
                    image: allProducts.find(p =>
                        (p.category === cat.filterValue) ||
                        (p.tags && p.tags.includes(cat.filterValue)) ||
                        (cat.slug === 'sweatshirts' && p.category === 'Sweaters') || // fallback logic
                        (cat.slug === 'sets' && p.category === 'Trucksuits')
                    )?.image
                }))}
            />
        </div>
    );
}
