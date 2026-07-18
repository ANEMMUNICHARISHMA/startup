import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute() {
  const { token, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 space-y-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-primary/10 dark:border-primary/5" />
          <div className="absolute inset-0 rounded-full border-t-2 border-primary dark:border-primary animate-spin" />
        </div>
        <span className="text-xs font-semibold text-text/50 dark:text-text/60 tracking-wider uppercase animate-pulse">
          Authenticating...
        </span>
      </div>
    );
  }

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
