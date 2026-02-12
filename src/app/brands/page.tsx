'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRANDS, BRAND_ASSETS } from '@/data/generated-products';
import styles from './brands.module.css';

export default function BrandsPage() {
    // We want to show all brands, but maybe with a limited initial set for performance if requested.
    // However, the user asked for a completely new format "Grid", 4 per row.
    // I'll keep the view more functionality but adapted to the new grid style.
    const [visibleCount, setVisibleCount] = React.useState(32); // Show all 32 since they are grid-based now

    const brandData = useMemo(() => {
        return BRANDS.map(name => {
            const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
            const assetImage = BRAND_ASSETS[name];

            return {
                name,
                assetImage,
                slug
            };
        });
    }, []);

    const visibleBrands = brandData.slice(0, visibleCount);

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>BRANDS</h1>
            <p className={styles.subtitle}>
                Experience the world&apos;s most influential fashion houses through a curated editorial lens.
                A collection defined by luxury, innovation, and timeless style.
            </p>

            <div className={styles.grid}>
                {visibleBrands.map((brand, index) => {
                    if (!brand.assetImage) return null;

                    return (
                        <Link
                            key={brand.slug}
                            href={`/${brand.slug}`}
                            className={styles.brandCard}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={brand.assetImage}
                                    alt={brand.name}
                                    fill
                                    className={styles.brandImage}
                                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    placeholder="blur"
                                    priority={index < 8}
                                    loading={index < 8 ? "eager" : "lazy"}
                                />
                            </div>
                            <div className={styles.overlay}>
                                <h2 className={styles.brandName}>{brand.name}</h2>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {visibleCount < brandData.length && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }}>
                    <button
                        onClick={() => setVisibleCount(prev => Math.min(prev + 12, brandData.length))}
                        style={{
                            padding: '16px 64px',
                            background: '#000',
                            color: '#fff',
                            border: '1px solid #000',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#000';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#000';
                            e.currentTarget.style.color = '#fff';
                        }}
                    >
                        Explore More
                    </button>
                </div>
            )}
        </main>
    );
}
