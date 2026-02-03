import Link from 'next/link';
import styles from './footer.module.css';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>

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
                            <li><Link href="/support">FAQ</Link></li>
                            <li><Link href="/support">Delivery Information</Link></li>
                            <li><Link href="/support">Returns Policy</Link></li>
                            <li><Link href="#">Make A Return</Link></li>
                            <li><Link href="#">Orders</Link></li>
                        </ul>
                    </div>

                    {/* MORE ABOUT MOZZIFY SECTION */}
                    <div className={styles.moreAboutSection}>
                        <h4 className={styles.heading}>MORE ABOUT MOZZIFY</h4>
                        <div className={styles.cardsRow}>

                            {/* Card 1: Blog */}
                            <div className={styles.cardWrapper}>
                                <div className={`${styles.card} ${styles.cardBlack}`}>
                                    <h3 style={{ margin: 0, fontFamily: 'Times New Roman', letterSpacing: '2px', fontSize: '1rem' }}>MOZZIFY</h3>
                                </div>
                                <span className={styles.cardLabel}>Blog</span>
                            </div>

                            {/* Card 2: Email */}
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <Mail size={20} strokeWidth={1.5} />
                                </div>
                                <span className={styles.cardLabel}>Email Sign Up</span>
                            </div>

                            {/* Card 3: Starter Pack */}
                            <div className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    <span className={styles.cardText} style={{ fontSize: '0.7rem' }}>
                                        MOZZIFY<br />STARTER PACK
                                    </span>
                                </div>
                                <span className={styles.cardLabel}>10% Discount</span>
                            </div>

                        </div>
                        <div className={styles.paymentMethods} style={{ marginTop: '2rem' }}>
                            <div className={styles.paymentIcon} title="Visa">VISA</div>
                            <div className={styles.paymentIcon} title="Mastercard">MC</div>
                            <div className={styles.paymentIcon} title="PayPal">PP</div>
                            <div className={styles.paymentIcon} title="Revolut Pay">REV</div>
                            <div className={styles.paymentIcon} title="Apple Pay">PAY</div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p>&copy; 2026 MOZZIFY.</p>
                    <ul className={styles.legalList}>
                        <li><Link href="#">Terms and Conditions</Link></li>
                        <li><Link href="#">Terms of Use</Link></li>
                        <li><Link href="#">Privacy Notice</Link></li>
                        <li><Link href="#">Cookie Policy</Link></li>
                        <li><Link href="#">Modern Slavery</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
