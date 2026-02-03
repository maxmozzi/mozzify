'use client';

import { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import styles from './sticky-filter-bar.module.css';

interface StickyFilterBarProps {
    onFilterClick: () => void;
    currentSort: string;
    onSortChange: (sort: string) => void;
}

export default function StickyFilterBar({ onFilterClick, currentSort, onSortChange }: StickyFilterBarProps) {
    const [isVisible, setIsVisible] = useState(true);

    // Hide when reaching footer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If footer is intersecting (visible), hide the bar
                setIsVisible(!entry.isIntersecting);
            },
            { threshold: 0 } // Trigger as soon as 1px of footer is visible
        );

        const footer = document.getElementById('site-footer');
        if (footer) {
            observer.observe(footer);
        }

        return () => {
            if (footer) observer.unobserve(footer);
        };
    }, []);

    // Sort Options
    const SORT_OPTIONS = [
        'Price: Low to High',
        'Price: High to Low',
        'Relevancy',
        'Newest'
    ];

    return (
        <div
            className={styles.stickyBar}
            style={{
                transform: isVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(200%)',
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none'
            }}
        >
            <div className={styles.container}>

                {/* Left: Sort Options Dropdown */}
                <div className={styles.sortGroup}>
                    <span className={styles.sortByLabel}>SORT BY</span>

                    <div className={styles.sortDropdownWrapper}>
                        <button className={styles.sortTrigger}>
                            {currentSort} <ChevronDown size={14} />
                        </button>

                        <div className={styles.sortDropdownMenu}>
                            {SORT_OPTIONS.map(opt => (
                                <button
                                    key={opt}
                                    className={`${styles.sortOption} ${currentSort === opt ? styles.activeOption : ''}`}
                                    onClick={() => onSortChange(opt)}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Filter Toggle */}
                <button className={styles.filterToggleBtn} onClick={onFilterClick}>
                    <span>FILTER</span>
                    <SlidersHorizontal size={18} />
                </button>
            </div>
        </div>
    );
}
