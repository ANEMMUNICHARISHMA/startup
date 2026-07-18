import React from 'react';
import { Trophy } from 'lucide-react';

export const TopPerformersCard = ({ performers }) => {
  const maxRevenue = performers && performers.length > 0 ? performers[0].revenue : 1;

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-text tracking-wide">Top Performers Leaderboard</h3>
        <p className="text-xs text-text/60 mt-1">Ranking sales representatives by closed won deal revenue.</p>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-6 flex flex-col justify-end">
        {performers.map((performer, index) => {
          const width = Math.max((performer.revenue / maxRevenue) * 100, 5);
          
          return (
            <div key={performer.name} className="relative pt-6">
              <div className="absolute top-0 left-0 w-full flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  {index === 0 && <Trophy size={14} className="text-amber-400" />}
                  <span className="font-semibold text-text text-sm">{performer.name}</span>
                </div>
                <div className="text-xs font-semibold text-text/40">
                  ₹{performer.revenue.toLocaleString('en-IN')} <span className="text-text/60 text-[10px] ml-1">({Math.round(width)}%)</span>
                </div>
              </div>
              <div className="w-full bg-surface/50 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full" 
                  style={{ width: `${width}%` }}
                ></div>
              </div>
            </div>
          );
        })}
        {performers.length === 0 && (
          <div className="text-center text-text/60 text-sm italic py-8">
            No won deals yet to rank performers.
          </div>
        )}
      </div>
    </div>
  );
};
