"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { GridProduct } from '@/types/product';

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
    navbarHeartRef: React.RefObject<HTMLButtonElement> | null;
    setNavbarHeartRef: (el: HTMLButtonElement | null) => void;
    shouldShowRedHeart: boolean;
    currentProductId: string | null;
    setCurrentProductId: (id: string | null) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'mozzify_favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<GridProduct[]>([]);
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

        // Show red heart feedback briefly
        if (wasAdded) {
            setShouldShowRedHeart(true);
            setTimeout(() => {
                setShouldShowRedHeart(false);
            }, 1000);
        }
    }, []);

    const removeFromFavorites = useCallback((id: string) => {
        setFavorites(prev => prev.filter(fav => fav.id !== id));
    }, []);

    const checkIsFavorite = useCallback((id: string) => {
        return favorites.some(fav => fav.id === id);
    }, [favorites]);


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
            navbarHeartRef: { current: navbarHeartEl } as React.RefObject<HTMLButtonElement>,
            setNavbarHeartRef,
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
