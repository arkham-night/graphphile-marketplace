import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const Shipping: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Shipping Info | Graphphile" description="Information about shipping and delivery for the Graphphile showcase." />
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Shipping Information</h1>
          <p className="text-muted-foreground max-w-2xl">This is a showcase site; no physical shipments are made.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;
