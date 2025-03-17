
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import GoogleAuthButton from '@/components/GoogleAuthButton';
import { supabase } from '@/lib/supabase';

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For admin mode, use hardcoded credentials
      if (isAdmin && formData.email === 'admin' && formData.password === '12345678') {
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin dashboard.",
        });
        // Redirect to admin dashboard
        navigate('/admin');
        return;
      }

      // For regular users, use Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Login Successful",
        description: "Welcome back to Graphphile!",
      });
      navigate('/account');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      
      <main className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-blue-100 shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">
                    {isAdmin ? "Admin Login" : "Sign In"}
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsAdmin(!isAdmin)}
                    className="text-white hover:bg-blue-700"
                  >
                    {isAdmin ? "Customer Login" : "Admin Login"}
                  </Button>
                </div>
                <CardDescription className="text-blue-100 mt-1">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {isAdmin ? "Username" : "Email"}
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        {isAdmin ? <User size={18} /> : <Mail size={18} />}
                      </div>
                      <Input 
                        id="email" 
                        name="email"
                        type={isAdmin ? "text" : "email"}
                        placeholder={isAdmin ? "admin" : "youremail@example.com"}
                        className="pl-10"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      {!isAdmin && (
                        <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                          Forgot password?
                        </Link>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Lock size={18} />
                      </div>
                      <Input 
                        id="password" 
                        name="password"
                        type="password"
                        placeholder="••••••••" 
                        className="pl-10"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {isAdmin && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Default admin: username <span className="font-mono">admin</span>, password <span className="font-mono">12345678</span>
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-blue-900 border-t-transparent rounded-full"></div>
                        Signing In...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Sign In <ArrowRight size={16} />
                      </span>
                    )}
                  </Button>
                  
                  {!isAdmin && (
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {!isAdmin && (
                    <GoogleAuthButton 
                      mode="signin"
                      className="w-full border-gray-300"
                    />
                  )}
                </form>
              </CardContent>
              
              {!isAdmin && (
                <CardFooter className="flex justify-center border-t p-4">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                      Sign up now
                    </Link>
                  </p>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
