import React from 'react';
import { Plus, Users, Download } from 'lucide-react';

/**
 * Displays quick action buttons for common tasks.
 *
 * @returns {JSX.Element} The QuickActions component
 */
export function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={18} />
          Add New Lead
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2 rounded-lg font-medium transition-colors">
          <Users size={18} />
          View All Leads
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2 rounded-lg font-medium transition-colors">
          <Download size={18} />
          Export Data
        </button>
      </div>
    </div>
  );
}
