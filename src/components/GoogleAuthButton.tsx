
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

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
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/account`
        }
      });

      if (error) throw error;

      // No need for toast here as we're redirecting to Google
      
    } catch (error) {
      console.error('Google auth error:', error);
      toast({
        title: "Authentication Failed",
        description: "There was an error authenticating with Google. Please try again.",
        variant: "destructive",
      });
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
