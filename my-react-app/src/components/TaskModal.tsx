import React, { useState } from 'react';
import { Project, User, Task } from '../types';
import Modal from './Modal';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'status'>) => void;
  projects: Project[];
  users: User[];
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit, projects, users }) => {
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState<number | ''>('');
  const [assignedTo, setAssignedTo] = useState<number | ''>('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !projectId || !assignedTo || !dueDate) {
        alert("Please fill out all fields.");
        return;
    }
    onSubmit({ title, projectId, assignedTo, dueDate });
    // Reset form
    setTitle('');
    setProjectId('');
    setAssignedTo('');
    setDueDate('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">Task Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="project" className="block text-sm font-medium text-slate-700">Project</label>
          <select
            id="project"
            value={projectId}
            onChange={(e) => setProjectId(Number(e.target.value))}
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
          >
            <option value="" disabled>Select a project</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="assignee" className="block text-sm font-medium text-slate-700">Assign To</label>
          <select
            id="assignee"
            value={assignedTo}
            onChange={(e) => setAssignedTo(Number(e.target.value))}
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
          >
            <option value="" disabled>Select a team member</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors">
            Create Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;