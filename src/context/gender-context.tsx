"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Gender = 'men' | 'women' | 'unisex';

interface GenderContextType {
    gender: Gender;
    setGender: (gender: Gender) => void;
}

const GenderContext = createContext<GenderContextType | undefined>(undefined);

export function GenderProvider({ children }: { children: ReactNode }) {
    const [gender, setGenderState] = useState<Gender>('unisex');

    useEffect(() => {
        // Load from localStorage on mount
        const saved = localStorage.getItem('mozzify_gender');
        if (saved && (saved === 'men' || saved === 'women' || saved === 'unisex')) {
            setGenderState(saved as Gender);
        }
    }, []);

    const setGender = (newGender: Gender) => {
        setGenderState(newGender);
        localStorage.setItem('mozzify_gender', newGender);
    };

    return (
        <GenderContext.Provider value={{ gender, setGender }}>
            {children}
        </GenderContext.Provider>
    );
}

export function useGender() {
    const context = useContext(GenderContext);
    if (context === undefined) {
        throw new Error('useGender must be used within a GenderProvider');
    }
    return context;
}
