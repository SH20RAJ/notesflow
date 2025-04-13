"use client";

import React from 'react';

export default function Logo({ className = "w-10 h-10", darkMode = false }) {
  return (
    <div className={`${className} rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg`}>
      <span className="text-white font-bold text-lg">N</span>
    </div>
  );
}
