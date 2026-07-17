import React, { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { leadService } from '../services/leadService';

export const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const fetchLeads = useCallback(async (params = {}) => {
    setIsLoading(true);
    try {
      const response = await leadService.getLeads({ limit: 10000, ...params });
      if (response && response.data) {
        setLeads(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } else {
        // Fallback if backend directly returns the array
        setLeads(Array.isArray(response) ? response : []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.error || 'Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addLead = async (leadData) => {
    try {
      const response = await leadService.createLead(leadData);
      const newLead = response.data || response;
      setLeads((prevLeads) => [newLead, ...prevLeads]);
      toast.success('Lead created successfully');
      return { success: true, data: newLead };
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.error || 'Failed to create lead');
      return { success: false };
    }
  };

  const updateLead = async (id, leadData) => {
    try {
      const response = await leadService.updateLead(id, leadData);
      const updatedLead = response.data || response;
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.id === id || lead._id === id ? { ...lead, ...updatedLead } : lead))
      );
      toast.success('Lead updated successfully');
      return { success: true, data: updatedLead };
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.error || 'Failed to update lead');
      return { success: false };
    }
  };

  const deleteLead = async (id) => {
    try {
      await leadService.deleteLead(id);
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id && lead._id !== id));
      toast.success('Lead deleted successfully');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.error || 'Failed to delete lead');
      return { success: false };
    }
  };

  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id || lead._id === id);
  };

  return (
    <LeadContext.Provider value={{ leads, isLoading, pagination, fetchLeads, addLead, updateLead, deleteLead, getLeadById }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
