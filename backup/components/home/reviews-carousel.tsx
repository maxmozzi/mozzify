"use client";
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './reviews-carousel.module.css';

const REVIEWS = [
    { id: 1, user: '@maria_style', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop', text: 'Love the vintage vibes! Best quality I found so far.' },
    { id: 2, user: '@john_doe', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop', text: 'Shipping was super fast. Highly recommend.' },
    { id: 3, user: '@lucy_fashion', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop', text: 'Obsessed with the new collection.' },
    { id: 4, user: '@mike_street', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop', text: 'Coolest fits in town.' },
    { id: 5, user: '@sarah_k', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop', text: 'Mozzify never disappoints.' },
    { id: 6, user: '@alex_m', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1000&auto=format&fit=crop', text: 'Great customer service.' },
];

export default function ReviewsCarousel() {
    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>What They Say</h2>
            <motion.div ref={carouselRef} className={styles.carouselContainer}>
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className={styles.innerCarousel}
                >
                    {REVIEWS.map((review) => (
                        <motion.div key={review.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img src={review.image} alt={review.user} className={styles.userImage} />
                            </div>
                            <div className={styles.content}>
                                <span className={styles.username}>{review.user}</span>
                                <p className={styles.text}>{review.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
