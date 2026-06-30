// Import necessary React and Lucide icons for UI and navigation
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, AlertOctagon } from 'lucide-react';

/**
 * NotFound Component
 * Displays a premium 404 Error page when a route does not match any definition.
 * Inspired by Linear's clean dark/light UI with sleek shadows and subtle gradients.
 */
export default function NotFound() {
  // Use React Router hook for programmatic navigation
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      {/* 404 Icon & Indicator with subtle floating animation */}
      <div className="relative mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
        {/* Glow backdrop indicator */}
        <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/10 blur-2xl rounded-full scale-125" />
        
        {/* Main circular icon card */}
        <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 dark:bg-[#111827] border border-slate-200 dark:border-slate-700 dark:border-slate-800 shadow-lg text-blue-600 dark:text-blue-400">
          <AlertOctagon className="w-10 h-10" />
        </div>
      </div>

      {/* Typography headers explaining the 404 code state */}
      <h1 className="font-display font-extrabold text-5xl md:text-6xl text-slate-900 dark:text-white dark:text-slate-50 tracking-tight">
        404
      </h1>
      
      <h2 className="mt-2 font-display font-bold text-lg md:text-xl text-slate-800 dark:text-white dark:text-slate-200">
        Page Not Found
      </h2>

      <p className="mt-3 text-xs md:text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
        The page you are looking for doesn't exist, was moved, or has been deleted. Double check the address and try again.
      </p>

      {/* Modern interactive search helper bar */}
      <div className="mt-8 w-full max-w-xs relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 pointer-events-none" />
        <input
          type="text"
          readOnly
          placeholder="Searching workspace..."
          value="Go back to CRM Dashboard"
          className="w-full h-9 pl-9 pr-4 text-xs font-semibold text-slate-600 dark:text-slate-300 dark:text-slate-350 bg-slate-100 dark:bg-slate-800 hover:bg-slate-250 dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:border-slate-800 rounded-lg cursor-pointer text-left outline-none transition-all"
          onClick={() => navigate('/')}
        />
      </div>

      {/* Action Buttons: Go Back or Home navigation */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {/* Go back in browser history */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 h-9 px-4 text-xs font-semibold text-slate-650 hover:text-slate-950 dark:text-slate-350 dark:hover:text-slate-100 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:border-slate-800 rounded-lg cursor-pointer transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Go Back
        </button>

        {/* Go back to index dashboard router path */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-97 cursor-pointer transition-all"
        >
          <Home className="w-3.5 h-3.5" />
          Return Home
        </button>
      </div>
    </div>
  );
}
