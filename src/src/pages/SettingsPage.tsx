import React from 'react';
import { FaCog } from 'react-icons/fa';

const SettingsPage: React.FC = () => {
  return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 font-heading">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your account and notification preferences.</p>
        </div>
        <div className="bg-white p-10 rounded-lg shadow-sm text-center">
            <FaCog className="w-16 h-16 mx-auto text-slate-300 mb-4 animate-spin-slow" />
            <h2 className="text-2xl font-semibold text-slate-700">Settings Page Coming Soon</h2>
            <p className="text-slate-500 mt-2">This page will allow you to configure your profile, manage notification settings, and set application preferences.</p>
        </div>
      </div>
  );
};

export default SettingsPage;