import React from 'react';
import type { Project } from '../types';
import { FaTimes, FaFilePdf } from 'react-icons/fa';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSubmit: (projectId: number) => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, project, onSubmit }) => {
  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b bg-slate-50 rounded-t-lg">
          <div>
             <h2 className="text-xl font-bold text-slate-800 font-heading">Project Proposal</h2>
             <p className="text-slate-600">{project.title}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200">
            <FaTimes className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="p-6">
            <div className="mb-6">
                <h3 className="font-semibold text-slate-700 mb-2">Please review the following documents before submitting your proposal:</h3>
                <ul className="space-y-2">
                    {project.relatedDocuments.map((doc, index) => (
                        <li key={index} className="flex items-center">
                           <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-2 rounded-md hover:bg-primary-light w-full transition-colors">
                             <FaFilePdf className="w-6 h-6 text-danger flex-shrink-0" />
                             <span className="ml-3 text-sm font-medium text-primary hover:underline">{doc.name}</span>
                           </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm text-slate-600">
                    By clicking "Confirm & Submit Proposal", you acknowledge that you have reviewed the associated documents and agree to the terms outlined within. Your proposal will be submitted to <span className="font-semibold">{project.clientName}</span> for review.
                </p>
            </div>
        </div>

         <div className="flex justify-end items-center p-4 border-t bg-slate-50 rounded-b-lg space-x-3">
             <button
                onClick={onClose}
                className="bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
             >
                Cancel
             </button>
             <button
                onClick={() => onSubmit(project.id)}
                className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors"
             >
                Confirm & Submit Proposal
             </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;