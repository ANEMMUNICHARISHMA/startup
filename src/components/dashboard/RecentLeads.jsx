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
    <div className="bg-surface p-4 sm:p-6 rounded-xl shadow-sm border border-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-text">Recent Leads</h3>
        <button className="text-sm text-primary hover:text-blue-800 font-medium transition-colors">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-background/50">
              <th className="py-3 px-4 text-sm font-medium text-text/60">Name</th>
              <th className="py-3 px-4 text-sm font-medium text-text/60">Company</th>
              <th className="py-3 px-4 text-sm font-medium text-text/60">Status</th>
              <th className="py-3 px-4 text-sm font-medium text-text/60">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {recentLeads.length > 0 ? (
              recentLeads.map((lead, index) => (
                <tr key={lead.id || index} className="border-b border-slate-100 dark:border-border hover:bg-background dark:hover:bg-slate-700 transition-colors">
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-text">{lead.name}</p>
                    <p className="text-xs text-text/60">{lead.email}</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-text/90 dark:text-text/30">{lead.company}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="py-3 px-4 text-sm text-text/60">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-sm text-text/60">
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
