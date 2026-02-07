"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './hero-split.module.css';

// Using the same images as BestSellersSplit
import menBanner from '@/images/marketing/menpage/banner1.webp';
import womenBanner from '@/images/marketing/womenpage/banner1.jpg';

export default function HeroSplit() {
    return (
        <section className={styles.heroSection}>
            {/* MEN SIDE */}
            <Link href="/men" className={styles.splitLink}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={menBanner}
                        alt="Shop Men"
                        fill
                        className={styles.image}
                        priority
                    />
                </div>
                <div className={styles.overlay}>
                    <button className={styles.button}>
                        MEN
                    </button>
                </div>
            </Link>

            {/* WOMEN SIDE */}
            <Link href="/women" className={styles.splitLink}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={womenBanner}
                        alt="Shop Women"
                        fill
                        className={styles.image}
                        priority
                    />
                </div>
                <div className={styles.overlay}>
                    <button className={styles.button}>
                        WOMEN
                    </button>
                </div>
            </Link>
        </section>
    );
}
