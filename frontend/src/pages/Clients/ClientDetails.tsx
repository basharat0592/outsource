import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Home, ChevronRight, FileText } from 'lucide-react';

// Types definition
interface Task {
  id: number;
  type: string; // "Payroll", "VAT Returns", etc.
  due_date: string;
  status: string;
  client_id: number;
}

interface Client {
  client_id: number;
  client_name: string;
}

const ClientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL se ID lega
  const [tasks, setTasks] = useState<Task[]>([]);
  const [clientName, setClientName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // 1. Client ka naam laane ke liye
        // (Assuming endpoint is /clients/:id)
        const clientRes = await axios.get(`http://127.0.0.1:8000/clients/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClientName(clientRes.data.client_name);

        // 2. Us client ke Tasks laane ke liye
        // (Assuming endpoint filters by client_id)
        const tasksRes = await axios.get(`http://127.0.0.1:8000/tasks?client_id=${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Agar backend filter nahi karta, toh hum frontend pe filter kar lenge:
        const filteredTasks = tasksRes.data.filter((t: any) => t.client_id === Number(id));
        setTasks(filteredTasks);

      } catch (error) {
        console.error("Error fetching details", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // Status Badge Color Logic (Screenshot ke hisaab se)
  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('completed') || s.includes('progress') || s.includes('estimate')) {
      return 'bg-green-100 text-green-700 border border-green-200';
    }
    if (s.includes('review')) {
      return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
    }
    return 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  return (
    <div className="w-full bg-[#F8F9FB] min-h-screen font-sans">
      
      {/* Breadcrumbs */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-purple-700"><Home className="w-4 h-4" /></Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/clients" className="hover:text-purple-700">Clients</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Details</span>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-8">
        
        {/* Company Header (Small Text) */}
        <div className="mb-2 text-sm text-gray-600 font-medium uppercase tracking-wide">
            Company
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px] p-8">
            
            {/* Title Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Tasks</h1>
                <p className="text-gray-500 text-sm">
                    A list of tasks relating to <span className="font-semibold text-gray-800">{clientName || 'Loading...'}</span>
                </p>
            </div>

            {/* Tasks Table */}
            <div className="w-full">
                {/* Headers */}
                <div className="grid grid-cols-12 border-b border-gray-100 pb-4 mb-2 text-sm font-semibold text-gray-900">
                    <div className="col-span-5 pl-2">Type</div>
                    <div className="col-span-3">Due Date</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-1 text-right pr-2">Action</div>
                </div>

                {/* Body */}
                {loading ? (
                    <div className="py-10 text-center text-gray-500">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                    <div className="py-10 text-center text-gray-400">No tasks found for this client.</div>
                ) : (
                    <div className="space-y-1">
                        {tasks.map((task) => (
                            <div key={task.id} className="grid grid-cols-12 items-center py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                
                                {/* Type Column (with Icon) */}
                                <div className="col-span-5 flex items-center gap-3 pl-2">
                                    <FileText className="w-5 h-5 text-purple-700" strokeWidth={1.5} />
                                    <span className="text-gray-700 text-sm font-medium">{task.type}</span>
                                </div>

                                {/* Due Date */}
                                <div className="col-span-3 text-sm text-gray-600 font-medium">
                                    {task.due_date}
                                </div>

                                {/* Status Badge */}
                                <div className="col-span-3">
                                    <span className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusStyle(task.status)}`}>
                                        {task.status}
                                    </span>
                                </div>

                                {/* Action */}
                                <div className="col-span-1 text-right pr-2">
                                    <button className="text-[#4c1d95] text-sm hover:underline font-medium">
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;