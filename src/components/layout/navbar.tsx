"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Heart, Globe, Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, LayoutGroup, AnimatePresence } from 'framer-motion';
import styles from './navbar.module.css';
import AnnouncementBar from './announcement-bar';
import MiniCart from '@/components/cart/mini-cart';
import MegaMenu from './mega-menu';

const CategoryList = ({ layoutId }: { layoutId?: string }) => (
    <motion.div
        className={styles.categoriesWrapper}
        layoutId={layoutId}
        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
    >
        <MegaMenu />
    </motion.div>
);

export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <AnnouncementBar />

            <LayoutGroup>
                <header className={styles.header}>

                    {/* --- LEVEL 1: TOP NAV (Static, Branding) --- */}
                    <div className={styles.topRow}>

                        {/* LEFT: Gender Links */}
                        {/* LEFT: Gender Links (Desktop) & Hamburger (Mobile) */}
                        <div className={styles.leftSection}>
                            <button
                                className={styles.hamburgerBtn}
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu size={24} />
                            </button>

                            <nav className={styles.genderNav}>
                                <Link href="/women" className={styles.genderLink}>Women</Link>
                                <span className={styles.divider}>|</span>
                                <Link href="/men" className={styles.genderLink}>Men</Link>
                            </nav>
                        </div>

                        {/* CENTER: Logo */}
                        <div className={styles.centerArea}>
                            <Link href="/" className={styles.navLogo}>
                                MOZZIFY
                            </Link>
                        </div>

                        {/* RIGHT: Meta & Actions */}
                        <div className={styles.actions}>
                            <Link href="/about" className={styles.textAction}>About Us</Link>
                            {/* <button className={styles.iconBtn}><Globe size={18} /></button> */}
                            <button className={styles.iconBtn}><User size={18} /></button>
                            <button className={styles.iconBtn}><Heart size={18} /></button>
                            <button className={styles.iconBtn} onClick={() => setIsCartOpen(true)}>
                                <ShoppingBag size={18} />
                                <span className={styles.badge}>0</span>
                            </button>
                        </div>
                    </div>

                    {/* --- LEVEL 2: BOTTOM NAV (Sticky, Categories) --- */}
                    <div className={styles.bottomRow}>
                        <div className={styles.bottomNavContainer}>
                            <MegaMenu />
                        </div>
                    </div>

                </header>
            </LayoutGroup >

            {/* MOBILE MENU DRAWER */}
            <AnimatePresence>
                {
                    isMobileMenuOpen && (
                        <>
                            <motion.div
                                className={styles.mobileMenuOverlay}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                            <motion.div
                                className={styles.mobileMenuDrawer}
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            >
                                <div className={styles.mobileMenuHeader}>
                                    <span className={styles.mobileMenuTitle}>Menu</span>
                                    <button onClick={() => setIsMobileMenuOpen(false)}>
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className={styles.mobileMenuContent}>
                                    <Link href="/all" className={styles.mobileMenuLink}>Shop All</Link>
                                    <Link href="/women" className={styles.mobileMenuLink}>Women</Link>
                                    <Link href="/men" className={styles.mobileMenuLink}>Men</Link>
                                    <div className={styles.mobileDivider} />

                                    <Link href="/hoodies" className={styles.mobileMenuLink}>Hoodies</Link>
                                    {/* Add more categories here as needed */}

                                    <div className={styles.mobileDivider} />
                                    <Link href="/about" className={styles.mobileMenuLink}>About Us</Link>
                                </div>
                            </motion.div>
                        </>
                    )
                }
            </AnimatePresence >

            <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
