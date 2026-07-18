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
    'New': { color: 'bg-primary', label: 'New' },
    'Contacted': { color: 'bg-amber-500', label: 'Contacted' },
    'Meeting Scheduled': { color: 'bg-secondary', label: 'Meeting Scheduled' },
    'Proposal Sent': { color: 'bg-accent', label: 'Proposal Sent' },
    'Won': { color: 'bg-emerald-500', label: 'Won' },
    'Lost': { color: 'bg-red-500', label: 'Lost' },
  };

  // Extract unique statuses present or use defaults if no leads
  const statuses = Object.keys(statusCounts).length > 0 ? Object.keys(statusCounts) : Object.keys(statusConfig);

  return (
    <div className="bg-surface p-4 sm:p-6 rounded-xl shadow-sm border border-border h-full">
      <h3 className="text-lg font-semibold text-text mb-4">Pipeline Overview</h3>
      
      {/* Horizontal Bar */}
      <div className="h-6 w-full flex rounded-full overflow-hidden mb-6 bg-surface">
        {Object.entries(statusCounts).map(([status, count]) => {
          const percentage = (count / total) * 100;
          const config = statusConfig[status] || { color: 'bg-background0' };
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
          const config = statusConfig[status] || { color: 'bg-background0', label: status };
          const count = statusCounts[status] || 0;
          return (
            <div key={status} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${config.color} mr-2`}></div>
              <div>
                <p className="text-sm font-medium text-text/90 dark:text-text/30">{config.label}</p>
                <p className="text-xs text-text/60">{count} leads</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineOverview;
