
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8 text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter">graphphile</h2>
            <p className="text-muted-foreground">
              Artistic expression through wearable graphic design, crafted with precision and passion.
            </p>
            <div className="flex space-x-4 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors duration-200" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-200" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-200" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              <FooterLink to="/collections">All Collections</FooterLink>
              <FooterLink to="/products">New Arrivals</FooterLink>
              <FooterLink to="/products?featured=true">Featured</FooterLink>
              <FooterLink to="/products?sale=true">Sale</FooterLink>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/designers">Our Designers</FooterLink>
              <FooterLink to="/sustainability">Sustainability</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                <span>support@graphphile.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                <span>123 Design Street, Creative City, 10001</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-border pt-8 pb-6">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">Join our newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to get special offers, free giveaways, and early access to new collections.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-l-md bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-md font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 mt-6 text-center text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Graphphile. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/shipping">Shipping Info</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  children: React.ReactNode;
  to: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ children, to }) => {
  return (
    <li>
      <Link 
        to={to}
        className="text-muted-foreground hover:text-primary transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;
