import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/product-gallery';
import ProductInfo from '@/components/product/product-info';
import FeaturedCollection from '@/components/home/featured-collection';
import StickyCTA from '@/components/product/sticky-cta';
import { mockProducts } from '@/lib/shopify/mock-data';
import styles from './page.module.css';

interface PageProps {
    params: {
        handle: string;
    };
}

export default function ProductPage({ params }: PageProps) {
    const product = mockProducts.find(p => p.handle === params.handle);

    if (!product) {
        // In a real app we'd fetch or return notFound
        // For now, if handle doesn't match mock, default to first or 404
        // notFound();
        // Fallback for demo:
        return <ProductDetailContent product={mockProducts[0]} />;
    }

    return <ProductDetailContent product={product} />;
}

function ProductDetailContent({ product }: { product: any }) {
    // Filter out current product for recommendations
    const relatedProducts = mockProducts.filter(p => p.id !== product.id).slice(0, 4);

    return (
        <div className={styles.page}>
            <div className={`container ${styles.container}`}>
                <div className={styles.layout}>
                    <ProductGallery images={product.images.edges} />
                    <ProductInfo
                        title={product.title}
                        price={parseFloat(product.priceRange.minVariantPrice.amount)}
                        description={product.description || `Authentic ${product.vendor}. Premium construction with signature details.`}
                    />
                </div>
            </div>

            <FeaturedCollection title="You May Also Like" products={relatedProducts} />
            <StickyCTA
                title={product.title}
                price={product.priceRange.minVariantPrice.amount}
            />
        </div>
    );
}
