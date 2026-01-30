"use client";

import { useState, useMemo, useEffect } from 'react';
import ProductGrid, { GridProduct } from '@/components/home/product-grid';
import FilterBar from './filter-bar';
import styles from './product-listing.module.css';

interface ProductListingProps {
    initialProducts: GridProduct[]; // The products to initially display matching the server route
    allProductsSource?: GridProduct[]; // OPTIONAL: All products available in the system (for Global View filtering)
    title: string;
    initialBrand?: string;
    initialCategory?: string;
    availableCategories?: string[];
    initialFilteredProducts?: GridProduct[]; // (Deprecated in favor of smart logic, but kept for compat if needed)
    showBrandFilter?: boolean; // New prop to toggle brand filter visibility
    isGlobalView?: boolean; // New prop to indicating we are in /category/all
}

export default function ProductListing({
    initialProducts,
    allProductsSource = [],
    title,
    initialBrand,
    initialCategory,
    availableCategories = [],
    showBrandFilter = false,
    isGlobalView = false
}: ProductListingProps) {
    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        initialBrand ? [initialBrand] : []
    );
    // If we are in global view, we shouldn't lock the category filter, but effectively we are "in" that category.
    // However, the user might want to switch categories? The requirement says "The filter must affect only visible products".
    // For now, let's assume we stick to the current category in Global View.
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        initialCategory ? [initialCategory] : []
    );

    // Resolve the "Source of Truth" products data.
    // In Global View (/hoodies/all), we technically want to be able to filter ALL hoodies by brand.
    // 'initialProducts' passed from server are ALREADY filtered by category=Hoodies.
    // So 'initialProducts' is the correct pool for the Global View.

    // In Brand View (/amiri/hoodies), 'initialProducts' are ONLY Amiri Hoodies.
    // If the user wants to filter... well, they are already filtered.

    // Determine the pool of products we are filtering against.
    const productPool = initialProducts;

    // Filter logic
    const filteredProducts = useMemo(() => {
        let result = productPool;

        // Brand Filter
        if (selectedBrands.length > 0) {
            result = result.filter(p => p.brand && selectedBrands.includes(p.brand));
        }

        // Category Filter
        // If we are in Global View, productPool is likely ALREADY just that category.
        // But if we allow multi-category selection later, this logic stands.
        if (selectedCategories.length > 0) {
            result = result.filter(p => p.category && selectedCategories.includes(p.category));
        }

        return result;
    }, [productPool, selectedBrands, selectedCategories]);


    // Extract available brands dynamically from the CURRENT pool (or the initial full pool of this page)
    const availableBrands = useMemo(() => {
        const brands = new Set(productPool.map(p => p.brand).filter(Boolean) as string[]);
        return Array.from(brands).sort();
    }, [productPool]);

    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleCategoryChange = (category: string) => {
        // If we are in a strict category page, maybe navigate? 
        // For now, just client filter.
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div className={`container ${styles.listingContainer}`}>

            <div style={{ marginBottom: '2rem' }}>
                <h1 className="text-3xl font-bold uppercase mb-4">{title}</h1>

                {/* Horizontal Filter Bar */}
                {/* We pass only what we want to show. If showBrandFilter is true, we pass brands. */}
                <FilterBar
                    brands={showBrandFilter ? availableBrands : []}
                    selectedBrands={selectedBrands}
                    onBrandChange={handleBrandChange}
                    // If we are in a specific brand/category page, maybe we don't need category filters?
                    // The prompt implies we just want Brand filter on the /hoodies/all page.
                    // We can hide categories if we want, or keep them.
                    categories={availableCategories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                />
            </div>

            <div className={styles.mainContent}>
                <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
                    {filteredProducts.length} Products Found
                </div>

                <ProductGrid
                    title=""
                    products={filteredProducts}
                    variant="visual"
                />

                {filteredProducts.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No products found matching your filters.</p>
                        <button
                            onClick={() => {
                                setSelectedBrands([]);
                                // Don't reset category if it's the main page context
                                if (!initialCategory) setSelectedCategories([]);
                            }}
                            className={styles.resetBtn}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
