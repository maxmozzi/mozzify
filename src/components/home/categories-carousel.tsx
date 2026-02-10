"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowDown, ArrowRight } from 'lucide-react';
import styles from './categories-carousel.module.css';
import { products } from '@/data/generated-products';

// Mock Categories with distinct placeholders if actual images repeat
// Ensuring we have enough items to scroll (8 items for 2 pages of 4)
const CATEGORIES = [
    { name: 'HOODIES', slug: 'hoodies', image: products.find(p => p.category === 'Hoodies')?.image },
    { name: 'T-SHIRTS', slug: 't-shirts', image: products.find(p => p.category === 'T-Shirts')?.image },
    { name: 'JEANS', slug: 'jeans', image: products.find(p => p.category === 'Jeans')?.image },
    { name: 'JACKETS', slug: 'jackets', image: products.find(p => p.category === 'Jackets')?.image },
    { name: 'SWEATS', slug: 'sweatshirts', image: products.find(p => p.category === 'Sweatshirts')?.image },
    { name: 'SETS', slug: 'sets', image: products.find(p => p.category === 'Sets')?.image },
];

export default function CategoriesCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            // Scroll by container width (visible area)
            const scrollAmount = current.clientWidth;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section
            className={styles.section}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className={`container ${styles.header}`}>
                <h2 className={styles.title}>CATEGORIES</h2>
                <Link href="/all" className={styles.viewAllLink}>
                    View All <ArrowRight size={20} />
                </Link>
            </div>

            <div className={styles.carouselWrapper}>
                {isHovering && (
                    <>
                        <button onClick={() => scroll('left')} className={`${styles.arrowBtn} ${styles.prevArrow}`}>
                            <ChevronLeft size={32} />
                        </button>
                        <button onClick={() => scroll('right')} className={`${styles.arrowBtn} ${styles.nextArrow}`}>
                            <ChevronRight size={32} />
                        </button>
                    </>
                )}

                <div className={styles.carouselContainer} ref={scrollRef}>
                    {CATEGORIES.map((cat, idx) => {
                        const displayImg = cat.image || '/placeholder.jpg';

                        return (
                            <Link
                                href={`/collections/clothing/unisex/${cat.slug}`}
                                key={`${cat.name}-${idx}`}
                                className={styles.card}
                            >
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={displayImg}
                                        alt={cat.name}
                                        fill
                                        className={styles.image}
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className={styles.overlay} />
                                    <div className={styles.labelContainer}>
                                        <span className={styles.label}>{cat.name}</span>
                                        <ArrowDown className={styles.downArrow} size={24} />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
