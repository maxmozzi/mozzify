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
    setNavbarHeartRef: (ref: React.RefObject<HTMLButtonElement>) => void;
    resetAnimation: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<GridProduct[]>([]);
    const [flyingAnimation, setFlyingAnimation] = useState<AnimationState>({
        isActive: false,
        startX: 0,
        startY: 0,
        image: ''
    });
    const [navbarHeartEl, setNavbarHeartEl] = useState<HTMLButtonElement | null>(null);

    // ... existing load/save logic ...

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
            setNavbarHeartRef: setNavbarHeartRef as any,
            resetAnimation
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
