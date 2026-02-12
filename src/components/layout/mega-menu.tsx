"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './mega-menu.module.css';
import { navigation, MenuItem, NavSection } from '@/data/navigation';
import { useGender } from '@/context/gender-context';

export default function MegaMenu() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const { gender } = useGender();

    const getLinkWithGender = (path: string) => {
        if (!path) return path;
        if (!path.includes('/unisex')) return path;
        if (gender !== 'unisex') {
            return path.replace('/unisex', `/${gender === 'men' ? 'mens' : 'womens'}`);
        }
        return path;
    };

    return (
        <nav className={styles.megaNav} onMouseLeave={() => setActiveMenu(null)}>
            <ul className={styles.navList}>
                {navigation.main.map((item) => (
                    <li
                        key={item.id}
                        className={styles.navItem}
                        onMouseEnter={() => setActiveMenu(item.id)}
                    >
                        {item.href ? (
                            <Link
                                href={getLinkWithGender(item.href)}
                                className={styles.navLink}
                                style={item.isRed ? { color: 'red' } : {}}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className={styles.navLink}>{item.label}</span>
                        )}
                    </li>
                ))}
            </ul>

            <AnimatePresence>
                {activeMenu && (
                    <MenuDropdown
                        activeId={activeMenu}
                        items={navigation.main}
                        gender={gender}
                    />
                )}
            </AnimatePresence>
        </nav>
    );
}

function MenuDropdown({ activeId, items, gender }: { activeId: string, items: MenuItem[], gender: string }) {
    const activeItem = items.find(item => item.id === activeId);

    if (!activeItem || !activeItem.columns || activeItem.columns.length === 0) {
        return null;
    }

    // Helper to chunk items
    // Define a local type that extends the existing column type with a flag
    type ProcessedColumn = NavSection & { isGrid: boolean };

    const processColumns = (cols: typeof activeItem.columns): ProcessedColumn[] => {
        const processed: ProcessedColumn[] = [];
        if (!cols) return processed;

        cols.forEach(col => {
            const isBrands = col.title === 'Brands';
            // Brands uses a 2-column grid, so 5 rows = 10 items.
            // Others use a 1-column list, so 5 rows = 5 items.
            const limit = isBrands ? 10 : 5;

            if (col.items.length <= limit) {
                processed.push({ ...col, isGrid: isBrands });
            } else {
                // Split into chunks
                for (let i = 0; i < col.items.length; i += limit) {
                    processed.push({
                        ...col,
                        title: i === 0 ? col.title : '', // Only show title on first column
                        items: col.items.slice(i, i + limit),
                        isGrid: isBrands
                    });
                }
            }
        });
        return processed;
    };

    const displayColumns = processColumns(activeItem.columns);

    const getLinkWithGender = (path: string) => {
        if (!path) return path;
        if (!path.includes('/unisex')) return path;
        if (gender !== 'unisex') {
            return path.replace('/unisex', `/${gender === 'men' ? 'mens' : 'womens'}`);
        }
        return path;
    };

    return (
        <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className={`container ${styles.dropdownContent}`}>
                <div className={styles.flexContainer}>
                    {displayColumns.map((column, colIdx) => (
                        <div key={colIdx}>
                            {/* Render title if it exists, otherwise maintain spacing if needed */}
                            {column.title ? (
                                <h4 className={styles.columnTitle}>{column.title}</h4>
                            ) : (
                                /* If title is suppressed (continuation column), add spacer equal to title height approx */
                                <div style={{ height: '31px', marginBottom: '1rem' }} aria-hidden="true" />
                            )}

                            <ul className={column.isGrid ? styles.linkListGrid : styles.linkList}>
                                {column.items.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link href={getLinkWithGender(link.href)}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
