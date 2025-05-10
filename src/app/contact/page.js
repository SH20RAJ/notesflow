"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Check for dark mode preference on initial render
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
    }
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-white to-gray-50 text-gray-800'}`}>
      {/* Header */}
      <header className={`p-4 md:p-6 flex justify-between items-center ${darkMode ? 'bg-gray-900/50 backdrop-blur-md' : 'bg-white/50 backdrop-blur-md'} shadow-sm`}>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-lg font-bold">N</span>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">NotesFlow</h1>
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-300' : 'bg-gray-100 hover:bg-gray-200 text-indigo-600'} shadow-sm flex items-center gap-1.5 text-xs`}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? "🌙" : "☀️"}
          <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-4xl">
        <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-sm`}>
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

          <div className="max-w-2xl mx-auto">
            <p className="mb-8 text-lg">We&apos;d love to hear from you! Whether you have a question about NotesFlow, need help with the application, or want to provide feedback, please don&apos;t hesitate to reach out.</p>

            <div className="space-y-6 mb-8">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/70' : 'bg-gray-50/80'} backdrop-blur-sm shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <a href="mailto:sh20raj@gmail.com" className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-lg">sh20raj@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/70' : 'bg-gray-50/80'} backdrop-blur-sm shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Social Media</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <a href="https://www.linkedin.com/in/sh20raj/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                      <a href="https://x.com/sh20raj" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                        <span>Twitter</span>
                      </a>
                      <a href="https://github.com/sh20raj/notesflow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/70' : 'bg-gray-50/80'} backdrop-blur-sm shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Open Source</h3>
                    <p className="mb-2">NotesFlow is an open source project. You can contribute, report issues, or suggest features on our GitHub repository.</p>
                    <a href="https://github.com/SH20RAJ/notesflow" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      <span>View on GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-6 px-6 ${darkMode ? 'bg-gray-900/70 text-gray-400' : 'bg-white/70 text-gray-600'} backdrop-blur-md shadow-inner`}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                <span className="text-white text-xs font-bold">N</span>
              </div>
              <p className="font-medium">NotesFlow - Your notes are stored locally for complete privacy</p>
            </div>
            <a
              href="https://github.com/SH20RAJ/notesflow"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 p-1 rounded-lg transition-all duration-300 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>We are open source</span>
            </a>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
