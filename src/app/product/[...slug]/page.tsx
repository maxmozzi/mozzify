import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ProductGallery from '@/components/product/product-gallery';
import ProductInfo from '@/components/product/product-info';
import SocialProofBanner from '@/components/product/social-proof-banner';
import CurrentProductRegister from '@/components/product/current-product-register';
import { products } from '@/data/generated-products';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // Only generate full metadata for canonical URL (length 1)
    if (slug.length === 1) {
        const handle = slug[0];
        const product = products.find(p => p.slug === handle || p.id === handle);

        if (product) {
            return {
                title: `${product.title} - Mozzify`,
                description: `Buy ${product.title} from ${product.brand}. Authentic quality.`,
                alternates: {
                    canonical: `/product/${product.slug}`,
                },
                openGraph: {
                    title: product.title,
                    description: `Buy ${product.title} from ${product.brand}.`,
                    images: [product.image.src],
                },
            };
        }
    }

    // For legacy URLs that will redirect, or not found parameters
    return {
        title: 'Mozzify',
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;

    // CASE 1: Canonical URL: /product/[handle]
    if (slug.length === 1) {
        const handle = slug[0];

        // Find product logic
        // 1. Try by slug (canonical)
        // 2. Fallback to ID (legacy/compat)
        const product = products.find(p => p.slug === handle) || products.find(p => p.id === handle);

        if (!product) {
            return notFound();
        }

        // Ensure we have a gallery logic
        const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

        return (
            <main className={styles.main}>
                {/* Register recent view history */}
                <CurrentProductRegister productId={product.id} />

                <div className={styles.container}>
                    <ProductGallery images={galleryImages} product={product} />

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

    // CASE 2: Legacy URL: /product/[category]/[slug]
    if (slug.length === 2) {
        const productHandle = slug[1];
        // Redirect to canonical
        redirect(`/product/${productHandle}`);
    }

    // CASE 3: Unknown structure
    return notFound();
}
