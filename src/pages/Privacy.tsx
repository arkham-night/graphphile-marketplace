import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Privacy Policy | Graphphile" description="Read how Graphphile handles your data and privacy." />
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto prose prose-slate dark:prose-invert">
          <h1>Privacy Policy</h1>
          <p>We value your privacy. This is a showcase site; no personal data is collected.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
