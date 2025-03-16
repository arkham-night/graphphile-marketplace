
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '@/utils/animations';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { collections } from '@/lib/products';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const FeaturedCollection: React.FC = () => {
  const [sectionRef, isInView] = useInView({ threshold: 0.1 });
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      id="featured"
      className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto">
        {/* Section Heading with accent color */}
        <div className="text-center mb-12">
          <div className="inline-block bg-yellow-400 px-4 py-1 rounded-full mb-3">
            <span className="text-sm font-medium text-blue-900">Curated Collections</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-blue-900">
            Exclusive Graphic Designs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections of graphic t-shirts, each with its unique aesthetic and story.
          </p>
        </div>
        
        {/* Collections Grid with improved visual styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
              isInView={isInView as boolean}
              isActive={activeCollection === collection.id}
              onMouseEnter={() => setActiveCollection(collection.id)}
              onMouseLeave={() => setActiveCollection(null)}
            />
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="mt-12 text-center">
          <Button 
            variant="outline"
            className="group border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
            asChild
          >
            <Link to="/collections">
              <span>Browse All Collections</span>
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

interface CollectionCardProps {
  collection: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
  index: number;
  isInView: boolean;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ 
  collection, 
  index, 
  isInView,
  isActive,
  onMouseEnter,
  onMouseLeave
}) => {
  const delay = index * 0.15;
  const evenCard = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={cn(
        "group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500",
        evenCard ? "md:rounded-tr-[4rem]" : "md:rounded-bl-[4rem]"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Collection Image with zoom effect */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover"
          animate={isActive ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-900/40 to-transparent" />
        
        {/* Yellow accent element */}
        <div className={cn(
          "absolute w-24 h-24 rounded-full bg-yellow-400 transition-all duration-500",
          evenCard ? "top-6 -right-12 group-hover:right-6" : "bottom-6 -left-12 group-hover:left-6",
          "opacity-70"
        )} />
      </div>
      
      {/* Collection Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
          {collection.name}
        </h3>
        <p className="text-white/90 mb-4 max-w-md">
          {collection.description}
        </p>
        <Link
          to={`/collections/${collection.id}`}
          className="inline-flex items-center text-sm font-medium text-white bg-blue-700/40 hover:bg-blue-700/60 px-4 py-2 rounded-full backdrop-blur-sm transition-colors duration-300"
        >
          <span className="mr-2">Explore Collection</span>
          <span className="relative transition-all duration-300 group-hover:translate-x-1">
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default FeaturedCollection;
