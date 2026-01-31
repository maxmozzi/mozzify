import ProductGallery from '@/components/product/product-gallery';
import ProductInfo from '@/components/product/product-info';
import SocialProofBanner from '@/components/product/social-proof-banner';
import CurrentProductRegister from '@/components/product/current-product-register';
import { products } from '@/data/generated-products';
import { notFound } from 'next/navigation';

import styles from './page.module.css';

interface PageProps {
    params: Promise<{
        category: string;
        product: string;
    }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { category, product: productId } = await params;

    // Find product matching product (id) and optionally category
    const product = products.find(p => p.id === productId);

    if (!product) {
        return notFound();
    }

    // The gallery property already contains the 750x930 versions.
    const galleryImages = product.gallery;

    return (
        <main className={styles.main}>
            <CurrentProductRegister productId={product.id} />
            <div className={styles.container}>
                <ProductGallery images={galleryImages} product={product} />
                <div style={{ marginBottom: '1rem' }}>

                </div>
                <ProductInfo
                    title={product.title}
                    price={product.price}
                    description={`Authentic ${product.brand} ${product.category}. Premium construction with signature details.`}
                />
            </div>

            <SocialProofBanner />
        </main>
    );
}
