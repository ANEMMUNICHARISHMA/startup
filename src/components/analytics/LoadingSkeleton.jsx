import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Filters Skeleton */}
      <div className="h-10 bg-slate-200 rounded-lg w-full max-w-sm mb-8"></div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-32">
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-80">
            <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
            <div className="h-48 bg-slate-100 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
