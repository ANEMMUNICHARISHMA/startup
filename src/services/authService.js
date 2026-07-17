import api from './api';

export const authService = {
  /**
   * Register a new user
   * @param {string} name 
   * @param {string} email 
   * @param {string} password 
   */
  register: async (name, email, password) => {
    const response = await api.post('/api/auth/register', { name, email, password });
    return response.data;
  },

  /**
   * Login user
   * @param {string} email 
   * @param {string} password 
   */
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  /**
   * Logout user (stateless server, so we just clear local storage)
   */
  logout: () => {
    localStorage.removeItem('crm-token');
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  /**
   * Update current user profile
   * @param {object} data 
   */
  updateProfile: async (data) => {
    const response = await api.put('/api/auth/profile', data);
    return response.data;
  }
};
