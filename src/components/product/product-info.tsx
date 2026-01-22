"use client";

import { useState } from 'react';
import { Star, Info } from 'lucide-react';
import styles from './product-info.module.css';
import ExpandableAccordion from './expandable-accordion';

interface ProductInfoProps {
    title: string;
    price: number;
    description: string;
}

export default function ProductInfo({ title, price, description }: ProductInfoProps) {
    const [selectedColor, setSelectedColor] = useState('Black');
    const [selectedSize, setSelectedSize] = useState('M');

    const COLORS = [
        { name: 'Black', hex: '#000000' },
        { name: 'Blue', hex: '#1e3a8a' },
        { name: 'White', hex: '#ffffff' }
    ];

    const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    return (
        <div className={styles.container}>

            {/* Trustpilot Badge */}
            <div className={styles.trustpilot}>
                <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#00b67a" color="#00b67a" />)}
                </div>
                <span className={styles.trustText}>+5000 satisfied customers</span>
            </div>

            {/* Heading */}
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.price}>{price.toFixed(2)}€</p>

            {/* Color Selector */}
            <div className={styles.selectorGroup}>
                <p className={styles.label}>Color: <strong>{selectedColor}</strong></p>
                <div className={styles.colors}>
                    {COLORS.map(c => (
                        <button
                            key={c.name}
                            className={`${styles.colorBtn} ${selectedColor === c.name ? styles.activeColor : ''}`}
                            style={{ backgroundColor: c.hex }}
                            onClick={() => setSelectedColor(c.name)}
                            aria-label={`Select ${c.name}`}
                        />
                    ))}
                </div>
            </div>

            {/* Size Selector */}
            <div className={styles.selectorGroup}>
                <div className={styles.sizeHeader}>
                    <p className={styles.label}>Size: <strong>{selectedSize}</strong></p>
                    <button className={styles.sizeGuideBtn}>Size Guide</button>
                </div>
                <div className={styles.sizes}>
                    {SIZES.map(s => (
                        <button
                            key={s}
                            className={`${styles.sizeBtn} ${selectedSize === s ? styles.activeSize : ''}`}
                            onClick={() => setSelectedSize(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Guarantee Tooltip */}
            <div className={styles.guarantee}>
                <div className={styles.tooltipParams}>
                    <span className={styles.highlight}>30-60 days easy return</span>
                    <div className={styles.tooltipWrapper}>
                        <Info size={16} className={styles.infoIcon} />
                        <div className={styles.tooltip}>
                            Return properly packed items within 60 days for a full refund.
                        </div>
                    </div>
                </div>
            </div>

            {/* Add to Cart */}
            <button className={styles.addToCartBtn}>
                ADD TO CART
            </button>

            {/* Expandable Sections */}
            <div className={styles.accordions}>
                <ExpandableAccordion title="Description">
                    <p>{description}</p>
                </ExpandableAccordion>
                <ExpandableAccordion title="Shipping info">
                    <p>Free shipping on orders over 100€. Standard delivery 3-5 business days.</p>
                </ExpandableAccordion>
                <ExpandableAccordion title="30-60 days easy return">
                    <p>We offer a hassle-free return policy. You have 60 days to return your items.</p>
                </ExpandableAccordion>
                <ExpandableAccordion title="Reviews">
                    <div className={styles.reviewPlaceholder}>
                        <Star size={16} fill="#00b67a" color="#00b67a" />
                        <Star size={16} fill="#00b67a" color="#00b67a" />
                        <Star size={16} fill="#00b67a" color="#00b67a" />
                        <Star size={16} fill="#00b67a" color="#00b67a" />
                        <Star size={16} fill="#00b67a" color="#00b67a" />
                        <p><strong>4.9/5</strong> based on Trustpilot reviews</p>
                    </div>
                </ExpandableAccordion>
            </div>

        </div>
    );
}
