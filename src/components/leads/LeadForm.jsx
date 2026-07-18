import React, { useState, useEffect } from 'react';

/**
 * @typedef {Object} LeadData
 * @property {string} [id]
 * @property {string} name
 * @property {string} company
 * @property {string} email
 * @property {string} phone
 * @property {string} status
 * @property {string} source
 */

/**
 * Form to create or edit a lead.
 *
 * @param {{ initialData?: LeadData, onSubmit: (data: LeadData) => void, onCancel: () => void }} props
 */
export function LeadForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'New',
    source: 'Website'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const statuses = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
  const sources = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text/90 dark:text-text/30 mb-1">Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${errors.name ? 'border-red-500' : 'border-border'}`}
          placeholder="Jane Doe"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-text/90 dark:text-text/30 mb-1">Company *</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${errors.company ? 'border-red-500' : 'border-border'}`}
          placeholder="Acme Corp"
        />
        {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-text/90 dark:text-text/30 mb-1">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${errors.email ? 'border-red-500' : 'border-border'}`}
          placeholder="jane@acme.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-text/90 dark:text-text/30 mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text/90 dark:text-text/30 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none bg-surface"
          >
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text/90 dark:text-text/30 mb-1">Source</label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none bg-surface"
          >
            {sources.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-text/90 dark:text-text/30 bg-surface border border-border rounded-md hover:bg-background dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-text bg-primary rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {initialData ? 'Update Lead' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
}
