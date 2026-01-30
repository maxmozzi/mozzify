"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '@/context/favorites-context';

export default function FlyingHeart() {
    const { flyingAnimation, navbarHeartRef, resetAnimation } = useFavorites();
    const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (flyingAnimation.isActive && navbarHeartRef?.current) {
            const rect = navbarHeartRef.current.getBoundingClientRect();
            // Aim for center of the heart icon
            setTargetPos({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            });
        }
    }, [flyingAnimation.isActive, navbarHeartRef]);

    return (
        <AnimatePresence onExitComplete={resetAnimation}>
            {flyingAnimation.isActive && (
                <motion.div
                    initial={{
                        position: 'fixed',
                        left: flyingAnimation.startX,
                        top: flyingAnimation.startY,
                        width: 100, // Initial width matches typical product card width roughly or explicit size
                        height: 100,
                        opacity: 1,
                        zIndex: 9999,
                        scale: 1,
                        pointerEvents: 'none'
                    }}
                    animate={{
                        left: targetPos.x,
                        top: targetPos.y,
                        width: 20, // Shrink to icon size
                        height: 20,
                        opacity: 0.5,
                        scale: 0.2
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1] // Ease out expo
                    }}
                >
                    <img
                        src={flyingAnimation.image}
                        alt="Flying Product"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
