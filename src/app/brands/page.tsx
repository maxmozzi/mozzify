'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/generated-products';
import styles from './brands.module.css';
import { ArrowRight } from 'lucide-react';

export default function BrandsPage() {
    const brandData = useMemo(() => {
        const brandsMap = new Map<string, { name: string, count: number, sampleImage: any, slug: string }>();

        products.forEach(p => {
            const rawBrand = p.brand || 'Other';

            // Normalize brand name for display
            let displayName = rawBrand;
            if (rawBrand.toLowerCase() === 'amiparis') displayName = 'Ami Paris';
            if (rawBrand.toLowerCase() === 'arcteryx') displayName = 'Arc\'teryx';
            if (rawBrand.toLowerCase() === 'calvinklein') displayName = 'Calvin Klein';
            if (rawBrand.toLowerCase() === 'casablanca') displayName = 'Casablanca';

            // Normalize slug
            const slug = rawBrand.toLowerCase();

            if (!brandsMap.has(slug)) {
                brandsMap.set(slug, {
                    name: displayName,
                    count: 1,
                    sampleImage: p.image,
                    slug: slug
                });
            } else {
                const existing = brandsMap.get(slug)!;
                existing.count += 1;
            }
        });

        return Array.from(brandsMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Our Brands</h1>
            <p className={styles.subtitle}>
                Discover the curators of modern luxury. From street-style icons to high-fashion houses,
                explore the complete collection from our world-class partners.
            </p>

            <div className={styles.grid}>
                {brandData.map((brand) => (
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
        </main>
    );
}
