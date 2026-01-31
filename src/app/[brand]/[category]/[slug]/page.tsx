import ProductGallery from '@/components/product/product-gallery';
import ProductInfo from '@/components/product/product-info';
import SocialProofBanner from '@/components/product/social-proof-banner';
import CurrentProductRegister from '@/components/product/current-product-register';
import { products } from '@/data/generated-products';
import { notFound } from 'next/navigation';

import styles from '@/app/product/[category]/[product]/page.module.css'; // Reusing existing styles

interface PageProps {
    params: Promise<{
        brand: string;
        category: string;
        slug: string;
    }>;
}

export default async function BrandProductDetailPage({ params }: PageProps) {
    const { brand, category, slug } = await params;

    // Try finding by slug first (new system)
    let product = products.find(p => p.slug === slug);

    // Fallback: try finding by ID if slug fails (legacy compatibility if URLs used IDs)
    if (!product) {
        product = products.find(p => p.id === slug);
    }

    if (!product) {
        return notFound();
    }

    // The gallery property already contains the 750x930 versions.
    const galleryImages = product.gallery || [product.image];

    return (
        <main className={styles.main} style={{ paddingTop: '100px' }}>
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
