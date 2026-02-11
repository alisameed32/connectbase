import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Upload, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';

const api = axios.create({
  baseURL: 'http://localhost:8080/auth',
  withCredentials: true
});


// Reusable Input Component outside main component to prevent re-renders losing focus
const InputField = ({ label, name, type = "text", icon: Icon, placeholder, required = true, value, onChange, className }) => (
  <div className={`space-y-1 ${className}`}>
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

const SignupForm = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male',
    password: '',
    image: null
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
       const file = files[0];
       setFormData({ ...formData, image: file });
       setPreview(file ? URL.createObjectURL(file) : null);
    } else {
       setFormData({ ...formData, [name]: value });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('gender', formData.gender);
      data.append('password', formData.password);
      if (formData.image) {
        data.append('image', formData.image);
      }

      const response = await api.post('/register', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Registration successful:', response.data);
      alert('Account created! Please login.');
      onToggle(); 
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
    >
       {/* Compact Container - No Scroll */}
       <div className="-mt-4 w-full">
          
          <div className="flex justify-start mb-4">
             <button onClick={onToggle} className="group flex items-center text-xs font-semibold text-gray-500 hover:text-purple-600 transition-colors">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2 group-hover:bg-purple-100 transition-colors">
                     <ArrowLeft className="w-3 h-3" />
                </div>
                Back to Login
             </button>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            
            <div className="flex gap-4 items-center">
                {/* Profile Upload - Compact & Left Aligned */}
                <div className="relative group cursor-pointer flex-shrink-0">
                        <div className={`w-16 h-16 rounded-full overflow-hidden border-2 ${preview ? 'border-purple-500' : 'border-gray-100'} shadow-sm transition-all duration-300 group-hover:border-purple-300`}>
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                                    <User className="w-8 h-8" />
                                </div>
                            )}
                        </div>
                        <label className="absolute bottom-0 right-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-purple-700 transition-transform transform group-hover:scale-110">
                            <Upload className="w-3 h-3" />
                            <input type="file" name="image" className="hidden" onChange={handleChange} accept="image/*" />
                        </label>
                </div>
                
                 <div className="flex-1 grid grid-cols-2 gap-3">
                    <InputField 
                        label="First Name" 
                        name="firstName" 
                        icon={User} 
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <InputField 
                        label="Last Name" 
                        name="lastName" 
                        icon={User} 
                        placeholder="Doe" 
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                 </div>
            </div>

            <InputField 
                label="Email Address" 
                name="email" 
                type="email" 
                icon={Mail} 
                placeholder="john@example.com" 
                value={formData.email}
                onChange={handleChange}
            />
            
            <div className="grid grid-cols-2 gap-3">
                 <InputField 
                    label="Phone" 
                    name="phone" 
                    icon={Phone} 
                    placeholder="+1 234..." 
                    value={formData.phone}
                    onChange={handleChange}
                 />
                 
                 <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 ml-1">Gender</label>
                    <div className="relative">
                       <select
                         name="gender"
                         value={formData.gender}
                         onChange={handleChange}
                         className="block w-full pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg leading-tight bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-sm text-gray-700 font-medium appearance-none"
                       >
                         <option value="Male">Male</option>
                         <option value="Female">Female</option>
                         <option value="Other">Other</option>
                       </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                 </div>
            </div>

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

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all transform hover:-translate-y-0.5"
                >
                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Account'}
                </button>
            </div>
            
            <p className="text-[10px] text-center text-gray-400">
                By creating an account, you agree to our <a href="#" className="underline hover:text-purple-600">Terms</a> & <a href="#" className="underline hover:text-purple-600">Privacy Policy</a>.
            </p>
          </form>
       </div>
    </motion.div>
  );
};

export default SignupForm;
