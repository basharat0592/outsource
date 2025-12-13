import logo from '../../assets/img3.jpg';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Plus,
  Users,
  Building2,
  Bell,
  LayoutDashboard
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/tasks') {
      return (
        location.pathname === '/' ||
        location.pathname === '/dashboard' ||
        location.pathname.startsWith('/tasks')
      );
    }
    return location.pathname.startsWith(path);
  };

  const linkClass = (path: string) =>
    `flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? 'bg-[#5b21b6] border-r-4 border-lime-400 text-white'
        : 'text-purple-100 hover:bg-[#5b21b6]'
    }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-[360px] bg-[#4c1d95] text-white flex flex-col shadow-xl z-40">
      
      {/* LOGO */}
      <div className="h-16 flex items-center px-6 border-b border-[#5b21b6]">
       <img src={logo} alt="outsource.com" className="h-8 object-contain" />
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto py-4">

        {/* TASKS */}
        <p className="px-6 mt-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-purple-300">
          Tasks
        </p>

        <Link to="/tasks" className={linkClass('/tasks')}>
          <LayoutDashboard className="w-5 h-5 mr-3" />
          View All Tasks
        </Link>

        <Link to="/tasks/new" className={linkClass('/tasks/new')}>
          <Plus className="w-5 h-5 mr-3" />
          Add New Task
        </Link>

        {/* CONTACTS */}
        <p className="px-6 mt-6 mb-2 text-[11px] font-bold uppercase tracking-wider text-purple-300">
          Contacts
        </p>

        <Link to="/clients" className={linkClass('/clients')}>
          <Users className="w-5 h-5 mr-3" />
          Clients
        </Link>

        {/* ORGANISATION */}
        <p className="px-6 mt-6 mb-2 text-[11px] font-bold uppercase tracking-wider text-purple-300">
          Organisation
        </p>

        <Link to="/organisation" className={linkClass('/organisation')}>
          <Building2 className="w-5 h-5 mr-3" />
          Demo Accounting Ltd
        </Link>

        {/* NOTIFICATIONS */}
        <p className="px-6 mt-6 mb-2 text-[11px] font-bold uppercase tracking-wider text-purple-300">
          Notifications
        </p>

        <div className="px-4 space-y-2">
          <div className="flex items-start p-2 rounded-md hover:bg-[#5b21b6] cursor-pointer">
            <div className="h-7 w-7 rounded-full bg-purple-800 border border-purple-600 flex items-center justify-center text-[10px] font-bold mr-3">
              DR
            </div>
            <div>
              <p className="text-[11px] text-purple-100 leading-tight">
                Duncan Robertshaw commented on Payro
              </p>
              <span className="text-[10px] text-purple-400">
                2 months ago
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* FOOTER */}
      <Link
        to="/notifications"
        className="flex items-center px-6 py-4 text-sm font-medium text-purple-100 hover:bg-[#5b21b6] border-t border-[#5b21b6]"
      >
        <Bell className="w-5 h-5 mr-3" />
        View all notifications
      </Link>
    </aside>
  );
};

export default Sidebar;
