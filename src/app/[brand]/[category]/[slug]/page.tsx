import { redirect } from 'next/navigation';

interface PageProps {
    params: Promise<{
        brand: string;
        category: string;
        slug: string;
    }>;
}

export default async function BrandProductLegacyRedirect({ params }: PageProps) {
    const { slug } = await params;

    // Redirect to the new canonical URL
    redirect(`/product/${slug}`);
}
