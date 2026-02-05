"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, Package, Truck, Camera, ExternalLink, Calendar, CreditCard } from 'lucide-react';
import styles from '@/styles/account.module.css';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
    const orderId = decodeURIComponent(params.id);

    // Mock data for a single order
    const order = {
        id: orderId,
        date: 'Feb 02, 2026',
        status: 'Processing',
        trackingNumber: 'LP829304112CN',
        shippingMethod: 'Express Shipping (China Post)',
        total: '€189.00',
        paymentMethod: 'Credit Card (ending in 8214)',
        items: [
            { id: 'AMI-H-001', name: 'Ami de Coeur Hoodie - Black', price: '€89.00', qty: 1, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&h=800&auto=format&fit=crop' },
            { id: 'BAL-S-042', name: 'Balenciaga Track Sneakers - White', price: '€100.00', qty: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&h=800&auto=format&fit=crop' },
        ],
        qcPhotos: [
            'https://images.unsplash.com/photo-1581235720704-06d3acfcba8e?q=80&w=400&h=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=400&h=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1582845550244-48f8885be870?q=80&w=400&h=400&auto=format&fit=crop'
        ]
    };

    return (
        <div className={styles.dashboardContainer} style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Header Section */}
                <div style={{ marginBottom: '3rem' }}>
                    <Link href="/account/orders" className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <ChevronLeft size={16} /> Back to Orders
                    </Link>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div>
                            <span style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order Details</span>
                            <h1 className={styles.title} style={{ margin: '0.5rem 0' }}>{order.id}</h1>
                            <div style={{ display: 'flex', gap: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {order.date}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Package size={14} /> {order.items.length} Items</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <span className={`${styles.status} ${order.status === 'Delivered' ? styles.statusDelivered : styles.statusProcessing}`} style={{ padding: '0.5rem 1.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3rem' }}>
                    {/* Left Column: Items */}
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Items in this order</h2>
                        <div style={{ border: '1px solid #eee', borderRadius: '4px', overflow: 'hidden' }}>
                            {order.items.map((item, idx) => (
                                <div key={item.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', borderBottom: idx === order.items.length - 1 ? 'none' : '1px solid #eee', background: 'white' }}>
                                    <div style={{ width: '100px', height: '120px', position: 'relative', background: '#f7f7f7' }}>
                                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <h3 style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                                            <p style={{ color: '#999', fontSize: '0.85rem' }}>SKU: {item.id}</p>
                                            <p style={{ marginTop: '0.5rem', fontWeight: 500 }}>Qty: {item.qty}</p>
                                        </div>
                                        <div style={{ textAlign: 'right', fontWeight: 600 }}>
                                            {item.price}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Photos Section */}
                        <div style={{ marginTop: '4rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <Camera size={20} />
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>Order Verification Photos</h2>
                            </div>
                            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                                These photos were taken at our logistics center in China before shipping to ensure quality.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                {order.qcPhotos.map((photo, i) => (
                                    <div key={i} style={{ aspectRatio: '1/1', position: 'relative', background: '#f7f7f7', border: '1px solid #eee' }}>
                                        <Image src={photo} alt={`QC Photo ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Summaries & Tracking */}
                    <aside>
                        {/* Tracking Card */}
                        <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '4px', marginBottom: '2rem', border: '1px solid #eee' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                <Truck size={18} /> Order Tracking
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>Carrier: {order.shippingMethod}</p>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>{order.trackingNumber}</div>
                            <Link
                                href="#"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    background: 'black',
                                    color: 'white',
                                    padding: '1rem',
                                    borderRadius: '4px',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.9rem'
                                }}
                            >
                                Track on Website <ExternalLink size={14} />
                            </Link>
                        </div>

                        {/* Order Summary */}
                        <div style={{ padding: '0 1rem' }}>
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Payment Summary</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#666' }}>Subtotal</span>
                                    <span>{order.total}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#666' }}>Shipping</span>
                                    <span style={{ color: '#22c55e' }}>Free</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #eee', fontWeight: 700, fontSize: '1.1rem' }}>
                                    <span>Total</span>
                                    <span>{order.total}</span>
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: '0.85rem' }}>
                                <CreditCard size={14} /> {order.paymentMethod}
                            </div>
                        </div>
                    </aside>
                </div>
            </motion.div>

            <style jsx>{`
                @media (max-width: 991px) {
                    div[style*="gridTemplateColumns: 1fr 340px"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
