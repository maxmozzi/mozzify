"use client";

import { useState, useMemo } from 'react';
import ProductGrid, { GridProduct } from '@/components/home/product-grid';
import FilterBar from './filter-bar';
import styles from './product-listing.module.css';

interface ProductListingProps {
    initialProducts: GridProduct[];
    title: string;
}

export default function ProductListing({ initialProducts, title }: ProductListingProps) {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    // Extract unique brands from initial products
    const brands = useMemo(() => {
        const uniqueBrands = new Set(initialProducts.map(p => p.brand).filter(Boolean) as string[]);
        return Array.from(uniqueBrands).sort();
    }, [initialProducts]);

    // Filter products
    const filteredProducts = useMemo(() => {
        if (selectedBrands.length === 0) return initialProducts;
        return initialProducts.filter(p => p.brand && selectedBrands.includes(p.brand));
    }, [initialProducts, selectedBrands]);

    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    return (
        <div className={`container ${styles.listingContainer}`}>

            {/* New Horizontal Filter Bar */}
            <FilterBar
                brands={brands}
                selectedBrands={selectedBrands}
                onBrandChange={handleBrandChange}
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
                        <button onClick={() => setSelectedBrands([])} className={styles.resetBtn}>
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
