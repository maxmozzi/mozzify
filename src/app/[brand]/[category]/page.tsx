import { notFound } from 'next/navigation';
import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';
import { PAGE_CATEGORIES, CategoryConfig } from '@/data/category-config';

const BRAND_MAP: { [key: string]: string } = {
    'ami-paris': 'Ami Paris',
    'amiparis': 'Ami Paris',
    'amiri': 'Amiri',
    'arcteryx': "Arc'teryx",
    'balenciaga': 'Balenciaga',
    'bape': 'Bape',
    'burberry': 'Burberry',
    'calvinklein': 'Calvin Klein',
    'casablanca': 'Casablanca',
    'celine': 'Celine',
    'canada-goose': 'Canada Goose',
    'cgoose': 'Canada Goose',
    'dior': 'Dior',
    'di': 'Dior',
    'essentials': 'Essentials',
    'gucci': 'Gucci',
    'jacquemus': 'Jacquemus',
    'jordan': 'Jordan',
    'lacoste': 'Lacoste',
    'loewe': 'Loewe',
    'louis-vuitton': 'Louis Vuitton',
    'louisvuitton': 'Louis Vuitton',
    'miu-miu': 'Miu Miu',
    'miumiu': 'Miu Miu',
    'moncler': 'Moncler',
    'nike': 'Nike',
    'off-white': 'Off-White',
    'offwhite': 'Off-White',
    'palm-angels': 'Palm Angels',
    'palmangels': 'Palm Angels',
    'patagonia': 'Patagonia',
    'philip-plein': 'Philipp Plein',
    'philipplein': 'Philipp Plein',
    'polo-ralph-lauren': 'Polo Ralph Lauren',
    'poloralphlauren': 'Polo Ralph Lauren',
    'polo': 'Polo Ralph Lauren',
    'prada': 'Prada',
    'stone-island': 'Stone Island',
    'stoneisland': 'Stone Island',
    'stussy': 'Stussy',
    'the-north-face': 'The North Face',
    'thenorthface': 'The North Face',
    'trapstar': 'Trapstar',
    'trap': 'Trapstar',
};

// Helper to normalize strings for display
const normalizeText = (text: string): string => {
    if (!text) return '';
    const clean = text.toLowerCase().replace(/-/g, ' ');
    const slug = text.toLowerCase();

    if (BRAND_MAP[slug]) return BRAND_MAP[slug];

    // Fallback normalization
    const categoryMap: { [key: string]: string } = {
        'iphone_case': 'iPhone Case',
        'tshirt': 'T-Shirts',
        't-shirts': 'T-Shirts',
    };
    if (categoryMap[slug]) return categoryMap[slug];

    return clean.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default async function SmartCategoryPage({
    params
}: {
    params: Promise<{ brand: string; category: string }>
}) {
    const { brand: param1, category: param2 } = await params;
    const isParam2All = param2.toLowerCase() === 'all';
    const normalizedParam1 = normalizeText(param1);

    const isBrand = allProducts.some(p => normalizeText(p.brand || '').toLowerCase() === normalizedParam1.toLowerCase());
    const isCategory = allProducts.some(p => normalizeText(p.category || '').toLowerCase() === normalizedParam1.toLowerCase());

    let filteredProducts = [];
    let pageTitle = '';
    let initialBrand = '';
    let initialCategory = '';
    let showBrandFilter = false;
    let isGlobalCategoryView = false;
    let showCategoryCarousel = false;

    if (isParam2All) {
        if (isBrand) {
            // CASE: /amiri/all -> Brand All View
            filteredProducts = allProducts.filter(p =>
                normalizeText(p.brand || '').toLowerCase() === normalizedParam1.toLowerCase() && p.image
            );
            pageTitle = normalizedParam1;
            initialBrand = normalizedParam1;
            showBrandFilter = false;
            showCategoryCarousel = true;
        } else {
            // CASE: /hoodies/all -> Global Category View
            filteredProducts = allProducts.filter(p =>
                normalizeText(p.category || '').toLowerCase() === normalizedParam1.toLowerCase() && p.image
            );
            pageTitle = normalizedParam1;
            initialCategory = normalizedParam1;
            showBrandFilter = true;
            isGlobalCategoryView = true;
            showCategoryCarousel = true;
        }
    } else {
        if (isBrand) {
            // CASE: /amiri/hoodies -> Specific Brand + Category
            const targetBrand = normalizeText(param1);
            const targetCategory = normalizeText(param2);

            filteredProducts = allProducts.filter(p =>
                normalizeText(p.brand || '').toLowerCase() === targetBrand.toLowerCase() &&
                normalizeText(p.category || '').toLowerCase() === targetCategory.toLowerCase() &&
                p.image
            );

            pageTitle = targetBrand;
            initialBrand = targetBrand;
            initialCategory = targetCategory;
            showBrandFilter = false;
            showCategoryCarousel = true;
        } else {
            // CASE: /hoodies/amiri? (Unlikely with this structure, but handling just in case)
            const targetCategory = normalizeText(param1);
            const targetBrand = normalizeText(param2);

            filteredProducts = allProducts.filter(p =>
                normalizeText(p.brand || '').toLowerCase() === targetBrand.toLowerCase() &&
                normalizeText(p.category || '').toLowerCase() === targetCategory.toLowerCase() &&
                p.image
            );
            pageTitle = targetCategory;
            initialCategory = targetCategory;
            initialBrand = targetBrand;
            showBrandFilter = true;
        }
    }

    if (filteredProducts.length === 0) {
        if (!isBrand && !isCategory) return notFound();
    }

    const brandSource = isBrand ? allProducts.filter(p => normalizeText(p.brand || '').toLowerCase() === normalizedParam1.toLowerCase() && p.image) : allProducts;
    const availableCategories = Array.from(new Set(brandSource.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={filteredProducts}
                allProductsSource={brandSource}
                title={pageTitle}
                initialBrand={initialBrand}
                initialCategory={initialCategory}
                availableCategories={availableCategories}
                showBrandFilter={showBrandFilter}
                isGlobalView={isGlobalCategoryView}
                showCategoryCarousel={showCategoryCarousel}
                customCategories={PAGE_CATEGORIES.FULL_CATALOG.map((cat: CategoryConfig) => ({
                    ...cat,
                    image: brandSource.find(p => p.category === cat.filterValue)?.image ||
                        allProducts.find(p => p.category === cat.filterValue && p.image)?.image
                })).filter((cat: CategoryConfig) => {
                    if (cat.slug === 'all') return true;
                    return brandSource.some(p => p.category === cat.filterValue);
                })}
            />
        </div>
    );
}
