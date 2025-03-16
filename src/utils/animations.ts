
import { useEffect, useState, useRef, RefObject } from 'react';

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView(options: InViewOptions = {}): [RefObject<HTMLElement>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', once = false } = options;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return [ref, isInView];
}

export function useImageLoad() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  const className = isLoaded ? 'image-loaded' : 'image-loading';

  return { isLoaded, handleImageLoaded, className };
}

export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Utility function to format Indian prices
export function formatIndianPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Utility for smooth scroll to top
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
