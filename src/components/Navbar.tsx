import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingBag, User, Search, Menu, X, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
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

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 w-full z-50 transition-all duration-500',
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
        : 'bg-transparent py-5'
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className={cn(
              "text-2xl font-bold tracking-tighter relative transition-colors",
              isScrolled || !location.pathname.includes('/')
                ? "text-blue-900"
                : "text-white"
            )}
          >
            <span className="relative z-10">graphphile</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              isActive={location.pathname === '/'} 
              isScrolled={isScrolled}
              pathname={location.pathname}
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              isActive={location.pathname === '/products'} 
              isScrolled={isScrolled}
              pathname={location.pathname}
            >
              Shop
            </NavLink>
            <NavLink 
              to="/collections" 
              isActive={location.pathname === '/collections'} 
              isScrolled={isScrolled}
              pathname={location.pathname}
            >
              Collections
            </NavLink>
            <NavLink 
              to="/about" 
              isActive={location.pathname === '/about'} 
              isScrolled={isScrolled}
              pathname={location.pathname}
            >
              About
            </NavLink>
          </nav>
          
          {/* Action Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              className={cn(
                "focus:outline-none transition-colors duration-200",
                isScrolled || !location.pathname.includes('/') 
                  ? "text-blue-900 hover:text-blue-700" 
                  : "text-white hover:text-white/80"
              )} 
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {user ? (
              <Link 
                to="/account" 
                className={cn(
                  "focus:outline-none transition-colors duration-200",
                  isScrolled || !location.pathname.includes('/') 
                    ? "text-blue-900 hover:text-blue-700" 
                    : "text-white hover:text-white/80"
                )} 
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignIn}
                className={cn(
                  "focus:outline-none transition-colors duration-200 font-medium",
                  isScrolled || !location.pathname.includes('/') 
                    ? "text-blue-900 hover:text-blue-900 hover:bg-blue-100" 
                    : "text-white hover:text-white hover:bg-white/20"
                )}
              >
                <LogIn className="w-4 h-4 mr-1" />
                Sign In
              </Button>
            )}
            
            <Link 
              to="/cart" 
              className={cn(
                "relative focus:outline-none transition-colors duration-200",
                isScrolled || !location.pathname.includes('/') 
                  ? "text-blue-900 hover:text-blue-700" 
                  : "text-white hover:text-white/80"
              )}
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-yellow-400 text-blue-900 text-xs flex items-center justify-center font-medium">
                0
              </span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className={cn(
              "md:hidden focus:outline-none",
              isScrolled || !location.pathname.includes('/') 
                ? "text-blue-900" 
                : "text-white"
            )}
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
              className="focus:outline-none text-blue-900"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-center justify-center border-b border-gray-100 pb-6 mb-6">
            <Link 
              to="/" 
              className="text-2xl font-bold tracking-tighter text-blue-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              graphphile
            </Link>
          </div>
          
          <nav className="flex flex-col space-y-8 mt-4">
            <MobileNavLink to="/" isActive={location.pathname === '/'}>Home</MobileNavLink>
            <MobileNavLink to="/products" isActive={location.pathname === '/products'}>Shop</MobileNavLink>
            <MobileNavLink to="/collections" isActive={location.pathname === '/collections'}>Collections</MobileNavLink>
            <MobileNavLink to="/about" isActive={location.pathname === '/about'}>About</MobileNavLink>
            
            {!user && (
              <>
                <MobileNavLink to="/signin" isActive={location.pathname === '/signin'}>Sign In</MobileNavLink>
                <MobileNavLink to="/signup" isActive={location.pathname === '/signup'}>Create Account</MobileNavLink>
              </>
            )}
          </nav>
          
          <div className="flex items-center justify-around mt-auto pb-8">
            <Link 
              to="/search" 
              className="p-3 rounded-full bg-blue-50 text-blue-900"
              aria-label="Search"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search className="w-5 h-5" />
            </Link>
            
            {user ? (
              <Link 
                to="/account" 
                className="p-3 rounded-full bg-blue-50 text-blue-900"
                aria-label="Account"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link 
                to="/signin" 
                className="p-3 rounded-full bg-blue-50 text-blue-900"
                aria-label="Sign in"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="w-5 h-5" />
              </Link>
            )}
            
            <Link 
              to="/cart" 
              className="p-3 rounded-full bg-blue-50 text-blue-900 relative"
              aria-label="Shopping bag"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-400 text-blue-900 text-xs flex items-center justify-center font-medium">
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
  isScrolled?: boolean;
  pathname?: string;
}

const NavLink = ({ children, to, isActive, isScrolled = true, pathname = '' }: NavLinkProps) => {
  const isHomePage = pathname === '/';
  const textColor = isScrolled || !isHomePage 
    ? "text-blue-900" 
    : "text-white";
  
  return (
    <Link
      to={to}
      className={cn(
        "relative text-sm py-1 font-medium transition-colors duration-200 group",
        textColor,
        isActive 
          ? "" 
          : isScrolled || !isHomePage 
            ? "hover:text-blue-700" 
            : "hover:text-white/80"
      )}
    >
      {children}
      <span 
        className={cn(
          "absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform origin-left transition-transform duration-300",
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
        isActive ? "text-blue-700" : "text-blue-900 hover:text-blue-700"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
