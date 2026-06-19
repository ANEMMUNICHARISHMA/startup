import { useState } from 'react';
import { useLeads } from '../context/LeadContext';
import LeadDrawer from '../components/leads/LeadDrawer';
import LeadModal from '../components/leads/LeadModal';
import { 
  Search, 
  Filter, 
  Table as TableIcon, 
  KanbanSquare, 
  Plus,
  ArrowRight,
  ArrowLeft,
  XCircle,
  Eye,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

const STAGES = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];
const SOURCES = ['LinkedIn', 'Referral', 'Product Sign-up', 'Cold Email', 'Inbound'];

export default function Leads() {
  const { leads, updateLead } = useLeads();
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'kanban'
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // Filters state
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesStage = stageFilter ? lead.stage === stageFilter : true;
    const matchesSource = sourceFilter ? lead.source === sourceFilter : true;

    return matchesSearch && matchesStage && matchesSource;
  });

  const getStageColorClass = (stage) => {
    switch (stage) {
      case 'New': return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900/60 dark:text-slate-400 dark:border-slate-800';
      case 'Contacted': return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/35';
      case 'Qualified': return 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/35';
      case 'Proposal': return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/35';
      case 'Won': return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/35';
      case 'Lost': return 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/35';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleStageMove = (leadId, currentStage, direction) => {
    const currentIndex = STAGES.indexOf(currentStage);
    let nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < STAGES.length) {
      updateLead(leadId, { stage: STAGES[nextIndex] });
    }
  };

  const resetFilters = () => {
    setSearch('');
    setStageFilter('');
    setSourceFilter('');
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Toolbar */}
      <div className="flex flex-col gap-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, company, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-slate-50 hover:bg-slate-100/50 dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-600 rounded-lg outline-none transition-all"
            />
          </div>

          {/* Toggle and add buttons */}
          <div className="flex items-center gap-2">
            {/* View Selector Toggle buttons */}
            <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                Table
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded-md flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'kanban'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <KanbanSquare className="w-3.5 h-3.5" />
                Kanban
              </button>
            </div>

            {/* Quick Add CTA */}
            <button
              onClick={() => setIsAddLeadOpen(true)}
              className="h-9 px-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-97 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Lead
            </button>
          </div>
        </div>

        {/* Filter Selection Panel */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            Filters:
          </div>

          {/* Stage Dropdown */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="h-7.5 px-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md outline-none cursor-pointer focus:border-blue-500"
          >
            <option value="">All CRM Stages</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Source Dropdown */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="h-7.5 px-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md outline-none cursor-pointer focus:border-blue-500"
          >
            <option value="">All Channels</option>
            {SOURCES.map((src) => (
              <option key={src} value={src}>{src}</option>
            ))}
          </select>

          {/* Reset button */}
          {(stageFilter || sourceFilter || search) && (
            <button
              onClick={resetFilters}
              className="h-7.5 px-2.5 text-[11px] font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/50 dark:text-rose-400 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
            >
              <XCircle className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}

          <div className="ml-auto text-[11px] font-medium text-slate-400 dark:text-slate-500">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        </div>
      </div>

      {/* Main Area View */}
      {viewMode === 'table' ? (
        /* Notion-style Spreadsheet Grid Layout */
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800/85 text-[10px] uppercase font-bold text-slate-400 tracking-wider bg-slate-50 dark:bg-slate-900/40">
                  <th className="py-3 px-4">Company Name</th>
                  <th className="py-3 px-4">Contact Contact</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4 text-right">Value (USD)</th>
                  <th className="py-3 px-4">Sales Owner</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-xs">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-400 dark:text-slate-500">
                      No leads match your active filters. Try modifying terms or reset.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/25 cursor-pointer group/row transition-colors"
                      onClick={() => setSelectedLeadId(lead.id)}
                    >
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">
                        {lead.company}
                      </td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-350">
                        {lead.name}
                      </td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                        {lead.email}
                      </td>
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.stage}
                          onChange={(e) => updateLead(lead.id, { stage: e.target.value })}
                          className={`h-7 px-2 border text-[10.5px] font-semibold rounded-full outline-none cursor-pointer ${getStageColorClass(lead.stage)}`}
                        >
                          {STAGES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right font-display font-semibold text-slate-800 dark:text-slate-200">
                        ${lead.value.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                        {lead.owner}
                      </td>
                      <td className="py-3 px-4 text-right pr-4" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedLeadId(lead.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-750 border border-transparent rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban Board View - Linear Drag/Move Columns */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stage);
            const totalValue = stageLeads.reduce((sum, l) => sum + l.value, 0);

            return (
              <div 
                key={stage} 
                className="bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-3 space-y-3 flex flex-col min-h-[480px]"
              >
                {/* Column header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-800 dark:text-slate-250 uppercase tracking-wider">
                      {stage}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                      {stageLeads.length}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                    ${totalValue >= 1000 ? `${(totalValue / 1000).toFixed(0)}k` : totalValue}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
                  {stageLeads.length === 0 ? (
                    <div className="border border-dashed border-slate-200 dark:border-slate-850 rounded-lg p-4 text-center">
                      <p className="text-[10px] text-slate-400">Drop leads here</p>
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLeadId(lead.id)}
                        className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-xl p-3 shadow-[0_1px_2px_rgba(0,0,0,0.015)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] cursor-pointer group hover:border-slate-350 dark:hover:border-slate-700 transition-all space-y-2"
                      >
                        <div>
                          <h5 className="font-semibold text-xs text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                            {lead.company}
                          </h5>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {lead.name}
                          </p>
                        </div>

                        {/* Value and owner details */}
                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span className="font-display font-semibold text-slate-850 dark:text-slate-250">
                            ${lead.value.toLocaleString()}
                          </span>
                          <span className="text-slate-400 dark:text-slate-500 truncate max-w-[80px]">
                            {lead.owner.split(' ')[0]}
                          </span>
                        </div>

                        {/* Kanban stage quick shift buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStageMove(lead.id, lead.stage, -1);
                            }}
                            disabled={stage === 'New'}
                            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                          <span className="text-[9px] text-slate-400 font-medium">Shift stage</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStageMove(lead.id, lead.stage, 1);
                            }}
                            disabled={stage === 'Lost'}
                            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Slide-over details drawer */}
      {selectedLeadId && (
        <LeadDrawer 
          leadId={selectedLeadId} 
          onClose={() => setSelectedLeadId(null)} 
        />
      )}

      {/* Global Add Lead Modal in Leads page */}
      {isAddLeadOpen && (
        <LeadModal 
          isOpen={isAddLeadOpen} 
          onClose={() => setIsAddLeadOpen(false)} 
        />
      )}
    </div>
  );
}
