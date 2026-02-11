import React, { useState } from 'react';
import axios from 'axios';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import Toast from '../components/ui/Toast';
import ForgotPasswordDialog from '../components/auth/ForgotPasswordDialog';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage = () => {
    // Mode can be 'login' or 'signup'
    const [mode, setMode] = useState('login');
    const [toast, setToast] = useState({ message: '', type: 'success' });
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    const toggleMode = () => {
        setMode(prev => (prev === 'login' ? 'signup' : 'login'));
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const closeToast = () => {
        setToast({ message: '', type: 'success' });
    };

    return (
        <>
            <AuthLayout 
                title={mode === 'login' ? 'Welcome back' : 'Create an account'}
                subtitle={mode === 'login' ? 'Please enter your details to sign in.' : 'Start your journey with us properly.'}
            >
                {/* Toggle Switch */}
                <div className="flex justify-center mb-6">
                    <div className="bg-purple-50/80 p-1 rounded-full flex relative border border-purple-100/50">
                        {/* Moving Background Pill */}
                        <motion.div 
                            className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm z-0"
                            layoutId="activeTab"
                            initial={false}
                            animate={{
                                left: mode === 'login' ? '4px' : '50%',
                                width: 'calc(50% - 4px)',
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        
                        <button 
                            onClick={() => setMode('login')}
                            className={`relative z-10 px-6 py-2 text-xs font-bold rounded-full transition-colors duration-200 ${mode === 'login' ? 'text-purple-900' : 'text-gray-500 hover:text-purple-700'}`}
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => setMode('signup')}
                            className={`relative z-10 px-6 py-2 text-xs font-bold rounded-full transition-colors duration-200 ${mode === 'signup' ? 'text-purple-900' : 'text-gray-500 hover:text-purple-700'}`}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {mode === 'login' ? (
                    <LoginForm 
                        onToggle={toggleMode} 
                        showToast={showToast} 
                        onForgotPassword={() => setIsForgotPasswordOpen(true)}
                    />
                ) : (
                    <SignupForm 
                        onToggle={toggleMode} 
                        showToast={showToast} 
                    />
                )}
            </AuthLayout>

            <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={closeToast} 
            />
            
            <ForgotPasswordDialog 
                isOpen={isForgotPasswordOpen} 
                onClose={() => setIsForgotPasswordOpen(false)}
                showToast={showToast}
            />
        </>
    );
};

export default AuthPage;
