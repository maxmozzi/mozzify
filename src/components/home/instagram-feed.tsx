import Image from 'next/image';
import { Instagram } from 'lucide-react';
import styles from './instagram-feed.module.css';
import { products } from '@/data/generated-products';

export default function InstagramFeed() {
    // Pick 6 images
    const images = products.slice(20, 26).map(p => p.image);

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>FOLLOW US @MOZZIFY</h2>
            <div className={styles.grid}>
                {images.map((img, idx) => (
                    <div key={idx} className={styles.item}>
                        <Image
                            src={img}
                            alt="Instagram Post"
                            fill
                            className={styles.image}
                        />
                        <div className={styles.overlay}>
                            <Instagram color="white" size={32} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
