import React from 'react';

/**
 * @typedef {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} LeadStatus
 */

/**
 * A pill-shaped badge displaying the status of a lead with a corresponding color.
 *
 * @param {{ status: LeadStatus }} props - The component props
 * @returns {JSX.Element}
 */
export function StatusBadge({ status }) {
  const safeStatus = status || 'New';
  
  const getStatusStyles = (s) => {
    switch (s) {
      case 'New':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-700';
      case 'Contacted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Meeting Scheduled':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Proposal Sent':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Won':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Lost':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(safeStatus)}`}>
      {safeStatus}
    </span>
  );
}
