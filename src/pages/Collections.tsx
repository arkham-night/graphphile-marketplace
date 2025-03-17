
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type Collection = {
  id: string;
  name: string;
  description: string;
  image: string;
};

const Collections = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: collections, isLoading, error } = useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('collections')
        .select('*');
      
      if (error) throw error;
      return data as Collection[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Our Collections</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collections of premium graphic t-shirts, each telling a unique story through art.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-red-50 rounded-lg">
              <p className="text-red-600">There was an error loading the collections. Please try again later.</p>
            </div>
          ) : collections && collections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <Link 
                  key={collection.id} 
                  to={`/products?collection=${collection.id}`}
                  className="group block overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img 
                      src={collection.image || "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                      alt={collection.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{collection.name}</h3>
                    <p className="text-muted-foreground mb-4">{collection.description}</p>
                    <div className="flex items-center text-blue-700 font-medium group-hover:text-blue-900">
                      <span>View Collection</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-blue-50 rounded-lg">
              <p>No collections found. Check back soon for our latest curated collections.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collections;
