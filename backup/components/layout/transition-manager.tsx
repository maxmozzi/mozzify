"use client";
import React, { useState, createContext, useContext } from 'react';
import styles from './transition-manager.module.css';

const TransitionContext = createContext({
    startTransition: () => { },
});

export const useTransition = () => useContext(TransitionContext);

export default function TransitionManager({ children }: { children: React.ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const startTransition = () => {
        setIsTransitioning(true);
        // Simulate a redirect delay for effect
        setTimeout(() => {
            // In a real app, this would be an actual navigation
            // For now, we'll just reset or let the page change handled by Link
        }, 2000);
    };

    return (
        <TransitionContext.Provider value={{ startTransition }}>
            {isTransitioning && (
                <div className={styles.overlay}>
                    <div className={styles.logoContainer}>
                        <h1 className={styles.spinningLogo}>MOZZIFY</h1>
                    </div>
                </div>
            )}
            {children}
        </TransitionContext.Provider>
    );
}
