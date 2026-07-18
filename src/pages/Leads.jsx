import React, { useState, useMemo, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, LayoutGrid, List } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { LeadForm } from '../components/leads/LeadForm';
import { LeadCard } from '../components/leads/LeadCard';
import { LeadTable } from '../components/leads/LeadTable';
import { SearchBar } from '../components/common/SearchBar';
import { FilterBar } from '../components/common/FilterBar';
import { EmptyState } from '../components/common/EmptyState';
import { useLeads } from '../context/LeadContext';

/**
 * Main Leads page component that manages the state and layout of the Lead CRUD system.
 */
export default function Leads() {
  const { onOpenAddLead } = useOutletContext() || {};
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  // Default to 'table' on lg screens, 'grid' on smaller ones is handled implicitly below
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const handleOpenModal = useCallback((lead = null) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedLead(null);
  }, []);

  const handleSaveLead = useCallback(async (leadData) => {
    let result;
    if (selectedLead) {
      // Update existing
      result = await updateLead(selectedLead.id, leadData);
    } else {
      // Create new
      result = await addLead(leadData);
    }
    
    if (result.success) {
      handleCloseModal();
    }
  }, [selectedLead, updateLead, addLead, handleCloseModal]);

  const handleDeleteLead = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(id);
      toast.error('Lead deleted', {
        icon: '🗑️',
        style: {
          background: '#fee2e2',
          color: '#991b1b',
        },
      });
    }
  }, [deleteLead]);

  // Derived state for filtered leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter(lead => activeFilter === 'All' || lead.status === activeFilter)
      .filter(lead => {
        const q = searchQuery.toLowerCase();
        return (
          lead.name.toLowerCase().includes(q) ||
          lead.company.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q)
        );
      });
  }, [leads, activeFilter, searchQuery]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text">Leads</h1>
            <p className="text-text/60 mt-1">Manage and track your prospective customers.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* View Toggle */}
            <div className="hidden md:flex items-center bg-surface border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md transition-colors ${viewMode === 'table' ? 'bg-surface text-text shadow-sm' : 'text-text/50 hover:text-text/70 dark:text-text/40'}`}
                aria-label="Table view"
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md transition-colors ${viewMode === 'grid' ? 'bg-surface text-text shadow-sm' : 'text-text/50 hover:text-text/70 dark:text-text/40'}`}
                aria-label="Grid view"
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => onOpenAddLead ? onOpenAddLead() : handleOpenModal()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary text-text px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={18} />
              Add Lead
            </button>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div>
          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} leads={leads} />
        </div>

        {/* Content Area */}
        <div className="w-full">
          {filteredLeads.length === 0 ? (
            <EmptyState hasAnyLeads={leads.length > 0} onClearFilters={handleClearFilters} />
          ) : (
            <>
              {/* Mobile view: Always show grid */}
              <div className="md:hidden space-y-4">
                {filteredLeads.map(lead => (
                  <LeadCard key={lead.id} lead={lead} onEdit={handleOpenModal} onDelete={handleDeleteLead} />
                ))}
              </div>
              
              {/* Tablet/Desktop view: Respects toggle state */}
              <div className="hidden md:block">
                {viewMode === 'table' ? (
                  <LeadTable leads={filteredLeads} onEdit={handleOpenModal} onDelete={handleDeleteLead} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredLeads.map(lead => (
                      <LeadCard key={lead.id} lead={lead} onEdit={handleOpenModal} onDelete={handleDeleteLead} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm"
             aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 id="modal-title" className="text-xl font-bold text-text">
                  {selectedLead ? 'Edit Lead' : 'Add New Lead'}
                </h2>
                <button 
                  onClick={handleCloseModal} 
                  className="text-text/50 hover:text-text/70 dark:text-text/40 p-1"
                  aria-label="Close modal"
                >
                  <span className="text-2xl leading-none" aria-hidden="true">&times;</span>
                </button>
              </div>
              <LeadForm
                initialData={selectedLead}
                onSubmit={handleSaveLead}
                onCancel={handleCloseModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
