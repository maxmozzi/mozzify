"use client";

import { useEffect } from 'react';
import { useGender } from '@/context/gender-context';

export default function SetGender({ gender }: { gender: 'men' | 'women' | 'unisex' }) {
    const { setGender } = useGender();

    useEffect(() => {
        setGender(gender);
    }, [gender, setGender]);

    return null;
}
