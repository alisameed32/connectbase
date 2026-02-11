
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2 } from 'lucide-react';

const InputField = ({ label, name, type = "text", icon: Icon, placeholder, required = true, value, onChange }) => (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-gray-700 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
          <Icon className="h-4 w-4" />
        </div>
        <input
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg leading-tight bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-sm"
        />
      </div>
    </div>
  );

const LoginForm = ({ onToggle, showToast, onForgotPassword }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create FormData as Backend expects @RequestParam
      const params = new URLSearchParams();
      params.append('email', formData.email);
      params.append('password', formData.password);

      const response = await api.post('/auth/login', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      console.log('Login successful:', response.data);
      
      // Set UI authentication flag (actual auth is handled by HttpOnly cookies)
      localStorage.setItem('isAuthenticated', 'true');

      if (showToast) {
         showToast(`Welcome back, ${formData.email.split('@')[0]}!`, 'success');
      } else {
         alert('Login Successful!'); 
      }
      navigate('/contacts');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      // Optional: showToast on error too if desired, but we have inline error
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        
        <InputField 
            label="Email Address" 
            name="email" 
            type="email" 
            icon={Mail} 
            placeholder="you@example.com" 
            value={formData.email}
            onChange={handleChange}
        />

        <InputField 
            label="Password" 
            name="password" 
            type="password" 
            icon={Lock} 
            placeholder="••••••••" 
            value={formData.password}
            onChange={handleChange}
        />

        {error && (
            <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2 bg-red-50 text-red-600 text-xs rounded-lg flex items-center gap-2"
            >
                <div className="w-1 h-1 rounded-full bg-red-500"></div>
                {error}
            </motion.div>
        )}

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-3.5 w-3.5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-600 cursor-pointer select-none">
              Remember me
            </label>
          </div>

          <div className="text-xs">
            <button 
                type="button"
                onClick={onForgotPassword}
                className="font-semibold text-purple-600 hover:text-purple-500"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all transform hover:-translate-y-0.5"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign in'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-white text-gray-500 font-medium">
              New to ConnectBase?
            </span>
          </div>
        </div>

        <div className="mt-4">
            <button
                onClick={onToggle}
                className="w-full flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-purple-600 hover:border-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
            >
                Create an account
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
