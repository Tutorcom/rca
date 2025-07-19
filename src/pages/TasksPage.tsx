import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { Task, Project, User } from '../types';
import { CheckCircleIcon, PlusIcon } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';

interface TasksPageProps {
  tasks: Task[];
  projects: Project[];
  users: User[];
  onOpenCreateModal: () => void;
}

const statusStyles = {
    todo: 'bg-danger-light text-danger-dark',
    in_progress: 'bg-warning-light text-warning-dark',
    done: 'bg-success-light text-success-dark',
};

const getStatusText = (status: 'todo' | 'in_progress' | 'done') => {
    if (status === 'in_progress') return 'In Progress';
    return status.charAt(0).toUpperCase() + status.slice(1);
}

const TasksPage: React.FC<TasksPageProps> = ({ tasks, projects, users, onOpenCreateModal }) => {
    const { user } = useAuth();
    if (!user) return null;

    const getProjectTitle = (projectId: number) => projects.find(p => p.id === projectId)?.title || 'N/A';
    const getUserName = (userId: number) => users.find(u => u.id === userId)?.name || 'Unassigned';
    
    const displayedTasks = user.role === 'admin' ? tasks : tasks.filter(t => t.assignedTo === user.id);

  return (
    <ProtectedRoute allowedRoles={['admin', 'contractor']}>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 font-heading">Task Management</h1>
          <p className="text-slate-500 mt-1">
            {user.role === 'admin' ? "Track and manage all tasks for your firm's projects." : "View all tasks assigned to you."}
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-700 font-heading flex items-center gap-2">
                    <CheckCircleIcon className="w-6 h-6 text-primary"/>
                    {user.role === 'admin' ? 'All Tasks' : 'My Tasks'}
                </h2>
                {user.role === 'admin' && (
                    <button 
                        onClick={onOpenCreateModal}
                        className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Create Task
                    </button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Task</th>
                            <th scope="col" className="px-6 py-3">Project</th>
                            <th scope="col" className="px-6 py-3">Assigned To</th>
                            <th scope="col" className="px-6 py-3">Due Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedTasks.map((task) => (
                            <tr key={task.id} className="bg-white border-b hover:bg-slate-50">
                                <td scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                    {task.title}
                                </td>
                                <td className="px-6 py-4">{getProjectTitle(task.projectId)}</td>
                                <td className="px-6 py-4">{getUserName(task.assignedTo)}</td>
                                <td className="px-6 py-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[task.status]}`}>
                                        {getStatusText(task.status)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TasksPage;