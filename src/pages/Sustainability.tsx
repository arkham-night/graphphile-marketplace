import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const Sustainability: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Sustainability | Graphphile" description="Our commitment to ethical production and sustainable materials." />
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Sustainability</h1>
          <p className="text-muted-foreground max-w-2xl">
            We prioritize responsible sourcing and eco-friendly processes in every step.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sustainability;
