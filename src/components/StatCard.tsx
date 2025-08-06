import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex items-center space-x-4 transition-all hover:shadow-md hover:-translate-y-1">
      <div className="bg-primary-light p-4 rounded-full text-primary">
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;