import styles from './announcement-bar.module.css';

export default function AnnouncementBar() {
    // Duplicate content enough times to ensure no gaps on large screens
    // We use 2 container sets to create the perfect loop
    return (
        <div className={styles.announcementBar}>
            <div className={styles.track}>
                <div className={styles.content}>
                    <span>Free Shipping on orders over 150€</span>
                    <span className={styles.separator}>•</span>
                    <a href="/help">Help & Contact</a>
                    <span className={styles.separator}>•</span>
                    <span>WorldWide Shipping</span>
                    <span className={styles.separator}>•</span>
                </div>
                {/* Clones for seamless loop */}
                <div className={styles.content}>
                    <span>Free Shipping on orders over 150€</span>
                    <span className={styles.separator}>•</span>
                    <a href="/help">Help & Contact</a>
                    <span className={styles.separator}>•</span>
                    <span>WorldWide Shipping</span>
                    <span className={styles.separator}>•</span>
                </div>
                <div className={styles.content}>
                    <span>Free Shipping on orders over 150€</span>
                    <span className={styles.separator}>•</span>
                    <a href="/help">Help & Contact</a>
                    <span className={styles.separator}>•</span>
                    <span>WorldWide Shipping</span>
                    <span className={styles.separator}>•</span>
                </div>
                <div className={styles.content}>
                    <span>Free Shipping on orders over 150€</span>
                    <span className={styles.separator}>•</span>
                    <a href="/help">Help & Contact</a>
                    <span className={styles.separator}>•</span>
                    <span>WorldWide Shipping</span>
                    <span className={styles.separator}>•</span>
                </div>
            </div>
        </div>
    );
}
