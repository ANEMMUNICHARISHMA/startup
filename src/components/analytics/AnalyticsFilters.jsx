import React from 'react';
import { Clock } from 'lucide-react';

export const AnalyticsFilters = ({ dateRange, setDateRange }) => {
  const options = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'This Year' },
    { value: 'all', label: 'Custom Range' },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <div className="flex bg-surface rounded-xl border border-border p-1.5 shadow-sm overflow-x-auto w-full md:w-auto">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setDateRange(option.value)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              dateRange === option.value
                ? 'bg-surface text-text shadow-sm'
                : 'text-text/50 hover:text-text/30'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-text/60 text-xs font-medium px-4 py-2 rounded-xl border border-border bg-surface/50">
        <Clock size={14} className="text-text/50" />
        Calculated in real-time
      </div>
    </div>
  );
};
