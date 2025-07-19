import React, { useState } from 'react';
import { Application, ApplicationStatus } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface ApplicationsTableProps {
  applications: Application[];
  setApplicationStatus?: (appId: number, status: ApplicationStatus) => void;
}

const statusStyles: { [key in ApplicationStatus]: string } = {
  approved: 'bg-success-light text-success-dark',
  review: 'bg-info-light text-info-dark',
  update: 'bg-warning-light text-warning-dark',
  rejected: 'bg-danger-light text-danger-dark',
  draft: 'bg-slate-200 text-slate-600',
  submitted: 'bg-blue-200 text-blue-800'
};

const getStatusText = (status: ApplicationStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
}

const AdminActions: React.FC<{ app: Application, setApplicationStatus: (appId: number, status: ApplicationStatus) => void }> = ({ app, setApplicationStatus }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleStatusChange = (status: ApplicationStatus) => {
        setApplicationStatus(app.id, status);
        setIsOpen(false);
    }
    
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="font-medium text-primary hover:underline">
                Manage
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-10">
                   <button onClick={() => handleStatusChange('approved')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Approve</button>
                   <button onClick={() => handleStatusChange('rejected')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Reject</button>
                   <button onClick={() => handleStatusChange('review')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">To Review</button>
                   <button onClick={() => handleStatusChange('update')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Needs Update</button>
                </div>
            )}
        </div>
    )
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ applications, setApplicationStatus }) => {
  const { user } = useAuth();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-500">
        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-3">Contract Title</th>
            <th scope="col" className="px-6 py-3">Contractor</th>
            <th scope="col" className="px-6 py-3">Date Applied</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="bg-white border-b hover:bg-slate-50">
              <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                {app.contractTitle}
              </th>
              <td className="px-6 py-4">{app.contractor}</td>
              <td className="px-6 py-4">{formatDate(app.date)}</td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[app.status]}`}>
                  {getStatusText(app.status)}
                </span>
              </td>
              <td className="px-6 py-4">
                {user?.role === 'admin' && setApplicationStatus ? (
                    <AdminActions app={app} setApplicationStatus={setApplicationStatus} />
                ) : (
                     <a href="#" className="font-medium text-primary hover:underline">Details</a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {applications.length === 0 && (
          <div className="text-center py-10 text-slate-500">
              <p>No applications found.</p>
          </div>
      )}
    </div>
  );
};

export default ApplicationsTable;
