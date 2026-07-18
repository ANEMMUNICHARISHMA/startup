import React from 'react';
import { Target } from 'lucide-react';

export const ForecastCard = ({ revenue }) => {
  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-text tracking-wide">Revenue Growth Forecast</h3>
            <p className="text-xs text-text/60 mt-1">Data-driven sales forecast projected for the upcoming calendar month.</p>
          </div>
          <div className="p-1 border border-emerald-500/30 rounded-full">
            <Target className="text-emerald-500" size={16} />
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <p className="text-[10px] font-bold tracking-widest text-text/60 uppercase mb-2">Predicted Revenue Next Month</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-text tracking-tight">
            ₹{revenue.toLocaleString('en-IN')}
          </span>
        </div>
        <p className="text-xs text-text/60 mt-2">Stable month-over-month run rate</p>
        
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-text/50 font-medium">Forecast Confidence</span>
            <span className="text-amber-500 font-medium">Low Confidence / Volatile</span>
          </div>
          <div className="w-full bg-surface/50 h-1.5 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 h-full w-[65%]"></div>
            <div className="bg-surface h-full w-[35%] opacity-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
