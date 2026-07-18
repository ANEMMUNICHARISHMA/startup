import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue, onChange, value]);

  // Sync if value prop changes externally (e.g. clear filters)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-text/50" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-2 border border-border rounded-lg leading-5 bg-surface placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors shadow-sm"
        placeholder="Search by name, company, or email..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        aria-label="Search leads"
      />
      {localValue && (
        <button
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-text/50 hover:text-text/70 dark:text-text/40 transition-colors"
          onClick={() => {
            setLocalValue('');
            onChange('');
          }}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
