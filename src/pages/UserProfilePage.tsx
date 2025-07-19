import React from 'react';
import DocumentManager from '../components/DocumentManager';
import { useAuth } from '../contexts/AuthContext';
import { Document, Activity, Notification } from '../types';
import { BadgeCheckIcon } from '../components/icons';

interface UserProfilePageProps {
    documents: Document[];
    setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
    addActivity: (activity: Omit<Activity, 'id' | 'time'>) => void;
    addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ documents, setDocuments, addActivity, addNotification }) => {
    const { user } = useAuth();

    if (!user) return null;

    const userDocuments = documents.filter(doc => doc.uploadedBy === user.id);

    const handleUpload = () => {
        const newDocName = `Document_${user.name.replace(/\s/g, '_')}_${Date.now()}.pdf`;
        const newDoc: Document = {
          id: Date.now(),
          name: newDocName,
          type: 'pdf',
          size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          uploadedBy: user.id,
        };
        
        setDocuments(prevDocs => [newDoc, ...prevDocs]);

        addActivity({
            type: 'document',
            title: 'Document Uploaded',
            description: `You uploaded a new file: ${newDoc.name}`
        });

        if (user.role === 'contractor') {
            addNotification({
                title: 'File Received',
                description: `${user.name} uploaded a new document.`,
            });
        }
    };


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                 <div className="p-6 bg-white rounded-lg shadow-sm text-center">
                    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white font-bold text-4xl flex-shrink-0 mx-auto">
                        {user.avatar}
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 font-heading mt-4">{user.name}</h1>
                    <p className="text-slate-500 text-md">{user.email}</p>
                    <p className="text-slate-600 text-lg mt-1">{user.companyName}</p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary-light text-primary capitalize">{user.role}</span>
                        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full capitalize ${user.status === 'active' ? 'bg-success-light text-success-dark' : 'bg-warning-light text-warning-dark'}`}>
                            {user.status === 'active' ? 'Active' : 'Pending Review'}
                        </span>
                    </div>
                </div>
                 <div className="p-6 bg-white rounded-lg shadow-sm">
                     <h3 className="text-lg font-bold text-slate-700 font-heading mb-3">Certifications</h3>
                      {user.certifications.length > 0 ? (
                        <ul className="space-y-2">
                            {user.certifications.map(cert => (
                                <li key={cert} className="flex items-center text-slate-600">
                                    <BadgeCheckIcon className="w-5 h-5 text-success mr-2 flex-shrink-0" />
                                    <span>{cert}</span>
                                </li>
                            ))}
                        </ul>
                        ) : (
                        <p className="text-slate-500 text-sm">No certifications listed.</p>
                      )}
                 </div>
            </div>

            <div className="lg:col-span-2">
                 {user.role === 'contractor' ? (
                    <DocumentManager 
                        documents={userDocuments}
                        onUpload={handleUpload}
                    />
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                         <h2 className="text-xl font-bold text-slate-700 font-heading mb-4">Admin Profile</h2>
                         <p className="text-slate-600">As an administrator, you have full access to manage all users, contracts, and applications across the platform. You can view all documents in the <span className="font-semibold text-primary">Document Hub</span> and communicate with contractors via the <span className="font-semibold text-primary">Messages</span> page.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default UserProfilePage;