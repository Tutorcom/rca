import React from 'react';
import type { User, Project, Task, Invoice } from '../types';
import { ArrowLeftIcon, CheckCircleIcon, FileContractIcon, MailIcon } from '../components/icons';

interface ClientDetailPageProps {
    client: User;
    projects: Project[];
    tasks: Task[];
    invoices: Invoice[];
    onBack: () => void;
}

const InfoPill: React.FC<{ label: string, value: string, icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-light text-primary">
            {icon}
        </div>
        <div>
            <div className="text-xs text-slate-500">{label}</div>
            <div className="font-semibold text-slate-700">{value}</div>
        </div>
    </div>
);


const ClientDetailPage: React.FC<ClientDetailPageProps> = ({ client, projects, tasks, invoices, onBack }) => {

    return (
      <div>
        <div className="mb-6">
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary mb-2">
                <ArrowLeftIcon className="w-5 h-5" />
                Back to All Clients
            </button>
          <h1 className="text-3xl font-bold text-slate-800 font-heading">{client.companyName}</h1>
          <p className="text-slate-500 mt-1">A complete overview of your relationship with this client.</p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
                {/* Client Info */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-4">
                         <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-3xl flex-shrink-0">
                            {client.avatar}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 font-heading">{client.name}</h2>
                            <p className="text-slate-500">{client.companyName}</p>
                            <span className={`mt-1 inline-block px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${client.status === 'active' ? 'bg-success-light text-success-dark' : 'bg-warning-light text-warning-dark'}`}>
                                {client.status.replace('_', ' ')}
                            </span>
                        </div>
                    </div>
                     <div className="mt-4 border-t pt-4 space-y-3">
                        <InfoPill label="Contact Email" value={client.email} icon={<MailIcon className="w-5 h-5" />} />
                        <InfoPill label="Total Projects" value={projects.length.toString()} icon={<FileContractIcon className="w-5 h-5" />} />
                        <InfoPill label="Open Tasks" value={tasks.filter(t=>t.status !== 'done').length.toString()} icon={<CheckCircleIcon className="w-5 h-5" />} />
                    </div>
                </div>
            </div>
            
            <div className="xl:col-span-2 space-y-6">
                {/* Projects List */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold text-slate-700 font-heading mb-3">Projects</h3>
                    <div className="space-y-3">
                        {projects.map(p => (
                            <div key={p.id} className="p-3 bg-slate-50 rounded-lg">
                                <p className="font-semibold text-slate-800">{p.title}</p>
                                <p className="text-sm text-slate-500 capitalize">{p.status.replace('_', ' ')} - Due: {new Date(p.deadline).toLocaleDateString()}</p>
                            </div>
                        ))}
                        {projects.length === 0 && <p className="text-sm text-center text-slate-500 py-4">No projects associated with this client.</p>}
                    </div>
                </div>

                 {/* Invoice History */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold text-slate-700 font-heading mb-3">Invoice History</h3>
                    <div className="space-y-3">
                        {invoices.map(i => (
                            <div key={i.id} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-slate-800">Invoice #2024-00{i.id}</p>
                                    <p className="text-sm text-slate-500">Amount: {i.amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                                </div>
                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${i.status === 'paid' ? 'bg-success-light text-success-dark' : 'bg-warning-light text-warning-dark'}`}>
                                    {i.status}
                                </span>
                            </div>
                        ))}
                        {invoices.length === 0 && <p className="text-sm text-center text-slate-500 py-4">No invoices found for this client.</p>}
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
};

export default ClientDetailPage;