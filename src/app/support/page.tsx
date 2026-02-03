"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Truck, RotateCcw, CreditCard, Settings, ShoppingBag, HelpCircle, ChevronRight } from 'lucide-react';
import styles from './support.module.css';

export default function SupportPage() {

    const categories = [
        {
            id: 'orders',
            title: 'Orders & Delivery',
            icon: <Truck size={32} strokeWidth={1.5} />,
            links: [
                { label: 'Delivery Information', href: '#' },
                { label: 'How do I track my order?', href: '#' },
                { label: 'I have a problem with my order', href: '#' },
            ],
            seeAll: 'See all 6 articles'
        },
        {
            id: 'returns',
            title: 'Returns & Refunds',
            icon: <RotateCcw size={32} strokeWidth={1.5} />,
            links: [
                { label: 'How do I return my items?', href: '#' },
                { label: 'Returns Policy', href: '#' },
                { label: 'Still Waiting on Your Refund or Exchange?', href: '#' },
            ],
            seeAll: 'See all 7 articles'
        },
        {
            id: 'payments',
            title: 'Payments & Promotions',
            icon: <CreditCard size={32} strokeWidth={1.5} />,
            links: [
                { label: 'Mozzify Loyalty', href: '#' },
                { label: 'Refer A Friend', href: '#' },
                { label: 'Discounts', href: '#' },
            ],
            seeAll: 'See all 8 articles'
        },
        {
            id: 'technical',
            title: 'Technical',
            icon: <Settings size={32} strokeWidth={1.5} />,
            links: [
                { label: 'The Mozzify App', href: '#' },
                { label: 'Accessing My Mozzify Account', href: '#' },
                { label: 'Delete My Mozzify Account', href: '#' },
            ],
            seeAll: 'See all 6 articles'
        },
        {
            id: 'product',
            title: 'Product',
            icon: <ShoppingBag size={32} strokeWidth={1.5} />,
            links: [
                { label: "Women's Size Guide", href: '#' },
                { label: "Men's Size Guide", href: '#' },
                { label: "What is Mozzify's commitment to sustainability?", href: '#' },
            ],
            seeAll: 'See all 8 articles'
        },
        {
            id: 'general',
            title: 'General Information',
            icon: <HelpCircle size={32} strokeWidth={1.5} />,
            links: [
                { label: 'Sign up to Marketing', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Mozzify Regent St London', href: '#' },
            ],
            seeAll: 'See all 6 articles'
        },
    ];

    const popularQuestions = [
        "Where is my order?",
        "How do I make a return?",
        "Do you offer student discount?",
        "Can I change my order after placing it?"
    ];

    return (
        <div className={styles.container} style={{ paddingTop: '120px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Header & Search */}
                <div className={styles.hero}>
                    <h1 className={styles.title}>How can we help?</h1>
                    <div className={styles.searchContainer}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Search for answers..."
                        />
                    </div>
                </div>

                {/* Return CTA */}
                <div className={styles.returnBanner}>
                    <p className={styles.returnText}>Need to return an item? No problem!</p>
                    <Link href="#" className={styles.returnLink}>Start your return HERE</Link>
                </div>

                {/* Quick Links Grid */}
                <div className={styles.grid}>
                    {categories.map(cat => (
                        <div key={cat.id} className={styles.card}>
                            {/* Default State */}
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    {cat.icon}
                                </div>
                                <h3 className={styles.cardTitle}>{cat.title}</h3>
                            </div>

                            {/* Hover State - Content */}
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle} style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>{cat.title}</h3>
                                <ul className={styles.linkList}>
                                    {cat.links.map((link, i) => (
                                        <li key={i}>
                                            <Link href={link.href} className={styles.linkItem}>
                                                {link.label}
                                                <ChevronRight size={14} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <span className={styles.seeAll}>{cat.seeAll}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Popular Questions */}
                <div className={styles.faqSection}>
                    <div className={styles.faqHeader}>
                        <h2 className={styles.faqTitle}>Got a question?</h2>
                        <p style={{ color: '#666' }}>Check out our popular articles below to find the answer you're looking for.</p>
                    </div>
                    <div className={styles.faqList}>
                        {popularQuestions.map((q, i) => (
                            <div key={i} className={styles.faqItem}>
                                <p className={styles.faqQuestion}>{q}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
