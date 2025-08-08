import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const Collections: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Collections | Graphphile" description="Explore curated drops and themed collections of premium graphic tees." />
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Collections</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore curated collections of our premium graphic tees. This section will showcase themed drops and collaborations.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
