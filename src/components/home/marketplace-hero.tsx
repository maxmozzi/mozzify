import Image from 'next/image';
import Link from 'next/link';
import styles from './marketplace-hero.module.css';
import heroImg from '@/images/HomePage/HERO_DESK_RINOSEV.jpg';

export default function MarketplaceHero() {
    return (
        <section className={styles.heroSection}>
            <div className={styles.imageWrapper}>
                <Image
                    src={heroImg}
                    alt="Mozzify Collection"
                    fill
                    priority
                    className={styles.heroImage}
                    quality={90}
                />
                <div className={styles.overlay} />
            </div>

            <div className={styles.contentContainer}>
                <h1 className={styles.heroTitle}>NEW COLLECTION</h1>
                <p className={styles.heroSubtitle}>DISCOVER THE LATEST TRENDS</p>
                <Link href="/all" className={styles.ctaButton}>
                    SHOP ALL
                </Link>
            </div>
        </section>
    );
}
