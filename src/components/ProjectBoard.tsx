import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectBoardProps {
  projects: Project[];
  onStatusChange: (projectId: number, newStatus: ProjectStatus) => void;
}

const statusColumns: { id: ProjectStatus, title: string }[] = [
    { id: 'opportunity', title: 'Opportunity' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'on_hold', title: 'On Hold' },
    { id: 'completed', title: 'Completed' },
];

const statusStyles: { [key in ProjectStatus]: { bg: string, text: string } } = {
    opportunity: { bg: 'bg-blue-500', text: 'text-blue-500' },
    in_progress: { bg: 'bg-purple-500', text: 'text-purple-500' },
    on_hold: { bg: 'bg-yellow-500', text: 'text-yellow-500' },
    completed: { bg: 'bg-green-500', text: 'text-green-500' },
};

const ProjectBoardColumn: React.FC<{ 
    status: ProjectStatus, 
    projects: Project[], 
    onDrop: (projectId: number, status: ProjectStatus) => void,
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void,
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void,
    isDraggedOver: boolean,
}> = ({ status, projects, onDrop, onDragOver, onDragEnter, isDraggedOver }) => {
    
    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const projectId = Number(e.dataTransfer.getData("projectId"));
        onDrop(projectId, status);
    }
    
    const { bg, text } = statusStyles[status];
    
    return (
        <div 
            className={`flex-1 min-w-[300px] bg-slate-100 rounded-lg transition-colors ${isDraggedOver ? 'bg-primary-light' : ''}`}
            onDrop={handleOnDrop}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
        >
            <div className={`p-3 font-bold text-lg font-heading capitalize flex items-center gap-2 border-b-4 ${bg.replace('bg-', 'border-')}`}>
                <span className={`w-3 h-3 rounded-full ${bg}`}></span>
                <span className={`${text}`}>{status.replace('_', ' ')}</span>
                <span className="ml-auto text-sm bg-slate-200 text-slate-600 rounded-full px-2">{projects.length}</span>
            </div>
            <div className="p-2 space-y-3">
                {projects.map(project => (
                     <ProjectCard key={project.id} project={project} onApply={() => {}} isDraggable />
                ))}
            </div>
        </div>
    )
}


const ProjectBoard: React.FC<ProjectBoardProps> = ({ projects, onStatusChange }) => {
    const [draggedOverCol, setDraggedOverCol] = useState<ProjectStatus | null>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }
    
    const handleDragEnter = (status: ProjectStatus) => {
        setDraggedOverCol(status);
    }
    
    return (
        <div className="flex gap-4 overflow-x-auto pb-4">
            {statusColumns.map(({ id, title }) => (
                <ProjectBoardColumn 
                    key={id}
                    status={id}
                    projects={projects.filter(p => p.status === id)}
                    onDrop={onStatusChange}
                    onDragOver={handleDragOver}
                    onDragEnter={() => handleDragEnter(id)}
                    isDraggedOver={draggedOverCol === id}
                />
            ))}
        </div>
    );
};

export default ProjectBoard;