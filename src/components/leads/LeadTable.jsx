import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

/**
 * A table view displaying a list of leads, primarily used on desktop.
 *
 * @param {{ leads: any[], onEdit: (lead: any) => void, onDelete: (id: string) => void }} props
 */
export function LeadTable({ leads, onEdit, onDelete }) {
  if (leads.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center text-slate-500 dark:text-slate-400">
        No leads found. Add a new lead to get started.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Company</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Source</th>
              <th className="px-6 py-3 font-medium">Date Added</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{lead.name}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{lead.company}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{lead.email}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{lead.source}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                  {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(lead)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      aria-label="Edit lead"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(lead.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      aria-label="Delete lead"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
