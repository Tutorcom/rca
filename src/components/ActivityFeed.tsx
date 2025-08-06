import React from 'react';
import type { Activity, ActivityType } from '../types';
import { BellIcon, FileContractIcon, UserCheckIcon, CommentDotsIcon, CalendarAltIcon, FileUploadIcon, CheckCircleIcon, BillingIcon } from './icons';

interface ActivityFeedProps {
  activities: Activity[];
  title?: string;
}

const activityIconMap: { [key in ActivityType]?: React.ReactNode } = {
  contract: <FileContractIcon className="w-5 h-5 text-primary" />,
  application: <FileContractIcon className="w-5 h-5 text-primary" />,
  user: <UserCheckIcon className="w-5 h-5 text-green-500" />,
  feedback: <CommentDotsIcon className="w-5 h-5 text-purple-500" />,
  deadline: <CalendarAltIcon className="w-5 h-5 text-red-500" />,
  document: <FileUploadIcon className="w-5 h-5 text-yellow-500" />,
  task: <CheckCircleIcon className="w-5 h-5 text-blue-500" />,
  invoice: <BillingIcon className="w-5 h-5 text-green-600" />,
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, title }) => {
  return (
    <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-slate-700 font-heading flex items-center gap-2 mb-4">
        <BellIcon className="w-6 h-6 text-primary" />
        {title || 'Recent Activity'}
      </h2>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              {activityIconMap[activity.type] || <BellIcon className="w-5 h-5 text-slate-500" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{activity.title}</p>
              <p className="text-sm text-slate-500">{activity.description}</p>
              <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ActivityFeed;