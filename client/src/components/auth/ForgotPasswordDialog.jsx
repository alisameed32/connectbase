import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, KeyRound, Lock, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

const api = axios.create({
  baseURL: 'http://localhost:8080/auth',
  withCredentials: true
});

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

const ForgotPasswordDialog = ({ isOpen, onClose, showToast }) => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
        // Send verification code
        await api.post('/forgot-password', null, { params: { email } });
        setStep(2);
        showToast('Verification code sent to your email', 'success');
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to send verification code. Please check your email.');
    } finally {
        setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }
    
    setLoading(true);
    setError('');

    try {
        // Reset Password
        await api.post('/reset-password', null, { 
            params: { 
                email, 
                code: otp, 
                newPassword 
            } 
        });
        showToast('Password reset successfully! Please login.', 'success');
        onClose();
        // Reset state after closing
        setTimeout(() => {
            setStep(1);
            setEmail('');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
        }, 500);
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to reset password. Invalid code or expired.');
    } finally {
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
                {/* Header */}
                <div className="relative px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-800">
                        {step === 1 ? 'Reset Password' : 'Verify & Reset'}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {step === 1 ? (
                        <form onSubmit={handleSendCode} className="space-y-4">
                            <p className="text-sm text-gray-500 mb-4">
                                Enter your email address and we'll send you a verification code to reset your password.
                            </p>
                            
                            <InputField
                                label="Email Address"
                                name="email"
                                type="email"
                                icon={Mail}
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                                    <>
                                        Send Verification Code
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-xs mb-4">
                                <CheckCircle className="w-4 h-4" />
                                <span>Code sent to <b>{email}</b></span>
                                <button 
                                    type="button" 
                                    onClick={() => setStep(1)} 
                                    className="ml-auto underline hover:text-blue-800"
                                >
                                    Change
                                </button>
                            </div>

                            <InputField
                                label="Verification Code"
                                name="otp"
                                icon={KeyRound}
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <InputField
                                    label="New Password"
                                    name="newPassword"
                                    type="password"
                                    icon={Lock}
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <InputField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    icon={Lock}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Reset Password'}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};

export default ForgotPasswordDialog;
