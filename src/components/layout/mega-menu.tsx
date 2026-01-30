"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './mega-menu.module.css';

// Menu Configuration
const MENU_ITEMS = [
    { id: 'shop-all', label: 'Shop All', link: '/all' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'brands', label: 'Brands' }, // Changed 'Shoes' to Brands or just generic updates? User said "Adapt Navbar of CLOTHING". Let's stick to their structure.
    { id: 'sports', label: 'Sports' },
    { id: 'mystery', label: 'Mystery Box', link: '/mystery-box' },
];

export default function MegaMenu() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    return (
        <nav className={styles.megaNav} onMouseLeave={() => setActiveMenu(null)}>
            <ul className={styles.navList}>
                {MENU_ITEMS.map((item) => (
                    <li
                        key={item.id}
                        className={styles.navItem}
                        onMouseEnter={() => setActiveMenu(item.id)}
                    >
                        {item.link ? (
                            <Link href={item.link} className={styles.navLink}>{item.label}</Link>
                        ) : (
                            <span className={styles.navLink}>{item.label}</span>
                        )}
                    </li>
                ))}
            </ul>

            <AnimatePresence>
                {activeMenu && activeMenu !== 'mystery' && (
                    <motion.div
                        className={styles.dropdown}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={`container ${styles.dropdownContent}`}>
                            {/* {activeMenu === 'gifts' && <GiftsContent />} */}
                            {activeMenu === 'clothing' && <ClothingContent />}
                            {activeMenu === 'brands' && <BrandsContent />}
                            {activeMenu === 'sports' && <SportContent />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

// Helper to display brands list (reusing structure)
function BrandsContent() {
    return (
        <div className={styles.grid2}>
            <div>
                <h4 className={styles.columnTitle}>Main Brands</h4>
                <ul className={styles.linkListGrid}>
                    <li><Link href="/amiri">Amiri</Link></li>
                    <li><Link href="/amiparis">Ami Paris</Link></li>
                </ul>
            </div>
        </div>
    )
}

function ClothingContent() {
    return (
        <div className={styles.grid2}>
            <div>
                <h4 className={styles.columnTitle}>Categories</h4>
                <ul className={styles.linkListGrid}>
                    <li><Link href="/all">View All</Link></li>
                    {/* Updated to link to /category/all as requested */}
                    <li><Link href="/hoodies/all">Hoodies</Link></li>
                    <li><Link href="/tshirts/all">T-Shirts</Link></li>
                    <li><Link href="/polo/all">Polo</Link></li>
                    <li><Link href="/shorts/all">Shorts</Link></li>
                    <li><Link href="/jeans/all">Jeans</Link></li>
                    <li><Link href="/sweater/all">Sweater</Link></li>
                    <li><Link href="/sweatshirts/all">Sweatshirts</Link></li>
                    <li><Link href="/jacket/all">Jacket</Link></li>
                    <li><Link href="/sets/all">Sets</Link></li>
                    <li><Link href="/shoes/all">Shoes</Link></li>
                    <li><Link href="/iphone_case/all">iPhone Case</Link></li>
                </ul>
            </div>
            <div>
                <h4 className={styles.columnTitle}>Brands</h4>
                {/* Direct links to Brand All Pages? Use /brand/category or we need a brand landing page */}
                {/* For now, maybe link to /brand/hoodies as example or just /brand/all if we implement it. 
                     The user didn't explicitly ask for /brand/all page, but /amiri/hoodies works. 
                     Let's link to the first category of the brand or just text for now?
                     Actually, with the smart route, /amiri/all should theoretically work IF we implement it? 
                     My smart route logic handles param2='all' as global category. 
                     Can it handle param1='amiri' param2='all' -> Brand All? 
                     Wait, my logic: 
                     isGlobalCategoryView = param2 === 'all';
                     if (isGlobalCategoryView) { param1 is category }
                     So /amiri/all would be treated as Category="Amiri" (which doesn't exist).
                     
                     I should probably handle /all specially or fix the route.
                     User asked for: "Página ALL (todos los productos)... /all". This is a separate route.
                     User didn't explicitly ask for /amiri/all. 
                     Let's stick to Categories for now.
                 */}
                <ul className={styles.linkListGrid}>
                    <li><Link href="/amiri">Amiri</Link></li>
                    <li><Link href="/amiparis">Ami Paris</Link></li>
                </ul>
            </div>
        </div>
    )
}

function ShoesContent() {
    return (
        <div className={styles.grid2}>
            <div>
                <h4 className={styles.columnTitle}>Categories</h4>
                <ul className={styles.linkList}>
                    <li><Link href="/shoes">View All</Link></li>
                    <li><Link href="/boots">Boots</Link></li>
                    <li><Link href="/sneakers">Sneakers</Link></li>
                    <li><Link href="/loafers">Loafers</Link></li>
                </ul>
            </div>
            <div>
                <h4 className={styles.columnTitle}>Brands</h4>
                <ul className={styles.linkListGrid}>
                    <li><Link href="/b/golden-goose">Golden Goose</Link></li>
                    <li><Link href="/b/autry">Autry</Link></li>
                    <li><Link href="/b/nike">Nike</Link></li>
                    <li><Link href="/b/adidas">Adidas</Link></li>
                    <li><Link href="/b/new-balance">New Balance</Link></li>
                    <li><Link href="/b/asics">Asics</Link></li>
                    <li><Link href="/b/veja">Veja</Link></li>
                    <li><Link href="/b/hoff">Hoff</Link></li>
                    <li><Link href="/b/premiata">Premiata</Link></li>
                    <li><Link href="/b/diadora">Diadora</Link></li>
                </ul>
            </div>
        </div>
    )
}

function AccessoriesContent() {
    return (
        <div className={styles.grid2}>
            <div>
                <h4 className={styles.columnTitle}>Categories</h4>
                <ul className={styles.linkList}>
                    <li><Link href="/accessories">View All</Link></li>
                    <li><Link href="/watches">Watches</Link></li>
                    <li><Link href="/bags">Bags & Luggage</Link></li>
                    <li><Link href="/belts">Belts</Link></li>
                    <li><Link href="/jewelry">Jewelry</Link></li>
                    <li><Link href="/hats">Hats & Caps</Link></li>
                    <li><Link href="/wallets">Wallets</Link></li>
                </ul>
            </div>
            <div>
                <h4 className={styles.columnTitle}>Brands</h4>
                <ul className={styles.linkListGrid}>
                    <li><Link href="/b/brand1">Brand 1</Link></li>
                    <li><Link href="/b/brand2">Brand 2</Link></li>
                    <li><Link href="/b/brand3">Brand 3</Link></li>
                    <li><Link href="/b/brand4">Brand 4</Link></li>
                    <li><Link href="/b/brand5">Brand 5</Link></li>
                    <li><Link href="/b/brand6">Brand 6</Link></li>
                </ul>
            </div>
        </div>
    )
}

function SportContent() {
    return (
        <div className={styles.grid2}>
            <div>
                <h4 className={styles.columnTitle}>Categories</h4>
                <ul className={styles.linkListGrid}>
                    <li><Link href="/running/all">Running</Link></li>
                    <li><Link href="/gym/all">Gym</Link></li>
                    <li><Link href="/football/all">Football</Link></li>
                </ul>
            </div>
        </div>
    )
}

function FragranceContent() {
    return (
        <div className={styles.grid2}>
            <div>
                <Link href="/fragrances" className={styles.columnTitle}>View All</Link>
            </div>
            <div>
                <h4 className={styles.columnTitle}>Brands</h4>
                <ul className={styles.linkList}>
                    <li><Link href="/b/dior">Dior</Link></li>
                    <li><Link href="/b/chanel">Chanel</Link></li>
                    <li><Link href="/b/tom-ford">Tom Ford</Link></li>
                    <li><Link href="/b/creed">Creed</Link></li>
                    <li><Link href="/b/jo-malone">Jo Malone</Link></li>
                </ul>
            </div>
        </div>
    )
}
