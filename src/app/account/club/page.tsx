"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Shield, Zap, Crown, Diamond, Gift, Truck, Clock, Sparkles } from 'lucide-react';
import styles from '@/styles/account.module.css';

const TIERS = [
    {
        id: 'beginner',
        name: 'Beginner',
        icon: <Star size={24} />,
        points: '0 - 500',
        color: '#9ca3af',
        bg: '#f3f4f6',
        benefits: ['Sign-up welcome reward', 'Regular newsletter access', 'Basic customer support']
    },
    {
        id: 'bronze',
        name: 'Bronze',
        icon: <Shield size={24} />,
        points: '500 - 2,500',
        color: '#b45309',
        bg: '#fef3c7',
        benefits: ['5% discount on all orders', 'Early access to seasonal sales', 'Priority customer support']
    },
    {
        id: 'silver',
        name: 'Silver',
        icon: <Zap size={24} />,
        points: '2,500 - 10,000',
        color: '#374151',
        bg: '#f3f4f6',
        benefits: ['10% discount on all orders', 'Free express shipping on all orders', 'Exclusive early access to new drops']
    },
    {
        id: 'gold',
        name: 'Gold',
        icon: <Crown size={24} />,
        points: '10,000 - 50,000',
        color: '#ca8a04',
        bg: '#fffbeb',
        benefits: ['15% discount on all orders', 'Special birthday gift box', 'Access to VIP exclusive products', 'Double points on all purchases']
    },
    {
        id: 'diamond',
        name: 'Diamond',
        icon: <Diamond size={24} />,
        points: '50,000+',
        color: '#4338ca',
        bg: '#eef2ff',
        benefits: ['20% discount on all orders', 'Personal style concierge', 'VIP event invitations', 'White-glove international returns for life']
    }
];

export default function ClubPage() {
    const userPoints = 450;
    const currentTierIndex = 0; // Beginner (close to Bronze)
    const nextTier = TIERS[currentTierIndex + 1];
    const pointsToNext = TIERS[currentTierIndex + 1].name === 'Bronze' ? 500 - userPoints : 0;
    const progressPercentage = (userPoints / 500) * 100;

    return (
        <div className={styles.dashboardContainer} style={{ paddingTop: '120px', paddingBottom: '100px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Link href="/account" className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <ChevronLeft size={16} /> Back to Account
                </Link>

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className={styles.title} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Mozzi Club</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Your loyalty matters. Earn points with every purchase and unlock exclusive status, rewards, and world-class services.
                    </p>
                </div>

                {/* Current Status Card */}
                <div style={{
                    background: 'black',
                    color: 'white',
                    padding: '3rem',
                    borderRadius: '12px',
                    marginBottom: '5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.1 }}>
                        <Crown size={200} />
                    </div>

                    <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '1rem' }}>Current Status</span>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>{TIERS[currentTierIndex].name}</h2>

                    <div style={{ width: '100%', maxWidth: '500px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            <span>{userPoints} Points</span>
                            <span>Next Tier: {nextTier.name} ({pointsToNext} to go)</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                style={{ height: '100%', background: 'white' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Levels Grid */}
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', marginBottom: '3rem' }}>The Progression</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {TIERS.map((tier, idx) => (
                        <motion.div
                            key={tier.id}
                            whileHover={{ y: -10 }}
                            style={{
                                background: 'white',
                                border: '1px solid #eee',
                                borderRadius: '12px',
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                opacity: idx <= currentTierIndex ? 1 : 0.6
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '30px',
                                background: tier.bg,
                                color: tier.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                {tier.icon}
                            </div>

                            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>{tier.name}</h4>
                            <span style={{ fontSize: '0.85rem', color: '#999', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1.5rem' }}>{tier.points} Points</span>

                            <div style={{ flex: 1 }}>
                                <h5 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#333', marginBottom: '1rem' }}>Privileges:</h5>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {tier.benefits.map((benefit, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', color: '#666', marginBottom: '0.75rem' }}>
                                            <Sparkles size={14} style={{ marginTop: '0.2rem', flexShrink: 0, color: tier.color }} />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {idx === currentTierIndex && (
                                <div style={{
                                    marginTop: '2rem',
                                    padding: '0.75rem',
                                    background: 'black',
                                    color: 'white',
                                    textAlign: 'center',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    fontWeight: 700
                                }}>
                                    CURRENT STATUS
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* FAQ / How to earn Section */}
                <div style={{ marginTop: '6rem', background: '#f9f9f9', padding: '4rem', borderRadius: '12px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', marginBottom: '3rem' }}>How to Earn Points</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', textAlign: 'center' }}>
                        <div>
                            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}><Gift size={32} /></div>
                            <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Make a Purchase</h4>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>Earn 1 point for every €1 spent in our store. Gold and Diamond members earn double.</p>
                        </div>
                        <div>
                            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}><Clock size={32} /></div>
                            <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Anniversary Bonus</h4>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>Get 500 bonus points every year on the anniversary of joining Mozzi Club.</p>
                        </div>
                        <div>
                            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}><Truck size={32} /></div>
                            <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Review & Share</h4>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>Earn 50 points for every verified product review and 100 points for successful referrals.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
