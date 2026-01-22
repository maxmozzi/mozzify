import { notFound } from 'next/navigation';
import ProductGrid from '@/components/home/product-grid';
import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

// Helper to filter products based on category name
const getFilteredProducts = (category: string) => {
    // Normalize logic
    const categoryMap: { [key: string]: string } = {
        'pants': 'Pants',
        'hoodies': 'Hoodies',
        'tshirts': 'T-Shirts',
        'jackets': 'Jackets',
        'coats': 'Coats',
        'jeans': 'Jeans',
        'shirts': 'Shirts',
        'knitwear': 'Knitwear',
        'underwear': 'Underwear',
        'suits': 'Suits',
        'joggers': 'Joggers',
        'accessories': 'Accessories'
    };

    const targetCategory = categoryMap[category.toLowerCase()] || category.charAt(0).toUpperCase() + category.slice(1);

    // Filter products matching this category
    const categoryItems = allProducts.filter(p =>
        p.category.toLowerCase() === targetCategory.toLowerCase()
    );

    return {
        title: targetCategory,
        items: categoryItems
    };
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    // Safety check for reserved routes if needed, though Next.js handles this by file priority
    const reserved = ['about', 'cart', 'collections', 'product', 'products', 'new-arrivals'];
    if (reserved.includes(category.toLowerCase())) {
        // This case should ideally not be hit if those pages exist at the same level
        return notFound();
    }

    const { title, items } = getFilteredProducts(category);

    // Use ProductListing for a more full-featured experience if it's a primary category
    // For now, using ProductGrid as seen in the original hoodies page for simplicity, 
    // but the user wants it to look good.

    return (
        <div style={{ paddingTop: '80px' }}> {/* Adjusted padding for navbar */}
            <div style={{ paddingBottom: '4rem' }}>
                <ProductGrid title={title} products={items} />
                {items.length === 0 && (
                    <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <p>No products found for {title}.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
