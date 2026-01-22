"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import styles from './filter-sidebar.module.css';

interface FilterSidebarProps {
    brands: string[];
    selectedBrands: string[];
    onBrandChange: (brand: string) => void;
    className?: string;
}

export default function FilterSidebar({ brands, selectedBrands, onBrandChange, className }: FilterSidebarProps) {
    // Accordion States
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
        category: true,
        brand: true,
        size: true,
        color: true,
        price: true
    });

    const [brandSearch, setBrandSearch] = useState('');

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const filteredBrandsDisplay = brands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));

    // Visual Data
    const SUB_CATEGORIES = [
        { label: 'Hooded Sweatshirts', count: 42 },
        { label: 'Sweatshirts', count: 18 },
        { label: 'Zip Hoodies', count: 12 },
        { label: 'Fleeces', count: 8 },
    ];

    const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const COLORS = [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF', border: true },
        { name: 'Grey', hex: '#808080' },
        { name: 'Blue', hex: '#0000FF' },
        { name: 'Red', hex: '#FF0000' },
        { name: 'Green', hex: '#008000' },
        { name: 'Beige', hex: '#F5F5DC', border: true },
    ];

    return (
        <aside className={`${styles.sidebar} ${className || ''}`}>

            {/* 1. SUBCATEGORY STRUCTURE (Visual) */}
            <div className={styles.categoryTree}>
                <div className={styles.treeHeader}>Clothing / Hoodies /</div>
                <ul className={styles.subCatList}>
                    {SUB_CATEGORIES.map((sub, idx) => (
                        <li key={idx} className={styles.subCatItem}>
                            <span className={styles.subCatLabel}>{sub.label}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <hr className={styles.divider} />

            {/* 2. BRAND FILTER (Searchable + Scrollable) */}
            <div className={styles.filterGroup}>
                <button className={styles.groupTitle} onClick={() => toggleSection('brand')}>
                    <span>Brand</span>
                    {openSections['brand'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                <AnimatePresence>
                    {openSections['brand'] && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className={styles.groupContent}
                        >
                            <div className={styles.brandSearchWrapper}>
                                <Search size={14} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Search brand"
                                    className={styles.brandSearchInput}
                                    value={brandSearch}
                                    onChange={(e) => setBrandSearch(e.target.value)}
                                />
                            </div>

                            <div className={styles.scrollableList}>
                                {filteredBrandsDisplay.map((brand) => (
                                    <label key={brand} className={styles.checkboxLabel}>
                                        <div className={styles.checkboxWrapper}>
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => onBrandChange(brand)}
                                                className={styles.checkbox}
                                            />
                                        </div>
                                        <span className={styles.labelText}>{brand}</span>
                                    </label>
                                ))}
                                {filteredBrandsDisplay.length === 0 && (
                                    <span className={styles.noResults}>No brands found</span>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 3. SIZE FILTER (Grid) */}
            <div className={styles.filterGroup}>
                <button className={styles.groupTitle} onClick={() => toggleSection('size')}>
                    <span>Size</span>
                    {openSections['size'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <AnimatePresence>
                    {openSections['size'] && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className={styles.groupContent}
                        >
                            <div className={styles.sizeGrid}>
                                {SIZES.map(size => (
                                    <button key={size} className={styles.sizeBtn}>{size}</button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 4. COLOR FILTER (Chips) */}
            <div className={styles.filterGroup}>
                <button className={styles.groupTitle} onClick={() => toggleSection('color')}>
                    <span>Color</span>
                    {openSections['color'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <AnimatePresence>
                    {openSections['color'] && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className={styles.groupContent}
                        >
                            <div className={styles.colorGrid}>
                                {COLORS.map(color => (
                                    <button
                                        key={color.name}
                                        className={styles.colorBtn}
                                        style={{ backgroundColor: color.hex, border: color.border ? '1px solid #ddd' : 'none' }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 5. PRICE FILTER (Inputs + Slider Visual) */}
            <div className={styles.filterGroup}>
                <button className={styles.groupTitle} onClick={() => toggleSection('price')}>
                    <span>Price</span>
                    {openSections['price'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <AnimatePresence>
                    {openSections['price'] && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className={styles.groupContent}
                        >
                            <div className={styles.priceInputs}>
                                <div className={styles.priceField}>
                                    <span className={styles.currency}>€</span>
                                    <input type="number" placeholder="From" className={styles.priceInput} />
                                </div>
                                <span className={styles.priceSep}>-</span>
                                <div className={styles.priceField}>
                                    <span className={styles.currency}>€</span>
                                    <input type="number" placeholder="To" className={styles.priceInput} />
                                </div>
                            </div>
                            <div className={styles.sliderVisual}>
                                <div className={styles.track}></div>
                                <div className={styles.range}></div>
                                <div className={styles.thumb} style={{ left: '0%' }}></div>
                                <div className={styles.thumb} style={{ left: '100%' }}></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </aside>
    );
}
