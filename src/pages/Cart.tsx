import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const Cart: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Cart | Graphphile" description="Your cart for the Graphphile showcase." />
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Cart</h1>
          <p className="text-muted-foreground">This is a showcase site. Cart functionality is disabled.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
