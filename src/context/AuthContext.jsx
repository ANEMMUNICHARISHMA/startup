import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('crm-token') || null);
  const [isLoading, setIsLoading] = useState(true);

  // Re-hydrate session on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await authService.getProfile();
        if (response && response.user) {
          setUser(response.user);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Token is likely invalid/expired
        setToken(null);
        localStorage.removeItem('crm-token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      if (response && response.token) {
        setToken(response.token);
        localStorage.setItem('crm-token', response.token);
        setUser(response.user);
        toast.success('Successfully logged in!');
        return { success: true };
      } else {
        toast.error('Login failed');
        return { success: false, message: 'Login failed' };
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
                       (error.response?.data?.errors && error.response.data.errors[0]?.message) || 
                       'Network error during login';
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authService.register(name, email, password);
      if (response && response.token) {
        setToken(response.token);
        localStorage.setItem('crm-token', response.token);
        setUser(response.user);
        toast.success('Account created successfully!');
        return { success: true };
      } else {
        toast.error('Registration failed');
        return { success: false, message: 'Registration failed' };
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
                       (error.response?.data?.errors && error.response.data.errors[0]?.message) || 
                       'Network error during registration';
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    // Remove from localStorage
    localStorage.removeItem('crm-token');
    toast.success('Logged out successfully');
    // React Router (via ProtectedRoute) will automatically detect the missing token 
    // and seamlessly redirect to /login without a full page reload (avoiding Vercel 404s).
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
