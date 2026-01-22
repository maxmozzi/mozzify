"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './product-carousel.module.css';

// Mock Data for Visuals
const CAROUSEL_PRODUCTS = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    name: `PREMIUM ITEM ${i + 1}`,
    price: 129 + i * 10,
    label: i % 3 === 0 ? 'NEW' : (i % 2 === 0 ? 'BESTSELLER' : null),
    // Using placeholder images or reusing existing logic if we had distinct ones.
    // Ideally we pass real images. defaulting to a visual placeholder logic or reusing Hero image logic if needed?
    // User asked for "Images 600x750", I will use dummy colorful blocks or existing product images if I can import them easily.
    // Let's use a placeholder service or just simple colored divs if images are hard to get dynamically without props.
    // Actually, I should use the `generated-products` logic or just hardcode some for the task.
    // Let's assume we pass products in or use a static list from generated-products.
}));

// Quick import for demo visual - reusing one image for consistency or just distinct colors
// In a real scenario, we'd pass real product data. For this "Visual/UI" task:
import demoImg from '@/images/HomePage/HERO_DESK_RINOSEV.jpg'; // Just as a placeholder if specific not available, but user wants Marketplace look.
// Better: Use `products` from data and take first 10
import { products } from '@/data/generated-products';

export default function ProductCarousel({ title }: { title: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const displayProducts = products.slice(0, 10); // Take first 10

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 400; // Approx width of card
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className={`container ${styles.section}`}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.arrows}>
                    <button onClick={() => scroll('left')} className={styles.arrowBtn}><ChevronLeft /></button>
                    <button onClick={() => scroll('right')} className={styles.arrowBtn}><ChevronRight /></button>
                </div>
            </div>

            <div className={styles.carouselContainer} ref={scrollRef}>
                {displayProducts.map((product, idx) => (
                    <Link
                        href={`/${product.category.toLowerCase()}/${product.id}`}
                        key={product.id}
                        className={styles.card}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className={styles.productImage}
                                style={{ objectFit: 'cover' }}
                            />
                            {/* Visual Label */}
                            {(idx % 3 === 0) && <span className={styles.label}>NEW</span>}
                            {(idx % 3 !== 0 && idx % 2 === 0) && <span className={styles.label}>BESTSELLER</span>}
                        </div>
                        <div className={styles.info}>
                            <h3 className={styles.productName}>{product.title}</h3>
                            <span className={styles.productPrice}>{product.price}€</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
