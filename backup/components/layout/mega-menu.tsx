"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './mega-menu.module.css';

// Menu Configuration
const MENU_ITEMS = [
    { id: 'shop-all', label: 'Shop All', link: '/all' },
    { id: 'gifts', label: 'Gifts' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'sport', label: 'Sport' },
    { id: 'fragrance', label: 'Fragrance' },
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
                            {activeMenu === 'gifts' && <GiftsContent />}
                            {activeMenu === 'clothing' && <ClothingContent />}
                            {activeMenu === 'shoes' && <ShoesContent />}
                            {activeMenu === 'accessories' && <AccessoriesContent />}
                            {activeMenu === 'sport' && <SportContent />}
                            {activeMenu === 'fragrance' && <FragranceContent />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function GiftsContent() {
    return (
        <div className={styles.grid4}>
            <div>
                <h4 className={styles.columnTitle}>Gift Ideas</h4>
                <ul className={styles.linkList}>
                    <li><Link href="/all">Discover All</Link></li>
                    <li><Link href="/gifts-him">Gifts for Him</Link></li>
                    <li><Link href="/gifts-her">Gifts for Her</Link></li>
                </ul>
            </div>
            <div>
                <h4 className={styles.columnTitle}>Gifts by Price</h4>
                <ul className={styles.linkList}>
                    <li><Link href="/price/under-25">Under 25€</Link></li>
                    <li><Link href="/price/under-50">Under 50€</Link></li>
                    <li><Link href="/price/under-100">Under 100€</Link></li>
                </ul>
            </div>
            <div>
                <h4 className={styles.columnTitle}>Featured</h4>
            </div>
            <div className={styles.imageColumn}>
                <div className={styles.promoCard}>
                    <div style={{ width: '100%', height: '200px', background: '#eee', position: 'relative' }}>
                        <Image
                            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop"
                            alt="Gift Ideas"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.promoText}>
                        <span>Gift Ideas</span>
                        <span className={styles.arrow}>→</span>
                    </div>
                </div>
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
                    <li><Link href="/clothing">View All</Link></li>
                    <li><Link href="/jackets">Jackets</Link></li>
                    <li><Link href="/coats">Coats</Link></li>
                    <li><Link href="/hoodies">Hoodies</Link></li>
                    <li><Link href="/knitwear">Knitwear</Link></li>
                    <li><Link href="/pants">Pants</Link></li>
                    <li><Link href="/jeans">Jeans</Link></li>
                    <li><Link href="/tshirts">T-Shirts</Link></li>
                    <li><Link href="/underwear">Underwear</Link></li>
                    <li><Link href="/shirts">Shirts</Link></li>
                    <li><Link href="/suits">Suits</Link></li>
                </ul>
            </div>
            <div>
                <h4 className={styles.columnTitle}>Brands</h4>
                <ul className={styles.linkListGrid}>
                    <li><Link href="/b/nike">Nike</Link></li>
                    <li><Link href="/b/adidas">Adidas</Link></li>
                    <li><Link href="/b/ralph-lauren">Ralph Lauren</Link></li>
                    <li><Link href="/b/tommy">Tommy Hilfiger</Link></li>
                    <li><Link href="/b/lacoste">Lacoste</Link></li>
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
        <div className={styles.grid3}>
            <div>
                <h4 className={styles.columnTitle}>Categories</h4>
                <ul className={styles.linkList}>
                    <li><Link href="/sport-all">View All</Link></li>
                    <li><Link href="/sport-clothing">Clothing</Link></li>
                    <li><Link href="/sport-shoes">Sport Shoes</Link></li>
                    <li><Link href="/sport-equip">Equipment</Link></li>
                    <li><Link href="/sport-bags">Bags & Backpacks</Link></li>
                </ul>
            </div>
            <div>
                <h4 className={styles.columnTitle}>Sports</h4>
                <ul className={styles.linkList}>
                    <li><Link href="/s/running">Running</Link></li>
                    <li><Link href="/s/gym">Gym</Link></li>
                    <li><Link href="/s/football">Football</Link></li>
                    <li><Link href="/s/basketball">Basketball</Link></li>
                    <li><Link href="/s/mountain">Outdoor</Link></li>
                    <li><Link href="/s/padel">Padel & Tennis</Link></li>
                    <li><Link href="/s/cycling">Cycling</Link></li>
                </ul>
            </div>
            <div>
                <h4 className={styles.columnTitle}>Brands</h4>
                <ul className={styles.linkList}>
                    <li><Link href="/b/nike-pro">Nike Pro</Link></li>
                    <li><Link href="/b/under-armour">Under Armour</Link></li>
                    <li><Link href="/b/on-running">On Running</Link></li>
                    <li><Link href="/b/hoka">Hoka</Link></li>
                    <li><Link href="/b/salomon">Salomon</Link></li>
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
