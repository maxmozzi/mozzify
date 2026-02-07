
import MarketplaceHero from '@/components/home/marketplace-hero';
import ProductCarousel from '@/components/home/product-carousel';
import CategoriesCarousel from '@/components/home/categories-carousel';
import { products as allProducts } from '@/data/generated-products';

// Women's Banners
import bannerImg1 from '@/images/marketing/womenpage/banner1.jpg';
import bannerImg2 from '@/images/marketing/womenpage/banner2.jpg';
import bannerImg3 from '@/images/marketing/womenpage/banner3.jpg';

import SetGender from '@/components/utils/set-gender';

// ... imports

const WOMEN_SLIDES = [bannerImg1, bannerImg2, bannerImg3];

export default function WomenPage() {
    // Filter products for Women: Gender 'women' or 'unisex'
    const womenProducts = allProducts.filter(p =>
        p.gender?.toLowerCase() === 'women' || p.gender?.toLowerCase() === 'unisex'
    );

    const availableCategories = Array.from(new Set(womenProducts.map(p => p.category))).sort();

    return (
        <main style={{ background: '#fff' }}>
            <SetGender gender="women" />
            <MarketplaceHero
                slides={WOMEN_SLIDES}
                title="WOMEN'S COLLECTION"
                subtitle="DISCOVER TIMELESS ELEGANCE"
                link="/collections/women"
            />
            <div style={{ paddingBottom: '2rem' }}>
                <ProductCarousel
                    title="BEST SELLERS FOR WOMEN"
                    products={womenProducts.slice(0, 15)}
                />
            </div>
            <CategoriesCarousel />
        </main>
    );
}
