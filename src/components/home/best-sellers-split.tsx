"use client";

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';

// Import default images
import menBanner from '@/images/marketing/menpage/banner1.webp';
import womenBanner from '@/images/marketing/womenpage/banner1.jpg';

interface SplitSectionProps {
    title?: string;
    subtitle?: string;
}

export default function BestSellersSplit({
    title = "BEST SELLERS",
    subtitle = "SHOP OUR MOST LOVED ITEMS"
}: SplitSectionProps) {
    return (
        <section style={{ padding: '4rem 0', background: '#fff' }}>
            <div className="container" style={{ padding: '0 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h2>
                    <p style={{ color: '#666', fontSize: '0.9rem', letterSpacing: '1px' }}>{subtitle}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', height: '600px' }}>
                    {/* MEN SIDE */}
                    <Link href="/men" style={{ position: 'relative', overflow: 'hidden', display: 'block', height: '100%' }}>
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image
                                src={menBanner}
                                alt="Men's Collection"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(0,0,0,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <button style={{
                                    background: '#fff',
                                    color: '#000',
                                    padding: '1rem 3rem',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease'
                                }}>
                                    MEN
                                </button>
                            </div>
                        </div>
                    </Link>

                    {/* WOMEN SIDE */}
                    <Link href="/women" style={{ position: 'relative', overflow: 'hidden', display: 'block', height: '100%' }}>
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image
                                src={womenBanner}
                                alt="Women's Collection"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(0,0,0,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <button style={{
                                    background: '#fff',
                                    color: '#000',
                                    padding: '1rem 3rem',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease'
                                }}>
                                    WOMEN
                                </button>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
