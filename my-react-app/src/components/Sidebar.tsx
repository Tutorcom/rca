import React from 'react';
import * as Icons from './icons';
import { SIDEBAR_LINKS, SIDEBAR_BOTTOM_LINKS } from '../constants';
import { Page } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const iconMap: { [key: string]: React.FC<any> } = {
  HomeIcon: Icons.HomeIcon,
  SearchIcon: Icons.SearchIcon,
  FileContractIcon: Icons.FileContractIcon,
  UserTieIcon: Icons.UserTieIcon,
  UsersIcon: Icons.UsersIcon,
  ChartLineIcon: Icons.ChartLineIcon,
  CogIcon: Icons.CogIcon,
  QuestionCircleIcon: Icons.QuestionCircleIcon,
  FileArchiveIcon: Icons.FileArchiveIcon,
  FileAltIcon: Icons.FileAltIcon,
  MailIcon: Icons.MailIcon,
  CheckCircleIcon: Icons.CheckCircleIcon,
  BillingIcon: Icons.BillingIcon,
};


const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setCollapsed, currentPage, setCurrentPage }) => {
  const { user } = useAuth();
  
  const NavLink = ({ link }: { link: (typeof SIDEBAR_LINKS)[0] }) => {
    const Icon = iconMap[link.iconName];
    if (!user || !link.roles.includes(user.role)) return null;

    return (
      <button
        onClick={() => setCurrentPage(link.page)}
        className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 text-left ${
          currentPage === link.page ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-700 hover:text-white'
        } ${isCollapsed ? 'justify-center' : ''}`}
      >
        {Icon && <Icon className="w-6 h-6 flex-shrink-0" />}
        {!isCollapsed && <span className="ml-4 font-medium whitespace-nowrap">{link.title}</span>}
      </button>
    );
  };

  return (
    <aside className={`fixed top-0 left-0 h-full bg-slate-800 text-white flex flex-col transition-all duration-300 ease-in-out z-40 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-700 h-16">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Icons.BuildingIcon className="w-8 h-8 text-primary flex-shrink-0" />
            <span className="text-xl font-bold font-heading whitespace-nowrap">RCA Manager</span>
          </div>
        )}
        <button onClick={() => setCollapsed(!isCollapsed)} className={`p-2 rounded-full absolute top-4 right-0 translate-x-1/2 bg-slate-800 text-white hover:bg-primary z-50 border-2 border-slate-100`}>
          {isCollapsed ? <Icons.ChevronRightIcon className="w-4 h-4" /> : <Icons.ChevronLeftIcon className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {SIDEBAR_LINKS.map((link) => (
          <NavLink key={link.page} link={link} />
        ))}
      </nav>

      <div className="px-2 py-4 mt-auto border-t border-slate-700 space-y-2">
        {SIDEBAR_BOTTOM_LINKS.map((link) => (
           <NavLink key={link.page} link={link} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;