export interface NavLink {
    label: string;
    href: string;
    isRed?: boolean; // For distinct highlighting (e.g. Sale)
}

export interface NavSection {
    title: string;
    items: NavLink[];
}

export interface MenuItem {
    id: string;
    label: string;
    href?: string; // If the top-level item is a link
    isRed?: boolean;
    columns?: NavSection[]; // For mega menu columns
}

export const navigation = {
    top: [
        { label: 'Women', href: '/pages/shop-women' },
        { label: 'Men', href: '/pages/shop-men' },
    ],
    main: [

        {
            id: 'new-arrivals',
            label: 'NEW ARRIVALS',
            href: '/collections/new-arrivals/mens'
        },
        {
            id: 'best-sellers',
            label: 'BEST SELLERS',
            href: '/collections/best-sellers/mens'
        },
        {
            id: 'sale',
            label: 'SALE',
            href: '/collections/sale/mens',
            isRed: true
        },

        {
            id: 'clothing',
            label: 'Clothing',
            href: '/collections/clothing/unisex',
            columns: [
                {
                    title: 'Categories',
                    items: [
                        { label: 'View All', href: '/collections/clothing/unisex' },
                        { label: 'Hoodies', href: '/hoodies/all' },
                        { label: 'T-Shirts', href: '/tshirts/all' },
                        { label: 'Polo', href: '/polo/all' },
                        { label: 'Shorts', href: '/shorts/all' },
                        { label: 'Jeans', href: '/jeans/all' },
                        { label: 'Sweater', href: '/sweater/all' },
                        { label: 'Sweatshirts', href: '/sweatshirts/all' },
                        { label: 'Jacket', href: '/jacket/all' },
                        { label: 'Sets', href: '/sets/all' },
                        { label: 'Shoes', href: '/shoes/all' }, // Legacy link in clothing?
                        { label: 'iPhone Case', href: '/iphone_case/all' },
                    ]
                },
                {
                    title: 'Brands',
                    items: [
                        { label: 'Amiri', href: '/amiri' },
                        { label: 'Ami Paris', href: '/amiparis' },
                    ]
                }
            ]
        },
        {
            id: 'shoes',
            label: 'Shoes',
            href: '/collections/shoes/unisex',
            columns: [
                {
                    title: 'Categories',
                    items: [
                        { label: 'View All', href: '/collections/shoes/unisex' },
                        { label: 'Boots', href: '/boots' },
                        { label: 'Sneakers', href: '/sneakers' },
                        { label: 'Loafers', href: '/loafers' },
                    ]
                },
                {
                    title: 'Brands',
                    items: [
                        { label: 'Golden Goose', href: '/b/golden-goose' },
                        { label: 'Autry', href: '/b/autry' },
                        { label: 'Nike', href: '/b/nike' },
                        { label: 'Adidas', href: '/b/adidas' },
                        { label: 'New Balance', href: '/b/new-balance' },
                        { label: 'Asics', href: '/b/asics' },
                        { label: 'Veja', href: '/b/veja' },
                        { label: 'Hoff', href: '/b/hoff' },
                        { label: 'Premiata', href: '/b/premiata' },
                        { label: 'Diadora', href: '/b/diadora' },
                    ]
                }
            ]
        },
        {
            id: 'brands',
            label: 'Brands',
            columns: [
                {
                    title: 'Main Brands',
                    items: [
                        { label: 'Amiri', href: '/amiri' },
                        { label: 'Ami Paris', href: '/amiparis' },
                    ]
                }
            ]
        },
        {
            id: 'sports',
            label: 'Sports',
            href: '/collections/sports/unisex',
            columns: [
                {
                    title: 'Categories',
                    items: [
                        { label: 'View All', href: '/collections/sports/unisex' },
                        { label: 'Running', href: '/collections/sports/unisex?collections=running' },
                        { label: 'Gym', href: '/collections/sports/unisex?collections=gym' },
                        { label: 'Football', href: '/collections/sports/unisex?collections=football' },
                    ]
                }
            ]
        },
        {
            id: 'mystery',
            label: 'Mystery Box',
            href: '/mystery-box'
        }
    ],
    footer: {
        about: [
            { label: 'About Us', href: '/about' },
            { label: 'Careers', href: '/careers' },
        ],
        support: [
            { label: 'Contact', href: '/contact' },
            { label: 'Shipping', href: '/shipping' },
            { label: 'Returns', href: '/returns' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
        ]
    }
};
