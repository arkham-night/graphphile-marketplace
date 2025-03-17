
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface GoogleAuthButtonProps {
  mode: 'signin' | 'signup';
  className?: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ mode, className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleGoogleAuth = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would connect to Google OAuth
      // For now, we'll simulate the authentication process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful authentication
      const actionText = mode === 'signin' ? 'Sign In' : 'Sign Up';
      
      toast({
        title: `Google ${actionText} Successful`,
        description: "Welcome to Graphphile!",
      });
      
      // Redirect based on the mode
      navigate('/account');
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "There was an error authenticating with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button 
      type="button" 
      variant="outline" 
      className={className}
      onClick={handleGoogleAuth}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
          Connecting...
        </span>
      ) : (
        <>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5 mr-2" />
          Google
        </>
      )}
    </Button>
  );
};

export default GoogleAuthButton;
