import { useState, useEffect } from 'react';
import { useLeads } from '../../context/LeadContext';
import { 
  X, 
  User, 
  Building2, 
  Mail, 
  DollarSign, 
  Calendar, 
  Send,
  UserCheck,
  TrendingUp,
  MessageSquarePlus,
  Trash2
} from 'lucide-react';

const STAGES = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];
const OWNERS = ['Alex Rivera', 'Sophia Martinez', 'Marcus Vance'];
const SOURCES = ['LinkedIn', 'Referral', 'Product Sign-up', 'Cold Email', 'Inbound'];

export default function LeadDrawer({ leadId, onClose }) {
  const { leads, updateLead, deleteLead, addHistoryLog } = useLeads();
  const [newLog, setNewLog] = useState('');
  const [notesText, setNotesText] = useState('');

  const lead = leads.find((l) => l.id === leadId);

  // Sync state when lead changes
  useEffect(() => {
    if (lead) {
      setNotesText(lead.notes || '');
    }
  }, [leadId, lead]);

  if (!lead) return null;

  const handleStageChange = (e) => {
    updateLead(lead.id, { stage: e.target.value });
  };

  const handleOwnerChange = (e) => {
    updateLead(lead.id, { owner: e.target.value });
  };

  const handleValueChange = (e) => {
    updateLead(lead.id, { value: Number(e.target.value) || 0 });
  };

  const handleNotesBlur = () => {
    if (notesText !== lead.notes) {
      updateLead(lead.id, { notes: notesText });
      addHistoryLog(lead.id, 'Notes Updated', 'Lead background details updated.');
    }
  };

  const handleAddLogSubmit = (e) => {
    e.preventDefault();
    if (!newLog.trim()) return;
    addHistoryLog(lead.id, 'Activity Logged', newLog);
    setNewLog('');
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${lead.name} from CRM?`)) {
      deleteLead(lead.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/40 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer content panel */}
      <div className="relative w-full max-w-xl h-full bg-surface border-l border-border dark:border-border shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out transform translate-x-0">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border dark:border-border bg-background/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-blue-950/40 text-primary dark:text-primary border border-blue-100/50 dark:border-blue-900/20">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-text dark:text-slate-50">
                {lead.company}
              </h3>
              <p className="text-[11px] font-semibold text-text/50 dark:text-text/60">
                Contact: {lead.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Delete button */}
            <button
              onClick={handleDelete}
              title="Delete Lead"
              className="p-1.5 rounded-lg text-text/50 hover:text-red-500 hover:bg-surface dark:hover:bg-slate-700 dark:hover:bg-surface transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-text/50 hover:text-text/90 dark:text-text/30 dark:hover:text-text/30 hover:bg-surface dark:hover:bg-slate-700 dark:hover:bg-surface transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable details area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Info Matrix */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-border dark:border-border/80 bg-background/50 dark:bg-background/20">
            {/* Stage Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
                Lead Stage
              </label>
              <select
                value={lead.stage}
                onChange={handleStageChange}
                className="w-full h-8.5 px-2 text-xs font-semibold text-text dark:text-text dark:text-text/30 bg-surface border border-border dark:border-border rounded-lg outline-none cursor-pointer focus:border-primary"
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Deal Value Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
                Deal Value (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-text/50" />
                <input
                  type="number"
                  value={lead.value}
                  onChange={handleValueChange}
                  className="w-full h-8.5 pl-7 pr-3 text-xs font-semibold text-text dark:text-text dark:text-text/30 bg-surface border border-border dark:border-border rounded-lg outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Owner Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
                Sales Owner
              </label>
              <select
                value={lead.owner}
                onChange={handleOwnerChange}
                className="w-full h-8.5 px-2 text-xs font-medium text-text dark:text-text dark:text-text/30 bg-surface border border-border dark:border-border rounded-lg outline-none cursor-pointer focus:border-primary"
              >
                {OWNERS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Lead Source Detail */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
                Acquisition Channel
              </label>
              <div className="w-full h-8.5 flex items-center px-3 text-xs font-semibold text-text/90 dark:text-text/30 dark:text-text/40 bg-surface/80 rounded-lg border border-transparent">
                {lead.source}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-text dark:text-slate-50 uppercase tracking-wider">
              Contact Card
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-xs text-text/70 dark:text-text/40 dark:text-text/40">
                <Mail className="w-4 h-4 text-text/50" />
                <a href={`mailto:${lead.email}`} className="hover:underline hover:text-primary dark:hover:text-primary font-medium">
                  {lead.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs text-text/70 dark:text-text/40 dark:text-text/40">
                <Calendar className="w-4 h-4 text-text/50" />
                <span>Added: {new Date(lead.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
              </div>
            </div>
          </div>

          {/* Notion-style Background Notes */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-text dark:text-slate-50 uppercase tracking-wider">
              Lead Brief & Context
            </h4>
            <textarea
              placeholder="Add client summaries, criteria notes, or general background info here (Notion style)..."
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              onBlur={handleNotesBlur}
              rows={4}
              className="w-full p-3 text-xs text-text dark:text-text dark:text-text/30 placeholder-slate-400 dark:placeholder-slate-500 bg-background hover:bg-surface dark:hover:bg-slate-700/50 dark:bg-surface/40 dark:hover:bg-[#111827]/60 border border-border dark:border-border/85 focus:border-primary dark:focus:border-primary rounded-lg outline-none resize-none transition-all leading-relaxed"
            />
          </div>

          {/* Activity Logs Timeline */}
          <div className="space-y-4 pt-4 border-t border-border dark:border-border/80">
            <h4 className="text-xs font-semibold text-text dark:text-slate-50 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-primary dark:text-primary" />
              Activity History
            </h4>

            {/* Add activity form */}
            <form onSubmit={handleAddLogSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Log call notes, email threads, or activities..."
                value={newLog}
                onChange={(e) => setNewLog(e.target.value)}
                className="flex-1 h-8.5 px-3 text-xs text-text dark:text-text/20 placeholder-slate-400 dark:placeholder-slate-500 bg-background border border-border dark:border-border focus:border-primary dark:focus:border-primary rounded-lg outline-none transition-all"
              />
              <button
                type="submit"
                className="h-8.5 px-3 bg-primary hover:bg-primary text-text rounded-lg flex items-center justify-center cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Timeline display */}
            <div className="space-y-4 pl-3.5 border-l border-border dark:border-border relative mt-4">
              {lead.history && lead.history.slice().reverse().map((log) => (
                <div key={log.id} className="relative group/log">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[19.5px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white dark:ring-background ${
                    log.type === 'Created' 
                      ? 'bg-primary dark:bg-primary' 
                      : log.type === 'Stage Changed' 
                        ? 'bg-amber-500' 
                        : log.type === 'Won' 
                          ? 'bg-emerald-500' 
                          : 'bg-slate-400'
                  }`} />
                  
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[11px] font-bold text-text dark:text-text dark:text-text/30">
                        {log.type}
                      </span>
                      <span className="text-[9px] text-text/50 dark:text-text/60 font-medium">
                        {new Date(log.date).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>
                    <p className="text-xs text-text/60 dark:text-text/50 mt-0.5 leading-normal">
                      {log.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
