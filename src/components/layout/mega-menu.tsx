"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './mega-menu.module.css';
import { navigation, MenuItem } from '@/data/navigation';
import { useGender } from '@/context/gender-context';

export default function MegaMenu() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const { gender } = useGender();

    const getLinkWithGender = (path: string) => {
        if (!path) return path;
        if (gender !== 'unisex') {
            return path.replace('/unisex', `/${gender}`);
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

    const getLinkWithGender = (path: string) => {
        if (!path) return path;
        if (gender !== 'unisex') {
            return path.replace('/unisex', `/${gender}`);
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
                <div className={styles.grid2}>
                    {activeItem.columns.map((column, colIdx) => (
                        <div key={colIdx}>
                            <h4 className={styles.columnTitle}>{column.title}</h4>
                            <ul className={column.title === 'Brands' ? styles.linkListGrid : styles.linkList}>
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
