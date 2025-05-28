/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="mb-3">At NotesFlow, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our note-taking application.</p>
              <p>We designed NotesFlow with privacy as a fundamental principle. All your notes are stored locally on your device, and we do not have access to them unless you explicitly choose to share them with us.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Don't Collect</h2>
              <p className="mb-3">NotesFlow is designed to be privacy-focused. We do not collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The content of your notes</li>
                <li>Your personal information (name, email, etc.) unless you voluntarily provide it</li>
                <li>Your browsing history or activity within the app</li>
                <li>Your location data</li>
                <li>Any analytics or tracking data without your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Local Storage</h2>
              <p className="mb-3">All your notes and application preferences are stored locally on your device using your browser&apos;s localStorage mechanism. This means:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your data remains on your device</li>
                <li>We cannot access your notes</li>
                <li>Your notes will be lost if you clear your browser&apos;s localStorage or use a different browser/device (until we implement our upcoming sync feature)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Future Sync Feature</h2>
              <p className="mb-3">We are planning to implement a cross-device synchronization feature in the future. When this feature becomes available:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>It will be entirely optional</li>
                <li>We will use end-to-end encryption to ensure that only you can access your notes</li>
                <li>We will update this privacy policy with detailed information about how the sync feature works and what data is transmitted</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Information We May Collect</h2>
              <p className="mb-3">The only information we may collect is:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email addresses that users voluntarily provide for updates (if you use our &quot;Notify Me&quot; feature)</li>
                <li>Anonymous usage statistics if you explicitly opt-in to help us improve the application</li>
                <li>Information you provide when contacting us for support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Third-Party Services</h2>
              <p className="mb-3">NotesFlow does not use third-party analytics, tracking, or advertising services. We do not share your data with any third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Data Security</h2>
              <p className="mb-3">We are committed to ensuring the security of your data. However, since your notes are stored locally on your device, the security of your data also depends on the security of your device and browser.</p>
              <p>We recommend using a modern, updated browser and keeping your device secure with appropriate password protection and security measures.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Children&apos;s Privacy</h2>
              <p className="mb-3">NotesFlow is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Changes to This Privacy Policy</h2>
              <p className="mb-3">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.</p>
              <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
              <p className="mb-3">If you have any questions about this Privacy Policy, please contact us at:</p>
              <p>sh20raj@gmail.com</p>
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
