import React from 'react';
import type { Application, ApplicationStatus } from '../types';
import ApplicationsTable from '../components/ApplicationsTable';
import { useAuth } from '../contexts/AuthContext';
import { FaFileAlt } from 'react-icons/fa';

interface MyApplicationsPageProps {
    applications: Application[];
    setApplicationStatus: (appId: number, status: ApplicationStatus) => void;
}

const MyApplicationsPage: React.FC<MyApplicationsPageProps> = ({ applications, setApplicationStatus }) => {
    const { user } = useAuth();
    if (!user) return null;

    const displayedApplications = user.role === 'admin' 
        ? applications 
        : applications.filter(app => app.contractorId === user.id);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 font-heading">My Applications</h1>
                <p className="text-slate-500 mt-1">
                    {user.role === 'admin' ? 'Review and manage all contractor applications.' : 'Track the status of your submitted applications.'}
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-700 font-heading flex items-center gap-2">
                        <FaFileAlt className="w-6 h-6 text-primary"/>
                        {user.role === 'admin' ? 'All Submitted Applications' : 'Your Application History'}
                    </h2>
                </div>
                <ApplicationsTable applications={displayedApplications} setApplicationStatus={setApplicationStatus} />
            </div>
        </div>
    );
};

export default MyApplicationsPage;