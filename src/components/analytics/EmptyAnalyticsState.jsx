import React from 'react';
import { BarChart3, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmptyAnalyticsState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-surface rounded-2xl border border-border shadow-sm mt-6">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <BarChart3 className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-text mb-2">No analytics available yet</h3>
      <p className="text-text/60 mb-6 text-center max-w-md">
        Add your first lead to start tracking business performance, conversion rates, and revenue forecasting.
      </p>
      <button 
        onClick={() => navigate('/leads')}
        className="flex items-center gap-2 bg-primary hover:bg-primary text-text px-5 py-2.5 rounded-lg font-medium transition-colors"
      >
        <Plus size={18} />
        Add Lead
      </button>
    </div>
  );
};
