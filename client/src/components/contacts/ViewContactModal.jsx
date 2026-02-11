import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, Briefcase, Calendar, Copy, Check } from 'lucide-react';

const ViewContactModal = ({ isOpen, onClose, contact }) => {
    const [copiedField, setCopiedField] = useState(null);

    if (!contact) return null;

    const handleCopy = (text, field) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Header */}
                            <div className="relative h-32 bg-gradient-to-r from-violet-600 to-indigo-600">
                                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md border border-white/10"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Profile Image & Name */}
                            <div className="px-8 pb-6 -mt-12 flex flex-col items-center border-b border-gray-100 relative">
                                <div className="h-24 w-24 rounded-full border-[4px] border-white shadow-lg bg-white overflow-hidden z-10">
                                     {contact.image ? (
                                        <img className="h-full w-full object-cover" src={contact.image} alt="" />
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-indigo-600 text-3xl font-bold">
                                            {contact.firstName?.charAt(0)}{contact.lastName?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <h2 className="mt-4 text-2xl font-bold text-gray-900 tracking-tight">{contact.firstName} {contact.lastName}</h2>
                                <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">
                                    {contact.title}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="p-6 space-y-4 overflow-y-auto bg-gray-50/50">
                                <div className="space-y-3">
                                    <div 
                                        onClick={() => handleCopy(contact.email, 'email')}
                                        className="group flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                                    >
                                        <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Email</p>
                                            <p className="text-gray-900 font-medium truncate">{contact.email}</p>
                                        </div>
                                        <div className="text-gray-400 group-hover:text-indigo-600 transition-colors">
                                            {copiedField === 'email' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                        </div>
                                    </div>

                                    <div 
                                        onClick={() => handleCopy(contact.phone, 'phone')}
                                        className="group flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer relative"
                                    >
                                        <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Phone</p>
                                            <p className="text-gray-900 font-medium truncate">{contact.phone}</p>
                                        </div>
                                        <div className="text-gray-400 group-hover:text-indigo-600 transition-colors">
                                            {copiedField === 'phone' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-100 transition-all hover:border-indigo-200">
                                        <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600 group-hover:text-white">
                                            <Briefcase className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Job Title</p>
                                            <p className="text-gray-900 font-medium">{contact.title}</p>
                                        </div>
                                    </div>

                                    {contact.createdAt && (
                                        <div className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-gray-100 transition-all hover:border-indigo-200">
                                            <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600 group-hover:text-white">
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Added On</p>
                                                <p className="text-gray-900 font-medium">
                                                    {new Date(contact.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 bg-white border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all shadow-sm active:scale-95"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ViewContactModal;
