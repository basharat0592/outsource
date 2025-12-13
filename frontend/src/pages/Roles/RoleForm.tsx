import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ChevronRight, Home, Settings } from 'lucide-react';

// Define the permissions structure based on your list
const permissionGroups = [
  {
    category: 'Client',
    items: [
      { id: 'add_client', label: 'Can add client' },
      { id: 'change_client', label: 'Can change client' },
      { id: 'delete_client', label: 'Can delete client' },
      { id: 'view_client', label: 'Can view client' },
    ]
  },
  {
    category: 'Role',
    items: [
      { id: 'add_role', label: 'Can add role' },
      { id: 'change_role', label: 'Can change role' },
      { id: 'delete_role', label: 'Can delete role' },
      { id: 'view_role', label: 'Can view role' },
    ]
  },
  {
    category: 'Task',
    items: [
      { id: 'add_task', label: 'Can add task' },
      { id: 'change_task', label: 'Can change task' },
      { id: 'confirm_task', label: 'Can confirm that a task has been completed' },
      { id: 'delete_task', label: 'Can delete task' },
      { id: 'review_tasks', label: 'Can review tasks' },
      { id: 'submit_tasks', label: 'Can submit tasks' },
      { id: 'view_task', label: 'Can view task' },
    ]
  },
  {
    category: 'Userrole',
    items: [
      { id: 'add_user_role', label: 'Can add user role' },
      { id: 'change_user_role', label: 'Can change user role' },
      { id: 'delete_user_role', label: 'Can delete user role' },
      { id: 'view_user_role', label: 'Can view user role' },
    ]
  },
  {
    category: 'User',
    items: [
      { id: 'change_user', label: 'Can change user' },
      { id: 'delete_user', label: 'Can delete user' },
      { id: 'invite_users', label: 'Can invite users to the organisation' },
      { id: 'view_user', label: 'Can view user' },
    ]
  }
];

const RoleForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // Function to handle checkbox toggles
  const handleCheckboxChange = (id: string) => {
    setSelectedPermissions(prev => 
      prev.includes(id) 
        ? prev.filter(perm => perm !== id) // Uncheck
        : [...prev, id] // Check
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        role_name: name,
        description: desc,
        permissions: selectedPermissions // Sending the array of selected IDs
      };
      
      await axios.post('http://127.0.0.1:8000/roles', payload, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      toast.success('Role created successfully!');
      navigate('/organisation/roles');
    } catch (err) {
      toast.error('Failed to create role');
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-white min-h-screen font-sans">
      
      {/* Top Header / Breadcrumbs Area */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4 text-gray-700">
            
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <Home className="w-4 h-4 text-purple-800" />
          <ChevronRight className="w-4 h-4" />
          <span className="text-purple-800 font-medium">Demo Accounting Ltd</span>
          <ChevronRight className="w-4 h-4" />
          <Link to="/organisation/roles" className="hover:text-purple-800">Roles</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-bold">Add</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Add Role</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Inputs Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Name <span className="text-purple-600">*</span>
              </label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea 
                value={desc} 
                onChange={e => setDesc(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                rows={5} 
              />
            </div>
          </div>

          {/* Permissions Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Permissions</h2>
            
            <div className="space-y-6">
              {permissionGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">{group.category}</h3>
                  <div className="space-y-2 ml-1">
                    {group.items.map((perm) => (
                      <div key={perm.id} className="flex items-center">
                        <input
                          id={perm.id}
                          type="checkbox"
                          checked={selectedPermissions.includes(perm.id)}
                          onChange={() => handleCheckboxChange(perm.id)}
                          className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                        />
                        <label 
                          htmlFor={perm.id} 
                          className="ml-3 text-gray-600 cursor-pointer select-none"
                        >
                          {perm.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6">
            <button 
              type="submit" 
              className="px-6 py-2 bg-[#6b2c91] hover:bg-[#5a247a] text-white font-medium rounded shadow-sm transition-colors"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RoleForm;