import React from 'react';
import { UserPlus, Users, Download } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * QuickActions component displays common actionable buttons for the dashboard.
 * 
 * @param {Object} props
 * @param {Function} props.onAddLead - Handler for adding a new lead
 * @param {Function} props.onViewAll - Handler for viewing all leads
 * @returns {JSX.Element} The rendered QuickActions component.
 */
const QuickActions = ({ onAddLead, onViewAll }) => {
  const handleExport = () => {
    toast.success('Data exported successfully!', { icon: '⬇️' });
  };
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 h-full">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button 
          onClick={onAddLead}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
        >
          <UserPlus size={18} />
          Add New Lead
        </button>
        <button 
          onClick={onViewAll}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 py-2.5 px-4 rounded-lg font-medium transition-colors"
        >
          <Users size={18} />
          View All Leads
        </button>
        <button 
          onClick={handleExport}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 py-2.5 px-4 rounded-lg font-medium transition-colors"
        >
          <Download size={18} />
          Export Data
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
