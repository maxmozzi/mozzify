import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

import { PAGE_CATEGORIES } from '@/data/category-config';

export default function SalePage() {
    // Simulating sale by filtering products with price < 1500 or just showing all
    // Let's show a subset to make it look different
    const saleProducts = allProducts.filter(p => p.price < 1500);
    const availableCategories = Array.from(new Set(saleProducts.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <ProductListing
                initialProducts={saleProducts.length > 0 ? saleProducts : allProducts}
                allProductsSource={allProducts}
                title="Sale"
                availableCategories={availableCategories}
                showBrandFilter={true}
                isGlobalView={true}
                showCategoryCarousel={true}
                customCategories={PAGE_CATEGORIES.FULL_CATALOG.map(cat => ({
                    ...cat,
                    image: allProducts.find(p =>
                        (p.category === cat.filterValue) ||
                        (p.tags && p.tags.includes(cat.filterValue)) ||
                        (cat.slug === 'sweatshirts' && p.category === 'Sweaters')
                    )?.image
                }))}
            />
        </div>
    );
}
