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
        { label: 'Women', href: '/women' },
        { label: 'Men', href: '/men' },
    ],
    main: [

        {
            id: 'best-sellers',
            label: 'BEST SELLERS',
            href: '/collections/best-sellers/unisex'
        },
        {
            id: 'sale',
            label: 'SALE',
            href: '/collections/sale/unisex',
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
                        { label: 'All Clothes', href: '/collections/clothing/unisex' },
                        { label: 'Hoodies', href: '/collections/clothing/unisex/hoodies' },
                        { label: 'T-Shirts', href: '/collections/clothing/unisex/tshirt' },
                        { label: 'Polos', href: '/collections/clothing/unisex/polos' },
                        { label: 'Shorts', href: '/collections/clothing/unisex/shorts' },
                        { label: 'Jeans', href: '/collections/clothing/unisex/jeans' },
                        { label: 'Sweaters', href: '/collections/clothing/unisex/sweaters' },
                        { label: 'Sweatshirts', href: '/collections/clothing/unisex/sweatshirt' },
                        { label: 'Jackets', href: '/collections/clothing/unisex/jackets' },
                        { label: 'Sets', href: '/collections/clothing/unisex/sets' },
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
            id: 'accessories',
            label: 'Accessories',
            href: '/collections/accessories/unisex',
            columns: [
                {
                    title: 'Categories',
                    items: [
                        { label: 'View All', href: '/collections/accessories/unisex' },
                        { label: 'Bags', href: '/collections/accessories/unisex/bags' },
                        { label: 'Belts', href: '/collections/accessories/unisex/belts' },
                        { label: 'Caps', href: '/collections/accessories/unisex/caps' },
                        { label: 'Hats', href: '/collections/accessories/unisex/hats' },
                        { label: 'Wallets', href: '/collections/accessories/unisex/wallets' },
                        { label: 'Scarves', href: '/collections/accessories/unisex/scarves' },
                        { label: 'Ski Mask', href: '/collections/accessories/unisex/ski-mask' },
                        { label: 'Sunglasses', href: '/collections/accessories/unisex/sunglasses' },
                    ]
                }
            ]
        },
        {
            id: 'brands',
            label: 'Brands',
            href: '/brands',
            columns: [
                {
                    title: 'Main Brands',
                    items: [
                        { label: 'View All', href: '/brands' },
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
