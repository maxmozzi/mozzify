"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './hero.module.css';
import { useScrollPosition } from '@/lib/hooks/use-scroll-position';
import { useTransition } from '@/components/layout/transition-manager';

export default function Hero({ title = "BEST SELLERS" }: { title?: string }) {
    const scrollPos = useScrollPosition();
    const { startTransition } = useTransition();
    const router = useRouter();

    // Logo transition logic
    const threshold = 300;
    const progress = Math.min(scrollPos / threshold, 1);

    const scale = 3 - (progress * 2);

    const handleShopNow = (e: React.MouseEvent) => {
        e.preventDefault();
        startTransition();
        setTimeout(() => {
            router.push('/collections/all');
        }, 1500);
    };

    return (
        <section className={styles.hero} onClick={handleShopNow} style={{ cursor: 'pointer' }}>
            <div className={`container ${styles.content}`}>
                <h1 className={styles.floatingLogo} style={{
                    transform: `scale(${scale})`,
                    opacity: progress > 0.8 ? 0 : 1,
                    visibility: progress > 0.9 ? 'hidden' : 'visible',
                    top: `${40 - (progress * 35)}vh`, // Moves up towards navbar
                }}>
                    MOZZIFY
                </h1>

                <div className={styles.heroText} style={{ opacity: 1 - progress }}>
                    <h2 className={styles.tagline}>{title}</h2>
                    <button className={styles.primaryBtn}>
                        Shop Now
                    </button>
                </div>
            </div>
            <div className={styles.overlay}></div>
        </section>
    );
}
