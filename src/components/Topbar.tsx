import React, { useState } from 'react';
import { SearchIcon, BellIcon, ChevronDownIcon, LogoutIcon, GlobeIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';

interface TopbarProps {
  notificationCount: number;
  onNotificationClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ notificationCount, onNotificationClick }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  if (!user) return null;

  return (
    <header className="flex-shrink-0 bg-white h-20 flex items-center justify-between px-6 lg:px-8 z-30 border-b border-slate-200">
      <div className="relative w-full max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-slate-500 hover:text-primary">
          <GlobeIcon className="h-6 w-6" />
        </button>

        <button className="relative text-slate-500 hover:text-primary" onClick={onNotificationClick}>
          <BellIcon className="h-6 w-6" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-white text-xs font-bold">
              {notificationCount}
            </span>
          )}
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <div className="relative">
            <button
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
                <div className="w-11 h-11 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-lg">
                    {user.avatar}
                </div>
                <div className="hidden md:block text-left">
                    <p className="font-semibold text-sm text-slate-700">{user.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                </div>
                <ChevronDownIcon className={`h-5 w-5 text-slate-500 transition-transform group-hover:text-slate-800 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
                <div 
                    className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in-up"
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100"
                    >
                        <LogoutIcon className="w-5 h-5 text-slate-500" />
                        Logout
                    </button>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;