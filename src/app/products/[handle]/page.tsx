import { redirect } from 'next/navigation';

interface PageProps {
    params: Promise<{
        handle: string;
    }>;
}

export default async function ProductsLegacyRedirect({ params }: PageProps) {
    const { handle } = await params;

    // Redirect to the new canonical URL
    redirect(`/product/${handle}`);
}
