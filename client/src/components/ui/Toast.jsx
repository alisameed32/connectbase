import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border border-white/20 backdrop-blur-md"
          style={{
            backgroundColor: type === 'success' ? 'rgba(236, 253, 245, 0.9)' : 'rgba(254, 242, 242, 0.9)',
            borderColor: type === 'success' ? 'rgba(167, 243, 208, 0.5)' : 'rgba(254, 202, 202, 0.5)',
            color: type === 'success' ? '#065f46' : '#991b1b'
          }}
        >
          {type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{type === 'success' ? 'Success' : 'Error'}</span>
            <span className="text-xs opacity-90">{message}</span>
          </div>

          <button onClick={onClose} className="ml-2 p-1 hover:bg-black/5 rounded-full transition-colors">
            <X className="w-4 h-4 opacity-50" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
