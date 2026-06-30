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
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 hover:text-slate-900 dark:text-white'
            }`}
          >
            {status}
            <span className={`ml-1.5 text-xs ${isActive ? 'text-blue-100 font-normal' : 'text-slate-400'}`}>
              ({count})
            </span>
          </button>
        );
      })}
    </div>
  );
}
