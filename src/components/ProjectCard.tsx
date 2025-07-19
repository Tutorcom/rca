import React from 'react';
import { Project } from '../types';
import { BuildingIcon, TrendingUpIcon } from './icons';

interface ProjectCardProps {
  project: Project;
  onApply?: (project: Project) => void;
  isDraggable?: boolean;
}

const statusStyles: { [key: string]: string } = {
    opportunity: 'bg-info-light text-info-dark',
    in_progress: 'bg-purple-200 text-purple-800',
    on_hold: 'bg-yellow-200 text-yellow-800',
    completed: 'bg-success-light text-success-dark',
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onApply, isDraggable = false }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    const budgetProgress = project.budgetedHours > 0 ? (project.trackedHours / project.budgetedHours) * 100 : 0;
    
    const revenue = project.trackedHours * project.rate;
    const profit = revenue - project.expenses;
    const profitability = revenue > 0 ? (profit / revenue) * 100 : 0;

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("projectId", project.id.toString());
    }

    return (
        <div 
            draggable={isDraggable}
            onDragStart={handleDragStart}
            className={`bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col transition-all hover:shadow-lg hover:border-primary ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
        >
            <div className="p-4 border-b border-slate-200">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">{project.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${statusStyles[project.status]}`}>{project.status.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center text-slate-500 text-sm mt-1">
                    <BuildingIcon className="w-4 h-4 mr-2" />
                    <span>Client: {project.clientName}</span>
                </div>
            </div>
            <div className="p-4 flex-grow">
                 <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Budget Progress</span>
                        <span>{Math.round(budgetProgress)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: `${budgetProgress}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-400 text-right mt-1">{project.trackedHours} / {project.budgetedHours} hrs</p>
                </div>
                
                 <div className="mb-4 bg-slate-50 p-2 rounded-md flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <TrendingUpIcon className="w-5 h-5 text-success"/>
                        <span className="font-medium">Profitability</span>
                    </div>
                    <span className={`font-bold text-lg ${profit >= 0 ? 'text-success' : 'text-danger'}`}>
                        {profitability.toFixed(1)}%
                    </span>
                </div>
                
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-slate-200 text-slate-600 px-2 py-1 text-xs font-medium rounded-full">{tag}</span>
                    ))}
                </div>
            </div>
            {onApply && (
                <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-slate-50 rounded-b-lg">
                    <div>
                        <p className="text-xs text-slate-500">Proposal Deadline</p>
                        <p className="font-semibold text-danger-dark">{formatDate(project.deadline)}</p>
                    </div>
                    {project.status === 'opportunity' && (
                        <button 
                            onClick={() => onApply(project)}
                            className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors"
                        >
                            Submit Proposal
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProjectCard;