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
    image: string | StaticImageData;
    category: string;
    handle?: string;
    slug?: string;
    brand?: string;
}

export default function ProductCard({ product }: { product: Product }) {
    const { image, title, price, category, id, brand } = product;
    const productUrl = `/product/${category.toLowerCase()}/${id}`;
    const { addToFavorites, removeFromFavorites, checkIsFavorite } = useFavorites();
    const isFavorite = checkIsFavorite(id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const productAsGrid: GridProduct = {
            id,
            title,
            price,
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
                {/* STATIC INFO */}
                <div className={styles.staticInfo}>
                    <div className={styles.productMain}>
                        <h3 className={styles.title}>
                            <Link href={productUrl}>AmiParis Zipper Blue</Link>
                        </h3>
                        <p className={styles.price}>€108,40</p>
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
        </div>
    );
}
