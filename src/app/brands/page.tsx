'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products, BRANDS, BRAND_SAMPLE_IMAGES } from '@/data/generated-products';
import styles from './brands.module.css';
import { ArrowRight } from 'lucide-react';

export default function BrandsPage() {
    const [visibleCount, setVisibleCount] = React.useState(30);

    const brandData = useMemo(() => {
        const brandsWithProducts = new Map<string, number>();
        products.forEach(p => {
            const b = p.brand;
            brandsWithProducts.set(b, (brandsWithProducts.get(b) || 0) + 1);
        });

        // Get a generic fallback image from any existing product if possible
        const fallbackImage = products[0]?.image;

        return BRANDS.map(name => {
            const slug = name.toLowerCase().replace(/_/g, '-');
            const count = brandsWithProducts.get(name) || 0;
            const sampleImage = BRAND_SAMPLE_IMAGES[name] || fallbackImage;

            return {
                name,
                count,
                sampleImage,
                slug
            };
        });
    }, []);

    const visibleBrands = brandData.slice(0, visibleCount);

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Our Brands</h1>
            <p className={styles.subtitle}>
                Discover the curators of modern luxury. From street-style icons to high-fashion houses,
                explore the complete collection from our world-class partners.
            </p>

            <div className={styles.grid}>
                {visibleBrands.map((brand) => (
                    <Link key={brand.slug} href={`/${brand.slug}`} className={styles.brandCard}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={brand.sampleImage}
                                alt={brand.name}
                                fill
                                className={styles.brandImage}
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                        </div>
                        <div className={styles.brandInfo}>
                            <div>
                                <h2 className={styles.brandName}>{brand.name}</h2>
                                <span className={styles.productCount}>{brand.count} Products</span>
                            </div>
                            <ArrowRight size={20} className={styles.arrow} />
                        </div>
                    </Link>
                ))}
            </div>

            {visibleCount < brandData.length && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                    <button
                        onClick={() => setVisibleCount(prev => prev + 30)}
                        style={{
                            padding: '12px 48px',
                            background: '#000',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000'}
                    >
                        View More
                    </button>
                </div>
            )}
        </main>
    );
}
