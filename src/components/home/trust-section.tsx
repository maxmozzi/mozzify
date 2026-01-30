import styles from './trust-section.module.css';

import Image from 'next/image';
import { products } from '@/data/generated-products'; // Borrowing images for factory placeholders

export default function TrustSection() {
    return (
        <section className={styles.section}>

            {/* Reviews Part */}


            {/* Factory / Storytelling Part */}
            <div className={styles.factoryGrid}>
                <div className={styles.factoryItem}>
                    <div className={styles.imageWrapper}>
                        {/* Placeholder image for factory */}
                        <Image src={products[2]?.image || products[0]?.image || products[0].image} alt="Production" fill className={styles.factoryImg} />
                    </div>
                    <div className={styles.textOverlay}>
                        <h4>ETHICAL PRODUCTION</h4>
                        <p>Crafted with care in Portugal</p>
                    </div>
                </div>
                <div className={styles.factoryItem}>
                    <div className={styles.imageWrapper}>
                        <Image src={products[3]?.image || products[1]?.image || products[0].image} alt="Quality" fill className={styles.factoryImg} />
                    </div>
                    <div className={styles.textOverlay}>
                        <h4>PREMIUM MATERIALS</h4>
                        <p>100% Organic Cotton Heavyweight</p>
                    </div>
                </div>
            </div>

        </section>
    );
}
