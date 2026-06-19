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
 * @typedef {Object} PipelineOverviewProps
 * @property {Lead[]} leads - Array of leads to summarize
 */

/**
 * Displays a horizontal bar chart visualizing the distribution of leads across pipeline stages.
 *
 * @param {PipelineOverviewProps} props - The component props
 * @returns {JSX.Element} The PipelineOverview component
 */
export function PipelineOverview({ leads }) {
  const statusColors = {
    'New': 'bg-blue-600',
    'Contacted': 'bg-amber-500',
    'Qualified': 'bg-indigo-500',
    'Proposal': 'bg-purple-500',
    'Won': 'bg-green-500',
  };

  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const total = leads.length || 1; // Prevent division by zero

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Pipeline Overview</h3>
      
      {leads.length === 0 ? (
        <p className="text-slate-500">No leads in pipeline.</p>
      ) : (
        <>
          <div className="w-full h-4 rounded-full flex overflow-hidden mb-4">
            {Object.entries(statusColors).map(([status, colorClass]) => {
              const count = statusCounts[status] || 0;
              const percentage = (count / total) * 100;
              return count > 0 ? (
                <div
                  key={status}
                  style={{ width: `${percentage}%` }}
                  className={`${colorClass} h-full transition-all duration-300`}
                  title={`${status}: ${count} (${percentage.toFixed(0)}%)`}
                />
              ) : null;
            })}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(statusColors).map(([status, colorClass]) => (
              <div key={status} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${colorClass}`} />
                <span className="text-sm text-slate-600">{status}</span>
                <span className="text-sm font-medium text-slate-900 ml-auto">
                  {statusCounts[status] || 0}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
