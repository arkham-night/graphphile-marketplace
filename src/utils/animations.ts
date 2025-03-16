
import { useEffect, useState, useRef } from 'react';

// Hook to detect when an element is in viewport
export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView];
}

// Hook for image loading with blur effect
export function useImageLoad() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };
  
  return { isLoaded, handleImageLoaded, className: `transition-all duration-500 ${isLoaded ? 'image-loaded' : 'image-loading'}` };
}

// Hook for staggered animations
export function useStaggeredAnimation(count: number, baseDelay = 100) {
  return Array.from({ length: count }, (_, i) => ({
    style: { 
      animationDelay: `${baseDelay * i}ms`,
      opacity: 0,
      transform: 'translateY(20px)'
    },
    className: 'animate-fade-in-up'
  }));
}

// Smooth scroll function
export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
