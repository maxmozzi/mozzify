import Link from 'next/link';
import styles from './footer.module.css';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.grid}`}>

                {/* Brand Column */}
                <div className={styles.column}>
                    <h3 className={styles.logo}>MOZZIFY</h3>
                    <p className={styles.desc}>
                        Premium streetwear for the modern generation.
                        Designed in Europe, worn worldwide.
                    </p>
                    <div className={styles.socials}>
                        <Instagram size={20} />
                        <Twitter size={20} />
                        <Facebook size={20} />
                    </div>
                </div>

                {/* Links 1 */}
                <div className={styles.column}>
                    <h4 className={styles.heading}>SHOP</h4>
                    <ul className={styles.links}>
                        <li><Link href="/hoodies">Hoodies</Link></li>
                        <li><Link href="/new-arrivals">New Arrivals</Link></li>
                        <li><Link href="/sale">Sale</Link></li>
                        <li><Link href="/accessories">Accessories</Link></li>
                    </ul>
                </div>

                {/* Links 2 */}
                <div className={styles.column}>
                    <h4 className={styles.heading}>HELP</h4>
                    <ul className={styles.links}>
                        <li><Link href="#">Shipping & Returns</Link></li>
                        <li><Link href="#">Size Guide</Link></li>
                        <li><Link href="#">FAQ</Link></li>
                        <li><Link href="#">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className={styles.column}>
                    <h4 className={styles.heading}>STAY IN THE LOOP</h4>
                    <p className={styles.smallText}>Sign up for exclusive offers and drops.</p>
                    <form className={styles.form}>
                        <input type="email" placeholder="Enter your email" className={styles.input} />
                        <button type="submit" className={styles.submitBtn}>JOIN</button>
                    </form>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>&copy; 2026 MOZZIFY. All rights reserved.</p>
                <div className={styles.legal}>
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </div>
            </div>
        </footer>
    );
}
