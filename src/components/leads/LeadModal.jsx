import { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const STAGES = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];
const OWNERS = ['Alex Rivera', 'Sophia Martinez', 'Marcus Vance'];
const SOURCES = ['LinkedIn', 'Referral', 'Product Sign-up', 'Cold Email', 'Inbound'];

export default function LeadModal({ isOpen, onClose }) {
  const { addLead } = useLeads();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    value: '',
    stage: 'New',
    source: 'Inbound',
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
        background: '#1e293b',
        color: '#f8fafc',
        fontSize: '13px'
      }
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/80 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden z-10 transition-all transform scale-100">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/30">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-slate-50">
              Create New CRM Lead
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Two column name/company */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Contact Name *
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full h-8.5 px-3 text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/40 border ${
                  errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-blue-500'
                } rounded-lg outline-none transition-all`}
              />
              {errors.name && (
                <p className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Company Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Labs"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full h-8.5 px-3 text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/40 border ${
                  errors.company ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-blue-500'
                } rounded-lg outline-none transition-all`}
              />
              {errors.company && (
                <p className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {errors.company}
                </p>
              )}
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="e.g. john@acme.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full h-8.5 px-3 text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/40 border ${
                errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-blue-500'
              } rounded-lg outline-none transition-all`}
            />
            {errors.email && (
              <p className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Value and Owner grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Deal Value (USD)
              </label>
              <input
                type="number"
                placeholder="e.g. 15000"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full h-8.5 px-3 text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Sales Owner
              </label>
              <select
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                className="w-full h-8.5 px-2 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg outline-none cursor-pointer focus:border-blue-500"
              >
                {OWNERS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Stage and Source grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Initial CRM Stage
              </label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                className="w-full h-8.5 px-2 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg outline-none cursor-pointer focus:border-blue-500"
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Acquisition Channel
              </label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full h-8.5 px-2 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg outline-none cursor-pointer focus:border-blue-500"
              >
                {SOURCES.map((src) => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Brief Description & Background notes
            </label>
            <textarea
              placeholder="e.g. Met at Web Summit, looking to transition database layout systems..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full p-2.5 text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg outline-none resize-none transition-all leading-normal"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              className="h-8.5 px-4 text-xs font-semibold text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-8.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all active:scale-97 shadow-sm cursor-pointer"
            >
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
