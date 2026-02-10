import Image from 'next/image';
import Link from 'next/link';
import styles from './top-categories.module.css';

// Using placeholders or existing images
const CATEGORIES = [
    { name: 'HOODIES', image: '/images/cat_hoodie.jpg' }, // Need placeholders? Using generated product images for now as backup
    { name: 'JACKETS', image: '' },
    { name: 'JOGGERS', image: '' },
    { name: 'ACCESSORIES', image: '' }
];

// Ideally use real images from `products` for realism
import { products } from '@/data/generated-products';

export default function TopCategories() {
    // Pick 4 distinct images from products to represent categories
    // Just mock picking for visual demo
    const catImages = [
        products[0]?.image || products[0]?.image,
        products[1]?.image || products[0]?.image,
        products[2]?.image || products[0]?.image,
        products[3]?.image || products[0]?.image,
    ];

    const LABELS = ['HOODIES', 'JACKETS', 'JOGGERS'];

    return (
        <section className={`container ${styles.section}`}>
            <h2 className={styles.sectionTitle}>SHOP OUR TOP CATEGORIES</h2>
            <div className={styles.grid}>
                {LABELS.map((label, idx) => {
                    const href = `/amiparis/${label.toLowerCase()}`;
                    return (
                        <Link href={href} key={label} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={catImages[idx]}
                                    alt={label}
                                    fill
                                    className={styles.image}
                                />
                                <div className={styles.overlay}>
                                    <span className={styles.label}>{label}</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
