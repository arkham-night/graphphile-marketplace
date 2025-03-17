import React, { useState, useEffect } from 'react';
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react';

const OfflineDetector: React.FC = () => {
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState<boolean>(false);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      // Show the "back online" message briefly
      setShowOfflineMessage(true);
      setTimeout(() => setShowOfflineMessage(false), 3000);
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      setShowOfflineMessage(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  if (!showOfflineMessage) return null;
  
  return (
    <div 
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 safe-bottom transition-all duration-500 ${
        isOffline ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
      }`}
    >
      {isOffline ? (
        <>
          <WifiOff size={16} />
          <span className="text-sm font-medium">You're offline</span>
        </>
      ) : (
        <>
          <Wifi size={16} />
          <span className="text-sm font-medium">Back online</span>
        </>
      )}
    </div>
  );
};

export default OfflineDetector;
