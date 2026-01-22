"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import styles from './filter-bar.module.css';

interface FilterBarProps {
    brands: string[];
    selectedBrands: string[];
    onBrandChange: (brand: string) => void;
}

export default function FilterBar({ brands, selectedBrands, onBrandChange }: FilterBarProps) {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [brandSearch, setBrandSearch] = useState('');

    const toggleFilter = (filter: string) => {
        if (activeFilter === filter) {
            setActiveFilter(null);
        } else {
            setActiveFilter(filter);
        }
    };

    const closeFilter = () => setActiveFilter(null);

    const filteredBrandsDisplay = brands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));

    // Visual Data (Same as Sidebar)
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
        <div className={styles.filterBar}>

            {/* Filter Buttons */}
            <div className={styles.buttonGroup}>
                <FilterButton
                    label="Brand"
                    isActive={activeFilter === 'brand'}
                    onClick={() => toggleFilter('brand')}
                />
                <FilterButton
                    label="Size"
                    isActive={activeFilter === 'size'}
                    onClick={() => toggleFilter('size')}
                />
                <FilterButton
                    label="Color"
                    isActive={activeFilter === 'color'}
                    onClick={() => toggleFilter('color')}
                />
                <FilterButton
                    label="Price"
                    isActive={activeFilter === 'price'}
                    onClick={() => toggleFilter('price')}
                />
                <FilterButton
                    label="Sort"
                    isActive={activeFilter === 'sort'}
                    onClick={() => toggleFilter('sort')}
                />
            </div>

            {/* Dropdown Overlays */}
            <AnimatePresence>
                {activeFilter && (
                    <>
                        <div className={styles.backdrop} onClick={closeFilter}></div>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={styles.dropdown}
                            style={{
                                left: getLeftPosition(activeFilter)
                            }}
                        >
                            {activeFilter === 'brand' && (
                                <div className={styles.dropdownContent}>
                                    <div className={styles.searchWrapper}>
                                        <Search size={16} className={styles.searchIcon} />
                                        <input
                                            type="text"
                                            placeholder="Search brand"
                                            className={styles.searchInput}
                                            value={brandSearch}
                                            onChange={(e) => setBrandSearch(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                    <div className={styles.scrollList}>
                                        {filteredBrandsDisplay.map(brand => (
                                            <label key={brand} className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={() => onBrandChange(brand)}
                                                    className={styles.checkbox}
                                                />
                                                <span>{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeFilter === 'size' && (
                                <div className={styles.dropdownContent}>
                                    <div className={styles.grid3}>
                                        {SIZES.map(size => (
                                            <button key={size} className={styles.optionBtn}>{size}</button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeFilter === 'color' && (
                                <div className={styles.dropdownContent}>
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
                                </div>
                            )}

                            {activeFilter === 'price' && (
                                <div className={styles.dropdownContent}>
                                    <div className={styles.priceInputs}>
                                        <input type="number" placeholder="From €" className={styles.priceInput} />
                                        <span style={{ color: '#999' }}>-</span>
                                        <input type="number" placeholder="To €" className={styles.priceInput} />
                                    </div>
                                    <div className={styles.sliderMock}>
                                        <div className={styles.track}></div>
                                        <div className={styles.thumb} style={{ left: '0%' }}></div>
                                        <div className={styles.thumb} style={{ left: '100%' }}></div>
                                    </div>
                                </div>
                            )}

                            {activeFilter === 'sort' && (
                                <div className={styles.dropdownContent}>
                                    <div className={styles.list}>
                                        {['New Arrivals', 'Favorites', 'Price: Low-High', 'Price: High-Low'].map(opt => (
                                            <button key={opt} className={styles.listBtn}>{opt}</button>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

function FilterButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
    return (
        <button
            className={`${styles.filterButton} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            <span>{label}</span>
            {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
    )
}

// Simple helper to position dropdown approximately under the button
// In real app, consider using refs or a positioning library like floating-ui
function getLeftPosition(filter: string) {
    switch (filter) {
        case 'brand': return '0px';
        case 'size': return '130px';
        case 'color': return '260px';
        case 'price': return '390px';
        case 'sort': return '520px';
        default: return '0px';
    }
}
