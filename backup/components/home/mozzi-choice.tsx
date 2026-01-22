import Link from 'next/link';
import Image from 'next/image';
import styles from './mozzi-choice.module.css';

export default function MozziChoice() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.imageWrapper}>
                    <Image
                        src="https://images.unsplash.com/photo-1543322748-33df6d3db806?q=80&w=2671&auto=format&fit=crop"
                        alt="Mozzi Choice Casual Flow"
                        fill
                        className={styles.image}
                    />
                    <div className={styles.overlay}>
                        <h2 className={styles.title}>Mozzi Choice</h2>
                        <p className={styles.subtitle}>Curated for the casual days.</p>
                        <Link href="/mozzi-choice" className={styles.cta}>Discover</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
