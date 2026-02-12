import { notFound } from 'next/navigation';
import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';
import { PAGE_CATEGORIES } from '@/data/category-config';

// Helper to normalize strings for display
const BRAND_MAP: { [key: string]: string } = {
    'ami-paris': 'Ami Paris',
    'amiparis': 'Ami Paris',
    'amiri': 'Amiri',
    'arcteryx': "Arcteryx",
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

export default async function BrandPage({
    params
}: {
    params: Promise<{ brand: string }>
}) {
    const { brand } = await params;
    const normalizedParam = normalizeText(brand);

    // 1. Filter products by Brand and ensure they have images
    const brandProducts = allProducts.filter(p => {
        const isBrandMatch = normalizeText(p.brand || '').toLowerCase() === normalizedParam.toLowerCase();
        // User requested: "Solo mostrar productos que tengan imágenes"
        const hasImage = p.image && typeof p.image === 'object'; // StaticImageData is an object
        return isBrandMatch && hasImage;
    });

    if (brandProducts.length === 0) {
        // Fallback: If no products found by Brand, try Category (legacy support)
        const categoryProducts = allProducts.filter(p =>
            normalizeText(p.category || '').toLowerCase() === normalizedParam.toLowerCase() && p.image
        );

        if (categoryProducts.length === 0) return notFound();

        // If it was a category, keep old behavior or redirect? 
        // For now, let's just render it as a global category view but with carousel
        return (
            <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
                <ProductListing
                    initialProducts={categoryProducts}
                    allProductsSource={categoryProducts}
                    title={normalizedParam}
                    initialCategory={normalizedParam}
                    showBrandFilter={true}
                    isGlobalView={true}
                    showCategoryCarousel={true}
                    customCategories={PAGE_CATEGORIES.FULL_CATALOG.map(cat => ({
                        ...cat,
                        image: allProducts.find(p => p.category === cat.filterValue && p.image)?.image
                    }))}
                />
            </div>
        );
    }

    // 2. Brand Page with Category Carousel
    const availableCategories = Array.from(new Set(brandProducts.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={brandProducts}
                allProductsSource={brandProducts}
                title={normalizedParam}
                initialBrand={normalizedParam}
                availableCategories={availableCategories}
                showBrandFilter={false} // Hidden as requested
                isGlobalView={false}
                showCategoryCarousel={true}
                customCategories={PAGE_CATEGORIES.FULL_CATALOG.map(cat => ({
                    ...cat,
                    // Dynamic image finding within THIS brand's products first, fallback to global
                    image: brandProducts.find(p => p.category === cat.filterValue)?.image ||
                        allProducts.find(p => p.category === cat.filterValue && p.image)?.image
                })).filter(cat => {
                    // Only show categories in the carousel if the brand actually has them
                    if (cat.slug === 'all') return true;
                    return brandProducts.some(p => p.category === cat.filterValue);
                })}
            />
        </div>
    );
}
