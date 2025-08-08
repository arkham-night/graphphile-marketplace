import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Contact | Graphphile" description="Get in touch with Graphphile." />
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Contact</h1>
          <p className="text-muted-foreground mb-6">Email us at support@graphphile.com or use the form below.</p>
          <form className="space-y-4">
            <input className="w-full border border-border rounded-md px-4 py-3" placeholder="Your name" />
            <input className="w-full border border-border rounded-md px-4 py-3" placeholder="Email address" />
            <textarea className="w-full border border-border rounded-md px-4 py-3" rows={4} placeholder="Message" />
            <button className="px-5 py-3 bg-primary text-primary-foreground rounded-md" type="button">Send (Demo)</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
