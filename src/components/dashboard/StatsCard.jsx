import React from 'react';

/**
 * StatsCard component displays a metric with an icon, a big number, and a percentage change.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the statistic.
 * @param {string|number} props.value - The main value to display.
 * @param {React.ElementType} props.icon - The Lucide React icon component.
 * @param {number} props.change - The percentage change (positive or negative).
 * @param {string} props.color - The Tailwind text color class for the icon (e.g., 'text-primary').
 * @returns {JSX.Element} The rendered StatsCard component.
 */
const StatsCard = ({ title, value, icon: Icon, change, color }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-surface p-6 rounded-xl shadow-sm border border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text/60 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-text">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg bg-background ${color}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-text/60 ml-2">vs last month</span>
      </div>
    </div>
  );
};

export default React.memo(StatsCard);
