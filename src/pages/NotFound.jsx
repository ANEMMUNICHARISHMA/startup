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
        <div className="absolute inset-0 bg-primary/20 dark:bg-blue-400/10 blur-2xl rounded-full scale-125" />
        
        {/* Main circular icon card */}
        <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-surface dark:bg-[#111827] border border-border dark:border-border shadow-lg text-primary dark:text-primary">
          <AlertOctagon className="w-10 h-10" />
        </div>
      </div>

      {/* Typography headers explaining the 404 code state */}
      <h1 className="font-display font-extrabold text-5xl md:text-6xl text-text dark:text-slate-50 tracking-tight">
        404
      </h1>
      
      <h2 className="mt-2 font-display font-bold text-lg md:text-xl text-text dark:text-text dark:text-text/30">
        Page Not Found
      </h2>

      <p className="mt-3 text-xs md:text-sm text-text/60 dark:text-text/50 max-w-sm mx-auto leading-relaxed">
        The page you are looking for doesn't exist, was moved, or has been deleted. Double check the address and try again.
      </p>

      {/* Modern interactive search helper bar */}
      <div className="mt-8 w-full max-w-xs relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-text/50 dark:text-text/60 pointer-events-none" />
        <input
          type="text"
          readOnly
          placeholder="Searching workspace..."
          value="Go back to CRM Dashboard"
          className="w-full h-9 pl-9 pr-4 text-xs font-semibold text-text/70 dark:text-text/40 dark:text-slate-350 bg-surface hover:bg-slate-250 dark:bg-background/60 dark:hover:bg-background border border-border dark:border-border rounded-lg cursor-pointer text-left outline-none transition-all"
          onClick={() => navigate('/')}
        />
      </div>

      {/* Action Buttons: Go Back or Home navigation */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {/* Go back in browser history */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 h-9 px-4 text-xs font-semibold text-slate-650 hover:text-slate-950 dark:text-slate-350 dark:hover:text-text/20 bg-background hover:bg-surface dark:hover:bg-slate-700 dark:bg-surface/40 dark:hover:bg-surface border border-border dark:border-border rounded-lg cursor-pointer transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Go Back
        </button>

        {/* Go back to index dashboard router path */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 h-9 px-4 bg-primary hover:bg-primary text-text font-semibold text-xs rounded-lg shadow-sm shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-97 cursor-pointer transition-all"
        >
          <Home className="w-3.5 h-3.5" />
          Return Home
        </button>
      </div>
    </div>
  );
}
