
export interface CategoryConfig {
    name: string;
    slug: string;
    filterValue: string;
    image?: string; // Optional override, otherwise dynamic find
}

export const PAGE_CATEGORIES = {
    // 1. Bestsellers & Sales: "Todas las categorias de la web"
    // Limited to 10 products per category logic is handled in the filtering component
    FULL_CATALOG: [
        { name: 'View All', slug: 'all', filterValue: 'all' },
        { name: 'T-Shirts', slug: 't-shirts', filterValue: 'T-Shirts' },
        { name: 'Hoodies', slug: 'hoodies', filterValue: 'Hoodies' },
        { name: 'Sweatshirts', slug: 'sweatshirts', filterValue: 'Sweatshirts' },
        { name: 'Sweaters', slug: 'sweaters', filterValue: 'Sweaters' },
        { name: 'Jackets', slug: 'jackets', filterValue: 'Jackets' },
        { name: 'Polos', slug: 'polos', filterValue: 'Polos' },
        { name: 'Sets', slug: 'sets', filterValue: 'Trucksuits' }, // "Sets" -> Trucksuits
        { name: 'Pants', slug: 'pants', filterValue: 'Pants' },
        { name: 'Shorts', slug: 'shorts', filterValue: 'Shorts' },
        { name: 'Shoes', slug: 'shoes', filterValue: 'Shoes' },
        { name: 'Accessories', slug: 'accessories', filterValue: 'Accessories' }
    ],

    // 2. Clothing Page: Specific subset
    CLOTHING: [
        { name: 'View All', slug: 'all', filterValue: 'all' },
        { name: 'T-Shirts', slug: 't-shirts', filterValue: 'T-Shirts' },
        { name: 'Hoodies', slug: 'hoodies', filterValue: 'Hoodies' },
        { name: 'Sweatshirts', slug: 'sweatshirts', filterValue: 'Sweatshirts' },
        { name: 'Sweaters', slug: 'sweaters', filterValue: 'Sweaters' },
        { name: 'Jackets', slug: 'jackets', filterValue: 'Jackets' },
        { name: 'Polos', slug: 'polos', filterValue: 'Polos' },
        { name: 'Sets', slug: 'sets', filterValue: 'Trucksuits' },
        { name: 'Pants', slug: 'pants', filterValue: 'Pants' },
        { name: 'Shorts', slug: 'shorts', filterValue: 'Shorts' }
    ],

    // 3. Shoes Page: Specific subset
    SHOES: [
        { name: 'View All', slug: 'all', filterValue: 'all' },
        { name: 'Sneakers', slug: 'sneakers', filterValue: 'Sneakers' },
        { name: 'Boots', slug: 'boots', filterValue: 'Boots' },
        { name: 'Loafers', slug: 'loafers', filterValue: 'Loafers' },
        { name: 'Slides', slug: 'slides', filterValue: 'Slides' }
    ],

    // 4. Sports (already custom, but good to have here)
    SPORTS: [
        { name: 'View All', slug: 'all', filterValue: 'all' },
        { name: 'Football', slug: 'football', filterValue: 'football' },
        { name: 'Basketball', slug: 'basketball', filterValue: 'basketball' },
        { name: 'Running', slug: 'running', filterValue: 'running' },
        { name: 'Gym', slug: 'gym', filterValue: 'gym' }
    ]
};
