'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { products } from '@/data/generated-products';

// Data for Visual Categories
// Data for Visual Categories

export default function CategoryHeader({
    title,
    productCount,
    categories = [],
    onCategoryClick,
    activeCategory, // The active sport (e.g. Football)
    subCategories, // The dynamic categories (Shoes, Clothing...)
    onSubCategoryClick,
    activeSubCategory, // The active secondary filter (e.g. Shoes)
    backButton
}: {
    title: string,
    productCount: number,
    categories?: any[],
    onCategoryClick?: (slug: string) => void,
    activeCategory?: string,
    subCategories?: any[],
    onSubCategoryClick?: (slug: string) => void,
    activeSubCategory?: string,
    backButton?: React.ReactNode
}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const subScrollRef = useRef<HTMLDivElement>(null); // Ref for sub-category row
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
            marginBottom: '-5px',
            padding: '2rem 34px 0 34px',
            backgroundColor: '#ffffff'
        }}>
            {/* Header Info */}
            <div style={{ marginBottom: '1.5rem', padding: '0' }}>
                <h1 style={{ fontSize: '44px', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: '1.2' }}>
                    {title}
                </h1>
                <p style={{ marginTop: '0.5rem', color: '#444', maxWidth: '800px', fontSize: '0.95rem' }}>
                    Tireless looks that keep up with your every move. Throw them on and head out.
                </p>
                {backButton && (
                    <div style={{ marginTop: '1rem' }}>
                        {backButton}
                    </div>
                )}
            </div>

            {/* MAIN CAROUSEL (SPORTS) */}
            <div style={{ position: 'relative' }}>
                {showLeftArrow && (
                    <button onClick={() => scroll('left')} style={arrowButtonStyle('left')}>
                        <ChevronLeft size={24} />
                    </button>
                )}
                {showRightArrow && (
                    <button onClick={() => scroll('right')} style={arrowButtonStyle('right')}>
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
                        scrollbarWidth: 'none',
                        paddingBottom: '1rem'
                    }}
                    className="no-scrollbar"
                >
                    {categories.map((cat, idx) => (
                        <CategoryCard
                            key={idx}
                            cat={cat}
                            onClick={onCategoryClick}
                            isActive={
                                activeCategory === cat.slug ||
                                (activeCategory && cat.filterValue && activeCategory.toLowerCase() === cat.filterValue.toLowerCase())
                            }
                        />
                    ))}
                </div>
            </div>

            {/* SECONDARY CAROUSEL (SUB-CATEGORIES) */}
            {subCategories && subCategories.length > 0 && (
                <div style={{
                    marginTop: '1rem',
                    borderTop: '1px solid #eee',
                    paddingTop: '1rem',
                    paddingBottom: '0.5rem'
                }}>
                    <div
                        ref={subScrollRef}
                        style={{
                            display: 'flex',
                            gap: '0.8rem',
                            overflowX: 'auto',
                            paddingBottom: '0.5rem',
                            scrollbarWidth: 'none'
                        }}
                        className="no-scrollbar"
                    >
                        <SubCategoryPill
                            label="All"
                            isActive={!activeSubCategory}
                            onClick={() => onSubCategoryClick?.('all')}
                        />
                        {subCategories.map((sub, idx) => (
                            <SubCategoryPill
                                key={idx}
                                label={sub.name}
                                isActive={activeSubCategory === (sub.filterValue || sub.slug)}
                                onClick={() => onSubCategoryClick?.(sub.filterValue || sub.slug)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function SubCategoryPill({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '0.4rem 1.2rem',
                borderRadius: '20px',
                border: isActive ? '1px solid black' : '1px solid #e5e5e5',
                background: isActive ? 'black' : 'white',
                color: isActive ? 'white' : 'black',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
            }}
        >
            {label}
        </button>
    );
}

function CategoryCard({ cat, onClick, isActive }: { cat: any, onClick?: (slug: string) => void, isActive?: boolean }) {
    const isViewAll = cat.isViewAll;
    const width = '350px';
    const imageHeight = '430px';

    const cardStyle: React.CSSProperties = {
        minWidth: width,
        width: width,
        textDecoration: 'none',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        border: isActive ? '2px solid black' : '1px solid #e5e5e5', // Active border
        cursor: 'pointer',
        transform: isActive ? 'scale(0.98)' : 'none',
        transition: 'all 0.2s ease'
    };

    const content = (
        <>
            <div style={{
                position: 'relative',
                height: imageHeight,
                backgroundColor: '#f5f5f5',
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
                height: 'auto',
                minHeight: '60px',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '1rem'
            }}>
                {cat.name}
            </div>
        </>
    );

    if (onClick) {
        return (
            <div style={cardStyle} onClick={() => onClick(cat.filterValue || cat.name || cat.slug)}>
                {content}
            </div>
        );
    }

    return (
        <Link href={`/${cat.slug}`} style={cardStyle}>
            {content}
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

