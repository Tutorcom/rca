import React, { useState } from 'react';
import type { Project, ProjectStatus } from '../types';
import ProjectCard from '../components/ProjectCard';
import ProjectBoard from '../components/ProjectBoard';
import { FaSearch } from 'react-icons/fa';

interface ProjectManagementPageProps {
  projects: Project[];
  onInitiateApply: (project: Project) => void;
  onStatusChange: (projectId: number, newStatus: ProjectStatus) => void;
}

const ProjectManagementPage: React.FC<ProjectManagementPageProps> = ({ projects, onInitiateApply, onStatusChange }) => {
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 font-heading">Projects</h1>
        <p className="text-slate-500 mt-1">Browse, manage, and track all projects and opportunities.</p>
      </div>

      <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-slate-400" />
              </div>
              <input
                  type="text"
                  placeholder="Search by title, client, or keyword..."
                  className="w-full pl-11 pr-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
          </div>
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md ${viewMode === 'list' ? 'bg-white text-primary shadow' : 'text-slate-500 hover:text-slate-700'}`}
              >
                  List
              </button>
                <button 
                  onClick={() => setViewMode('board')}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md ${viewMode === 'board' ? 'bg-white text-primary shadow' : 'text-slate-500 hover:text-slate-700'}`}
              >
                  Board
              </button>
          </div>
      </div>
      
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map(project => (
            <ProjectCard key={project.id} project={project} onApply={onInitiateApply} />
            ))}
        </div>
      ) : (
        <ProjectBoard projects={projects} onStatusChange={onStatusChange} />
      )}

       {projects.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-lg shadow-sm">
              <p className="text-slate-500">No projects available at the moment.</p>
          </div>
      )}
    </div>
  );
};

export default ProjectManagementPage;