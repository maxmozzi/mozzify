import { Collection } from '@/lib/shopify/types';
import ProductCard from '../product/product-card';
import styles from './featured-collection.module.css';

export default function FeaturedCollection({ title, products }: { title: string, products: any[] }) {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.grid}>
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
