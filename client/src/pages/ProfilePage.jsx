import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { ArrowLeft, LogOut, Lock, User, Mail, Phone, Shield, Save, X, Loader2 } from 'lucide-react';
import Toast from '../components/ui/Toast';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
    const [toast, setToast] = useState({ message: '', type: 'success' });

    // Dark theme support - read from localStorage
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await api.get('/auth/me');
            setUser(response.data.data);
        } catch (error) {
            console.error('Failed to load profile', error);
            showToast('Failed to load profile', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            navigate('/auth');
        } catch (error) {
            console.error('Logout failed', error);
            navigate('/auth'); 
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/change-password', passwordForm);
            showToast('Password changed successfully', 'success');
            setIsChangingPassword(false);
            setPasswordForm({ oldPassword: '', newPassword: '' });
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to change password', 'error');
        }
    };

    const showToast = (message, type) => setToast({ message, type });
    const closeToast = () => setToast({ message: '', type: 'success' });

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950"><Loader2 className="animate-spin text-indigo-600 w-8 h-8" /></div>;

    if (!user) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950 gap-4">
            <p className="text-gray-500 dark:text-gray-400">Failed to load profile data.</p>
            <button 
                onClick={fetchUser} 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
                Retry
            </button>
            <button 
                onClick={() => navigate('/auth')} 
                className="text-sm text-gray-500 hover:text-gray-900 underline dark:hover:text-gray-300"
            >
                Back to Login
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 transition-colors pb-12">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm dark:bg-slate-900/80 dark:border-slate-800">
               <div className="flex items-center gap-3 sm:gap-4">
                    <button onClick={() => navigate('/contacts')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full dark:hover:bg-slate-800 dark:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">User Profile</h1>
               </div>
               <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors dark:hover:bg-red-900/20">
                   <LogOut className="w-4 h-4" /> 
                   <span className="hidden sm:inline">Logout</span>
               </button>
            </nav>

            <main className="pt-24 px-4 max-w-2xl mx-auto">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
                    <div className="h-28 sm:h-32 bg-gradient-to-r from-violet-600 to-indigo-600 relative">
                         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    </div>
                    
                    <div className="px-4 sm:px-6 pb-6 relative">
                        <div className="flex justify-between items-end -mt-12 mb-6">
                             <div className="w-24 h-24 rounded-full border-[4px] border-white bg-white shadow-md overflow-hidden dark:border-slate-900 dark:bg-slate-800">
                                 {user?.profilePic ? (
                                    <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                                 ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-slate-700">
                                        <User className="w-10 h-10" />
                                    </div>
                                 )}
                             </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</h2>
                                <p className="text-gray-500 dark:text-gray-400">Personal Account</p>
                            </div>

                            <div className="grid gap-4">
                                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-4 dark:bg-slate-800/50 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                                    <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold dark:text-gray-400">Email Address</p>
                                        <p className="text-gray-900 font-medium dark:text-white">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-4 dark:bg-slate-800/50 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                                    <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold dark:text-gray-400">Phone</p>
                                        <p className="text-gray-900 font-medium dark:text-white">{user?.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Change Password Section */}
                            <div className="border-t border-gray-100 pt-6 dark:border-slate-800">
                                {!isChangingPassword ? (
                                    <button 
                                        onClick={() => setIsChangingPassword(true)}
                                        className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all dark:text-indigo-400 dark:hover:bg-indigo-900/20 dark:hover:border-indigo-800"
                                    >
                                        <Lock className="w-4 h-4" />
                                        Change Password
                                    </button>
                                ) : (
                                    <motion.form 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        onSubmit={handleChangePassword}
                                        className="bg-indigo-50/50 rounded-xl p-6 border border-indigo-100 space-y-4 dark:bg-slate-800 dark:border-slate-700"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-indigo-900 flex items-center gap-2 dark:text-indigo-300">
                                                <Shield className="w-4 h-4" /> Secure Password Change
                                            </h3>
                                            <button type="button" onClick={() => setIsChangingPassword(false)} className="text-indigo-400 hover:text-indigo-600">
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-xs font-semibold uppercase text-indigo-800/60 ml-1 mb-1 block dark:text-indigo-300/60">Current Password</label>
                                                <input
                                                    type="password"
                                                    required
                                                    className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                                                    placeholder="Enter current password"
                                                    value={passwordForm.oldPassword}
                                                    onChange={e => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold uppercase text-indigo-800/60 ml-1 mb-1 block dark:text-indigo-300/60">New Password</label>
                                                <input
                                                    type="password"
                                                    required
                                                    className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                                                    placeholder="Enter new password"
                                                    value={passwordForm.newPassword}
                                                    onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 mt-2">
                                            <button 
                                                type="button" 
                                                onClick={() => setIsChangingPassword(false)}
                                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type="submit"
                                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                                            >
                                                <Save className="w-4 h-4" /> Reset Password
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={closeToast} 
            />
        </div>
    );
}

export default ProfilePage;
