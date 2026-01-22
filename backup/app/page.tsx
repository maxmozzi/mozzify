import MarketplaceHero from '@/components/home/marketplace-hero';
import ProductCarousel from '@/components/home/product-carousel';
import TopCategories from '@/components/home/top-categories';
import InstagramFeed from '@/components/home/instagram-feed';
import TrustSection from '@/components/home/trust-section';

export default function Home() {
  return (
    <main style={{ background: '#fff' }}>
      <MarketplaceHero />
      <ProductCarousel title="New Arrivals" />
      <TopCategories />
      <InstagramFeed />
      <TrustSection />
    </main>
  );
}
