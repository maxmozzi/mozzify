"use client";

import Hero from '@/components/home/hero';
import { products } from '@/data/generated-products';
import { useMemo } from 'react';

export default function ShopMenPage() {
    // Filter products for men (include unisex)
    const menProducts = useMemo(() => {
        return products.filter(p => p.gender === 'men' || p.gender === 'unisex');
    }, []);

    return (
        <main>
            <Hero title="MEN'S COLLECTION" />

            {/* 
                User requested:
                ❌ NO incluir grids de productos completos
                ❌ NO incluir filtros, listings ni secciones extra
                El resto del contenido lo añadiré yo manualmente más adelante.
            */}

            <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                    Welcome to our curated Men's selection.
                    We are currently loading {menProducts.length} items for validation.
                </p>
            </div>
        </main>
    );
}
