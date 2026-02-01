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
import Image from 'next/image';
import logoImg from '@/images/system/logo/logo.png';
import { navigation } from '@/data/navigation';

export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<'currency' | 'language' | null>(null);
    const { setNavbarHeartRef, flyingAnimation, shouldShowRedHeart, currentProductId, checkIsFavorite } = useFavorites();
    const pathname = usePathname();

    // Navbar heart is red only when: (1) temporary after adding to favorites, or (2) we're on a product page and that product is in favorites
    const isCurrentProductInFavorites = currentProductId != null && checkIsFavorite(currentProductId);
    const isNavbarHeartRed = shouldShowRedHeart || isCurrentProductInFavorites;

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeDropdown && !(event.target as HTMLElement).closest(`.${styles.selectorWrapper}`)) {
                setActiveDropdown(null);
            }
        };

        if (activeDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDropdown]);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setExpandedSection(null); // Reset expansion
        setActiveDropdown(null); // Close dropdowns
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

                        {/* LEFT: Gender Links (Desktop) & Hamburger (Mobile) */}
                        <div className={styles.leftSection}>
                            <button
                                className={styles.hamburgerBtn}
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu size={24} />
                            </button>

                            <nav className={styles.genderNav}>
                                {navigation.top.map((item, index) => (
                                    <span key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Link href={item.href} className={styles.genderLink}>{item.label}</Link>
                                        {index < navigation.top.length - 1 && <span className={styles.divider}>|</span>}
                                    </span>
                                ))}
                            </nav>
                        </div>

                        {/* CENTER: Logo */}
                        <div className={styles.centerArea}>
                            <Link href="/" className={styles.navLogo}>
                                <Image
                                    src={logoImg}
                                    alt="Mozzify Logo"
                                    height={50}
                                    style={{ width: 'auto' }}
                                    priority
                                />
                            </Link>
                        </div>

                        {/* RIGHT: Meta & Actions */}
                        <div className={styles.actions}>
                            <div className={styles.visualSelectors}>
                                {/* CURRENCY DROPDOWN */}
                                <div className={styles.selectorWrapper}>
                                    <button
                                        className={styles.selectorItem}
                                        onClick={() => setActiveDropdown(activeDropdown === 'currency' ? null : 'currency')}
                                    >
                                        <span>EUR</span>
                                        <ChevronDown size={14} className={activeDropdown === 'currency' ? styles.rotateIcon : ''} />
                                    </button>
                                    <AnimatePresence>
                                        {activeDropdown === 'currency' && (
                                            <motion.div
                                                className={styles.dropdownMenu}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <button className={styles.dropdownOption} onClick={() => setActiveDropdown(null)}>EUR</button>
                                                <button className={styles.dropdownOption} onClick={() => setActiveDropdown(null)}>USD</button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* LANGUAGE DROPDOWN */}
                                <div className={styles.selectorWrapper}>
                                    <button
                                        className={styles.selectorItem}
                                        onClick={() => setActiveDropdown(activeDropdown === 'language' ? null : 'language')}
                                    >
                                        <span>English</span>
                                        <ChevronDown size={14} className={activeDropdown === 'language' ? styles.rotateIcon : ''} />
                                    </button>
                                    <AnimatePresence>
                                        {activeDropdown === 'language' && (
                                            <motion.div
                                                className={styles.dropdownMenu}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <button className={styles.dropdownOption} onClick={() => setActiveDropdown(null)}>English</button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <button className={styles.iconBtn}><User size={18} /></button>
                            <Link href="/favorites">
                                <button className={styles.iconBtn} ref={setNavbarHeartRef}>
                                    <Heart
                                        size={18}
                                        fill={isNavbarHeartRed ? "red" : "none"}
                                        color={isNavbarHeartRed ? "red" : "black"}
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
                                    {navigation.main.map((item) => {
                                        // If it has columns, render accordion
                                        if (item.columns && item.columns.length > 0) {
                                            return (
                                                <div key={item.id}>
                                                    <button
                                                        className={styles.accordionBtn}
                                                        onClick={() => toggleSection(item.id)}
                                                    >
                                                        {item.label}
                                                        <span style={{
                                                            transform: expandedSection === item.id ? 'rotate(180deg)' : 'rotate(0)',
                                                            transition: 'transform 0.3s ease',
                                                            display: 'flex'
                                                        }}>
                                                            <ChevronDown size={20} />
                                                        </span>
                                                    </button>
                                                    <AnimatePresence>
                                                        {expandedSection === item.id && (
                                                            <motion.div
                                                                className={styles.accordionContent}
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                            >
                                                                {item.columns.map((col, idx) => (
                                                                    <div key={idx} style={{ marginBottom: '1rem' }}>
                                                                        {/* Optional: Render column title if needed, or just links */}
                                                                        {/* Mobile menu usually just lists links. Let's render title as small header if distinct */}
                                                                        {/* <h5 style={{fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem', paddingLeft: '1rem'}}>{col.title}</h5> */}

                                                                        {col.items.map((link, lIdx) => (
                                                                            <Link key={lIdx} href={link.href} className={styles.accordionLink}>
                                                                                {link.label}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        } else if (item.href) {
                                            // Direct link
                                            return (
                                                <Link
                                                    key={item.id}
                                                    href={item.href}
                                                    className={styles.mobileMenuLink}
                                                    style={item.isRed ? { color: 'red' } : {}}
                                                >
                                                    {item.label}
                                                </Link>
                                            );
                                        }
                                        return null;
                                    })}
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
