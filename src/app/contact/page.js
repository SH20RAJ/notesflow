"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  // Check for dark mode preference on initial render
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill out all required fields.'
      });
      return;
    }

    // In a real application, you would send this data to your backend
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-6">We&apos;d love to hear from you! Whether you have a question about NotesFlow, need help with the application, or want to provide feedback, please don&apos;t hesitate to reach out.</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">support@notesflow.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Social Media</h3>
                    <div className="flex gap-2 mt-1">
                      <a href="https://www.linkedin.com/in/sh20raj/" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">LinkedIn</a>
                      <span>•</span>
                      <a href="#" className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">Twitter</a>
                      <span>•</span>
                      <a href="#" className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">GitHub</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-gray-50'}`}>
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-sm">We typically respond to all inquiries within 24-48 hours during business days.</p>
              </div>
            </div>

            <div>
              {formStatus.submitted && formStatus.success ? (
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-green-900/30 border border-green-700' : 'bg-green-50 border border-green-200'} flex flex-col items-center justify-center h-full`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-center">{formStatus.message}</p>
                  <button
                    onClick={() => setFormStatus(prev => ({...prev, submitted: false}))}
                    className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formStatus.submitted && !formStatus.success && (
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-red-900/30 border border-red-700' : 'bg-red-50 border border-red-200'} mb-4`}>
                      <p className="text-red-600 dark:text-red-400">{formStatus.message}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium">Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg shadow-sm outline-none ${darkMode ? 'bg-gray-800 text-white border border-gray-700 focus:border-indigo-500' : 'bg-white text-gray-800 border border-gray-200 focus:border-indigo-500'}`}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg shadow-sm outline-none ${darkMode ? 'bg-gray-800 text-white border border-gray-700 focus:border-indigo-500' : 'bg-white text-gray-800 border border-gray-200 focus:border-indigo-500'}`}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block mb-1 font-medium">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg shadow-sm outline-none ${darkMode ? 'bg-gray-800 text-white border border-gray-700 focus:border-indigo-500' : 'bg-white text-gray-800 border border-gray-200 focus:border-indigo-500'}`}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-1 font-medium">Message <span className="text-red-500">*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className={`w-full px-4 py-2 rounded-lg shadow-sm outline-none ${darkMode ? 'bg-gray-800 text-white border border-gray-700 focus:border-indigo-500' : 'bg-white text-gray-800 border border-gray-200 focus:border-indigo-500'}`}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium shadow-md transition-all duration-300 transform hover:scale-[1.02] w-full"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
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
