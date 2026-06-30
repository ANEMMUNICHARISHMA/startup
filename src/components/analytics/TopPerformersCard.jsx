import React from 'react';
import { Trophy } from 'lucide-react';

export const TopPerformersCard = ({ performers }) => {
  const maxRevenue = performers && performers.length > 0 ? performers[0].revenue : 1;

  return (
    <div className="bg-white dark:bg-[#131826] p-6 rounded-2xl border border-slate-200 dark:border-[#1F2937] shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Top Performers Leaderboard</h3>
        <p className="text-xs text-slate-500 mt-1">Ranking sales representatives by closed won deal revenue.</p>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-6 flex flex-col justify-end">
        {performers.map((performer, index) => {
          const width = Math.max((performer.revenue / maxRevenue) * 100, 5);
          
          return (
            <div key={performer.name} className="relative pt-6">
              <div className="absolute top-0 left-0 w-full flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  {index === 0 && <Trophy size={14} className="text-amber-400" />}
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">{performer.name}</span>
                </div>
                <div className="text-xs font-semibold text-slate-300">
                  ₹{performer.revenue.toLocaleString('en-IN')} <span className="text-slate-500 text-[10px] ml-1">({Math.round(width)}%)</span>
                </div>
              </div>
              <div className="w-full bg-slate-200 dark:bg-[#1F2937] h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full" 
                  style={{ width: `${width}%` }}
                ></div>
              </div>
            </div>
          );
        })}
        {performers.length === 0 && (
          <div className="text-center text-slate-500 text-sm italic py-8">
            No won deals yet to rank performers.
          </div>
        )}
      </div>
    </div>
  );
};
