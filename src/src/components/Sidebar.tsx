import React from 'react';
import {
    FaHome, FaFileContract, FaUserTie, FaUsers, FaChartLine, FaCog,
    FaFileArchive, FaFileAlt, FaEnvelope, FaCheckCircle, FaFileInvoiceDollar, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { LogoIcon } from './icons';
import { SIDEBAR_LINKS, SIDEBAR_BOTTOM_LINKS } from '../constants';
import type { Page, SidebarLink } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const iconMap: { [key: string]: React.FC<any> } = {
  HomeIcon: FaHome,
  FileContractIcon: FaFileContract,
  UserTieIcon: FaUserTie,
  UsersIcon: FaUsers,
  ChartLineIcon: FaChartLine,
  CogIcon: FaCog,
  FileArchiveIcon: FaFileArchive,
  FileAltIcon: FaFileAlt,
  MailIcon: FaEnvelope,
  CheckCircleIcon: FaCheckCircle,
  BillingIcon: FaFileInvoiceDollar,
};


const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setCollapsed, currentPage, setCurrentPage }) => {
  const { user } = useAuth();
  
  const NavLink = ({ link }: { link: SidebarLink }) => {
    if (!user || !link.roles?.includes(user.role) || !link.iconName || !link.page) return null;
    const Icon = iconMap[link.iconName];
    const isActive = currentPage === link.page;

    return (
      <li className="px-3">
        <button
            onClick={() => setCurrentPage(link.page as Page)}
            className={`w-full flex items-center p-2.5 rounded-lg transition-colors duration-200 text-left group ${
            isActive ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-primary-light hover:text-primary'
            } ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? link.title : ''}
        >
            {Icon && <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`} />}
            {!isCollapsed && <span className="ml-3 text-sm font-semibold whitespace-nowrap">{link.title}</span>}
        </button>
      </li>
    );
  };
  
  const NavHeader = ({ title }: { title: string }) => {
      if (isCollapsed) return <div className="h-6" />;
      return (
        <li className="px-6 pt-6 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            {title}
        </li>
      );
  }

  return (
    <aside className={`fixed top-0 left-0 h-full bg-white text-slate-700 flex flex-col transition-all duration-300 ease-in-out z-40 border-r border-slate-200 ${isCollapsed ? 'w-24' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-200 h-20">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <LogoIcon className="w-12 h-12 text-primary flex-shrink-0" />
            {!isCollapsed && (
                <span className="text-xl font-bold font-heading whitespace-nowrap text-slate-800">Rosado Advisors</span>
            )}
        </div>
      </div>
      
       <button onClick={() => setCollapsed(!isCollapsed)} className={`absolute top-7 -right-3 p-1.5 rounded-full bg-white text-slate-500 hover:bg-primary hover:text-white z-50 border-2 border-slate-200 shadow-md transition-all`}>
          {isCollapsed ? <FaChevronRight className="w-4 h-4" /> : <FaChevronLeft className="w-4 h-4" />}
        </button>

      <nav className="flex-1">
        <ul className="py-4 space-y-2">
            {SIDEBAR_LINKS.map((link, index) => (
                link.type === 'header' ? <NavHeader key={`header-${index}`} title={link.title} /> : <NavLink key={link.page || index} link={link} />
            ))}
        </ul>
      </nav>

      <div className="py-4 mt-auto border-t border-slate-200">
         <ul className="space-y-2">
            {SIDEBAR_BOTTOM_LINKS.map((link) => (
               <NavLink key={link.page} link={link} />
            ))}
         </ul>
      </div>
    </aside>
  );
};

export default Sidebar;