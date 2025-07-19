import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Invoice, Project, User, InvoiceStatus } from '../types';
import { BillingIcon } from '../components/icons';

interface BillingPageProps {
  invoices: Invoice[];
  projects: Project[];
  users: User[];
  setInvoiceStatus: (invoiceId: number, status: InvoiceStatus) => void;
}

const statusStyles: { [key in InvoiceStatus]: string } = {
    draft: 'bg-slate-200 text-slate-600',
    sent: 'bg-info-light text-info-dark',
    paid: 'bg-success-light text-success-dark',
    overdue: 'bg-danger-light text-danger-dark',
};

const getStatusText = (status: InvoiceStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
}

const BillingPage: React.FC<BillingPageProps> = ({ invoices, projects, users, setInvoiceStatus }) => {
    const { user } = useAuth();
    if (!user) return null;

    const getProjectTitle = (projectId: number) => projects.find(p => p.id === projectId)?.title || 'N/A';
    const getClientName = (clientId: number) => users.find(u => u.id === clientId)?.name || 'N/A';

    const displayedInvoices = user.role === 'admin' ? invoices : invoices.filter(inv => inv.clientId === user.id);

    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 font-heading">Billing</h1>
          <p className="text-slate-500 mt-1">
            {user.role === 'admin' ? 'Manage all client invoices.' : 'View your invoice history and make payments.'}
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-700 font-heading flex items-center gap-2">
                    <BillingIcon className="w-6 h-6 text-primary"/>
                    {user.role === 'admin' ? 'All Invoices' : 'My Invoices'}
                </h2>
                {user.role === 'admin' && (
                    <button className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors">
                        Create Invoice
                    </button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Invoice ID</th>
                            {user.role === 'admin' && <th scope="col" className="px-6 py-3">Client</th>}
                            <th scope="col" className="px-6 py-3">Project</th>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">Issue Date</th>
                            <th scope="col" className="px-6 py-3">Due Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedInvoices.map((invoice) => (
                            <tr key={invoice.id} className="bg-white border-b hover:bg-slate-50">
                                <td scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                    #2024-00{invoice.id}
                                </td>
                                {user.role === 'admin' && <td className="px-6 py-4">{getClientName(invoice.clientId)}</td>}
                                <td className="px-6 py-4">{getProjectTitle(invoice.projectId)}</td>
                                <td className="px-6 py-4 font-semibold">{invoice.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                <td className="px-6 py-4">{new Date(invoice.issueDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[invoice.status]}`}>
                                        {getStatusText(invoice.status)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {user.role === 'contractor' && (invoice.status === 'sent' || invoice.status === 'overdue') ? (
                                        <button onClick={() => setInvoiceStatus(invoice.id, 'paid')} className="font-medium text-white bg-success hover:bg-success-dark px-3 py-1 rounded-md">Pay Now</button>
                                    ) : (
                                        <a href="#" className="font-medium text-primary hover:underline">Details</a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    );
};

export default BillingPage;