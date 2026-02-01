"use client";

import Image, { StaticImageData } from 'next/image';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/favorites-context';
import { GridProduct } from '@/types/product';
import styles from './product-gallery.module.css';

interface ProductGalleryProps {
    images: (string | StaticImageData)[];
    product: GridProduct;
}

export default function ProductGallery({ images, product }: ProductGalleryProps) {
    // If no images, use a placeholder
    const displayImages = images.length > 0 ? images : ['/placeholder.jpg'];
    const { addToFavorites, removeFromFavorites, checkIsFavorite } = useFavorites();
    const isFavorite = checkIsFavorite(product.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
            removeFromFavorites(product.id);
        } else {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            addToFavorites(product, rect);
        }
    };

    return (
        <div className={styles.gallery}>
            {displayImages.map((img, idx) => (
                <div key={idx} className={styles.imageWrapper}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={img}
                            alt={`Product View ${idx + 1}`}
                            fill
                            className={styles.mainImage}
                            priority={idx < 2} // Priority for the first row
                            quality={100}
                        />
                    </div>
                    {/* Add heart icon only to the first image */}
                    {idx === 0 && (
                        <button
                            className={styles.favoriteBtn}
                            onClick={handleFavoriteClick}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <Heart
                                size={24}
                                fill={isFavorite ? "red" : "white"}
                                color={isFavorite ? "red" : "black"}
                                strokeWidth={isFavorite ? 0 : 1.5}
                            />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
