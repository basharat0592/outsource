import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import type { Task } from '../../types/index';

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/tasks', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (error) {
        setTasks([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto font-sans">
      
      {/* PAGE TITLE (Outside the card) */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* WHITE CARD */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Card Header: Tasks Title & Button */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Tasks</h2>
                
                <Link 
                    to="/tasks/new" 
                    className="bg-[#4c1d95] hover:bg-purple-800 text-white px-5 py-2 rounded-md text-sm font-medium shadow-sm transition-all"
                >
                    Add Task
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white text-gray-900 text-sm font-semibold border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-4 w-1/4">Type</th>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Due Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                        {loading ? (
                            <tr><td colSpan={5} className="px-8 py-8 text-center text-gray-500">Loading tasks...</td></tr>
                        ) : tasks.length === 0 ? (
                             <tr><td colSpan={5} className="px-8 py-8 text-center text-gray-500">No tasks available.</td></tr>
                        ) : (
                            tasks.map((task) => (
                                <tr key={task.task_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-[#4c1d95]" />
                                            <span className="font-medium text-gray-900">{task.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700 font-medium">{task.client_name}</td>
                                    <td className="px-6 py-4 text-gray-600">{task.due_date}</td>
                                    <td className="px-6 py-4">
                                        {/* Status Badges Matching Screenshot */}
                                        <span className={`px-3 py-1 rounded-md text-xs font-semibold ${
                                            task.status === 'In Progress' ? 'bg-green-100 text-green-700 border border-green-200' : 
                                            task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                                            task.status === 'Estimate Accepted' ? 'bg-green-50 text-green-600 border border-green-100' :
                                            'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                        }`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to={`/tasks/${task.task_id}`} className="text-[#4c1d95] hover:text-purple-700 font-medium">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
      </div>
    </div>
  );
};
export default TasksList;