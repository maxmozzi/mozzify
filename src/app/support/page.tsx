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
                { label: 'Delivery Information', href: '/support/orders' },
                { label: 'How do I track my order?', href: '/support/orders' },
                { label: 'I have a problem with my order', href: '/support/orders' },
            ],
            seeAll: 'See all 6 articles'
        },
        {
            id: 'returns',
            title: 'Returns & Refunds',
            icon: <RotateCcw size={32} strokeWidth={1.5} />,
            links: [
                { label: 'How do I return my items?', href: '/support/returns' },
                { label: 'Returns Policy', href: '/support/returns' },
                { label: 'Still Waiting on Your Refund or Exchange?', href: '/support/returns' },
            ],
            seeAll: 'See all 7 articles'
        },
        {
            id: 'payments',
            title: 'Payments & Promotions',
            icon: <CreditCard size={32} strokeWidth={1.5} />,
            links: [
                { label: 'Mozzify Loyalty', href: '/support/payments' },
                { label: 'Refer A Friend', href: '/support/payments' },
                { label: 'Discounts', href: '/support/payments' },
            ],
            seeAll: 'See all 8 articles'
        },
        {
            id: 'technical',
            title: 'Technical',
            icon: <Settings size={32} strokeWidth={1.5} />,
            links: [
                { label: 'The Mozzify App', href: '/support/technical' },
                { label: 'Accessing My Mozzify Account', href: '/support/technical' },
                { label: 'Delete My Mozzify Account', href: '/support/technical' },
            ],
            seeAll: 'See all 6 articles'
        },
        {
            id: 'product',
            title: 'Product',
            icon: <ShoppingBag size={32} strokeWidth={1.5} />,
            links: [
                { label: "Women's Size Guide", href: '/support/product' },
                { label: "Men's Size Guide", href: '/support/product' },
                { label: "What is Mozzify's commitment to sustainability?", href: '/support/product' },
            ],
            seeAll: 'See all 8 articles'
        },
        {
            id: 'general',
            title: 'General Information',
            icon: <HelpCircle size={32} strokeWidth={1.5} />,
            links: [
                { label: 'Sign up to Marketing', href: '/support/general' },
                { label: 'Careers', href: '/support/general' },
                { label: 'Mozzify Regent St London', href: '/support/general' },
            ],
            seeAll: 'See all 6 articles'
        },
    ];

    const popularQuestions = [
        { label: "Delivery Information", href: "/support/orders" },
        { label: "How do I track my order?", href: "/support/orders" },
        { label: "How do I return my items?", href: "/support/returns" },
        { label: "Returns Policy", href: "/support/returns" },
        { label: "Mozzify Loyalty", href: "/support/payments" },
        { label: "Discounts", href: "/support/payments" }
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
                                <Link href={`/support/${cat.id}`} className={styles.seeAll}>{cat.seeAll}</Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Popular Questions */}
                <div className={styles.faqSection}>
                    <div className={styles.faqHeader}>
                        <h2 className={styles.faqTitle}>Popular Questions</h2>
                        <p style={{ color: '#666' }}>Got a question? Check out our popular articles below to find the answer you're looking for.</p>
                    </div>
                    <div className={styles.faqList}>
                        {popularQuestions.map((q, i) => (
                            <Link key={i} href={q.href} className={styles.faqItem}>
                                <p className={styles.faqQuestion}>{q.label}</p>
                            </Link>
                        ))}
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
