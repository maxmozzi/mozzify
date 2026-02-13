"use client";

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SUPPORT_DATA } from '@/data/support-articles';
import styles from '../category-support.module.css';

export default function CategorySupportPage() {
    const router = useRouter();
    const params = useParams();
    const categoryId = params.category as string;

    const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

    const category = SUPPORT_DATA.find(cat => cat.id === categoryId);

    if (!category) {
        return (
            <div className={styles.container} style={{ paddingTop: '150px', textAlign: 'center' }}>
                <h1>Category not found</h1>
                <button onClick={() => router.push('/support')} className={styles.button}>Back to Support</button>
            </div>
        );
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(`/support/${e.target.value}`);
    };

    const toggleArticle = (id: string) => {
        setExpandedArticle(expandedArticle === id ? null : id);
    };

    return (
        <div className={styles.container} style={{ paddingTop: '120px' }}>
            <header className={styles.header}>
                <h1 className={styles.kitafyTitle}>KITAFY SUPPORT</h1>
                <div className={styles.selectorContainer}>
                    <select
                        className={styles.categorySelect}
                        value={categoryId}
                        onChange={handleCategoryChange}
                    >
                        {SUPPORT_DATA.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                    </select>
                    <div className={styles.selectorArrow}>
                        <ChevronDown size={20} />
                    </div>
                </div>
            </header>

            <motion.div
                className={styles.articlesList}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {category.articles.map((article) => (
                    <div key={article.id} className={styles.articleCard}>
                        <button
                            className={styles.articleHeader}
                            onClick={() => toggleArticle(article.id)}
                        >
                            <div>
                                <h2 className={styles.articleTitle}>{article.title}</h2>
                                {article.updatedAt && (
                                    <p className={styles.articleMeta}>Updated {article.updatedAt}</p>
                                )}
                            </div>
                            {expandedArticle === article.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>

                        <AnimatePresence>
                            {expandedArticle === article.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div
                                        className={styles.articleBody}
                                        dangerouslySetInnerHTML={{ __html: article.content }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
