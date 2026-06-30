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
      <div className="flex bg-white dark:bg-[#131826] rounded-xl border border-slate-200 dark:border-[#1F2937] p-1.5 shadow-sm overflow-x-auto w-full md:w-auto">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setDateRange(option.value)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              dateRange === option.value
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-slate-500 text-xs font-medium px-4 py-2 rounded-xl border border-slate-200 dark:border-[#1F2937] bg-white dark:bg-[#131826]/50">
        <Clock size={14} className="text-slate-400" />
        Calculated in real-time
      </div>
    </div>
  );
};
