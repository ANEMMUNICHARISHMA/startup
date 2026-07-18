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
    <div className="bg-surface p-6 rounded-xl shadow-sm border border-border h-full">
      <h3 className="text-lg font-semibold text-text mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button 
          onClick={onAddLead}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary text-text py-2.5 px-4 rounded-lg font-medium transition-colors"
        >
          <UserPlus size={18} />
          Add New Lead
        </button>
        <button 
          onClick={onViewAll}
          className="w-full flex items-center justify-center gap-2 bg-surface hover:bg-background dark:hover:bg-slate-700 text-text/90 dark:text-text/30 border border-border py-2.5 px-4 rounded-lg font-medium transition-colors"
        >
          <Users size={18} />
          View All Leads
        </button>
        <button 
          onClick={handleExport}
          className="w-full flex items-center justify-center gap-2 bg-surface hover:bg-background dark:hover:bg-slate-700 text-text/90 dark:text-text/30 border border-border py-2.5 px-4 rounded-lg font-medium transition-colors"
        >
          <Download size={18} />
          Export Data
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
