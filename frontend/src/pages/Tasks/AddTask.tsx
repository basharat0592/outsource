import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ChevronRight, Home } from 'lucide-react'; 
import type { Client } from '../../types/index';

// 1. Task Type ka structure define kiya
interface TaskType {
  task_type_id: number;
  type_name: string;
  description: string;
}

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  
  // Data Store karne ke liye State
  const [clients, setClients] = useState<Client[]>([]);
  const [dbTaskTypes, setDbTaskTypes] = useState<TaskType[]>([]); // Backend se aaye huye types yahan store honge
  
  // Form Fields State
  const [taskTypeId, setTaskTypeId] = useState(''); // Yahan ID save hogi (1, 2, etc)
  const [title, setTitle] = useState(''); 
  const [clientId, setClientId] = useState('');     // Yahan ID save hogi
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Page Load hote hi Clients aur TaskTypes fetch karein
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Clients aur Task Types dono aik sath mangwa rahay hain
        const [clientsRes, typesRes] = await Promise.all([
            axios.get('http://127.0.0.1:8000/clients', { headers }),
            axios.get('http://127.0.0.1:8000/task-types', { headers }) 
        ]);

        setClients(clientsRes.data);
        setDbTaskTypes(typesRes.data);

      } catch (err) {
        console.error("Error loading data", err);
        toast.error("Failed to connect to Backend.");
      }
    };
    fetchData();
  }, []);

  // 3. Form Submit hone par chalne wala function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // Backend ke schema ke mutabiq Data tayyar kiya
      const payload = {
        title: title,
        description: description,
        due_date: dueDate,
        status: "pending", 
        task_type_id: Number(taskTypeId), // String ID ko Number mein badal rahay hain
        client_id: Number(clientId),      // String ID ko Number mein badal rahay hain
        time_estimate: 0,
        billable_time: 0
      };

      console.log("Sending Payload:", payload); // Console mein check karne ke liye

      await axios.post('http://127.0.0.1:8000/tasks', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Task created successfully!');
      navigate('/tasks');
    } catch (error: any) {
      // Agar error aaye to check karein
      if (error.response && error.response.status === 422) {
          console.error("Validation Error:", error.response.data);
          toast.error("Form Error: Please check all fields.");
      } else {
          toast.error('Failed to create task');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#F8F9FB] min-h-screen font-sans">
      {/* Header */}
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
                
                {/* 1. Task Type Dropdown (Ab yeh Backend se aa raha hai) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type <span className="text-purple-600">*</span></label>
                    <div className="relative">
                        <div className="flex items-center w-full px-3 py-3 border border-gray-300 rounded-lg bg-white">
                            <select 
                                required 
                                value={taskTypeId}
                                onChange={(e) => setTaskTypeId(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 text-gray-700 p-0 text-base cursor-pointer"
                            >
                                <option value="" disabled>Select a task type</option>
                                {/* Yahan hum List map kar rahay hain */}
                                {dbTaskTypes.map((type) => (
                                    <option key={type.task_type_id} value={type.task_type_id}>
                                        {type.type_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* 2. Task Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Task Name <span className="text-purple-600">*</span></label>
                    <input 
                        type="text" 
                        required 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-100"
                        placeholder="e.g. Q3 VAT Return"
                    />
                </div>

                {/* 3. Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea 
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-100"
                    />
                </div>

                {/* 4. Client Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client <span className="text-purple-600">*</span></label>
                    <select 
                        required 
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-100 bg-white"
                    >
                        <option value="">Select a client</option>
                        {clients.map(client => (
                            <option key={client.client_id} value={client.client_id}>
                                {client.client_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 5. Due Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date <span className="text-purple-600">*</span></label>
                    <input 
                        type="date" 
                        required 
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-100"
                    />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="px-8 py-3 bg-[#4c1d95] hover:bg-purple-900 text-white rounded-lg font-medium shadow-sm transition-colors text-sm"
                    >
                        {loading ? 'Saving...' : 'Save Task'}
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