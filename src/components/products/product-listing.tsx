"use client";

import { useState, useMemo } from 'react';
import ProductGrid, { GridProduct } from '@/components/home/product-grid';
import FilterBar from './filter-bar';
import styles from './product-listing.module.css';

interface ProductListingProps {
    initialProducts: GridProduct[];
    title: string;
    initialBrand?: string;
    initialCategory?: string;
    availableCategories?: string[];
    initialFilteredProducts?: GridProduct[];
}

export default function ProductListing({ 
    initialProducts, 
    title,
    initialBrand,
    initialCategory,
    availableCategories = [],
    initialFilteredProducts
}: ProductListingProps) {
    // Initialize with initialBrand if provided
    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        initialBrand ? [initialBrand] : []
    );
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        initialCategory ? [initialCategory] : []
    );

    // Use initialProducts as the base for filtering (all products available)
    // initialFilteredProducts is only for initial display when category is specified
    // Once user interacts with filters, we use all products from initialProducts

    // Extract unique brands from all initial products (not just filtered ones)
    const brands = useMemo(() => {
        const uniqueBrands = new Set(initialProducts.map(p => p.brand).filter(Boolean) as string[]);
        return Array.from(uniqueBrands).sort();
    }, [initialProducts]);

    // Extract unique categories from all initial products
    const categories = useMemo(() => {
        const uniqueCategories = new Set(initialProducts.map(p => p.category).filter(Boolean) as string[]);
        return Array.from(uniqueCategories).sort();
    }, [initialProducts]);

    // Determine which products to use as base for filtering
    // If user has interacted with filters (changed from initial state), use all products
    // Otherwise, use initialFilteredProducts if provided
    const hasInteracted = useMemo(() => {
        const brandChanged = initialBrand ? !selectedBrands.includes(initialBrand) : selectedBrands.length > 0;
        const categoryChanged = initialCategory ? !selectedCategories.includes(initialCategory) : selectedCategories.length > 0;
        return brandChanged || categoryChanged;
    }, [selectedBrands, selectedCategories, initialBrand, initialCategory]);

    // Filter products
    const filteredProducts = useMemo(() => {
        // Use all products if user has interacted, otherwise use initial filtered products
        let base = hasInteracted ? initialProducts : (initialFilteredProducts || initialProducts);

        // Filter by brand
        if (selectedBrands.length > 0) {
            base = base.filter(p => p.brand && selectedBrands.includes(p.brand));
        }

        // Filter by category
        if (selectedCategories.length > 0) {
            base = base.filter(p => p.category && selectedCategories.includes(p.category));
        }

        return base;
    }, [initialProducts, initialFilteredProducts, selectedBrands, selectedCategories, hasInteracted]);

    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // Use availableCategories if provided, otherwise use categories from products
    const displayCategories = availableCategories.length > 0 ? availableCategories : categories;

    return (
        <div className={`container ${styles.listingContainer}`}>

            {/* New Horizontal Filter Bar */}
            <FilterBar
                brands={brands}
                selectedBrands={selectedBrands}
                onBrandChange={handleBrandChange}
                categories={displayCategories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
            />

            <div className={styles.mainContent}>

                {/* Result Count (Optional, maybe inside FilterBar or here) */}
                <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
                    {filteredProducts.length} Products Found
                </div>

                {/* Visual Grid: Image Only, Specific Ratio */}
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
                                setSelectedCategories([]);
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
