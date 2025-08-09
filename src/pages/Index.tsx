
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedCollection from '@/components/FeaturedCollection';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFeaturedProducts } from '@/lib/products';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Trophy, Star, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Graphphile – Premium Graphic Tees" description="An immersive visual experience by Graphphile." image="/og-image.png" />
      <Navbar />
      
      <Hero 
        title="Premium Indian Graphic Tees"
        subtitle="Artistic t-shirts that tell your story, crafted with love in India."
        bgImage="https://images.unsplash.com/photo-1520975916090-3105956dac38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      />
      
      {/* USP Banner */}
      <section className="py-10 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center md:justify-start gap-3 py-3">
              <div className="p-2 bg-yellow-400 rounded-full">
                <Trophy className="w-5 h-5 text-blue-900" />
              </div>
              <span className="text-sm md:text-base">Premium Quality Cotton</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 py-3">
              <div className="p-2 bg-yellow-400 rounded-full">
                <ShoppingBag className="w-5 h-5 text-blue-900" />
              </div>
              <span className="text-sm md:text-base">Secure Online Payments</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 py-3">
              <div className="p-2 bg-yellow-400 rounded-full">
                <Truck className="w-5 h-5 text-blue-900" />
              </div>
              <span className="text-sm md:text-base">All-India Delivery</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 py-3">
              <div className="p-2 bg-yellow-400 rounded-full">
                <Star className="w-5 h-5 text-blue-900" />
              </div>
              <span className="text-sm md:text-base">4.8/5 Customer Rating</span>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedCollection />
      
      {/* Featured Products */}
      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-sm font-medium px-4 py-1 rounded-full bg-yellow-400 text-blue-900">BESTSELLERS</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 text-blue-900">Customer Favorites</h2>
              <p className="text-muted-foreground mt-2">Our most loved designs, hand-picked for you.</p>
            </div>
            <Link 
              to="/products" 
              className="hidden md:flex items-center text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
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
            <Button 
              asChild
              className="bg-blue-700 hover:bg-blue-800 text-white"
            >
              <Link to="/products">
                <span className="mr-2">View All Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Story/About Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-blue-50">
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
                  src="https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="T-shirt design process at Graphphile" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative z-10"
            >
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full border-2 border-blue-700" />
              <span className="inline-block px-4 py-1 rounded-full bg-yellow-400 text-blue-900 text-sm font-medium mb-3">OUR STORY</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-blue-900">Made in India, Worn Worldwide</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                At Graphphile, we celebrate the rich artistic heritage of India through our graphic t-shirts. Each design tells a story, crafted with passion by our team of talented local designers from across the country.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We combine traditional Indian art forms with contemporary global trends, creating wearable art that resonates with design enthusiasts. Our commitment to quality ensures that every piece not only looks stunning but feels exceptional against your skin.
              </p>
              <Button 
                variant="outline" 
                className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white group"
                asChild
              >
                <Link to="/about">
                  <span className="mr-2">Discover Our Journey</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-blue-800 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Join The Graphphile Family</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for exclusive access to new collections, designer insights, and special offers. Get ₹200 off your first order!
            </p>
            <form className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-l-md bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-1 focus:ring-white/50"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-blue-900 px-5 py-3 rounded-r-md font-medium hover:bg-yellow-300 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
