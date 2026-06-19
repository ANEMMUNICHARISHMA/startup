import React from 'react';

/**
 * @typedef {Object} StatsCardProps
 * @property {string} title - The title of the metric
 * @property {string|number} value - The main metric value
 * @property {React.ReactNode} icon - The lucide-react icon component
 * @property {number} change - Percentage change compared to last month
 * @property {string} color - Tailwind color class for the icon background
 */

/**
 * Displays a single metric card with an icon, value, and percentage change.
 *
 * @param {StatsCardProps} props - The component props
 * @returns {JSX.Element} The StatsCard component
 */
export function StatsCard({ title, value, icon, change, color }) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
      </div>
      <div className="mt-2 text-sm">
        <span className={`font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
        <span className="text-slate-500 ml-2">vs last month</span>
      </div>
    </div>
  );
}
