import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Trash2, Edit2, ChevronLeft, ChevronRight, MoreVertical, LogOut, FileDown, Upload, Eye } from 'lucide-react';
import ContactFormModal from '../components/contacts/ContactFormModal';
import DeleteContactModal from '../components/contacts/DeleteContactModal';
import ViewContactModal from '../components/contacts/ViewContactModal';
import Toast from '../components/ui/Toast';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    
    // UI States
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [toast, setToast] = useState({ message: '', type: 'success' });

    // Fetch Contacts
    const fetchContacts = async (page = 0, query = '') => {
        setLoading(true);
        try {
            const endpoint = query 
                ? `/api/contacts/search?query=${query}&page=${page}&size=10`
                : `/api/contacts?page=${page}&size=10`;
            
            console.log("Fetching contacts from:", endpoint);
            const response = await api.get(endpoint);
            console.log("Full API Response:", response); // DEBUG LOG
            
            // Check if response has data.data (ApiResponse wrapper)
            const responseData = response.data;
            if (responseData && responseData.data) {
                 const pageData = responseData.data;
                 console.log("Page Data content:", pageData.content); // DEBUG LOG
                 setContacts(pageData.content || []) ;
                 setTotalPages(pageData.totalPages || 0);
                 setTotalElements(pageData.totalElements || 0);
                 setCurrentPage(pageData.number || 0);
            } else {
                 console.warn("Unexpected response structure:", responseData);
                 setContacts([]);
            }
            
        } catch (error) {
            console.error('Error fetching contacts:', error);
            if (error.response) {
                console.error("Backend Error Data:", error.response.data);
                console.error("Backend Error Status:", error.response.status);
            }
            showToast(error.response?.data?.message || 'Failed to load contacts', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Initial Load & Debounced Search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchContacts(currentPage, searchQuery);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, currentPage]);


    // Handlers
    const handleCreate = async (formData) => {
        try {
            await api.post('/api/contact/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            showToast('Contact created successfully', 'success');
            setIsCreateOpen(false);
            fetchContacts(0, searchQuery); // Refresh to first page
        } catch (error) {
            console.error(error);
            showToast('Failed to create contact', 'error');
        }
    };

    const handleUpdate = async (formData) => {
        if (!selectedContact) return;
        try {
            // Need to append ID if not in form data? 
            // The Modal returns a FormData object. We need to send it to PUT /update-contact/{id}
            await api.put(`/api/update-contact/${selectedContact.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            showToast('Contact updated successfully', 'success');
            setIsEditOpen(false);
            fetchContacts(currentPage, searchQuery);
        } catch (error) {
            console.error(error);
            showToast('Failed to update contact', 'error');
        }
    };

    const handleDelete = async () => {
        if (!selectedContact) return;
        try {
            await api.delete(`/api/delete-contact/${selectedContact.id}`);
            showToast('Contact deleted successfully', 'success');
            setIsDeleteOpen(false);
            fetchContacts(currentPage, searchQuery);
        } catch (error) {
            console.error(error);
            showToast('Failed to delete contact', 'error');
        }
    };

    const handleExport = async () => {
        try {
            const response = await api.get('/api/contacts/export', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'contacts.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Export failed:', error);
            showToast('Failed to export contacts', 'error');
        }
    };
    
    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            window.location.href = '/auth';
        } catch (err) {
            console.error(err);
        }
    };

    const showToast = (message, type) => setToast({ message, type });
    const closeToast = () => setToast({ message: '', type: 'success' });


    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-gray-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100/20 via-slate-50 to-slate-50">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm transition-all">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-gray-900">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-200">
                        C
                    </div>
                    ConnectBase
                </div>
                <div className="flex items-center gap-4">
                    <button 
                         onClick={handleLogout}
                         className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300"></div> {/* User Avatar Placeholder */}
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
                
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage your team and network relationships.</p>
                    </div>
                    
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        Add Contact
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Search className="h-4 w-4" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex gap-3">
                        <button 
                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                        >
                             <Upload className="w-4 h-4 text-gray-500" />
                             Import
                        </button>
                        <button 
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                            title="Export Contacts"
                        >
                             <FileDown className="w-4 h-4 text-gray-500" />
                             Export
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Info</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Job Title</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-2"></div>
                                                Loading contacts...
                                            </div>
                                        </td>
                                    </tr>
                                ) : contacts.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                            No contacts found. Try adjusting your search or add a new contact.
                                        </td>
                                    </tr>
                                ) : (
                                    contacts.map((contact) => (
                                        <motion.tr 
                                            key={contact.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            whilehover={{ backgroundColor: "#fafafa" }}
                                            className="group transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        {contact.image ? (
                                                            <img className="h-10 w-10 rounded-full object-cover border border-gray-100" src={contact.image} alt="" />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                                                {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-gray-900">{contact.firstName} {contact.lastName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{contact.email}</div>
                                                <div className="text-xs text-gray-500">{contact.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700">
                                                    {contact.title || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => { setSelectedContact(contact); setIsViewOpen(true); }}
                                                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all hover:shadow-sm"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => { setSelectedContact(contact); setIsEditOpen(true); }}
                                                        className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all hover:shadow-sm"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => { setSelectedContact(contact); setIsDeleteOpen(true); }}
                                                        className="p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all hover:shadow-sm"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-medium">{contacts.length > 0 ? currentPage * 10 + 1 : 0}</span> to <span className="font-medium">{Math.min((currentPage + 1) * 10, totalElements)}</span> of <span className="font-medium">{totalElements}</span> results
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                                disabled={currentPage === 0}
                                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                                disabled={currentPage >= totalPages - 1}
                                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

            </main>

            {/* Modals */}
            <ContactFormModal 
                isOpen={isCreateOpen} 
                onClose={() => setIsCreateOpen(false)} 
                onSubmit={handleCreate}
                loading={loading /* Shared loading state might click during fetch. Ideally use separate loading state for mutations */}
            />
            
            <ContactFormModal 
                isOpen={isEditOpen} 
                onClose={() => setIsEditOpen(false)} 
                onSubmit={handleUpdate}
                initialData={selectedContact}
                loading={loading}
            />

            <DeleteContactModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                contactName={selectedContact ? `${selectedContact.firstName} ${selectedContact.lastName}` : ''}
                loading={loading}
            />

            <ViewContactModal
                isOpen={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                contact={selectedContact}
            />

            <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={closeToast} 
            />
        </div>
    );
};

export default ContactsPage;
