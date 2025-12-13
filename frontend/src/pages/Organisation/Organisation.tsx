import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield, ChevronRight, Home } from 'lucide-react';

const Organisation: React.FC = () => {
  return (
    <div className="w-full bg-[#F8F9FB] min-h-screen font-sans">
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/tasks" className="hover:text-purple-700"><Home className="w-4 h-4" /></Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Organisation</span>
      </div>
      <div className="max-w-5xl mx-auto mt-8 px-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Demo Accounting Ltd</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Users Card */}
          <Link to="/organisation/users" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600"><Users className="w-6 h-6" /></div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Users</h3>
            <p className="text-gray-500 text-sm mt-1">Manage employees and team members.</p>
          </Link>
          {/* Roles Card */}
          <Link to="/organisation/roles" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-full text-purple-600"><Shield className="w-6 h-6" /></div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Roles</h3>
            <p className="text-gray-500 text-sm mt-1">Manage permissions and access levels.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Organisation;