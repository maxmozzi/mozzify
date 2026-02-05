"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Package, Eye } from 'lucide-react';
import styles from '@/styles/account.module.css';

export default function OrdersPage() {
    // Placeholder data
    const orders = [
        { id: '#MOZ-4921', date: 'Feb 02, 2026', total: '€189.00', status: 'Processing', items: 2 },
        { id: '#MOZ-4815', date: 'Jan 15, 2026', total: '€79.00', status: 'Delivered', items: 1 },
        { id: '#MOZ-4702', date: 'Dec 20, 2025', total: '€245.00', status: 'Delivered', items: 3 },
        { id: '#MOZ-4655', date: 'Nov 12, 2025', total: '€112.00', status: 'Delivered', items: 1 },
    ];

    return (
        <div className={styles.dashboardContainer} style={{ paddingTop: '120px' }}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Link href="/account" className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <ChevronLeft size={16} /> Back to Dashboard
                </Link>

                <h1 className={styles.title}>Order History</h1>

                <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-primary)' }}>
                                <th style={{ padding: '1rem', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>Order</th>
                                <th style={{ padding: '1rem', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>Date</th>
                                <th style={{ padding: '1rem', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>Status</th>
                                <th style={{ padding: '1rem', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>Items</th>
                                <th style={{ padding: '1rem', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>Total</th>
                                <th style={{ padding: '1rem', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem', textAlign: 'right' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: '1.5rem 1rem', fontWeight: 500 }}>
                                        <Link href={`/account/orders/${encodeURIComponent(order.id)}`} className={styles.link} style={{ fontWeight: 600 }}>
                                            {order.id}
                                        </Link>
                                    </td>
                                    <td style={{ padding: '1.5rem 1rem', color: 'var(--color-secondary)' }}>{order.date}</td>
                                    <td style={{ padding: '1.5rem 1rem' }}>
                                        <span className={`${styles.status} ${order.status === 'Delivered' ? styles.statusDelivered : styles.statusProcessing}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.5rem 1rem' }}>{order.items}</td>
                                    <td style={{ padding: '1.5rem 1rem', fontWeight: 500 }}>{order.total}</td>
                                    <td style={{ padding: '1.5rem 1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                                            <Link
                                                href="#"
                                                className={styles.link}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    fontSize: '0.8rem',
                                                    color: 'var(--color-primary)',
                                                    fontWeight: 600,
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                <Package size={14} /> Track Order
                                            </Link>
                                            <Link
                                                href={`/account/orders/${encodeURIComponent(order.id)}`}
                                                className={styles.link}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    fontSize: '0.8rem',
                                                    color: '#666',
                                                    fontWeight: 500,
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                <Eye size={14} /> View Details
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
