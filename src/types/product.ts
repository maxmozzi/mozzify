import { StaticImageData } from 'next/image';

export interface GridProduct {
    id: string;
    title: string;
    price: number;
    image: string | StaticImageData; // Supports both URL strings and StaticImageData
    hoverImage?: string | StaticImageData;
    category: string;
    brand?: string;
    gallery?: (string | StaticImageData)[];
    slug?: string;
    tags?: string[];
}

export interface Product extends GridProduct {
    image: StaticImageData;
    hoverImage: StaticImageData;
    gallery: StaticImageData[];
}
