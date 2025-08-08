import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">About Graphphile</h1>
          <p className="text-muted-foreground max-w-2xl">
            We celebrate India’s artistic heritage through wearable design. Crafted with premium cotton and attention to detail.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
