"use client";
import styles from './reviews-carousel.module.css';
import { Star } from 'lucide-react';
import { products } from '@/data/generated-products';
import Image from 'next/image';

// Safe product image selector
const getProductImage = (index: number) => {
    const product = products[index % products.length];
    return product ? product.image : null;
};

// Mock Data with Real Images
const REVIEWS = [
    { id: 1, user: 'Alex M.', rating: 5, text: "The quality of this hoodie is insane. Fits perfectly oversized.", image: getProductImage(0) },
    { id: 2, user: 'Sarah K.', rating: 5, text: "Obsessed with the Ami Paris tee. Super soft fabric.", image: getProductImage(1) },
    { id: 3, user: 'Jordan P.', rating: 4, text: "Great detailed design on the jeans. Fast shipping too.", image: getProductImage(2) },
    { id: 4, user: 'Maria L.', rating: 5, text: "Best purchase I've made this year. Worth every penny.", image: getProductImage(3) },
    { id: 5, user: 'David R.', rating: 5, text: "The fit is exactly what I was looking for. 10/10.", image: getProductImage(4) },
    { id: 6, user: 'Emily W.', rating: 5, text: "Love the packaging and the product is top tier.", image: getProductImage(5) },
    { id: 7, user: 'Chris B.', rating: 4, text: "Really cool design. Will definitely buy again.", image: getProductImage(6) },
    { id: 8, user: 'Jessica T.', rating: 5, text: "My boyfriend loved the gift. Amazing quality.", image: getProductImage(7) },
    { id: 9, user: 'Ryan G.', rating: 5, text: "Looks even better in person. exceeded expectations.", image: getProductImage(8) },
    { id: 10, user: 'Chloe D.', rating: 5, text: "Super stylish and comfortable. My new favorite brand.", image: getProductImage(9) },
];

// Duplicate for seamless loop
const MARQUEE_ITEMS = [...REVIEWS, ...REVIEWS];

export default function ReviewsCarousel() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Estos son algunos de los clientes que confiarón en nosotros</h2>

            <div className={styles.carouselContainer}>
                <div className={styles.track}>
                    {MARQUEE_ITEMS.map((review, index) => (
                        <div key={`${review.id}-${index}`} className={styles.card}>
                            {/* 1. Product Photo (Rounded & Shadowed via CSS) */}
                            <div className={styles.imageWrapper}>
                                {review.image && (
                                    <Image
                                        src={review.image}
                                        alt="Product"
                                        fill
                                        className={styles.productImage}
                                        style={{ objectFit: 'cover' }}
                                    />
                                )}
                            </div>

                            <div className={styles.content}>
                                {/* 2. Stars */}
                                <div className={styles.stars}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill={i < review.rating ? "#000" : "none"}
                                            color="#000"
                                            strokeWidth={1.5}
                                        />
                                    ))}
                                </div>

                                {/* 3. User Name */}
                                <span className={styles.username}>{review.user}</span>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
