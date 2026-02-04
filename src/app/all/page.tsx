
import { products } from '@/data/generated-products';
import CollectionListing from '@/components/collections/collection-listing';


export default async function ShopAllPage({
    searchParams
}: {
    searchParams: { collections?: string }
}) {
    const params = await searchParams;
    const subcategoryFilter = params.collections?.toLowerCase();

    console.log('ShopAllPage rendering with filter:', subcategoryFilter);
    console.log('Product count:', products?.length);

    if (!products || products.length === 0) {
        return <div className="pt-32 text-center">No products found in database.</div>;
    }


    // 1. Filtering Logic
    const filteredProducts = subcategoryFilter
        ? products.filter(p => {
            const productSlug = (p.category || '').toLowerCase().replace(/\s+/g, '_');
            return productSlug === subcategoryFilter;
        })
        : products;

    return (
        <main className="pt-20 pb-16 min-h-screen">
            <CollectionListing
                initialProducts={filteredProducts}
                baseProducts={products}
                collectionTitle="All Products"
                gender="unisex"
                activeSubcategory={subcategoryFilter}
            />
        </main>
    );
}


