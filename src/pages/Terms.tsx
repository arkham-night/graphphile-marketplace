import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Terms of Service | Graphphile" description="The terms governing the use of the Graphphile website." />
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto prose prose-slate dark:prose-invert">
          <h1>Terms of Service</h1>
          <p>This is a non-transactional showcase. All content is for demonstration only.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
