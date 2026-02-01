"use client";

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import styles from './marketplace-hero.module.css';
import heroImg1 from '@/images/marketing/homepage/banner1.webp';
import heroImg2 from '@/images/marketing/homepage/banner2.webp';
import heroImg3 from '@/images/marketing/homepage/banner3.jpg';

const SLIDES = [heroImg1, heroImg2, heroImg3];

export default function MarketplaceHero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.heroSection}>
            {SLIDES.map((slide, index) => (
                <div
                    key={index}
                    className={`${styles.imageWrapper} ${index === currentSlide ? styles.active : ''}`}
                    style={{ opacity: index === currentSlide ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
                >
                    <Image
                        src={slide}
                        alt="Mozzify Collection"
                        fill
                        priority={index === 0}
                        className={styles.heroImage}
                        quality={90}
                    />
                    <div className={styles.overlay} />
                </div>
            ))}

            <div className={styles.contentContainer}>
                <h1 className={styles.heroTitle}>BEST SELLERS</h1>
                <p className={styles.heroSubtitle}>SHOP OUR MOST LOVED ITEMS</p>
                <Link href="/bestsellers" className={styles.ctaButton}>
                    SHOP NOW
                </Link>
            </div>
        </section>
    );
}
