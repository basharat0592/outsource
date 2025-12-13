import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Home, Settings, LogOut } from 'lucide-react';
import type { User } from '../../types/index';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const userInitial = user?.first_name ? user.first_name[0].toUpperCase() : 'R';

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans overflow-hidden">
      <Sidebar />

      {/* Main Content Area - Width adjusted for new sidebar */}
      <div className="flex-1 ml-[380px] flex flex-col h-screen relative">

        {/* Top Header - White Bar */}
        <header className="bg-white h-16 flex items-center justify-between px-8 shadow-sm relative z-20">

          {/* Left Side Links */}
          <div className="flex items-center space-x-8">
            <Link to="/tasks" className="flex items-center text-gray-700 hover:text-[#4c1d95] transition-colors">
              <Home className="w-5 h-5 mr-2 text-[#4c1d95]" />
              <span className="font-medium text-sm">Home</span>
            </Link>
            <Link to="/settings" className="flex items-center text-gray-700 hover:text-[#4c1d95] transition-colors">
              <Settings className="w-5 h-5 mr-2 text-[#4c1d95]" />
              <span className="font-medium text-sm">Settings</span>
            </Link>
          </div>

          {/* Right Side - User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="h-10 w-10 rounded-full bg-[#65a30d] hover:bg-[#568a0b] text-white flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm transition-all"
            >
              {userInitial}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
                  <p className="text-xs text-gray-500">{user?.job_title || 'User'}</p>
                </div>
                <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-auto bg-[#F3F4F6] p-8">
          <Outlet />
        </main>

        {/* Customer Ribbon (Bottom Right) */}
        <div className="fixed bottom-0 right-0 z-50 pointer-events-none overflow-visible w-32 h-32">
          <div
            className="
      absolute
      bottom-4 right-[-44px]
      bg-[#4c1d95] text-white
      text-base font-extrabold
      w-48 h-10
      -rotate-45
      shadow-lg
      border-2 border-white
      text-center
      leading-[2.5rem]
      tracking-wide
    "
          >
            Customer
          </div>
        </div>


      </div>
    </div>
  );
};

export default Layout;