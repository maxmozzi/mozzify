'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Check } from 'lucide-react';
import styles from './filter-drawer.module.css';

interface FilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    currentSort: string;
    onSortChange: (sort: string) => void;
    availableCategories: string[];
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
}

export default function FilterDrawer({
    isOpen,
    onClose,
    currentSort,
    onSortChange,
    availableCategories,
    selectedCategories,
    onCategoryChange
}: FilterDrawerProps) {
    const [mounted, setMounted] = useState(false);
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
            // Note: We intentionally do NOT lock body scroll or pointer events here
            // to allow the user to see the page "alive" and scroll if needed.
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

        // Use mousedown to capture intent before click completes (better feel)
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!mounted || !isOpen) return null;

    // Use Portal to render outside site-wrapper so it doesn't get blurred
    return createPortal(
        <div className={styles.overlay} style={{ zIndex: 9999 }}>
            {/* Backdrop is now non-interactive via CSS to allow clicks through */}
            <div className={styles.backdrop} />
            <div className={styles.drawer} ref={drawerRef}>
                {/* Header */}
                <div className={styles.header}>
                    <h2>FILTER & SORT</h2>
                    <div className={styles.headerActions}>
                        <button className={styles.clearBtn} onClick={() => { }}>Clear All</button>
                        <button onClick={onClose} className={styles.closeBtn}>
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className={styles.content}>

                    <Accordion title="Sort By">
                        <div className={styles.list}>
                            {['Reliability', 'Newest', 'Price: Low to High', 'Price: High to Low'].map(opt => (
                                <label key={opt} className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="sort"
                                        className={styles.radioInput}
                                        checked={currentSort === opt}
                                        onChange={() => onSortChange(opt)}
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                        </div>
                    </Accordion>

                    <Accordion title="Filter">
                        {/* Custom "Product Type" mapped to Categories */}
                        <div className={styles.filterSection}>
                            <h4 className={styles.filterTitle}>Product Type</h4>
                            <div className={styles.checkboxList}>
                                {availableCategories.length > 0 ? availableCategories.map(type => (
                                    <label key={type} className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(type)}
                                            onChange={() => onCategoryChange(type)}
                                        />
                                        <span>{type}</span>
                                    </label>
                                )) : <p style={{ color: '#999', fontSize: '0.9rem' }}>No categories available</p>}
                            </div>
                        </div>

                        <div className={styles.filterSection}>
                            <h4 className={styles.filterTitle}>Size</h4>
                            <div className={styles.sizeGrid}>
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'No Size'].map(size => (
                                    <label key={size} className={styles.sizeOption}>
                                        <input type="checkbox" className={styles.hiddenCheck} />
                                        <span>{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.filterSection}>
                            <h4 className={styles.filterTitle}>Color</h4>
                            <div className={styles.colorGrid}>
                                {['black', 'white', 'grey', 'blue', 'red', 'green', 'beige'].map(color => (
                                    <button
                                        key={color}
                                        className={styles.colorBtn}
                                        style={{ background: color, border: color === 'white' ? '1px solid #ddd' : 'none' }}
                                    />
                                ))}
                            </div>
                        </div>
                    </Accordion>
                </div>

                {/* Footer Actions */}
                <div className={styles.footer}>
                    <button className={styles.applyBtn} onClick={onClose}>
                        View Items
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
