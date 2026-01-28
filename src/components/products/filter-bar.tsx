"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import styles from './filter-bar.module.css';

interface FilterBarProps {
    brands: string[];
    selectedBrands: string[];
    onBrandChange: (brand: string) => void;
    categories?: string[];
    selectedCategories?: string[];
    onCategoryChange?: (category: string) => void;
}

export default function FilterBar({
    brands,
    selectedBrands,
    onBrandChange,
    categories = [],
    selectedCategories = [],
    onCategoryChange
}: FilterBarProps) {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [brandSearch, setBrandSearch] = useState('');
    const [categorySearch, setCategorySearch] = useState('');

    const toggleFilter = (filter: string) => {
        if (activeFilter === filter) {
            setActiveFilter(null);
        } else {
            setActiveFilter(filter);
        }
    };

    const closeFilter = () => setActiveFilter(null);

    const filteredBrandsDisplay = brands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));
    const filteredCategoriesDisplay = categories.filter(c => c.toLowerCase().includes(categorySearch.toLowerCase()));

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
                {categories.length > 0 && (
                    <FilterButton
                        label="Category"
                        isActive={activeFilter === 'category'}
                        onClick={() => toggleFilter('category')}
                    />
                )}
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
                                left: getDynamicPosition(activeFilter, categories.length > 0)
                            }}
                        >
                            {activeFilter === 'category' && categories.length > 0 && (
                                <div className={styles.dropdownContent}>
                                    <div className={styles.searchWrapper}>
                                        <Search size={16} className={styles.searchIcon} />
                                        <input
                                            type="text"
                                            placeholder="Search category"
                                            className={styles.searchInput}
                                            value={categorySearch}
                                            onChange={(e) => setCategorySearch(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                    <div className={styles.scrollList}>
                                        {filteredCategoriesDisplay.map(category => (
                                            <label key={category} className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories?.includes(category)}
                                                    onChange={() => onCategoryChange?.(category)}
                                                    className={styles.checkbox}
                                                />
                                                <span>{category}</span>
                                            </label>
                                        ))}
                                        {filteredCategoriesDisplay.length === 0 && (
                                            <span style={{ padding: '1rem', color: '#999' }}>No categories found</span>
                                        )}
                                    </div>
                                </div>
                            )}

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

function getDynamicPosition(filter: string, hasCategories: boolean) {
    const baseWidth = 130;

    // Define the sequence of buttons
    let sequence = ['brand', 'size', 'color', 'price', 'sort'];
    if (hasCategories) {
        sequence = ['category', ...sequence];
    }

    const index = sequence.indexOf(filter);
    if (index === -1) return '0px'; // Fallback

    return `${index * baseWidth}px`;
}
