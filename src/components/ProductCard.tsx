
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useImageLoad } from '@/utils/animations';
import { Eye, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/products';
import { formatIndianPrice } from '@/utils/animations';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isLoaded, handleImageLoaded, className: imageClassName } = useImageLoad();
  
  // Staggered animation based on index
  const staggerDelay = index * 0.1;
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate programmatically if needed
    window.location.href = `/product/${product.id}`;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: staggerDelay }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden rounded-xl aspect-[3/4]">
        <div className="w-full h-full bg-muted/30 absolute inset-0" />
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-out",
            imageClassName,
            isHovered && "scale-105"
          )}
          onLoad={handleImageLoaded}
        />
        
        {/* Quick actions */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 p-4 flex gap-2 justify-center transform transition-all duration-300",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <button 
            onClick={handleQuickView}
            className="bg-white/90 backdrop-blur-sm text-primary p-3 rounded-full hover:bg-white transition-colors duration-200 shadow-lg"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button 
            onClick={handleAddToCart}
            className="bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors duration-200 shadow-lg"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
        
        {/* Product Label (if on sale or new) */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded-md">
            Featured
          </div>
        )}
      </Link>
      
      {/* Product Info */}
      <div className="mt-4 px-1">
        <Link 
          to={`/product/${product.id}`}
          className="block font-medium text-foreground hover:text-primary transition-colors duration-200"
        >
          {product.name}
        </Link>
        
        <div className="mt-1 flex items-center justify-between">
          <p className="text-lg font-semibold">{formatIndianPrice(product.price)}</p>
          
          {/* Color options */}
          <div className="flex gap-1">
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
      </div>
    </motion.div>
  );
};

export default ProductCard;
