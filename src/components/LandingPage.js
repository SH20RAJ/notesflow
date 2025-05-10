"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PWAInstallPrompt from './PWAInstallPrompt';
import OfflineStatus from './OfflineStatus';

export default function LandingPage({ onGetStarted, darkMode }) {
  const [email, setEmail] = useState('');
  const [isPWA, setIsPWA] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Check if the app is running as a PWA
    if (window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true) {
      setIsPWA(true);
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Add click handler to the install button
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.addEventListener('click', handleInstallClick);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      // Clean up the click handler
      const installButton = document.getElementById('pwa-install-button');
      if (installButton) {
        installButton.removeEventListener('click', handleInstallClick);
      }
    };
  }, []);

  // Function to handle the install button click
  const handleInstallClick = () => {
    if (!deferredPrompt) {
      // The deferred prompt isn't available
      // Show instructions for manual installation
      alert('To install NotesFlow: \n\n' +
            'On Chrome/Edge (Desktop): Click the install icon (+) in the address bar\n' +
            'On Safari (iOS): Tap the share icon and then "Add to Home Screen"\n' +
            'On Chrome (Android): Tap the menu button and then "Add to Home Screen"');
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the saved prompt since it can't be used again
      setDeferredPrompt(null);
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-white to-gray-50 text-gray-400'}`}>
      {/* PWA Install Prompt */}
      <PWAInstallPrompt darkMode={darkMode} />

      {/* Offline Status */}
      <OfflineStatus darkMode={darkMode} />
      {/* Header */}
      <header className={`p-4 md:p-6 flex justify-between items-center ${darkMode ? 'bg-gray-900/50 backdrop-blur-md' : 'bg-white/50 backdrop-blur-md'} shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-lg font-bold">N</span>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">NotesFlow</h1>
        </div>
        <button
          onClick={onGetStarted}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium shadow-md transition-all duration-300 transform hover:scale-[1.02]"
        >
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-8 md:gap-16">
        <div className="md:w-1/2 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Your thoughts, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">beautifully organized</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-900 dark:text-gray-500">
            NotesFlow is a privacy-focused note-taking app that helps you capture ideas, organize thoughts, and boost your productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={onGetStarted}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium shadow-md transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Start Taking Notes
            </button>

          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Privacy-Focused</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No Account Required</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 max-w-xl relative">
          <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${darkMode ? 'shadow-indigo-500/20' : 'shadow-indigo-500/30'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${darkMode ? 'from-blue-600/20 to-indigo-700/20' : 'from-blue-500/10 to-indigo-600/10'} backdrop-blur-sm z-0`}></div>
            <div className="relative z-10 p-1">
              <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className={`h-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center px-4 gap-2`}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className={`h-10 w-1/3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-4`}></div>
                  <div className={`h-4 w-full rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-2`}></div>
                  <div className={`h-4 w-5/6 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-2`}></div>
                  <div className={`h-4 w-full rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-2`}></div>
                  <div className={`h-4 w-4/6 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-6`}></div>
                  <div className={`h-4 w-full rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-2`}></div>
                  <div className={`h-4 w-full rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-2`}></div>
                  <div className={`h-4 w-3/6 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-6`}></div>
                  <div className={`h-4 w-full rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-2`}></div>
                  <div className={`h-4 w-5/6 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-2`}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 blur-2xl opacity-50"></div>
          <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 blur-2xl opacity-40"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 px-6 md:px-12 ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
            Powerful Features, Simple Interface
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/80'} backdrop-blur-sm shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Rich Text Editing</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                Create beautiful notes with formatting, lists, and more. Our editor makes it easy to organize your thoughts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/80'} backdrop-blur-sm shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Zen Mode</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                Focus on your writing with our distraction-free Zen Mode. Eliminate UI elements and immerse yourself in your thoughts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/80'} backdrop-blur-sm shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                Your notes are stored locally on your device. We don&apos;t track you or collect your data. Your thoughts remain private.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offline & PWA Section */}
      <section className={`py-16 px-6 md:px-12 ${darkMode ? 'bg-gray-900/30' : 'bg-white/30'} backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 mb-4">
                Available Now
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Works Offline, Install as an App
              </h2>
              <p className="text-lg mb-6 text-gray-400 dark:text-gray-500">
                NotesFlow is a Progressive Web App (PWA) that works offline and can be installed on your device for quick access.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Offline Access</h3>
                    <p className="text-gray-400 dark:text-gray-500">
                      Create and edit notes even without an internet connection. Your changes are saved locally.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Install on Any Device</h3>
                    <p className="text-gray-400 dark:text-gray-500">
                      Add NotesFlow to your home screen on mobile or desktop for a native app-like experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Fast & Responsive</h3>
                    <p className="text-gray-400 dark:text-gray-500">
                      Enjoy a smooth, fast experience with quick loading times, even on slower connections.
                    </p>
                  </div>
                </div>
              </div>

              {!isPWA && (
                <button
                  id="pwa-install-button"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium shadow-md transition-all duration-300 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Install NotesFlow
                </button>
              )}
            </div>

            <div className="md:w-1/2">
              <div className={`rounded-2xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">N</span>
                    </div>
                    <span className="font-medium">NotesFlow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'} flex items-center gap-1`}>
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span>Available Offline</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className={`h-6 w-3/4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
                    <div className={`h-4 w-full rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
                    <div className={`h-4 w-5/6 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
                    <div className={`h-4 w-full rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
                  </div>

                  <div className="mt-8 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-sm flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium">You're offline</p>
                      <p className="mt-1 text-amber-700 dark:text-amber-400">Don't worry! NotesFlow works offline. Your notes are safely stored on your device.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 mb-4">
            Coming Soon
          </div>
          <h2 className="text-3xl font-bold mb-6">
            Cross-Device Synchronization
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-400 dark:text-gray-500">
            We&apos;re working on secure cloud synchronization to keep your notes in sync across all your devices while maintaining our commitment to privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/80'} backdrop-blur-sm shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center gap-3`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Import/Export JSON</span>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/80'} backdrop-blur-sm shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center gap-3`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>End-to-End Encryption</span>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/80'} backdrop-blur-sm shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center gap-3`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Multi-Device Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-6 md:px-12 ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-md`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to organize your thoughts?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-400 dark:text-gray-500">
            Start using NotesFlow today. No sign-up required, just click and start taking notes.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium shadow-md transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 ${darkMode ? 'bg-gray-900/70 text-gray-400' : 'bg-white/70 text-gray-400'} backdrop-blur-md shadow-inner`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <p className="font-medium">NotesFlow - Your notes are stored locally for complete privacy</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className={`p-2 rounded-lg transition-all duration-300 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              Terms
            </Link>
            <Link href="/privacy" className={`p-2 rounded-lg transition-all duration-300 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              Privacy
            </Link>
            <Link href="/contact" className={`p-2 rounded-lg transition-all duration-300 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              Contact
            </Link>
            <a href="https://www.linkedin.com/in/sh20raj/" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg transition-all duration-300 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
