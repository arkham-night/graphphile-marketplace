import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-lg text-muted-foreground mb-6">Oops! Page not found</p>
          <a href="/" className="text-primary underline">
            Return to Home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
