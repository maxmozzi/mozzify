"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import ProductGrid from '@/components/home/product-grid';
import { GridProduct } from '@/types/product';
// New Components
import CategoryHeader from '@/components/products/category-header';
import StickyFilterBar from '@/components/products/sticky-filter-bar';
import FilterDrawer from '@/components/products/filter-drawer';
import styles from './product-listing.module.css';
import { useGender } from '@/context/gender-context';

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
    showCategoryCarousel?: boolean;
}

export default function ProductListing({
    initialProducts,
    allProductsSource = [],
    title,
    initialBrand,
    initialCategory,
    availableCategories = [],
    showBrandFilter = false,
    isGlobalView = false,
    showCategoryCarousel = false
}: ProductListingProps) {
    const { gender } = useGender(); // New: Get active gender context

    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        initialBrand ? [initialBrand] : []
    );
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        initialCategory ? [initialCategory] : []
    );

    // New State for Layout
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentSort, setCurrentSort] = useState('Relevancy');

    // Determine the pool of products we are filtering against.
    const productPool = initialProducts;

    // Filter logic
    const filteredProducts = useMemo(() => {
        let result = productPool;

        // Gender Context Filter
        if (gender === 'men') {
            result = result.filter(p => p.gender === 'men' || p.gender === 'unisex');
        } else if (gender === 'women') {
            result = result.filter(p => p.gender === 'women' || p.gender === 'unisex');
        }

        // Brand Filter
        if (selectedBrands.length > 0) {
            result = result.filter(p => p.brand && selectedBrands.includes(p.brand));
        }

        // Category Filter
        if (selectedCategories.length > 0) {
            result = result.filter(p => p.category && selectedCategories.includes(p.category));
        }

        // Sorting Logic
        if (currentSort === 'Price: Low to High') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (currentSort === 'Price: High to Low') {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (currentSort === 'Newest') {
            // Assuming newer products are added later or have a date field?
            // For now, we don't have a date field, so we just reverse (assuming latest are last) or keep as is.
            result = [...result].reverse();
        }

        return result;
    }, [productPool, selectedBrands, selectedCategories, currentSort]);


    // Extract available brands dynamically
    const availableBrands = useMemo(() => {
        const brands = new Set(productPool.map(p => p.brand).filter(Boolean) as string[]);
        return Array.from(brands).sort();
    }, [productPool]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div style={{ position: 'relative' }}>

            {/* 1. Category Header (Replaces old Title) */}
            {/* We pass the filtered count or total count? Usually total. */}
            {showCategoryCarousel && (
                <CategoryHeader title={title} productCount={filteredProducts.length} />
            )}
            {!showCategoryCarousel && (
                <div className="container" style={{ marginBottom: '1.5rem', marginTop: '1rem', padding: '0 2rem' }}>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                        {filteredProducts.length} Products
                    </p>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        {title}
                    </h1>
                </div>
            )}

            {/* 2. Sticky Filter Bar */}
            <StickyFilterBar
                onFilterClick={() => setIsDrawerOpen(true)}
                currentSort={currentSort}
                onSortChange={setCurrentSort}
            />

            {/* 3. Product Grid */}
            <div className={styles.mainContent} style={{ padding: '2rem 0', minHeight: '600px' }}>
                <ProductGrid
                    title=""
                    products={filteredProducts}
                    variant="visual"
                    fullWidth={true}
                />

                {filteredProducts.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No products found matching your filters.</p>
                        <button
                            onClick={() => {
                                setSelectedBrands([]);
                                if (!initialCategory) setSelectedCategories([]);
                            }}
                            className={styles.resetBtn}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {/* 4. Filter Drawer */}
            <FilterDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                availableCategories={availableCategories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
            />
        </div>
    );
}
// Add new imports at top if not present, but replace_file handles the block.
// Wait, I need to make sure imports are there. I will use multi replace to ensure imports.
