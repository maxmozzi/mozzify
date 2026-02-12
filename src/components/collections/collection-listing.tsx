
'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import ProductGrid from '@/components/home/product-grid';
import { ArrowLeft } from 'lucide-react';
import StickyFilterBar from '@/components/products/sticky-filter-bar';
import FilterDrawer from '@/components/products/filter-drawer';
import { GridProduct } from '@/types/product';

import { products } from '@/data/generated-products'; // Import global products for category images

import CategoryHeader from '@/components/products/category-header';

interface CollectionListingProps {
    initialProducts: GridProduct[];
    allProducts?: GridProduct[]; // Full pool for pagination
    baseProducts: GridProduct[]; // Products available in this context (Collection + Gender)
    collectionTitle: string;
    gender: string;
    activeSubcategory?: string; // This is the Sport (e.g. Football)
    activeCategory?: string; // This is the Category (e.g. Shoes)
    collectionSlug?: string;
    dynamicCategories?: any[]; // Dynamic categories for the nested carousel
}

import { PAGE_CATEGORIES } from '@/data/category-config';

// Helper to find image for category
const findCategoryImage = (cat: any, products: GridProduct[]) => {
    // Strictly find a product that is principally of this category
    return products.find(p => p.category === cat.filterValue)?.image;
};



export default function CollectionListing({
    initialProducts,
    allProducts,
    baseProducts,
    collectionTitle,
    gender,
    activeSubcategory,
    activeCategory,
    collectionSlug,
    dynamicCategories
}: CollectionListingProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(initialProducts.length); // Pagination state
    const [currentSort, setCurrentSort] = useState('Relevancy');
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [isSaleSelected, setIsSaleSelected] = useState(false);

    // Filter CATEGORIES based on collection context
    const filteredCategories = useMemo(() => {
        if (collectionSlug === 'clothing') return PAGE_CATEGORIES.CLOTHING;
        if (collectionSlug === 'shoes') return PAGE_CATEGORIES.SHOES;
        if (collectionSlug === 'sports') return PAGE_CATEGORIES.SPORTS;
        if (collectionSlug === 'accessories') return PAGE_CATEGORIES.ACCESSORIES;
        // Default
        return PAGE_CATEGORIES.FULL_CATALOG;
    }, [collectionSlug]);

    // Mapped categories for the visual carousel
    const carouselCategories = useMemo(() => {
        // If we have dynamic categories (from Sports), use them directly
        // Otherwise use the config-based filtered categories
        const sourceCats = dynamicCategories && dynamicCategories.length > 0 ? dynamicCategories : filteredCategories;

        return sourceCats.map((cat) => ({
            ...cat,
            image: cat.image || findCategoryImage(cat, products)
        }));
    }, [filteredCategories, dynamicCategories]);

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

    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handleClearAll = () => {
        setSelectedSizes([]);
        setSelectedColors([]);
        setSelectedBrands([]);
        setPriceRange({ min: 0, max: 1000 });
        setIsSaleSelected(false);
        handleCategoryChange('all');
    };

    const availableCategories = useMemo(() => {
        const cats = new Set(baseProducts.map(p => p.category).filter(Boolean));
        return Array.from(cats).sort();
    }, [baseProducts]);

    const availableBrands = useMemo(() => {
        const brandCounts: Record<string, number> = {};

        // Count products per brand from baseProducts (context-specific)
        baseProducts.forEach(p => {
            if (p.brand) {
                brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
            }
        });

        return Object.entries(brandCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    }, [baseProducts]);

    const handleCategoryChange = (categorySlug: string) => {
        const params = new URLSearchParams(searchParams.toString());

        // Logic: activeSubcategory (Sport) is controlled by 'collections' param (e.g. ?collections=football)
        // If we are in Sports AND have a sport selected, clicking a category should update 'category' param.

        if (collectionSlug === 'sports' && activeSubcategory) {
            // If clicking the SAME category (or 'all' in context of categories), maybe toggle or clear?
            // Assuming simpler logic: update 'category' param.
            // But wait, CategoryHeader usually passed 'all' or 'slug'.

            // Check if we are clicking a main sport or a sub-category?
            // CategoryHeader emits `slug`. 
            // If `slug` is one of the sports, we are switching sports.
            // If `slug` is a category (shoes), we are filtering.

            // How do we distinguish? 
            // Ideally we have two carousels. One for Sports, one for Categories underneath.
            // BUT user requirement: "Visualmente idéntica... Después de seleccionar un deporte... El carousel debe mostrar una subfila"

            // Let's assume CategoryHeader handles the clicking.
            // If we want to change SPORT, we change 'collections'.
            // If we want to change CATEGORY, we change 'category'.

            // This logic needs to be robust. 
            // If the clicked slug is a SPORT (football, basketball...), update 'collections', clear 'category'.
            // If the clicked slug is a CATEGORY, update 'category'.

            const isSport = ['football', 'basketball', 'running', 'gym'].includes(categorySlug);

            if (isSport) {
                params.set('collections', categorySlug);
                params.delete('category'); // Reset category when switching sport
            } else if (categorySlug === 'all') {
                // "View All" usually resets the current level.
                // If we have a category selected, 'all' clears it.
                // If only sport selected, 'all' might clear sport (go back to Sports main).
                if (activeCategory) {
                    params.delete('category');
                } else {
                    params.delete('collections');
                }
            } else {
                // It's a category (Shoes, Clothing...)
                params.set('category', categorySlug);
            }

        } else {
            // Default behavior for other collections
            if (categorySlug === 'all') {
                params.delete('collections');
            } else {
                params.set('collections', categorySlug);
            }
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const sortedProducts = useMemo(() => {
        let result = [...(allProducts || initialProducts)];

        // 1. Price Filter
        result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

        // 2. Sale Filter using tag or compareAtPrice
        if (isSaleSelected) {
            result = result.filter(p =>
                (p.tags && p.tags.includes('sale')) || (p.compareAtPrice && p.compareAtPrice > p.price)
            );
        }

        // 3. Brand Filter
        if (selectedBrands.length > 0) {
            result = result.filter(p => p.brand && selectedBrands.includes(p.brand));
        }

        return result;
    }, [initialProducts, allProducts, priceRange, isSaleSelected, selectedBrands]);

    return (
        <div>

            <CategoryHeader
                title={collectionTitle}
                productCount={initialProducts.length}
                categories={carouselCategories}
                onCategoryClick={(slug) => handleCategoryChange(slug)}
                activeCategory={activeCategory || activeSubcategory} // Highlight the active item
                subCategories={collectionSlug === 'sports' && activeSubcategory ? dynamicCategories : undefined} // Pass subcategories if sports & active
                onSubCategoryClick={(slug) => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (slug === 'all') params.delete('category');
                    else params.set('category', slug);
                    router.push(`${pathname}?${params.toString()}`, { scroll: false });
                }}
                activeSubCategory={activeCategory}
                backButton={
                    (collectionSlug === 'sports' && activeSubcategory) ? (
                        <button
                            onClick={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete('collections');
                                params.delete('category');
                                router.push(`${pathname}?${params.toString()}`);
                            }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                color: '#000',
                                background: '#f5f5f5',
                                border: '1px solid #e5e5e5',
                                borderRadius: '20px',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                        >
                            <ArrowLeft size={16} />
                            Back to Sports
                        </button>
                    ) : undefined
                }
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
                    products={sortedProducts.slice(0, visibleCount)}
                    variant="visual"
                    fullWidth={true}
                />

                {/* LOAD MORE BUTTON */}
                {visibleCount < sortedProducts.length && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                        <button
                            onClick={() => setVisibleCount(prev => prev + 30)}
                            style={{
                                padding: '12px 32px',
                                background: '#000',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            View More
                        </button>
                    </div>
                )}
            </div>

            {/* Filter Drawer */}
            <FilterDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                selectedSizes={selectedSizes}
                onSizeChange={handleSizeChange}
                selectedColors={selectedColors}
                onColorChange={handleColorChange}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                isSaleSelected={isSaleSelected}
                onSaleChange={setIsSaleSelected}
                onClearAll={handleClearAll}
                availableBrands={availableBrands}
                selectedBrands={selectedBrands}
                onBrandChange={handleBrandChange}
            />
        </div>
    );
}
