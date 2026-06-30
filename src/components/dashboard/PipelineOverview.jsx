import React from 'react';

/**
 * PipelineOverview component displays a horizontal bar chart of lead statuses.
 * 
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.leads - The array of lead objects.
 * @returns {JSX.Element} The rendered PipelineOverview component.
 */
const PipelineOverview = ({ leads = [] }) => {
  // Count leads by status
  const statusCounts = leads.reduce((acc, lead) => {
    const status = lead.status || 'New';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const total = leads.length || 1; // Prevent division by zero

  // Define colors for standard statuses (Tailwind classes)
  const statusConfig = {
    'New': { color: 'bg-blue-500', label: 'New' },
    'Contacted': { color: 'bg-amber-500', label: 'Contacted' },
    'Meeting Scheduled': { color: 'bg-indigo-500', label: 'Meeting Scheduled' },
    'Proposal Sent': { color: 'bg-purple-500', label: 'Proposal Sent' },
    'Won': { color: 'bg-emerald-500', label: 'Won' },
    'Lost': { color: 'bg-red-500', label: 'Lost' },
  };

  // Extract unique statuses present or use defaults if no leads
  const statuses = Object.keys(statusCounts).length > 0 ? Object.keys(statusCounts) : Object.keys(statusConfig);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 h-full">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Pipeline Overview</h3>
      
      {/* Horizontal Bar */}
      <div className="h-6 w-full flex rounded-full overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800">
        {Object.entries(statusCounts).map(([status, count]) => {
          const percentage = (count / total) * 100;
          const config = statusConfig[status] || { color: 'bg-slate-50 dark:bg-slate-9000' };
          return (
            <div 
              key={status} 
              style={{ width: `${percentage}%` }} 
              className={`${config.color} h-full transition-all duration-500`}
              title={`${status}: ${count} (${Math.round(percentage)}%)`}
            ></div>
          );
        })}
        {leads.length === 0 && (
          <div className="w-full h-full bg-slate-200"></div>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {statuses.map(status => {
          const config = statusConfig[status] || { color: 'bg-slate-50 dark:bg-slate-9000', label: status };
          const count = statusCounts[status] || 0;
          return (
            <div key={status} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${config.color} mr-2`}></div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{config.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{count} leads</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineOverview;
