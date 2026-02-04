
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

// Fixed categories to match "as before"
const CATEGORIES = [
    { name: 'View All', slug: 'all', isViewAll: true },
    { name: 'Hoodies', slug: 'hoodies' },
    { name: 'T-Shirts', slug: 'tshirt' },
    { name: 'Polo', slug: 'polo' },
    { name: 'Shorts', slug: 'shorts' },
    { name: 'Jeans', slug: 'jeans' },
    { name: 'Sweater', slug: 'sweater' },
    { name: 'Sweatshirt', slug: 'sweatshirt' },
    { name: 'Jacket', slug: 'jacket' },
    { name: 'Sets', slug: 'sets' },
    { name: 'Shoes', slug: 'shoes' },
    { name: 'Iphone Case', slug: 'iphone_case' },
];

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

    // Filter CATEGORIES based on collection context
    const filteredCategories = useMemo(() => {
        if (collectionSlug === 'clothing') {
            return CATEGORIES.filter(cat =>
                cat.slug !== 'shoes' && cat.slug !== 'iphone_case'
            );
        }
        return CATEGORIES;
    }, [collectionSlug]);

    // Mapped categories for the visual carousel (using global products for consistent images)
    const carouselCategories = useMemo(() => {
        return filteredCategories.map(cat => {
            if (cat.isViewAll) return cat;

            // Find a product globally that matches this category name loosely
            const sampleProduct = products.find(p =>
                p.category?.toLowerCase().replace(/[\s-]/g, '') === cat.slug.replace(/_/g, '') ||
                p.category?.toLowerCase().replace(/[\s-]/g, '') === cat.name.toLowerCase().replace(/[\s-]/g, '')
            );

            return {
                ...cat,
                image: sampleProduct?.image
            };
        });
    }, []); // No dependencies needed as 'products' is static


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
        if (currentSort === 'Price: Low to High') {
            result.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'Price: High to Low') {
            result.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'Newest') {
            result.reverse();
        }
        return result;
    }, [initialProducts, currentSort]);

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
                    {initialProducts.length} Products
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
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                availableCategories={availableCategories}
                selectedCategories={activeSubcategory ? [availableCategories.find(c => c.toLowerCase().replace(/\s+/g, '_') === activeSubcategory) || ''] : []}
                onCategoryChange={(cat) => handleCategoryChange(cat.toLowerCase().replace(/\s+/g, '_'))}
            />
        </div>
    );
}
