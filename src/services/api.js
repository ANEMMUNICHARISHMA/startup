import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Request Interceptor: Automatically add the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crm-token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem('crm-token');
        // We'll handle the redirect to /login in the application logic
        // or a global event listener, but for now we clear the token.
        // We can force reload to let ProtectedRoute handle it:
        window.location.href = '/login';
      }
    } else {
      // Network Error (server down or CORS issue)
      toast.error('Cannot connect to server. Check your connection.');
    }
    return Promise.reject(error);
  }
);

export default api;
