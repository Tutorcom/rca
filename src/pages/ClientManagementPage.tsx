import React, { useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { Page, User } from '../types';
import { UsersIcon, MailIcon, CheckCircleIcon, ChevronDownIcon } from '../components/icons';

interface ClientManagementPageProps {
    users: User[];
    setUserStatus: (userId: number, status: 'active' | 'pending_review') => void;
    setCurrentPage: (page: Page) => void;
    onClientSelect: (clientId: number) => void;
}

const ClientActions: React.FC<{ user: User, onApprove: () => void, onSendMessage: () => void }> = ({ user, onApprove, onSendMessage }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="px-2 py-1 rounded-md hover:bg-slate-200">
                <ChevronDownIcon className="w-5 h-5 text-slate-500"/>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10 border border-slate-200">
                   {user.status === 'pending_review' && (
                        <button 
                            onClick={() => { onApprove(); setIsOpen(false); }} 
                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                            <CheckCircleIcon className="w-4 h-4 text-success"/> Approve
                        </button>
                   )}
                   <button 
                        onClick={() => { onSendMessage(); setIsOpen(false); }} 
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                        <MailIcon className="w-4 h-4 text-primary"/> Send Message
                    </button>
                </div>
            )}
        </div>
    )
}

const ClientManagementPage: React.FC<ClientManagementPageProps> = ({ users, setUserStatus, setCurrentPage, onClientSelect }) => {
    
    const handleSendMessage = (_userId: number) => {
        // In a real app, you might set the active conversation here
        setCurrentPage('messages');
    }
    
    const clients = users.filter(u => u.role === 'contractor');

    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <div>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800 font-heading">Client Management</h1>
                    <p className="text-slate-500 mt-1">View and manage all clients and leads on the platform.</p>
                </div>
                
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-slate-700 font-heading flex items-center gap-2">
                            <UsersIcon className="w-6 h-6 text-primary"/>
                            All Clients
                        </h2>
                        {/* Add filter/search controls here later */}
                     </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-500">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Client</th>
                                    <th scope="col" className="px-6 py-3">Company</th>
                                    <th scope="col" className="px-6 py-3">Tags</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.id} className="bg-white border-b hover:bg-slate-50">
                                        <td scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
                                                {client.avatar}
                                            </div>
                                            <div>
                                                <button onClick={() => onClientSelect(client.id)} className="font-semibold text-left hover:underline text-primary">{client.name}</button>
                                                <div className="text-slate-500">{client.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{client.companyName}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {client.tags.map(tag => (
                                                    <span key={tag} className="bg-slate-200 text-slate-600 px-2 py-0.5 text-xs font-medium rounded-full">{tag}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                             <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${client.status === 'active' ? 'bg-success-light text-success-dark' : 'bg-warning-light text-warning-dark'}`}>
                                                {client.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                             <ClientActions 
                                                user={client} 
                                                onApprove={() => setUserStatus(client.id, 'active')}
                                                onSendMessage={() => handleSendMessage(client.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default ClientManagementPage;