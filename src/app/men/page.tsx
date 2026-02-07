
import MarketplaceHero from '@/components/home/marketplace-hero';
import ProductCarousel from '@/components/home/product-carousel';
import CategoriesCarousel from '@/components/home/categories-carousel';
import { products as allProducts } from '@/data/generated-products';

// Men's Banners
import bannerImg1 from '@/images/marketing/menpage/banner1.webp';
import bannerImg2 from '@/images/marketing/menpage/banner2.webp';
import bannerImg3 from '@/images/marketing/menpage/banner3.jpg';

const MEN_SLIDES = [bannerImg1, bannerImg2, bannerImg3];

export default function MenPage() {
    // Filter products for Men: Gender 'men' or 'unisex'
    const menProducts = allProducts.filter(p =>
        p.gender?.toLowerCase() === 'men' || p.gender?.toLowerCase() === 'unisex'
    );

    const availableCategories = Array.from(new Set(menProducts.map(p => p.category))).sort();

    return (
        <main style={{ background: '#fff' }}>
            <MarketplaceHero
                slides={MEN_SLIDES}
                title="MEN'S COLLECTION"
                subtitle="ELEVATE YOUR STYLE"
                link="/collections/men"
            />
            <div style={{ paddingBottom: '2rem' }}>
                <ProductCarousel
                    title="BEST SELLERS FOR MEN"
                    products={menProducts.slice(0, 15)}
                />
            </div>
            <CategoriesCarousel />
        </main>
    );
}
