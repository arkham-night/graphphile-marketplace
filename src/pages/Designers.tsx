import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const Designers: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Our Designers | Graphphile" description="Meet the creative minds behind Graphphile's graphic tees." />
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Designers</h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover the artists and illustrators crafting our unique designs.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Designers;
