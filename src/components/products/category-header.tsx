'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { products } from '@/data/generated-products';

// Data for Visual Categories
// Data for Visual Categories
const CATEGORIES = [
    { name: 'View All', slug: 'all', isViewAll: true },
    { name: 'Hoodies', slug: 'hoodies', image: products.find(p => p.category === 'Hoodies')?.image },
    { name: 'Sweaters', slug: 'sweaters', image: products.find(p => p.category === 'Sweater')?.image },
    { name: 'Polos', slug: 'polos', image: products.find(p => p.category === 'Polo')?.image },
    { name: 'Shorts', slug: 'shorts', image: products.find(p => p.category === 'Shorts')?.image },
    // Fallbacks or other categories if they exist
    { name: 'Denim', slug: 'jeans', image: products.find(p => p.category === 'Jeans' || p.category === 'Denim Jeans')?.image },
    { name: 'Accessories', slug: 'accessories', image: products.find(p => p.category === 'Accessories' || p.category === 'Iphone case')?.image },
];

export default function CategoryHeader({ title, productCount }: { title: string, productCount: number }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400; // Approx card width + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div style={{
            marginBottom: '10px',
            padding: '2rem 34px 0 34px', // 24px padding on sides, 0 on bottom, 2rem on top
            backgroundColor: '#ffffff'
        }}>
            {/* Header Info */}
            <div className="container" style={{ marginBottom: '1.5rem', padding: '0' }}>
                <h1 style={{ fontSize: '44px', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: '1.2' }}>
                    {title}
                </h1>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem', fontWeight: 'normal' }}>
                    {productCount} Products
                </p>
                {/* Optional description text similar to Gymshark if needed */}
                <p style={{ marginTop: '0.5rem', color: '#444', maxWidth: '800px', fontSize: '0.95rem' }}>
                    Tireless looks that keep up with your every move. Throw them on and head out.
                </p>
            </div>

            {/* Visual Carousel */}
            <div style={{ position: 'relative' }}>

                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        style={arrowButtonStyle('left')}
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}

                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        style={arrowButtonStyle('right')}
                    >
                        <ChevronRight size={24} />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    style={{
                        display: 'flex',
                        gap: '1.5rem',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none', // Firefox
                        paddingBottom: '1rem'
                    }}
                    className="no-scrollbar" // Utility class for hiding scrollbar
                >
                    {CATEGORIES.map((cat, idx) => (
                        <CategoryCard key={idx} cat={cat} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function CategoryCard({ cat }: { cat: any }) {
    const isViewAll = cat.isViewAll;
    const width = '350px';
    const imageHeight = '430px';

    return (
        <Link
            href={`/${cat.slug}`}
            style={{
                minWidth: width,
                width: width,
                textDecoration: 'none',
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e5e5e5',
                // borderRadius: '4px', // Optional: if they want slightly rounded corners like a card
            }}
        >
            <div style={{
                position: 'relative',
                height: imageHeight,
                backgroundColor: '#f5f5f5',
                // marginBottom: '1rem', // Removed margin to attach text directly or with padding inside card
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {isViewAll ? (
                    <span style={{ fontWeight: 600, textDecoration: 'underline' }}>View All</span>
                ) : (
                    <>
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            background: 'white',
                            padding: '0.3rem 0.6rem',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            zIndex: 2,
                            letterSpacing: '0.5px'
                        }}>
                            Most Popular
                        </div>
                        <Image
                            src={cat.image || '/placeholder.jpg'}
                            alt={cat.name}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </>
                )}
            </div>

            <div style={{
                height: 'auto', // Allow it to fit content, was 60px fixed
                minHeight: '60px',
                display: 'flex',
                alignItems: 'center', // Vertically center text in the footer area
                fontWeight: 600,
                fontSize: '1rem',
                padding: '1rem' // Add padding inside the card for the text
            }}>
                {cat.name}
            </div>
        </Link>
    );
}

const arrowButtonStyle = (position: 'left' | 'right') => ({
    position: 'absolute' as const,
    [position]: '1.5rem',
    top: '40%', // Align with image center roughly
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'white',
    border: '1px solid #e5e5e5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
});
