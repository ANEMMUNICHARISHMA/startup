import React from 'react';
import { SearchX, Inbox } from 'lucide-react';

export function EmptyState({ hasAnyLeads, onClearFilters }) {
  if (!hasAnyLeads) {
    return (
      <div className="bg-surface rounded-xl border border-border p-12 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Inbox className="text-primary" size={24} />
        </div>
        <h3 className="text-lg font-medium text-text mb-1">No leads found</h3>
        <p className="text-text/60">You don't have any leads yet. Add a new lead to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl border border-border p-12 flex flex-col items-center justify-center text-center shadow-sm">
      <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-4">
        <SearchX className="text-text/50" size={24} />
      </div>
      <h3 className="text-lg font-medium text-text mb-1">No leads match your criteria</h3>
      <p className="text-text/60 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
      <button 
        onClick={onClearFilters}
        className="text-primary hover:text-blue-700 font-medium text-sm transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}
