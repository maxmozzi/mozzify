"use client";

import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/favorites-context';
import type { GridProduct } from '@/components/home/product-grid';
import styles from './product-page-favorite.module.css';

interface ProductPageFavoriteProps {
    product: GridProduct;
}

export default function ProductPageFavorite({ product }: ProductPageFavoriteProps) {
    const { addToFavorites, removeFromFavorites, checkIsFavorite } = useFavorites();
    const isFavorite = checkIsFavorite(product.id);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isFavorite) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product); // no rect = no flying animation
        }
    };

    return (
        <button
            type="button"
            className={styles.favoriteBtn}
            onClick={handleClick}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
            <Heart
                size={22}
                fill={isFavorite ? 'red' : 'none'}
                color={isFavorite ? 'red' : 'black'}
            />
            <span className={styles.label}>
                {isFavorite ? 'En favoritos' : 'Añadir a favoritos'}
            </span>
        </button>
    );
}
