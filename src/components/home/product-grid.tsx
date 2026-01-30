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
    category: string;
    brand?: string;
}

interface ProductGridProps {
    title: string;
    products: GridProduct[];
    variant?: 'standard' | 'visual';
}

export default function ProductGrid({ title, products, variant = 'standard' }: ProductGridProps) {
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
        <section className={`container ${styles.section}`}>
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

                            {!isVisual && (
                                <div className={styles.productInfo}>
                                    {product.brand && <span className={styles.brand}>{product.brand}</span>}
                                    <h3 className={styles.productTitle}>{product.title}</h3>
                                    <span className={styles.price}>{product.price.toFixed(2)}€</span>
                                </div>
                            )}
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
