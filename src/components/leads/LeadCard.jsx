import React from 'react';
import { Pencil, Trash2, Mail, Phone, Building2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

/**
 * A card view for a single lead, primarily used on mobile devices.
 *
 * @param {{ lead: any, onEdit: (lead: any) => void, onDelete: (id: string) => void }} props
 */
export function LeadCard({ lead, onEdit, onDelete }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-text text-lg">{lead.name}</h3>
          <div className="flex items-center text-text/60 text-sm mt-1">
            <Building2 size={14} className="mr-1.5" />
            {lead.company}
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="space-y-2 mt-4 mb-5">
        <div className="flex items-center text-sm text-text/70 dark:text-text/40">
          <Mail size={16} className="mr-2 text-text/50" />
          <a href={`mailto:${lead.email}`} className="hover:text-primary transition-colors truncate">
            {lead.email}
          </a>
        </div>
        {lead.phone && (
          <div className="flex items-center text-sm text-text/70 dark:text-text/40">
            <Phone size={16} className="mr-2 text-text/50" />
            <a href={`tel:${lead.phone}`} className="hover:text-primary transition-colors">
              {lead.phone}
            </a>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-border">
        <button
          onClick={() => onEdit(lead)}
          className="p-2 text-text/50 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
          aria-label="Edit lead"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDelete(lead.id)}
          className="p-2 text-text/50 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          aria-label="Delete lead"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
