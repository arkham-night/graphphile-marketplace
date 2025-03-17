
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="px-4 mb-20">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-yellow-400 text-blue-900 text-sm font-medium mb-3">OUR STORY</span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-blue-900">Crafting Unique Indian Graphic Tees</h1>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  At Graphphile, we're passionate about bringing authentic Indian artistic expression to 
                  premium quality t-shirts. Our journey began in 2020 with a simple mission: to celebrate 
                  the rich cultural heritage of India through wearable art.
                </p>
                <Button 
                  className="bg-blue-700 hover:bg-blue-800 text-white" 
                  asChild
                >
                  <Link to="/products">
                    <span className="mr-2">Explore Our Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-tr-[4rem] rounded-bl-[2rem] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                    alt="Team working on t-shirt designs" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full" />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Mission & Values */}
        <section className="py-20 px-4 bg-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-yellow-400 text-blue-900 text-sm font-medium mb-3">OUR MISSION</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-blue-900">More Than Just T-Shirts</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                We believe that fashion should tell a story and connect people to cultural narratives. 
                Every Graphphile design is created with purpose and meaning.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Cultural Connection</h3>
                <p className="text-muted-foreground">
                  We bridge traditional Indian artistry with contemporary global fashion trends, 
                  creating unique designs that resonate with cultural enthusiasts worldwide.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Ethical Production</h3>
                <p className="text-muted-foreground">
                  We're committed to ethical manufacturing, working with local producers who 
                  provide fair wages and maintain responsible environmental practices.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Premium Quality</h3>
                <p className="text-muted-foreground">
                  We use only the highest quality materials to ensure our t-shirts are comfortable, 
                  durable, and maintain their vibrancy wash after wash.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-yellow-400 text-blue-900 text-sm font-medium mb-3">OUR TEAM</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-blue-900">The Creative Minds</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Meet the passionate individuals who bring Graphphile designs to life. Our team combines 
                artistic talent with business acumen to deliver exceptional products.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Ravi Kumar",
                  role: "Founder & Creative Director",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Ananya Sharma",
                  role: "Head of Design",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Vikram Singh",
                  role: "Production Manager",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Priya Patel",
                  role: "Marketing Specialist",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-center"
                >
                  <div className="mb-4 rounded-full overflow-hidden mx-auto w-48 h-48">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-blue-800 text-white">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Join Our Journey</h2>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                Become part of the Graphphile story. Explore our collections and wear art that speaks to your identity.
              </p>
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-medium"
                asChild
              >
                <Link to="/products">
                  <span className="mr-2">Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
