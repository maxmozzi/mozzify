"use client";

import { useFavorites } from '@/context/favorites-context';
import ProductGrid from '@/components/home/product-grid';
import Link from 'next/link';
import styles from './favorites.module.css';

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <main className={styles.favoritesPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>Your Favorites</h1>
                    <p className={styles.subtitle}>{favorites.length} items saved</p>
                </header>

                {favorites.length > 0 ? (
                    <ProductGrid title="" products={favorites} />
                ) : (
                    <div className={styles.emptyState}>
                        <p>You haven't added any favorites yet.</p>
                        <Link href="/all" className={styles.shopBtn}>
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
