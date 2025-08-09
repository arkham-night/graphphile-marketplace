
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, type Product } from '@/lib/products';
import { useImageLoad } from '@/utils/animations';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';
import { 
  SlidersHorizontal, 
  Check, 
  ChevronDown, 
  X,
  SortAsc,
  SortDesc,
  Grid,
  List
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Seo from '@/components/Seo';

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Extract unique categories, colors, and sizes
  const categories = [...new Set(products.map(p => p.category))];
  const allColors = products.flatMap(p => p.colors);
  const uniqueColors = [...new Set(allColors.map(c => c.name))].map(name => {
    const color = allColors.find(c => c.name === name);
    return { name, hex: color?.hex || '#000000' };
  });
  
  const allSizes = [...new Set(products.flatMap(p => p.sizes))];
  
  // Filter and sort products when filters change
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter(p => 
        p.colors.some(c => selectedColors.includes(c.name))
      );
    }
    
    // Apply size filter
    if (selectedSizes.length > 0) {
      result = result.filter(p => 
        p.sizes.some(s => selectedSizes.includes(s))
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, selectedColors, selectedSizes, sortOption]);
  
  // Toggle category filter
  const toggleCategory = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };
  
  // Toggle color filter
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  // Toggle size filter
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortOption('featured');
  };
  
  // Handle sortOption change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const { addItem } = useCart();
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Shop Graphic Tees | Graphphile" description="Browse all graphic t-shirts by Graphphile. Filter by category, color, and size." />
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Shop All Products</h1>
            <p className="text-muted-foreground">
              Discover our collection of premium graphic t-shirts.
            </p>
          </div>
          
          {/* Toolbar */}
          <div className="flex flex-wrap gap-4 justify-between items-center mb-6 md:mb-8">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-secondary rounded-md text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter</span>
              {(selectedCategory || selectedColors.length > 0 || selectedSizes.length > 0) && (
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  {
                    (selectedCategory ? 1 : 0) + 
                    (selectedColors.length > 0 ? 1 : 0) + 
                    (selectedSizes.length > 0 ? 1 : 0)
                  }
                </span>
              )}
            </button>
            
            {/* Sort & View Options */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="appearance-none bg-secondary rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
              
              {/* View Toggle */}
              <div className="hidden md:flex items-center bg-secondary rounded-md">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 rounded-l-md transition-colors",
                    viewMode === 'grid' ? "bg-primary text-white" : "hover:bg-muted"
                  )}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 rounded-r-md transition-colors",
                    viewMode === 'list' ? "bg-primary text-white" : "hover:bg-muted"
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden md:block w-full md:w-64 shrink-0 space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-medium mb-3">Category</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        onClick={() => toggleCategory(category)}
                        className={cn(
                          "flex items-center w-full text-left px-2 py-1 rounded-md text-sm transition-colors",
                          selectedCategory === category 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-secondary"
                        )}
                      >
                        <span className="flex-1">{category}</span>
                        {selectedCategory === category && (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Color Filter */}
              <div>
                <h3 className="font-medium mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueColors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                        selectedColors.includes(color.name) 
                          ? "border-primary scale-110" 
                          : "border-transparent hover:border-muted"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColors.includes(color.name) && (
                        <Check className={cn(
                          "w-4 h-4",
                          ['White', 'Cream', 'Off White'].includes(color.name) 
                            ? "text-black" 
                            : "text-white"
                        )} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size Filter */}
              <div>
                <h3 className="font-medium mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={cn(
                        "min-w-8 h-8 px-2 rounded-md text-sm font-medium transition-colors",
                        selectedSizes.includes(size)
                          ? "bg-primary text-primary-foreground" 
                          : "bg-secondary hover:bg-secondary/80"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Clear Filters */}
              {(selectedCategory || selectedColors.length > 0 || selectedSizes.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </aside>
            
            {/* Mobile Filter Drawer */}
            {isFilterOpen && (
              <>
                <div 
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                  onClick={() => setIsFilterOpen(false)}
                />
                <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-background z-50 md:hidden overflow-y-auto p-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium">Filters</h3>
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      aria-label="Close filters"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Category Filter - Mobile */}
                    <div>
                      <h3 className="font-medium mb-3">Category</h3>
                      <ul className="space-y-2">
                        {categories.map(category => (
                          <li key={category}>
                            <button
                              onClick={() => toggleCategory(category)}
                              className={cn(
                                "flex items-center w-full text-left px-2 py-1 rounded-md text-sm transition-colors",
                                selectedCategory === category 
                                  ? "bg-primary text-primary-foreground" 
                                  : "hover:bg-secondary"
                              )}
                            >
                              <span className="flex-1">{category}</span>
                              {selectedCategory === category && (
                                <Check className="w-4 h-4" />
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Color Filter - Mobile */}
                    <div>
                      <h3 className="font-medium mb-3">Color</h3>
                      <div className="flex flex-wrap gap-2">
                        {uniqueColors.map(color => (
                          <button
                            key={color.name}
                            onClick={() => toggleColor(color.name)}
                            className={cn(
                              "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                              selectedColors.includes(color.name) 
                                ? "border-primary scale-110" 
                                : "border-transparent hover:border-muted"
                            )}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          >
                            {selectedColors.includes(color.name) && (
                              <Check className={cn(
                                "w-4 h-4",
                                ['White', 'Cream', 'Off White'].includes(color.name) 
                                  ? "text-black" 
                                  : "text-white"
                              )} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Size Filter - Mobile */}
                    <div>
                      <h3 className="font-medium mb-3">Size</h3>
                      <div className="flex flex-wrap gap-2">
                        {allSizes.map(size => (
                          <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={cn(
                              "min-w-8 h-8 px-2 rounded-md text-sm font-medium transition-colors",
                              selectedSizes.includes(size)
                                ? "bg-primary text-primary-foreground" 
                                : "bg-secondary hover:bg-secondary/80"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Buttons - Mobile */}
                    <div className="pt-4 flex gap-2 border-t">
                      {(selectedCategory || selectedColors.length > 0 || selectedSizes.length > 0) && (
                        <button
                          onClick={clearFilters}
                          className="flex-1 px-4 py-2 text-sm border border-border rounded-md"
                        >
                          Clear all
                        </button>
                      )}
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1 px-4 py-2 bg-primary text-white text-sm rounded-md"
                      >
                        Apply filters
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">No products found matching your filters.</p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-primary text-white rounded-md text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Active Filters */}
                  {(selectedCategory || selectedColors.length > 0 || selectedSizes.length > 0) && (
                    <div className="mb-6 flex flex-wrap gap-2 items-center">
                      <span className="text-sm text-muted-foreground">Active filters:</span>
                      
                      {selectedCategory && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-sm">
                          <span>{selectedCategory}</span>
                          <button onClick={() => setSelectedCategory(null)} aria-label={`Remove ${selectedCategory} filter`}>
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      
                      {selectedColors.map(color => (
                        <div key={color} className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-sm">
                          <span>{color}</span>
                          <button onClick={() => toggleColor(color)} aria-label={`Remove ${color} filter`}>
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      
                      {selectedSizes.map(size => (
                        <div key={size} className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-sm">
                          <span>Size {size}</span>
                          <button onClick={() => toggleSize(size)} aria-label={`Remove size ${size} filter`}>
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      
                      <button
                        onClick={clearFilters}
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                  
                  {/* Product count */}
                  <p className="text-sm text-muted-foreground mb-6">
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </p>
                  
                  {/* Products Grid */}
                  <div className={cn(
                    viewMode === 'grid'
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                      : "space-y-6"
                  )}>
                    {filteredProducts.map((product, index) => (
                      viewMode === 'grid' ? (
                        <ProductCard key={product.id} product={product} index={index} />
                      ) : (
                        <ListProductCard key={product.id} product={product} index={index} />
                      )
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// List view for products
interface ListProductCardProps {
  product: Product;
  index: number;
}

const ListProductCard: React.FC<ListProductCardProps> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isLoaded, handleImageLoaded, className: imageClassName } = useImageLoad();
  const { addItem } = useCart();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex gap-6 border-b pb-6"
    >
      {/* Product Image */}
      <div className="w-32 h-32 sm:w-40 sm:h-40 overflow-hidden rounded-xl flex-shrink-0">
        <div className="w-full h-full bg-muted/30 absolute inset-0" />
        <img
          src={product.images[0]}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-out",
            imageClassName,
            isHovered && "scale-105"
          )}
          onLoad={handleImageLoaded}
        />
      </div>
      
      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        <div>
          <span className="text-sm text-muted-foreground">{product.category}</span>
          <h3 className="font-medium text-lg mb-2">
            <Link 
              to={`/product/${product.id}`}
              className="hover:text-primary transition-colors duration-200"
            >
              {product.name}
            </Link>
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
            
            {/* Color options */}
            <div className="flex gap-1 mt-2">
              {product.colors.map((color, i) => (
                <div 
                  key={i}
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link 
              to={`/product/${product.id}`}
              className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors"
            >
              View Details
            </Link>
            <button 
              onClick={() => addItem(product, { size: product.sizes?.[0], color: product.colors?.[0]?.name, quantity: 1 })}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsPage;
