import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ChevronRight, Home } from 'lucide-react';

const InviteUser: React.FC = () => {
  const navigate = useNavigate();
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  // Mock roles data based on the screenshot
  const availableRoles = [
    { id: 'accountant', name: 'Accountant' },
    { id: 'admin', name: 'Admin' },
    { id: 'bgd_agent', name: 'BGD Agent' }
  ];

  // Toggle checkbox logic
  const handleRoleToggle = (roleId: string) => {
    setSelectedRoles(prev => 
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        full_name: fullName,
        email: email,
        job_title: jobTitle,
        roles: selectedRoles
      };

      // Example API call
      // await axios.post('http://127.0.0.1:8000/users/invite', payload, { headers: { Authorization: `Bearer ${token}` } });
      
      console.log('Sending Payload:', payload);
      toast.success("Invitation sent successfully!");
      navigate('/organisation/users');
    } catch (err) { 
      toast.error("Failed to send invitation"); 
    }
  };

  return (
    <div className="w-full bg-[#F8F9FB] min-h-screen font-sans relative overflow-hidden flex flex-col">
      
      {/* Breadcrumbs Header */}
      <div className="px-8 py-5 flex items-center gap-2 text-sm bg-[#F8F9FB]">
        <Link to="/" className="text-purple-800 hover:text-purple-900">
            <Home className="w-5 h-5" />
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        
        <span className="text-purple-800 font-medium cursor-pointer hover:underline">
            Demo Accounting Ltd
        </span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        
        <Link to="/organisation/users" className="text-purple-800 font-medium hover:underline">
            Users
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        
        <span className="text-gray-900 font-medium">Invite</span>
      </div>

      {/* Main Form Content */}
      <div className="px-8 mt-2 max-w-5xl w-full">
        <form onSubmit={handleInvite} className="space-y-6">
          
          {/* Full Name Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-purple-600">*</span>
            </label>
            <input 
              type="text" 
              required 
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 bg-white"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email address <span className="text-purple-600">*</span>
            </label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 bg-white"
            />
          </div>

          {/* Job Title Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input 
              type="text" 
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 bg-white"
            />
          </div>

          {/* Roles Checkboxes */}
          <div className="pt-2">
            <h3 className="text-base font-medium text-gray-900 mb-3">Roles</h3>
            <div className="space-y-3">
              {availableRoles.map((role) => (
                <div key={role.id} className="flex items-center">
                  <input
                    id={role.id}
                    type="checkbox"
                    checked={selectedRoles.includes(role.id)}
                    onChange={() => handleRoleToggle(role.id)}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                  />
                  <label htmlFor={role.id} className="ml-3 text-sm text-gray-600 cursor-pointer">
                    {role.name} -
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Invite Button */}
          <div className="pt-6">
            <button 
              type="submit" 
              className="px-8 py-2 bg-[#5b21b6] hover:bg-[#4c1d95] text-white font-medium rounded shadow-sm transition-colors"
            >
              Invite
            </button>
          </div>

        </form>
      </div>

      {/* Decorative Corner "Customer" Ribbon */}
      <div className="fixed bottom-0 right-0 pointer-events-none z-10">
         <div className="w-0 h-0 border-b-[100px] border-b-[#4c1d95] border-l-[100px] border-l-transparent relative">
            <span className="absolute bottom-6 right-2 text-white font-bold transform -rotate-45 text-sm leading-none">
                Customer
            </span>
         </div>
      </div>

    </div>
  );
};

export default InviteUser;