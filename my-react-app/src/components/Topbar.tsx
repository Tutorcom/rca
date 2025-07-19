import React, { useState } from 'react';
import { SearchIcon, BellIcon, ChevronDownIcon, LogoutIcon } from './icons';
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
    <header className="flex-shrink-0 bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-6 z-30">
      <div className="relative w-full max-w-xs">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-slate-500 hover:text-primary" onClick={onNotificationClick}>
          <BellIcon className="h-6 w-6" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-white text-xs font-bold">
              {notificationCount}
            </span>
          )}
        </button>

        <div className="relative">
            <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                    {user.avatar}
                </div>
                <div className="hidden md:block">
                    <p className="font-semibold text-sm text-slate-700">{user.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                </div>
                <ChevronDownIcon className={`h-5 w-5 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
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
