"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="mb-3">Welcome to NotesFlow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of the NotesFlow application and website (collectively, the &quot;Service&quot;).</p>
              <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Use of the Service</h2>
              <p className="mb-3">NotesFlow is a note-taking application that allows you to create, edit, and organize your notes. All notes are stored locally on your device.</p>
              <p className="mb-3">You are responsible for maintaining the confidentiality of your notes and for all activities that occur under your use.</p>
              <p>You agree not to use the Service for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Intellectual Property</h2>
              <p className="mb-3">The Service and its original content, features, and functionality are and will remain the exclusive property of NotesFlow and its licensors.</p>
              <p>The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of NotesFlow.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. User Content</h2>
              <p className="mb-3">You retain all rights to the content you create and store using the Service. We do not claim ownership over any of your notes or other content.</p>
              <p>Since all notes are stored locally on your device, we do not have access to your content unless you explicitly choose to share it with us (for example, when reporting a bug).</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Disclaimer of Warranties</h2>
              <p className="mb-3">The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
              <p>We do not warrant that the Service will be uninterrupted or error-free, that defects will be corrected, or that the Service or the server that makes it available are free of viruses or other harmful components.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
              <p>In no event shall NotesFlow, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
              <p className="mb-3">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect.</p>
              <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at support@notesflow.com.</p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: May 1, 2023</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-6 px-6 ${darkMode ? 'bg-gray-900/70 text-gray-400' : 'bg-white/70 text-gray-600'} backdrop-blur-md shadow-inner`}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
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
          </div>
        </div>
      </footer>
    </div>
  );
}
