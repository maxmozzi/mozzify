"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './footer.module.css';
import NewsletterModal from '../shared/newsletter-modal';
import {
    Instagram,
    Twitter,
    Facebook,
    Youtube,
    Mail
} from 'lucide-react';

export default function Footer() {
    const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

    return (
        <footer id="site-footer" className={styles.footer}>
            <div className={styles.container}>

                {/* Main 4-Column Grid */}
                <div className={styles.mainGrid}>

                    {/* COL 1: HELP */}
                    <div>
                        <h4 className={styles.columnTitle}>Help</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/support">FAQ</Link></li>
                            <li><Link href="/support">Delivery Information</Link></li>
                            <li><Link href="/support">Returns Policy</Link></li>
                            <li><Link href="/returns/new">Make A Return</Link></li>
                            <li><Link href="/orders">Orders</Link></li>
                        </ul>
                    </div>

                    {/* COL 2: MY ACCOUNT */}
                    <div>
                        <h4 className={styles.columnTitle}>My Account</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/login">Login</Link></li>
                            <li><Link href="/register">Register</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className={styles.columnTitle}>Customer Support</h4>
                        <ul className={styles.linkList}>
                            <li>
                                <Link
                                    href="/contact"
                                    style={{ fontWeight: 600, textDecoration: 'underline' }}
                                >
                                    Email Us
                                </Link>
                            </li>
                            <li style={{
                                fontSize: '0.85rem',
                                color: '#666',
                                marginTop: '0.5rem',
                                marginBottom: '0.5rem',
                                lineHeight: '1.4'
                            }}>
                                We will take up to 24 hours to respond to your email.
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    style={{ fontWeight: 600, textDecoration: 'underline' }}
                                >
                                    Telegram
                                </Link>
                            </li>
                            <li style={{
                                fontSize: '0.85rem',
                                color: '#666',
                                marginTop: '0.5rem',
                                lineHeight: '1.4'
                            }}>
                                Get a faster response via our Telegram support channel.
                            </li>
                        </ul>
                    </div>

                    {/* COL 4: MORE ABOUT MOZZIFY (Cards) */}
                    <div>
                        <h4 className={styles.columnTitle}>More about Mozzify</h4>
                        <div className={styles.moreAboutGrid}>

                            {/* Blog Card */}
                            <Link href="/blog" className={styles.cardLink}>
                                <div className={`${styles.card} ${styles.blogCard}`}>
                                    <span className={styles.cardLabel}>Blog</span>
                                </div>
                            </Link>

                            {/* Mozzify Club Card */}
                            <Link href="/account/club" className={styles.cardLink}>
                                <div className={`${styles.card} ${styles.discountCard}`}>
                                    <span className={styles.cardLabel}>MOZZIFY CLUB</span>
                                </div>
                            </Link>

                            {/* Email Card (Full Width) */}
                            <button
                                onClick={() => setIsNewsletterOpen(true)}
                                className={`${styles.cardLink} ${styles.cardFullWidth}`}
                                style={{ gridColumn: 'span 2', background: 'none', border: 'none', padding: 0, textAlign: 'inherit', width: '100%' }}
                            >
                                <div className={`${styles.card} ${styles.emailCard}`}>
                                    <Mail size={18} />
                                    <span className={styles.cardLabel}>Email Sign Up</span>
                                </div>
                            </button>
                        </div>

                        <NewsletterModal
                            isOpen={isNewsletterOpen}
                            onClose={() => setIsNewsletterOpen(false)}
                        />

                        {/* Social Icons */}
                        <div className={styles.socialIcons}>
                            {/* Using basic lucide icons or fallbacks */}
                            <Link href="https://instagram.com" target="_blank" className={styles.socialIcon}><Instagram size={24} /></Link>
                            <Link href="https://twitter.com" target="_blank" className={styles.socialIcon}><Twitter size={24} /></Link>
                            <Link href="https://facebook.com" target="_blank" className={styles.socialIcon}><Facebook size={24} /></Link>
                            <Link href="https://youtube.com" target="_blank" className={styles.socialIcon}><Youtube size={24} /></Link>
                            <Link href="https://pinterest.com" target="_blank" className={styles.socialIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* BOTTOM CONTAINER: Legal & Payment */}
                <div className={styles.bottomContainer}>

                    {/* Legal Links (Left) */}
                    <div className={styles.legalLinks}>
                        <span>&copy; {new Date().getFullYear()} Mozzify Limited</span>
                        <Link href="/terms">Terms & Conditions</Link>
                        <Link href="/terms-of-use">Terms of Use</Link>
                        <Link href="/privacy">Privacy Notice</Link>
                        <Link href="/cookies">Cookie Policy</Link>
                        <Link href="/slavery">Modern Slavery</Link>
                    </div>

                    {/* Payment Icons (Right) */}
                    <div className={styles.paymentMethods}>
                        <div className={styles.paymentIcon} title="Visa">VISA</div>
                        <div className={styles.paymentIcon} title="Mastercard">MC</div>
                        <div className={styles.paymentIcon} title="Amex">AMEX</div>
                        <div className={styles.paymentIcon} title="PayPal">Paypal</div>
                        <div className={styles.paymentIcon} title="Apple Pay">Apple Pay</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
