"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Heart } from 'lucide-react';
import styles from './product-carousel.module.css';
import { useFavorites } from '@/context/favorites-context';
import { GridProduct } from '@/components/home/product-grid';

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
    // Filter for bestsellers products strictly
    const bestsellersProducts = products.filter(
        p => p.brand === 'Bestsellers' || p.category === 'Best Sellers'
    );
    // Fallback if no bestsellers found (shouldn't happen if folders exist)
    const displaySource = bestsellersProducts.length > 0 ? bestsellersProducts : products;

    const [displayProducts, setDisplayProducts] = useState(displaySource.slice(0, 20));

    useEffect(() => {
        // Shuffle on client side only to avoid hydration mismatch
        setDisplayProducts([...products].sort(() => 0.5 - Math.random()).slice(0, 20));
    }, []);
    const { addToFavorites, removeFromFavorites, checkIsFavorite } = useFavorites();

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

    const handleFavoriteClick = (e: React.MouseEvent, product: GridProduct) => {
        e.preventDefault();
        e.stopPropagation();

        const isFav = checkIsFavorite(product.id);
        if (isFav) {
            removeFromFavorites(product.id);
        } else {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            addToFavorites(product, rect);
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
                {displayProducts.map((product, idx) => {
                    const isFavorite = checkIsFavorite(product.id);
                    const productAsGrid: GridProduct = {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                        brand: product.brand
                    };

                    return (
                        <Link
                            href={`/product/${product.category.toLowerCase()}/${product.id}`}
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
                                {/* Heart Button */}
                                <button
                                    className={styles.wishlistBtn}
                                    onClick={(e) => handleFavoriteClick(e, productAsGrid)}
                                >
                                    <Heart
                                        size={18}
                                        fill={isFavorite ? "red" : "none"}
                                        color={isFavorite ? "red" : "black"}
                                    />
                                </button>
                            </div>
                            <div className={styles.info}>
                                {/* STATIC INFO */}
                                <div className={styles.staticInfo}>
                                    <div className={styles.productMain}>
                                        <h3 className={styles.productName}>AmiParis Zipper Blue</h3>
                                        <span className={styles.productPrice}>€108,40</span>
                                    </div>
                                    <div className={styles.colorOptions}>
                                        <span className={styles.colorCircle} style={{ backgroundColor: '#000000' }}></span>
                                        <span className={styles.colorCircle} style={{ backgroundColor: '#FFFFFF', border: '1px solid #eee' }}></span>
                                        <span className={styles.colorCircle} style={{ backgroundColor: '#1E40AF' }}></span>
                                        <span className={styles.colorCircle} style={{ backgroundColor: '#EF4444' }}></span>
                                        <span className={styles.colorCircle} style={{ backgroundColor: '#10B981' }}></span>
                                        <span className={styles.colorCircle} style={{ backgroundColor: '#F59E0B' }}></span>
                                        <span className={styles.colorCircle} style={{ backgroundColor: '#6B7280' }}></span>
                                    </div>
                                </div>

                                {/* HOVER INFO */}
                                <div className={styles.hoverInfo}>
                                    <button className={styles.addToCartBtn}>Add to Cart</button>
                                    <div className={styles.sizes}>
                                        <span>XS</span>
                                        <span>S</span>
                                        <span>M</span>
                                        <span>L</span>
                                        <span>XL</span>
                                        <span>XXL</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
