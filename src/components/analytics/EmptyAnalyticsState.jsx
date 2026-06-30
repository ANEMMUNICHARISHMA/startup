import React from 'react';
import { BarChart3, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmptyAnalyticsState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm mt-6">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <BarChart3 className="w-8 h-8 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">No analytics available yet</h3>
      <p className="text-slate-500 mb-6 text-center max-w-md">
        Add your first lead to start tracking business performance, conversion rates, and revenue forecasting.
      </p>
      <button 
        onClick={() => navigate('/leads')}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-slate-900 dark:text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
      >
        <Plus size={18} />
        Add Lead
      </button>
    </div>
  );
};
