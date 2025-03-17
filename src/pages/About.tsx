import React from 'react';
import { motion } from 'framer-motion';
import { Code, Users, ShieldCheck } from 'lucide-react';
import { useInView } from '@/utils/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  const [containerRef, isInView] = useInView();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Improved mobile padding */}
      <div className="bg-gradient-to-b from-blue-50 to-white pt-32 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4 md:mb-6">
            About Graphphile Marketplace
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            A modern platform connecting buyers and sellers through the power of GraphQL
          </p>
        </div>
      </div>

      {/* Mission Section - Improved spacing for mobile */}
      <section className="py-10 md:py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              ref={containerRef as React.RefObject<HTMLDivElement>}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-blue-900">Our Mission</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                At Graphphile Marketplace, we're committed to creating a seamless trading experience powered by modern technologies.
                Our platform leverages GraphQL to provide efficient, flexible data exchange between buyers and sellers.
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                We believe in building community-centric marketplaces that empower individuals and businesses to connect and 
                transact with confidence and ease.
              </p>
            </motion.div>
            <div className="relative h-[250px] sm:h-[350px] md:h-[450px] rounded-lg overflow-hidden shadow-xl mt-6 md:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Improved card layout for mobile */}
      <section className="py-10 md:py-16 px-4 md:px-6 bg-blue-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-blue-900">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="h-full">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="mb-4 bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full">
                  <Code className="text-blue-700" size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3">GraphQL Powered</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Our platform utilizes Postgraphile to automatically generate a powerful GraphQL API from your PostgreSQL database,
                  creating a robust and type-safe interface for all marketplace interactions.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="mb-4 bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full">
                  <Users className="text-blue-700" size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3">Community Focused</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Users can browse listings, communicate with sellers, and complete transactions all within our secure environment
                  designed for optimal performance and user experience.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full sm:col-span-2 md:col-span-1">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="mb-4 bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full">
                  <ShieldCheck className="text-blue-700" size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3">Secure & Reliable</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  We prioritize security and reliability in every aspect of our platform, ensuring your data and transactions
                  are protected with industry-standard encryption and practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section - Improved mobile padding */}
      <section className="py-10 md:py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-blue-900">Our Team</h2>
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
            <p className="text-base md:text-lg text-center mb-4 md:mb-6">
              We're a dedicated team of developers, designers, and marketplace enthusiasts who are passionate about creating exceptional user experiences. 
              With backgrounds in e-commerce, GraphQL development, and community building, we bring diverse expertise to our platform.
            </p>
            <p className="text-base md:text-lg text-center">
              Founded in 2023, we've been working tirelessly to build a marketplace solution that meets the needs of modern online communities and businesses.
            </p>
          </div>
          <div className="mt-8 md:mt-12 text-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/products">
                Explore Our Marketplace
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
