import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, Briefcase, Camera, Loader2, Save } from 'lucide-react';

const InputField = ({ label, name, type = "text", icon: Icon, placeholder, required = false, value, onChange, className }) => (
    <div className={`space-y-1.5 ${className}`}>
        <label className="text-xs font-semibold text-gray-700 ml-1 block">{label}</label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
                <Icon className="h-4 w-4" />
            </div>
            <input
                name={name}
                type={type}
                required={required}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg leading-tight bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-sm"
            />
        </div>
    </div>
);

const ContactFormModal = ({ isOpen, onClose, onSubmit, onImageUpdate, initialData = null, loading }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        title: '',
        image: null
    });
    const [preview, setPreview] = useState(null);

    // Reset or Populate form when modal opens/changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                email: initialData.email || '',
                phone: initialData.phone || '',
                title: initialData.title || '',
                image: null // We don't prepopulate the file object, but we show preview URL
            });
            setPreview(initialData.image || null);
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                title: '',
                image: null
            });
            setPreview(null);
        }
    }, [initialData, isOpen]);

    const [imageUploading, setImageUploading] = useState(false);

    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            if (file) {
                // If in Edit Mode (initialData exists) and onImageUpdate is provided
                if (initialData && onImageUpdate) {
                    const imageFormData = new FormData();
                    imageFormData.append('image', file);
                    
                    try {
                        setImageUploading(true);
                        // Optimistic preview
                        setPreview(URL.createObjectURL(file));
                        
                        await onImageUpdate(imageFormData);
                        
                        // We do NOT update 'formData.image' here to avoid re-sending it on 'onSubmit'
                        // and double-uploading. 
                        setFormData(prev => ({ ...prev, image: null })); 
                    } catch (err) {
                        console.error("Image upload failed", err);
                        // Revert preview on error? 
                        setPreview(initialData.image || null);
                    } finally {
                        setImageUploading(false);
                    }
                } else {
                    // Create Mode or no separate handler: Standard behavior
                    setFormData(prev => ({ ...prev, image: file }));
                    setPreview(URL.createObjectURL(file));
                }
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Prepare data for submission
        const submitData = new FormData();
        submitData.append('firstName', formData.firstName);
        submitData.append('lastName', formData.lastName);
        submitData.append('email', formData.email);
        submitData.append('phone', formData.phone);
        submitData.append('title', formData.title);
        if (formData.image) {
            submitData.append('image', formData.image);
        }

        onSubmit(submitData);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 my-8"
                >
                    {/* Header */}
                    <div className="relative h-24 bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-between px-6">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        <h2 className="text-xl font-bold text-white relative z-10 tracking-tight">
                            {initialData ? 'Update Contact' : 'Create New Contact'}
                        </h2>
                        <button 
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md relative z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Image Upload - Centered */}
                        <div className="flex flex-col items-center -mt-12 mb-4 relative z-20">
                            <div className="relative group cursor-pointer">
                                <div className={`relative w-24 h-24 rounded-full overflow-hidden border-4 ${preview ? 'border-purple-500' : 'border-gray-100'} shadow-md transition-all`}>
                                    {imageUploading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                                        </div>
                                    )}
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                                            <User className="w-10 h-10" />
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white shadow-lg cursor-pointer hover:bg-purple-700 transition-transform transform group-hover:scale-110">
                                    <Camera className="w-4 h-4" />
                                    <input 
                                        type="file" 
                                        name="image" 
                                        className="hidden" 
                                        accept="image/*" 
                                        onChange={handleChange} 
                                    />
                                </label>
                            </div>
                            <span className="text-xs text-gray-400 mt-2 font-medium">
                                {initialData ? 'Update Photo' : 'Upload Photo'}
                            </span>
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="First Name"
                                name="firstName"
                                icon={User}
                                placeholder="Jane"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Last Name"
                                name="lastName"
                                icon={User}
                                placeholder="Doe"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Contact Info */}
                        <InputField
                            label="Email Address"
                            name="email"
                            type="email"
                            icon={Mail}
                            placeholder="jane.doe@company.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="Phone Number"
                                name="phone"
                                icon={Phone}
                                placeholder="+1 (555) 000-0000"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Job Title"
                                name="title"
                                icon={Briefcase}
                                placeholder="Senior Developer"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Footer Actions */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-md hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-70 transform active:scale-95"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        {initialData ? 'Save Changes' : 'Create Contact'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ContactFormModal;
