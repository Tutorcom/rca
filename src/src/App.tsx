import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import AiAssistant from './components/AiAssistant';
import DashboardPage from './pages/DashboardPage';
import ProjectManagementPage from './pages/ProjectManagementPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import UserProfilePage from './pages/UserProfilePage';
import ClientManagementPage from './pages/ClientManagementPage';
import ClientDetailPage from './pages/ClientDetailPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import DocumentHubPage from './pages/DocumentHubPage';
import MessagesPage from './pages/MessagesPage';
import TasksPage from './pages/TasksPage';
import BillingPage from './pages/BillingPage';
import TeamPage from './pages/TeamPage';
import NotificationModal from './components/NotificationModal';
import ApplicationModal from './components/ApplicationModal';
import TaskModal from './components/TaskModal';
import { projects as initialProjects, applications as initialApplications, activities as initialActivities, documents as initialDocuments, notifications as initialNotifications, messages as initialMessages, users as allUsers, tasks as initialTasks, invoices as initialInvoices } from './constants';
import type { Project, Application, ApplicationStatus, Activity, Document, User, Notification, Page, ChatMessage, Task, Invoice, InvoiceStatus, ProjectStatus } from './types';

const App: React.FC = () => {
    const { user, login } = useAuth();
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [applications, setApplications] = useState<Application[]>(initialApplications);
    const [activities, setActivities] = useState<Activity[]>(initialActivities);
    const [documents, setDocuments] = useState<Document[]>(initialDocuments);
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    const [users, setUsers] = useState<User[]>(allUsers);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
    
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);
    const [selectedProjectForProposal, setSelectedProjectForProposal] = useState<Project | null>(null);
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);


    const addActivity = (activity: Omit<Activity, 'id' | 'time'>) => {
        const newActivity: Activity = {
            id: Date.now(),
            time: 'Just now',
            ...activity
        };
        setActivities(prev => [newActivity, ...prev]);
    };

    const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
        const newNotification: Notification = {
            id: Date.now(),
            time: 'Just now',
            read: false,
            ...notification
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const handleInitiateApply = (project: Project) => {
        setSelectedProjectForProposal(project);
    }

    const handleApply = (projectId: number) => {
        if (!user) return;
        const project = projects.find(c => c.id === projectId);
        if (project) {
            const newApplication: Application = {
                id: Date.now(),
                contractTitle: project.title,
                contractor: user.name,
                contractorId: user.id,
                date: new Date().toISOString(),
                status: 'submitted',
            };
            setApplications(prev => [newApplication, ...prev]);

            addActivity({
                type: 'application',
                title: 'Proposal Submitted',
                description: `You submitted a proposal for "${project.title}".`
            });

            addNotification({
                title: "Proposal Submitted",
                description: `Your proposal for "${project.title}" is now under review.`
            });
            setSelectedProjectForProposal(null); // Close the modal on successful application
        }
    };
    
    const setApplicationStatus = (appId: number, status: ApplicationStatus) => {
        setApplications(currentApplications => currentApplications.map(app => app.id === appId ? {...app, status} : app));
        const app = applications.find(a => a.id === appId);
        if(app){
            const contractor = users.find(u => u.id === app.contractorId);
            addActivity({
                type: 'application',
                title: `Application ${status}`,
                description: `Application from ${contractor?.name} for "${app.contractTitle}" was marked as ${status}.`
            })
        }
    }

    const handleProjectStatusChange = (projectId: number, newStatus: ProjectStatus) => {
        let changedProjectTitle = '';
        setProjects(currentProjects => 
            currentProjects.map(p => {
                if (p.id === projectId) {
                    changedProjectTitle = p.title;
                    return { ...p, status: newStatus };
                }
                return p;
            })
        );

        if (changedProjectTitle) {
             addActivity({
                type: 'contract',
                title: 'Project Status Updated',
                description: `Project "${changedProjectTitle}" was moved to ${newStatus.replace('_', ' ')}.`
            });
        }
    };
    
    const handleAddTask = (task: Omit<Task, 'id' | 'status'>) => {
        const newTask: Task = {
            id: Date.now(),
            status: 'todo',
            ...task
        };
        setTasks(prev => [newTask, ...prev]);
        addActivity({
            type: 'task',
            title: 'New Task Created',
            description: `Task "${newTask.title}" was created.`
        });
        setTaskModalOpen(false);
    };


    const setInvoiceStatus = (invoiceId: number, status: InvoiceStatus) => {
        setInvoices(currentInvoices => currentInvoices.map(inv => inv.id === invoiceId ? {...inv, status} : inv));
        const invoice = invoices.find(i => i.id === invoiceId);
        if (invoice) {
            addActivity({
                type: 'invoice',
                title: `Invoice ${status}`,
                description: `Invoice for project "${projects.find(p=>p.id===invoice.projectId)?.title}" marked as ${status}.`
            })
        }
    }

    const setUserStatus = (userId: number, status: 'active' | 'pending_review') => {
        let targetUser: User | undefined;
        setUsers(currentUsers => currentUsers.map(u => {
            if (u.id === userId) {
                targetUser = { ...u, status };
                return targetUser;
            }
            return u;
        }));

        if (targetUser && status === 'active') {
            addActivity({
                type: 'user',
                title: 'Client Approved',
                description: `${targetUser.name} has been approved and is now active.`
            });
            addNotification({
                title: 'Profile Approved',
                description: `Congratulations, your company profile has been approved.`
            });
        }
    };
    
    const sendMessage = (recipientId: number, text: string) => {
        if (!user || text.trim() === '') return;
        const conversationMembers = [user.id, recipientId].sort();
        const newMessage: ChatMessage = {
            id: Date.now(),
            conversationId: `${conversationMembers[0]}_${conversationMembers[1]}`,
            senderId: user.id,
            text: text,
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, newMessage]);

        // Note: In a real app, notifications would be targeted.
        addNotification({
            title: `New Message from ${user.name}`,
            description: text.substring(0, 50) + '...'
        });
    };
    
    const navigateToClient = (clientId: number) => {
        setSelectedClientId(clientId);
        setCurrentPage('client-detail');
    }
    
    const renderPage = () => {
        if (currentPage === 'client-detail' && selectedClientId) {
            const client = users.find(u => u.id === selectedClientId);
            if(client) {
                 return <ClientDetailPage 
                    client={client}
                    projects={projects.filter(p => p.clientId === selectedClientId)}
                    tasks={tasks.filter(t => projects.some(p => p.clientId === selectedClientId && p.id === t.projectId))}
                    invoices={invoices.filter(i => i.clientId === selectedClientId)}
                    onBack={() => setCurrentPage('clients')}
                />
            }
        }
        
        switch (currentPage) {
            case 'dashboard':
                return <DashboardPage 
                            activities={activities} 
                            projects={projects} 
                            users={users}
                            tasks={tasks}
                            invoices={invoices}
                            setCurrentPage={setCurrentPage}
                        />;
            case 'projects':
                return <ProjectManagementPage projects={projects} onInitiateApply={handleInitiateApply} onStatusChange={handleProjectStatusChange} />;
            case 'applications':
                return <MyApplicationsPage applications={applications} setApplicationStatus={setApplicationStatus} />;
            case 'messages':
                return <MessagesPage messages={messages} onSendMessage={sendMessage} />;
            case 'profile':
                return <UserProfilePage documents={documents} addActivity={addActivity} addNotification={addNotification} setDocuments={setDocuments} />;
            case 'clients':
                return <ClientManagementPage users={users} setUserStatus={setUserStatus} setCurrentPage={setCurrentPage} onClientSelect={navigateToClient} />;
            case 'tasks':
                return <TasksPage tasks={tasks} projects={projects} users={users} onOpenCreateModal={() => setTaskModalOpen(true)} />;
            case 'billing':
                return <BillingPage invoices={invoices} projects={projects} users={users} setInvoiceStatus={setInvoiceStatus} />;
            case 'team':
                return <TeamPage admins={users.filter(u=>u.role === 'admin')} tasks={tasks} projects={projects} />;
            case 'analytics':
                 return <AnalyticsPage projects={projects} invoices={invoices} tasks={tasks} />;
            case 'settings':
                 return <SettingsPage />;
            case 'document-hub':
                 return <DocumentHubPage documents={documents} />;
            default:
                return <DashboardPage 
                            activities={activities} 
                            projects={projects} 
                            users={users}
                            tasks={tasks}
                            invoices={invoices}
                            setCurrentPage={setCurrentPage}
                        />;
        }
    };

    if (!user) {
        return <LoginPage onLogin={login} />;
    }

    const unreadNotificationCount = notifications.filter(n => !n.read).length;

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            <Sidebar 
                isCollapsed={isSidebarCollapsed} 
                setCollapsed={setSidebarCollapsed} 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-24' : 'ml-64'}`}>
                <Topbar 
                    notificationCount={unreadNotificationCount} 
                    onNotificationClick={() => setNotificationModalOpen(true)}
                />
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    {renderPage()}
                </main>
            </div>
            <AiAssistant projects={projects} />
            <NotificationModal 
                isOpen={isNotificationModalOpen}
                onClose={() => setNotificationModalOpen(false)}
                notifications={notifications}
                setNotifications={setNotifications}
            />
            <ApplicationModal
                isOpen={!!selectedProjectForProposal}
                onClose={() => setSelectedProjectForProposal(null)}
                project={selectedProjectForProposal}
                onSubmit={handleApply}
            />
            <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setTaskModalOpen(false)}
                onSubmit={handleAddTask}
                projects={projects}
                users={users.filter(u => u.role === 'admin')}
            />
        </div>
    );
};

export default App;