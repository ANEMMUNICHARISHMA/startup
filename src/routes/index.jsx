import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import the primary layout frame which remains static across view swaps
import DashboardLayout from '../components/common/DashboardLayout';

/**
 * Lazy load pages dynamically for optimization.
 * This separates bundles per page view so only required Javascript is parsed.
 * Suspense will handle display fallbacks during script retrievals.
 */
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));

/**
 * SkeletalLoading Component
 * Renders a highly styled loading spinner state to match the premium dark/light mode canvas.
 * Renders during React Lazy code chunk loading transitions.
 */
function SkeletalLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 space-y-4">
      {/* Premium spinner wrapper containing custom spins animations */}
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/10 dark:border-blue-400/5" />
        <div className="absolute inset-0 rounded-full border-t-2 border-blue-600 dark:border-blue-400 animate-spin" />
      </div>
      {/* Loading brief indicator */}
      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase animate-pulse">
        Retrieving Viewport...
      </span>
    </div>
  );
}

/**
 * AppRoutes Component
 * Contains the routing setup for the Startup CRM Lite application using Router v6.
 * Incorporates Suspense containers at the base layout node.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Main layout router node containing shared shell frameworks (sidebar/header) */}
      <Route element={<DashboardLayout />}>
        {/*
          Nested Page views wrapped individually or globally inside Suspense.
          We wrap all children here inside a single Suspense component so that any 
          page change displays the spinner fallback during bundle download.
        */}
        <Route 
          path="/" 
          element={
            <Suspense fallback={<SkeletalLoading />}>
              <Dashboard />
            </Suspense>
          } 
        />
        <Route 
          path="/leads" 
          element={
            <Suspense fallback={<SkeletalLoading />}>
              <Leads />
            </Suspense>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <Suspense fallback={<SkeletalLoading />}>
              <Analytics />
            </Suspense>
          } 
        />
        {/* Fallback 404 handler path rendering our NotFound component */}
        <Route 
          path="*" 
          element={
            <Suspense fallback={<SkeletalLoading />}>
              <NotFound />
            </Suspense>
          } 
        />
      </Route>
    </Routes>
  );
}
