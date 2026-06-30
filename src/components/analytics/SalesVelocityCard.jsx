import React from 'react';
import { Zap } from 'lucide-react';

export const SalesVelocityCard = ({ velocity }) => {
  return (
    <div className="bg-white dark:bg-[#131826] p-6 rounded-2xl border border-slate-200 dark:border-[#1F2937] shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Sales Velocity Widget</h3>
            <p className="text-xs text-slate-500 mt-1">Estimated revenue flowing through your sales funnel daily.</p>
          </div>
          <div className="text-amber-500">
            <Zap size={16} fill="currentColor" />
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">Current Sales Velocity</p>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            ₹{velocity.toLocaleString('en-IN')}
          </span>
          <span className="text-sm font-medium text-slate-500">/ day</span>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span className="text-slate-500">0% change</span>
          <span className="text-slate-600 border border-slate-200 dark:border-[#1F2937] px-1.5 py-0.5 rounded text-[10px]">vs previous period</span>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#1F2937]">
          <p className="text-[10px] tracking-widest text-slate-500 mb-4 uppercase flex items-center gap-1">
            <span className="w-3 h-3 flex items-center justify-center rounded-full border border-slate-500 text-[8px]">i</span>
            Formula Variables
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="text-slate-400">Opportunities</div>
            <div className="text-slate-400">Conversion Win Rate</div>
            <div className="text-slate-400">Avg Deal Size</div>
            <div className="text-slate-400">Avg Sales Cycle</div>
          </div>
        </div>
      </div>
    </div>
  );
};
