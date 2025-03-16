
import React, { useEffect, useRef } from 'react';
import { useInView, useImageLoad } from '@/utils/animations';
import { ChevronDown } from 'lucide-react';
import { scrollToElement } from '@/utils/animations';

interface HeroProps {
  title: string;
  subtitle: string;
  bgImage: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, bgImage }) => {
  const [containerRef, isInView] = useInView();
  const { isLoaded, handleImageLoaded, className: imageClassName } = useImageLoad();
  const titleRef = useRef<HTMLHeadingElement>(null);
  
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white opacity-0 mb-6 tracking-tight"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
          >
            {title}
          </h1>
          
          <p 
            className="text-lg md:text-xl text-white/90 opacity-0 animate-fade-in"
            style={{ animationDelay: '400ms', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
          >
            {subtitle}
          </p>
          
          <button 
            className="mt-8 px-8 py-3 bg-white text-primary font-medium rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 opacity-0 animate-fade-in transform hover:translate-y-[-2px] active:translate-y-[0px]"
            style={{ animationDelay: '600ms' }}
          >
            Explore Collection
          </button>
        </div>
        
        {/* Scroll Down Indicator */}
        <button 
          onClick={() => scrollToElement('featured')}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce rounded-full w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
