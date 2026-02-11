import React, { useState } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { motion } from 'framer-motion';

const AuthPage = () => {
    // Mode can be 'login' or 'signup'
    const [mode, setMode] = useState('login');

    const toggleMode = () => {
        setMode(prev => (prev === 'login' ? 'signup' : 'login'));
    };

    return (
        <AuthLayout 
            title={mode === 'login' ? 'Welcome back' : 'Create an account'}
            subtitle={mode === 'login' ? 'Please enter your details to sign in.' : 'Start your journey with us properly.'}
        >
             {/* Toggle Switch */}
             <div className="flex justify-center mb-8">
                <div className="bg-purple-50/80 p-1.5 rounded-full flex relative border border-purple-100/50">
                     {/* Moving Background Pill */}
                     <motion.div 
                        className="absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-md z-0"
                        layoutId="activeTab"
                        initial={false}
                        animate={{
                            left: mode === 'login' ? '6px' : '50%',
                            width: 'calc(50% - 6px)',
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                     />
                    
                    <button 
                        onClick={() => setMode('login')}
                        className={`relative z-10 px-8 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${mode === 'login' ? 'text-purple-900' : 'text-gray-500 hover:text-purple-700'}`}
                    >
                        Login
                    </button>
                    <button 
                         onClick={() => setMode('signup')}
                         className={`relative z-10 px-8 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${mode === 'signup' ? 'text-purple-900' : 'text-gray-500 hover:text-purple-700'}`}
                    >
                        Sign Up
                    </button>
                </div>
             </div>

            {mode === 'login' ? (
                <LoginForm onToggle={toggleMode} />
            ) : (
                <SignupForm onToggle={toggleMode} />
            )}
        </AuthLayout>
    );
};

export default AuthPage;
