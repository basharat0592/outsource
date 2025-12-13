import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ChevronRight, Home, X } from 'lucide-react'; // Added X icon
import type { Client } from '../../types/index';

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  
  // Form State
  const [taskType, setTaskType] = useState('');
  const [title, setTitle] = useState(''); // This maps to "Name"
  const [clientId, setClientId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Dropdown Options
  const taskTypes = [
    "VAT Returns",
    "Payroll",
    "Year-End Final Accounts",
    "Management Accounts"
  ];

  // Fetch Clients for Dropdown
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:8000/clients', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClients(res.data);
      } catch (err) {
        console.error("Could not fetch clients");
      }
    };
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const payload = {
        type: taskType, // Make sure your backend accepts this field
        title,          // Maps to "Name"
        client_id: Number(clientId),
        due_date: dueDate,
        description,
        status: "In Progress"
      };

      await axios.post('http://127.0.0.1:8000/tasks', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Task created successfully!');
      navigate('/tasks');
    } catch (error) {
      toast.error('Failed to create task');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#F8F9FB] min-h-screen font-sans">
      {/* Breadcrumb Header */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/tasks" className="hover:text-purple-700"><Home className="w-4 h-4" /></Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/tasks" className="hover:text-purple-700">Tasks</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">New Task</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">New Task</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Task Type (Styled to match image) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type <span className="text-purple-600">*</span></label>
                    <div className="relative">
                        {/* Custom Input Wrapper */}
                        <div className="flex items-center w-full px-3 py-3 border border-gray-300 rounded-lg hover:border-purple-400 transition-colors focus-within:ring-2 focus-within:ring-purple-100 focus-within:border-purple-500 bg-white">
                            
                            {/* Dashed Box Icon */}
                            <div className="w-10 h-10 rounded-lg border-2 border-dashed border-purple-300 flex items-center justify-center mr-3 flex-shrink-0 bg-purple-50">
                                <div className="w-3 h-3 bg-transparent border border-purple-400 rounded-sm"></div>
                            </div>

                            {/* Select Dropdown */}
                            <select 
                                required 
                                value={taskType}
                                onChange={(e) => setTaskType(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 text-gray-700 p-0 text-base cursor-pointer"
                            >
                                <option value="" disabled>Select a task type</option>
                                {taskTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>

                            {/* Close Icon (Visual only, or creates reset functionality) */}
                            {taskType && (
                                <button 
                                    type="button"
                                    onClick={() => setTaskType('')}
                                    className="text-gray-400 hover:text-gray-600 ml-2"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name <span className="text-purple-600">*</span></label>
                    <input 
                        type="text" 
                        required 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-colors text-gray-700"
                    />
                </div>

                {/* 3. Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea 
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-colors text-gray-700 resize-none"
                    />
                </div>

                {/* 4. Client */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client <span className="text-purple-600">*</span></label>
                    <div className="relative">
                        <select 
                            required 
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-colors text-gray-700 appearance-none bg-white"
                        >
                            <option value="">Select a client</option>
                            {clients.map(client => (
                                <option key={client.client_id} value={client.client_id}>
                                    {client.client_name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                             <X className="w-4 h-4 rotate-45" /> {/* Simulating a dropdown arrow or X */}
                        </div>
                    </div>
                </div>

                {/* 5. Due Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date <span className="text-purple-600">*</span></label>
                    <input 
                        type="date" 
                        required 
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-colors text-gray-700"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-4 pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="px-8 py-3 bg-[#4c1d95] hover:bg-purple-900 text-white rounded-lg font-medium shadow-sm transition-colors text-sm"
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <Link to="/tasks" className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;