import ProductGrid from '@/components/home/product-grid';
import { products } from '@/data/generated-products';
import Link from 'next/link';

export default function NewArrivalsPage() {
    // Top visual categories for sub-navbar
    const CATS = [
        'Bestsellers', 'Sale', 'Activewear', 'Jackets', 'Sweaters',
        'Trousers', 'Denim Jeans', 'Footwear', 'Polos & T-Shirts',
        'Shirts', 'Matching Sets', 'Accessories'
    ];

    // Take first 10 products
    const items = products.slice(0, 10);

    return (
        <main style={{ paddingTop: '0' }}>
            {/* Sub Navbar */}
            <div style={{
                padding: '1rem 2rem',
                borderBottom: '1px solid #eee',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                display: 'flex',
                gap: '1.5rem',
                justifyContent: 'center'
            }}>
                {CATS.map(c => (
                    <Link key={c} href="#" style={{
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: c === 'Sale' ? '#e11d48' : '#333',
                        textTransform: 'uppercase'
                    }}>
                        {c}
                    </Link>
                ))}
            </div>

            <div style={{ padding: '3rem 0' }}>
                <ProductGrid title="New Arrivals" products={items} variant="visual" />
            </div>
        </main>
    );
}
