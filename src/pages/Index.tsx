import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedCollection from '@/components/FeaturedCollection';

const Index = () => {
  useEffect(() => {
    console.log('Index page mounted');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero 
          title="GraphPhile" 
          subtitle="Express your creativity with our designer graphic tees"
          bgImage="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
        />
        <div className="container mx-auto px-4 py-8">
          <FeaturedCollection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
