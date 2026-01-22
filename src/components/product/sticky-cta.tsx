"use client";
import React, { useEffect, useState } from 'react';
import styles from './sticky-cta.module.css';

export default function StickyCTA({ title, price, showThreshold = 500 }: { title: string, price: string, showThreshold?: number }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > showThreshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showThreshold]);

    if (!isVisible) return null;

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <span className={styles.title}>{title}</span>
                <span className={styles.price}>{price}</span>
            </div>
            <button className={styles.button}>Add to Cart</button>
        </div>
    );
}
