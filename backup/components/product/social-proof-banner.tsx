import styles from './social-proof-banner.module.css';

export default function SocialProofBanner() {
    return (
        <div className={styles.banner}>
            <div className={`container ${styles.content}`}>
                <p className={styles.text}>
                    <strong>Lionel Messi, Ronaldo</strong> and 500K+ otros usuarios usando <strong>MOZZIFY</strong>
                </p>
                <button className={styles.btn}>ADD TO CART</button>
            </div>
        </div>
    );
}
