import api from './api';

export const leadService = {
  /**
   * Get leads with optional query parameters
   * @param {object} params - e.g. { status: 'New', search: 'John', page: 1 }
   */
  getLeads: async (params = {}) => {
    // Axios takes care of converting params to query string automatically
    const response = await api.get('/api/leads', { params });
    return response.data;
  },

  /**
   * Create a new lead
   * @param {object} leadData 
   */
  createLead: async (leadData) => {
    const response = await api.post('/api/leads', leadData);
    return response.data;
  },

  /**
   * Update an entire lead
   * @param {string} id 
   * @param {object} leadData 
   */
  updateLead: async (id, leadData) => {
    const response = await api.put(`/api/leads/${id}`, leadData);
    return response.data;
  },

  /**
   * Update just the status of a lead
   * @param {string} id 
   * @param {string} status 
   */
  updateLeadStatus: async (id, status) => {
    const response = await api.patch(`/api/leads/${id}/status`, { status });
    return response.data;
  },

  /**
   * Delete a lead
   * @param {string} id 
   */
  deleteLead: async (id) => {
    const response = await api.delete(`/api/leads/${id}`);
    return response.data;
  },

  /**
   * Get lead statistics summary
   */
  getLeadStats: async () => {
    const response = await api.get('/api/leads/stats/summary');
    return response.data;
  },

  /**
   * Get monthly lead statistics
   */
  getMonthlyStats: async () => {
    const response = await api.get('/api/leads/stats/monthly');
    return response.data;
  }
};
