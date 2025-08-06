import React from 'react';
import type { Document } from '../types';
import { FileUploadIcon, FilePdfIcon, FileWordIcon, DownloadIcon, TrashIcon } from './icons';

interface DocumentManagerProps {
  documents: Document[];
  onUpload: () => void;
}

const DocumentManager: React.FC<DocumentManagerProps> = ({ documents, onUpload }) => {

  return (
    <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-slate-700 font-heading flex items-center gap-2 mb-4">
        <FileUploadIcon className="w-6 h-6 text-primary" />
        My Documents
      </h2>
      
      <div 
        onClick={onUpload}
        className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-primary-light transition mb-4"
      >
        <FileUploadIcon className="w-8 h-8 mx-auto text-primary" />
        <p className="mt-2 text-sm font-semibold text-primary">Click to upload a new document</p>
        <p className="text-xs text-slate-500">PDF or DOCX files</p>
      </div>

      <h3 className="text-md font-semibold text-slate-600 mb-2">Uploaded Documents</h3>
      <ul className="space-y-2">
        {documents.length > 0 ? documents.map(doc => (
          <li key={doc.id} className="flex items-center p-2 rounded-lg hover:bg-slate-50">
            {doc.type === 'pdf' ? <FilePdfIcon className="w-6 h-6 text-danger" /> : <FileWordIcon className="w-6 h-6 text-blue-500" />}
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-slate-800 truncate" title={doc.name}>{doc.name}</p>
              <p className="text-xs text-slate-500">{doc.size} &bull; {doc.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 text-slate-500 hover:text-primary"><DownloadIcon className="w-5 h-5" /></button>
              <button className="p-1 text-slate-500 hover:text-danger"><TrashIcon className="w-5 h-5" /></button>
            </div>
          </li>
        )) : (
            <div className="text-center py-6 text-slate-500 text-sm">
                <p>You haven't uploaded any documents yet.</p>
            </div>
        )}
      </ul>
    </section>
  );
};

export default DocumentManager;