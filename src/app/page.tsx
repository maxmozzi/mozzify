import HeroSplit from '@/components/home/hero-split';
import ProductCarousel from '@/components/home/product-carousel';
import CategoriesCarousel from '@/components/home/categories-carousel';
import ReviewsCarousel from '@/components/home/reviews-carousel';
import InstagramFeed from '@/components/home/instagram-feed';
import TrustSection from '@/components/home/trust-section';
import { products } from '@/data/generated-products';

export default function Home() {
  return (
    <main style={{ background: '#fff' }}>
      <HeroSplit />
      <ProductCarousel title="BEST SELLERS" />

      <CategoriesCarousel />
      <ReviewsCarousel />
      <InstagramFeed />
      <TrustSection />
    </main>
  );
}
