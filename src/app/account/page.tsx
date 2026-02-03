"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Package, MapPin, ChevronRight, LogOut } from 'lucide-react';
import styles from '@/styles/account.module.css';
import EditProfileModal from '@/components/account/edit-profile-modal';

export default function AccountPage() {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    // Placeholder data
    const recentOrders = [
        { id: '#MOZ-4921', date: 'Feb 02, 2026', total: '€189.00', status: 'Processing' },
        { id: '#MOZ-4815', date: 'Jan 15, 2026', total: '€79.00', status: 'Delivered' },
    ];

    return (
        <div className={styles.dashboardContainer} style={{ paddingTop: '120px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
                    <h1 className={styles.title} style={{ margin: 0 }}>My Account</h1>
                </div>

                <div className={styles.dahboardGrid}>
                    {/* Orders Card */}
                    <div className={styles.card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 className={styles.cardTitle}>Recent Orders</h2>
                            <Link href="/account/orders" className={styles.link} style={{ fontSize: '0.8rem' }}>View All</Link>
                        </div>
                        <ul className={styles.orderList}>
                            {recentOrders.map(order => (
                                <li key={order.id} className={styles.orderItem}>
                                    <div>
                                        <p style={{ fontWeight: 600 }}>{order.id}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-secondary)' }}>{order.date}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p>{order.total}</p>
                                        <span className={`${styles.status} ${order.status === 'Delivered' ? styles.statusDelivered : styles.statusProcessing}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Personal Info Card */}
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Personal Information</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-secondary)', letterSpacing: '0.05em' }}>Name</p>
                                <p>Max Mozzi</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-secondary)', letterSpacing: '0.05em' }}>Email</p>
                                <p>max.mozzify@example.com</p>
                            </div>
                            <button
                                className={styles.link}
                                style={{ alignSelf: 'flex-start', fontSize: '0.9rem', marginTop: '1rem' }}
                                onClick={() => setIsEditProfileOpen(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Addresses Card */}
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Primary Address</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <p>Calle de la Moda, 123</p>
                            <p>Piso 4, Puerta B</p>
                            <p>08001 Barcelona, Spain</p>
                            <Link href="/account/address" className={styles.link} style={{ alignSelf: 'flex-start', fontSize: '0.9rem', marginTop: '1.5rem' }}>Manage Addresses</Link>
                        </div>
                    </div>
                </div>
            </motion.div>

            <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
        </div>
    );
}
