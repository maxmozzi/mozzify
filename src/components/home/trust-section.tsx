import styles from './trust-section.module.css';

import Image from 'next/image';
import { products } from '@/data/generated-products'; // Borrowing images for factory placeholders
import WarehouseCarousel from './warehouse-carousel';
import warehouse1 from '@/images/products/warehouse/warehouse1.webp';
import warehouse2 from '@/images/products/warehouse/warehouse2.webp';

export default function TrustSection() {
    return (
        <section className={styles.section}>

            {/* Reviews Part */}


            {/* Factory / Storytelling Part */}
            <div className={styles.factoryGrid}>
                <div className={styles.factoryItem}>
                    <div className={styles.imageWrapper}>
                        <WarehouseCarousel images={[warehouse1.src, warehouse1.src]} />
                    </div>
                    <div className={styles.hoverOverlay} />
                    <div className={styles.textOverlay}>
                        <h4>ETHICAL PRODUCTION</h4>
                        <p>Crafted with care in Portugal</p>
                    </div>
                </div>
                <div className={styles.factoryItem}>
                    <div className={styles.imageWrapper}>
                        <WarehouseCarousel images={[warehouse2.src, warehouse2.src]} />
                    </div>
                    <div className={styles.hoverOverlay} />
                    <div className={styles.textOverlay}>
                        <h4>PREMIUM MATERIALS</h4>
                        <p>100% Organic Cotton Heavyweight</p>
                    </div>
                </div>
            </div>

        </section>
    );
}
