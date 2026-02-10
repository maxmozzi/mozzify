'use client';

import ProductListing from '@/components/products/product-listing';
import { products as allProducts } from '@/data/generated-products';

// Define Sports Categories for the Carousel
const SPORTS_CATEGORIES = [
    { name: 'Football', slug: 'sports/football', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop', filterValue: 'football' },
    { name: 'Basketball', slug: 'sports/basketball', image: 'https://images.unsplash.com/photo-1519861531473-92002639313a?q=80&w=1000&auto=format&fit=crop', filterValue: 'basketball' },
    { name: 'Running', slug: 'sports/running', image: 'https://images.unsplash.com/photo-1552674605-46fd2697b0a8?q=80&w=1000&auto=format&fit=crop', filterValue: 'running' },
    { name: 'Gym', slug: 'sports/gym', image: 'https://images.unsplash.com/photo-1540497077202-7c8a3ca8e0df?q=80&w=1000&auto=format&fit=crop', filterValue: 'gym' },
    { name: 'Yoga', slug: 'sports/yoga', image: 'https://images.unsplash.com/photo-1544367563-12123d8959c9?q=80&w=1000&auto=format&fit=crop', filterValue: 'yoga' },
    { name: 'Tennis', slug: 'sports/tennis', image: 'https://images.unsplash.com/photo-1587280501635-68a6e82cd5ff?q=80&w=1000&auto=format&fit=crop', filterValue: 'tennis' },
];

export default function SportsPage() {
    // Filter for sports related categories/tags for the main sports page
    // This allows the main page to act as a "All Sports" view
    const sportsKeywords = ['Gym', 'Running', 'Football', 'Activewear', 'Basketball', 'Yoga', 'Tennis', 'Sport'];
    const sportsProducts = allProducts.filter(p =>
        sportsKeywords.some(k => p.category.includes(k) || p.tags?.includes(k))
    );

    // Fallback if no specific sport products found (for dev/demo)
    const items = sportsProducts.length > 0 ? sportsProducts : allProducts;
    const availableCategories = Array.from(new Set(items.map(p => p.category))).sort();

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            {/* 
                Passing custom sports categories to ProductListing, 
                which should pass them down to CategoryHeader if showCategoryCarousel is true.
                
                However, ProductListing currently calculates categories internally or takes `availableCategories`.
                We might need to pass `carouselCategories` explicitly if we want the Header to show THESE specific sport links,
                not just product attributes.
                
                Let's assume we can modify ProductListing to accept `carouselCategories` or we pass them effectively.
                Wait, ProductListing doesn't accept `carouselCategories` prop currently. 
                I need to check ProductListing again or update it.
            */}
            <ProductListing
                initialProducts={items}
                allProductsSource={allProducts}
                title="Sports"
                availableCategories={availableCategories}
                showBrandFilter={true}
                isGlobalView={true}
                showCategoryCarousel={true}
                customCategories={SPORTS_CATEGORIES}
            />
        </div>
    );
}
