"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/context/favorites-context';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Heart, Globe, Menu, X, ChevronDown } from 'lucide-react';
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
    const { favorites, setNavbarHeartRef, flyingAnimation } = useFavorites();
    const pathname = usePathname();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setExpandedSection(null); // Reset expansion
    }, [pathname]);

    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setExpandedSection(prev => prev === section ? null : section);
    };

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
                            <Link href="/favorites">
                                <button className={styles.iconBtn} ref={setNavbarHeartRef}>
                                    <Heart
                                        size={18}
                                        fill={favorites.length > 0 ? "red" : "none"}
                                        color={favorites.length > 0 ? "red" : "black"}
                                        className={flyingAnimation.isActive ? styles.heartPulse : ''}
                                    />
                                </button>
                            </Link>
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

                                    <div className={styles.mobileDivider} />

                                    {/* CLOTHING ACCORDION */}
                                    <div>
                                        <button
                                            className={styles.accordionBtn}
                                            onClick={() => toggleSection('clothing')}
                                        >
                                            Clothing
                                            <span style={{
                                                transform: expandedSection === 'clothing' ? 'rotate(180deg)' : 'rotate(0)',
                                                transition: 'transform 0.3s ease',
                                                display: 'flex'
                                            }}>
                                                <ChevronDown size={20} />
                                            </span>
                                        </button>
                                        <AnimatePresence>
                                            {expandedSection === 'clothing' && (
                                                <motion.div
                                                    className={styles.accordionContent}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                >
                                                    <Link href="/all" className={styles.accordionLink}>View All</Link>
                                                    <Link href="/hoodies/all" className={styles.accordionLink}>Hoodies</Link>
                                                    <Link href="/tshirts/all" className={styles.accordionLink}>T-Shirts</Link>
                                                    <Link href="/jeans/all" className={styles.accordionLink}>Jeans</Link>
                                                    <Link href="/shoes/all" className={styles.accordionLink}>Shoes</Link>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* BRANDS ACCORDION */}
                                    <div>
                                        <button
                                            className={styles.accordionBtn}
                                            onClick={() => toggleSection('brands')}
                                        >
                                            Brands
                                            <span style={{
                                                transform: expandedSection === 'brands' ? 'rotate(180deg)' : 'rotate(0)',
                                                transition: 'transform 0.3s ease',
                                                display: 'flex'
                                            }}>
                                                <ChevronDown size={20} />
                                            </span>
                                        </button>
                                        <AnimatePresence>
                                            {expandedSection === 'brands' && (
                                                <motion.div
                                                    className={styles.accordionContent}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                >
                                                    <Link href="/amiri" className={styles.accordionLink}>Amiri</Link>
                                                    <Link href="/amiparis" className={styles.accordionLink}>Ami Paris</Link>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* SPORTS ACCORDION */}
                                    <div>
                                        <button
                                            className={styles.accordionBtn}
                                            onClick={() => toggleSection('sports')}
                                        >
                                            Sports
                                            <span style={{
                                                transform: expandedSection === 'sports' ? 'rotate(180deg)' : 'rotate(0)',
                                                transition: 'transform 0.3s ease',
                                                display: 'flex'
                                            }}>
                                                <ChevronDown size={20} />
                                            </span>
                                        </button>
                                        <AnimatePresence>
                                            {expandedSection === 'sports' && (
                                                <motion.div
                                                    className={styles.accordionContent}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                >
                                                    <Link href="/running/all" className={styles.accordionLink}>Running</Link>
                                                    <Link href="/gym/all" className={styles.accordionLink}>Gym</Link>
                                                    <Link href="/football/all" className={styles.accordionLink}>Football</Link>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className={styles.mobileDivider} />

                                    <Link href="/mystery-box" className={styles.mobileMenuLink}>Mystery Box</Link>
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
