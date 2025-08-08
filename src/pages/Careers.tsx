import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const Careers: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Careers | Graphphile" description="Join the Graphphile team and help create wearable art." />
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Careers</h1>
          <p className="text-muted-foreground max-w-2xl">
            We’re always looking for passionate creatives and builders. Check back for open roles.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
