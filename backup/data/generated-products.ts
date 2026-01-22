import { StaticImageData } from 'next/image';

// Import references
import Front600 from '@/images/burberry/hoodies/WSC-12BB808302/front-600x750.webp';
import Back600 from '@/images/burberry/hoodies/WSC-12BB808302/back-600x750.webp';
import Front750 from '@/images/burberry/hoodies/WSC-12BB808302/front-750x930.webp';
import Back750 from '@/images/burberry/hoodies/WSC-12BB808302/back-750x930.webp';

export interface Product {
    id: string;
    title: string;
    price: number;
    image: StaticImageData; // Main listing image (600x750)
    hoverImage: StaticImageData; // Hover listing image (600x750)
    gallery: StaticImageData[]; // Detail images (750x930)
    category: string;
    brand: string;
    slug: string;
}

export const products: Product[] = [
    {
        id: '1',
        title: 'Burberry Hoodie Test 1',
        price: 850,
        image: Front600,
        hoverImage: Back600,
        gallery: [Front750, Back750],
        category: 'Hoodies',
        brand: 'Burberry',
        slug: 'mock-product-1'
    },
    {
        id: '2',
        title: 'Burberry Hoodie Test 2',
        price: 850,
        image: Front600,
        hoverImage: Back600,
        gallery: [Front750, Back750],
        category: 'Hoodies',
        brand: 'Burberry',
        slug: 'mock-product-2'
    },
    {
        id: '3',
        title: 'Burberry Hoodie Test 3',
        price: 850,
        image: Front600,
        hoverImage: Back600,
        gallery: [Front750, Back750],
        category: 'Hoodies',
        brand: 'Burberry',
        slug: 'mock-product-3'
    },
    {
        id: '4',
        title: 'Burberry Hoodie Test 4',
        price: 850,
        image: Front600,
        hoverImage: Back600,
        gallery: [Front750, Back750],
        category: 'Hoodies',
        brand: 'Burberry',
        slug: 'mock-product-4'
    }
];
