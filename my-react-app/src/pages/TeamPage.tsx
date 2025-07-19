import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { User, Task, Project } from '../types';
import { UsersIcon } from '../components/icons';

interface TeamPageProps {
  admins: User[];
  tasks: Task[];
  projects: Project[];
}

const TeamPage: React.FC<TeamPageProps> = ({ admins, tasks, projects }) => {

  const getMemberTaskLoad = (userId: number) => {
    const assignedTasks = tasks.filter(t => t.assignedTo === userId);
    return {
      total: assignedTasks.length,
      pending: assignedTasks.filter(t => t.status !== 'done').length,
    };
  };

  const getMemberProjects = (userId: number) => {
    const projectIds = new Set(tasks.filter(t => t.assignedTo === userId).map(t => t.projectId));
    return projects.filter(p => projectIds.has(p.id));
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 font-heading">Team Management</h1>
          <p className="text-slate-500 mt-1">View your internal team's workload and assignments.</p>
        </div>

        <div className="space-y-6">
          {admins.map(admin => {
            const taskLoad = getMemberTaskLoad(admin.id);
            const memberProjects = getMemberProjects(admin.id);
            return (
              <div key={admin.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-3xl flex-shrink-0">
                    {admin.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 font-heading">{admin.name}</h2>
                    <p className="text-slate-500">{admin.email}</p>
                    <div className="mt-2 flex gap-4 text-sm">
                      <div className="text-slate-600"><span className="font-bold text-primary">{taskLoad.pending}</span> Pending Tasks</div>
                      <div className="text-slate-600"><span className="font-bold text-primary">{taskLoad.total}</span> Total Tasks</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold text-slate-600 mb-2">Assigned Projects:</h4>
                  {memberProjects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {memberProjects.map(p => (
                            <span key={p.id} className="bg-slate-200 text-slate-700 px-3 py-1 text-xs font-medium rounded-full">{p.title}</span>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">No projects assigned.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TeamPage;