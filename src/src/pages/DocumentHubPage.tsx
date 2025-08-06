import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import type { Document } from '../types';
import { FaFileArchive, FaFilePdf, FaFileWord, FaDownload, FaTrash } from 'react-icons/fa';

interface DocumentHubPageProps {
  documents: Document[];
}

const DocumentHubPage: React.FC<DocumentHubPageProps> = ({ documents }) => {
    const { users } = useAuth();

    const getUserNameById = (id: number) => {
        const user = users.find(u => u.id === id);
        return user ? user.name : 'Unknown User';
    }

    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <div>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800 font-heading">Document Hub</h1>
                    <p className="text-slate-500 mt-1">View all documents uploaded by contractors and administrators.</p>
                </div>
                
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                     <h2 className="text-xl font-bold text-slate-700 font-heading flex items-center gap-2 mb-4">
                        <FaFileArchive className="w-6 h-6 text-primary"/>
                        All Uploaded Documents
                    </h2>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-500">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Document Name</th>
                                    <th scope="col" className="px-6 py-3">Uploaded By</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Size</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((doc) => (
                                    <tr key={doc.id} className="bg-white border-b hover:bg-slate-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap flex items-center gap-3">
                                            {doc.type === 'pdf' ? <FaFilePdf className="w-6 h-6 text-danger" /> : <FaFileWord className="w-6 h-6 text-blue-500" />}
                                            {doc.name}
                                        </th>
                                        <td className="px-6 py-4">{getUserNameById(doc.uploadedBy)}</td>
                                        <td className="px-6 py-4">{doc.date}</td>
                                        <td className="px-6 py-4">{doc.size}</td>
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            <button className="p-1 text-slate-500 hover:text-primary"><FaDownload className="w-5 h-5" /></button>
                                            <button className="p-1 text-slate-500 hover:text-danger"><FaTrash className="w-5 h-5" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {documents.length === 0 && (
                            <div className="text-center py-10 text-slate-500">
                                <p>No documents have been uploaded yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default DocumentHubPage;