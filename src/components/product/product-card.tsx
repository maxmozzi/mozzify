"use client";

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Heart } from 'lucide-react';
import styles from './product-card.module.css';
import { useFavorites } from '@/context/favorites-context';
import { GridProduct } from '@/components/home/product-grid';

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
                <h3 className={styles.title}>
                    <Link href={productUrl}>{title}</Link>
                </h3>
                <p className={styles.price}>
                    {price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'EUR'
                    })}
                </p>
            </div>
        </div>
    );
}
