import { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import { LEAD_STAGES, SALES_OWNERS, LEAD_SOURCES } from '../../constants/leadConstants';

export default function LeadModal({ isOpen, onClose }) {
  const { addLead } = useLeads();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    value: '',
    status: 'New',
    source: 'Website',
    owner: 'Alex Rivera',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Contact name is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newLead = addLead({
      ...formData,
      value: Number(formData.value) || 0
    });

    toast.success(`Successfully added lead for ${newLead.company}!`, {
      style: {
        borderRadius: '10px',
        background: 'var(--color-border)',
        color: 'var(--color-text)',
        fontSize: '13px'
      }
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/40 dark:bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-surface border-0 md:border border-border dark:border-border/80 w-full min-h-screen md:min-h-0 md:max-w-lg rounded-none md:rounded-2xl shadow-none md:shadow-2xl overflow-hidden z-10 transition-all transform scale-100 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-border dark:border-border/80 bg-background/30">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary dark:text-primary">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-sm text-text dark:text-slate-50">
              Create New CRM Lead
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-text/50 hover:text-text/90 dark:text-text/30 dark:hover:text-text/30 hover:bg-surface dark:hover:bg-slate-700 dark:hover:bg-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 flex-1 flex flex-col">
          
          <div className="flex-1 space-y-4">
          {/* Two column name/company */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="contactName" className="text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
                Contact Name *
              </label>
              <input
                id="contactName"
                type="text"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full min-h-[44px] px-3 text-sm md:text-xs text-text dark:text-text/20 bg-background/40 border ${
                  errors.name ? 'border-red-600 focus:border-red-600 dark:border-red-500 dark:focus:border-red-500' : 'border-border dark:border-border focus:border-primary'
                } rounded-lg outline-none transition-all`}
              />
              {errors.name && (
                <p className="flex items-center gap-1 text-[10px] text-red-600 dark:text-red-500 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="companyName" className="text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
                Company Name *
              </label>
              <input
                id="companyName"
                type="text"
                placeholder="e.g. Acme Labs"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full min-h-[44px] px-3 text-sm md:text-xs text-text dark:text-text/20 bg-background/40 border ${
                  errors.company ? 'border-red-600 focus:border-red-600 dark:border-red-500 dark:focus:border-red-500' : 'border-border dark:border-border focus:border-primary'
                } rounded-lg outline-none transition-all`}
              />
              {errors.company && (
                <p className="flex items-center gap-1 text-[10px] text-red-600 dark:text-red-500 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {errors.company}
                </p>
              )}
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <label htmlFor="emailAddress" className="text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
              Email Address *
            </label>
            <input
              id="emailAddress"
              type="email"
              placeholder="e.g. john@acme.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full min-h-[44px] px-3 text-sm md:text-xs text-text dark:text-text/20 bg-background/40 border ${
                errors.email ? 'border-red-600 focus:border-red-600 dark:border-red-500 dark:focus:border-red-500' : 'border-border dark:border-border focus:border-primary'
              } rounded-lg outline-none transition-all`}
            />
            {errors.email && (
              <p className="flex items-center gap-1 text-[10px] text-red-600 dark:text-red-500 font-medium">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Value and Owner grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="dealValue" className="text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
                Deal Value (USD)
              </label>
              <input
                id="dealValue"
                type="number"
                placeholder="e.g. 15000"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full min-h-[44px] px-3 text-sm md:text-xs text-text dark:text-text/20 bg-background/40 border border-border dark:border-border focus:border-primary rounded-lg outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="salesOwner" className="text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
                Sales Owner
              </label>
              <select
                id="salesOwner"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                className="w-full min-h-[44px] px-2 text-sm md:text-xs text-text dark:text-text dark:text-text/30 bg-background/40 border border-border dark:border-border rounded-lg outline-none cursor-pointer focus:border-primary"
              >
                {SALES_OWNERS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Stage and Source grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="initialStage" className="text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
                Initial CRM Stage
              </label>
              <select
                id="initialStage"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full min-h-[44px] px-2 text-sm md:text-xs text-text dark:text-text dark:text-text/30 bg-background/40 border border-border dark:border-border rounded-lg outline-none cursor-pointer focus:border-primary"
              >
                {LEAD_STAGES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="acquisitionChannel" className="text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
                Acquisition Channel
              </label>
              <select
                id="acquisitionChannel"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full min-h-[44px] px-2 text-sm md:text-xs text-text dark:text-text dark:text-text/30 bg-background/40 border border-border dark:border-border rounded-lg outline-none cursor-pointer focus:border-primary"
              >
                {LEAD_SOURCES.map((src) => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes field */}
          <div className="space-y-1.5">
            <label htmlFor="notes" className="text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
              Brief Description & Background notes
            </label>
            <textarea
              id="notes"
              placeholder="e.g. Met at Web Summit, looking to transition database layout systems..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full p-3 min-h-[88px] text-sm md:text-xs text-text dark:text-text/20 bg-background/40 border border-border dark:border-border focus:border-primary rounded-lg outline-none resize-none transition-all leading-normal"
            />
          </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 mt-auto md:mt-0 border-t border-slate-100 dark:border-border dark:border-border/80">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 text-sm md:text-xs font-semibold text-text/60 hover:text-slate-950 dark:text-text/50 dark:hover:text-text/20 hover:bg-surface dark:hover:bg-slate-700 dark:hover:bg-slate-850 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] flex-1 md:flex-none px-4 bg-primary hover:bg-primary text-text text-sm md:text-xs font-semibold rounded-lg transition-all active:scale-97 shadow-sm cursor-pointer"
            >
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
