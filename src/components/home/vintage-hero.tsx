"use client";
import Link from 'next/link';
import Image from 'next/image';
import styles from './vintage-hero.module.css';

export default function VintageHero() {
    return (
        <div className={styles.heroContainer}>
            <Link href="/collections/clothing/unisex" className={styles.heroLink}>
                <div className={styles.imageWrapper}>
                    <div className={styles.vintageOverlay} />
                    <Image
                        src="https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=2070&auto=format&fit=crop"
                        alt="Vintage Polo Style"
                        fill
                        className={styles.heroImage}
                        priority
                    />
                    <div className={styles.heroContent}>
                        <h2 className={styles.subtext}>Most Wanted</h2>
                        <div className={styles.ctaButton}>Shop Now</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
