import React, { useMemo } from 'react';

const getIntensityColor = (count) => {
  if (count === 0) return 'bg-slate-200 dark:bg-[#1F2937]';
  if (count === 1) return 'bg-emerald-900/40';
  if (count === 2) return 'bg-emerald-800/60';
  if (count === 3) return 'bg-emerald-600/80';
  if (count >= 4) return 'bg-emerald-500';
  return 'bg-slate-200 dark:bg-[#1F2937]';
};

export const ActivityHeatmap = ({ data }) => {
  const days = useMemo(() => {
    const map = new Map(data.map(item => [item.date, item.count]));
    const result = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      
      result.push({
        date: dateString,
        displayDate: d.toLocaleDateString('default', { month: 'short', day: 'numeric' }),
        count: map.get(dateString) || 0
      });
    }
    return result;
  }, [data]);

  return (
    <div className="bg-white dark:bg-[#131826] p-6 rounded-2xl border border-slate-200 dark:border-[#1F2937] shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Daily Sales Activity Grid</h3>
        <p className="text-xs text-slate-500 mt-1">Visual contribution grid showing sales team workflow touchpoints over the last 30 days.</p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-10 gap-2 mb-4">
          {days.map((day) => (
            <div key={day.date} className="relative group">
              <div 
                className={`w-full aspect-square rounded-sm ${getIntensityColor(day.count)} transition-colors duration-200 border border-slate-700/50`}
              ></div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-slate-900 font-medium text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-xl">
                {day.count} activities on {day.displayDate}
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-white"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-[#1F2937]"></div>
              <div className="w-3 h-3 rounded-sm bg-emerald-900/40"></div>
              <div className="w-3 h-3 rounded-sm bg-emerald-800/60"></div>
              <div className="w-3 h-3 rounded-sm bg-emerald-600/80"></div>
              <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
            </div>
            <span>More</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider">{days.filter(d => d.count > 0).length}/30 Active Days (Σ Touchpoints)</span>
        </div>
      </div>
    </div>
  );
};
