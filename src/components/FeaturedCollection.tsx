
import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '@/utils/animations';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { collections } from '@/lib/products';
import { cn } from '@/lib/utils';

const FeaturedCollection: React.FC = () => {
  const [sectionRef, isInView] = useInView({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      id="featured"
      className="py-20 px-4 md:px-6 lg:px-8 bg-background"
    >
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Exclusive Collections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections of graphic t-shirts, each with its unique aesthetic and story.
          </p>
        </div>
        
        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
              isInView={isInView}
            />
          ))}
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
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, index, isInView }) => {
  const delay = index * 0.15;
  const evenCard = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={cn(
        "group relative overflow-hidden rounded-2xl shadow-sm",
        evenCard ? "md:rounded-tr-[4rem]" : "md:rounded-bl-[4rem]"
      )}
    >
      {/* Collection Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      
      {/* Collection Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
          {collection.name}
        </h3>
        <p className="text-white/80 mb-4 max-w-md">
          {collection.description}
        </p>
        <Link
          to={`/collections/${collection.id}`}
          className="inline-flex items-center text-sm font-medium text-white"
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
