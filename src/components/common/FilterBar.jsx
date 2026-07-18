import React from 'react';

const statuses = ['All', 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

export function FilterBar({ activeFilter, onFilterChange, leads }) {
  const getCount = (status) => {
    if (status === 'All') return leads.length;
    return leads.filter((l) => l.status === status).length;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => {
        const count = getCount(status);
        const isActive = activeFilter === status;
        
        return (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
              isActive 
                ? 'bg-primary text-text shadow-sm' 
                : 'bg-surface text-text/70 dark:text-text/40 border border-border hover:bg-background dark:hover:bg-slate-700 hover:text-text'
            }`}
          >
            {status}
            <span className={`ml-1.5 text-xs ${isActive ? 'text-blue-100 font-normal' : 'text-text/50'}`}>
              ({count})
            </span>
          </button>
        );
      })}
    </div>
  );
}
