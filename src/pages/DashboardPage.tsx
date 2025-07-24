import React from 'react';
import StatCard from '../components/StatCard';
import { useAuth } from '../contexts/AuthContext';
import { Activity, Project, User, Task, Invoice, Page } from '../types';
import { FileContractIcon, UsersIcon, CheckCircleIcon, ClockIcon, BillingIcon, FileAltIcon, CalendarAltIcon } from '../components/icons';
import ActivityFeed from '../components/ActivityFeed';
import { isAfter, isBefore, addDays, differenceInDays } from 'date-fns';

interface DashboardPageProps {
    activities: Activity[];
    projects: Project[];
    users: User[];
    tasks: Task[];
    invoices: Invoice[];
    setCurrentPage: (page: Page) => void;
}

const UrgentItem: React.FC<{ item: { type: 'task' | 'invoice'; title: string; dueText: string; page: Page; icon: React.ReactNode; isOverdue: boolean }, onClick: () => void }> = ({ item, onClick }) => (
    <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
            <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${item.isOverdue ? 'bg-danger-light text-danger' : 'bg-warning-light text-warning'}`}>
                {item.icon}
            </span>
            <div>
                <p className="font-semibold text-slate-700">{item.title}</p>
                <p className={`text-sm font-medium ${item.isOverdue ? 'text-danger' : 'text-warning-dark'}`}>{item.dueText}</p>
            </div>
        </div>
        <button onClick={onClick} className="text-sm font-semibold text-primary hover:text-primary-hover">
            View
        </button>
    </div>
);

const DashboardPage: React.FC<DashboardPageProps> = ({ activities, projects, users, tasks, invoices, setCurrentPage }) => {
    const { user } = useAuth();

    if (!user) return null;

    const userProjects = projects.filter(p => p.clientId === user.id);
    const userTasks = tasks.filter(t => t.assignedTo === user.id);
    const userInvoices = invoices.filter(i => i.clientId === user.id);
    
    const stats = {
        admin: {
            activeProjects: projects.filter(p => p.status === 'in_progress').length.toString(),
            activeClients: users.filter(u => u.role === 'contractor' && u.status === 'active').length.toString(),
            pendingReviews: users.filter(u => u.role === 'contractor' && u.status === 'pending_review').length.toString(),
            overdueTasks: tasks.filter(t => t.status !== 'done' && new Date(t.dueDate) < new Date()).length.toString(),
        },
        contractor: {
            activeProjects: userProjects.filter(p => p.status === 'in_progress').length.toString(),
            pendingTasks: userTasks.filter(t => t.status !== 'done').length.toString(),
            unpaidInvoices: userInvoices.filter(i => i.status === 'sent' || i.status === 'overdue').length.toString(),
            completedProjects: userProjects.filter(p => p.status === 'completed').length.toString(),
        }
    }

    const recentActivities = activities.slice(0, 5);
    
    const now = new Date();
    const oneWeekFromNow = addDays(now, 7);
    
    const getDueText = (dueDate: Date) => {
        const days = differenceInDays(dueDate, now);
        if (days < 0) return `Overdue by ${Math.abs(days)} days`;
        if (days === 0) return 'Due today';
        if (days === 1) return 'Due tomorrow';
        return `Due in ${days} days`;
    };

    const urgentTasks = (user.role === 'admin' ? tasks : userTasks)
        .filter(t => t.status !== 'done' && isBefore(new Date(t.dueDate), oneWeekFromNow))
        .map(t => ({
            type: 'task' as const,
            title: t.title,
            isOverdue: isBefore(new Date(t.dueDate), now),
            dueText: getDueText(new Date(t.dueDate)),
            page: 'tasks' as Page,
            icon: <CheckCircleIcon className="w-5 h-5" />,
        }));
    
    const urgentInvoices = (user.role === 'admin' ? invoices : userInvoices)
        .filter(i => i.status === 'sent' && isBefore(new Date(i.dueDate), oneWeekFromNow))
         .map(i => ({
            type: 'invoice' as const,
            title: `Invoice #${2024-00}${i.id}`,
            isOverdue: isBefore(new Date(i.dueDate), now),
            dueText: getDueText(new Date(i.dueDate)),
            page: 'billing' as Page,
            icon: <BillingIcon className="w-5 h-5" />,
        }));
        
    const urgentItems = [...urgentTasks, ...urgentInvoices].sort((a,b) => (a.isOverdue === b.isOverdue) ? 0 : a.isOverdue ? -1 : 1);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800 font-heading">Dashboard</h1>
                <p className="text-slate-500">Welcome back, {user.name.split(' ')[0]}. Here's your firm's overview.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
                {user.role === 'admin' ? (
                    <>
                        <StatCard title="Active Projects" value={stats.admin.activeProjects} icon={<FileContractIcon className="w-6 h-6"/>} />
                        <StatCard title="Active Clients" value={stats.admin.activeClients} icon={<UsersIcon className="w-6 h-6"/>} />
                        <StatCard title="Pending Approvals" value={stats.admin.pendingReviews} icon={<ClockIcon className="w-6 h-6"/>} />
                        <StatCard title="Tasks Overdue" value={stats.admin.overdueTasks} icon={<CheckCircleIcon className="w-6 h-6"/>} />
                    </>
                ) : (
                    <>
                        <StatCard title="My Active Projects" value={stats.contractor.activeProjects} icon={<FileContractIcon className="w-6 h-6"/>} />
                        <StatCard title="My Pending Tasks" value={stats.contractor.pendingTasks} icon={<CheckCircleIcon className="w-6 h-6"/>} />
                        <StatCard title="Unpaid Invoices" value={stats.contractor.unpaidInvoices} icon={<BillingIcon className="w-6 h-6"/>} />
                        <StatCard title="Completed Projects" value={stats.contractor.completedProjects} icon={<FileAltIcon className="w-6 h-6"/>} />
                    </>
                )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                         <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-slate-700 font-heading flex items-center gap-2">
                                <CalendarAltIcon className="w-6 h-6 text-primary"/>
                                Urgent Items
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {urgentItems.slice(0, 5).map((item, index) => (
                                <UrgentItem key={index} item={item} onClick={() => setCurrentPage(item.page)} />
                            ))}
                            {urgentItems.length === 0 && <p className="text-slate-500 text-center py-4">Nothing urgent on your plate. Well done!</p>}
                        </div>
                    </section>
                </div>
                <div className="lg:col-span-1 space-y-6">
                   <ActivityFeed activities={recentActivities} title="Recent Activity" />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;