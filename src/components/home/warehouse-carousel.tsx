'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './warehouse-carousel.module.css';

interface WarehouseCarouselProps {
    images: string[];
    interval?: number;
}

export default function WarehouseCarousel({ images, interval = 6000 }: WarehouseCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    // If there's only one image, we can just static render it or
    // if we want to "animate" it appearing initially, we can keep the logic.
    // The user requirement says "Dejar la estructura preparada para que en el futuro se puedan añadir más imágenes".
    // So we will render it through the map/AnimatePresence logic even if 1, 
    // but the generic interval won't change index.

    // Animation variants for a "premium reveal" effect
    // "Slide up and scale in" - feels modern and dynamic
    // Animation variants for a "premium natural blur" effect
    const variants = {
        initial: {
            scale: 1.1,
            opacity: 0,
            filter: 'blur(15px)'
        },
        animate: {
            scale: 1.0,
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
                duration: 2.0, // Slower, more natural
                ease: [0.25, 1, 0.5, 1] as const, // Soft natural easeOut
            }
        },
        exit: {
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: {
                duration: 1.5,
                ease: [0.42, 0, 0.58, 1] as const, // Smooth easeInOut
            }
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <AnimatePresence initial={true} mode='popLayout'>
                <motion.div
                    key={currentIndex}
                    className={styles.slide}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{ zIndex: 1 }} // Ensure the entering slide is on top if we want overlap, but mode='popLayout' handles sequential effectively
                >
                    <Image
                        src={images[currentIndex]}
                        alt="Warehouse"
                        fill
                        className={styles.image}
                        priority
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
