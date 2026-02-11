import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Trash2, Loader2, StopCircle } from 'lucide-react';

const DeleteContactModal = ({ isOpen, onClose, onConfirm, contactName, loading }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-red-100"
                >
                    <div className="p-6 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
                            <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Delete Contact?
                        </h3>
                        
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to delete <strong>{contactName}</strong>? This action cannot be undone.
                        </p>

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={onClose}
                                disabled={loading}
                                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={loading}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold text-sm shadow-md hover:from-red-600 hover:to-rose-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 min-w-[100px] active:scale-95"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DeleteContactModal;
