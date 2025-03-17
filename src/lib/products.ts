
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  collection: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Geometric Harmony",
    description: "A meticulously designed t-shirt featuring balanced geometric patterns inspired by mathematical precision and natural harmony.",
    price: 1499,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Graphic",
    collection: "Minimal Geometry",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#808080" }
    ],
    featured: true
  },
  {
    id: "2",
    name: "Abstract Waves",
    description: "Fluid lines and subtle color gradients create a sense of movement and depth in this artistic design.",
    price: 1699,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Abstract",
    collection: "Fluid Expressions",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Blue", hex: "#1E3A8A" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Cream", hex: "#F5F5DC" }
    ],
    featured: true
  },
  {
    id: "3",
    name: "Minimalist Line Art",
    description: "Simple yet profound, this design uses a single continuous line to create a striking visual statement.",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Minimal",
    collection: "Line Essence",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
    ],
    featured: true
  },
  {
    id: "4",
    name: "Architectural Elements",
    description: "A tribute to modernist architecture, featuring clean lines and structural elements in perfect balance.",
    price: 1899,
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512400930990-e0bc0bd669b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Architectural",
    collection: "Structure Series",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Slate Gray", hex: "#708090" },
      { name: "Off White", hex: "#FAF9F6" },
      { name: "Charcoal", hex: "#36454F" }
    ],
    featured: true
  },
  {
    id: "5",
    name: "Typographic Rhythm",
    description: "Letters and words arranged to create visual patterns and rhythms, celebrating the beauty of typography.",
    price: 1499,
    images: [
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593183534075-3516ec1e38ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Typography",
    collection: "Word Play",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#000080" }
    ],
    featured: false
  },
  {
    id: "6",
    name: "Optical Illusion",
    description: "Mind-bending patterns that play with perception and create fascinating visual effects.",
    price: 1799,
    images: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342331862-c0d3e1a08419?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Optical",
    collection: "Visual Paradox",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" }
    ],
    featured: false
  }
];

export const collections = [
  {
    id: "minimal-geometry",
    name: "Minimal Geometry",
    description: "Clean lines and perfect shapes create harmonious designs inspired by mathematical precision.",
    image: "https://images.unsplash.com/photo-1523371537394-e7da61b2379f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "fluid-expressions",
    name: "Fluid Expressions",
    description: "Organic forms and flowing patterns that evoke movement and emotional responses.",
    image: "https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "line-essence",
    name: "Line Essence",
    description: "The beauty of simplicity, expressed through minimal line art and negative space.",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "structure-series",
    name: "Structure Series",
    description: "Inspired by architecture and structural design principles, these pieces celebrate form and function.",
    image: "https://images.unsplash.com/photo-1518544897598-6827b231fff1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

export const getProductsByCollection = (collectionName: string): Product[] => {
  return products.filter(product => product.collection === collectionName);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
