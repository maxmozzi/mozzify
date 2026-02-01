"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import styles from './product-grid.module.css';
import { useFavorites } from '@/context/favorites-context';

// Minimal mock product for the grid
export interface GridProduct {
    id: string;
    title: string;
    price: number;
    image: string | any; // Supports both URL strings and StaticImageData
    hoverImage?: string | any;
    category: string;
    brand?: string;
    gallery?: string[] | any[];
    slug?: string;
}

interface ProductGridProps {
    title: string;
    products: GridProduct[];
    variant?: 'standard' | 'visual';
    fullWidth?: boolean;
}

export default function ProductGrid({ title, products, variant = 'standard', fullWidth = false }: ProductGridProps) {
    const isVisual = variant === 'visual';
    const { addToFavorites, removeFromFavorites, checkIsFavorite } = useFavorites();

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
        <section className={`${fullWidth ? styles.fullWidth : 'container'} ${styles.section}`}>
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}
            <div className={`${styles.grid} ${isVisual ? styles.visualGrid : ''}`}>
                {products.map((product, i) => {
                    const brandSlug = product.brand?.toLowerCase().replace(/\s+/g, '') || 'amiparis';
                    const productUrl = `/${brandSlug}/${product.category.toLowerCase()}/${product.id}`;
                    const isFavorite = checkIsFavorite(product.id);

                    return (
                        <Link href={productUrl} key={`${product.id}-${i}`} className={`${styles.productCard} ${isVisual ? styles.visualCard : ''}`}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className={styles.productImage}
                                    style={{ objectFit: 'cover' }} // Ensure cover
                                />
                                <button
                                    className={styles.wishlistBtn}
                                    onClick={(e) => handleFavoriteClick(e, product)}
                                >
                                    <Heart
                                        size={18}
                                        fill={isFavorite ? "red" : "none"}
                                        color={isFavorite ? "red" : "black"}
                                    />
                                </button>
                            </div>

                            <div className={styles.productInfo}>
                                {/* STATIC INFO */}
                                <div className={styles.staticInfo}>
                                    <div className={styles.productMain}>
                                        <h3 className={styles.productTitle}>AmiParis Zipper Blue</h3>
                                        <span className={styles.price}>€108,40</span>
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

            <div className={styles.viewAllWrapper}>
                <Link href="/all" className={styles.viewAllBtn}>View All</Link>
            </div>
        </section>
    );
}
