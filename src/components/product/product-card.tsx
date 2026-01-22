import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import styles from './product-card.module.css';

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
    const { image, title, price, category, id } = product;
    const productUrl = `/${category.toLowerCase()}/${id}`;

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
