import Link from 'next/link';
import styles from './brand-story.module.css';

export default function BrandStory() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h2 className={styles.title}>The Art of Rebellion</h2>
                    <p className={styles.text}>
                        MOZZIFY wasn't born in a boardroom. It was forged in the underground scenes where street culture meets high fashion. We believe that what you wear is your loudest statement.
                    </p>
                    <p className={styles.text}>
                        Our collections are limited, precise, and unapologetic. Hand-selected fabrics, avant-garde cuts, and a commitment to detail that obsessively pushes boundaries.
                    </p>
                    <Link href="/pages/about" className={styles.link}>
                        Read Our Manifesto
                    </Link>
                </div>
                <div className={styles.imageWrapper}>
                    {/* Visual placeholder for brand imagery */}
                    <div className={styles.visualPlaceholder} />
                </div>
            </div>
        </section>
    );
}
