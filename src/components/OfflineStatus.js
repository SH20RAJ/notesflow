"use client";

import { useState, useEffect } from 'react';

export default function OfflineStatus({ darkMode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine);

    // Show status message when offline
    if (!navigator.onLine) {
      setShowStatus(true);
    }

    const handleOnline = () => {
      setIsOnline(true);
      // Show online status briefly
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleDismiss = () => {
    setShowStatus(false);
  };

  if (!showStatus) return null;

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:w-80 z-50">
      <div className={`rounded-xl shadow-lg p-4 ${
        isOnline 
          ? (darkMode ? 'bg-green-800/90 text-white' : 'bg-green-50 text-green-800') 
          : (darkMode ? 'bg-amber-800/90 text-white' : 'bg-amber-50 text-amber-800')
      } border ${
        isOnline
          ? (darkMode ? 'border-green-700' : 'border-green-200')
          : (darkMode ? 'border-amber-700' : 'border-amber-200')
      }`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isOnline 
                ? (darkMode ? 'bg-green-700' : 'bg-green-100') 
                : (darkMode ? 'bg-amber-700' : 'bg-amber-100')
            }`}>
              {isOnline ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-sm">
                {isOnline ? 'You\'re back online!' : 'You\'re offline'}
              </h3>
              <button 
                onClick={handleDismiss}
                className="ml-3 -mt-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-xs mt-1">
              {isOnline 
                ? 'All features are now available.' 
                : 'NotesFlow works offline. Your notes are safely stored on your device.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
