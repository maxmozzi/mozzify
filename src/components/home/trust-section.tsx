import styles from './trust-section.module.css';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { products } from '@/data/generated-products'; // Borrowing images for factory placeholders

export default function TrustSection() {
    return (
        <section className={styles.section}>

            {/* Reviews Part */}
            <div className={`container ${styles.reviewsContainer}`}>
                <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="black" size={24} color="black" />)}
                </div>
                <h3 className={styles.heading}>"The quality of the hoodies is unmatched. Fits perfectly and feels premium."</h3>
                <p className={styles.author}>— Alex D. verified buyer</p>
                <div className={styles.trustpilot}>
                    <span>Excellent on</span> <strong>Trustpilot</strong>
                </div>
            </div>

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
