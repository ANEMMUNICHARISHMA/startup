import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sampleLeads } from '../data/sampleLeads';

/**
 * @typedef {Object} Lead
 * @property {string} id
 * @property {string} name
 * @property {string} company
 * @property {string} email
 * @property {string} phone
 * @property {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} status
 * @property {'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other'} source
 * @property {string} createdAt
 */

export const LeadContext = createContext();

/**
 * Provider component that wraps your app and makes lead object
 * available to any child component that calls useLeads().
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useLocalStorage('startup-crm-leads', sampleLeads);

  /**
   * Adds a new lead to the state
   * @param {Omit<Lead, 'id' | 'createdAt'>} leadData The data for the new lead
   */
  const addLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setLeads((prevLeads) => [newLead, ...prevLeads]);
  };

  /**
   * Updates an existing lead by ID
   * @param {string} id The ID of the lead to update
   * @param {Partial<Lead>} updatedData The updated fields
   */
  const updateLead = (id, updatedData) => {
    setLeads((prevLeads) => 
      prevLeads.map((lead) => (lead.id === id ? { ...lead, ...updatedData } : lead))
    );
  };

  /**
   * Deletes a lead by ID
   * @param {string} id The ID of the lead to delete
   */
  const deleteLead = (id) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
  };

  /**
   * Retrieves a single lead by ID
   * @param {string} id The ID of the lead to retrieve
   * @returns {Lead | undefined} The lead object if found, otherwise undefined
   */
  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id);
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLead, deleteLead, getLeadById }}>
      {children}
    </LeadContext.Provider>
  );
};

/**
 * Custom hook to consume the LeadContext
 * @returns {{ leads: Lead[], addLead: Function, updateLead: Function, deleteLead: Function, getLeadById: Function }}
 * @throws {Error} if used outside of a LeadProvider
 */
export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
