"use client";

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Heart } from 'lucide-react';
import styles from './product-card.module.css';
import { useFavorites } from '@/context/favorites-context';
import { GridProduct } from '@/types/product';

interface Product {
    id: string;
    title: string;
    price: number;
    compareAtPrice?: number;
    image: string | StaticImageData;
    category: string;
    handle?: string;
    slug?: string;
    brand?: string;
}

export default function ProductCard({ product }: { product: Product }) {
    const { image, title, price, compareAtPrice, category, id, brand } = product;
    const productUrl = `/product/${category.toLowerCase()}/${id}`;
    const { addToFavorites, removeFromFavorites, checkIsFavorite } = useFavorites();
    const isFavorite = checkIsFavorite(id);
    const isOnSale = compareAtPrice && compareAtPrice > price;

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const productAsGrid: GridProduct = {
            id,
            title,
            price,
            compareAtPrice,
            image,
            category,
            brand
        };

        const isFav = checkIsFavorite(id);
        if (isFav) {
            removeFromFavorites(id);
        } else {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            addToFavorites(productAsGrid, rect);
        }
    };

    return (
        <div className={styles.card}>
            <Link href={productUrl} className={styles.imageWrapper}>
                <Image
                    src={image}
                    alt={title}
                    fill
                    className={styles.image}
                    style={{ objectFit: 'cover' }}
                />
                <div className={styles.overlay}>
                    <span className={styles.quickView}>Quick View</span>
                </div>
                {isOnSale && (
                    <span className={styles.saleBadge}>SALE</span>
                )}
                <button
                    className={styles.wishlistBtn}
                    onClick={handleFavoriteClick}
                >
                    <Heart
                        size={18}
                        fill={isFavorite ? "red" : "none"}
                        color={isFavorite ? "red" : "black"}
                    />
                </button>
            </Link>
            <div className={styles.details}>
                {/* DYNAMIC INFO */}
                <div className={styles.staticInfo}>
                    <div className={styles.productMain}>
                        <h3 className={styles.title}>
                            <Link href={productUrl}>{title}</Link>
                        </h3>
                        <div className={styles.priceWrapper}>
                            <p className={styles.price}>€{price}</p>
                            {isOnSale && (
                                <p className={styles.comparePrice}>€{compareAtPrice}</p>
                            )}
                        </div>
                    </div>
                    {/* Colors removed since they are not in product data yet, or keep static if design requires */}
                </div>

                {/* HOVER INFO */}
                <div className={styles.hoverInfo}>
                    <button className={styles.addToCartBtn}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
