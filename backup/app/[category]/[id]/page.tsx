import ProductGallery from '@/components/product/product-gallery';
import ProductInfo from '@/components/product/product-info';
import SocialProofBanner from '@/components/product/social-proof-banner';
import { products } from '@/data/generated-products';
import { notFound } from 'next/navigation';

import styles from './page.module.css';

interface PageProps {
    params: Promise<{
        category: string;
        id: string;
    }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { category, id } = await params;

    // Find product matching id and optionally category
    const product = products.find(p => p.id === id);

    if (!product) notFound();

    // The gallery property already contains the 750x930 versions.
    const galleryImages = product.gallery;

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <ProductGallery images={galleryImages} />
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
