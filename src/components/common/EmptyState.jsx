import React from 'react';
import { SearchX, Inbox } from 'lucide-react';

export function EmptyState({ hasAnyLeads, onClearFilters }) {
  if (!hasAnyLeads) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <Inbox className="text-blue-600" size={24} />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No leads found</h3>
        <p className="text-slate-500 dark:text-slate-400">You don't have any leads yet. Add a new lead to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 flex flex-col items-center justify-center text-center shadow-sm">
      <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4">
        <SearchX className="text-slate-400" size={24} />
      </div>
      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No leads match your criteria</h3>
      <p className="text-slate-500 dark:text-slate-400 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
      <button 
        onClick={onClearFilters}
        className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}
