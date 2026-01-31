"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { GridProduct } from '@/components/home/product-grid';

interface AnimationState {
    isActive: boolean;
    startX: number;
    startY: number;
    image: string;
}

interface FavoritesContextType {
    favorites: GridProduct[];
    addToFavorites: (product: GridProduct, startRect?: DOMRect) => void;
    removeFromFavorites: (id: string) => void;
    checkIsFavorite: (id: string) => boolean;
    flyingAnimation: AnimationState;
    navbarHeartRef: React.RefObject<HTMLButtonElement> | null;
    setNavbarHeartRef: (el: HTMLButtonElement | null) => void;
    resetAnimation: () => void;
    shouldShowRedHeart: boolean;
    currentProductId: string | null;
    setCurrentProductId: (id: string | null) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'mozzify_favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<GridProduct[]>([]);
    const [flyingAnimation, setFlyingAnimation] = useState<AnimationState>({
        isActive: false,
        startX: 0,
        startY: 0,
        image: ''
    });
    const [navbarHeartEl, setNavbarHeartEl] = useState<HTMLButtonElement | null>(null);
    const [shouldShowRedHeart, setShouldShowRedHeart] = useState(false);
    const [currentProductId, setCurrentProductId] = useState<string | null>(null);

    // Load favorites from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setFavorites(parsed);
                }
            } catch (error) {
                console.error('Failed to load favorites from localStorage:', error);
            }
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
            } catch (error) {
                console.error('Failed to save favorites to localStorage:', error);
            }
        }
    }, [favorites]);

    const addToFavorites = useCallback((product: GridProduct, startRect?: DOMRect) => {
        let wasAdded = false;

        setFavorites(prev => {
            // Check if already in favorites
            if (prev.some(fav => fav.id === product.id)) {
                return prev;
            }
            wasAdded = true;
            return [...prev, product];
        });

        // Trigger animation only if product was actually added and startRect is provided
        if (wasAdded && startRect) {
            // Get image URL - handle both string URLs and StaticImageData objects
            let imageUrl = '';
            if (typeof product.image === 'string') {
                imageUrl = product.image;
            } else if (product.image && typeof product.image === 'object') {
                // Handle Next.js StaticImageData or similar objects
                if ('src' in product.image && typeof product.image.src === 'string') {
                    imageUrl = product.image.src;
                } else if ('default' in product.image && typeof product.image.default === 'string') {
                    imageUrl = product.image.default;
                }
            }

            // Only trigger animation if we have a valid image URL
            if (imageUrl) {
                setFlyingAnimation({
                    isActive: true,
                    startX: startRect.left + startRect.width / 2,
                    startY: startRect.top + startRect.height / 2,
                    image: imageUrl
                });
                // Show red heart when pulse animation starts (at 0.7s, matching CSS animation-delay)
                setTimeout(() => {
                    setShouldShowRedHeart(true);
                }, 700); // Match pulse animation delay

                // End flying animation after duration (0.8s)
                setTimeout(() => {
                    setFlyingAnimation(prev => ({ ...prev, isActive: false }));
                }, 800);
            }
        }
    }, []);

    const removeFromFavorites = useCallback((id: string) => {
        setFavorites(prev => prev.filter(fav => fav.id !== id));
    }, []);

    const checkIsFavorite = useCallback((id: string) => {
        return favorites.some(fav => fav.id === id);
    }, [favorites]);

    const resetAnimation = useCallback(() => {
        setFlyingAnimation({
            isActive: false,
            startX: 0,
            startY: 0,
            image: ''
        });
        // Reset red heart after pulse animation completes
        // Pulse starts at 0.7s and lasts 0.4s, so it ends at 1.1s total
        // Animation completes at 0.8s, so we wait 0.3s more (1.1s - 0.8s = 0.3s)
        setTimeout(() => {
            setShouldShowRedHeart(false);
        }, 300); // Time for pulse to complete after animation ends
    }, []);

    const setNavbarHeartRef = useCallback((el: HTMLButtonElement | null) => {
        if (el !== navbarHeartEl) {
            setNavbarHeartEl(el);
        }
    }, [navbarHeartEl]);

    return (
        <FavoritesContext.Provider value={{
            favorites,
            addToFavorites,
            removeFromFavorites,
            checkIsFavorite,
            flyingAnimation,
            navbarHeartRef: { current: navbarHeartEl } as React.RefObject<HTMLButtonElement>,
            setNavbarHeartRef,
            resetAnimation,
            shouldShowRedHeart,
            currentProductId,
            setCurrentProductId
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
