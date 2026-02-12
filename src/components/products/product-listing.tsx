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
    customCategories?: { name: string; slug: string; image?: any; isViewAll?: boolean; filterValue?: string }[]; // New prop for custom carousel items
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
    showCategoryCarousel = false,
    customCategories
}: ProductListingProps) {
    const { gender } = useGender(); // New: Get active gender context

    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        initialBrand ? [initialBrand] : []
    );
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        initialCategory ? [initialCategory] : []
    );
    // New Filter States
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });

    // New State for Layout
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentSort, setCurrentSort] = useState('Relevancy');

    const [isSaleSelected, setIsSaleSelected] = useState(false);

    // Simulate/Enrich Data with missing fields (Size/Color)
    const enrichedProducts = useMemo(() => {
        return initialProducts.map(p => ({
            ...p,
            // Assign random traits if missing, for demo purposes
            sizes: p.sizes || ['XS', 'S', 'M', 'L', 'XL'].filter(() => Math.random() > 0.5),
            colors: p.colors || ['black', 'white', 'blue', 'beige'].filter(() => Math.random() > 0.7)
        }));
    }, [initialProducts]);

    // Determine the pool of products we are filtering against.
    const productPool = enrichedProducts;

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
            result = result.filter(p => {
                // Check Category (Strict or Case-Insensitive)
                const categoryMatch = p.category && selectedCategories.some(sc => sc.toLowerCase() === p.category.toLowerCase());

                // Check Tags (Case-Insensitive)
                const tagMatch = p.tags && p.tags.some(tag =>
                    selectedCategories.some(sc => sc.toLowerCase() === tag.toLowerCase())
                );

                return categoryMatch || tagMatch;
            });
        }

        // Size Filter (OR logic within sizes) - Check if product has ANY of the selected sizes
        if (selectedSizes.length > 0) {
            result = result.filter(p => p.sizes && p.sizes.some(s => selectedSizes.includes(s)));
        }

        // Color Filter (OR logic within colors)
        if (selectedColors.length > 0) {
            result = result.filter(p => p.colors && p.colors.some(c => selectedColors.includes(c)));
        }

        // Sale Filter
        if (isSaleSelected) {
            result = result.filter(p => p.tags && p.tags.map(t => t.toLowerCase()).includes('sale'));
        }

        // Price Filter
        result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

        // Sorting Logic (This sorting happens AFTER filtering)
        if (currentSort === 'Price: Low to High') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (currentSort === 'Price: High to Low') {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (currentSort === 'Newest') {
            result = [...result].reverse();
        }

        // Limit to 10 if specific categories are selected
        if (selectedCategories.length > 0) {
            result = result.slice(0, 10);
        }

        return result;
    }, [productPool, selectedBrands, selectedCategories, selectedSizes, selectedColors, priceRange, currentSort, gender, isSaleSelected]);

    // Clear All Handler
    const handleClearAll = () => {
        setSelectedBrands([]);
        if (!initialCategory) setSelectedCategories([]);
        setSelectedSizes([]);
        setSelectedColors([]);
        setPriceRange({ min: 0, max: 1000 });
        setCurrentSort('Relevancy');
        setIsSaleSelected(false);
    };


    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    // Extract available brands dynamically with counts
    // We should show counts for products that match OTHER filters (gender, category, etc.)
    const availableBrands = useMemo(() => {
        // Base results matching context filters (like gender) but NOT brand filter
        let contextPool = productPool;
        if (gender === 'men') {
            contextPool = contextPool.filter(p => p.gender === 'men' || p.gender === 'unisex');
        } else if (gender === 'women') {
            contextPool = contextPool.filter(p => p.gender === 'women' || p.gender === 'unisex');
        }

        const counts: Record<string, number> = {};
        contextPool.forEach(p => {
            if (p.brand) {
                counts[p.brand] = (counts[p.brand] || 0) + 1;
            }
        });

        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [productPool, gender]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleCarouselClick = (value: string) => {
        if (value === 'all' || value === 'View All') {
            if (initialCategory) {
                // If we are on a page that is strictly one category (unlikely here if using carousel for sub-filter), 
                // we might want to reset to initial. But here 'all' usually means clear sub-filters.
                setSelectedCategories([initialCategory]);
            } else {
                setSelectedCategories([]);
            }
        } else {
            setSelectedCategories([value]);
        }
    };

    return (
        <div style={{ position: 'relative' }}>

            {/* 1. Category Header (Replaces old Title) */}
            {/* We pass the filtered count or total count? Usually total. */}
            {showCategoryCarousel && (
                <CategoryHeader
                    title={title}
                    productCount={filteredProducts.length}
                    categories={customCategories}
                    onCategoryClick={handleCarouselClick}
                />
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
                // Sort removed from drawer, but we might still pass it if needed, or removing it from Drawer props entirely.
                // The plan says remove sort from drawer.
                // We pass current values for display/logic if needed, but mainly we pass the new filters.
                availableCategories={availableCategories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                // New Props
                selectedSizes={selectedSizes}
                onSizeChange={(size) => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                selectedColors={selectedColors}
                onColorChange={(color) => setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color])}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                onClearAll={handleClearAll}
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                selectedSports={selectedCategories} // Reusing category selection for sports tags
                onSportChange={handleCategoryChange}
                isSaleSelected={isSaleSelected}
                onSaleChange={setIsSaleSelected}
                // Brand Filtering
                availableBrands={availableBrands}
                selectedBrands={selectedBrands}
                onBrandChange={handleBrandChange}
            />
        </div>
    );
}
// Add new imports at top if not present, but replace_file handles the block.
// Wait, I need to make sure imports are there. I will use multi replace to ensure imports.
