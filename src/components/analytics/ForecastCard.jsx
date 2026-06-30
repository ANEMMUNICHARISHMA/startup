import React from 'react';
import { Target } from 'lucide-react';

export const ForecastCard = ({ revenue }) => {
  return (
    <div className="bg-white dark:bg-[#131826] p-6 rounded-2xl border border-slate-200 dark:border-[#1F2937] shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Revenue Growth Forecast</h3>
            <p className="text-xs text-slate-500 mt-1">Data-driven sales forecast projected for the upcoming calendar month.</p>
          </div>
          <div className="p-1 border border-emerald-500/30 rounded-full">
            <Target className="text-emerald-500" size={16} />
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">Predicted Revenue Next Month</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            ₹{revenue.toLocaleString('en-IN')}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2">Stable month-over-month run rate</p>
        
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#1F2937]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium">Forecast Confidence</span>
            <span className="text-amber-500 font-medium">Low Confidence / Volatile</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-[#1F2937] h-1.5 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 h-full w-[65%]"></div>
            <div className="bg-white h-full w-[35%] opacity-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
