"use client";
import styles from './reviews-carousel.module.css';
import { Star } from 'lucide-react';
import Image from 'next/image';

import { products } from '@/data/generated-products';

// Mock Data
const REVIEWS = [
    { id: 1, user: 'Alex M.', rating: 5, text: "The quality of this hoodie is insane. Fits perfectly oversized.", image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=500&auto=format&fit=crop' },
    { id: 2, user: 'Sarah K.', rating: 5, text: "Obsessed with the Ami Paris tee. Super soft fabric.", image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=500&auto=format&fit=crop' },
    { id: 3, user: 'Jordan P.', rating: 4, text: "Great detailed design on the jeans. Fast shipping too.", image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=500&auto=format&fit=crop' },
    { id: 4, user: 'Maria L.', rating: 5, text: "Best purchase I've made this year. Worth every penny.", image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500&auto=format&fit=crop' },
    { id: 5, user: 'David R.', rating: 5, text: "The fit is exactly what I was looking for. 10/10.", image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500&auto=format&fit=crop' },
    { id: 6, user: 'Emily W.', rating: 5, text: "Love the packaging and the product is top tier.", image: 'https://images.unsplash.com/photo-1529139574466-a302d2d3f524?q=80&w=500&auto=format&fit=crop' },
    { id: 7, user: 'Chris B.', rating: 4, text: "Really cool design. Will definitely buy again.", image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=500&auto=format&fit=crop' },
    { id: 8, user: 'Jessica T.', rating: 5, text: "My boyfriend loved the gift. Amazing quality.", image: 'https://images.unsplash.com/photo-1503342217505-b0815a046baf?q=80&w=500&auto=format&fit=crop' },
    { id: 9, user: 'Ryan G.', rating: 5, text: "Looks even better in person. exceeded expectations.", image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=500&auto=format&fit=crop' },
    { id: 10, user: 'Chloe D.', rating: 5, text: "Super stylish and comfortable. My new favorite brand.", image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=500&auto=format&fit=crop' },
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
                                <img
                                    src={review.image as string}
                                    alt="Product"
                                    className={styles.productImage}
                                />
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

                                {/* 4. Comment (Text) */}
                                <p className={styles.text}>"{review.text}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
