import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-xl border border-border p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/80/30 text-primary dark:text-primary mb-4">
            <LogIn size={24} />
          </div>
          <h2 className="text-2xl font-bold text-text">Welcome back</h2>
          <p className="text-text/60 mt-2">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text/90 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text/50">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background/50 text-text transition-colors"
                placeholder="Enter your email address"
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text/90 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text/50">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background/50 text-text transition-colors"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-text bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text/60">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary dark:text-primary hover:text-primary transition-colors">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
