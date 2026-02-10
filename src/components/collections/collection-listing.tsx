
'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import ProductGrid from '@/components/home/product-grid';
import StickyFilterBar from '@/components/products/sticky-filter-bar';
import FilterDrawer from '@/components/products/filter-drawer';
import { GridProduct } from '@/types/product';

import { products } from '@/data/generated-products'; // Import global products for category images

import CategoryHeader from '@/components/products/category-header';

interface CollectionListingProps {
    initialProducts: GridProduct[];
    baseProducts: GridProduct[]; // Products available in this context (Collection + Gender)
    collectionTitle: string;
    gender: string;
    activeSubcategory?: string;
    collectionSlug?: string;
}

import { PAGE_CATEGORIES } from '@/data/category-config';

// Helper to find image for category
const findCategoryImage = (cat: any, products: GridProduct[]) => {
    // Strictly find a product that is principally of this category
    return products.find(p => p.category === cat.filterValue)?.image;
};



export default function CollectionListing({
    initialProducts,
    baseProducts,
    collectionTitle,
    gender,
    activeSubcategory,
    collectionSlug
}: CollectionListingProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentSort, setCurrentSort] = useState('Relevancy');
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [selectedSports, setSelectedSports] = useState<string[]>([]);
    const [isSaleSelected, setIsSaleSelected] = useState(false);

    // Filter CATEGORIES based on collection context
    const filteredCategories = useMemo(() => {
        if (collectionSlug === 'clothing') return PAGE_CATEGORIES.CLOTHING;
        if (collectionSlug === 'shoes') return PAGE_CATEGORIES.SHOES;
        if (collectionSlug === 'sports') return PAGE_CATEGORIES.SPORTS;
        // Default
        return PAGE_CATEGORIES.FULL_CATALOG;
    }, [collectionSlug]);

    // Mapped categories for the visual carousel
    const carouselCategories = useMemo(() => {
        return filteredCategories.map((cat) => ({
            ...cat,
            image: findCategoryImage(cat, products)
        }));
    }, [filteredCategories]);

    const handleSizeChange = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };



    const handleColorChange = (color: string) => {
        setSelectedColors(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    const handleSportChange = (sport: string) => {
        setSelectedSports(prev =>
            prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]
        );
    };

    const handleClearAll = () => {
        setSelectedSizes([]);
        setSelectedColors([]);
        setPriceRange({ min: 0, max: 1000 });
        setSelectedSports([]);
        setIsSaleSelected(false);
        handleCategoryChange('all');
    };

    const availableCategories = useMemo(() => {
        const cats = new Set(baseProducts.map(p => p.category).filter(Boolean));
        return Array.from(cats).sort();
    }, [baseProducts]);

    const handleCategoryChange = (categorySlug: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (categorySlug === 'all') {
            params.delete('collections');
        } else {
            params.set('collections', categorySlug);
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const sortedProducts = useMemo(() => {
        let result = [...initialProducts];

        // 1. Price Filter
        result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

        // 2. Tags Filter (Sports)
        if (selectedSports.length > 0) {
            result = result.filter(p =>
                p.tags && p.tags.some(t => selectedSports.includes(t.toLowerCase()))
            );
        }

        // 3. Sale Filter using tag or compareAtPrice
        if (isSaleSelected) {
            result = result.filter(p =>
                (p.tags && p.tags.includes('sale')) || (p.compareAtPrice && p.compareAtPrice > p.price)
            );
        }

        // 4. Sort
        if (currentSort === 'Price: Low to High') {
            result.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'Price: High to Low') {
            result.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'Newest') {
            result.reverse();
        }
        return result;
    }, [initialProducts, currentSort, priceRange, selectedSports, isSaleSelected]);

    return (
        <div>
            {/* Visual Category Header with Carousel */}
            <CategoryHeader
                title={collectionTitle}
                productCount={initialProducts.length}
                categories={carouselCategories}
                onCategoryClick={(slug) => handleCategoryChange(slug)}
            />


            <div style={{ padding: '1rem 34px 0', marginTop: '0.5rem' }}>
                <p style={{ fontSize: '16px', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    {gender} / {collectionTitle} {activeSubcategory ? ` / ${activeSubcategory.replace('_', ' ')}` : ''}
                </p>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '0.2rem', fontWeight: 'normal' }}>
                    {sortedProducts.length} Products
                </p>
            </div>


            {/* Sticky Filter Bar */}
            <StickyFilterBar
                onFilterClick={() => setIsDrawerOpen(true)}
                currentSort={currentSort}
                onSortChange={setCurrentSort}
            />

            {/* Product Grid */}
            <div style={{ paddingBottom: '4rem' }}>
                <ProductGrid
                    title=""
                    products={sortedProducts}
                    variant="visual"
                    fullWidth={true}
                />
            </div>

            {/* Filter Drawer */}
            <FilterDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                availableCategories={availableCategories}
                selectedCategories={activeSubcategory ? [availableCategories.find(c => c.toLowerCase().replace(/\s+/g, '_') === activeSubcategory) || ''] : []}
                onCategoryChange={(cat) => handleCategoryChange(cat.toLowerCase().replace(/\s+/g, '_'))}
                selectedSizes={selectedSizes}
                onSizeChange={handleSizeChange}
                selectedColors={selectedColors}
                onColorChange={handleColorChange}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedSports={selectedSports}
                onSportChange={handleSportChange}
                isSaleSelected={isSaleSelected}
                onSaleChange={setIsSaleSelected}
                onClearAll={handleClearAll}
                currentSort={currentSort}
                onSortChange={setCurrentSort}
            />
        </div>
    );
}
