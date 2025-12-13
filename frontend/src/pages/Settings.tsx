import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import type { User } from '../types/index';

const Settings: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  
  const userInitial = user?.first_name ? user.first_name[0].toUpperCase() : 'R';
  const fullName = user ? `${user.first_name} ${user.last_name}` : 'Robertshaw';
  
  return (
    <div className="max-w-4xl mx-auto font-sans">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/tasks" className="hover:text-[#4c1d95]"><Home className="w-4 h-4" /></Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Settings</span>
        </div>

        {/* Profile Section */}
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex items-start gap-8">
                
                {/* Large Green Avatar */}
                <div className="h-24 w-24 rounded-full bg-[#65a30d] text-white flex items-center justify-center font-bold text-4xl border-4 border-white shadow-sm shrink-0">
                    {userInitial}
                </div>
                
                <div className="pt-2">
                    <h3 className="text-xl font-bold text-gray-900">{fullName}</h3>
                    <p className="text-gray-500 text-sm mb-4">{user?.job_title || 'Kuma'}</p>
                    
                    <button className="bg-[#4c1d95] hover:bg-purple-800 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
                        Edit
                    </button>
                </div>
            </div>
        </div>

        {/* Security Section */}
        <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Security</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                 <Link to="#" className="text-[#4c1d95] hover:text-purple-800 font-medium hover:underline">
                    Change Password
                 </Link>
            </div>
        </div>
    </div>
  );
};
export default Settings;