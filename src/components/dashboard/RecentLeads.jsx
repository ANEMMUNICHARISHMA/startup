import React from 'react';
import { StatusBadge } from '../leads/StatusBadge';

/**
 * RecentLeads component displays a table of the most recently added leads.
 * 
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.leads - The array of lead objects.
 * @returns {JSX.Element} The rendered RecentLeads component.
 */
const RecentLeads = ({ leads = [] }) => {
  // Take top 5 recent leads
  const recentLeads = [...leads].slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Leads</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
              <th className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Name</th>
              <th className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Company</th>
              <th className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Status</th>
              <th className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {recentLeads.length > 0 ? (
              recentLeads.map((lead, index) => (
                <tr key={lead.id || index} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 transition-colors">
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{lead.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{lead.email}</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700 dark:text-slate-200">{lead.company}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-500 dark:text-slate-400">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  No recent leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeads;
