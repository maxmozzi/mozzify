"use client";

import { useEffect } from 'react';
import { useFavorites } from '@/context/favorites-context';

/**
 * Renders nothing. When mounted on a product detail page, registers the product id
 * so the navbar heart can stay red while viewing a favorited product. Clears on unmount.
 */
export default function CurrentProductRegister({ productId }: { productId: string }) {
    const { setCurrentProductId } = useFavorites();

    useEffect(() => {
        setCurrentProductId(productId);
        return () => setCurrentProductId(null);
    }, [productId, setCurrentProductId]);

    return null;
}
