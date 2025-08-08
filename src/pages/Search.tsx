import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const Search: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Search | Graphphile" description="Search Graphphile showcase content." />
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Search</h1>
          <input className="w-full border border-border rounded-md px-4 py-3" placeholder="Type to search (showcase only)" />
          <p className="text-muted-foreground mt-3">This is a non-functional demo search.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
