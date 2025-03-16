
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, User, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // Simulate account creation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to Graphphile. You can now sign in.",
      });
      
      navigate('/signin');
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "There was an error creating your account. Please try again.",
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
                <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                <CardDescription className="text-blue-100 mt-1">
                  Join Graphphile for exclusive t-shirt designs
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="flex justify-between mb-6">
                  <div className="flex items-center w-full">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {step > 1 ? <CheckCircle size={16} /> : "1"}
                    </div>
                    <div className={`h-1 flex-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      2
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {step === 1 ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <User size={18} />
                          </div>
                          <Input 
                            id="fullName" 
                            name="fullName"
                            placeholder="Raj Kumar" 
                            className="pl-10"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <Mail size={18} />
                          </div>
                          <Input 
                            id="email" 
                            name="email"
                            type="email"
                            placeholder="raj.kumar@example.com" 
                            className="pl-10"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <Phone size={18} />
                          </div>
                          <Input 
                            id="phone" 
                            name="phone"
                            placeholder="+91 9876543210" 
                            className="pl-10"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
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
                            minLength={8}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Password must be at least 8 characters long
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <Lock size={18} />
                          </div>
                          <Input 
                            id="confirmPassword" 
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••" 
                            className="pl-10"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-blue-900 border-t-transparent rounded-full"></div>
                        Creating Account...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {step === 1 ? 'Continue' : 'Create Account'} <ArrowRight size={16} />
                      </span>
                    )}
                  </Button>
                  
                  {step === 1 && (
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">
                          Or sign up with
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {step === 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full border-gray-300"
                      onClick={() => {
                        toast({
                          title: "Google Sign-Up",
                          description: "This would connect to Google OAuth (demo only).",
                        });
                      }}
                    >
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5 mr-2" />
                      Google
                    </Button>
                  )}
                </form>
              </CardContent>
              
              <CardFooter className="flex justify-center border-t p-4">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-blue-600 font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;
