export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
        width: number;
        height: number;
      };
    }>;
  };
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
};
