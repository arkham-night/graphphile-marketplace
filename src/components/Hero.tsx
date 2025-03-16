
import React, { useEffect, useRef } from 'react';
import { useInView, useImageLoad } from '@/utils/animations';
import { ChevronDown } from 'lucide-react';
import { scrollToElement } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  bgImage: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, bgImage }) => {
  const [containerRef, isInView] = useInView();
  const { isLoaded, handleImageLoaded, className: imageClassName } = useImageLoad();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isInView && titleRef.current) {
      titleRef.current.classList.add('animate-fade-in');
    }
  }, [isInView]);

  return (
    <section 
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Blur Loading Effect */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={bgImage}
          alt="Hero background"
          className={`w-full h-full object-cover ${imageClassName}`}
          onLoad={handleImageLoaded}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-blue-900/70" />
      </div>
      
      {/* Yellow Accent Element */}
      <div className="absolute top-1/3 right-8 w-24 h-24 md:w-36 md:h-36 rounded-full bg-yellow-400 opacity-90 hidden md:block"></div>
      <div className="absolute bottom-1/4 left-8 w-16 h-16 md:w-24 md:h-24 rounded-full bg-yellow-400 opacity-80 hidden md:block"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white opacity-0 mb-6 tracking-tight"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
          >
            {title}
          </h1>
          
          <p 
            className="text-lg md:text-xl text-white/90 opacity-0 animate-fade-in mb-8"
            style={{ animationDelay: '400ms', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
          >
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Button 
              onClick={() => navigate('/products')}
              className="px-8 py-3 bg-yellow-400 text-blue-900 font-medium rounded-full shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-[0px] min-w-[180px]"
            >
              Shop Now
            </Button>
            
            <Button 
              onClick={() => navigate('/collections')}
              variant="outline"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full shadow-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-[0px] min-w-[180px]"
            >
              Explore Collections
            </Button>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <button 
          onClick={() => scrollToElement('featured')}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce rounded-full w-12 h-12 flex items-center justify-center bg-blue-700/30 backdrop-blur-sm border border-white/20"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
