"use client";

import { useState, useEffect } from 'react';

export default function PWAInstallPrompt({ darkMode }) {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  // Listen for the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setInstallPrompt(e);
      // Update UI to notify the user they can install the PWA
      setIsInstallable(true);
      
      // Show the prompt after a delay
      setTimeout(() => {
        // Only show if not already installed and not dismissed recently
        const promptDismissed = localStorage.getItem('pwaPromptDismissed');
        const dismissedTime = promptDismissed ? parseInt(promptDismissed) : 0;
        const dayInMs = 24 * 60 * 60 * 1000;
        
        if (!promptDismissed || (Date.now() - dismissedTime > dayInMs)) {
          setShowPrompt(true);
        }
      }, 3000);
    };

    // Check if the app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone === true) {
        setIsInstalled(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', () => {
      // Hide the prompt when installed
      setShowPrompt(false);
      setIsInstallable(false);
      setIsInstalled(true);
      // Log install to analytics
      console.log('PWA was installed');
    });

    // Check if already installed
    checkIfInstalled();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    
    // Show the install prompt
    installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the saved prompt since it can't be used again
      setInstallPrompt(null);
    });
    
    // Hide our custom install UI
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember dismissal for 24 hours
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };

  if (!showPrompt || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-80 z-50">
      <div className={`rounded-xl shadow-lg p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white text-lg font-bold">N</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Install NotesFlow</h3>
            <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Install this app on your device for offline access and a better experience.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium shadow-sm transition-all duration-300"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className={`py-2 px-3 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
