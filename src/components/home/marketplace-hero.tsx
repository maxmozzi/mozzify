"use client";

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import styles from './marketplace-hero.module.css';
import heroImg1 from '@/images/marketing/homepage/banner1.webp';
import heroImg2 from '@/images/marketing/homepage/banner2.webp';
import heroImg3 from '@/images/marketing/homepage/banner3.jpg';

const DEFAULT_SLIDES = [heroImg1, heroImg2, heroImg3];

interface MarketplaceHeroProps {
    slides?: StaticImageData[];
    title?: string;
    subtitle?: string;
    link?: string;
    linkText?: string;
}

export default function MarketplaceHero({
    slides = DEFAULT_SLIDES,
    title = "BEST SELLERS",
    subtitle = "SHOP OUR MOST LOVED ITEMS",
    link = "/bestsellers",
    linkText = "SHOP NOW"
}: MarketplaceHeroProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section className={styles.heroSection}>
            {slides.map((slide, index) => (
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
                <h1 className={styles.heroTitle}>{title}</h1>
                <p className={styles.heroSubtitle}>{subtitle}</p>
                <Link href={link} className={styles.ctaButton}>
                    {linkText}
                </Link>
            </div>
        </section>
    );
}
