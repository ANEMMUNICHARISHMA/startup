import React from 'react';

/**
 * @typedef {Object} Lead
 * @property {string} id - Lead ID
 * @property {string} name - Lead Name
 * @property {string} company - Company Name
 * @property {'New'|'Contacted'|'Qualified'|'Proposal'|'Won'} status - Current pipeline status
 * @property {string} dateAdded - Date string
 */

/**
 * @typedef {Object} RecentLeadsProps
 * @property {Lead[]} leads - Array of leads
 */

/**
 * Displays a table of the 5 most recently added leads.
 *
 * @param {RecentLeadsProps} props - The component props
 * @returns {JSX.Element} The RecentLeads component
 */
export function RecentLeads({ leads }) {
  // Sort by date added descending and take top 5
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 5);

  const getStatusBadge = (status) => {
    const styles = {
      'New': 'bg-blue-50 text-blue-700 ring-blue-600/20',
      'Contacted': 'bg-amber-50 text-amber-700 ring-amber-600/20',
      'Qualified': 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
      'Proposal': 'bg-purple-50 text-purple-700 ring-purple-600/20',
      'Won': 'bg-green-50 text-green-700 ring-green-600/20',
    };
    
    return (
      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status] || 'bg-slate-50 text-slate-700 ring-slate-600/20'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Recent Leads</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Company</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {recentLeads.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-slate-500">
                  No leads found.
                </td>
              </tr>
            ) : (
              recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{lead.name}</td>
                  <td className="px-6 py-4 text-slate-500">{lead.company}</td>
                  <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(lead.dateAdded).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
