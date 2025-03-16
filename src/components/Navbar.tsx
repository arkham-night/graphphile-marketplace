
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={cn(
      'fixed top-0 left-0 w-full z-50 transition-all duration-500',
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' 
        : 'bg-transparent py-6'
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-tighter relative"
          >
            <span className="relative z-10">graphphile</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" isActive={location.pathname === '/'}>Home</NavLink>
            <NavLink to="/products" isActive={location.pathname === '/products'}>Shop</NavLink>
            <NavLink to="/collections" isActive={location.pathname === '/collections'}>Collections</NavLink>
            <NavLink to="/about" isActive={location.pathname === '/about'}>About</NavLink>
          </nav>
          
          {/* Action Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="focus:outline-none" aria-label="Search">
              <Search className="w-5 h-5 transition-colors duration-200 hover:text-primary/70" />
            </button>
            <Link to="/account" className="focus:outline-none" aria-label="Account">
              <User className="w-5 h-5 transition-colors duration-200 hover:text-primary/70" />
            </Link>
            <Link 
              to="/cart" 
              className="relative focus:outline-none"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5 transition-colors duration-200 hover:text-primary/70" />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end">
            <button 
              className="focus:outline-none"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-8 mt-10">
            <MobileNavLink to="/" isActive={location.pathname === '/'}>Home</MobileNavLink>
            <MobileNavLink to="/products" isActive={location.pathname === '/products'}>Shop</MobileNavLink>
            <MobileNavLink to="/collections" isActive={location.pathname === '/collections'}>Collections</MobileNavLink>
            <MobileNavLink to="/about" isActive={location.pathname === '/about'}>About</MobileNavLink>
          </nav>
          
          <div className="flex items-center justify-around mt-auto pb-8">
            <Link to="/search" className="p-3 rounded-full bg-secondary" aria-label="Search">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/account" className="p-3 rounded-full bg-secondary" aria-label="Account">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="p-3 rounded-full bg-secondary relative" aria-label="Shopping bag">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  isActive: boolean;
}

const NavLink = ({ children, to, isActive }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "relative text-sm py-1 font-medium text-foreground transition-colors duration-200 group",
        isActive ? "text-primary" : "hover:text-primary/70"
      )}
    >
      {children}
      <span 
        className={cn(
          "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
};

const MobileNavLink = ({ children, to, isActive }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-xl font-medium transition-colors duration-200",
        isActive ? "text-primary" : "text-foreground"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
