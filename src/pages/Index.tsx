
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedCollection from '@/components/FeaturedCollection';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFeaturedProducts } from '@/lib/products';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <Hero 
        title="Wearable Artistry"
        subtitle="Premium graphic t-shirts crafted with precision and passion for design enthusiasts."
        bgImage="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      />
      
      <FeaturedCollection />
      
      {/* Featured Products */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Products</h2>
              <p className="text-muted-foreground mt-2">Our most popular designs, handpicked for you.</p>
            </div>
            <Link 
              to="/products" 
              className="hidden md:flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <span className="mr-2">View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          
          <div className="text-center mt-10 md:hidden">
            <Link 
              to="/products" 
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium shadow-sm hover:bg-primary/90 transition-all"
            >
              <span className="mr-2">View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Story/About Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-secondary">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-tr-[4rem] rounded-bl-[2rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1606293459339-aa5ac42be048?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Our story" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative z-10"
            >
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full border-2 border-primary" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Our Design Philosophy</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                At Graphphile, we believe that great design transcends mere aesthetics. Every graphic on our t-shirts tells a story, crafted with precision and passion by our team of talented designers.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We combine minimalist principles with bold artistic expression, creating wearable art that resonates with design enthusiasts. Our commitment to quality ensures that every piece not only looks stunning but feels exceptional against your skin.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <span className="mr-2">Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Join Our Community</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for exclusive access to new collections, designer insights, and special offers.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-l-md bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-1 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-white text-primary px-5 py-3 rounded-r-md font-medium hover:bg-white/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
