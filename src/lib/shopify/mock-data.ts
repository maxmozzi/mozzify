import { Product, Collection } from './types';

export const mockProducts: Product[] = [
    {
        id: 'prod_1',
        handle: 'oversized-hoodie-black',
        title: 'Essential Oversized Hoodie',
        description: 'Heavyweight organic cotton hoodie with a relaxed fit. Pre-shrunk and garment dyed for a vintage feel.',
        priceRange: {
            minVariantPrice: { amount: '120.00', currencyCode: 'USD' }
        },
        featuredImage: {
            url: 'https://images.unsplash.com/photo-1578587017763-9d327d0e5b7c?q=80&w=1000&auto=format&fit=crop',
            altText: 'Black Oversized Hoodie',
            width: 1000,
            height: 1200
        },
        images: {
            edges: [
                { node: { url: 'https://images.unsplash.com/photo-1578587017763-9d327d0e5b7c?q=80&w=1000&auto=format&fit=crop', altText: 'Front view', width: 1000, height: 1200 } }
            ]
        },
        options: [{ id: 'opt_1', name: 'Size', values: ['S', 'M', 'L', 'XL'] }],
        variants: { edges: [] }
    },
    {
        id: 'prod_2',
        handle: 'technical-cargo-pants',
        title: 'Technical Cargo Pants',
        description: 'Water-resistant nylon cargo pants with multiple utility pockets and adjustable cuffs.',
        priceRange: {
            minVariantPrice: { amount: '180.00', currencyCode: 'USD' }
        },
        featuredImage: {
            url: 'https://images.unsplash.com/photo-1624378439575-d8aa138f4d7d?q=80&w=1000&auto=format&fit=crop',
            altText: 'Black Cargo Pants',
            width: 1000,
            height: 1200
        },
        images: {
            edges: [
                { node: { url: 'https://images.unsplash.com/photo-1624378439575-d8aa138f4d7d?q=80&w=1000&auto=format&fit=crop', altText: 'Front View', width: 1000, height: 1200 } }
            ]
        },
        options: [{ id: 'opt_2', name: 'Size', values: ['30', '32', '34', '36'] }],
        variants: { edges: [] }
    },
    {
        id: 'prod_3',
        handle: 'signature-cap',
        title: 'Signature Cap',
        description: 'Structured 6-panel cap with embroidered logo.',
        priceRange: {
            minVariantPrice: { amount: '45.00', currencyCode: 'USD' }
        },
        featuredImage: {
            url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
            altText: 'Black Cap',
            width: 1000,
            height: 1000
        },
        images: {
            edges: [
                { node: { url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop', altText: 'Front View', width: 1000, height: 1000 } }
            ]
        },
        options: [{ id: 'opt_3', name: 'Color', values: ['Black', 'Navy'] }],
        variants: { edges: [] }
    }
];

export const mockCollections: Collection[] = [
    {
        id: 'col_1',
        handle: 'new-arrivals',
        title: 'New Arrivals',
        description: 'The latest drops from MOZZIFY.',
        products: {
            edges: mockProducts.map(p => ({ node: p }))
        }
    },
    {
        id: 'col_2',
        handle: 'accessories',
        title: 'Accessories',
        description: 'Completing the look.',
        products: {
            edges: [{ node: mockProducts[2] }]
        }
    }
];
