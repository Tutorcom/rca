import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { ChartLineIcon, CheckCircleIcon, FileContractIcon } from '../components/icons';
import { Project, Invoice, Task } from '../types';

interface AnalyticsPageProps {
    projects: Project[];
    invoices: Invoice[];
    tasks: Task[];
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ projects, invoices, tasks }) => {
    
    const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
    const pendingRevenue = invoices.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0);
    
    const projectStatusCounts = projects.reduce((acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const taskStatusCounts = tasks.reduce((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const ChartBar = ({ label, value, maxValue, colorClass }: { label: string, value: number, maxValue: number, colorClass: string }) => {
        const heightPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
        return (
            <div className="flex flex-col items-center">
                <div className="w-12 h-48 bg-slate-100 rounded-t-lg flex items-end">
                    <div className={`w-full ${colorClass} rounded-t-lg`} style={{ height: `${heightPercentage}%` }}></div>
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-2 capitalize">{label.replace('_', ' ')}</div>
            </div>
        )
    }

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 font-heading">Analytics</h1>
          <p className="text-slate-500 mt-1">Data insights and reporting for your firm.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-slate-500 font-medium">Total Revenue (Paid)</h3>
                <p className="text-3xl font-bold text-success mt-1">{totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
             <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-slate-500 font-medium">Pending Revenue</h3>
                <p className="text-3xl font-bold text-warning mt-1">{pendingRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
             <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-slate-500 font-medium">Total Projects</h3>
                <p className="text-3xl font-bold text-primary mt-1">{projects.length}</p>
            </div>
             <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-slate-500 font-medium">Pending Tasks</h3>
                <p className="text-3xl font-bold text-danger mt-1">{tasks.filter(t=>t.status !== 'done').length}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h2 className="text-xl font-bold text-slate-700 font-heading flex items-center gap-2 mb-4">
                    <FileContractIcon className="w-6 h-6 text-primary"/>
                    Project Status Distribution
                </h2>
                <div className="flex justify-around items-end pt-4">
                    <ChartBar label="Opportunity" value={projectStatusCounts.opportunity || 0} maxValue={projects.length} colorClass="bg-info" />
                    <ChartBar label="In Progress" value={projectStatusCounts.in_progress || 0} maxValue={projects.length} colorClass="bg-blue-500" />
                    <ChartBar label="On Hold" value={projectStatusCounts.on_hold || 0} maxValue={projects.length} colorClass="bg-warning" />
                    <ChartBar label="Completed" value={projectStatusCounts.completed || 0} maxValue={projects.length} colorClass="bg-success" />
                </div>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h2 className="text-xl font-bold text-slate-700 font-heading flex items-center gap-2 mb-4">
                    <CheckCircleIcon className="w-6 h-6 text-primary"/>
                    Task Status
                </h2>
                <div className="flex justify-around items-end pt-4">
                    <ChartBar label="To Do" value={taskStatusCounts.todo || 0} maxValue={tasks.length} colorClass="bg-danger" />
                    <ChartBar label="In Progress" value={taskStatusCounts.in_progress || 0} maxValue={tasks.length} colorClass="bg-yellow-400" />
                    <ChartBar label="Done" value={taskStatusCounts.done || 0} maxValue={tasks.length} colorClass="bg-success" />
                </div>
            </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AnalyticsPage;
