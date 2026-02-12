'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, RotateCcw, Search } from 'lucide-react';
import styles from './filter-drawer.module.css';

interface FilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    // New Props
    selectedSizes: string[];
    onSizeChange: (size: string) => void;
    selectedColors: string[];
    onColorChange: (color: string) => void;
    priceRange: { min: number; max: number };
    onPriceChange: (range: { min: number; max: number }) => void;
    onClearAll: () => void;
    // New Props for Tagging System
    isSaleSelected: boolean;
    onSaleChange: (isSale: boolean) => void;
    // Brand Filtering
    availableBrands: { name: string; count: number }[];
    selectedBrands: string[];
    onBrandChange: (brand: string) => void;
    // Fix: Add missing optional props reported by lint
    availableCategories?: string[];
    selectedCategories?: string[];
    onCategoryChange?: (category: string) => void;
    currentSort?: string;
    onSortChange?: (sort: string) => void;
    selectedSports?: string[];
    onSportChange?: (sport: string) => void;
}

export default function FilterDrawer({
    isOpen,
    onClose,
    selectedSizes,
    onSizeChange,
    selectedColors,
    onColorChange,
    priceRange,
    onPriceChange,
    onClearAll,
    isSaleSelected,
    onSaleChange,
    availableBrands,
    selectedBrands,
    onBrandChange
}: FilterDrawerProps) {
    const [mounted, setMounted] = useState(false);
    const [brandSearch, setBrandSearch] = useState('');
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Handle Blur
    useEffect(() => {
        const siteWrapper = document.getElementById('site-wrapper');
        if (isOpen && siteWrapper) {
            siteWrapper.style.filter = 'blur(5px)';
        } else if (siteWrapper) {
            siteWrapper.style.filter = 'none';
        }

        return () => {
            if (siteWrapper) {
                siteWrapper.style.filter = 'none';
            }
        };
    }, [isOpen]);

    // Handle Click Outside (Global Listener)
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className={styles.overlay} style={{ zIndex: 9999 }}>
            <div className={styles.backdrop} onClick={onClose} />
            <div className={styles.drawer} ref={drawerRef}>
                {/* Header */}
                <div className={styles.header}>
                    <h2>FILTER & SORT</h2>
                    <div className={styles.headerActions}>
                        <button className={styles.clearBtn} onClick={onClearAll}>
                            <RotateCcw size={14} />
                            CLEAR ALL
                        </button>
                        <button onClick={onClose} className={styles.closeBtn}>
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    {/* BRANDS */}
                    <Accordion title="BRANDS">
                        <div className={styles.brandsWrapper}>
                            <div className={styles.searchBox}>
                                <Search size={16} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Search brands..."
                                    value={brandSearch}
                                    onChange={(e) => setBrandSearch(e.target.value)}
                                    className={styles.brandSearchInput}
                                />
                                {brandSearch && (
                                    <button
                                        className={styles.clearSearch}
                                        onClick={() => setBrandSearch('')}
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                            <div className={styles.brandsList}>
                                {availableBrands
                                    ?.filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase()))
                                    .map(brand => {
                                        const isSelected = selectedBrands.includes(brand.name);
                                        return (
                                            <label key={brand.name} className={styles.brandItem}>
                                                <div className={styles.checkboxWrapper}>
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => onBrandChange(brand.name)}
                                                        className={styles.hiddenCheckbox}
                                                    />
                                                    <div className={`${styles.customCheckbox} ${isSelected ? styles.checkboxChecked : ''}`}>
                                                        {isSelected && <Check size={12} />}
                                                    </div>
                                                </div>
                                                <span className={styles.brandName}>{brand.name}</span>
                                                <span className={styles.brandCount}>({brand.count})</span>
                                            </label>
                                        );
                                    })}
                                {availableBrands?.filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase())).length === 0 && (
                                    <p className={styles.noBrands}>No brands found</p>
                                )}
                            </div>
                        </div>
                    </Accordion>


                    {/* STATUS (Sale) -> Renamed to DISCOUNT */}
                    <Accordion title="DISCOUNT">
                        <div className={styles.list}>
                            <button
                                className={`${styles.saleBtn} ${isSaleSelected ? styles.saleBtnActive : ''}`}
                                onClick={() => onSaleChange(!isSaleSelected)}
                            >
                                {isSaleSelected && <Check size={18} />}
                                ON SALE
                            </button>
                        </div>
                    </Accordion>

                    {/* SIZE */}
                    <Accordion title="SIZE">
                        <div className={styles.sizeGrid}>
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => {
                                const isSelected = selectedSizes.includes(size);
                                return (
                                    <button
                                        key={size}
                                        className={`${styles.sizeBtn} ${isSelected ? styles.sizeBtnActive : ''}`}
                                        onClick={() => onSizeChange(size)}
                                    >
                                        {size}
                                    </button>
                                );
                            })}
                        </div>
                    </Accordion>

                    {/* COLOR */}
                    <Accordion title="COLOR">
                        <div className={styles.colorGrid}>
                            {['black', 'white', 'grey', 'blue', 'red', 'green', 'beige'].map(color => {
                                const isSelected = selectedColors.includes(color);
                                return (
                                    <button
                                        key={color}
                                        className={`${styles.colorBtn} ${isSelected ? styles.colorBtnActive : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => onColorChange(color)}
                                        aria-label={`Select color ${color}`}
                                    >
                                        {/* Visual indicator for white or selection if needed, but CSS handles active state ring */}
                                    </button>
                                );
                            })}
                        </div>
                    </Accordion>

                    {/* PRICE */}
                    <Accordion title="PRICE">
                        <div className={styles.priceContainer}>
                            <div className={styles.priceInputs}>
                                <div className={styles.inputGroup}>
                                    <label>From</label>
                                    <input
                                        type="number"
                                        value={priceRange.min}
                                        onChange={(e) => onPriceChange({ ...priceRange, min: Number(e.target.value) })}
                                        className={styles.priceInput}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>To</label>
                                    <input
                                        type="number"
                                        value={priceRange.max}
                                        onChange={(e) => onPriceChange({ ...priceRange, max: Number(e.target.value) })}
                                        className={styles.priceInput}
                                    />
                                </div>
                            </div>
                            <div className={styles.sliderContainer}>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={priceRange.min}
                                    onChange={(e) => {
                                        const val = Number(e.target.value);
                                        if (val <= priceRange.max) onPriceChange({ ...priceRange, min: val });
                                    }}
                                    className={`${styles.rangeSlider} ${styles.rangeSliderMin}`}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={priceRange.max}
                                    onChange={(e) => {
                                        const val = Number(e.target.value);
                                        if (val >= priceRange.min) onPriceChange({ ...priceRange, max: val });
                                    }}
                                    className={`${styles.rangeSlider} ${styles.rangeSliderMax}`}
                                />
                                {/* Visual Track Logic would go here in CSS or via a styled div background if needed, leveraging standardized range inputs for now */}
                            </div>
                        </div>
                    </Accordion>
                </div>

                {/* Footer Actions */}
                <div className={styles.footer}>
                    <button className={styles.applyBtn} onClick={onClose}>
                        VIEW ITEMS
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

function Accordion({ title, children }: { title: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={styles.accordion}>
            <button className={styles.accordionHeader} onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 300 }}>{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && <div className={styles.accordionContent}>{children}</div>}
        </div>
    );
}
